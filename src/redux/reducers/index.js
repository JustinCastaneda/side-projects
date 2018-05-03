import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginState from './login'

export default combineReducers({
  router: routerReducer,
  loginState
});
