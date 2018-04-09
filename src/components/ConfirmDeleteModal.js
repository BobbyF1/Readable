import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import { Col, Button } from 'reactstrap';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import TiTick from 'react-icons/lib/ti/tick'

class ConfirmDeleteModal extends Component{
	constructor(props) {
		super(props);
      	this.handleOK = this.handleOK.bind(this);
      	this.handleCancel = this.handleCancel.bind(this);
      	this.requestModalClose = this.requestModalClose.bind(this);

      this.state={
      		openConfirmDeleteModal: false,
      		deleteObject: {},
      		deleteObjectName: ""
    	}
    
    }

	componentWillReceiveProps(nextProps){
      	this.setState( { openConfirmDeleteModal: nextProps.openConfirmDeleteModal, 
    					 deleteObject: nextProps.deleteObject,
      					 deleteObjectName: nextProps.deleteObjectName
    					} )
    }

	requestModalClose(){
        this.setState( { openConfirmDeleteModal: false,  deleteObject: {}, deleteObjectName: "" } )      
    }

	handleCancel(){
      	//close the modal "new comment" window
      	this.setState( { openConfirmDeleteModal: false,  deleteObject: {}, deleteObjectName: "" } ) 
      	this.props.deleteCancelled()
    }

  	handleOK(){
      	//create a new comment and then close the modal
      	this.props.deleteConfirmed(this.state.deleteObject)
      	this.setState( { openConfirmDeleteModal: false , deleteObject: {}, deleteObjectName: "" } )      
    }

  	render(){
		return(
			<Modal
				open={this.state.openConfirmDeleteModal}
				onClose={this.requestModalClose}
				closeOnOverlayClick={false}
				little
				styles={ {modal: {height: "20%", width: "60%"} } } >
			<div>
				<h3><strong>Confirm Delete</strong></h3>
             	<p>Are you sure you want to delete this {this.state.deleteObjectName} ?</p>
				<Col sm={12}>
                	<Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="primary" onClick={(e) => this.handleOK()}><TiTick/> OK </Button> 
                    <Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="secondary" onClick={(e) => this.handleCancel()}><FaTimesCircle/> Cancel </Button> 
				</Col>
          	</div>
          	</Modal>
			)
		}
}

export default ConfirmDeleteModal


