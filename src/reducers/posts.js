import {
	SET_POSTS,
	UP_VOTE_POST, 
	DOWN_VOTE_POST,
	SET_EDIT_POST,
	SET_NEW_POST,
	ADD_POST,
	DELETED_POST, 
	EDITED_POST,
	SET_SORT_ORDER,
	DECREASE_POST_COMMENT_COUNT, 
	INCREASE_POST_COMMENT_COUNT 
} from '../actions/PostActions.js'

function posts (state = {
  						 data: [], 
                         isLoaded: false,
                         isEditingPost: false ,
  						 isNewPost: false,
  						 sortOrder: "-voteScore"
                        }, action) {  

    switch (action.type) {

 		case SET_POSTS:
			return {
				...state,
          		data: action.posts,
          		isLoaded: true, 
          		isEditingPost: false,
          		isNewPost: false          
			}
      
		case UP_VOTE_POST:
			return {
              	...state,
              	data: state.data.map( 
                  (post) =>  {return post.id === action.postId ? Object.assign({}, post, { voteScore: post.voteScore + 1 } ) : post } 
                )         
             }
              
		case DOWN_VOTE_POST:
			return {
          		...state,
          		data: state.data.map( 
                  (post) =>  {return post.id === action.postId ? Object.assign({}, post, { voteScore: post.voteScore - 1 } ) : post } 
                )
        	}
      
		case SET_EDIT_POST:      
			return {
              	...state, 
              	isEditingPost: action.edit
            };

		case SET_NEW_POST:      
      		return {
              	...state, 
              	isNewPost: action.new
            };
      
		case ADD_POST:
			return {
				...state,
				data: [...state.data, action.post],
				isEditingPost: false,
				isNewPost: false
        	}
          		
		case DELETED_POST:
			return {
				...state,
				data: state.data.filter( (p) => p.id!==action.postId ),
				isEditingPost: false,
				isNewPost: false
			}          		

		case EDITED_POST:
			return {
          		...state,
            	data: state.data.map( (p) => { return p.id===action.post.id ? action.post : p }  ),
				isEditingPost: false,
				isNewPost: false
        	}

		case SET_SORT_ORDER:
			return {
          		...state,
          		sortOrder: action.sortBy
        	}

		case DECREASE_POST_COMMENT_COUNT:
			return {
     			...state, 
      			data: state.data.map ( 
                  (post) => { return post.id===action.postId ? Object.assign({}, post, { commentCount: post.commentCount - 1 } ) : post } 
                )  
  			}
 
		case INCREASE_POST_COMMENT_COUNT:
			return {
     			...state, 
      			data: state.data.map ( 
                  (post) => { return post.id===action.postId ? Object.assign({}, post, { commentCount: post.commentCount + 1 } ) : post } 
                ) 
			}
      
		default :
			return state
	}
}

export default posts
