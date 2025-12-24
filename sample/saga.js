import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';

import makeRequest from 'services/makeRequest';
import api from 'services/api';
import { selectUserInfo } from 'modules/Login/selectors';
import {
  modifyOffer,
  modifyOfferCompleted,
  updatePullToRefreshOffer,
  checkExpiredOffer,
  setExpiredOffer,
  getOffers,
  getOffersSuccess,
  getOffersError,
  checkExpiredOfferCompleted,
  declineOfferCompleted,
  declineOffer,
  acceptOffer,
  acceptOfferCompleted,
  setCarrierCurrentDateTime,
} from 'modules/Offer/actions';
import { addNotification } from 'modules/Notifications/actions';
import { selectOfferById } from 'modules/Offer/selectors';
import {
  NOTIFICATION_KEYS,
  modifyOfferNotification,
  getListingOfferNotification,
  declineOfferNotification,
  acceptOfferNotification,
} from 'modules/Notifications/constants';
import { mapCustomerRole } from 'modules/Home/utils';
import { EXPIRED_POPUP, NEGOTIATION_STATUSES, NEGOTIATION_STATUSES_REQUEST } from '../constants';

function* modifyOfferSaga({ payload: { onSuccess, onError, ...payload } }) {
  let companyName = '';
  try {
    const [offerByIdSelector, userInfo] = yield all([
      call(selectOfferById, NEGOTIATION_STATUSES.AWAITING_SHIPPER, payload.offerId),
      select(selectUserInfo),
    ]);
    const offerById = yield select(offerByIdSelector);

    companyName = offerById.listing?.shipper?.companyName || '';
    const requestConfig = api.modifyOffer({
      ...payload,
      recordVersion: offerById.recordVersion,
      listingId: offerById.listing?.listingId,
    });

    const response = yield call(makeRequest, requestConfig, userInfo);
    if (response.status === StatusCodes.ACCEPTED) {
      onSuccess && onSuccess();
      yield put(
        addNotification({
          key: NOTIFICATION_KEYS.MODIFY_OFFER_NOTIFICATION,
          notification: modifyOfferNotification.success(companyName),
        }),
      );
    }
  } catch (err) {
    onError && onError(err);
    yield put(
      addNotification({
        key: NOTIFICATION_KEYS.MODIFY_OFFER_NOTIFICATION,
        notification: modifyOfferNotification.error(payload.amount, companyName),
      }),
    );
  } finally {
    yield put(modifyOfferCompleted());
  }
}

function* checkExpiredOfferSaga({ payload }) {
  let companyName = '';
  let price = '';
  try {
    const [userInfo, offerSelector] = yield all([
      select(selectUserInfo),
      call(selectOfferById, payload.negotiationStatus, payload.offerId),
    ]);
    const offerById = yield select(offerSelector);
    companyName = offerById.listing?.shipper?.companyName || '';
    price = offerById.currentOfferDetails?.amount?.toFixed?.(2) || '0.00';

    const requestConfig = api.getOfferListingById(offerById?.offerListing?.offerListingId);
    const response = yield call(makeRequest, requestConfig, userInfo);
    if (response.data.statusCode === StatusCodes.OK) {
      const expirationTime = response.data.data.currentOfferDetails.expirationUtc;
      const timeDifference = moment(expirationTime).diff(moment(), 'seconds');
      if (timeDifference < 0) {
        yield put(
          setExpiredOffer({
            price,
            companyName,
            offerId: payload.offerId,
            title: EXPIRED_POPUP.expiredTitle,
            content: `${EXPIRED_POPUP.message} ${companyName} for $${price} has expired.`,
          }),
        );
        yield put(getOffers());
      } else {
        payload.onSuccess && payload.onSuccess();
      }
    }
  } catch (error) {
    if (
      error.response?.status === StatusCodes.GONE ||
      error.response?.status === StatusCodes.FORBIDDEN
    ) {
      yield put(
        setExpiredOffer({
          price,
          companyName,
          offerId: payload.offerId,
          title: EXPIRED_POPUP.noAvailableTitle,
          content: `${EXPIRED_POPUP.message} ${companyName} for $${price} is no longer available.`,
        }),
      );
      yield put(getOffers());
    } else {
      yield put(
        addNotification({
          key: NOTIFICATION_KEYS.GET_OFFER_LISTING_NOTIFICATION,
          notification: getListingOfferNotification.error(companyName),
        }),
      );
    }
  } finally {
    yield put(checkExpiredOfferCompleted());
  }
}

