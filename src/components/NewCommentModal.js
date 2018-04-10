import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import { Col, Button, FormGroup, Label, Input } from 'reactstrap';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import TiTick from 'react-icons/lib/ti/tick'
import ValidationFailureModal from './ValidationFailureModal.js'


class NewCommentModal extends Component{
	constructor(props) {
		super(props);
      	this.handleNewCommentChange = this.handleNewCommentChange.bind(this);
      	this.handleNewCommentCancel = this.handleNewCommentCancel.bind(this);
      	this.handleNewCommentOK = this.handleNewCommentOK.bind(this);
      	this.requestModalClose = this.requestModalClose.bind(this);
      	this.handleClosedValidationModal = this.handleClosedValidationModal.bind(this);
    }

  	state={
      	openNewCommentModal: false,
		newComment: { comment: "", author: "" },
      	openValidationErrorModal: false
    }

	componentWillReceiveProps(nextProps){
      	this.setState( { openNewCommentModal: nextProps.open, newComment: nextProps.newComment} )
    }

	requestModalClose(){
        this.setState( { openNewCommentModal: false} )      
    }

	handleNewCommentChange(e){
		var newState = Object.assign({}, this.state)	//copy of the current state
		newState.newComment[e.target.name] = e.target.value	//set the newly edited value
		this.setState( newState );
    }

	handleNewCommentCancel(){
      	//close the modal "new comment" window
      	this.setState( { openNewCommentModal: false } )      
    }

  	handleNewCommentOK(){
     	if( this.state.newComment.body.trim()==="" || this.state.newComment.author.trim()===""){
          	this.setState( { openValidationErrorModal: true } )
        }else{
          //create a new comment and then close the modal      	
          this.props.newCommentOK(this.state.newComment)
        }
    }

	handleClosedValidationModal(){
    	this.setState( { openValidationErrorModal: false } )      
    }

  	render(){
		return(
			<Modal
				open={this.state.openNewCommentModal}
				onClose={this.requestModalClose}
				closeOnOverlayClick={false}
				little
				styles={ {modal: {height: "40%", width: "60%"} } } >
             
             <ValidationFailureModal open={this.state.openValidationErrorModal} validationMessage={"Comments must have a Body and an Author."}
             		handleClosedValidationModal={this.handleClosedValidationModal}/>

			<div className="border" style={{width: "95%", margin: "10px 0px 0px 0px", padding: "10px 10px 0px"}} >
				<h1>New Comment</h1>
				<FormGroup row>
					<Label for="Comment" sm={2} style={{textAlign: "left"}}>Comment </Label>
                	<Col sm={10}>
                    	<Input type="textarea" name="body" id="body" value={this.state.newComment.body} onChange={this.handleNewCommentChange}  
             					invalid={ this.state.newComment.hasOwnProperty('body') && (this.state.newComment.body.trim()==="" ) }/>
                	</Col>
            	</FormGroup>
            	<FormGroup row>
                	<Label for="Author" sm={2} style={{textAlign: "left"}}>Author</Label>
                	<Col sm={10}>
                    	<Input type="text" name="author" id="author" value={this.state.newComment.author } onChange={this.handleNewCommentChange} 
             					invalid={this.state.newComment.author.trim()===""}/>
                	</Col>
            	</FormGroup>
				<Col sm={12}>
                	<Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="primary" onClick={(e) => this.handleNewCommentOK()}><TiTick/> Done </Button> 
                    <Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="secondary" onClick={(e) => this.handleNewCommentCancel()}><FaTimesCircle/> Cancel </Button> 
				</Col>
          	</div>
          	</Modal>
			)
		}
}

export default NewCommentModal
