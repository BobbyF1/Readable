import
{ SET_CATEGORIES ,
	SET_CURRENT_CATEGORY } from './Types.js'

export function setCurrentCategory(currentCategory){
    return {
		type: SET_CURRENT_CATEGORY,
		currentCategory,
	}
}

export function setCategories ( categories ) {
    return {
        type: SET_CATEGORIES,
        categories,
  }
}

export function loadCategories() {
	const urlCat = `${process.env.REACT_APP_BACKEND}/categories`;
	return (dispatch) =>
    {      
		fetch(urlCat, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } )
      	.then( (res) => { return(res.text()) })
        .then( (data) => { dispatch(setCategories(JSON.parse(data).categories)) })
        .catch((err) => (console.log("Error retrieving categories: "+ err)));
    }
}
