import React, { Component } from 'react'

class EditPost extends Component{
  
  render(){ 

    console.log("EditPost")
  console.log(this.props)
  
    return(
      <h1>{this.props.mode} Post</h1>
      )
	}  
}

export default EditPost
