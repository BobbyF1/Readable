import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ListViewContainer from './components/ListViewContainer.js'
import EditPost from './components/EditPost.js'
import Error from './components/Error.js'
import HeaderBar from './components/HeaderBar.js'
import {initialDataLoad} from './actions/GenericActions.js'

class App extends Component {

		componentDidMount() {
				if (!(this.props.isPostsLoaded)) {
						this
								.props
								.triggerInitialDataLoad();
				}
		}

		render() {
				return (
						<BrowserRouter>
								<div>
										<div>
												<HeaderBar
														categoryFilter={this.props.selectedCategory}
														categories={this.props.categories
														? this.props.categories
														: {}}
														newPost={() => this.newPost()}/>
										</div>
										<div className="App">
												<Switch>
														<Route exact path="/" component={ListViewContainer}/>
														<Route exact path="/error" component={Error}/>
														<Route
																exact
																path="/posts/create"
																render={(props) => <EditPost {...props} mode={"create"}/>}/>
														<Route
																path="/:cat/:postId"
																render={(props) => <EditPost {...props} mode={"edit"}/>}/>
														<Route path="/:cat" component={ListViewContainer}/>
												</Switch>
										</div>
								</div>
						</BrowserRouter>
				);
		}
}

function mapStateToProps({
		categories,
		posts,
		comments,
		generic
}, ownProps) {
		return {isEditingPost: posts.isEditingPost, selectedCategory: categories.currentCategory, categories: categories.data, isPostsLoaded: posts.isLoaded, isCategoriesLoaded: categories.isLoaded}
}

function mapDispatchToProps(dispatch) {
		return {
				triggerInitialDataLoad: () => dispatch(initialDataLoad())
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
