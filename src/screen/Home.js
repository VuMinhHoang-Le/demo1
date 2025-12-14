import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import HomeStyles from '../styles/HomeStyles';
import { fetchCurrentWeather } from '../api/OpenMeteoApi';
import Geolocation from 'react-native-geolocation-service';

import {
  requestLocationPermission,
  checkLocationPermission,
} from '../utils/PermissionsManager';

import { getDeviceLocation } from '../services/LocationService';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';

const Home = props => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function init() {
      const status = await checkLocationPermission();
      if (status === RESULTS.GRANTED) {
        setPermissionGranted(true);
      } else {
        const result = await requestLocationPermission();
        setPermissionGranted(result.granted);
      }
    }
    init();
  }, []);

  useEffect(() => {
    async function getLocation() {
      try {
        const coords = await getDeviceLocation();
        setCoords({
          latitude: coords.coords.latitude,
          longitude: coords.coords.longitude,
        });
      } catch (err) {
        console.warn('error: cannot fetch GPS Location: ', err);
      }
    }

    getLocation();
  }, [permissionGranted]);

  useEffect(() => {
    if (!coords) return;
    fetchWeatherData(coords);
  }, [coords]);

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
          <Text>Temperature: {weather.hourly.temperature_2m[0]} °C</Text>
          <Text>{ coords.latitude }</Text>
          <Text>{ coords.longitude }</Text>
        </View>
      ) : (
        <View>
          <Text>No weather data yet</Text>
        </View>
      )}
    </View>
  );
};

Home.options = {
  topBar: { title: { text: 'Home' } },
  bottomTab: { text: 'Home' },
};

export default Home;
