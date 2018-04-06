import {
  NAVIGATION_ERROR
} from '../actions/GenericActions.js'

function generic (state = { loaded: false }, action) {

  switch (action.type) {
    case NAVIGATION_ERROR:
      return { loaded: true }      
    default :
      return state;
  }
}

export default generic

