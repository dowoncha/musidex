import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createDrop: ['entity_name', 'entities']
});

export const AuthTypes = Types
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
  }
});

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


export const reducer = createReducer(INITIAL_STATE, {
  [Types.MERGE_ENTITIES]: mergeEntities,
});
