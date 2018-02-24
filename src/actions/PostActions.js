export const 
	SET_POSTS = 'SET_POSTS',
	SET_POST_COMMENTS_COUNT = 'SET_POST_COMMENTS_COUNT'

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

