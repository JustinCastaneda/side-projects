import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './resources/style.css';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from "react-router-redux";
import { FourSight } from './utils/bundle'

const history = createHistory({basename: '/app'})
const middleware = [
  createLogger(),
  routerMiddleware(history),
  thunk
];

const enhancers = compose(
  applyMiddleware(...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
  rootReducer,
  {},
  enhancers
);

if (process.env.NODE_ENV === 'production') {
  FourSight.init(process.env.REACT_APP_SCICAST_API_ROUTE || '')
}

ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root'));
