/**
 * Created by jean.h.ma on 3/15/17.
 */
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import express from 'express';
import path from 'path';
import fs from 'fs'
import {renderToStaticMarkup} from 'react-dom/server'
import 'babel-polyfill'
import yargs from 'yargs'
// import expressMiddleware from './libs/expressMiddleWare/index'
// import './libs/logger'
import App from './components/App'

const args = yargs
	.default('port', 3000, 'express listen port')
	.help('help')
	.argv;

const port = args['port'];

const server = express();

server.use('/public',express.static('./public'));


server.get('/*',(req, res)=> {
	if (req.url) {
		const context = {}
		const server = (
			<StaticRouter
				location={req.url}
				context={context}>
				<App/>
			</StaticRouter>
		);
		const markup=renderToStaticMarkup(server);
		res.send(`
			<html>
			<head>
			  <title></title>
			</head>
			<body>
			<div id="view">${markup}</div>
			<script src="/public/bundle.js"></script>
			</body>
			</html>
		`)
	}
})


server.listen(port, ()=> {
	console.log(`please access http://127.0.0.1:${port} in browser`);
});







