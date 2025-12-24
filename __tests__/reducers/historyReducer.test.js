import {
    removeHistorySuccess,
    updateHistorySuccess,
} from '../../src/redux/history/actions';
import { historyReducer } from '../../src/redux/history/reducers';

describe('Search History Reducer:', () => {
  it('add item to history on UPDATE_HISTORY.SUCCESS', () => {
    const mockHistoryItem1 = {
      id: 1,
      title: 'Ha Noi, Vietnam',
      name: 'Ha Noi',
    };

    const state = historyReducer(
      undefined,
      updateHistorySuccess(mockHistoryItem1),
    );

    expect(state.histories).toEqual([mockHistoryItem1]);
  });

  it('remove item to history on REMOVE_HISTORY.SUCCESS', () => {
    const mockHistoryItem1 = {
      id: 1,
      title: 'Ha Noi, Vietnam',
      name: 'Ha Noi',
    };
    const mockHistoryItem2 = {
      id: 2,
      title: 'Da Nang, Vietnam',
      name: 'Da Nang',
    };
    const initialState = {
      histories: [mockHistoryItem1, mockHistoryItem2],
    };

    const state = historyReducer(
      initialState,
      removeHistorySuccess(mockHistoryItem1),
    );

    expect(state.histories).toEqual([mockHistoryItem2]);
  });
});
