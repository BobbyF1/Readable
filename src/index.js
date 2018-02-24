import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import combinedReducers from './reducers/combinedReducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}


const store = createStore(
  combinedReducers,	//categories
  composeEnhancers(applyMiddleware(logger))
)

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
