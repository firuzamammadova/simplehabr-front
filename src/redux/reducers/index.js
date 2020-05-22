import {combineReducers} from 'redux'
import postListReducer from './postListReducer'
import LoginReducer from './authReducer'
import RegisterReducer from './RegisterReducer'
import postReducer from './postReducer'
import likeReducer from './likeReducer'
import authReducer from './authReducer'
import commentReducer from './commentReducer'

const rootReducer=combineReducers({
    authReducer,
    postListReducer,
    LoginReducer,
    RegisterReducer,
    postReducer,
    likeReducer,
    commentReducer
})

export default rootReducer;