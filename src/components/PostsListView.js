import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PostsListView extends Component {

  static propTypes = {
        posts : PropTypes.array.isRequired,
    	upVote: PropTypes.func.isRequired,
    	downVote: PropTypes.func.isRequired,
  }

	handleUpvote(e, post){
      this.props.upVote(post)
    }

	handleDownvote(e, post){
      this.props.downVote(post)
    }

	render(){
      
      const { posts } = this.props
      
      return (
      	<ul>
         {posts.map( (post) => 
          	<li key={post.id}>
        		<strong>Category: </strong>{post.category} <br/>
        		<strong> Title: </strong>{post.title}
        		<strong> By: </strong>{post.author}
        		<strong> Comments: </strong>{post.commentCount ? post.commentCount : 0 }
        		<strong> Current score is </strong>{post.voteScore}
        		<br/>
        		<button onClick={ (e) => this.handleUpvote(e, post) }>UpVote Post</button>
        		<button onClick={ (e) => this.handleDownvote(e, post) }>DownVote Post</button>
        		<button>Edit Post</button>
        		<button>Delete Post</button>
        		<hr/>        		
        </li>
      	)
    	}     
      	</ul>
      )
    }
}

export default PostsListView
