import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import Components from './components/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Components />
            </Provider>
        );
    }
}