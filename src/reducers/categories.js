import {
  SET_CATEGORIES,
  SET_CURRENT_CATEGORY
} from '../actions/CategoryActions.js'

function categories (state = {data: [], isLoaded: false, currentCategory: ""}, action) {

  switch (action.type) {

    case SET_CATEGORIES:      
  	  const { categories } = action
      return {
        		...state,
        		data: categories,
              	isLoaded: true,
             }      

    case SET_CURRENT_CATEGORY:
  	  const { currentCategory } = action
      return {
        		data: state.data,
              	isLoaded: state.isLoaded,
               	currentCategory: currentCategory
             }      

    default :
      return state
  }
}

export default categories
