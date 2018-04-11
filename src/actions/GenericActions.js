import { loadCategories } from '../actions/CategoryActions.js'
import { loadPosts } from '../actions/PostActions.js'
import { NAVIGATION_ERROR } from '../actions/Types.js'

export function setNavigationError(){
  	return(dispatch) => {
        dispatch(navigationError());
    }
}

export function navigationError(){
  	return {
  		type: NAVIGATION_ERROR,
    }
}

export function initialDataLoad(){  
  return(dispatch) =>
    {
        dispatch(loadCategories());
        dispatch(loadPosts());
  }  
}