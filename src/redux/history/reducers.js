import { handleActions } from 'redux-actions';
import { GET_HISTORY, REMOVE_HISTORY, UPDATE_HISTORY } from './utils';

const defaultState = {
  histories: [],
};

export const historyReducer = handleActions({
  [UPDATE_HISTORY.SUCCESS]: (state, action) => {
    const history = action.payload;
    const filtered = state.histories.filter(h => h != history);
    return {
      ...state,
      histories: [history, ...filtered],
    };
  },
  [REMOVE_HISTORY.SUCCESS]: (state, action) => {
    const history = action.payload;
    console.log('redu_hist_remv_payload', history);

    return {
      ...state,
      histories: state.histories.filter(h => h != history),
    };
  },
});
