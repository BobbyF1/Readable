import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap';
import FaThumpbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumpbsDown from 'react-icons/lib/fa/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';

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
      	<ul className="list-group">
         {posts.map( (post) => 
          	<li key={post.id}>
				<div style={{"marginLeft": "20px", "marginLRight": "20px"}}>
                    <p style={{"textAlign": "left"}}><strong>Category: </strong>{post.category} <br/></p>
                    <p style={{"textAlign": "left"}}><strong> Title: </strong>{post.title}
                    <strong> By: </strong>{post.author}<br/></p>
                    <p style={{"textAlign": "left"}}><strong> Comments: </strong>{post.commentCount ? post.commentCount : 0 }
                    <strong> Current score is </strong>{post.voteScore}</p>
				</div>
                <div className="bg-info clearfix" style={{ padding: '.4rem', "marginLeft": "10px", "marginRight": "10px", "borderRadius": "25px" }}>
                    <Button className="btn btn-secondary float-left" style={{"marginLeft": "10px"}} size="sm" color="success" onClick={ (e) => this.handleUpvote(e, post) }><FaThumpbsUp /> UpVote Post</Button>{' '}
                    <Button className="btn btn-secondary float-left" style={{margin: "0px 10px"}} size="sm" color="danger" onClick={ (e) => this.handleDownvote(e, post) }><FaThumpbsDown /> DownVote Post</Button>{' '}
                    <Button className="btn btn-primary float-right" style={{margin: "0px 10px"}} size="sm" color="primary"><FaEdit /> Edit Post</Button>{' '}
                    <Button className="btn btn-secondary float-right" style={{margin: "0px 10px"}} size="sm" color="secondary"><FaTimesCircle /> Delete Post</Button>{' '}
				</div>
        		<hr style={{"border": "solid"}}/>        		
        </li>
      	)
    	}     
      	</ul>
      )
    }
}

export default PostsListView
