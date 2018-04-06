import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import FaThumpbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumpbsDown from 'react-icons/lib/fa/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';

class CommentReadOnlyMode extends Component{
	constructor(props) {
		super(props);
      	this.handleUpVoteComment = this.handleUpVoteComment.bind(this);
      	this.handleDownVoteComment = this.handleDownVoteComment.bind(this);
      	this.handleDeleteComment = this.handleDeleteComment.bind(this);
      	this.handleEditComment = this.handleEditComment.bind(this);
    }
  
	handleUpVoteComment(e){
      	this.props.upVoteComment(e)
    }

  	handleDownVoteComment(e){
      	this.props.downVoteComment(e)
    }

  	handleDeleteComment(e){
      	this.props.deleteComment(e)
    }  

  	handleEditComment(e){
      	this.props.editComment(e)
    }  
  
  render(){
		return(
				<div key={this.props.comment.id}>
					<Row>
						<Col xs="9">
							<p key={this.props.comment.id} style={{textAlign: 'left', margin: "1px 1px"}}><strong>{this.props.comment.body}</strong></p>
                          	<p style={{textAlign: 'left'}}>
								by <em>{this.props.comment.author}</em> { this.props.comment.voteScore >= 0 ? 
          									<FaThumpbsUp color={"green"}/> : 
          									<FaThumpbsDown color={"red"}/> } {this.props.comment.voteScore}
							</p>
						</Col>
						<Col xs="2">
							<a title="UpVote Comment" style={{ color: 'limegreen' }} href='javascript:void(0)' 
								onClick={() => this.handleUpVoteComment(this.props.comment)}><FaThumpbsUp /></a>
							<a title="DownVote Comment" style={{ color: 'red' }} href='javascript:void(0)' 
								onClick={() => this.handleDownVoteComment(this.props.comment)}><FaThumpbsDown /></a>
							<a title="Delete Comment" color={"secondary"} href='javascript:void(0)' 
								onClick={() => this.handleDeleteComment(this.props.comment)}><FaTimesCircle /></a>
							<a title="Edit Comment" color={"primary"} href='javascript:void(0)' 
								onClick={() => this.handleEditComment(this.props.comment)}><FaEdit /></a>
						</Col>
					</Row>
				</div>
			)
	}
}

export default CommentReadOnlyMode

