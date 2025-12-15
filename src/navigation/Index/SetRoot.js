import React from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, Button, StyleSheet } from 'react-native';

export function setRoot() {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home',
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
                    name: 'Search',
                  },
                },
              ],
              options: {
                bottomTab: { text: 'Search' },
              },
            },
          },
        ],
      },
    },
  });
}
