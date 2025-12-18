import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {Provider} from 'react-redux';
import { persistor, store } from '../../redux/store';

import {
    HOME_SCREEN,
    SEARCH_SCREEN,
    HISTORY_SCREEN,
    FAVOURITE_SCREEN
} from '../Screens';
import HomeScreen from '../../screens/home/homeScreen';
import SearchScreen from '../../screens/search/searchScreen';
import FavouriteScreen from '../../screens/favourite/favouriteScreen';
import HistoryScreen from '../../screens/history/historyScreen';
import { PersistGate } from 'redux-persist/integration/react';

const wrapperProviderRedux = Component => props => {
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...props} />
            </PersistGate>
        </Provider>
    );
};

export function registerComponent() {
    Navigation.registerComponent(HOME_SCREEN, () => wrapperProviderRedux(HomeScreen),);
    Navigation.registerComponent(SEARCH_SCREEN, () => wrapperProviderRedux(SearchScreen),);
    Navigation.registerComponent(FAVOURITE_SCREEN, () => wrapperProviderRedux(FavouriteScreen),);
    Navigation.registerComponent(HISTORY_SCREEN, () => wrapperProviderRedux(HistoryScreen),);
}