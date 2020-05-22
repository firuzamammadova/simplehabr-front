import * as actionTypes from '../actions/actionTypes'
import initialState from "./initialState";


export default function postReducer(state = initialState.post, action) {

  switch (action.type) {
    case actionTypes.GET_POST_BY_ID:

      return action.payload
    default:
      return state
  }
}