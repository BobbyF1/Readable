import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Button, UncontrolledTooltip} from 'reactstrap';
import FaThumpbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumpbsDown from 'react-icons/lib/fa/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import { saveEditComment, deleteComment, upVoteComment, downVoteComment } from '../actions/CommentActions.js'
import { connect } from 'react-redux'
import CommentButton from './CommentButton.js'
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import TiTick from 'react-icons/lib/ti/tick'

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
				<div className="border" style={{width: "60%", margin: "10px 20px 2% 20%", padding: "10px 10px 0px"}} >
				{ this.state.editingCommentId && this.state.editingCommentId===c.id ?
				//-----------------------------edit mode-
					<Form>
						<FormGroup row>
							<Label for="Comment" sm={2} style={{textAlign: "left"}}>Comment </Label>
							<Col sm={10}>
								<Input type="textarea" name="Comment" id="Comment" value={this.state.editComment} onChange={this.handleEditCommentChange} />
                                <Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="primary" onClick={(e) => this.handleEditCommentOK()}><TiTick/> Done </Button> 
                                <Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="secondary" onClick={(e) => this.handleEditCommentCancel()}><FaTimesCircle/> Cancel </Button> 
							</Col>
						</FormGroup>
      			</Form>
				//-----------------------------edit mode-
				:
				<div>
      				<Row>
                      <Col xs="9">
                          <p key={c.id} style={{textAlign: 'left', margin: "1px 1px"}}>
                              <strong>{c.body}</strong>  
                          </p>
                          <p style={{textAlign: 'left'}}>
                              by <em>{c.author}</em> { c.voteScore >= 0 ? <FaThumpbsUp color={"green"}/> : <FaThumpbsDown  color={"red"}/> } {c.voteScore}
                          </p>
                      </Col>
                      <Col xs="2">
                          <a title="UpVote Comment" style={{ color: 'limegreen' }} href='javascript:void(0)' onClick={() => this.handleUpVoteComment(c)}><FaThumpbsUp /></a>{'  '}
                          <a title="DownVote Comment" style={{ color: 'red' }} href='javascript:void(0)' onClick={() => this.handleDownVoteComment(c)}><FaThumpbsDown /></a>{'  '}
                          <a title="Delete Comment" color={"secondary"} href='javascript:void(0)' onClick={() => this.handleDeleteComment(c)}><FaTimesCircle /></a>{'  '}
                          <a title="Edit Comment" color={"primary"} href='javascript:void(0)' onClick={() => this.handleEditComment(c)}><FaEdit /></a>
                      </Col>
					</Row>
				</div>}
			</div>
			)}
					{ this.props.comments && this.props.comments.length > 0 ? null : 
    			        <div className="border" style={{width: "60%", margin: "10px 20px 2% 20%", padding: "20px 20px 10px"}} >
							<Row>
                          		<Col xs="9">
                            		<p style={{textAlign: 'left'}}>
										<strong>No comments! Why not be the first to comment?</strong> 
									</p>
                            	</Col>
                            	<Col xs="3">
								</Col>
							</Row>
						</div>
					}
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


