import {combineReducers} from 'redux'
import postListReducer from './postListReducer'
import LoginReducer from './AuthReducer'
import RegisterReducer from './RegisterReducer'
import postShareReducer from './postShareReducer'
import likeReducer from './likeReducer'
const rootReducer=combineReducers({
    postListReducer,
    LoginReducer,
    RegisterReducer,
    postShareReducer,
    likeReducer
})

export default rootReducer;