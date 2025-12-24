export const mockPosition = {
  coords: {
    latitude: 0,
    longitude: 0,
  },
};

export const mockWeatherData = {
  hourly: { temperature_2m: [] },
};

export const mochWeatherDataError = {
  error: true,
};

export const mockLocationName = 'city, country';
export const mockSearchName = 'city';

export const mockLocationData = {
  results: [
    {
      name: 'city',
      country: 'country',
      latitude: 0,
      longitude: 0,
    },
  ],
};

export const mockError = new Error ('Mock throwable Error');