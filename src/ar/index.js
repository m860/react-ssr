import {combineReducers} from 'redux'
import application from './application.ar'
import loading from './loading.ar'
import toast from './toast.ar'

export default combineReducers({
	application,
	loading,
	toast
});