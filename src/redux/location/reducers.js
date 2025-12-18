import { handleActions } from 'redux-actions';
import { FETCH_LOCATION } from './utils';

const defaultState = {
  time: null,
  coordinates: null,
  error: null,
};

export const fetchLocationReducer = handleActions(
  {
    [FETCH_LOCATION.HANDLED]: (state) => ({
      ...state,
      loading: false,
    }),

    [FETCH_LOCATION.PENDING]: (state) => ({
      ...state,
    }),

    [FETCH_LOCATION.SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      coordinates: action.payload,
    }),

    [FETCH_LOCATION.FAILED]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  defaultState
);

