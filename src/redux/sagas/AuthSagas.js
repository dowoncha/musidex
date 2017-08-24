import { race, call, put, take, fork, cancel, cancelled } from 'redux-saga/effects';

import { AsyncStorage } from 'react-native';

import AuthActionCreators, { AuthTypes } from '../AuthRedux';

import firebase from '../../firebase';

function* setUser(user) {
  // yield call

  yield call(setAsyncStorageData, 'userData', user)
}

/**
 * Firebase local login
 * If successful, firebase's auth state should be changed
 * On failure, calls login failure
 */
function * firebaseLocalLogin({email, password}) {
  // Attempt to login user to firebase using email, password
  try {
    // Async call to firebase local authorization
    const user = yield call(
      firebase.auth().signInWithEmailAndPassword,
        email, password)

    yield put(AuthActionCreators.loginSuccess(user))

  } catch(error) {
    yield put(AuthActionCreators.loginFailure(error))
  }
}


/**
 * Sign up user through Firebase
 */
function * firebaseLogout() {
  try {
    yield call(firebase.auth().signOut)

    yield call(AsyncStorage.removeItem, 'userData')
  } catch (e) {
    // TODO: Error handler
    // yield put(AuthTypes.LoginFa)
  }
}

function * firebaseAuthState() {
  try {
    const user = yield call(firebase.auth().onAuthStateChanged)
  } catch (error) {
    // yield put(UtilityTypes.toast(error))
  }
}

// Store user data in async storage as redundancy
// and data between app uses
// Key is a string
// Data will be stringified
function * setAsyncStorageData(key, data) {
  yield call(AsyncStorage.setItem, key, JSON.stringify(data));
}

export function * loginFlow() {
  while (true) {
    // On login request action
    const { email, password } = yield take(AuthTypes.LOGIN_REQUEST)

    // Account for possibility of a data race while logging in
    let { auth, logout } = yield race({
      auth: call(firebaseLocalLogin, {email, password}),
      logout: take(AuthTypes.LOGOUT)
    })

    // If local login finishes without interruption
    if (auth) {
      // If there was an error
      // yield put(AuthActionCreators.loginRequestSuccess())
      // TODO: Need navigation actions
      // Forward user to /home
    }

    // we should redirect the user here
    // yield put(NavigationActions.navigate('Home'))
  }
}

export function * signupFlow() {
  while (true) {
    let data = yield take(AuthTypes.SIGNUP)
     
    yield call(firebaseSignup, data.email, data.password)
  }
}

export function* logoutFlow() {
  while (true) {
    yield take(AuthTypes.LOGOUT)
    yield call(firebaseLogout)

    // Forward user to launch page
  }
}
