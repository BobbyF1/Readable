import React from 'react'
import {  Row, Col } from 'reactstrap';

const CommentsNoComments = () => {
	return(
			<div className="border" style={{width: "60%", margin: "10px 20px 2% 20%", padding: "20px 20px 10px"}} >
				<Row>
					<Col xs="9">
						<p style={{textAlign: 'left'}}><strong>No comments! Why not be the first to comment?</strong></p>
					</Col>
					<Col xs="3">
					</Col>
				</Row>
			</div>
      )
}

export default CommentsNoComments
