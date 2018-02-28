import React, { Component } from 'react';
import './App.css';
import { loadCategories } from './actions/CategoryActions.js'
import { loadPosts, setPostCommentCounts } from './actions/PostActions.js'
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
    this.commentCounts = this.commentCounts.bind(this)
  }
  
  auth = { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' } 
  
  state={
    loading: true
  }

  componentDidMount() {
    
  	this.setState(() => ({ loading: true }))

	this.props.loadCategories()
	this.props.loadPosts()

  }

	 componentWillUpdate(nextProps) {
       if ( ( nextProps.loadedCategories && nextProps.loadedPosts) && ! (this.props.loadedCategories && this.props.loadedPosts) ) 
       {
       		this.props.setCommentCounts(nextProps.posts)
     	}
		if ( (!this.props.setAllCommentsCounts) && nextProps.setAllCommentsCounts)
		{
  			this.setState(() => ({ loading: false }))
		}
       
     }

	selectCategory(data){
      this.setState({categoriesFilter: data})
    }

	commentCounts(){
      console.log("CLIEKCED:")
      console.log(this.props)
      this.props.setCommentCounts(this.props.posts)
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
<button onClick={this.commentCounts}>
  TEST
</button>
      				<DropDownSelector 
      					selectCategory={this.selectCategory} 
      					displayValues={Array.isArray(categories) ? categories : [] } displayAllItem={true} 
					/>
					<hr size={10}/>
					 <PostsListView posts={posts? 
                                           posts.length > 0 ? posts.filter( (p) => this.state.categoriesFilter === "All" || p.category === this.state.categoriesFilter ) : [] 
                                          	: [] } />
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
    	loadedPosts: posts.isLoaded,
    	setAllCommentsCounts: posts.setAllCommentCounts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: () => dispatch(loadCategories()),
    loadPosts: () => dispatch(loadPosts()),
    setCommentCounts: (posts) => dispatch(setPostCommentCounts(posts)),
    storeComments: (comments) => dispatch(addComments(comments))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
