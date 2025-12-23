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

import { selectCurrentWeatherData, selectLocationName, selectLoading } from '../../redux/weather/selectors';

const HomeScreen = props => {
  const [currentTime, setCurrentTime] = useState(null);
  const currentWeatherData = useSelector(selectCurrentWeatherData);
  const locationName = useSelector(selectLocationName);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentLocationWeatherHandled());
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
          <Text style={styles.locationText}>{locationName}</Text>
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
