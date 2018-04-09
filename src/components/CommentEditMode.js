import React, { Component } from 'react'
import {  Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import TiTick from 'react-icons/lib/ti/tick'
import ValidationFailureModal from './ValidationFailureModal.js'

class CommentEditMode extends Component{
	constructor(props) {
		super(props);
      	this.handleEditCommentChange = this.handleEditCommentChange.bind(this);
      	this.handleClosedValidationModal = this.handleClosedValidationModal.bind(this);
      	this.editCommentOK = this.editCommentOK.bind(this)
      	this.state={ openValidationErrorModal: false }          
    }
  
  	editCommentOK(){
     	if( this.props.editComment.trim()===""){
          	this.setState( { openValidationErrorModal: true } )
        }else{
          	this.props.editCommentOK()
        }
    }
  
	handleEditCommentChange(e){
      	this.props.editCommentChange(e)
    }
  
  	handleClosedValidationModal(){
      this.setState({ openValidationErrorModal: false })
    }
  
  
  render(){
		return(
          		<div>
          			<ValidationFailureModal open={this.state.openValidationErrorModal} validationMessage={"Comments can't be blank."}
          						handleClosedValidationModal={this.handleClosedValidationModal}/>
          			<Form>
						<FormGroup row>
							<Label for="Comment" sm={2} style={{textAlign: "left"}}>Comment </Label>
							<Col sm={10}>
								<Input type="textarea" name="Comment" id="Comment" value={this.props.editComment} 
          							onChange={this.handleEditCommentChange} invalid={ (this.props.editComment==="")} />
                                <Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="primary" onClick={(e) => this.editCommentOK()}><TiTick/> Done </Button> 
                                <Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="secondary" onClick={(e) => this.props.editCommentCancel()}><FaTimesCircle/> Cancel </Button> 
							</Col>
						</FormGroup>
      				</Form>
				</div>
		)
	}
}

export default CommentEditMode
