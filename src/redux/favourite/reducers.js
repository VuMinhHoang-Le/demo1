import { handleActions } from 'redux-actions';
import { GET_FAVOURITE, REMOVE_FAVOURITE, UPDATE_FAVOURITE } from './utils';

const defaultState = {
  favourites: [],
};

export const favouriteReducer = handleActions(
  {
    [UPDATE_FAVOURITE.SUCCESS]: (state, action) => {
      const favourite = action.payload;
      const filtered = state.favourites.filter(fav => fav != favourite);
      return {
        ...state,
        favourites: [favourite, ...filtered],
      };
    },
    [REMOVE_FAVOURITE.SUCCESS]: (state, action) => {
      const favourite = action.payload;
      console.log('redu_hist_remv_payload', favourite);

      return {
        ...state,
        favourites: state.favourites.filter(fav => fav != favourite),
      };    
    },
  },
  defaultState,
);
