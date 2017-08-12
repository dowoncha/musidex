import AppNavigator from '../navigation/AppNavigation'

// const INITIAL_STATE = AppNavigator.router.getStateForAction(
//   AppNavigator.router.getActionForPathAndParams('Login'));

export const reducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state)

  return newState || state
}
