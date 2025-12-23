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

describe('')