export const selectWeatherState = state => state.weatherState;
export const selectCurrentWeatherData = state => state.weatherState.currentWeatherData;
export const selectLocationName = state => state.weatherState.locationName;
export const selectLoading = state => state.weatherState.loading;
export const selectError = state => state.weatherState.error;

