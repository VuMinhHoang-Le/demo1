import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentLocationWeatherHandled } from '../../redux/weather/actions';
import { getCurrentDateTime } from '../../services/DateTimeService';
import styles from './styles';
import { Image } from 'react-native-elements';

const HomeScreen = props => {
  const [currentTime, setCurrentTime] = useState(null);
  const { weathers, currentWeatherData, locationName, loading, error } =
    useSelector(state => state.weatherState);

  console.log('currentWeatherData: ', currentWeatherData);
  const dispatch = useDispatch();

  // Fetch weather data using
  useEffect(() => {
    dispatch(getCurrentLocationWeatherHandled());
    setCurrentTime(getCurrentDateTime());
  }, []);

  useEffect(() => {
    setCurrentTime(getCurrentDateTime());
  }, [currentWeatherData]);

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => dispatch(getCurrentLocationWeatherHandled())}
      >
        <View>
          <Image
            source={require('../../assets/logo/location.png')}
            style={styles.buttonLogo}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {currentWeatherData && currentTime ? (
        <View style={styles.weatherBox}>
          <ActivityIndicator size="large" color="blue" animating={loading} />
          <Text style={styles.temperatureText}>
            {currentWeatherData.hourly.temperature_2m[currentTime.hour]} °C
          </Text>
          <Text style={styles.timeText}>{locationName}</Text>
          <Text style={styles.timeText}>
            Current time:{' '}
            {`${currentTime.day}/${currentTime.month}/${currentTime.year} ${currentTime.hour}:${currentTime.minute}`}
          </Text>
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" color="blue" animating={loading} />
          <Text>No weather data yet</Text>
        </View>
      )}
    </View>
  );
};

HomeScreen.options = {
  topBar: {},
  bottomTab: { text: 'Home', icon: require('../../assets/logo/home.png') },
};

export default HomeScreen;
