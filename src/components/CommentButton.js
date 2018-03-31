import { Button, UncontrolledTooltip} from 'reactstrap';
import React, { Component } from 'react'

class CommentButton extends Component
{
  	render(){     
      return (
		<div>
			<Button className="btn btn-primary float-right" 
        			id={('Tooltip-'+this.props.textLabel+'-' + this.props.id).replace(/\s/g,'')} 
  					style={{margin: "0px 1px"}} 
					size ="sm" 
					onClick={this.props.buttonClick}
					color={this.props.color}>{this.props.children}</Button>
			<UncontrolledTooltip placement="right" target={('Tooltip-'+this.props.textLabel+'-' + this.props.id).replace(/\s/g,'')}>{this.props.textLabel}</UncontrolledTooltip>
		</div>
        )
    } 
}

export default CommentButton
