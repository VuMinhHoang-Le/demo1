import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { RESULTS } from 'react-native-permissions';
import { fetchWeatherHourlyToday } from '../../api/OpenMeteoApi';
import { getDeviceLocation } from '../../services/LocationService';
import { getCurrentDateTime } from '../../utils/DateTimeManager';
import {
  checkLocationPermission,
  requestLocationPermission,
} from '../../utils/PermissionsManager';
import styles from './styles';
import { useSelector } from 'react-redux';

const HomeScreen = props => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [currentHour, setCurrentHour] = useState(0);
  const [loadingIndicator, setLoadingIndicator] = useState(true);

  const permission = useSelector(
    state => state.permissionData.permissionGranted,
  );
  const currentTime = useSelector(
    state => state.currentLocationInfoData.currentTime,
  );

  // Initialize when open app
  useEffect(() => {
    init();
    setCurrentHour(getCurrentDateTime);
  }, []);

  // Get location when permission is granted
  useEffect(() => {
    getLocation();
  }, [permissionGranted]);

  // Fetch weather data using
  useEffect(() => {
    if (!coords) return;
    fetchWeatherData(coords);
  }, [coords]);

  async function init() {
    const status = await checkLocationPermission();

    if (status === RESULTS.GRANTED) {
      setPermissionGranted(true);
    } else {
      const result = await requestLocationPermission();
      setPermissionGranted(result.granted);
    }
  }

  async function getLocation() {
    try {
      const position = await getDeviceLocation();
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (err) {
      console.warn('error: cannot fetch GPS Location: ', err);
    }
  }

  async function fetchWeatherData(coords) {
    try {
      const data = await fetchWeatherHourlyToday(
        coords.latitude,
        coords.longitude,
      );
      setWeather(data);
    } catch (err) {
      console.warn('fetchWeatherData error', err);
    } finally {
      setLoadingIndicator(false);
    }
  }

  return (
    <View style={styles.root}>
      {weather ? (
        <View style={styles.weatherBox}>
          <View></View>
          <Text style={styles.titleText}>Weather</Text>
          <Text style={styles.temperatureText}>
            Temperature: {weather.hourly.temperature_2m[currentHour]} °C
          </Text>
          <Text style={styles.timeText}>Current time: {currentHour}</Text>
          <Text style={styles.timeText}>{coords.latitude}</Text>
          <Text style={styles.timeText}>{coords.longitude}</Text>
          <Text> {String(permission)} </Text>
          <Text> {currentTime} </Text>
        </View>
      ) : (
        <View>
          <ActivityIndicator
            size="large"
            color="blue"
            animating={loadingIndicator}
          />
          <Text>No weather data yet</Text>
        </View>
      )}
    </View>
  );
};

HomeScreen.options = {
  topBar: { title: { text: 'Home' } },
  bottomTab: { text: 'Home' },
};

export default HomeScreen;
