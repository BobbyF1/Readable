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
                          <Route path="/posts/create"  render={(props) => <EditPost {...props} mode={"create"}/> } />
                          <Route exact path="/error" component={Error} />
                          <Route path="/:cat" component={ListViewContainer} />
      					</Switch>
                    </div>
      			)}
      		</div>
    	</BrowserRouter>
	);
  }
}

function mapStateToProps ( {categories, posts, comments, generic} ) {
  return { 
    	isEditingPost: posts.isEditingPost,
  }
}
export default connect(
  mapStateToProps,
  null
)(App)
