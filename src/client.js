import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {render} from 'react-dom';
import App from './components/App'
import {api} from './configuration/axios.instance'

window.addEventListener('error', (event)=> {
	api.post('/clientlogs', {
		message: event.error.message,
		stack: event.error.stack
	});
}, false);

render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>
	, document.getElementById('view')
);