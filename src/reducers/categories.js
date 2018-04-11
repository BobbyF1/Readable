import {
    SET_CATEGORIES,
    SET_CURRENT_CATEGORY
} from '../actions/Types.js'

function categories (state = {data: [], isLoaded: false, currentCategory: ""}, action) {
    switch (action.type) {
		case SET_CATEGORIES:      
			return {
				...state,
				data: action.categories,
				isLoaded: true
            }
		case SET_CURRENT_CATEGORY:
			return {
        		data: state.data,
              	isLoaded: state.isLoaded,
               	currentCategory: action.currentCategory
             }      
    	default :
      		return state
	}
}

export default categories
