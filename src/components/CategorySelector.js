import React, { Component } from 'react'
import {
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';


class CategorySelector extends Component
{
  render(){
    
    return (
      <Navbar color="black" light expand="md">
      	<Nav className="ml-left" navbar>
      		<UncontrolledDropdown nav inNavbar>
      			<DropdownToggle nav caret>
      				Categories Filter: {this.props.categoryFilter===""  ? "ALL Posts" : this.props.categoryFilter}
      			</DropdownToggle>
      			<DropdownMenu >
      				<DropdownItem>
      					<Link to="/">ALL Categories</Link>
      				</DropdownItem>
      				<DropdownItem divider />
      					{this.props.categories ? this.props.categories.map( (cat) =>
      						<DropdownItem key={cat.name}><Link to={`/${cat.name}`}>{cat.name}</Link></DropdownItem>
						) : [] }
				</DropdownMenu>
			</UncontrolledDropdown>
		</Nav>
	</Navbar>      
	)}
}

export default CategorySelector

