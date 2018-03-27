import { addComments } from './CommentActions.js'
import { finishedLoadingData } from './GenericActions.js'

export const 
	SET_POSTS = 'SET_POSTS',
	SET_POST_COMMENTS_COUNT = 'SET_POST_COMMENTS_COUNT',
	LOAD_POSTS = 'LOAD_POSTS',
	SET_POST_ZERO_COMMENTS_COUNT = 'SET_POST_ZERO_COMMENTS_COUNT',
	UP_VOTE_POST = 'UP_VOTE_POST',
	DOWN_VOTE_POST = 'DOWN_VOTE_POST',
	SET_EDIT_POST = 'SET_EDIT_POST', 
	SET_NEW_POST = 'SET_NEW_POST', 
	ADD_POST = 'ADD_POST',
	DELETED_POST = 'DELETED_POST',
	EDITED_POST = 'EDITED_POST',
	SET_SORT_ORDER = 'SET_SORT_ORDER'


export function setSortOrder(sortBy){
  return{
    type: SET_SORT_ORDER,
    sortBy
  }
}

export function editedPost(post){
  	return{
      type: EDITED_POST,
      post: post
    }  
}

export function deletedPost(postId){
  	return{
      type: DELETED_POST,
      postId: postId
    }
}

export function setEditPost(editFlag){
  return {
    type: SET_EDIT_POST,
    edit: editFlag
  }
}

export function setNewPost(newFlag){
  return {
    type: SET_NEW_POST,
    new: newFlag
  }
}

export function addPost(post){
	return {
  		type: ADD_POST,
  		post
	}
}

export function downVote (postId) {
  return {
    type: DOWN_VOTE_POST,
    postId
  }
}
export function upVote (postId) {
  return {
    type: UP_VOTE_POST,
    postId
  }
}

export function setPosts ( posts ) {
  return {
    type: SET_POSTS,
    posts,
  }
}

export function setCommentsCount ( post, commentCount ) {  
  return {
    type: SET_POST_COMMENTS_COUNT,
    postId: post.id,
    commentCount
  }
}

export function setZeroCommentsCount ( post ) {
  return {
    type: SET_POST_ZERO_COMMENTS_COUNT,
    postId: post.id,
  }
  
}

export function downVotePostAction(postId){ 
  const urlPost = `${process.env.REACT_APP_BACKEND}/posts/${postId}`
  return (dispatch) => {
  	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'
                  }, credentials: 'include', 
                              method: 'post',
                              body: JSON.stringify({
                                  option: "downVote"
                              })
					})
      	.then( () => { dispatch(downVote(postId)) } )
  		.catch( (err) => (console.log("Error voting for a post id [" + postId+"] : " +  err)));    
  } 
}

export function upVotePostAction(postId){ 
  const urlPost = `${process.env.REACT_APP_BACKEND}/posts/${postId}`
  return (dispatch) => {
  	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'
                  }, credentials: 'include', 
                              method: 'post',
                              body: JSON.stringify({
                                  option: "upVote"
                              })
					})
      	.then( () => { dispatch(upVote(postId)) } )
  		.catch( (err) => (console.log("Error voting for a post id [" + postId+"] : " +  err)));    
  } 
}

export function loadPosts() {

  const urlPost = `${process.env.REACT_APP_BACKEND}/posts`;
  return (dispatch, getState) =>
  {  
  	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then ( (data) => {  return JSON.parse(data) } )
      .then( (data) => { dispatch(setPosts(data.filter( (p) => !(p.deleted) ))) ; return (data) } )
      .then(  () => {if( getState().posts.isLoaded )  dispatch(setPostCommentCounts(getState().posts.data)) } ) 
      .catch( (err) => (console.log("Error retrieving posts in loadPosts: "+ err)));
  }
}

export function setPostCommentCounts(posts){
  	return(dispatch, getState) =>
    {
      if(posts){
        posts.forEach( function(post) {
          const urlPostComments = `${process.env.REACT_APP_BACKEND}/posts/${post.id}/comments`;
          fetch(urlPostComments, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' }  )
            .then( (res) => { return(res.text()) })
            .then ( (data) => {return (JSON.parse(data))})
          	.then ( (data) => {return (data.filter ( (c) => !(c.deleted) ) ) } )
            .then ( (parsedData ) => { if (parsedData.length > 0)  
          							{	dispatch(addComments(parsedData)) 
                                      	dispatch(setCommentsCount (post, parsedData.length)) 
                                    }
                                     else
                                     {
                                       	dispatch(setZeroCommentsCount(post))
                                     }
                                    
                                    } ) 
            .then( () => { if (getState().posts.setAllCommentCounts) dispatch(finishedLoadingData()) } )
            .catch((err) => (console.log("Error retrieving comment counts: "+ err)));
          })
      	}
	}
}

export function createPost(post){
   	let postBody = JSON.stringify({
   		id: post.id,
   		timestamp: post.timestamp,
   		title: post.title,
   		body: post.body,
   		author: post.author,
   		category: post.category
 	})
    const urlPost = `${process.env.REACT_APP_BACKEND}/posts`;  
  	return (dispatch, getState) => {
    	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want' , 'Content-Type': 'application/json'
                  }, credentials: 'include' , method: 'post',     		
     		body: postBody
                       })      	
   		.then( response => response.json())
   		.then( data => { console.log('DATA RETURNED IS ', data); return (data) } )
      	.then( data => { dispatch(addPost({
          	...data,
          	commentCount: 0
        })) } )
   		.catch( err => console.log('error', err))
    }
}

export function deletePost(post){
    const urlPost = `${process.env.REACT_APP_BACKEND}/posts/${post.id}`;  
  	return (dispatch, getState) => {
    	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want' , 'Content-Type': 'application/json'
                  }, credentials: 'include' , method: 'delete'
                       })      	
   		.then( data => { console.log('DATA RETURNED IS ', data); return (data) } )
      	.then( data => { dispatch(deletedPost(post.id) ) } )
   		.catch( err => console.log('error', err))
    }
}

export function saveEditPost(post){
    const urlPost = `${process.env.REACT_APP_BACKEND}/posts/${post.id}`;  
   	let postBody = JSON.stringify({
   		title: post.title,
   		body: post.body,
      	author: post.author,
      	voteScore: post.voteScore
 	})  	
    return (dispatch, getState) => {
    	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want' , 'Content-Type': 'application/json'
                  }, credentials: 'include' , method: 'put' , body: postBody
                       })      	
   		.then( data => { console.log('DATA RETURNED IS ', data); return (data) } )
      	.then( data => { dispatch(editedPost(post.id) ) } )
   		.catch( err => console.log('error', err))
    } 
  
}
