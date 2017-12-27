import "normalize-css/normalize.css";
import "font-awesome/css/font-awesome.css";
import '../assets/sass/App.sass'
import React from 'react'
import reducers from '../ar/index'
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
// import {persistStore, autoRehydrate} from "redux-persist";
// import {persistStore, persistCombineReducers} from 'redux-persist'
// import storage from 'redux-persist/es/storage'
import Routes from './Routes'
import {EventEmitter} from 'fbemitter'
import ApplicationSetting from './common/ApplicationSetting'
import Toast from './common/Toast'
import logger from '../libs/logger'

// const reducer = persistCombineReducers({
// 	key: 'root',
// 	storage
// }, reducers);

export const store = createStore(
	reducers,
	{
		application: {
			setting: __SERVER__ ? require('../configuration/application-setting') : null
		}
	},
	compose(
		applyMiddleware(thunk)
		// , autoRehydrate()
	)
);

// const storeEmitter = new EventEmitter();
// const STORE_READY = "STORE_READY";
//
// persistStore(store, undefined, () => {
// 	storeEmitter.emit(STORE_READY);
// 	logger.info(store.getState())
// });

export default class App extends React.Component {
	constructor(props) {
		super(props);
		// storeEmitter.addListener(STORE_READY, () => {
		// 	this.setState({
		// 		storeIsReady: true
		// 	});
		// })
		//noinspection JSUnresolvedVariable
		this.state = {
			// storeIsReady: __SERVER__ ? true : false
			storeIsReady: true
		};
	}

	render() {
		if (!this.state.storeIsReady) {
			//TODO show loading for restore store
			logger.info('restoring store data ...');
			return null;
		}
		logger.info('restore store data is completed')
		return (
			<Provider store={store}>
				<span>
					<ApplicationSetting>
						<Routes/>
					</ApplicationSetting>
					<Toast/>
				</span>
			</Provider>
		);
	}
}