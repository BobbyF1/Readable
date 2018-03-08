import {
  LOADING_DATA,
  FINISHED_LOADING_DATA
} from '../actions/GenericActions.js'

function generic (state = { loaded: false }, action) {

  switch (action.type) {
    case LOADING_DATA:      
      return { loaded: false }
    case FINISHED_LOADING_DATA:      
      return { loaded: true }
    default :
      return { loaded: state.loaded }
  }
}

export default generic

