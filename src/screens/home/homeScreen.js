import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentLocationWeatherHandled } from '../../redux/weather/actions';
import { getCurrentDateTime } from '../../services/DateTimeService';
import styles from './styles';

const HomeScreen = props => {
  const [currentTime, setCurrentTime] = useState(null);
  const {
    data: data,
    locationName,
    loading,
    errorWeather,
  } = useSelector(state => state.weatherState);

  

  const dispatch = useDispatch();

  // Fetch weather data using
  useEffect(() => {
    dispatch(getCurrentLocationWeatherHandled());
    setCurrentTime(getCurrentDateTime());
  }, []);

  useEffect(() => {
    setCurrentTime(getCurrentDateTime());
  }, [data]);

  return (
    <View style={styles.root}>
      {data && currentTime ? (
        <View style={styles.weatherBox}>
          <View></View>
          <Text style={styles.titleText}>Weather</Text>
          <Text style={styles.temperatureText}>
            Temperature: {data.hourly.temperature_2m[currentTime.hour]} °C
          </Text>
          <Text style={styles.timeText}>
            Current time: {`${currentTime.hour}:${currentTime.minute}`}
          </Text>
        </View>
      ) : (
        <View>
          <ActivityIndicator
            size="large"
            color="blue"
            animating={loading}
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
