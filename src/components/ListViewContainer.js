import React, { Component } from 'react'
import { setNewPost, setEditPost, upVotePostAction, downVotePostAction } from '../actions/PostActions.js'
import { setCurrentCategory } from '../actions/CategoryActions.js'
import { connect } from 'react-redux'
import Loading from 'react-loading'
import PostsListView from '../components/PostsListView.js'
import { setNavigationError } from '../actions/GenericActions.js'


class ListViewContainer extends Component
{
    constructor(props) {
        super(props);
        this.upVote = this.upVote.bind(this)
      	this.downVote = this.downVote.bind(this)
        this.editPost = this.editPost.bind(this)
        this.validateCategory = this.validateCategory.bind(this)
        this.props.match.params.cat = this.props.match.params.cat ? this.props.match.params.cat : ""
    }

    componentDidMount() {
      	this.props.setEditPost(false)
      	this.props.setNewPost(false)
  	}
  
  	componentWillReceiveProps(nextProps){
		if (nextProps.categories && nextProps.categories.length>0 && nextProps.currentCategory!== nextProps.match.params.cat ? nextProps.match.params.cat : "" ){
			if(this.validateCategory(nextProps)){
                nextProps.setCurrentCategory(nextProps.match.params.cat ? nextProps.match.params.cat : "" )
			}
       	}
    }  
  
  	validateCategory(nextProps){
      	//detect if they've navigated here by typing /madeupcategory in the URL
      	if ( nextProps.categories.length>0 && nextProps.match.params.cat !== "" ){
          if ( nextProps.categories.filter( (c) => c.name===nextProps.match.params.cat).length===0){
                nextProps.setNavigationError()
                nextProps.history.push('/error')	//should do this from the Action....
              	return(false)
            }
        }            
      	return(true);      
    }
  
	upVote(post){
      this.props.upVotePost(post.id)
    }

	downVote(post){
      this.props.downVotePost(post.id)
    }

  	editPost(post){
      this.props.editPost(post)
    }
  
    render(){    
      	const selectedCategory = this.props.match.params.cat ? this.props.match.params.cat : ""
		return (  
      		<div>
				<div>
                     {!(this.props.isCategoriesLoaded && this.props.isPostsLoaded) ? 
                      		<div style={{width: "20%", height: "20%", margin: "20% 60% 40% 40%", padding: "10px 10px 0px", textAlign: "center"}} >
	                            <Loading delay={1} type='spinningBubbles' height='40%' width='40%' color='#222' className='loading' /> 
                        	</div>
                  :      
                <div>
					<div>
                  		<PostsListView posts={this.props.posts? this.props.posts.length > 0 ? 
                            this.props.posts.filter( (p) => selectedCategory === "" || p.category === selectedCategory ) : [] : [] } 
                            upVote={(postId) => this.upVote(postId)} 
                            downVote={(postId) => this.downVote(postId)}
                            editPost={(post) => this.editPost(post)}
						/>
					</div>
				</div>
				}
			</div>
		</div>
		)
  	}
  }

function mapStateToProps ( {categories, posts, comments, generic} , ownProps) {
  return { 
    	categories: categories.data,
        posts: posts.data,
    	currentCategory: categories.currentCategory,
    	isPostsLoaded: posts.isLoaded,
    	isCategoriesLoaded: categories.isLoaded
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: (post) => dispatch(upVotePostAction(post)),
    downVotePost: (post) => dispatch(downVotePostAction(post)),
    setNavigationError: () => dispatch(setNavigationError()),
    setCurrentCategory: (currentCategory) => dispatch(setCurrentCategory(currentCategory)),
    setEditPost: (editPost) => dispatch(setEditPost(editPost)),
    setNewPost: (newPost) => dispatch(setNewPost(newPost)),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(ListViewContainer)

