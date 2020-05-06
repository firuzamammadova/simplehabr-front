import {combineReducers} from 'redux'
import postListReducer from './postListReducer'
import LoginReducer from './authReducer'
import RegisterReducer from './RegisterReducer'
import postShareReducer from './postShareReducer'
import likeReducer from './likeReducer'
import authReducer from './authReducer'
const rootReducer=combineReducers({
    authReducer,
    postListReducer,
    LoginReducer,
    RegisterReducer,
    postShareReducer,
    likeReducer
})

export default rootReducer;