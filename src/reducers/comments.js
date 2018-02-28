import {
	ADD_COMMENTS
} from '../actions/CommentActions.js'

function comments ( state = { data: [], isLoaded: false} , action) {
        
  switch (action.type) {
      
    case ADD_COMMENTS:
		const { addComments } = action        
        const newComments = [ ...state,
              	...addComments]
      	return { data: newComments }
      
    default :
      return state
  }
}

export default comments