function* declineOfferSaga({ payload }) {
  const { offerId, onError, onSuccess } = payload;

  let price = '';
  let companyName = '';
  try {
    const [offerByIdSelector, userInfo] = yield all([
      call(selectOfferById, NEGOTIATION_STATUSES.AWAITING_CARRIER, offerId),
      select(selectUserInfo),
    ]);
    const offerById = yield select(offerByIdSelector);

    const { listing = {}, currentOfferDetails = {}, recordVersion } = offerById || {};
    const { shipper = {}, listingId } = listing;
    companyName = shipper.companyName || '';
    price = currentOfferDetails.amount?.toFixed(2) || '0.00';
    const requestConfig = api.declineOffer({ offerId, listingId, recordVersion });
    const response = yield call(makeRequest, requestConfig, userInfo);
    if (response.status === StatusCodes.ACCEPTED) {
      onSuccess?.();
      yield put(getOffers());
      yield put(
        addNotification({
          key: NOTIFICATION_KEYS.DECLINE_OFFER_NOTIFICATION,
          notification: declineOfferNotification.success(companyName),
        }),
      );
    }
  } catch (error) {
    onError?.();
    yield put(
      addNotification({
        key: NOTIFICATION_KEYS.DECLINE_OFFER_NOTIFICATION,
        notification: declineOfferNotification.error(price, companyName),
      }),
    );
  } finally {
    yield put(declineOfferCompleted());
  }
}

function* getOffersSaga() {
  try {
    const [userInfo] = yield all([
      select(selectUserInfo),
      put(updatePullToRefreshOffer(new Date().getTime())),
    ]);

    const requestConfig = yield call(api.getOfferRequest, {
      negotiationStatuses: [
        NEGOTIATION_STATUSES_REQUEST.CUSTOMER_AWAITING,
        NEGOTIATION_STATUSES_REQUEST.AWAITING_ON_CUSTOMER,
      ],
      sortField: { name: 'Expiration', direction: 'ASC' },
      offset: 0,
      customerId: userInfo?.customerId,
      customerRoles: mapCustomerRole(userInfo?.accountType),
    });

    const response = yield call(makeRequest, requestConfig, userInfo);

    if (response.status === StatusCodes.OK) {
      yield put(getOffersSuccess(response.data));
      yield put(setCarrierCurrentDateTime(moment.utc()));
    }
  } catch (error) {
    yield put(getOffersError(error));
  }
}

function* acceptOfferSaga({ payload: { onSuccess, onError, ...payload } }) {
  let companyName = '';
  try {
    const [offerByIdSelector, userInfo] = yield all([
      call(selectOfferById, NEGOTIATION_STATUSES.AWAITING_CARRIER, payload.offerId),
      select(selectUserInfo),
    ]);
    const offerById = yield select(offerByIdSelector);

    companyName = offerById.listing?.shipper?.companyName || '';
    const requestConfig = api.acceptOffer({
      ...payload,
      recordVersion: offerById.recordVersion,
      listingId: offerById.listing?.listingId,
    });

    const response = yield call(makeRequest, requestConfig, userInfo);
    if (response.status === StatusCodes.ACCEPTED) {
      onSuccess && onSuccess();
      yield put(
        addNotification({
          key: NOTIFICATION_KEYS.ACCEPT_OFFER_NOTIFICATION,
          notification: acceptOfferNotification.success(companyName),
        }),
      );
    }
  } catch (err) {
    onError && onError(err);
    yield put(
      addNotification({
        key: NOTIFICATION_KEYS.ACCEPT_OFFER_NOTIFICATION,
        notification: acceptOfferNotification.error(payload.amount, companyName),
      }),
    );
  } finally {
    yield put(acceptOfferCompleted());
  }
}

function* offersWatcher() {
  yield all([
    takeLatest(getOffers, getOffersSaga),
    takeLatest(modifyOffer, modifyOfferSaga),
    takeLatest(checkExpiredOffer, checkExpiredOfferSaga),
    takeLatest(declineOffer, declineOfferSaga),
    takeLatest(acceptOffer, acceptOfferSaga),
  ]);
}

export {
  offersWatcher,
  modifyOfferSaga,
  getOffersSaga,
  checkExpiredOfferSaga,
  declineOfferSaga,
  acceptOfferSaga,
};
 