import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import TiTick from 'react-icons/lib/ti/tick'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import moment from 'moment'
import { deletePost, createPost, saveEditPost, setEditPost, setNewPost } from '../actions/PostActions.js'
import { Redirect } from 'react-router-dom'
import CommentsListView from './CommentsListView.js'

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
    validationErrorMessage:"",
    returnToRoot: false
  }
	constructor(props){
      super(props)
      
      this.handleChange = this.handleChange.bind(this)
      this.handleOK = this.handleOK.bind(this)
      this.requestModalClose = this.requestModalClose.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      
    }
  
	componentWillMount(){
      Modal.setAppElement('body');
    }

	componentWillUnmount() {
      console.log("Goodbye from EDITPOST")
    }

  componentDidMount(){    
    
    if(this.props.mode==="edit"){
    	const postId = this.props.match.params.postId
        const editPost = this.props.posts.find( function(p) { return ( p.id ===  postId  ) } )

        this.props.setEditPost(true)
     	this.setState( { post:  editPost  } )

	}
	else{
      	const dateNow = Date.now()
      	const newId = dateNow.toString()
      	this.props.setNewPost(true)
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

	componentWillReceiveProps(nextProps){
      	if(nextProps.mode==="edit"){     
          const editPost = nextProps.posts.find( function(p) { return ( p.id ===  nextProps.match.params.postId  ) } )
          this.setState( { post:  editPost  } )      
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
		if(this.props.mode==="edit"){
      		this.props.saveEditPost(this.state.post)
      		this.setState( { returnToRoot: true} );
	    }
      	else{
      			this.props.createPost(this.state.post)
          		this.setState( { returnToRoot: true} );
	        }
    	}
    }

	handleDelete(){
      	this.props.deletePost(this.state.post)
      	this.setState( { returnToRoot: true} );
    }

    handleChange(e) {
		var newState = Object.assign({}, this.state)	//copy of the current state
		newState.post[e.target.name] = e.target.value	//set the newly edited value
		this.setState( newState );


	}

	render(){
      
      	if (this.state.returnToRoot) {
          if (window.location.pathname !== "/") {
            return <Redirect to = { "/" } push={true} /> 		
          }
      }      
      return(
        <div>
        <div className="border" style={{width: "60%", margin: "10px 20px 2% 20%", padding: "10px 10px 0px"}} >
          <h1>{this.props.mode.toUpperCase()} POST</h1>
          <Form>
            <FormGroup row>
                <Label for="Title" sm={2} style={{textAlign: "left"}}>Category </Label>
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

          </FormGroup>      
            <FormGroup row>
                <Label for="timestamp" sm={2} style={{textAlign: "left"}}>Created</Label>
                <Col sm={5}>
                    <Input disabled type="text" name="timestamp" id="timestamp" placeholder={moment(this.state.post.timestamp).format('MMMM Do YYYY, h:mm:ss a')} />
                </Col>
            </FormGroup>
            <FormGroup row>
              {this.props.mode==="edit" ?
                <Col sm={12}>
                    <Button className="btn float-right" style={{margin: "0px 10px", width: "100px"}} size="sm" color="primary" onClick={ (e) => this.handleOK() }><TiTick/> Save </Button> 
                    <Button className="btn float-right" style={{margin: "0px 10px", width: "100px"}} size="sm" color="secondary" onClick={ (e) => this.handleDelete() }><FaTimesCircle/> Delete </Button> 
                </Col>
              : null }
              {this.props.mode==="create" ?
                <Col sm={12}>
                  <Button className="btn float-right" style={{margin: "0px 10px", width: "100px"}} size="sm" color="primary" onClick={ (e) => this.handleOK() }><TiTick/> Create </Button> 
                </Col>
              : null }
            </FormGroup>
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
          	<h3 style={{width: "60%", margin: "10px 20px 2% 20%", padding: "10px 10px 10px", textAlign: "left"}}>Comments on this post:</h3>
          <CommentsListView comments={this.props.comments.filter( (c) => c.parentId===this.state.post.id && !c.deleted) }/>
	</div>
)
	}  
}

function mapStateToProps ( {categories, posts, comments, generic} , ownProps) {
  return { 
        posts: posts.data,
    	currentCategory: categories.currentCategory,
    	categories: categories.data,
    	comments: comments.data
  }
}

function mapDispatchToProps (dispatch) {
  return {
	createPost: (post) => dispatch(createPost(post)),
    saveEditPost: (post) => dispatch(saveEditPost(post)),
    setEditPost: (editPost) => dispatch(setEditPost(editPost)),
    setNewPost: (newPost) => dispatch(setNewPost(newPost)),
    deletePost: (deadPost) => dispatch(deletePost(deadPost))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(EditPost)
