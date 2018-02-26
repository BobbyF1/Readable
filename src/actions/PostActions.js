export const 
	SET_POSTS = 'SET_POSTS',
	SET_POST_COMMENTS_COUNT = 'SET_POST_COMMENTS_COUNT',
	LOAD_POSTS = 'LOAD_POSTS'

export function setPosts ( posts ) {
  return {
    type: SET_POSTS,
    posts,
  }
}

export function setPostCommentsCount ( post, commentCount ) {
  
  return {
    type: SET_POST_COMMENTS_COUNT,
    postId: post.id,
    commentCount
  }
}

export function loadPosts() {

  const urlPost = `${process.env.REACT_APP_BACKEND}/posts`;
  
  return (dispatch) =>
  {  
  	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then( (data) => { dispatch(setPosts(JSON.parse(data))) } )
      .catch( (err) => (console.log("Error retrieving posts: "+ err)));
  }
  
   
}
