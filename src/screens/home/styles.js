import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
  weatherBox: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  temperatureText: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 100,
    paddingTop: 100,
  },
  timeText: {
    fontSize: 24,
  },
  titleText: {
    fontSize: 32,
  },
  locationButton: {
    position: 'absolute',
    top: 20, // distance from top
    right: 20,
  },
  locationButtonText: {},
  buttonLogo: {
    width: 32,
    height: 32,
    marginRight: 8, // space between logo and text
  },
});

export default styles;
