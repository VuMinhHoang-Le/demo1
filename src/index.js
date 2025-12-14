import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { Home, Search } from './screen';

import {
  requestLocationPermission,
  checkLocationPermissionToRequestOrGetLocation,
  getDeviceLocation,
} from './utils/PermissionsManager';

Navigation.registerComponent('Home', () => props => <Home {...props} />);
Navigation.registerComponent('Search', () => props => <Search {...props} />);

Navigation.events().registerAppLaunchedListener(async () => {
  // let GpsCoords = null;
  // console.log('here 18');
  // try {
  //   console.log('here 20');
  //   const granted = await checkLocationPermissionToRequestOrGetLocation().catch(
  //     err => {
  //       console.log(err);
  //     },
  //   );
  // } catch (error) {
  //   console.log('error: ', error);
  // }
  // if (result.granted) {
  //   try {
  //     const pos = await getDeviceLocation();
  //     if (pos && pos.coords) {
  //       GpsCoords = {
  //         latitude: pos.coords.latitude,
  //         longitude: pos.coords.longitude,
  //       };
  //     }
  //   } catch (err) {
  //     console.warn('unable to fetch GPS location', err);
  //   }
  // } else {
  //   await requestLocationPermission();
  // }

  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home',
                  },
                },
              ],
              options: {
                bottomTab: { text: 'Home' },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Search',
                  },
                },
              ],
              options: {
                bottomTab: { text: 'Search' },
              },
            },
          },
        ],
      },
    },
  });
});
