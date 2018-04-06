import React, { Component } from 'react'
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import { setSortOrder } from '../actions/PostActions.js'
import Book from 'react-icons/lib/fa/book';
import PropTypes from 'prop-types'
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
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { UncontrolledDropdown } from 'reactstrap/lib/Uncontrolled';

class HeaderBar extends Component
{

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.setSort = this.setSort.bind(this);
    
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }  

  sortOptions = [ { display: "Vote Score", sortField: "voteScore"},
                       { display: "Timestamp", sortField : "timestamp"} ]

	setSort(event){
      const newSortField = event.target.name;
      var newSortAscending = (newSortField === this.props.sortOrderField) ? (!(this.props.sortAscending)) : false;
      this.props.setSortOrder(((!newSortAscending) ? "-" : "" ) + newSortField);      
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
                  Sort: { this.props.sortOrderDisplayField + " " + (this.props.sortAscending ? "ASC " : "DESC") }
                </DropdownToggle>
                <DropdownMenu >
      					{this.sortOptions && this.sortOptions.map( (so) =>
      						<DropdownItem name={so.sortField} onClick={(s) => this.setSort(s)} key={so.sortField}>{so.display}</DropdownItem>     )  }
                </DropdownMenu>
              </UncontrolledDropdown>



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
		: 
		//for the Edit Post / New Post page
        <Navbar color="primary" dark expand="md">
          <NavbarBrand><Link to="/" style={{color: "white"}}><FaAngleDoubleLeft /> Return</Link></NavbarBrand>
        </Navbar>

}
      </div>    
    )
	}
}

function mapStateToProps ( {categories, posts, comments, generic} , ownProps) {

 const sortOptions = [ { display: "Vote Score", sortField: "voteScore"},
                       { display: "Timestamp", sortField : "timestamp"} ]
  return { 
      editMode: posts.isEditingPost || posts.isNewPost,
      sortOrderDisplayField: sortOptions && 
          sortOptions.find( (so) => so.sortField === (posts.sortOrder.substring(0,1) === "-" ? posts.sortOrder.substring(1): posts.sortOrder)).display ,
	  sortOrderField: sortOptions && 
          sortOptions.find( (so) => so.sortField === (posts.sortOrder.substring(0,1) === "-" ? posts.sortOrder.substring(1): posts.sortOrder)).sortField ,
      sortAscending: !(posts.sortOrder.substring(0,1) === "-")
  }
}

function mapDispatchToProps (dispatch) {
  return {
	setSortOrder: (so) => dispatch(setSortOrder(so))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(HeaderBar)
