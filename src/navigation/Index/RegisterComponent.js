import React from 'react';
import { Navigation } from 'react-native-navigation';
import Home from '../../screen/Home/Home';
import Search from '../../screen/Search/Search';

export function registerComponent() {
    Navigation.registerComponent('Home', () => props => <Home {...props} />);
    Navigation.registerComponent('Search', () => props => <Search {...props} />);
}