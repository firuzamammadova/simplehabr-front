import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState';


export default function LoginReducer(state = initialState.data, action) {
  //let token = JSON.parse(localStorage.getItem('token'));
 //state = token ? { loggedIn: true, token } : {};
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        token: action.token
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        token: action.token
      };
    case actionTypes.LOGIN_FAILURE:
      return {};
    case actionTypes.LOGOUT:
      return {};
    default:
      return state
  }
}