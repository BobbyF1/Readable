import { loadCategories } from '../actions/CategoryActions.js'
import { loadPosts } from '../actions/PostActions.js'

export const
	LOADING_DATA = 'SET_LOADING_DATA',
	NAVIGATION_ERROR = 'NAVIGATION_ERROR'

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