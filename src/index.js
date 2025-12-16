import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { setIndexBottomTab } from './navigation/Index/SetRoot';
import { registerComponent } from './navigation/Index/RegisterComponent';

registerComponent();

Navigation.events().registerAppLaunchedListener(() => {
  setIndexBottomTab();
});
