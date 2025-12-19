import { createAction } from 'redux-actions';
import { GET_FAVOURITE, UPDATE_FAVOURITE, REMOVE_FAVOURITE } from './utils';

export const getFavouriteHandled = createAction(GET_FAVOURITE.HANDLED);
export const getFavouritePending = createAction(GET_FAVOURITE.PENDING);
export const getFavouriteSuccess = createAction(GET_FAVOURITE.SUCCESS);
export const getFavouriteFailed = createAction(GET_FAVOURITE.FAILED);

export const updateFavouriteHandled = createAction(UPDATE_FAVOURITE.HANDLED);
export const updateFavouritePending = createAction(UPDATE_FAVOURITE.PENDING);
export const updateFavouriteSuccess = createAction(UPDATE_FAVOURITE.SUCCESS);
export const updateFavouriteFailed = createAction(UPDATE_FAVOURITE.FAILED);

export const removeFavouriteHandled = createAction(REMOVE_FAVOURITE.HANDLED);
export const removeFavouritePending = createAction(REMOVE_FAVOURITE.PENDING);
export const removeFavouriteSuccess = createAction(REMOVE_FAVOURITE.SUCCESS);
export const removeFavouriteFailed = createAction(REMOVE_FAVOURITE.FAILED);
