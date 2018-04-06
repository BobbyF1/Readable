import React, { Component } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import TiTick from 'react-icons/lib/ti/tick'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'
import moment from 'moment'
import { deletePost, createPost, saveEditPost, setEditPost, setNewPost } from '../actions/PostActions.js'
import { loadCommentsForPost, createComment } from  '../actions/CommentActions.js'
import { Redirect } from 'react-router-dom'
import CommentsListView from './CommentsListView.js'
import MdAdd from 'react-icons/lib/md/add'
import { setCurrentCategory } from '../actions/CategoryActions.js'
import Loading from 'react-loading'



class EditPost extends Component{

  state = {
    		post: {},
    		returnToRoot: false, 
    		openNewCommentModal: false,
    		newComment: { comment: "", author: "" },
    		startedLoadingComments: false,
    		isCommentsLoaded: false
		}

  constructor(props){
      super(props)      
		this.handleChange = this.handleChange.bind(this)
		this.handleOK = this.handleOK.bind(this)
		this.requestModalClose = this.requestModalClose.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleNewComment = this.handleNewComment.bind(this)     
    	this.handleNewCommentChange = this.handleNewCommentChange.bind(this)
		this.titleCase = this.titleCase.bind(this)
    	this.load = this.load.bind(this)
  }

	componentDidMount(){
      	if(this.props.mode==="edit") this.props.setEditPost(true)
      	this.load(this.props);
    }

	componentWillReceiveProps(newProps){
      	this.load(newProps);
      	if(newProps.commentLoadIdentifier > this.props.commentLoadIdentifier){
      		this.setState( {isCommentsLoaded: true } ) 
    	}      
    }

	load(pr){

      if(pr.isPostsLoaded && pr.isCategoriesLoaded ) {  
        if(pr.mode==="edit" ){
          	if(!(this.state.startedLoadingComments)){
              this.setState( { startedLoadingComments: true }, function(){
              	const postId = pr.match.params.postId
              	const editPost = pr.posts.find( function(p) { return ( p.id ===  postId  ) } )
              	this.setState( { ...this.state, post:  editPost } )
              	this.props.loadCommentsForPost ( postId ) 					
              })
            }
        }
        else{
            const dateNow = Date.now()
            const newId = dateNow.toString()
            pr.setNewPost(true)
            this.setState( { isCommentsLoaded: true, post: { 
                                      id: newId,
                                      timestamp: dateNow,
                                      title: "New Post",
                                      body: "New Post Body",
                                      author: "anonymous",
                                      category: ( pr.currentCategory!=="" ? pr.currentCategory :
                                          pr.categories.length>0 ? pr.categories[0].name : "" ),
                                      voteScore: 0,
                                      commentCount: 0,
                                      deleted: false
                                 } 
                        } )
        }      
      }    
    
    
      
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
        
                            {!(this.props.isCategoriesLoaded && this.props.isPostsLoaded && this.state.isCommentsLoaded) ? 
                      		<div style={{width: "20%", height: "20%", margin: "20% 60% 40% 40%", padding: "10px 10px 0px", textAlign: "center"}} >
	                            <Loading delay={1} type='spinningBubbles' height='40%' width='40%' color='#222' className='loading' /> 
                        	</div>
		: 
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
	</div>}
        </div>
	)}  
}

function mapStateToProps ( {categories, posts, comments, generic} , ownProps) {
  return { 
        posts: posts.data,
    	currentCategory: categories.currentCategory,
    	categories: categories.data,
    	comments: comments.data,
    	isPostsLoaded: posts.isLoaded,
    	isCategoriesLoaded: categories.isLoaded,
    	commentLoadIdentifier: comments.loadIdentifier
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
    setCurrentCategory: (currentCategory) => dispatch(setCurrentCategory(currentCategory)),
	loadCommentsForPost: (postId) => dispatch(loadCommentsForPost(postId))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(EditPost)
