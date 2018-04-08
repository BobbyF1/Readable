import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Error extends Component{
	render(){
		return(
			<div>
				<Jumbotron>
					<h1 className="display-3">Ah bollocks!</h1>
					<p className="lead">Something's gone wrong.</p>
					<hr className="my-2" />
					<p>It's probably my fault. I'll try harder next time...</p>
					<p className="lead"><Link to="/"><Button color="primary">Main</Button></Link></p>
      			</Jumbotron>
    		</div>
    	)
  	}
}
 
export default Error
           