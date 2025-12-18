import { createAction } from 'redux-actions';
import { GET_HISTORY, UPDATE_HISTORY, REMOVE_HISTORY } from './utils';

export const getHistoryHandled = createAction(GET_HISTORY.HANDLED);
export const getHistoryPending = createAction(GET_HISTORY.PENDING);
export const getHistorySuccess = createAction(GET_HISTORY.SUCCESS);
export const getHistoryFailed = createAction(GET_HISTORY.FAILED);

export const updateHistoryHandled = createAction(UPDATE_HISTORY.HANDLED);
export const updateHistoryPending = createAction(UPDATE_HISTORY.PENDING);
export const updateHistorySuccess = createAction(UPDATE_HISTORY.SUCCESS);
export const updateHistoryFailed = createAction(UPDATE_HISTORY.FAILED);

export const removeHistoryHandled = createAction(REMOVE_HISTORY.HANDLED);
export const removeHistoryPending = createAction(REMOVE_HISTORY.PENDING);
export const removeHistorySuccess = createAction(REMOVE_HISTORY.SUCCESS);
export const removeHistoryFailed = createAction(REMOVE_HISTORY.FAILED);
