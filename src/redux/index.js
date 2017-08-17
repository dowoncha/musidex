import { combineReducers } from 'redux'
import configureStore from './CreateStore'

import rootSaga from './sagas'

// Reducers
import { reducer as NavigationReducer } from './NavigationRedux'
import { reducer as AuthReducer } from './AuthRedux'
import { reducer as GeolocationReducer } from './GeolocationRedux'

// Application state
// Domain specific values - Array of objects
// Entities: Maintains ID of currently loaded object's and their relationships
// errors: an array of all errors that have occurred, displayed using Toast
export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: NavigationReducer,
    // entities: (state = { filter: null}, action) => state
    // entities: require('./EntitiesRedux').reducer,
    // search: require('./SearchRedux').reducer,
    // drops: require('./DropsRedux').reducer,
    auth: AuthReducer,
    geolocation: GeolocationReducer,
    // util: require('./UtilityRedux').reducer,
    // subscriptions: subscriptionsReducer
  })

  return configureStore(rootReducer, rootSaga)
}
