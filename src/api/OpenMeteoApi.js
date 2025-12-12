import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export async function fetchCurrentWeather(lat, lon) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                latitude: lat,
                longitude: lon,
                hourly: 'temperature_2m,weather_code,rain'
            }
        });

        return response.data;
    } catch (error) {
        console.warn('fetchCurrentWeather error:', error);
        throw error;
    }
}