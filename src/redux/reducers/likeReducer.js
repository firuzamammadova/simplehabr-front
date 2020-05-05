import * as actionTypes from '../actions/actionTypes'


export default function like(state = {}, action) {
  switch (action.type) {
    case actionTypes.LIKE:
      return {};
    default:
      return state
  }
}