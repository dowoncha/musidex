import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['user'],
  loginFailure: ['error'],
  logout: ['error'],
  spotifyAuthorize: []
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  uid: null,
  user: null,
  isLoggedIn: null,
  fetching: null
});

/* ------------- Reducers ------------- */
// When login requested, set fetching state and confirm user is not logged in
const loginRequest = (state) => {
  // NOTE: Handle if the user is already logged in making a request
  return state.merge({ fetching: true, isLoggedIn: false});
}

const loginSuccess = (state, action) => {
  const { user } = action;

  return state.merge({ fetching: false, user, isLoggedIn: true });
}

/**
 * On login failure, disable fetch and login flags
 * @param  error  Error message
 */
const loginFailure = (state, action) => {
  const { error } = action;

  return state.merge({ fetching: false, isLoggedIn: false})
}

const logout = (state, action) => {
  return state.merge({ user: null });
}

const spotifyAuthorize = (state, action) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
  [Types.SPOTIFY_AUTHORIZE]: spotifyAuthorize
});
