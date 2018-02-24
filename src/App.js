import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { setCategories } from './actions/CategoryActions.js'
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data'
    }
  }

  componentDidMount() {

    const { setInitialCategories } = this.props

    const url = `${process.env.REACT_APP_BACKEND}/categories`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then((data) => {
      	console.log("data is:")
      	console.log(data);
      	console.log(JSON.parse(data));
      	console.log("Calling setInitialCategories")
        setInitialCategories(JSON.parse(data));
      	console.log("Back from  setInitialCategories")
      });
  }

  render() {
    const { categories } = this.props
    
    console.log("render---------------------")
    console.log(this.props)
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Talking to the backend yields these categories: <br/>
          *{ categories.map( (c) => (c.name ) ) }*
        </p>
      </div>
    );
  }
}

function mapStateToProps ( state ) {
  	const { categories } = state
  return { categories: categories }
}

function mapDispatchToProps (dispatch) {
  return {
    setInitialCategories: (data) => dispatch(setCategories(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
