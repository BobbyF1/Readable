import {
  SET_POSTS,
  SET_POST_COMMENTS_COUNT, 
  SET_POST_ZERO_COMMENTS_COUNT,
  UP_VOTE_POST, 
  DOWN_VOTE_POST,
  EDIT_POST,
  ADD_POST,
  DELETED_POST, 
  EDITED_POST
} from '../actions/PostActions.js'

function posts (state = {
  						 data: [], 
                         isLoaded: false,
                         postsWithCommentCount: 0 ,
                         isEditingPost: false ,
  						 isNewPost: false
                        }, action) {
  
  var newData
  var newState
  var postsWithCommentCount

  switch (action.type) {
      
    case SET_POSTS:
  		const { posts } = action        
      	return {
          data: posts,
          isLoaded: true, 
          setAllCommentCounts: false,
          postsWithCommentCount: 0,
          isEditingPost: false,
          isNewPost: false          
		}

    case SET_POST_COMMENTS_COUNT:
      	let { postId, commentCount } = action      
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { commentCount: commentCount } ) : post } ) 

      	postsWithCommentCount = state.postsWithCommentCount + 1
      	newState = { data: newData, 
                    isLoaded: state.isLoaded, 
                    setAllCommentCounts: postsWithCommentCount === state.data.length , 
                    postsWithCommentCount: postsWithCommentCount,
                    isEditingPost: state.isEditingPost,
                    isNewPost: state.isNewPost,
                   }
      return newState
      
    case SET_POST_ZERO_COMMENTS_COUNT:
      	postId = action.postId      
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { commentCount: 0 } ) : post } ) 

		postsWithCommentCount = state.postsWithCommentCount + 1
      	newState = { data: newData, 
                    isLoaded: state.isLoaded, 
                    setAllCommentCounts: postsWithCommentCount === state.data.length , 
                    postsWithCommentCount: postsWithCommentCount,
                    isEditingPost: state.isEditingPost,
                    isNewPost: state.isNewPost,
                   }
      return newState
      
    case UP_VOTE_POST:
      	postId = action.postId
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { voteScore: post.voteScore + 1 } ) : post } )         
      	newState = { data: newData, 
                    isLoaded: state.isLoaded, 
                    setAllCommentCounts: postsWithCommentCount === state.data.length , 
                    postsWithCommentCount: postsWithCommentCount ,
                    isEditingPost: state.isEditingPost,
                    isNewPost: state.isNewPost,
                   }
      return newState	

    case DOWN_VOTE_POST:
      	postId = action.postId
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { voteScore: post.voteScore - 1 } ) : post } )         
      	newState = { data: newData, 
                    isLoaded: state.isLoaded, 
                    setAllCommentCounts: postsWithCommentCount === state.data.length , 
                    postsWithCommentCount: postsWithCommentCount,
                    isEditingPost: state.isEditingPost,
                    isNewPost: state.isNewPost,
                   }
      	return newState	

      
    case EDIT_POST:
      
      
      console.log("IS EDITING POST")
      console.log("STATE:")
      console.log(state)
      console.log("NEXTSTATE:")
      console.log({...state, isEditingPost: true})
      return {...state, isEditingPost: true};
      
      	newState = { data: state.data, 
                    isLoaded: state.isLoaded, 
                    setAllCommentCounts: state.setAllCommentCounts ,
                    postsWithCommentCount: state.postsWithCommentCount,
                    isEditingPost: true,
                    isNewPost: false,
                   }
      	return {...state, isEditingPost: true}	

    case ADD_POST:
      	newState = { 
                    data: [...state.data, action.post],
                    isLoaded: state.isLoaded, 
                    setAllCommentCounts: state.setAllCommentCounts , 
                    postsWithCommentCount: state.postsWithCommentCount,
                    isEditingPost: false,
                    isNewPost: false,
                   }
      	return newState	

    case DELETED_POST:
      	newState = { 
                    data: state.data.filter( (p) => p.id!==action.postId ),
                    isLoaded: state.isLoaded, 
                    setAllCommentCounts: state.setAllCommentCounts , 
                    postsWithCommentCount: state.postsWithCommentCount,
                    isEditingPost: false,
                    isNewPost: false,
                   }
      	return newState	

    case EDITED_POST:
      	newState = { 
                    data: state.data.map( (p) => { return p.id===action.post.id ? action.post : p }  ),
			        isLoaded: state.isLoaded, 
                    setAllCommentCounts: state.setAllCommentCounts , 
                    postsWithCommentCount: state.postsWithCommentCount,
                    isEditingPost: false,
                    isNewPost: false,
                   }
      	return newState	
      
    default :
      	return state
  }
}

export default posts
