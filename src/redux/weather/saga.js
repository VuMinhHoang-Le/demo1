import { call, put, fork, takeLatest } from 'redux-saga/effects';

import {
  getCurrentLocationWeatherSuccess,
  getCurrentLocationWeatherFailed,
  getSearchLocationWeatherSuccess,
  getSearchLocationWeatherFailed,
  getLocationNameSuccess,
  getLocationNameFailed,
  getCurrentLocationWeatherPending,
  getSearchLocationWeatherPending,
} from './actions';
import {
  GET_CURRENT_LOCATION_WEATHER,
  GET_SEARCH_LOCATION_WEATHER,
  GET_LOCATION_NAME,
} from './utils';
import { fetchApiWeatherToday, getCoordinatesOnName } from '../../api/api';
import { getDeviceLocation } from '../../services/LocationService';
import {
  checkLocationPermission,
  requestLocationPermission,
} from '../../services/PermissionsService';
import { RESULTS } from 'react-native-permissions';

export function* getCurrentLocationWeatherSaga(action) {
  console.log('get current location weather saga triggered', action.payload);
  try {
    yield put(getCurrentLocationWeatherPending());

    const permission = yield call(checkLocationPermission);
    if (permission !== RESULTS.GRANTED) {
      yield call(requestLocationPermission);
    }

    const position = yield call(getDeviceLocation);
    const { latitude, longitude } = position.coords;

    const weatherData = yield call(fetchApiWeatherToday, latitude, longitude);

    yield put(getCurrentLocationWeatherSuccess(weatherData));
  } catch (err) {
    yield put(getCurrentLocationWeatherFailed(err));
  }
}

export function* getSearchLocationWeatherSaga(action) {
  console.log('saga_list_click_trigger:', action.payload);
  try {
    yield put(getSearchLocationWeatherPending());

    const searchName = action.payload;
    console.log('searchName: ', searchName);
    const locationData = yield call(getCoordinatesOnName, searchName);

    console.log('saga_sea_loc_locationData: ', locationData);
    const {
      results: [{ name, country, latitude, longitude }],
    } = locationData;

    const weatherData = yield call(fetchApiWeatherToday, latitude, longitude);

    console.log('saga_sea_loc_weatherData:', weatherData);

    const locationName = name + ', ' + country;

    yield put(
      getSearchLocationWeatherSuccess({
        weatherData,
        locationName,
      }),
    );
  } catch (err) {
    yield put(getSearchLocationWeatherFailed(err));
  }
}

export function* watchAsync() {
  yield takeLatest(
    GET_CURRENT_LOCATION_WEATHER.HANDLED,
    getCurrentLocationWeatherSaga,
  );
  yield takeLatest(
    GET_SEARCH_LOCATION_WEATHER.HANDLED,
    getSearchLocationWeatherSaga,
  );
}

export default function* weatherSaga() {
  yield fork(watchAsync);
}
