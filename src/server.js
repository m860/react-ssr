/**
 * Created by jean.h.ma on 3/15/17.
 */
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import express from 'express';
//import path from 'path';
import fs from 'fs'
import {renderToStaticMarkup} from 'react-dom/server'
import 'babel-polyfill'
import yargs from 'yargs'
// import expressMiddleware from './libs/expressMiddleWare/index'
import logger from  './libs/logger'
import App from './components/App'

const args = yargs
	.default('port', 3000, 'express listen port')
	.help('help')
	.argv;

const port = args['port'];

const server = express();

server.use('/public', express.static('./public'));

let _html;
const getHtml = ()=> {
	if (_html) {
		return _html;
	}
	_html = fs.readFileSync('./public/index.html', 'utf8');
	return _html;
}

server.post('/api/*', (req, res)=> {
	res.send('I am POST API :)');
});
server.get('/api/*',(req, res)=> {
	res.send('I am GET API :)');
})

server.get('/*', (req, res)=> {
	logger.info(`req.url=${req.url}`);
	const context = {}
	const markup = renderToStaticMarkup(
		<StaticRouter
			location={req.url}
			context={context}>
			<App/>
		</StaticRouter>
	);
	const html = getHtml().replace('#HTML#', markup);
	res.send(html);
});


server.listen(port, ()=> {
	logger.info(`address http://127.0.0.1:${port}`);
});






