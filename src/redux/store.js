import { combineReducers, createStore } from 'redux';

const testState = {
    test: true,
}

const permissionState = {
    permissionGranted: false,
}

const currentLocationState = {
    gpsCoordinates: null,
    currentTime: 1,
    weather: null,
}

const rootReducer = combineReducers({
    testData: () => testState,
    permissionData: () => permissionState,
    currentLocationInfoData: () => currentLocationState,
})

export const store = createStore(rootReducer);