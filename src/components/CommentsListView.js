import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Button, UncontrolledTooltip} from 'reactstrap';
import FaThumpbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumpbsDown from 'react-icons/lib/fa/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import { deleteComment, upVoteComment, downVoteComment } from '../actions/CommentActions.js'
import { connect } from 'react-redux'
import CommentButton from './CommentButton.js'
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class CommentsListView extends Component
{
    constructor(props) {
      super(props);
      this.handleUpVoteComment = this.handleUpVoteComment.bind(this)
      this.handleDownVoteComment = this.handleDownVoteComment.bind(this)   
      this.handleEditComment = this.handleEditComment.bind(this)   
      this.handleDeleteComment = this.handleDeleteComment.bind(this)   
    }

  	handleUpVoteComment(comment){
      this.props.upVoteComment(comment)
    }

	handleDownVoteComment(comment){
      this.props.downVoteComment(comment)
    }

  	handleEditComment(comment){
      this.props.handleEditComment(comment)
    }

  	handleDeleteComment(comment){
      this.props.deleteComment(comment)
    }
  
  render(){   

    return(      
      	<div>
      		<div>
                    {this.props.comments.map( (c) => 
    			        <div className="border" style={{width: "96%", margin: "10px 20px 2% 2%", padding: "20px 20px 50px"}} >
                         <Form>
							<Container>
                          <Row key={c.id} >
                          		<Col xs="9">
                            		<li key={c.id} style={{textAlign: 'left'}}>
										<Input type="text" name="author" placeholder={c.author} disabled />  										
									</li>
                            	</Col>
                            	<Col xs="3">Score: {c.voteScore}
									< CommentButton textLabel={"Edit Comment"} id={c.id} color={"primary"} buttonClick={() => this.handleEditComment(c) }><FaEdit /></CommentButton>
									< CommentButton textLabel={"Delete Comment"} id={c.id} color={"secondary"} buttonClick={() => this.handleDeleteComment(c) }><FaTimesCircle /></CommentButton>
									< CommentButton textLabel={"DownVote Comment"} id={c.id} color={"danger"} buttonClick={() => this.handleDownVoteComment(c) }><FaThumpbsDown /></CommentButton>
									< CommentButton textLabel={"UpVote Comment"} id={c.id} color={"success"} buttonClick={() => this.handleUpVoteComment(c) }><FaThumpbsUp /></CommentButton>
								</Col>
                            </Row>
				</Container>
							</Form>
						</div>
                          )}
    		</div>
      	</div>
      )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVoteComment: (c) => dispatch(upVoteComment(c)),
    downVoteComment: (c) => dispatch(downVoteComment(c)),
    deleteComment: (c) => dispatch(deleteComment(c))
  }
}

export default connect( null, mapDispatchToProps )(CommentsListView)


