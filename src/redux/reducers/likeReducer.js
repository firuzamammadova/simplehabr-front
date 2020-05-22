import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function like(state = initialState.likes, action) {

  switch (action.type) {
    case actionTypes.GET_SPEC_USER_LIKES:
      return action.payload;
    default:
      return state;
  }
}
