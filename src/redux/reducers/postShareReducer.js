import * as actionTypes from '../actions/actionTypes'


export default function registration(state = {}, action) {
  switch (action.type) {
    case actionTypes.SHARE_POST_SUCCESS:
      return {}
    default:
      return state
  }
}