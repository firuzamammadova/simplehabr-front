import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function LoginReducer(
  state = initialState.token,
  action
) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
