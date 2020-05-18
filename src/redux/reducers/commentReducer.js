import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState';

export default function commentReducer(state=initialState.comments,action){
    switch (action.type) {
        case actionTypes.GET_USER_COMMENTS:
            return action.payload
        default:
            return state;
    }
}
