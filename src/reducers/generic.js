import {
  LOADING_DATA,
  FINISHED_LOADING_DATA,
  NAVIGATION_ERROR
} from '../actions/GenericActions.js'

function generic (state = { loaded: false }, action) {

  switch (action.type) {
    case LOADING_DATA:      
      return { loaded: false }
    case FINISHED_LOADING_DATA: 
      return { loaded: true }
    case NAVIGATION_ERROR:
      return { loaded: true }      
    default :
      return state;
  }
}

export default generic

