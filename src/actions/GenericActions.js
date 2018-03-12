import { loadCategories } from '../actions/CategoryActions.js'
import { loadPosts } from '../actions/PostActions.js'

export const
	LOADING_DATA = 'SET_LOADING_DATA',
	FINISHED_LOADING_DATA = 'FINISHED_LOADING_DATA',
	NAVIGATION_ERROR = 'NAVIGATION_ERROR'

export function setNavigationError(){
  console.log("setNavigationError")
  	return(dispatch) => {
      dispatch(navigationError());
    }
}

export function navigationError(){
  	return {
  		type: NAVIGATION_ERROR,
    }
}

export function setLoadingData ( ) {
  console.log("setLoadingData")
  return {
    type: LOADING_DATA,
  }
}

export function finishedLoadingData ( ) {
  return {
    type: FINISHED_LOADING_DATA,
  }
}

export function initialDataLoad(){  
  return(dispatch) =>
    {
    	dispatch(setLoadingData());
        dispatch(loadCategories());
        dispatch(loadPosts());
  }  
}