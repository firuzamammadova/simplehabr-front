import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function postListReducer(state = initialState.posts, action) {

  switch (action.type) {
    case actionTypes.GET_SPEC_USER_POSTS_SUCCESS:
      return action.payload;
    case actionTypes.GET_POSTS_SUCCESS:
      return action.payload;
    case actionTypes.GET_USER_POSTS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
