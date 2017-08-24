import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore from './src/redux'

import { RootContainer } from './src/screens'

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest : 
  GLOBAL.XMLHttpRequest;

global._fetch = fetch;
global.fetch = (uri, options, ...args) => {
  return global._fetch(uri, options, ...args).then((res) => {
    console.log('Fetch', {request: { uri, options, ...args}, res });
    return res;
  });
}

function bootstrap() {

  if (!__DEV__) {
    console.log = () => {
    }
    
    console.warn = () => {
    }

    console.error = () => {
    }

    console.disableYellowBox = true
  }

  class App extends Component {
    store = createStore();

    render() {
      return (
        <Provider store={this.store}>
          <RootContainer />
        </Provider>
      );
    }
  }

  return App
}

export default bootstrap()
