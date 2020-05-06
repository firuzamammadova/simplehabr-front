import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState.user, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return action.payload;

    case actionTypes.LOGIN_SUCCESS:
      return action.payload;

    case actionTypes.LOGIN_FAILURE:
      return action.payload;

    case actionTypes.LOGOUT:
      return "false";

    default:
      return state;
  }
}
