import { Navigation } from 'react-native-navigation';
import { FAVOURITE_SCREEN, HISTORY_SCREEN, HOME_SCREEN, SEARCH_SCREEN } from '../Screens';

export function setIndexBottomTab() {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    id: HOME_SCREEN,
                    name: HOME_SCREEN,
                  },
                },
              ],
              options: {
                bottomTab: { text: 'Home' },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    id: SEARCH_SCREEN,
                    name: SEARCH_SCREEN,
                  },
                },
              ],
              options: {
                bottomTab: { text: 'Search' },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    id: FAVOURITE_SCREEN,
                    name: FAVOURITE_SCREEN,
                  },
                },
              ],
              options: {
                bottomTab: { text: 'Favourite' },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    id: HISTORY_SCREEN,
                    name: HISTORY_SCREEN,
                  },
                },
              ],
              options: {
                bottomTab: { text: 'History' },
              },
            },
          },
        ],
      },
    },
  });
}
