import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PostsListView extends Component {

  static propTypes = {
        posts : PropTypes.array.isRequired,
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
        		<button>UpVote Post</button>
        		<button>DownVote Post</button>
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
