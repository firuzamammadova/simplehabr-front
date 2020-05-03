import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState';

var user = initialState.user;
var currState = user ? { loggedIn: true, user } : {};


export default function authReducer(state = currState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        loggingIn: true,
        user: action.user,
      };

    case actionTypes.LOGIN_FAILURE:
      return {};

    case actionTypes.LOGOUT:
      return {
       loggingIn:false
      };

    default:
      return state;
  }
}