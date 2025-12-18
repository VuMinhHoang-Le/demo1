import { createAction } from 'redux-actions';
import { FETCH_LOCATION } from './utils';

export const fetchLocationHandled = createAction(FETCH_LOCATION.HANDLED);
export const fetchLocationPending = createAction(FETCH_LOCATION.PENDING);
export const fetchLocationSuccess = createAction(FETCH_LOCATION.SUCCESS);
export const fetchLocationFailed = createAction(FETCH_LOCATION.FAILED);
