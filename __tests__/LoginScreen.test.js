import React from 'react'
import 'react-native'
import { LoginScreen } from '../src/screens/LoginScreen'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <LoginScreen />
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
