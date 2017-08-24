import React from 'react';
import { Platform } from 'react-native'
import App from '../App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  Platform.OS = 'android'

  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
