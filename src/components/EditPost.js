import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import FaThumpbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumpbsDown from 'react-icons/lib/fa/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { createPost } from '../actions/PostActions.js'

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
      this.handleUpvote = this.handleUpvote.bind(this)
      this.handleDownvote = this.handleDownvote.bind(this)
      
    }
  
	componentWillMount(){
      Modal.setAppElement('body');
    }

	handleUpvote(){
      console.log("up current state!")
      console.log(this.state)
      this.setState({ post: {...this.state.post, voteScore: this.state.post.voteScore + 1 } } );
    }

	handleDownvote(){
      this.setState({ post: {...this.state.post, voteScore: this.state.post.voteScore - 1 } } );
    }

  componentDidMount(){    
    if(this.props.mode==="edit"){
    	const postId = this.props.match.params.postId
     	this.setState( { post:  this.props.posts.find( function(p) { return ( p.id ===  postId  ) } ) } )
	}
	else{
      	const dateNow = Date.now()
      	const newId = dateNow.toString()
    	this.setState( { post: { 
                                  id: newId,
                                  timestamp: dateNow,
                                  title: "New Post",
                                  body: "New Post Body",
                                  author: "Author",
                                  category: ( this.props.currentCategory!=="" ? this.props.currentCategory :
                                      this.props.categories.length>0 ? this.props.categories[0].name : "" ),
                                  voteScore: 0,
                                  commentCount: 0,
                                  deleted: false
                             } 
					} )
	}
  }

	requestModalClose(){
        this.setState( { validationErrorMessage: ""} )      
    }

	handleOK(){
      if(this.state.post.title === "" || this.state.post.body === "" || this.state.post.category === "" || this.state.post.author === ""){
        this.setState( { validationErrorMessage: "A post must have a Category, Title, Body and Author."} )
      }
      else
      {
      	this.props.createPost(this.state.post)
    	}
    }

  handleChange(e) {
	var newState = Object.assign({}, this.state)	//copy of the current state
	newState.post[e.target.name] = e.target.value	//set the newly edited value
    this.setState( newState );
  }

	render(){
      return(
      <div className="border" style={{width: "80%", margin: "50px 50px 20px", padding: "20px 20px 50px"}} >
        <Link to="/" className='close-create-contact'>Close</Link>
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
                  <Input disabled type="text" name="CurrentScore" id="CurrentScore" value={ this.state.post.voteScore } />      			
              </Col>
             <Button className="btn float-right" style={{"marginLeft": "10px"}} size="sm" 
	             color={this.props.mode==="edit"? "success": "disabled"} 							
    	         onClick={this.handleUpvote} disabled={!(this.props.mode==="edit")} ><FaThumpbsUp /> UpVote Post</Button>{' '}
      		<Button className="btn float-right" style={{margin: "0px 10px"}} size="sm" 
                color={this.props.mode==="edit"? "danger": "disabled"} onClick={ (e) => this.handleDownvote() } 
                disabled={!(this.props.mode==="edit")}> <FaThumpbsDown /> DownVote Post</Button>{' '}      
      	</FormGroup>      
          <FormGroup row>
              <Label for="timestamp" sm={2} style={{textAlign: "left"}}>Created</Label>
              <Col sm={5}>
                  <Input disabled type="text" name="timestamp" id="timestamp" placeholder={moment(this.state.post.timestamp).format('MMMM Do YYYY, h:mm:ss a')} />
              </Col>
          </FormGroup>
      	<Button className="btn float-right" style={{margin: "0px 10px", width: "100px"}} size="sm" color="success" onClick={ (e) => this.handleOK() }><FaEdit /> {(this.props.mode==="edit" ? "Save" : "Create" )}</Button>
		{this.props.mode==="edit" ?
         	<Button className="btn float-right" style={{margin: "0px 10px", width: "100px"}} size="sm" color="danger"><FaTimesCircle />Delete Post</Button> 
      	: null }
		</Form>


        <Modal
          overlayClassName='overlay'
          isOpen={(this.state.validationErrorMessage!=="")}
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
	createPost: (post) => dispatch(createPost(post))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(EditPost)
