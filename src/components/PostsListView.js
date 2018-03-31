import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap';
import FaThumpbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumpbsDown from 'react-icons/lib/fa/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deletePost, editPost } from '../actions/PostActions.js'
import { connect } from 'react-redux' 

class PostsListView extends Component {

  
    constructor(props) {
      super(props);

      this.dynamicSort = this.dynamicSort.bind(this)

  }

  
  
  state={
    navigateToPost : null 
  }
  
  static propTypes = {
        posts : PropTypes.array.isRequired,
    	upVote: PropTypes.func.isRequired,
    	downVote: PropTypes.func.isRequired,
    	editPost: PropTypes.func.isRequired,
  }

 dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

	handleUpvote(e, post){
      this.props.upVote(post)
    }

	handleDownvote(e, post){
      this.props.downVote(post)
    }

	componentDidUpdate(){
      if (this.state.navigateToPost)
        this.setState({ navigateToPost : null })
    }

	render(){
      
      const { posts } = this.props

	var currentPathname = window.location.pathname;
	  
      if (this.state.navigateToPost) {
        const toPost = this.state.navigateToPost
        const navigateToUrl = "/" + toPost.category + "/" + toPost.id
        if (currentPathname !== navigateToUrl) {
          return <Redirect to = { navigateToUrl } push={true} /> 		
		}
      }
      
      return (
      	<ul className="list-group">
         {posts.sort(this.dynamicSort(this.props.postSortOrder)).map( (post) => 
          	<li key={post.id}>
				<div style={{"marginLeft": "20px", "marginLRight": "20px"}}>
                    <blockquote>{post.title}
                                                                         <footer>
        <cite>
            {post.author}
        </cite>
    </footer></blockquote>
                    <p><small>Category: <em>{post.category} </em> By: <em>{post.author}</em> Comments: 
						<em> {post.commentCount ? post.commentCount : 0 }</em> Current score: {post.voteScore} Created: <em>{moment(post.timestamp).format('MMMM Do YYYY, h:mm:ss a') }</em></small></p>
				</div>
                <div className="bg-info clearfix" style={{ padding: '.4rem', "marginLeft": "10px", "marginRight": "10px", "borderRadius": "5px" }}>
                    <Button className="btn btn-secondary float-left" style={{"marginLeft": "10px"}} size="sm" color="success" onClick={ (e) => this.handleUpvote(e, post) }><FaThumpbsUp /> UpVote Post</Button>{' '}
                    <Button className="btn btn-secondary float-left" style={{margin: "0px 10px"}} size="sm" color="danger" onClick={ (e) => this.handleDownvote(e, post) }><FaThumpbsDown /> DownVote Post</Button>{' '}
                    <Button className="btn btn-primary float-right" style={{margin: "0px 10px"}} size="sm" color="primary" 
						onClick={ (e) => this.setState( { navigateToPost: post } ) }><FaEdit /> Edit Post</Button>{' '}
                    <Button className="btn btn-secondary float-right" style={{margin: "0px 10px"}} size="sm" color="secondary"
						onClick={ (e) => this.props.deletePost(post) } ><FaTimesCircle /> Delete Post</Button>{' '}
				</div>
        		<hr style={{"border": "dotted"}}/>        		
        </li>
      	)
    	}     
      	</ul>
      )
    }
}

function mapStateToProps ( {categories, posts, comments, generic} , ownProps) {
  return { 
    postSortOrder: posts.sortOrder,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (post) => dispatch(deletePost(post))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(PostsListView)


