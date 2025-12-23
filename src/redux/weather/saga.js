import { call, fork, put, takeLatest } from 'redux-saga/effects';

import { RESULTS } from 'react-native-permissions';
import { fetchApiWeatherToday, getCoordinatesOnName } from '../../api/api';
import { getDeviceLocation } from '../../services/LocationService';
import {
  checkLocationPermission,
  requestLocationPermission,
} from '../../services/PermissionsService';
import {
  getCurrentLocationWeatherFailed,
  getCurrentLocationWeatherPending,
  getCurrentLocationWeatherSuccess,
  getSearchLocationWeatherFailed,
  getSearchLocationWeatherPending,
  getSearchLocationWeatherSuccess,
} from './actions';
import {
  GET_CURRENT_LOCATION_WEATHER,
  GET_SEARCH_LOCATION_WEATHER,
} from './utils';

//--------------- Current Location Weather Saga ---------------//

export function* getCurrentLocationWeatherSaga(action) {
  console.log('SUCCESS triggered Current Location Weather Saga');
  try {
    yield put(getCurrentLocationWeatherPending());

    const permission = yield call(checkLocationPermission);
    if (permission !== RESULTS.GRANTED) {       // Add cases if user press No (permission = no, pressNo = true)
      yield call(requestLocationPermission);
    }

    const position = yield call(getDeviceLocation);
    if (!position || !position.coords)
      throw new Error('cannot get device location');

    const { latitude, longitude } = position.coords;

    const weatherData = yield call(fetchApiWeatherToday, latitude, longitude);
    if (!weatherData || weatherData == {} || weatherData.error)
      throw new Error('cannot get current weather data');

    yield put(getCurrentLocationWeatherSuccess(weatherData));
  } catch (error) {
    yield put(getCurrentLocationWeatherFailed(error));
    console.warn('cannot getCurrentLocationWeatherSaga: ', error);
  }
}

//--------------- Search Location Weather Saga ---------------//

export function* getSearchLocationWeatherSaga(action) {
  console.log('SUCCESS triggered item at Search Screen:', action.payload);
  try {
    yield put(getSearchLocationWeatherPending());

    const searchName = action.payload;
    if(!searchName || searchName == '') throw new Error('search name is invalid');

    const locationData = yield call(getCoordinatesOnName, searchName);
    if (!locationData) throw new Error('cannot get location data');

    const {
      results: [{ name, country, latitude, longitude }],
    } = locationData;

    const weatherData = yield call(fetchApiWeatherToday, latitude, longitude);
    if (!weatherData) throw new Error('cannot fetch weather data');

    const locationName = name + ', ' + country;

    yield put(
      getSearchLocationWeatherSuccess({
        weatherData,
        locationName,
      }),
    );
  } catch (error) {
    yield put(getSearchLocationWeatherFailed(error));
    console.warn('FAILED getSearchLocationWeatherSaga: ', error);
  }
}

//--------------- Others ---------------//

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
