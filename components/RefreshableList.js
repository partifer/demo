/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListView,
  RefreshControl,
  Text,
} from 'react-native';


const fetchData = () => new Promise((resolve)=>{
  setTimeout(()=> resolve(4),1000);
});

class RefreshableList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      >
      </ListView>
    );
  }
}

export default RefreshableList;