import {
	ADD_COMMENTS
} from '../actions/CommentActions.js'

function comments (state = [], action) {
        
  switch (action.type) {
      
    case ADD_COMMENTS:
		const { addComments } = action
        
      	return [ ...state,
              	...addComments]
      
    default :
      return state
  }
}

export default comments
