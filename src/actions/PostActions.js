import { addComments } from './CommentActions.js'

export const 
	SET_POSTS = 'SET_POSTS',
	SET_POST_COMMENTS_COUNT = 'SET_POST_COMMENTS_COUNT',
	LOAD_POSTS = 'LOAD_POSTS',
	SET_POST_ZERO_COMMENTS_COUNT = 'SET_POST_ZERO_COMMENTS_COUNT'

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

export function loadPosts() {

  const urlPost = `${process.env.REACT_APP_BACKEND}/posts`;
  return (dispatch) =>
  {  
  	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then ( (data) => {  return JSON.parse(data) } )
      .then( (data) => { dispatch(setPosts(data)) ; return (data) } )
      .catch( (err) => (console.log("Error retrieving posts in loadPosts: "+ err)));
  }
}

export function setPostCommentCounts(posts){
  
  	return(dispatch) =>
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
            .catch((err) => (console.log("Error retrieving comment counts: "+ err)));
          })
      	}
	}
}