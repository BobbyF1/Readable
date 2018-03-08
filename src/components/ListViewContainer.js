import React, { Component } from 'react'
import { loadCategories } from '../actions/CategoryActions.js'
import { loadPosts, setPostCommentCounts, upVotePostAction, downVotePostAction } from '../actions/PostActions.js'
import { addComments } from '../actions/CommentActions.js'
import { connect } from 'react-redux'
import Loading from 'react-loading'
import PostsListView from '../components/PostsListView.js'
import { Router, BrowserRouter, Route, Link } from 'react-router-dom';
import HeaderBar from './HeaderBar.js'
import { initialDataLoad } from '../actions/GenericActions.js'

class ListViewContainer extends Component
{
  constructor(props) {
    super(props);

    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
  }

    componentDidMount() {      
      	this.props.triggerInitialDataLoad();
  }
  
	upVote(post){
      this.props.upVotePost(post.id)
    }

	downVote(post){
      this.props.downVotePost(post.id)
    }

    render(){
		return (  
      		<div>
				<div>
                     { this.props.isLoaded === false ? 
                            <Loading delay={5} type='spin' color='#222' className='loading' /> 
                    :      
                <div>
       				<div>
						<HeaderBar categoryFilter={this.props.match.params.cat} categories={this.props.categories ? this.props.categories : {} }/>       
					</div>
					<div>
                  		<hr size={10}/>
                  		<PostsListView posts={this.props.posts? this.props.posts.length > 0 ? 
                            this.props.posts.filter( (p) => this.props.match.params.cat === "All" || p.category === this.props.match.params.cat ) : [] : [] } 
                            upVote={(postId) => this.upVote(postId)} 
                            downVote={(postId) => this.downVote(postId)}	/>
					</div>
				</div>
				}
			</div>
		</div>
		)
  	}
  }

function mapStateToProps ( {categories, posts, comments, generic} ) {
  return { 
    	categories: categories.data,
        posts: posts.data,
    	isLoaded: generic.loaded
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: (post) => dispatch(upVotePostAction(post)),
    downVotePost: (post) => dispatch(downVotePostAction(post)),
    triggerInitialDataLoad: () => dispatch( initialDataLoad()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListViewContainer)

