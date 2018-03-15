import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import FaThumpbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumpbsDown from 'react-icons/lib/fa/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import { connect } from 'react-redux'
import Modal from 'react-modal'

//this.props.mode

const customStyles={
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class EditPost extends Component{
   
  state={
    post: {},
    validationErrorMessage:""
  }
	constructor(props){
      super(props)
      
      this.handleChange = this.handleChange.bind(this)
      this.handleOK = this.handleOK.bind(this)
      this.requestModalClose = this.requestModalClose.bind(this)
      
    }
  
	componentWillMount(){
      Modal.setAppElement('body');
    }

  componentDidMount(){
    
    console.log("componentDidMount " + this.props.currentCategory)
    
    if(this.props.mode==="edit"){
    	const postId = this.props.match.params.postId
     	this.setState( { post:  this.props.posts.find( function(p) { return ( p.id ===  postId  ) } ) } )
	}
	else{
      	var dateNow = Date.now()
      	var newId = dateNow.toString()
		this.setState( { post: { id: newId,
                              	timestamp: dateNow,
                              	title: "New Post",
                              	body: "New Post Body",
                              	author: "Author",
                              	category: this.props.currentCategory,
                              	voteScore: 0,
                              	deleted: false
                             } } )
	}
  }

	requestModalClose(){
      	console.log("RequestModalClose")
        this.setState( { validationErrorMessage: ""} )      
    }

	handleOK(){
      if(this.state.post.title === "" || this.state.post.body === "" || this.state.post.category === "" || this.state.post.author === ""){
        console.log("Validation error")
        this.setState( { validationErrorMessage: "A post must have a Category, Title, Body and Author."} )
      }
      else
      {
      	console.log("Save!")

    	}
      
    }

  handleChange(e) {
	var newState = Object.assign({}, this.state)	//copy of the current state
	newState.post[e.target.name] = e.target.value	//set the newly edited value
    this.setState( newState );
  }

	render(){
      
      console.log(this.state.validationErrorMessage)

      return(
      <div className="border" style={{width: "80%", margin: "50px 50px 20px", padding: "20px 20px 50px"}} >
      	<h1>{this.props.mode.toUpperCase()} POST</h1>
        <Form>
          <FormGroup row>
              <Label for="Title" sm={2} style={{textAlign: "left"}}>Category</Label>
              <Col sm={10}>
				<Input type="select" name="category" id="category" value={this.state.post.category} onChange={this.handleChange} >
					{ this.props.categories.map( (c) => <option key={c.name}>{c.name}</option>) }
				</Input>
              </Col>
          </FormGroup>
          <FormGroup row>
              <Label for="Title" sm={2} style={{textAlign: "left"}}>Title</Label>
              <Col sm={10}>
                  <Input type="text" name="title" id="title" value={this.state.post.title} onChange={this.handleChange} 
						invalid= { (this.state.post.title==="") } />
              </Col>
          </FormGroup>
          <FormGroup row>
              <Label for="Body" sm={2} style={{textAlign: "left"}}>Body </Label>
              <Col sm={10}>
                  <Input type="textarea" name="body" id="body" value={this.state.post.body} onChange={this.handleChange}
						invalid={ (this.state.post.body==="") } />
              </Col>
          </FormGroup>
          <FormGroup row>
              <Label for="Author" sm={2} style={{textAlign: "left"}}>Author</Label>
              <Col sm={10}>
                  <Input type="text" name="author" id="author" value={this.state.post.author } onChange={this.handleChange} 
						invalid={ (this.state.post.author==="") }/>
              </Col>
          </FormGroup>
          <FormGroup row>
              <Label for="NumberofComments" sm={2} style={{textAlign: "left"}}>Comments</Label>
              <Col sm={5}>
                  <Input disabled type="text" name="NumberofComments" id="NumberofComments" 
      						placeholder={this.props.mode==="edit" ? this.state.post.commentCount : "0" } />
              </Col>
          </FormGroup>
          <FormGroup row>
              <Label for="CurrentScore" sm={2} style={{textAlign: "left"}}>Current Score</Label>
              <Col sm={5}>      
                  <Input disabled type="text" name="CurrentScore" id="CurrentScore" 
      						placeholder={this.props.mode==="edit" ? this.state.post.voteScore : "0" } />      			
              </Col>
             <Button className="btn float-right" style={{"marginLeft": "10px"}} size="sm" 
	             color={this.props.mode==="edit"? "success": "disabled"} 							
    	         onClick={ (e) => this.handleUpvote() } disabled={!(this.props.mode==="edit")} ><FaThumpbsUp /> UpVote Post</Button>{' '}
      		<Button className="btn float-right" style={{margin: "0px 10px"}} size="sm" 
                color={this.props.mode==="edit"? "danger": "disabled"} onClick={ (e) => this.handleDownvote() } 
                disabled={!(this.props.mode==="edit")}> <FaThumpbsDown /> DownVote Post</Button>{' '}      
      	</FormGroup>      
      	<Button className="btn float-right" style={{margin: "0px 10px", width: "100px"}} size="sm" color="success" onClick={ (e) => this.handleOK() }><FaEdit /> >OK</Button>
		<Button className="btn float-right" style={{margin: "0px 10px", width: "100px"}} size="sm" color="danger">Delete Post</Button> 
      	</Form>


        <Modal
          overlayClassName='overlay'
          isOpen={this.state.validationErrorMessage!==""}
          onRequestClose={this.requestModalClose}
          contentLabel='Modal'
		  style={customStyles}
          shouldCloseOnOverlayClick={true}
		>
			<div>
				<p>{this.state.validationErrorMessage}</p>
				<button onClick={this.requestModalClose}>Close</button>
			</div>
		</Modal>

      </div>
    )
	}  
}

function mapStateToProps ( {categories, posts, comments, generic} , ownProps) {
  return { 
        posts: posts.data,
    	currentCategory: categories.currentCategory,
    	categories: categories.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect( mapStateToProps, mapDispatchToProps )(EditPost)
