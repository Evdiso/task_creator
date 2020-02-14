import { combineReducers } from 'redux'
import taskListReducer from './taskList'
import authReducer from './auth'

export default combineReducers({
  taskListReducer,
  authReducer
})
