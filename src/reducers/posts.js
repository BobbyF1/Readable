import {
  SET_POSTS,
  SET_POST_COMMENTS_COUNT, 
  SET_POST_ZERO_COMMENTS_COUNT,
  UP_VOTE_POST, 
  DOWN_VOTE_POST,
  SET_EDIT_POST,
  SET_NEW_POST,
  ADD_POST,
  DELETED_POST, 
  EDITED_POST,
  SET_SORT_ORDER,
  DECREASE_POST_COMMENT_COUNT
} from '../actions/PostActions.js'

function posts (state = {
  						 data: [], 
                         isLoaded: false,
                         postsWithCommentCount: 0 ,
                         isEditingPost: false ,
  						 isNewPost: false,
  						 sortOrder: "-voteScore"
                        }, action) {
  
  var newData
  var newState
  var postsWithCommentCount

  switch (action.type) {
      
    case SET_POSTS:
      	return {
          ...state,
          data: action.posts,
          isLoaded: true, 
          setAllCommentCounts: false,
          postsWithCommentCount: 0,
          isEditingPost: false,
          isNewPost: false          
		}

    case SET_POST_COMMENTS_COUNT:
      	let { postId, commentCount } = action      
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { commentCount: commentCount } ) : post } ) 
      	return {...state, 
              data: newData, 
              setAllCommentCounts: (postsWithCommentCount+1) === state.data.length,
              postsWithCommentCount: state.postsWithCommentCount + 1
             }
      
    case SET_POST_ZERO_COMMENTS_COUNT:
      	postId = action.postId      
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { commentCount: 0 } ) : post } ) 

      	return {...state, 
              data: newData, 
              postsWithCommentCount: state.postsWithCommentCount + 1,
              setAllCommentCounts: (state.postsWithCommentCount + 1) === state.data.length
             }
      
    case UP_VOTE_POST:
      	postId = action.postId
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { voteScore: post.voteScore + 1 } ) : post } )         
      return {...state,
              data: newData
             }
              
    case DOWN_VOTE_POST:
      	postId = action.postId
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { voteScore: post.voteScore - 1 } ) : post } )         
      	return {
          		...state,
          		data: newData
        	}
      
    case SET_EDIT_POST:      
      return {...state, isEditingPost: action.edit};

    case SET_NEW_POST:      
      return {...state, isNewPost: action.new};
      
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
      	data: state.data.map ( (post) => { return post.id===action.postId ? Object.assign({}, post, { commentCount: post.commentCount - 1 } ) : post } )         
  		}
      
      
    default :
      	return state
  }
}

export default posts
