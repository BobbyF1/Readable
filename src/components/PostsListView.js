import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap';
import Comment from 'react-icons/lib/md/comment';
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deletePost } from '../actions/PostActions.js'
import { connect } from 'react-redux' 
import ConfirmDeleteModal from './ConfirmDeleteModal.js'

import FaThumpbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumpbsDown from 'react-icons/lib/fa/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';

class PostsListView extends Component {
	constructor(props) {
		super(props);
		this.dynamicSort = this.dynamicSort.bind(this)
  		this.performDeletePost = this.performDeletePost.bind(this)
    	this.deletePostCancelled = this.deletePostCancelled.bind(this)
  		this.handleDeletePost = this.handleDeletePost.bind(this)
    }
  
	state={
		navigateToPost : null ,
      	openConfirmDeleteModal: false
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
		if (this.state.navigateToPost){
			this.setState({ navigateToPost : null })
        }
	}

  	performDeletePost(){
      this.props.deletePost(this.state.requestToDelete)
      this.setState( { returnToRoot: true } );
      this.setState({ openConfirmDeleteModal: false, requestToDelete: {} }) 
    }
  
  	deletePostCancelled(){
      this.setState({ openConfirmDeleteModal: false, requestToDelete: {} })       
    }
  
  	handleDeletePost(post){
      this.setState({ openConfirmDeleteModal: true, requestToDelete: post }) 
    }


	render(){     
		const { posts } = this.props
      	if (this.state.navigateToPost) {
        	const navigateToUrl = "/" + this.state.navigateToPost.category + "/" + this.state.navigateToPost.id
        	if (window.location.pathname !== navigateToUrl) {
          		return <Redirect to = { navigateToUrl } push={true} /> 		
			}
      	}
      
      return (
        <div>
        	<ConfirmDeleteModal 
        				openConfirmDeleteModal={this.state.openConfirmDeleteModal} 
        				deleteObject={this.state.requestToDelete}
        				deleteObjectName={"post"} 
        				deleteConfirmed={this.performDeletePost} 
        				deleteCancelled={this.deletePostCancelled} />  
        <ul className="list-group">
			{posts.sort(this.dynamicSort(this.props.postSortOrder)).map( (post) => 
			<div key={post.id} className="border" style={{width: "60%", margin: "20px 20px 2px 20%", padding: "20px 20px 10px"}} >
				<div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                    <strong>{post.title}</strong>
                    <p><strong><em>{post.author}</em></strong><small> | Category: <em>{post.category} </em><strong>| </strong> <Comment /> 
						<em>{post.commentCount ? post.commentCount : 0 }</em>   
							{"    "}{ post.voteScore >= 0 ? <FaThumpbsUp color={"green"}/> : <FaThumpbsDown  color={"red"}/> }{post.voteScore}
                            {" |"} Created: <em>{moment(post.timestamp).format('MMMM Do YYYY, h:mm:ss a') }</em></small>
					</p>
				</div>
                <div className="bg-info clearfix" style={{ padding: '.4rem', "marginLeft": "10px", "marginRight": "10px", "borderRadius": "5px" }}>
                    <Button className="btn btn-secondary float-left" style={{"marginLeft": "10px"}} size="sm" color="success" 
							onClick={ (e) => this.handleUpvote(e, post) }><FaThumpbsUp /> UpVote Post</Button>{' '}
                    <Button className="btn btn-secondary float-left" style={{margin: "0px 10px"}} size="sm" color="danger" 
							onClick={ (e) => this.handleDownvote(e, post) }><FaThumpbsDown /> DownVote Post</Button>{' '}
                    <Button className="btn btn-primary float-right" style={{margin: "0px 10px"}} size="sm" color="primary" 
							onClick={ (e) => this.setState( { navigateToPost: post } ) }><FaEdit /> Edit Post</Button>{' '}
                    <Button className="btn btn-secondary float-right" style={{margin: "0px 10px"}} size="sm" color="secondary"
							onClick={ (e) => this.handleDeletePost(post) } ><FaTimesCircle /> Delete Post</Button>{' '}
				</div>  		
        	</div>
      		)
    	}     
      	</ul>
		</div>
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
