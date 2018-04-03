import {
	ADD_COMMENTS,
  	DOWN_VOTE_COMMENT,
  	UP_VOTE_COMMENT, 
  	DELETED_COMMENT,
  	EDITED_COMMENT, 
	ADD_COMMENT, 
  	SET_ZERO_COMMENTS
} from '../actions/CommentActions.js'

function comments ( state = { data: [], isLoaded: false} , action) {

  var newData;
  
  switch (action.type) {
      
    case SET_ZERO_COMMENTS:
      return { 
        	...state,
        	data: [],
        	isLoaded: true
      }
      
    case EDITED_COMMENT:
      	newData = state.data.map( (comment) =>  {return comment.id === action.commentId ? Object.assign({}, comment, { body: action.body } ) : comment } ) 
      	return {
          		...state,
          		data: newData
        	}      
      
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
      	return { ...state, data: [ ...state.data, ...action.addComments] }

	case ADD_COMMENT : 
      	return {...state, data: [ ...state.data, action.comment] }
                
    case DELETED_COMMENT:
      	return { ...state, data: state.data.filter( (c) => c.id!==action.commentId ) };
      
    default :
      return state
  }
}

export default comments
