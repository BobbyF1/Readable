import {
  SET_POSTS,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  SET_EDIT_POST,
  SET_NEW_POST,
  ADD_POST,
  DELETED_POST,
  EDITED_POST,
  SET_SORT_ORDER,
  DECREASE_POST_COMMENT_COUNT,
  INCREASE_POST_COMMENT_COUNT
} from '../actions/Types.js'
import {url, credentials} from '../APICall.js'

export function decreasePostCommentCount(postId) {
  return {type: DECREASE_POST_COMMENT_COUNT, postId}
}

export function increasePostCommentCount(postId) {
  return {type: INCREASE_POST_COMMENT_COUNT, postId}
}

export function setSortOrder(sortBy) {
  return {type: SET_SORT_ORDER, sortBy}
}

export function editedPost(post) {
  return {type: EDITED_POST, post: post}
}

export function deletedPost(postId) {
  return {type: DELETED_POST, postId: postId}
}

export function setEditPost(editFlag) {
  return {type: SET_EDIT_POST, edit: editFlag}
}

export function setNewPost(newFlag) {
  return {type: SET_NEW_POST, new: newFlag}
}

export function addPost(post) {
  return {type: ADD_POST, post}
}

export function downVote(postId) {
  return {type: DOWN_VOTE_POST, postId}
}
export function upVote(postId) {
  return {type: UP_VOTE_POST, postId}
}

export function setPosts(posts) {
  return {type: SET_POSTS, posts}
}

export function downVotePostAction(postId) {
  const urlPost = `${url}/posts/${postId}`
  return (dispatch) => {
    fetch(urlPost, {
      headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
      credentials: credentials,
      method: 'post',
      body: JSON.stringify({option: "downVote"})
    }).then(() => {
      dispatch(downVote(postId))
    }).catch((err) => (console.log("Error voting for a post id [" + postId + "] : " + err)));
  }
}

export function upVotePostAction(postId) {
  const urlPost = `${url}/posts/${postId}`
  return (dispatch) => {
    fetch(urlPost, {
      headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
      credentials: credentials,
      method: 'post',
      body: JSON.stringify({option: "upVote"})
    }).then(() => {
      dispatch(upVote(postId))
    }).catch((err) => (console.log("Error voting for a post id [" + postId + "] : " + err)));
  }
}

export function loadPosts() {
  const urlPost = `${url}/posts`;
  return (dispatch, getState) => {
    fetch(urlPost, {
      headers: {
        'Authorization': 'whatever-you-want'
      },
      credentials: credentials
    }).then((res) => {
      return (res.text())
    }).then((data) => {
      return JSON.parse(data)
    }).then((data) => {
      dispatch(setPosts(data.filter((p) => !(p.deleted))));
      return (data)
    }).catch((err) => (console.log("Error retrieving posts in loadPosts: " + err)));
  }
}

export function createPost(post) {
  let postBody = JSON.stringify({
    id: post.id,
    timestamp: post.timestamp,
    title: post.title,
    body: post.body,
    author: post.author,
    category: post.category
  })
  const urlPost = `${url}/posts`;
  return (dispatch, getState) => {
    fetch(urlPost, {
      headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
        credentials: credentials,
        method: 'post',
        body: postBody
      })
      .then(response => response.json())
      .then(data => {
        dispatch(addPost(data))
      })
      .catch(err => console.log('error', err))
  }
}

export function deletePost(post) {
  const urlPost = `${url}/posts/${post.id}`;
  return (dispatch, getState) => {
    fetch(urlPost, {
      headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
      credentials: credentials,
      method: 'delete'
    }).then(data => {
      dispatch(deletedPost(post.id))
    }).catch(err => console.log('error', err))
  }
}

export function saveEditPost(post) {
  const urlPost = `${url}/posts/${post.id}`;
  let postBody = JSON.stringify({title: post.title, body: post.body, author: post.author, voteScore: post.voteScore})
  return (dispatch, getState) => {
    fetch(urlPost, {
      headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
      credentials: credentials,
      method: 'put',
      body: postBody
    }).then(data => {
      dispatch(editedPost(post))
    }).catch(err => console.log('error', err))
  }
}
