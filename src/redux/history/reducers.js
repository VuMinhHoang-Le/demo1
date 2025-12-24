import { handleActions } from 'redux-actions';
import { GET_HISTORY, REMOVE_HISTORY, UPDATE_HISTORY } from './utils';

const defaultState = {
  histories: [],
};

export const historyReducer = handleActions(
  {
    [UPDATE_HISTORY.SUCCESS]: (state, action) => {
      const history = action.payload;
      const filtered = state.histories.filter(h => h.id != history.id);
      return {
        ...state,
        histories: [history, ...filtered],
      };
    },
    [REMOVE_HISTORY.SUCCESS]: (state, action) => {
      const history = action.payload;

      return {
        ...state,
        histories: state.histories.filter(h => h.id != history.id),
      };    
    },
  },
  defaultState,
);
