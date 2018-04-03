import React, { Component } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import TiTick from 'react-icons/lib/ti/tick'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'
import moment from 'moment'
import { deletePost, createPost, saveEditPost, setEditPost, setNewPost } from '../actions/PostActions.js'
import { createComment } from  '../actions/CommentActions.js'
import { Redirect } from 'react-router-dom'
import CommentsListView from './CommentsListView.js'
import MdAdd from 'react-icons/lib/md/add'
import { loadLogicStart, loadLogicProgress } from './LoadLogic.js'
import { initialDataLoad, setNavigationError } from '../actions/GenericActions.js'
import { setPostCommentCounts } from '../actions/PostActions.js'
import { finishedLoadingData } from '../actions/GenericActions.js'
import { setCurrentCategory } from '../actions/CategoryActions.js'


class EditPost extends Component{

  state = ({
    		post: {},
    		returnToRoot: false, 
    		openNewCommentModal: false,
    		newComment: { comment: "", author: "" } 
		})

  constructor(props){
      super(props)      
		this.handleChange = this.handleChange.bind(this)
		this.handleOK = this.handleOK.bind(this)
		this.requestModalClose = this.requestModalClose.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleNewComment = this.handleNewComment.bind(this)     
    	this.handleNewCommentChange = this.handleNewCommentChange.bind(this)
		this.titleCase = this.titleCase.bind(this)
  }

	componentDidMount(){       
      	console.log("componentDidMount")
      	console.log(this.props)
      loadLogicStart(this.props)
  }

  	validateCategory(cat){
      	//detect if they've navigated here by typing /madeupcategory in the URL

      	if ( this.props.categories.length>0 && cat !== "" )
        {
          if ( this.props.categories.filter( (c) => c.name===cat).length===0)
            {
                this.props.setNavigationError()
                this.props.history.push('/error')	//should do this from the Action....
            }
        }      
    } 

	componentWillReceiveProps(nextProps){
      	console.log("------------------------------------------------------- componentWillReceiveProps")
 		loadLogicProgress(this.props, nextProps, this.validateCategory);
      
      if(this.props.isLoaded){
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
                                    author: "anonymous",
                                    category: ( this.props.currentCategory!=="" ? this.props.currentCategory :
                                        this.props.categories.length>0 ? this.props.categories[0].name : "" ),
                                    voteScore: 0,
                                    commentCount: 0,
                                    deleted: false
                               } 
                      } )
      }      

	if(nextProps.mode==="edit"){     
          const editPost = nextProps.posts.find( function(p) { return ( p.id ===  nextProps.match.params.postId  ) } )
          this.setState( { post:  editPost  } )      
        }
    }
}

 	titleCase(str) {
    return str.toLowerCase().split(' ').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ');
  }

	requestModalClose(){
        this.setState( { openNewCommentModal: false} )      
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

	handleNewComment(){
      	//display the modal "new comment" window
      	this.setState( { openNewCommentModal: true, newComment: { body: "New Comment", author: "anonymous" }  } )
    }

	handleEditCommentCancel(){
      	//close the modal "new comment" window
      	this.setState( { openNewCommentModal: false } )
      
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

	handleNewCommentChange(e){
		var newState = Object.assign({}, this.state)	//copy of the current state
		newState.newComment[e.target.name] = e.target.value	//set the newly edited value
		this.setState( newState );
    }
  
  	handleEditCommentOK(){
      	//create a new comment and then close the modal
      	
      	const newComment = {
          	parentId: this.props.match.params.postId,
          	body: this.state.newComment.body,
          	author: this.state.newComment.author
        }
      
      	this.props.createComment(newComment)
      	this.setState( { openNewCommentModal: false } )      
    }


	render(){
      
      	if (this.state.returnToRoot) {
          if (window.location.pathname !== "/") {
            return <Redirect to = { "/" } push={true} /> 		
          }
      } 
          
      return(
        <div>
        
          <Modal
            open={this.state.openNewCommentModal}
            onClose={this.requestModalClose}
			closeOnOverlayClick={false}
			little
          	styles={ {modal: {height: "30%", width: "60%"} }	}
          >
          	<div className="border" style={{width: "95%", margin: "10px 0px 0px 0px", padding: "10px 10px 0px"}} >
        	<h1>New Comment</h1>
            <FormGroup row>
                <Label for="Comment" sm={2} style={{textAlign: "left"}}>Comment </Label>
                <Col sm={10}>
                    <Input type="textarea" name="body" id="body" value={this.state.newComment.body} onChange={this.handleNewCommentChange}  />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="Author" sm={2} style={{textAlign: "left"}}>Author</Label>
                <Col sm={10}>
                    <Input type="text" name="author" id="author" value={this.state.newComment.author } onChange={this.handleNewCommentChange} />
                </Col>
            </FormGroup>
							<Col sm={12}>
                                <Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="primary" onClick={(e) => this.handleEditCommentOK()}><TiTick/> Done </Button> 
                                <Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
      								color="secondary" onClick={(e) => this.handleEditCommentCancel()}><FaTimesCircle/> Cancel </Button> 
							</Col>
          	</div>
          </Modal>
        
        
        <div className="border" style={{width: "60%", margin: "10px 20px 2% 20%", padding: "10px 10px 0px"}} >
          <h1>{this.titleCase(this.props.mode.toUpperCase() + ' Post')}</h1>
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
                <Label for="CurrentScore" sm={2} style={{textAlign: "left"}}>Vote Score</Label>
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

        </div>
		{ this.props.mode==="edit" ? 
         <div>
          <Container style={{width: "60%", margin: "0px 0px 0px 20%", padding: "10px 10px 10px", textAlign: "left"}}>
          <Row>
              <Col xs="8">
                  <h3>Comments on this Post:</h3>
              </Col>
              <Col xs="4">
                  <Button className="btn float-right" style={{margin: "10px", width: "100px"}} size="sm" 
                                      color="success" onClick={ (e) => this.handleNewComment() }><MdAdd/> New </Button> 
              </Col>
          </Row>
          </Container>
          <CommentsListView comments={this.props.comments.filter( (c) => c.parentId===this.state.post.id && !c.deleted) }/>
		</div> : null } 
	</div>
	)}  
}

function mapStateToProps ( {categories, posts, comments, generic} , ownProps) {
  return { 
        posts: posts.data,
    	currentCategory: categories.currentCategory,
    	categories: categories.data,
    	comments: comments.data,
    	isLoaded: generic.loaded,
    	isPostsLoaded: posts.isLoaded,
    	isAllCommentCountsSet: posts.setAllCommentCounts    	
  }
}

function mapDispatchToProps (dispatch) {
  return {
	createPost: (post) => dispatch(createPost(post)),
    saveEditPost: (post) => dispatch(saveEditPost(post)),
    setEditPost: (editPost) => dispatch(setEditPost(editPost)),
    setNewPost: (newPost) => dispatch(setNewPost(newPost)),
    deletePost: (deadPost) => dispatch(deletePost(deadPost)), 
    createComment: (newComment) => dispatch(createComment(newComment)),
    triggerInitialDataLoad: () => dispatch( initialDataLoad()),
   	setPostCommentCounts: (posts) => dispatch(setPostCommentCounts(posts)),
    finishedLoadingData: () => dispatch(finishedLoadingData()),
    setCurrentCategory: (currentCategory) => dispatch(setCurrentCategory(currentCategory)),

  }
}

export default connect( mapStateToProps, mapDispatchToProps )(EditPost)
