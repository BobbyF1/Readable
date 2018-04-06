import React, { Component } from 'react'
import {  Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import TiTick from 'react-icons/lib/ti/tick'

class CommentEditMode extends Component{
	constructor(props) {
		super(props);
      	this.handleEditCommentChange = this.handleEditCommentChange.bind(this);
    }
  
	handleEditCommentChange(e){
      	this.props.editCommentChange(e)
    }
  
  render(){
		return(
					<Form>
						<FormGroup row>
							<Label for="Comment" sm={2} style={{textAlign: "left"}}>Comment </Label>
							<Col sm={10}>
								<Input type="textarea" name="Comment" id="Comment" value={this.props.editComment} onChange={this.handleEditCommentChange} />
                                <Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="primary" onClick={(e) => this.props.editCommentOK()}><TiTick/> Done </Button> 
                                <Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="secondary" onClick={(e) => this.props.editCommentCancel()}><FaTimesCircle/> Cancel </Button> 
							</Col>
						</FormGroup>
      				</Form>
		)
	}
}

export default CommentEditMode
