import Geolocation from 'react-native-geolocation-service';

export async function getDeviceLocation() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000,
      },
    );
  });
}


async function checkLocationPermission() {
  if (!isAndroid()) return RESULTS.GRANTED;

  try {
    return check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  } catch (error) {
    console.log('Error: cannot check permission - ', error);
  }
}