import {
	ADD_COMMENTS,
  	DOWN_VOTE_COMMENT,
  	UP_VOTE_COMMENT, 
  	DELETED_COMMENT
} from '../actions/CommentActions.js'

function comments ( state = { data: [], isLoaded: false} , action) {

  var newData;
  
  switch (action.type) {
      
    case DOWN_VOTE_COMMENT:
      	newData = state.data.map( (comment) =>  {return comment.id === action.commentId ? Object.assign({}, comment, { voteScore: comment.voteScore - 1 } ) : comment } ) 
      	return {
          		...state,
          		data: newData
        	}

    case UP_VOTE_COMMENT:
      	newData = state.data.map( (comment) =>  {return comment.id === action.commentId ? Object.assign({}, comment, { voteScore: comment.voteScore + 1 } ) : comment } ) 
      	return {
          		...state,
          		data: newData
        	}
      
    case ADD_COMMENTS:
		const { addComments } = action        
        const newComments = [ ...state,
              	...addComments]
      	return { data: newComments }

    case DELETED_COMMENT:
      	return { ...state, data: state.data.filter( (c) => c.id!==action.commentId ) };
      
    default :
      return state
  }
}

export default comments
