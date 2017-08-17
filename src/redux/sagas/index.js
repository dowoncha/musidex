import { channel } from 'redux-saga'
import { all, takeLatest, takeEvery, take, select, fork, put, call, spawn } from 'redux-saga/effects'
// import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../../config/DebugConfig'

import firebase from '../../firebase'

/* ------------- Types ------------- */

import AuthActionCreators, { AuthTypes } from '../AuthRedux'
import GeolocationActionCreators, { GeolocationTypes } from '../GeolocationRedux'

/* ------------- Sagas ------------- */
import { loginFlow, signupFlow } from './AuthSagas'
import { watchLocationChannel, getCurrentPosition } from './GeolocationSagas'

/**
 * Effects that need to be called on app startup
 *
 */
function* startup(action) {
  // Update user location
  // yield put(GeolocationActionCreators.updateLocationRequest())
  yield call(getCurrentPosition)

  // Get user auth state
  try {
    const user = yield call(firebase.auth().onAuthStateChanged)
    console.warn(user)
  } catch (error) {
    console.warn("Couldn't get user state", error)
  }


  // Get user current location
}

function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log("Action: ", action)
    console.log("State after: ", state)
  }
}

function* getCurrentUser() {
  try {
    const currentUser = yield call(firebase.auth().currentUser)

    yield put(AuthActionCreators.setCurrentUser(currentUser))
  } catch(error) {
    console.log("Get current user: ", error)
  }
}

export default function * root () {
  yield all([
    // Startup
    takeLatest('APP_STARTUP', startup),

    // Debug logging
    fork(watchAndLog),

    // Authentication Sagas
    fork(loginFlow),
    fork(signupFlow),

    takeLatest(AuthTypes.GET_CURRENT_USER, getCurrentUser),

    // Geolocation sagas
    spawn(watchLocationChannel),

    // Entity sagas

    // takeLatest(DropTypes.CREATE_DROP_REQUEST, uploadDrop)
  ])
}
