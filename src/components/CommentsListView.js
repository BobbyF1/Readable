import React, { Component } from 'react'
import { saveEditComment, deleteComment, upVoteComment, downVoteComment } from '../actions/CommentActions.js'
import { connect } from 'react-redux'
import CommentEditMode from './CommentEditMode.js'
import CommentReadOnlyMode from './CommentReadOnlyMode.js'
import CommentsNoComments from './CommentsNoComments.js'
import ConfirmDeleteModal from './ConfirmDeleteModal.js'


class CommentsListView extends Component
{
	constructor(props) {
		super(props);
		this.handleUpVoteComment = this.handleUpVoteComment.bind(this)
		this.handleDownVoteComment = this.handleDownVoteComment.bind(this)   
		this.handleEditComment = this.handleEditComment.bind(this)   
		this.handleDeleteComment = this.handleDeleteComment.bind(this) 
		this.handleEditCommentChange = this.handleEditCommentChange.bind(this)
		this.handleEditCommentCancel = this.handleEditCommentCancel.bind(this)
		this.handleEditCommentOK = this.handleEditCommentOK.bind(this)
      	this.performDeleteComment = this.performDeleteComment.bind(this)
      	this.deleteCommentCancelled = this.deleteCommentCancelled.bind(this)
      
		this.state={
			editingCommentId: null, 
			originalComment: null, 
			editComment: null,
          	openConfirmDeleteModal: false
		}
	}

  	handleUpVoteComment(comment){
      this.props.upVoteComment(comment)
    }

	handleDownVoteComment(comment){
      this.props.downVoteComment(comment)
    }

  	handleEditComment(comment){
      this.setState( { editingCommentId: comment.id, 
                      	originalComment: comment.body,
                     	editComment: comment.body,
                     	openConfirmDeleteCommentModal: false,
                      	requestToDelete: {}
                     } )
    }

  	performDeleteComment(){
      this.props.deleteComment(this.state.requestToDelete)
      this.setState({ openConfirmDeleteModal: false, requestToDelete: {} }) 
    }
  
  	deleteCommentCancelled(){
      this.setState({ openConfirmDeleteModal: false, requestToDelete: {} })       
    }
  
  	handleDeleteComment(comment){
      this.setState({ openConfirmDeleteModal: true, requestToDelete: comment }) 
    }
  
  	handleEditCommentChange(e){
      	this.setState( {...this.state, editComment: e.target.value } )      
    }
  
  	handleEditCommentOK(){
      	this.props.saveEditComment ( this.state.editingCommentId, this.state.editComment ); 
      	this.setState( {editingCommentId: null, originalComment: null, editComment: null } )
    }

	handleEditCommentCancel(){
      	this.setState( {editingCommentId: null, originalComment: null, editComment: null } )      
    }
 
	render(){
      
		return(
		<div>          
			<ConfirmDeleteModal 
          			openConfirmDeleteModal={this.state.openConfirmDeleteModal} 
          			deleteObject={this.state.requestToDelete}
          			deleteObjectName={"comment"} 
          			deleteConfirmed={this.performDeleteComment} 
          			deleteCancelled={this.deleteCommentCancelled} />   	
          
			{this.props.comments.sort(function(a,b){return b.voteScore-a.voteScore}).map( (c) =>
				<div key={"edit"+c.id} className="border" style={{width: "60%", margin: "10px 20px 2% 20%", padding: "10px 10px 0px"}} >
					{ this.state.editingCommentId && this.state.editingCommentId===c.id ?
          				<CommentEditMode 	editComment={this.state.editComment} 
          									editCommentChange={this.handleEditCommentChange}
          									editCommentOK={this.handleEditCommentOK} 
          									editCommentCancel={this.handleEditCommentCancel} />
					:
					<div key={c.id}>
          				<CommentReadOnlyMode comment={c} 
          									upVoteComment={this.handleUpVoteComment} 
          									downVoteComment={this.handleDownVoteComment}
											deleteComment={this.handleDeleteComment} 
          									editComment={this.handleEditComment} />
					</div>}
				</div>
			)}
			{ this.props.comments && this.props.comments.length > 0 ? null : <CommentsNoComments /> }
		</div>
	)}
}

function mapDispatchToProps (dispatch) {
  return {
    upVoteComment: (c) => dispatch(upVoteComment(c)),
    downVoteComment: (c) => dispatch(downVoteComment(c)),
    deleteComment: (c) => dispatch(deleteComment(c)),
	saveEditComment: (id, body) => dispatch(saveEditComment(id, body))
  }
}

export default connect( null, mapDispatchToProps )(CommentsListView)
