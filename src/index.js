import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { setIndexBottomTab } from './navigation/index/setRoot';
import { registerComponent } from './navigation/index/registerComponent';

registerComponent();

Navigation.events().registerAppLaunchedListener(() => {
  setIndexBottomTab();
});
