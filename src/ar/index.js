import {combineReducers} from 'redux'
import application from './application.ar'
import loading from './loading.ar'

export default combineReducers({
	application,
	loading
});