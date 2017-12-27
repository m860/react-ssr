import React from 'react';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {render} from 'react-dom';
import App, {store} from './components/App'
import {api} from './configuration/axios.instance'
import {showToast} from './ar/toast.ar'
import DataWrapper from './components/common/DataWrapper'

window.addEventListener('error', (event)=> {
	event.preventDefault();
	api.post('/clientlogs', {
		message: event.error ? event.error.message : event.message,
		stack: event.error ? event.error.stack : ''
	});
	store.dispatch(showToast({
		type: 'error',
		message: event.message
	}));
	return false;
}, false);

if (__SPA__) {
	render(
		<HashRouter>
			<App/>
		</HashRouter>
		, document.getElementById('view')
	);
}
else {
	render(
		<BrowserRouter>
			<DataWrapper>
				<App/>
			</DataWrapper>
		</BrowserRouter>
		, document.getElementById('view')
	);
}
