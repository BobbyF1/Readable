import {
	SET_POST_COMMENTS,
  	DOWN_VOTE_COMMENT,
  	UP_VOTE_COMMENT, 
  	DELETED_COMMENT,
  	EDITED_COMMENT, 
	ADD_COMMENT, 
} from '../actions/Types.js'

function comments ( state = { data: [], loadIdentifier: 0 } , action) {
	switch (action.type) {  
        
		case EDITED_COMMENT:
			return {
				...state,
          		data: state.data.map( 
                  (comment) => {return comment.id === action.commentId ? Object.assign({}, comment, { body: action.body } ) : comment } 
                ) 
        	}      
      
		case DOWN_VOTE_COMMENT:
      		return {
          		...state,
          		data: state.data.map( 
                  (comment) => {return comment.id === action.commentId ? Object.assign({}, comment, { voteScore: comment.voteScore - 1 } ) : comment } 
                ) 
        	}

    	case UP_VOTE_COMMENT:
      		return {
          		...state,
          		data: state.data.map( 
                  (comment) =>  {return comment.id === action.commentId ? Object.assign({}, comment, { voteScore: comment.voteScore + 1 } ) : comment } 
                ) 
        	}
      
		case SET_POST_COMMENTS:
			return { 
              	data: action.comments, 
               	loadIdentifier: state.loadIdentifier + 1
            }

		case ADD_COMMENT: 
      		return {
              	...state, 
              	data: [ ...state.data, action.comment] 
            }
                
		case DELETED_COMMENT:
      		return { 
              	...state, 
              	data: state.data.filter( (c) => c.id!==action.commentId ) 
            }
      
    	default :
      		return state
	}
}

export default comments
