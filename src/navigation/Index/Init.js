import { Navigation } from 'react-native-navigation';

import { registerComponent } from './RegisterComponent';
import { setIndexBottomTab } from './SetRoot';

export function init() {
    registerComponent();

    Navigation.events().registerAppLaunchedListener(() => {
        setIndexBottomTab();
    });
}