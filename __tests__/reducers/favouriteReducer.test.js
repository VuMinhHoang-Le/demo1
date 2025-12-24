import {
    removeFavouriteSuccess,
    updateFavouriteSuccess,
} from '../../src/redux/favourite/actions';
import { favouriteReducer } from '../../src/redux/favourite/reducers';


describe('Favourite Reducer:', () => {
  it('add item to favourite on UPDATE_FAVOURITE.SUCCESS', () => {
    const mockFavouriteItem1 = {
      id: 1,
      title: 'Ha Noi, Vietnam',
      name: 'Ha Noi',
    };

    const state = favouriteReducer(
      undefined,
      updateFavouriteSuccess(mockFavouriteItem1),
    );

    expect(state.favourites).toEqual([mockFavouriteItem1]);
  });

  it('remove item to history on REMOVE_HISTORY.SUCCESS', () => {
    const mockFavouriteItem1 = {
      id: 1,
      title: 'Ha Noi, Vietnam',
      name: 'Ha Noi',
    };
    const mockFavouriteItem2 = {
      id: 2,
      title: 'Da Nang, Vietnam',
      name: 'Da Nang',
    };
    const initialState = {
      favourites: [mockFavouriteItem1, mockFavouriteItem2],
    };

    const state = favouriteReducer(
      initialState,
      removeFavouriteSuccess(mockFavouriteItem1),
    );

    expect(state.favourites).toEqual([mockFavouriteItem2]);
  });
});