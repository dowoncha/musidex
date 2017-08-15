import { channel } from 'redux-saga'
import { takeLatest, takeEvery, take, put, call, spawn } from 'redux-saga/effects'
// import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { DropTypes } from '../Redux/DropsRedux'
import GeolocationCreators, { GeolocationTypes } from '../Redux/GeolocationRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { loginFlow } from './AuthSagas'
import { watchDropsData, uploadDrop } from './DropSagas';
// import { getUserAvatar } from './GithubSagas'

function* startup(action) {
  console.log("Starting app sagas")

  // Get user auth state
  try {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // yield put()
      } else {

      }
    });
  } catch (error) {
    console.warn("Couldn't get user state")
  }


  // Get user current location
}

export default function * root () {
  yield [
    // Startup
    takeLatest(StartupTypes.STARTUP, startup),

    // Authentication Sagas
    loginFlow(),

    // Geolocation sagas
    spawn(watchLocationChannel),

    // Entity sagas

    // takeLatest(DropTypes.CREATE_DROP_REQUEST, uploadDrop)
  ]
}
