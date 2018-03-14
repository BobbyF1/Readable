import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ListViewContainer from './components/ListViewContainer.js'
import EditPost from './components/EditPost.js'
import Error from './components/Error.js'

class App extends Component {

  render() {
    
    return (
  		<BrowserRouter>
              <div>
      			{this.props.isEditingPost && (
                 	<h1>Edit</h1>
                 )}

      			{!this.props.isEditingPost && (    
                    <div className="App">
      					<Switch>
                          <Route exact path="/" component={ListViewContainer} />
                          <Route exact path="/error" component={Error} />
                          <Route exact path="/posts/create"  render={(props) => <EditPost {...props} mode={"create"}/> } />
                          <Route path="/:cat/:postId" render={(props) => <EditPost {...props} mode={"edit"}/> }  />
                          <Route path="/:cat" component={ListViewContainer} />
      					</Switch>
                    </div>
      			)}
      		</div>
    	</BrowserRouter>
	);
  }
}

function mapStateToProps ( {categories, posts, comments, generic}, ownProps) {
  return { 
    	isEditingPost: posts.isEditingPost,
  }
}
export default connect(
  mapStateToProps,
  null
)(App)
