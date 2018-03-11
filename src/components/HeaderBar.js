import React, { Component } from 'react'
import CategorySelector from './CategorySelector.js'
import { Button } from 'reactstrap';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom';

class HeaderBar extends Component
{
  static propTypes = {
        newPost : PropTypes.func.isRequired,
    	categoryFilter: PropTypes.string.isRequired,
    	categories: PropTypes.array.isRequired,
  }
  
  handleNewPost(){
    console.log("  handleNewPost()")
    this.props.newPost()
  }


  render(){
    
  const NewPostButton = () => (
    <Route render={({ history}) => (
      <Button
      	className="btn btn-secondary float-left"
        style={{margin: "12px 10px"}} size="sm" color="success" 
        type='button'
        onClick={() => { history.push('/posts/create') }}
      ><FaPlusSquare /> New Post  </Button>
    )} />
  )
    return (
	<div style={{backgroundColor: "beige"}}>   
        <NewPostButton />
		<CategorySelector categoryFilter={this.props.categoryFilter} categories={this.props.categories } />
        <hr style={{"border": "solid"}}/>        		
	</div>
	)}
}

export default HeaderBar
