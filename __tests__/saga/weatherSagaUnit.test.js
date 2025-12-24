jest.mock('../../src/services/PermissionsService');
jest.mock('../../src/services/LocationService');
jest.mock('../../src/api/api');

import { testSaga } from 'redux-saga-test-plan';
import { RESULTS } from '../../__mocks__/react-native-permissions';

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
  checkLocationPermission,
  requestLocationPermission,
} from '../../src/services/PermissionsService';
import {
  mockPosition,
  mockLocationData,
  mockWeatherData,
  mockLocationName,
  mockSearchName,
  mockError,
} from '../../__mocks__/testUtils/mockDataWeather';

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  console.warn.mockRestore();
  console.log.mockRestore();
});

//--------------- Test Current Location Weather Saga ---------------//

describe('Unit Test getCurrentLocationWeatherSaga', () => {
  it('should dispatch successfully with permission granted', () => {
    const permissionResult = RESULTS.GRANTED;

    testSaga(getCurrentLocationWeatherSaga)
      .next()

      .put(getCurrentLocationWeatherPending())
      .next()

      .call(checkLocationPermission)
      .next(permissionResult)

      .call(getDeviceLocation)
      .next(mockPosition)

      .call(
        fetchApiWeatherToday,
        mockPosition.coords.latitude,
        mockPosition.coords.longitude,
      )
      .next(mockWeatherData)

      .put(getCurrentLocationWeatherSuccess(mockWeatherData))
      .next()

      .isDone();
  });

  it('should handle permission denied then dispatch successfully when granted', () => {
    const permissionResult = RESULTS.DENIED;
    const requestPermissionResult = RESULTS.GRANTED;

    testSaga(getCurrentLocationWeatherSaga)
      .next()

      .put(getCurrentLocationWeatherPending())
      .next()

      .call(checkLocationPermission)
      .next(permissionResult)

      .call(requestLocationPermission)
      .next(requestPermissionResult)

      .call(getDeviceLocation)
      .next(mockPosition)

      .call(
        fetchApiWeatherToday,
        mockPosition.coords.latitude,
        mockPosition.coords.longitude,
      )
      .next(mockWeatherData)

      .put(getCurrentLocationWeatherSuccess(mockWeatherData))
      .next()

      .isDone();
  });

  it('should handle request permission denied', () => {
    const permissionResult = RESULTS.DENIED;
    const requestPermissionResult = RESULTS.DENIED;
    const error = new Error('Location permission DENIED');

    testSaga(getCurrentLocationWeatherSaga)
      .next()

      .put(getCurrentLocationWeatherPending())
      .next()

      .call(checkLocationPermission)
      .next(permissionResult) //RESULT.DENIED

      .call(requestLocationPermission)
      .next(requestPermissionResult)

      .put(getCurrentLocationWeatherFailed(error))
      .next()

      .isDone();
  });

  it('should handle invalid device location', () => {
    const mockPosition = null;
    const mockPermissionResult = RESULTS.GRANTED;
    const mockError = new Error('cannot get device location');

    testSaga(getCurrentLocationWeatherSaga)
      .next()

      .put(getCurrentLocationWeatherPending())
      .next()

      .call(checkLocationPermission)
      .next(mockPermissionResult)

      .call(getDeviceLocation)
      .next(mockPosition)
      .put(getCurrentLocationWeatherFailed(mockError))
      .next()

      .isDone();
  });

  it('should handle invalid weather data', () => {
    const mockWeatherData = { error: true };
    const permissionResult = RESULTS.GRANTED;
    const mockError = new Error('cannot get current weather data');

    testSaga(getCurrentLocationWeatherSaga)
      .next()

      .put(getCurrentLocationWeatherPending())
      .next()

      .call(checkLocationPermission)
      .next(permissionResult)

      .call(getDeviceLocation)
      .next(mockPosition)

      .call(
        fetchApiWeatherToday,
        mockPosition.coords.latitude,
        mockPosition.coords.longitude,
      )
      .next(mockWeatherData)

      .put(getCurrentLocationWeatherFailed(mockError))
      .next()

      .isDone();
  });
});

//--------------- Test Search Location Weather Saga ---------------//

describe('Unit Test getSearchLocationWeatherSaga', () => {
  it('should dispatch successfully when search location', () => {
    const mockAction = {
      payload: mockSearchName,
    };
    testSaga(getSearchLocationWeatherSaga, mockAction)
      .next()

      .put(getSearchLocationWeatherPending())
      .next()

      .call(getCoordinatesOnName, mockSearchName)
      .next(mockLocationData)

      .call(
        fetchApiWeatherToday,
        mockLocationData.results[0].latitude,
        mockLocationData.results[0].longitude,
      )
      .next(mockWeatherData)

      .put(
        getSearchLocationWeatherSuccess({
          weatherData: mockWeatherData,
          locationName: mockLocationName,
        }),
      )
      .next()
      .isDone();
  });

  it('should handle invalid search name', () => {
    const mockSearchName = null;
    const mockAction = {
      payload: mockSearchName,
    };
    const mockError = new Error('search name is invalid');
    testSaga(getSearchLocationWeatherSaga, mockAction)
      .next()

      .put(getSearchLocationWeatherPending())
      .next()

      .put(getSearchLocationWeatherFailed(mockError))
      .next()
      .isDone();
  });

  it('should handle invalid location data', () => {
    const mockAction = {
      payload: mockSearchName,
    };
    const mockLocationData = null;
    const mockError = new Error('cannot get location data');
    testSaga(getSearchLocationWeatherSaga, mockAction)
      .next()

      .put(getSearchLocationWeatherPending())
      .next()

      .call(getCoordinatesOnName, mockSearchName)
      .next(mockLocationData)

      .put(getSearchLocationWeatherFailed(mockError))
      .next()
      .isDone();
  });

  it('should handle invalid weather data', () => {
    const mockAction = {
      payload: mockSearchName,
    };
    const mockWeatherData = null;
    const mockError = new Error('cannot fetch weather data');
    testSaga(getSearchLocationWeatherSaga, mockAction)
      .next()

      .put(getSearchLocationWeatherPending())
      .next()

      .call(getCoordinatesOnName, mockSearchName)
      .next(mockLocationData)

      .call(
        fetchApiWeatherToday,
        mockLocationData.results[0].latitude,
        mockLocationData.results[0].longitude,
      )
      .next(mockWeatherData)

      .put(getSearchLocationWeatherFailed(mockError))
      .next()
      .isDone();
  });
});
