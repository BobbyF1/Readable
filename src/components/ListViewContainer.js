import React, { Component } from 'react'
import { setPostCommentCounts, setNewPost, setEditPost, upVotePostAction, downVotePostAction } from '../actions/PostActions.js'
import { setCurrentCategory } from '../actions/CategoryActions.js'
import { connect } from 'react-redux'
import Loading from 'react-loading'
import PostsListView from '../components/PostsListView.js'
import { initialDataLoad, setNavigationError } from '../actions/GenericActions.js'
import { finishedLoadingData } from '../actions/GenericActions.js'

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
      	if(!(this.props.isLoaded))
          this.props.triggerInitialDataLoad();
      	this.props.setEditPost(false)
      	this.props.setNewPost(false)
  	}
  
  	componentWillReceiveProps(nextProps){

      console.log("nextProps")
      console.log(nextProps)
      
      
        
      if(!(this.props.isAllCommentCountsSet) && nextProps.isAllCommentCountsSet){
        //just finished setting all comment counts
        this.props.finishedLoadingData();
      }

      
     if (!(this.props.isPostsLoaded) && nextProps.isPostsLoaded){
       console.log("Posts have just loaded therefore I will load comments and set counts.....")
       	this.props.setPostCommentCounts(nextProps.posts)
     }
      
     if (this.props.isLoaded) 
     	this.props.setCurrentCategory(nextProps.match.params.cat ? nextProps.match.params.cat : "" )

      if(nextProps.categories) {
          	if (nextProps.match.params.cat)
              	this.validateCategory(nextProps.match.params.cat)
        }
    }
  
  
  	validateCategory(cat){
      	//detect if they've navigated here by typing /madeupcategory in the URL

      	if ( this.props.categories.length>0 && cat !== "" )
        {
          if ( this.props.categories.filter( (c) => c.name===cat).length===0)
            {
                this.props.setNavigationError()
                this.props.history.push('/error')	//should do this from the Action....
            }
        }      
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
                     { this.props.isLoaded === false ? 
                            <Loading delay={5} type='spin' color='#222' className='loading' /> 
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
    	isLoaded: generic.loaded,
    	currentCategory: categories.currentCategory,
    	isPostsLoaded: posts.isLoaded,
    	isAllCommentCountsSet: posts.setAllCommentCounts    	
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: (post) => dispatch(upVotePostAction(post)),
    downVotePost: (post) => dispatch(downVotePostAction(post)),
    triggerInitialDataLoad: () => dispatch( initialDataLoad()),
    setNavigationError: () => dispatch(setNavigationError()),
    setCurrentCategory: (currentCategory) => dispatch(setCurrentCategory(currentCategory)),
    setEditPost: (editPost) => dispatch(setEditPost(editPost)),
    setNewPost: (newPost) => dispatch(setNewPost(newPost)),
    setPostCommentCounts: (posts) => dispatch(setPostCommentCounts(posts)),
    finishedLoadingData: () => dispatch(finishedLoadingData())

  }
}

export default connect( mapStateToProps, mapDispatchToProps )(ListViewContainer)

