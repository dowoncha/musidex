import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createDrop: ['trackId'],
  searchTracks: ['query'],
  fetchTracksSuccess: ['tracks'],
  fetchTracksFailure: ['error']
});

export const EntityTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  users: {
    byId: { },
    allIds: []
  },
  drops: {
    byId: {},
    allIds: []
  },
  tracks: {
    byId: {},
    allIds: []
  }
});

const mergeEntity = (state, action) => {
  const { domain, id, entity } = action

  let updated = state.setIn([domain, 'byId', id], entity)
  updated = state.getIn([domain, 'allIds']).concat(id)

  return updated
}

/* ------------- Reducers ------------- */
const drops = (state = { byId: {}, allIds: []}, action) => {
  switch (action.type) {
    case Types.CREATE_DROP:
      const { drop } = action.entities;

      // Merge current state, current drop information with new drop data
      return {
        ...state,
        byId: {
          [drop.id]: {
            ...state.byId[drop.id],
            ...drop
          }
        }
      };
    default:
      if (action.entities && action.entities.drops) {
        return state;
        // return state.merge(action.entities.drops)
      }
  }
}

const searchTracks = (state, action) => {
  const { query } = action

  return state
}

const fetchTracksSuccess = (state, action) => {
  const { tracks } = action;

  // For each track add entity by Id and to total list of ids
  const { items } = tracks

  // TODO: combine both reductions
  const byId = items.reduce((data, item) => {
    const { videoId } = item.id

    data[videoId] = item.snippet

    return data
  }, {})

  const allIds = items.map(item => item.id.videoId).reduce((ids, videoId) => {
    ids.push(videoId)
    return ids
  }, [])

  // const union = state.drops.allIds.concat(allIds)

  return state.merge({
    tracks: {
      byId,
    }
  });
}

const fetchTracksFailure = (state, action) => {
  const { error } = action;

  console.warn(error);

  return state;
}

const createDrop = (state, action) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_DROP]: createDrop,
  [Types.SEARCH_TRACKS]: searchTracks,
  [Types.FETCH_TRACKS_SUCCESS]: fetchTracksSuccess,
  [Types.FETCH_TRACKS_FAILURE]: fetchTracksFailure
});
