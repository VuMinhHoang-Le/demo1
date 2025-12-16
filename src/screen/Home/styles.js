import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: 'whitesmoke',
  },
  weatherBox: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
  },
  temperatureText: {
    fontSize: 32,
  },
  timeText: {
    fontSize: 24,
  },
  titleText: {
    fontSize: 32,
  },
});

export default styles;
