import React, { Component } from 'react'
import { saveEditComment, deleteComment, upVoteComment, downVoteComment } from '../actions/CommentActions.js'
import { connect } from 'react-redux'
import CommentEditMode from './CommentEditMode.js'
import CommentReadOnlyMode from './CommentReadOnlyMode.js'
import CommentsNoComments from './CommentsNoComments.js'


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
      
		this.state={
			editingCommentId: null, 
			originalComment: null, 
			editComment: null
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
                     	editComment: comment.body} )
    }

  	handleDeleteComment(comment){
      this.props.deleteComment(comment)
    }
  
  	handleEditCommentChange(e){
      	this.setState( {...this.state, editComment: e.target.value } )      
    }
  
  	handleEditCommentOK(){
		///save the edited comment
      	this.props.saveEditComment ( this.state.editingCommentId, this.state.editComment ); 
      	this.setState( {editingCommentId: null, originalComment: null, editComment: null } )
    }

	handleEditCommentCancel(){
      	this.setState( {editingCommentId: null, originalComment: null, editComment: null } )      
    }
 
	render(){
		return(
		<div>
			{this.props.comments.map( (c) =>
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
