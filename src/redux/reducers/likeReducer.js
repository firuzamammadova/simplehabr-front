import * as actionTypes from "../actions/actionTypes";

export default function like(state = {}, action) {
  switch (action.type) {
    case actionTypes.LIKE:
      return {};
    case actionTypes.DISLIKE:
      return {};
    default:
      return state;
  }
}
