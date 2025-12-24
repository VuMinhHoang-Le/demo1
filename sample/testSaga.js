import '__mocks__/moment';
import '__mocks__/react-native-device-info';
import '__mocks__/react-native-firebase';
import '__mocks__/react-native-logrocket';
import '__mocks__/react-native-sqlite-storage';
import '__mocks__/uuid';

import { testSaga } from 'redux-saga-test-plan';
import { StatusCodes } from 'http-status-codes';
import { call, select } from 'redux-saga/effects';

import { modifyOffer, modifyOfferCompleted } from 'modules/Offer/actions';
import { addNotification } from 'modules/Notifications/actions';
import { NOTIFICATION_KEYS, modifyOfferNotification } from 'modules/Notifications/constants';
import api from 'services/api';
import makeRequest from 'services/makeRequest';
import { selectUserInfo } from 'modules/Login/selectors';
import { modifyOfferSaga } from '../index';
import { selectOfferById } from 'modules/Offer/selectors';
import { NEGOTIATION_STATUSES } from 'modules/Offer/constants';

describe('Additional modifyOffer saga tests', () => {
  const userInfo = { id: 1 };
  const basePayload = {
    offerId: 'bbbf4607-3b5d-4a48-99d3-742924f0d001',
    expirationDateUtc: '2025-06-21T07:07:34.555222+00:00',
    amount: '140.34',
    pickupDate: '2025-06-20',
    deliveryDate: '2025-06-21',
  };

  const onSuccess = jest.fn();
  const onError = jest.fn();

  const listingInfo = {
    listing: {
      listingId: 114221123,
      shipper: { companyName: 'Test Company' },
    },
    recordVersion: 114221156,
  };
  const selectorListing = jest.fn(() => listingInfo);

  afterEach(() => {
    onSuccess.mockClear();
    onError.mockClear();
  });

  it('should handle API response with non-accepted status code', () => {
    const config = api.modifyOffer(
      {
        ...basePayload,
        listingId: listingInfo.listing.listingId,
        recordVersion: listingInfo.recordVersion,
      },
      'test-access-key',
    );
    const response = { status: StatusCodes.BAD_REQUEST };

    testSaga(modifyOfferSaga, modifyOffer({ ...basePayload, onSuccess }))
      .next()
      .all([
        call(selectOfferById, NEGOTIATION_STATUSES.AWAITING_SHIPPER, basePayload.offerId),
        select(selectUserInfo),
      ])
      .next([selectorListing, userInfo])
      .select(selectorListing)
      .next(listingInfo)
      .call(makeRequest, config, userInfo)
      .next(response)
      .put(modifyOfferCompleted())
      .next()
      .isDone();

    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('should handle missing company name gracefully in error case', () => {
    const listingInfoWithoutCompany = {
      listing: {
        listingId: 114221123,
        shipper: {},
      },
      recordVersion: 114221156,
    };
    const selectorWithoutCompany = jest.fn(() => listingInfoWithoutCompany);

    const config = api.modifyOffer(
      {
        ...basePayload,
        listingId: listingInfoWithoutCompany.listing.listingId,
        recordVersion: listingInfoWithoutCompany.recordVersion,
      },
      'test-access-key',
    );

    testSaga(modifyOfferSaga, modifyOffer({ ...basePayload, onError }))
      .next()
      .all([
        call(selectOfferById, NEGOTIATION_STATUSES.AWAITING_SHIPPER, basePayload.offerId),
        select(selectUserInfo),
      ])
      .next([selectorWithoutCompany, userInfo])
      .select(selectorWithoutCompany)
      .next(listingInfoWithoutCompany)
      .call(makeRequest, config, userInfo)
      .throw(new Error('Bad Request'))
      .put(
        addNotification({
          key: NOTIFICATION_KEYS.MODIFY_OFFER_NOTIFICATION,
          notification: modifyOfferNotification.error(basePayload.amount, ''),
        }),
      )
      .next()
      .put(modifyOfferCompleted())
      .next()
      .isDone();

    expect(onError).toHaveBeenCalled();
  });

  it('should handle missing listing information', () => {
    const emptyListingInfo = {};
    const selectorEmptyListing = jest.fn(() => emptyListingInfo);

    const config = api.modifyOffer(
      {
        ...basePayload,
        listingId: undefined,
        recordVersion: undefined,
      },
      'test-access-key',
    );

    testSaga(modifyOfferSaga, modifyOffer({ ...basePayload, onError }))
      .next()
      .all([
        call(selectOfferById, NEGOTIATION_STATUSES.AWAITING_SHIPPER, basePayload.offerId),
        select(selectUserInfo),
      ])
      .next([selectorEmptyListing, userInfo])
      .select(selectorEmptyListing)
      .next(emptyListingInfo)
      .call(makeRequest, config, userInfo)
      .throw(new Error('Missing listing information'))
      .put(
        addNotification({
          key: NOTIFICATION_KEYS.MODIFY_OFFER_NOTIFICATION,
          notification: modifyOfferNotification.error(basePayload.amount, ''),
        }),
      )
      .next()
      .put(modifyOfferCompleted())
      .next()
      .isDone();

    expect(onError).toHaveBeenCalled();
  });

  it('should handle network timeout error', () => {
    const config = api.modifyOffer(
      {
        ...basePayload,
        listingId: listingInfo.listing.listingId,
        recordVersion: listingInfo.recordVersion,
      },
      'test-access-key',
    );
    const timeoutError = new Error('Network timeout');

    testSaga(modifyOfferSaga, modifyOffer({ ...basePayload, onError }))
      .next()
      .all([
        call(selectOfferById, NEGOTIATION_STATUSES.AWAITING_SHIPPER, basePayload.offerId),
        select(selectUserInfo),
      ])
      .next([selectorListing, userInfo])
      .select(selectorListing)
      .next(listingInfo)
      .call(makeRequest, config, userInfo)
      .throw(timeoutError)
      .put(
        addNotification({
          key: NOTIFICATION_KEYS.MODIFY_OFFER_NOTIFICATION,
          notification: modifyOfferNotification.error(basePayload.amount, 'Test Company'),
        }),
      )
      .next()
      .put(modifyOfferCompleted())
      .next()
      .isDone();

    expect(onError).toHaveBeenCalledWith(timeoutError);
  });

  it('should handle null/undefined offer data', () => {
    const nullOfferInfo = null;
    const selectorNullOffer = jest.fn(() => nullOfferInfo);

    testSaga(modifyOfferSaga, modifyOffer({ ...basePayload, onError }))
      .next()
      .all([
        call(selectOfferById, NEGOTIATION_STATUSES.AWAITING_SHIPPER, basePayload.offerId),
        select(selectUserInfo),
      ])
      .next([selectorNullOffer, userInfo])
      .select(selectorNullOffer)
      .next(nullOfferInfo)
      .put(
        addNotification({
          key: NOTIFICATION_KEYS.MODIFY_OFFER_NOTIFICATION,
          notification: modifyOfferNotification.error(basePayload.amount, ''),
        }),
      )
      .next()
      .put(modifyOfferCompleted())
      .next()
      .isDone();

    expect(onError).toHaveBeenCalled();
  });

  it('should handle server error (500)', () => {
    const config = api.modifyOffer(
      {
        ...basePayload,
        listingId: listingInfo.listing.listingId,
        recordVersion: listingInfo.recordVersion,
      },
      'test-access-key',
    );
    const serverError = new Error('Internal Server Error');
    serverError.status = 500;

    testSaga(modifyOfferSaga, modifyOffer({ ...basePayload, onError }))
      .next()
      .all([
        call(selectOfferById, NEGOTIATION_STATUSES.AWAITING_SHIPPER, basePayload.offerId),
        select(selectUserInfo),
      ])
      .next([selectorListing, userInfo])
      .select(selectorListing)
      .next(listingInfo)
      .call(makeRequest, config, userInfo)
      .throw(serverError)
      .put(
        addNotification({
          key: NOTIFICATION_KEYS.MODIFY_OFFER_NOTIFICATION,
          notification: modifyOfferNotification.error(basePayload.amount, 'Test Company'),
        }),
      )
      .next()
      .put(modifyOfferCompleted())
      .next()
      .isDone();

    expect(onError).toHaveBeenCalledWith(serverError);
  });

  it('should handle unauthorized error (401)', () => {
    const config = api.modifyOffer(
      {
        ...basePayload,
        listingId: listingInfo.listing.listingId,
        recordVersion: listingInfo.recordVersion,
      },
      'test-access-key',
    );
    const unauthorizedError = new Error('Unauthorized');
    unauthorizedError.status = 401;

    testSaga(modifyOfferSaga, modifyOffer({ ...basePayload, onError }))
      .next()
      .all([
        call(selectOfferById, NEGOTIATION_STATUSES.AWAITING_SHIPPER, basePayload.offerId),
        select(selectUserInfo),
      ])
      .next([selectorListing, userInfo])
      .select(selectorListing)
      .next(listingInfo)
      .call(makeRequest, config, userInfo)
      .throw(unauthorizedError)
      .put(
        addNotification({
          key: NOTIFICATION_KEYS.MODIFY_OFFER_NOTIFICATION,
          notification: modifyOfferNotification.error(basePayload.amount, 'Test Company'),
        }),
      )
      .next()
      .put(modifyOfferCompleted())
      .next()
      .isDone();

    expect(onError).toHaveBeenCalledWith(unauthorizedError);
  });

  it('should handle success without calling onSuccess callback', () => {
    const config = api.modifyOffer(
      {
        ...basePayload,
        listingId: listingInfo.listing.listingId,
        recordVersion: listingInfo.recordVersion,
      },
      'test-access-key',
    );
    const response = { status: StatusCodes.ACCEPTED };

    testSaga(modifyOfferSaga, modifyOffer({ ...basePayload }))
      .next()
      .all([
        call(selectOfferById, NEGOTIATION_STATUSES.AWAITING_SHIPPER, basePayload.offerId),
        select(selectUserInfo),
      ])
      .next([selectorListing, userInfo])
      .select(selectorListing)
      .next(listingInfo)
      .call(makeRequest, config, userInfo)
      .next(response)
      .put(
        addNotification({
          key: NOTIFICATION_KEYS.MODIFY_OFFER_NOTIFICATION,
          notification: modifyOfferNotification.success('Test Company'),
        }),
      )
      .next()
      .put(modifyOfferCompleted())
      .next()
      .isDone();
  });
});