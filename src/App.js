import React, { Component } from 'react';
import './App.css';
import { loadCategories } from './actions/CategoryActions.js'
import { loadPosts, setPostCommentsCount } from './actions/PostActions.js'
import { addComments } from './actions/CommentActions.js'
import { connect } from 'react-redux'
import Loading from 'react-loading'
import DropDownSelector from './components/DropDownSelector.js'
import PostsListView from './components/PostsListView.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categoriesFilter: "All"
    }
    
    this.selectCategory = this.selectCategory.bind(this)
  }
  
  auth = { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } 
  
  state={
    loading: true
  }

  componentDidMount() {
    
  	this.setState(() => ({ loading: true }))

	this.props.loadCategories()
	this.props.loadPosts()

  	this.setState(() => ({ loading: false }))
      
  }

	 componentWillUpdate(nextProps) {
       if ( ( nextProps.loadedCategories && nextProps.loadedPosts) && ! (this.props.loadedCategories && this.props.loadedPosts) ) 
       {
       		console.log("Loaded Categories AND Posts!!!")
     	}
       
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

	selectCategory(data){
      this.setState({categoriesFilter: data})
    }

  render() {
    const { categories, posts  } = this.props

    return (
      <div className="App">
      	<div>
	      	{ this.state.loading === true ? 
      			<Loading delay={5} type='spin' color='#222' className='loading' /> 
      			:
      			<div>
      				<h2>Category</h2>
      				<DropDownSelector 
      					selectCategory={this.selectCategory} 
      					displayValues={Array.isArray(categories) ? categories : [] } displayAllItem={true} 
					/>
					<hr size={10}/>
					 <PostsListView posts={posts.length > 0 ? posts.filter( (p) => this.state.categoriesFilter === "All" || p.category === this.state.categoriesFilter ) : [] } />
      			</div>
      		}
      	</div>
      </div>
    );
  }
}

function mapStateToProps ( {categories, posts, comments} ) {
  	
  return { 
    	categories: categories.data,
        posts: posts.data,
    	comments,
    	loadedCategories: categories.isLoaded,
    	loadedPosts: posts.isLoaded
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: () => dispatch(loadCategories()),
    loadPosts: () => dispatch(loadPosts()),
    setCommentsCount: (post, count) => dispatch(setPostCommentsCount(post, count)),
    storeComments: (comments) => dispatch(addComments(comments))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
