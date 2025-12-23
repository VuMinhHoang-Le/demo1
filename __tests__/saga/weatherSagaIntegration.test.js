jest.mock('../../src/services/PermissionsService');
jest.mock('../../src/services/LocationService');
jest.mock('../../src/api/api');

import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { RESULTS } from '../../__mocks__/react-native-permissions';

import {
  mockLocationData,
  mockPosition,
  mockSearchName,
  mockWeatherData
} from '../../__mocks__/testUtils/mockDataWeather';
import { fetchApiWeatherToday, getCoordinatesOnName } from '../../src/api/api';
import {
  getCurrentLocationWeatherFailed,
  getCurrentLocationWeatherPending,
  getCurrentLocationWeatherSuccess,
  getSearchLocationWeatherFailed,
  getSearchLocationWeatherPending,
  getSearchLocationWeatherSuccess,
} from '../../src/redux/weather/actions';
import {
  getCurrentLocationWeatherSaga,
  getSearchLocationWeatherSaga,
} from '../../src/redux/weather/saga';
import { getDeviceLocation } from '../../src/services/LocationService';
import {
  checkLocationPermission
} from '../../src/services/PermissionsService';

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  console.warn.mockRestore();
  console.log.mockRestore();
});

//--------------- Test Current Location Weather Saga ---------------//

describe('getCurrentLocationWeatherSaga', () => {
  it('dispatch successfully when current location weather succeeds', () => {
    return expectSaga(getCurrentLocationWeatherSaga)
      .provide([
        [call(checkLocationPermission), RESULTS.GRANTED],
        [call(getDeviceLocation), mockPosition],
        [
          call(
            fetchApiWeatherToday,
            mockPosition.coords.latitude,
            mockPosition.coords.longitude,
          ),
          mockWeatherData,
        ],
      ])
      .put(getCurrentLocationWeatherPending())
      .put(getCurrentLocationWeatherSuccess(mockWeatherData))
      .run();
  });

  it('dispatch failed when device location is invalid', () => {
    return expectSaga(getCurrentLocationWeatherSaga)
      .provide([
        [call(checkLocationPermission), RESULTS.GRANTED],
        [call(getDeviceLocation), null],
      ])
      .put(getCurrentLocationWeatherPending())
      .put.like({
        action: {
          type: getCurrentLocationWeatherFailed().type,
          error: true,
          payload: new Error('cannot get device location'),
        },
      })
      .run();
  });

  it('dispatch failed when weather data is invalid', () => {
    return expectSaga(getCurrentLocationWeatherSaga)
      .provide([
        [call(checkLocationPermission), RESULTS.GRANTED],
        [call(getDeviceLocation), mockPosition],
        [
          call(
            fetchApiWeatherToday,
            mockPosition.coords.latitude,
            mockPosition.coords.longitude,
          ),
          null,
        ],
      ])
      .put(getCurrentLocationWeatherPending())
      .put.like({
        action: {
          type: getCurrentLocationWeatherFailed().type,
          error: true,
          payload: new Error('cannot get current weather data'),
        },
      })
      .run();
  });
});

//--------------- Test Search Location Weather Saga ---------------//

describe('getSearchLocationWeatherSaga', () => {
  it('dispatch successfully when search location weather succeeds', () => {
    return expectSaga(getSearchLocationWeatherSaga, {
      payload: mockSearchName,
    })
      .provide([
        [call(getCoordinatesOnName, mockSearchName), mockLocationData],
        [
          call(
            fetchApiWeatherToday,
            mockLocationData.results[0].latitude,
            mockLocationData.results[0].longitude,
          ),
          mockWeatherData,
        ],
      ])
      .put(getSearchLocationWeatherPending())
      .put(
        getSearchLocationWeatherSuccess({
          weatherData: mockWeatherData,
          locationName:
            mockLocationData.results[0].name +
            ', ' +
            mockLocationData.results[0].country,
        }),
      )
      .run();
  });

  it('dispatch failed when search name is invalid', () => {
    return expectSaga(getSearchLocationWeatherSaga, {
      payload: null,
    })
      .put(getSearchLocationWeatherPending())
      .put.like({
        action: {
          type: getSearchLocationWeatherFailed().type,
          error: true,
          payload: new Error('search name is invalid'),
        },
      })
      .run();
  });

  it('dispatch failed when location data is invalid', () => {
    return expectSaga(getSearchLocationWeatherSaga, {
      payload: mockSearchName,
    })
      .provide([[call(getCoordinatesOnName, mockSearchName), null]])
      .put(getSearchLocationWeatherPending())
      .put.like({
        action: {
          type: getSearchLocationWeatherFailed().type,
          error: true,
          payload: new Error('cannot get location data'),
        },
      })
      .run();
  });

  it('dispatch failed when weather data is invalid', () => {
    return expectSaga(getSearchLocationWeatherSaga, {
      payload: mockSearchName,
    })
      .provide(
        [[call(getCoordinatesOnName, mockSearchName), mockLocationData]],
        [
          call(
            fetchApiWeatherToday,
            mockLocationData.results[0].latitude,
            mockLocationData.results[0].longitude,
          ),
          null,
        ],
      )
      .put(getSearchLocationWeatherPending())
      .put.like({
        action: {
          type: getSearchLocationWeatherFailed().type,
          error: true,
          payload: new Error('cannot fetch weather data'),
        },
      })
      .run();
  });
});
