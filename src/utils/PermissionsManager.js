import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native'
import { Geolocation } from 'react-native-geolocation-service';

function isAndroid() {
    return Platform.OS === 'android';
}

export async function checkLocationPermissionToRequestOrGetLocation() {
    if (!isAndroid()) return false;

    try {
        const permGranted = await PermissionsAndroid.check (
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
       return permGranted;
    }
    catch (err) {
        console.warn('Error with hasLocationPermission', err);
        return false;
    }
}

export async function requestLocationPermission() {
    if (!isAndroid()) return { granted: true, status: 'not-applicable'};

    try {
        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Require Device GPS Permission',
                message: 'This app requires GPS permission to function optimally.',
                buttonPositive: 'Allow permission to app',
                buttonNegative: 'Deny permission to app'
            },
        );
        return  { granted: result === PermissionsAndroid.RESULTS.GRANTED, status: result}
    }
    catch (err) {
        console.warn('requestLocationPermission has error.', err);
        return { granted: false, status: 'error'}
    }
}

export async function getDeviceLocation() {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error),
            {
                enableHighAccuracy:true,
                timeout: 15000,
                maximumAge: 1000,
            }
        );
    });
}