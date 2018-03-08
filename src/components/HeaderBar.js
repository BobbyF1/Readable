import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Router, BrowserRouter, Route, Link } from 'react-router-dom';
import CategorySelector from './CategorySelector.js'

class HeaderBar extends Component
{
  render(){
    return (
      <CategorySelector categoryFilter={this.props.categoryFilter} categories={this.props.categories } />
	)}
}

export default HeaderBar
