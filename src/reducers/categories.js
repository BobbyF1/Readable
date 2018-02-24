import {
  SET_CATEGORIES
} from '../actions/CategoryActions.js'

function categories (state = {}, action) {

        
  switch (action.type) {
    case SET_CATEGORIES:
      
  	const { categories } = action
      return categories; 
    default :
      return state
  }
}

export default categories
