import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Router, BrowserRouter, Route, Link } from 'react-router-dom';
import ListViewContainer from './components/ListViewContainer.js'

class App extends Component {

  render() {

    const { categories, posts  } = this.props

    return (
  		<BrowserRouter>
              <div>
                    <div className="App">
                        <Route path="/:cat" component={ListViewContainer} />
      					<Route path="/" Redirect to="/All" />
                    </div>
      		</div>
    	</BrowserRouter>
	);
  }
}

export default connect(
  null,
  null
)(App)
