import {
  SET_POSTS,
  SET_POST_COMMENTS_COUNT, 
  SET_POST_ZERO_COMMENTS_COUNT,
  UP_VOTE_POST, 
  DOWN_VOTE_POST
} from '../actions/PostActions.js'

function posts (state = {data: [], isLoaded: false, postsWithCommentCount: 0 }, action) {
  
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
          postsWithCommentCount: 0
}

    case SET_POST_COMMENTS_COUNT:
      	let { postId, commentCount } = action      
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { commentCount: commentCount } ) : post } ) 

      	postsWithCommentCount = state.postsWithCommentCount + 1
      	newState = { data: newData, 
                    isLoaded: state.isLoaded, 
                    setAllCommentCounts: postsWithCommentCount === state.data.length , 
                    postsWithCommentCount: postsWithCommentCount }
      return newState
      
    case SET_POST_ZERO_COMMENTS_COUNT:
      	postId = action.postId      
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { commentCount: 0 } ) : post } ) 

		postsWithCommentCount = state.postsWithCommentCount + 1
      	newState = { data: newData, 
                    isLoaded: state.isLoaded, 
                    setAllCommentCounts: postsWithCommentCount === state.data.length , 
                    postsWithCommentCount: postsWithCommentCount }
      return newState
      
    case UP_VOTE_POST:
      	postId = action.postId
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { voteScore: post.voteScore + 1 } ) : post } )         
      	newState = { data: newData, 
                    isLoaded: state.isLoaded, 
                    setAllCommentCounts: postsWithCommentCount === state.data.length , 
                    postsWithCommentCount: postsWithCommentCount }
      	return newState	

    case DOWN_VOTE_POST:
      	postId = action.postId
      	newData = state.data.map( (post) =>  {return post.id === postId ? Object.assign({}, post, { voteScore: post.voteScore - 1 } ) : post } )         
      	newState = { data: newData, 
                    isLoaded: state.isLoaded, 
                    setAllCommentCounts: postsWithCommentCount === state.data.length , 
                    postsWithCommentCount: postsWithCommentCount }
      	return newState	
      
    default :
      	return state
  }
}

export default posts
