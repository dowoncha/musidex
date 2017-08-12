import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore from './src/redux'

import { RootContainer } from './src/screens'

export default class App extends Component {
  store = createStore();

  render() {
    return (
      <Provider store={this.store}>
        <RootContainer />
      </Provider>
    );
  }
}
