import {
  SET_CATEGORIES
} from '../actions/CategoryActions.js'

function categories (state = {data: [], isLoaded: false}, action) {

  switch (action.type) {
    case SET_CATEGORIES:
      
  	  const { categories } = action
      return { data: categories,
              isLoaded: true}
    default :
      return state
  }
}

export default categories
