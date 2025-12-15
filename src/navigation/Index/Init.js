import { Navigation } from 'react-native-navigation';

import { registerComponent } from './RegisterComponent';
import { setRoot } from './SetRoot';

export function init() {
    registerComponent();

    Navigation.events().registerAppLaunchedListener(() => {
        setRoot();
    });
}