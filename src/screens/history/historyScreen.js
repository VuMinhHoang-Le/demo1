import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { List } from '../../components/history/list';
import { removeHistorySuccess } from '../../redux/history/actions';
import { getSearchLocationWeatherHandled } from '../../redux/weather/actions';

const HistoryScreen = props => {
  const { histories } = useSelector(state => state.historyState);

  const dispatch = useDispatch();

  return (
    <View>
      <List
        data={histories}
        onPressItem={item => {
          dispatch(getSearchLocationWeatherHandled(item.name));
        }}
        onButtonPressItemLocation={item => {
          dispatch(getSearchLocationWeatherHandled(item.name));
        }}
        onButtonPressItemRemove={item => {
          dispatch(removeHistorySuccess(item));
        }}
      />
    </View>
  );

  HistoryScreen.options = {};
};

export default HistoryScreen;
