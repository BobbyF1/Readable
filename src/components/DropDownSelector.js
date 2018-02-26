import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DropDownSelector extends Component {

  static propTypes = {
        displayValues: PropTypes.array.isRequired,
        displayAllItem: PropTypes.bool.isRequired,
    	selectCategory: PropTypes.func.isRequired
    }

	render(){

      const { displayValues, displayAllItem, selectCategory } = this.props

      return (
        <div>
			<select onChange={ (event) => selectCategory(event.target.value)}>
         	{ displayAllItem ? <option value="All">All</option> : {} }
           	{ displayValues.map( (v) => <option key={v.name} value={v.name}>{v.name}</option> ) }
          </select>   
         </div>      
        )      
    }  
}

export default DropDownSelector
