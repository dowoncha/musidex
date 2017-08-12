import { StackNavigator, TabNavigator } from 'react-navigation'
import { LoginScreen, ExploreScreen } from '../screens'

// Manifest of possible screens
const PrimaryNavigator = TabNavigator({
  Explore: { screen: ExploreScreen },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    showIcon: true
  }
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
