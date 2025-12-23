import axios from 'axios';

const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export async function fetchApiWeatherToday(lat, lon) {
  try {
    const response = await axios.get(FORECAST_BASE_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: 'temperature_2m,weather_code,rain',
        forecast_days: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.warn('fetchCurrentWeather error:', error);
    throw error;
  }
}

export async function getCoordinatesOnName(name) {
  try {
    const response = await axios.get(GEOCODING_BASE_URL, {
      params: {
        name: name,
        count: 1,
        language: 'en',
        format: 'json',
      },
    });
    return response.data;
  } catch (err) {
    console.warn('Error: Unable to fetch API Geology - ', err);
  }
}
