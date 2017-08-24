import { channel } from 'redux-saga'
import { all, takeLatest, takeEvery, take, select, fork, put, call, spawn } from 'redux-saga/effects'
// import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../../config/DebugConfig'
import { GOOGLE_API_KEY } from '../../config/PublicAccessKeys'

import firebase from '../../firebase'

/* ------------- Types ------------- */

import AuthActionCreators, { AuthTypes } from '../AuthRedux'
import GeolocationActionCreators, { GeolocationTypes } from '../GeolocationRedux'
import EntityActionCreators, { EntityTypes } from '../EntitiesRedux'

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
    yield call(getCurrentUser) 
    // const user = yield call(firebase.auth().onAuthStateChange)
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
    const currentUser = yield call(firebase.auth().getCurrentUser)

    yield put(AuthActionCreators.setCurrentUser(currentUser))
  } catch(error) {
    console.log("Get current user: ", error)
  }
}

function searchYoutube(query) {
  const maxResults = 10
  const part = 'snippet'

  const url = `https://www.googleapis.com/youtube/v3/search?q=${query}&maxResults=${maxResults}&part=${part}&key=${GOOGLE_API_KEY}`

  return fetch(url, {
    method: 'GET',
    mode: 'cors'
  })
  .then(response => response.json())
  .catch(error => error)
}

function* searchTrack(action) {
  const { query } = action

  try {
    const response = yield call(searchYoutube, query)

    yield put(EntityActionCreators.fetchTracksSuccess(response))
  } catch (error) {
    yield put(EntityActionCreators.fetchTracksFailure(error))
  }
}

function insertDrop(drop) {
  const newDropRef = firebase.database().ref('drops').push()

  return newDropRef.set(drop)
}

function* createDrop(action) {
  // Get the track
  const { trackId } = action

  // Get user's current location
  const position = yield select(state => state.geolocation.position)
  const { longitude, latitude } = position.coords

  // Create a new reference to the table row
  const newDropRef = firebase.database().ref().child('drops').push() 

  const dropData = {
    position: {
      latitude,
      longitude
    },
    track: {
      id: trackId
    }
  }

  try {
    yield call(insertDrop, dropData)
    console.log("Drop successful")
  } catch (error) {
    console.warn(error.message)
  }
}

function* createUser(action) {
  const { data } = action

  const { email, password } = data

  try {
    const user = yield call(
      firebase.auth().createUserWithEmailAndPassword, 
        email, password)

    yield put(AuthActionCreators.createUserSuccess(user))
  } catch (error) {
    yield put(AuthActionCreators.loginFailure(error))
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
    // fork(signupFlow),
    takeLatest(AuthTypes.SIGNUP, createUser),

    takeLatest(AuthTypes.GET_CURRENT_USER, getCurrentUser),
  
    takeLatest(EntityTypes.SEARCH_TRACKS, searchTrack),
    // Geolocation sagas
    spawn(watchLocationChannel),

    takeLatest(EntityTypes.CREATE_DROP, createDrop)

    // Entity sagas

    // takeLatest(DropTypes.CREATE_DROP_REQUEST, uploadDrop)
  ])
}
