import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import HomeStyles from '../styles/HomeStyles';
import { fetchCurrentWeather } from './api/OpenMeteoApi';

const Home = (props) => {
  const initialCoords = props.GpsCoords || null;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (initialCoords) {
      fetchWeatherData(initialCoords);
    }
  }, [initialCoords]);

  async function fetchWeatherData(coords) {
    try {
      const data = await fetchCurrentWeather(coords.latitude, coords.longitude);
      setWeather(data);
    } catch (err) {
      console.warn('fetchWeatherData error', err);
    }
  }

  return (
    <View style={HomeStyles.root}>
      {weather ? (
        <View>
          <Text>Weather</Text>
          <Text>Temperature: {weather.current_weather?.temperature} °C</Text>
        </View>
      ) : (
        <Text>No weather data yet</Text>
      )}
    </View>
  );
};

Home.options = {
  topBar: { title: { text: 'Home' } },
  bottomTab: { text: 'Home' },
};

export default Home;
