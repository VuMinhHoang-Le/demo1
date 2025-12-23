import { createAction } from 'redux-actions';
import {
  GET_CURRENT_LOCATION_WEATHER,
  GET_SEARCH_LOCATION_WEATHER,
  GET_LOCATION_NAME,
} from './utils';

export const getCurrentLocationWeatherHandled = createAction(
  GET_CURRENT_LOCATION_WEATHER.HANDLED,
);
export const getCurrentLocationWeatherPending = createAction(
  GET_CURRENT_LOCATION_WEATHER.PENDING,
);
export const getCurrentLocationWeatherSuccess = createAction(
  GET_CURRENT_LOCATION_WEATHER.SUCCESS,
);
export const getCurrentLocationWeatherFailed = createAction(
  GET_CURRENT_LOCATION_WEATHER.FAILED,
);
export const getSearchLocationWeatherHandled = createAction(
  GET_SEARCH_LOCATION_WEATHER.HANDLED,
);
export const getSearchLocationWeatherPending = createAction(
  GET_SEARCH_LOCATION_WEATHER.PENDING,
);
export const getSearchLocationWeatherSuccess = createAction(
  GET_SEARCH_LOCATION_WEATHER.SUCCESS,
);
export const getSearchLocationWeatherFailed = createAction(
  GET_SEARCH_LOCATION_WEATHER.FAILED,
);
export const getLocationNameSuccess = createAction(
  GET_LOCATION_NAME.SUCCESS,
);
export const getLocationNameFailed = createAction(
  GET_LOCATION_NAME.FAILED,
);