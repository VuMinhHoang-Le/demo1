import { combineReducers } from 'redux';

import { fetchLocationReducer } from './location/reducers';
import { weatherReducer } from './weather/reducers';
import { historyReducer } from './history/reducers';

 export const rootReducer = combineReducers({
  weatherState: weatherReducer,
  locationState: fetchLocationReducer,
  historyState: historyReducer,
});
