import {
  SET_CATEGORIES
} from '../actions/CategoryActions.js'

var initialCategoriesState = {categories: [{name: '', path: ''}]}

function categories (state = initialCategoriesState, action) {

        
  console.log("categories called with action ")
	console.log(action)
  console.log(state)
  
  switch (action.type) {
    case SET_CATEGORIES:
  	const { categories } = action
      return { categories }; 
    default :
      return state
  }
}

export default categories
