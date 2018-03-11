import { addComments } from './CommentActions.js'
import { finishedLoadingData } from './GenericActions.js'

export const 
	SET_POSTS = 'SET_POSTS',
	SET_POST_COMMENTS_COUNT = 'SET_POST_COMMENTS_COUNT',
	LOAD_POSTS = 'LOAD_POSTS',
	SET_POST_ZERO_COMMENTS_COUNT = 'SET_POST_ZERO_COMMENTS_COUNT',
	UP_VOTE_POST = 'UP_VOTE_POST',
	DOWN_VOTE_POST = 'DOWN_VOTE_POST',
	EDIT_POST = 'EDIT_POST'

export function editPost(post){
  return {
    type: EDIT_POST,
    post
  }
}

export function downVote (postId) {
  return {
    type: DOWN_VOTE_POST,
    postId
  }
}
export function upVote (postId) {
  return {
    type: UP_VOTE_POST,
    postId
  }
}

export function setPosts ( posts ) {
  return {
    type: SET_POSTS,
    posts,
  }
}

export function setCommentsCount ( post, commentCount ) {  
  return {
    type: SET_POST_COMMENTS_COUNT,
    postId: post.id,
    commentCount
  }
}

export function setZeroCommentsCount ( post ) {
  return {
    type: SET_POST_ZERO_COMMENTS_COUNT,
    postId: post.id,
  }
  
}

export function downVotePostAction(postId){ 
  const urlPost = `${process.env.REACT_APP_BACKEND}/posts/${postId}`
  return (dispatch) => {
  	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'
                  }, credentials: 'include', 
                              method: 'post',
                              body: JSON.stringify({
                                  option: "downVote"
                              })
					})
      	.then( () => { dispatch(downVote(postId)) } )
  		.catch( (err) => (console.log("Error voting for a post id [" + postId+"] : " +  err)));    
  } 
}

export function upVotePostAction(postId){ 
  const urlPost = `${process.env.REACT_APP_BACKEND}/posts/${postId}`
  return (dispatch) => {
  	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'
                  }, credentials: 'include', 
                              method: 'post',
                              body: JSON.stringify({
                                  option: "upVote"
                              })
					})
      	.then( () => { dispatch(upVote(postId)) } )
  		.catch( (err) => (console.log("Error voting for a post id [" + postId+"] : " +  err)));    
  } 
}

export function loadPosts() {

  const urlPost = `${process.env.REACT_APP_BACKEND}/posts`;
  return (dispatch, getState) =>
  {  
  	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then ( (data) => {  return JSON.parse(data) } )
      .then( (data) => { dispatch(setPosts(data)) ; return (data) } )
      .then(  () => {if( getState().posts.isLoaded )  dispatch(setPostCommentCounts(getState().posts.data)) } ) 
      .catch( (err) => (console.log("Error retrieving posts in loadPosts: "+ err)));
  }
}

export function setPostCommentCounts(posts){
  	return(dispatch, getState) =>
    {
      if(posts){
        posts.forEach( function(post) {
          const urlPostComments = `${process.env.REACT_APP_BACKEND}/posts/${post.id}/comments`;
          fetch(urlPostComments, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' }  )
            .then( (res) => { return(res.text()) })
            .then ( (data) => {return (JSON.parse(data))})
            .then ( (parsedData) => { if (parsedData.length > 0)  
          							{	dispatch(addComments(parsedData)) 
                                      	dispatch(setCommentsCount (post, parsedData.length)) 
                                    }
                                     else
                                     {
                                       	dispatch(setZeroCommentsCount(post))
                                     }
                                    
                                    } ) 
            .then( () => { if (getState().posts.setAllCommentCounts) dispatch(finishedLoadingData()) } )
            .catch((err) => (console.log("Error retrieving comment counts: "+ err)));
          })
      	}
	}
}