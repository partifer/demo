/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  NavigatorIOS,
} from 'react-native';

import Home from './Home';

export default class NavigatorIOSApp extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Home,
          title: 'My Initial Scene',
          navigationBarHidden: true,
        }}
        style={{ flex: 1 }}
      />
    );
  }
}