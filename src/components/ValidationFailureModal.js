import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import { Col, Button } from 'reactstrap';
import TiTick from 'react-icons/lib/ti/tick'

class ValidationFailureModal extends Component{
	constructor(props) {
		super(props);
      	this.requestModalClose = this.requestModalClose.bind(this);
    }

  	state={
      	openModal: false,
      	validationMessage: ""
    }

	componentWillReceiveProps(nextProps){
      	this.setState( { openModal: nextProps.open, validationMessage: nextProps.validationMessage } )
    }

	requestModalClose(){
        this.setState( { openModal: false} )
		this.props.handleClosedValidationModal()
    }

  	render(){
		return(
			<Modal
				open={this.state.openModal}
				onClose={this.requestModalClose}
				closeOnOverlayClick={false}
				little
				styles={ {modal: {height: "20%", width: "60%"} } } >
			<div>
				<h3><strong>Validation</strong></h3>
             	<p>{this.state.validationMessage}</p>
				<Col sm={12}>
                	<Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="primary" onClick={(e) => this.requestModalClose()}><TiTick/> OK </Button> 
				</Col>
          	</div>
          	</Modal>
			)
		}
}

export default ValidationFailureModal

