import {combineReducers} from 'redux'
import postListReducer from './postListReducer'
import LoginReducer from './AuthReducer'
const rootReducer=combineReducers({
    postListReducer,
    LoginReducer
})

export default rootReducer;