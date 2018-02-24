import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { setCategories } from './actions/CategoryActions.js'
import { setPosts } from './actions/PostActions.js'
import { connect } from 'react-redux'
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data'
    }
  }

  componentDidMount() {
	loadInitial(this.props)
  }

  render() {
    const { categories, posts } = this.props
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Talking to the backend yields these categories: <br/>
      		{ categories[0] ? categories.map ( (c) => { return c.name + " " } )  : 'none' }
          Talking to the backend yields these posts: <br/>
      		{ posts[0] ? posts.map ( (p) => { return p.title + " " } )  : 'none' }
        </p>
      </div>
    );
  }
}

function loadInitial(props){
  	loadInitialCategories(props)
   	loadInitialPosts(props)
}

function loadInitialCategories(props){
    const { setInitialCategories } = props

    const url = `${process.env.REACT_APP_BACKEND}/categories`;
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        setInitialCategories(JSON.parse(data).categories);
      });
}  

function loadInitialPosts(props){
    const { setInitialPosts } = props

    const url = `${process.env.REACT_APP_BACKEND}/posts`;
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then((data) => {
      		console.log("RETRNED POSTS");
      		console.log(JSON.parse(data));
        setInitialPosts(JSON.parse(data));
      });
}  

function mapStateToProps ( {categories,posts} ) {
  	
  return { 
    	categories,
        posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setInitialCategories: (data) => dispatch(setCategories(data)),
    setInitialPosts: (data) => dispatch(setPosts(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
