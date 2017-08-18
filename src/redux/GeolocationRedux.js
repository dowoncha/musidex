import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateLocationRequest: null,
  updateLocationSuccess: ['location'],
  updateLocationFailure: ['error']
})

export const GeolocationTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  position: {
    coords: {
      longitude: 0.0,
      latitude: 0.0
    }
  },
  updating: false,
  error: null
});

const updateLocationRequest = (state) => {
  return state.merge({
    updating: true
  })
}

const updateLocationSuccess = (state, action) => {
  //Set the most recent location
  const { location } = action;

  return state.merge({
    updating: false,
    position: location
  }, { deep: true });
}

const updateLocationFailure = (state, action) => {
  return state.merge({
    updating: false,
    error: action.error
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_LOCATION_REQUEST]: updateLocationRequest,
  [Types.UPDATE_LOCATION_SUCCESS]: updateLocationSuccess,
  [Types.UPDATE_LOCATION_FAILURE]: updateLocationFailure
})
