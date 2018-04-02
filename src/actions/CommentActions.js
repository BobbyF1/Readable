import { decreasePostCommentCount } from './PostActions.js'
export const
	ADD_COMMENTS = 'ADD_COMMENTS',
	DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT',
	UP_VOTE_COMMENT = 'UP_VOTE_COMMENT',
	DELETED_COMMENT = 'DELETED_COMMENT',
	EDITED_COMMENT = 'EDITED_COMMENT'


export function editedComment(commentId, body) {
	return {
      	type: EDITED_COMMENT,
      	commentId,
      	body
    }
}

export function downVote (commentId) {
  return {
    type: DOWN_VOTE_COMMENT,
    commentId
  }
}
export function upVote (commentId) {
  return {
    type: UP_VOTE_COMMENT,
    commentId
  }
}

export function addComments ( comments ) {  
  return {
    type: ADD_COMMENTS,
    addComments: comments,
  }
}

export function deletedComment ( commentId ) {  
  return {
    type: DELETED_COMMENT,
    commentId
  }
}

export function upVoteComment (comment) {
  const urlPost = `${process.env.REACT_APP_BACKEND}/comments/${comment.id}`
  return (dispatch) => {
  	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'
                  }, credentials: 'include', 
                              method: 'post',
                              body: JSON.stringify({
                                  option: "upVote"
                              })
					})
      	.then( () => { dispatch(upVote(comment.id)) } )
  		.catch( (err) => (console.log("Error voting for a comment with id [" + comment.id+"] : " +  err)));    
  }
}

export function downVoteComment (comment) {
  const urlPost = `${process.env.REACT_APP_BACKEND}/comments/${comment.id}`
  return (dispatch) => {
  	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'
                  }, credentials: 'include', 
                              method: 'post',
                              body: JSON.stringify({
                                  option: "downVote"
                              })
					})
      	.then( () => { dispatch(downVote(comment.id)) } )
  		.catch( (err) => (console.log("Error voting for a comment with id [" + comment.id+"] : " +  err)));    
  }
}

export function deleteComment(comment){
    const urlPost = `${process.env.REACT_APP_BACKEND}/comments/${comment.id}`;  
  	return (dispatch, getState) => {
    	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want' , 'Content-Type': 'application/json'
                  }, credentials: 'include' , method: 'delete'
                       })      	
   		.then( data => { console.log('DATA RETURNED IS ', data); return (data) } )
      	.then( data => { dispatch(deletedComment(comment.id) ) } )
      	.then( data => { dispatch(decreasePostCommentCount(comment.parentId) ) } )
   		.catch( err => console.log('error', err))
    }
}




export function saveEditComment(commentId, body){
    const urlPost = `${process.env.REACT_APP_BACKEND}/comments/${commentId}`;  
   	let commentBody = JSON.stringify({
   		body: body
 	})  	
    return (dispatch, getState) => {
    	fetch(urlPost, { headers: { 'Authorization': 'whatever-you-want' , 'Content-Type': 'application/json'
                  }, credentials: 'include' , method: 'put' , body: commentBody
                       })      	
   		.then( data => { console.log('DATA RETURNED IS ', data); return (data) } )
      	.then( data => { dispatch(editedComment(commentId, body) ) } )
   		.catch( err => console.log('error', err))
    }   
}


