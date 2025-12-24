import { weatherReducer } from '../../src/redux/weather/reducers';

import {
  mockError,
  mockLocationName,
  mockWeatherData
} from '../../__mocks__/testUtils/mockDataWeather';
import {
  getCurrentLocationWeatherFailed,
  getCurrentLocationWeatherPending,
  getCurrentLocationWeatherSuccess,
  getSearchLocationWeatherFailed,
  getSearchLocationWeatherPending,
  getSearchLocationWeatherSuccess,
} from '../../src/redux/weather/actions';


//--------------- Current Location Weather Reducer---------------//

describe('Current Location Weather: ', () => {
  it('set loading on GET_CURRENT_LOCATION_WEATHER.PENDING', () => {
    const state = weatherReducer(undefined, getCurrentLocationWeatherPending());
    expect(state.loading).toBe(true);
  });

  it('set loading and currentWeatherData on GET_CURRENT_LOCATION_WEATHER.SUCCESS', () => {
    const state = weatherReducer(
      undefined,
      getCurrentLocationWeatherSuccess(mockWeatherData),
    );

    expect(state.loading).toBe(false);
    expect(state.currentWeatherData).toEqual(mockWeatherData);
  });

  it('set loading and error on GET_CURRENT_LOCATION_WEATHER.FAILED', () => {
    const state = weatherReducer(
      undefined,
      getCurrentLocationWeatherFailed(mockError),
    );
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(mockError);
  });
});

//--------------- Search Location Weather Reducer---------------//

describe('Search Location Weather Reducer: ', () => {
  it('setloading on GET_SEARCH_LOCATION_WEATHER.PENDING', () => {
    const state = weatherReducer(undefined, getSearchLocationWeatherPending());
    expect(state.loading).toBe(true);
  });

  it('set loading and currentWeatherData and locationName on GET_SEARCH_LOCATION_WEATHER.SUCCESS', () => {
    const state = weatherReducer(
      undefined,
      getSearchLocationWeatherSuccess({
        weatherData: mockWeatherData,
        locationName: mockLocationName,
      }),
    );
    expect(state.loading).toBe(false);
    expect(state.currentWeatherData).toEqual(mockWeatherData);
    expect(state.locationName).toEqual(mockLocationName);
  });

  it('set loading and error on GET_SEARCH_LOCATION_WEATHER.FAILED', () => {
    const state = weatherReducer(
      undefined,
      getSearchLocationWeatherFailed(mockError),
    );
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(mockError);
  });
});
