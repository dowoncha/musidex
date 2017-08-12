import { combineReducers } from 'redux'
import configureStore from './CreateStore'
// import rootSaga from '../Sagas/'

// Application state
// Domain specific values - Array of objects
// Entities: Maintains ID of currently loaded object's and their relationships
// errors: an array of all errors that have occurred, displayed using Toast
export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    // entities: (state = { filter: null}, action) => state
    // entities: require('./EntitiesRedux').reducer,
    // search: require('./SearchRedux').reducer,
    // drops: require('./DropsRedux').reducer,
    // auth: require('./AuthRedux').reducer,
    // geolocation: require('./GeolocationRedux').reducer,
    // util: require('./UtilityRedux').reducer,
    // subscriptions: subscriptionsReducer
  })

  return configureStore(rootReducer)
}
