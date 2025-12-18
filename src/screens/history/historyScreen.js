import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { List } from '../../components/history/list';

const HistoryScreen = props => {

  const {
    histories,
  } = useSelector(state => state.historyState);

  return (
    <View>
      <List data={histories} onPressItem={item => {
        
      }}/>
    </View>
  );

  HistoryScreen.options = {};
};

export default HistoryScreen;
