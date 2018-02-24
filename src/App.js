import React, { Component } from 'react';
import './App.css';
import { setCategories } from './actions/CategoryActions.js'
import { setPosts, setPostCommentsCount } from './actions/PostActions.js'
import { addComments } from './actions/CommentActions.js'
import { connect } from 'react-redux'
import Loading from 'react-loading'
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  
  auth = { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } 
  
  state={
    loading: true
  }

  componentDidMount() {
    
  	this.setState(() => ({ loading: true }))

    const { setInitialCategories, setInitialPosts, storeComments } = this.props

    const urlCat = `${process.env.REACT_APP_BACKEND}/categories`;
    fetch(urlCat, this.auth)
      .then( (res) => { return(res.text()) })
      .then((data) => { setInitialCategories(JSON.parse(data).categories) })
      .catch((err) => (console.log("Error retrieving categories: "+ err)));

    const urlPost = `${process.env.REACT_APP_BACKEND}/posts`;
    fetch(urlPost, this.auth )
      .then( (res) => { return(res.text()) })
      .then( (data) => { setInitialPosts(JSON.parse(data)) } )
	  .then ( (data) => this.setCommentsCount() )
      .then( () =>  this.setState({loading: false}) ) 
      .catch((err) => (console.log("Error retrieving posts: "+ err)));
      
  }

	setCommentsCount(){
      
      	if (Array.isArray(this.props.posts))
      	{
    		const { setCommentsCount , storeComments} = this.props

			this.props.posts.forEach( function(post) {
              const urlPostComments = `${process.env.REACT_APP_BACKEND}/posts/${post.id}/comments`;
              fetch(urlPostComments, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' }  )
                  .then( (res) => { return(res.text()) })
				  .then ( (data) => {return (JSON.parse(data))})
                  .then ( (parsedData) => { storeComments(parsedData); setCommentsCount (post, parsedData.length) } ) 
				  .catch((err) => (console.log("Error retrieving comments: "+ err)));
          })
      	}      
    }

  render() {
    const { categories, posts, comments } = this.props

    return (
      <div className="App">
	      { 
      		this.state.loading === true ? <Loading delay={5} type='spin' color='#222' className='loading' /> : <p>Loaded!</p> 
      	  }
      </div>
    );
  }
}

function mapStateToProps ( {categories, posts, comments} ) {
  	
  return { 
    	categories,
        posts,
    	comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setInitialCategories: (data) => dispatch(setCategories(data)),
    setInitialPosts: (data) => dispatch(setPosts(data)),
    setCommentsCount: (post, count) => dispatch(setPostCommentsCount(post, count)),
    storeComments: (comments) => dispatch(addComments(comments))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
