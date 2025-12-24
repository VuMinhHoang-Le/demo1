import {
  selectWeatherState,
  selectCurrentWeatherData,
  selectLoading,
  selectLocationName,
  selectError,
} from '../../src/redux/weather/selectors';

const mockStateSuccess = {
  weatherState: {
    currentWeatherData: { hourly: [1, 2] },
    locationName: 'city, country',
    loading: false,
    error: null,
  },
};

const mockStateFailed = {
  weatherState: {
    currentWeatherData: null,
    locationName: '',
    loading: false,
    error: true,
  },
};

describe('Weather selectors: ', () => {
  it('selectCurrentWeatherData on success dispatch getCurrentLocationWeatherData', () => {
    const currentWeatherData = selectCurrentWeatherData(mockStateSuccess);
    expect(currentWeatherData).toStrictEqual({ hourly: [1, 2] });
    
  });

  it('selectCurrentWeatherData on failed dispatch getCurrentLocationWeatherData', () => {
    const currentWeatherData = selectCurrentWeatherData(mockStateFailed);
    expect (currentWeatherData).toEqual(null)
  });

});
