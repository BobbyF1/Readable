import { combineReducers } from 'redux'
import categories from './categories.js'
import posts from './posts.js'
import comments from './comments.js'

export default combineReducers({
  categories,
  posts,
  comments,
})
