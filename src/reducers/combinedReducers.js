import { combineReducers } from 'redux'
import categories from './categories.js'
import posts from './posts.js'
import comments from './comments.js'
import generic from './generic.js'

export default combineReducers({
	categories,
	posts,
	comments,
	generic,
})
