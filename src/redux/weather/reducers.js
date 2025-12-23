import { handleActions } from 'redux-actions';
import {
  GET_CURRENT_LOCATION_WEATHER,
  GET_SEARCH_LOCATION_WEATHER,
  GET_LOCATION_NAME,
} from './utils';

const defaultState = {
  weathers: [],
  currentWeatherData: null,
  locationName: '',
  loading: false,
  error: null,
  //
  searchWeatherData: null,
  searchLocationName: '',
  searchLoading: '',
};

export const weatherReducer = handleActions(
  {
    [GET_CURRENT_LOCATION_WEATHER.PENDING]: state => ({
      ...state,
      loading: true,
    }),
    [GET_CURRENT_LOCATION_WEATHER.SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      currentWeatherData: action.payload,
      locationName: 'current GPS location',
    }),

    [GET_CURRENT_LOCATION_WEATHER.FAILED]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    [GET_SEARCH_LOCATION_WEATHER.PENDING]: state => {
      return {
        ...state,
        loading: true,
      };
    },
    [GET_SEARCH_LOCATION_WEATHER.SUCCESS]: (state, action) => {
      return {
        ...state,
        loading: false,
        currentWeatherData: action.payload.weatherData,
        locationName: action.payload.locationName,
      };
    },

    [GET_SEARCH_LOCATION_WEATHER.FAILED]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    // [GET_LOCATION_NAME.SUCCESS]: (state, action) => ({
    //   ...state,
    //   loading: false,
    //   currentWeatherData: action.payload,
    // }),

    // [GET_LOCATION_NAME.FAILED]: (state, action) => ({
    //   ...state,
    //   loading: false,
    //   error: action.payload,
    // }),
  },
  defaultState,
);
