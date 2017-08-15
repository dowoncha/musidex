import { call, put, take, fork, cancel, cancelled } from 'redux-saga/effects';

import { AsyncStorage } from 'react-native';

import Creators, { AuthTypes } from '../Redux/AuthRedux';

import firebase from '../firebase';

function* setUser(user) {
  // yield call

  yield call(setAsyncStorageData, 'userData', user)
}

/**
 * Sign up user through Firebase
 */
function * firebaseSignup(email, password) {
  try {
    // Create user account
    yield call(
      firebase.auth().createUserWithEmailAndPassword,
        this.state.email, this.state.password);

    // yield put(AuthTypes.loginSuc)
    // Handle errors
  } catch (error) {
    // TODO: change to signin failure
    yield put(AuthTypes.LoginFailure(error))
  }
}

function * firebaseSignout() {
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
    yield put(UtilityTypes.toast(error))
  }
}

// Store user data in async storage as redundancy
// and data between app uses
// Key is a string
// Data will be stringified
function * setAsyncStorageData(key, data) {
  AsyncStorage.setItem(key, JSON.stringify(data);
}

function * firebaseLocalLogin(email, password) {
  // Attempt to login user to firebase using email, password
  try {
    // Async call to firebase local authorization
    yield call(
      firebase.auth().signInWithEmailAndPassword,
        email, password);

    // yield call(setAsyncStorageData,

    yield put(AuthTypes.loginSuccess());
    // yield call(AsyncStorage.addItem, JSON.stringify('userData'));
  } catch(error) {
    yield put(AuthTypes.loginFailure(error));
  }
}

export function * authFlow() {
  while (true) {
    // On login request action
    const { email, password } = yield take(AuthTypes.LOGIN_REQUEST)

    // Attempt to local login
    const task = yield fork(firebaseLocalLogin, email, password)

    // we should redirect the user here
    // yield put(NavigationActions.navigate('Home'))

    // If logout or login failure occurs then
    // Cancel the existing local login task
    const action = yield take([AuthTypes.LOGOUT, AuthTypes.LOGIN_FAILURE])
    if (Action.type === 'AuthTypes.LOGOUT') {
      yield cancel(task)
    }

    yield call(firebaseSignout);
  }
}
