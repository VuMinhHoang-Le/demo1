import { handleActions } from 'redux-actions';
import {
  GET_CURRENT_LOCATION_WEATHER,
  GET_SEARCH_LOCATION_WEATHER,
  GET_LOCATION_NAME,
} from './utils';

const defaultState = {
  weathers: [],
  data: null,
  locationName: '',
  loading: false,
  error: null,
};

export const weatherReducer = handleActions(
  {
    [GET_CURRENT_LOCATION_WEATHER.SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      data: action.payload,
    }),

    [GET_CURRENT_LOCATION_WEATHER.FAILED]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    [GET_SEARCH_LOCATION_WEATHER.SUCCESS]: (state, action) => {
      console.log('REDUCER HIT:', action.payload);
      return {
        ...state,
        loading: false,
        data: action.payload.weatherData,
        locationName: action.payload.locationNae,
      };
    },

    [GET_SEARCH_LOCATION_WEATHER.FAILED]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    [GET_LOCATION_NAME.SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      data: action.payload,
    }),

    [GET_LOCATION_NAME.FAILED]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  defaultState,
);
