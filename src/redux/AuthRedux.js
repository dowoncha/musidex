import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['user'],
  loginFailure: ['error'],
  logout: ['error'],
  signup: ['data'],
  getCurrentUser: [],
  setCurrentUser: ['user'],
  spotifyAuthorize: [],
  createUserSuccess: ['user'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  uid: null,
  user: null,
  isLoggedIn: null,
  fetching: null,
  error: null
});

/* ------------- Reducers ------------- */
// When login requested, set fetching state and confirm user is not logged in
const loginRequest = (state) => {
  // NOTE: Handle if the user is already logged in making a request
  return state.merge({ fetching: true, isLoggedIn: false, error: null});
}

const loginSuccess = (state, action) => {
  const { user } = action;

  return state.merge({ fetching: false, user, isLoggedIn: true, error: null});
}

/**
 * On login failure, disable fetch and login flags
 * @param  error  Error message
 */
const loginFailure = (state, action) => {
  const { error } = action;

  console.log(error)

  return state.merge({ fetching: false, isLoggedIn: false, error})
}

const logout = (state, action) => {
  return state.merge({ user: null });
}

const spotifyAuthorize = (state, action) => {
  return state
}

const setCurrentUser = (state, action) => {
  const { user } = action;

  return state.merge({ user })
}

const createUserSuccess = (state, action) => {
  const { user } = action

  return state.merge({ 
    user, 
    uid: user.uid, 
    isLoggedIn: true, 
    fetching: false, 
    error: null 
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.SET_CURRENT_USER]: setCurrentUser,
  [Types.LOGOUT]: logout,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess
});
