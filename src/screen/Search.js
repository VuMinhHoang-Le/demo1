import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import SearchStyles from '../styles/HomeStyles';

const Search = props => {
  return (
    <View style={SearchStyles.root}>
      <Text>Screen for Search</Text>
    </View>
  );
};
Search.options = {
  topBar: {
    title: {
      text: 'Search',
    },
  },
  bottomTab: {
    text: 'Search',
  },
};

export default Search;
