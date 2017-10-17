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
import Routes from './Routes'


export const store = createStore(
	reducers,
	undefined,
	compose(
		applyMiddleware(thunk)
		, autoRehydrate()
	)
);

persistStore(store, {
	blacklist: []
}, ()=> {
	console.log('store is ready!');
});

export default function () {
	return (
		<Provider store={store}>
			<Routes/>
		</Provider>
	);
}