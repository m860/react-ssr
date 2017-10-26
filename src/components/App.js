import "normalize-css/normalize.css";
import "font-awesome/css/font-awesome.css";
import '../assets/sass/App.sass'
import React from 'react'
import reducers from '../ar/index'
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {persistStore, autoRehydrate} from "redux-persist";
import Routes from './Routes'
import {EventEmitter} from 'fbemitter'
import ApplicationSetting from './public/ApplicationSetting'
import Toast from './public/Toast'

export const store = createStore(
	reducers, {
		application: {
			setting: __SERVER__ ? require('../configuration/application-setting') : null
		}
	},
	compose(
		applyMiddleware(thunk)
		, autoRehydrate()
	)
);

const storeEmitter = new EventEmitter();
const STORE_READY = "STORE_READY";

persistStore(store, {
	blacklist: [
		'toast'
	]
}, ()=> {
	storeEmitter.emit(STORE_READY);
	console.log(store.getState())
});

export default class App extends React.Component {
	constructor(props) {
		super(props);
		storeEmitter.addListener(STORE_READY, ()=> {
			this.setState({
				storeIsReady: true
			});
		})
		//noinspection JSUnresolvedVariable
		this.state = {
			storeIsReady: __SERVER__ ? true : false
		};
	}

	render() {
		if (!this.state.storeIsReady) {
			//TODO show loading for restore store
			console.info('restoring store data ...');
			return null;
		}
		console.info('restore store data is completed')
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