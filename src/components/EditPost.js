import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import FaThumpbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumpbsDown from 'react-icons/lib/fa/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import { connect } from 'react-redux'

//this.props.mode

class EditPost extends Component{

  state={
    post: {}
  }
	constructor(props){
      super(props)
      
      this.handleChange = this.handleChange.bind(this)
      
    }
  
//   console.log(this.props.match.params.cat)
//    console.log(this.props.match.params.postId)
  
  componentDidMount(){
    
    console.log("componentDidMount")
    
    if(this.props.mode==="edit"){
    	const postId = this.props.match.params.postId
     	this.setState( { post:  this.props.posts.find( function(p) { return ( p.id ===  postId  ) } ) } )
	}
	else
		this.setState( { id: "123456",
                              	timestamp: Date.now(),
                              	title: "New Post",
                              	body: "New Post Body",
                              	author: "Author",
                              	category: "react",
                              	voteScore: 0,
                              	deleted: false
                             } )
	
  }

  handleChange(e) {
    const changed = { [e.target.name]: e.target.value }  
	console.log(this.state)
    this.setState( changed );
	console.log(this.state)
  }
  render(){
    return(
      <div className="border" style={{width: "80%", margin: "50px 50px 20px", padding: "20px 20px 50px"}} >
      	<h1>EDIT POST</h1>
        <Form>
          <FormGroup row>
              <Label for="Title" sm={2} style={{textAlign: "left"}}>Title</Label>
              <Col sm={10}>
                  <Input type="text" name="title" id="title" value={this.state.post.title} onChange={this.handleChange} />
              </Col>
          </FormGroup>
          <FormGroup row>
              <Label for="Body" sm={2} style={{textAlign: "left"}}>Body </Label>
              <Col sm={10}>
                  <Input type="textarea" name="body" id="body" value={this.state.post.title} onChange={this.handleChange} />
              </Col>
          </FormGroup>
          <FormGroup row>
              <Label for="Author" sm={2} style={{textAlign: "left"}}>Author</Label>
              <Col sm={10}>
                  <Input type="text" name="author" id="author" 
      						placeholder={this.props.mode==="edit" ? this.state.post.author : "Post author" } />
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
      </div>
    )
	}  
}

function mapStateToProps ( {categories, posts, comments, generic} , ownProps) {
  return { 
        posts: posts.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect( mapStateToProps, mapDispatchToProps )(EditPost)
