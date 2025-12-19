import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { List } from '../../components/favourite/list';
import { getSearchLocationWeatherHandled } from '../../redux/weather/actions';
import { removeFavouriteSuccess } from '../../redux/favourite/actions';
import { updateHistorySuccess } from '../../redux/history/actions';

const FavouriteScreen = props => {
  const { favourites } = useSelector(state => state.favouriteState);

  const dispatch = useDispatch();

  return (
    <View>
      <List
        data={favourites}
        onPressItem={item => {
          dispatch(updateHistorySuccess(item));
          dispatch(getSearchLocationWeatherHandled(item.name));
        }}
        onButtonPressItemRemove={item => {
          dispatch(removeFavouriteSuccess(item));
        }}
      />
    </View>
  );

  FavouriteScreen.options = {};
};

export default FavouriteScreen;
