import React, { Component } from 'react'
import CategorySelector from './CategorySelector.js'
import { Button } from 'reactstrap';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import Book from 'react-icons/lib/fa/book';
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class HeaderBar extends Component
{

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }  
  
  static propTypes = {
        newPost : PropTypes.func.isRequired,
    	categoryFilter: PropTypes.string.isRequired,
    	categories: PropTypes.array.isRequired,
  }
  
  handleNewPost(){
    this.props.newPost()
  }


  render(){
    
    console.log("HeaderBar Render")
    console.log(this.props.editMode)
    
   return (
      <div>
       {!(this.props.editMode) ? 
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">
       		<Book /> READABLE</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/posts/create"><NavLink>New Post</NavLink></Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Filter: { this.props.categoryFilter==="" ? " Show All" : this.props.categoryFilter }
                </DropdownToggle>
                <DropdownMenu >
      					{this.props.categories ? this.props.categories.map( (cat) =>
      						<DropdownItem key={cat.name}><Link to={`/${cat.name}`}>{cat.name}</Link></DropdownItem>     ) : [] }
       				<DropdownItem divider />
                  <DropdownItem>
                    <Link to={`/`}>Show All </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        
		: null }
      </div>    
    )
	}
}

function mapStateToProps ( {categories, posts, comments, generic} , ownProps) {
  return { 
	editMode: posts.isEditingPost || posts.isNewPost
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(HeaderBar)
