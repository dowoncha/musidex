import React from 'react'

import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import {
  LoginScreen, ExploreScreen,
  PlaylistScreen, ProfileScreen, UploadScreen } from '../screens'

import { Icon, /* Tabs, Tab*/ } from 'react-native-elements'

// Manifest of possible screens
const PrimaryNavigator = TabNavigator({
  Explore: { screen: ExploreScreen },
  Playlist: { screen: PlaylistScreen },
  Upload: { screen: UploadScreen },
  Profile: { screen: ProfileScreen }
}, {
  // Tab bar navigation icons
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Explore':
          iconName = 'location'
          break;
        case 'Playlist':
          iconName = 'play'
          break;
        case 'Upload':
          iconName = 'plus'
          break;
        case 'Profile':
          iconName = 'user'
          break;
      }

      return (
        <Icon
          name={iconName}
          type='evilicon'
          color={focused ? '#2f95dc' : '#ccc'}
        />
      );
    }
  }),
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false
})

// TODO: Drop upload screen should go in a separate navigator
const AppNavigator = StackNavigator({
  Login: {
    path: '/login',
    screen: LoginScreen
  },
  Home: { screen: PrimaryNavigator },
  // Signup: { screen: SignupScreen },
  // DropUploadScreen: { screen: DropUploadScreen }
}, {
  headerMode: 'none',
  navigationOptions: {
    // initialRouteName: 'Launch'
    // TODO: prevent header from showing on home screen
    // TODO: set initial screen to launch screen
    // header: null
  }
})

export default AppNavigator
