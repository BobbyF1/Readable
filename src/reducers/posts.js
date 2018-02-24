import {
  SET_POSTS,
  SET_POST_COMMENTS_COUNT
} from '../actions/PostActions.js'

function posts (state = {}, action) {
  
  switch (action.type) {
    case SET_POSTS:
  		const { posts } = action
      	return posts
    case SET_POST_COMMENTS_COUNT:
      	const { postId, commentCount } = action
        return state.map( (post) => { return post.id === postId ? Object.assign({}, post, { commentCount: commentCount }) : post } ) 
    default :
      	return state
  }
}

export default posts
