import {
  SET_POSTS
} from '../actions/PostActions.js'

function posts (state = {}, action) {
        
  switch (action.type) {
    case SET_POSTS:
  	const { posts } = action
      return posts ; 
    default :
      return state
  }
}

export default posts
