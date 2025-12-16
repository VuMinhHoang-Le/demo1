import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {Provider} from 'react-redux';
import { store } from '../../redux/store';

import {
    HOME_SCREEN,
    SEARCH_SCREEN,
    HISTORY_SCREEN,
    FAVOURITE_SCREEN
} from '../Screens';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import SearchScreen from '../../screens/SearchScreen/SearchScreen';
import FavouriteScreen from '../../screens/FavouriteScreen/FavouriteScreen';

const wrapperProviderRedux = Component => props => {
    return(
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    );
};

export function registerComponent() {
    Navigation.registerComponent(HOME_SCREEN, () => wrapperProviderRedux(HomeScreen),);
    Navigation.registerComponent(SEARCH_SCREEN, () => wrapperProviderRedux(SearchScreen),);
    Navigation.registerComponent(FAVOURITE_SCREEN, () => wrapperProviderRedux(FavouriteScreen),);
}