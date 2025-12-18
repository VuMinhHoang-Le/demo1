  import { Platform, Alert, Linking } from 'react-native';
  import { Geolocation } from 'react-native-geolocation-service';
  import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

  function isAndroid() {
    return Platform.OS === 'android';
  }

  export async function checkLocationPermission() {
    if (!isAndroid()) return RESULTS.GRANTED;

    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      return result;
    } catch (error) {
      console.log('Error: cannot check permission - ', error);
    }
  }

  export async function requestLocationPermission() {
    if (!isAndroid()) return { granted: true, status: 'not-applicable' };

    try {
      const result = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        {
          title: 'Require Device GPS Permission',
          message: 'This app requires GPS permission to function optimally.',
          buttonPositive: 'Allow permission to app',
          buttonNegative: 'Deny permission to app',
        },
      );
      return {
        granted: result === RESULTS.GRANTED,
        status: result,
      };
    } catch (err) {
      console.warn('requestLocationPermission has error.', err);
      return { granted: false, status: 'error' };
    }
  }
