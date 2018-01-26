/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import MapView from 'react-native-maps';

import { login } from '../actions/actions'

import MyView from './MyView';

class Home extends Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    navigator: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
    this._onMyView = this._onMyView.bind(this);
    this.setDate = this.setDate.bind(this);
    navigator.geolocation.watchPosition(
      (position) => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.state = {
      language: 'js',
      chosenDate: new Date(),
      region: new MapView.AnimatedRegion({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }),
    };
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate })
  }

  _onForward() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: Home,
      title: 'Scene ' + nextIndex,
      passProps: { index: nextIndex },
    });
  }

  _onMyView() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: MyView,
      title: 'Scene ' + nextIndex,
      passProps: { index: nextIndex },
    });
  }

  onRegionChange(region) {
    this.state.region.setValue(region);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
        <ScrollView style={styles.container}>
          <Text>Current Scene: {this.props.title}</Text>
          <Button
            onPress={this._onForward}
            title="Tap me to load the next scene"
          />
          <Button
            onPress={this._onMyView}
            title="Tap me to load the my scene"
          />
          <Text>{this.props.number}</Text>
          <Text>Any text</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ language: text })}
            value={this.state.language}
          />
          <Button
            onPress={() => this.props.login()}
            title={`Learn More ${this.props.number}`}
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Text>---</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            onRegionChange={(region) => this.onRegionChange(region)}
          >
            <MapView.Marker coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }} />
          </MapView>
          <Text>---</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    padding: 10,
  },
  button: {
    flex: 1,
  },
  map: {
    height: 500,
    flex: 1,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  keyboardView: {
    flexGrow: 1,
    backgroundColor: 'black',
  }
});

const mapStateToProps = (state: Object) => ({
  number: state.user.number,
});
const mapDispatchToProps = (dispatch: Function) => (
  {
    login: () => dispatch(login()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
