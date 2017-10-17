import "normalize-css/normalize.css";
import "font-awesome/css/font-awesome.css";
import '../assets/sass/App.sass'

import React from 'react'
import {
	Route,
	Link
} from 'react-router-dom'
import Async from 'react-component-async-module'
import reducers from '../ar/index'
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {persistStore, autoRehydrate} from "redux-persist";
import Http from './public/Http'
import Routes from './Routes'
import {EventEmitter} from 'fbemitter'

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
	console.info('store is ready!');
	storeEmitter.emit(STORE_READY);
});

export default class extends React.Component {
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
			return null;
		}
		return (
			<Provider store={store}>
				<Http>
					<Routes/>
				</Http>
			</Provider>
		);
	}
}