/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

class MyView extends Component {
  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  render() {
    const nextRoute = {
      component: MyView,
      title: 'Bar That',
      passProps: { myProp: 'bar' }
    };
    return (
      <TouchableHighlight
        onPress={() => this._handleNextPress(nextRoute)}>
        <Text style={{ marginTop: 200, alignSelf: 'center' }}>
          See you on the other nav {this.props.myProp}!
        </Text>
      </TouchableHighlight>
    );
  }
}

export default MyView;