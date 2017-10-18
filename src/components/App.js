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

export const store = createStore(
	reducers,
	undefined,
	compose(
		applyMiddleware(thunk)
		, autoRehydrate()
	)
);

const storeEmitter = new EventEmitter();
const STORE_READY = "STORE_READY";

persistStore(store, {
	blacklist: []
}, ()=> {
	storeEmitter.emit(STORE_READY);
});

export default class App extends React.Component {
	constructor(props) {
		super(props);
		storeEmitter.addListener(STORE_READY, ()=> {
			this.setState({
				storeIsReady: true
			});
		})
		this.state = {
			storeIsReady: false
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
				<ApplicationSetting>
					<Routes/>
				</ApplicationSetting>
			</Provider>
		);
	}
}