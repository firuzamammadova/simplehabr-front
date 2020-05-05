import {combineReducers} from 'redux'
import postListReducer from './postListReducer'
import LoginReducer from './AuthReducer'
import RegisterReducer from './RegisterReducer'
import postShareReducer from './postShareReducer'
const rootReducer=combineReducers({
    postListReducer,
    LoginReducer,
    RegisterReducer,
    postShareReducer
})

export default rootReducer;