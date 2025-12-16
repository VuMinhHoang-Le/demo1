import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const FavouriteScreen = props => {
  const permission = useSelector(
    state => state.permissionData.permissionGranted,
  );
  const currentTime = useSelector(
    state => state.currentLocationInfoData.currentTime,
  );

  return (
    <View>
      <Text>Favourite Screen</Text>
      <Text> {String(permission)} </Text>
      <Text> {currentTime} </Text>
    </View>
  );

  FavouriteScreen.options = {};
};

export default FavouriteScreen;
