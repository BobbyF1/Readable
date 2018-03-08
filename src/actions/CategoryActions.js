export const
	SET_CATEGORIES = 'SET_CATEGORIES',
	LOAD_CATEGORIES = 'LOAD_CATEGORIES'

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
