/**
 * Created by jean.h.ma on 3/15/17.
 */
import React from 'react';
import {StaticRouter, matchPath} from 'react-router-dom';
import express from 'express';
//import path from 'path';
import fs from 'fs'
import {renderToStaticMarkup} from 'react-dom/server'
import 'babel-polyfill'
import yargs from 'yargs'
import logger from  './libs/logger'
import App from './components/App'
import service from './service/index'
import bodyParser from 'body-parser'
import cors from 'cors'
import {routes, RoutePaths} from './components/Routes'
import DataWrapper from './components/public/DataWrapper'

// 不处理未捕获异常,由PM2来处理和记录
// process.on('uncaughtException', (err)=> {
// 	console.log('uncaughtException')
// 	logger.error(`uncaughtException:${err.stack}`);
// });

const args = yargs
	.default('port', 3000, 'express listen port')
	.help('help')
	.argv;

const port = args['port'];

const server = express();

if (__SPA__) {
	server.use(cors());
}

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({extended: false}));

// parse application/json
server.use(bodyParser.json());

service(server);

server.use('/public', express.static('./public'));

let _html;
const getHtml = ()=> {
	if (_html) {
		return _html;
	}
	_html = fs.readFileSync('./public/index.html', 'utf8');
	return _html;
};

//fetch data
server.use((req, res, next)=> {
	const url = req.url;
	for (let i = 0; i < routes.length; i++) {
		const matched = matchPath(url, {
			path: routes[i].props.path,
			exact: routes[i].props.exact ? true : false,
			strict: false
		});
		logger.info(`will match path=${url}:path=${routes[i].props.path},exact=${routes[i].props.exact ? true : false},strict=false result=${matched}`);
		if (matched) {
			const component = routes[i].props.component;
			if (component && component.fetchData) {
				logger.info(`start fetchData ...`)
				const fetchResult = component.fetchData();
				if (fetchResult instanceof Promise) {
					fetchResult.then(data=> {
						req.dataContext = data;
						next();
					}).catch(err=> {
						logger.error(err);
					});
				}
				else {
					if (fetchResult) {
						req.dataContext = fetchResult;
					}
					next();
				}
			}
			logger.info(`[${url}] is matched`);
			return;
		}
	}
	next();
})

server.get('/*', (req, res)=> {
	logger.info(`[${req.url}] [dataContext] : ${JSON.stringify(req.dataContext)}`);
	const context = {}
	const markup = renderToStaticMarkup(
		<StaticRouter
			location={req.url}
			context={context}>
			<DataWrapper
				data={req.dataContext}>
				<App/>
			</DataWrapper>
		</StaticRouter>
	);
	if (markup === "") {
		logger.error(`[${req.url}] server render empty`);
	}
	const html = getHtml().replace('#HTML#', markup);
	logger.info(`[${req.url}] [markup] : #${markup}#`);
	res.send(html);
});


server.listen(port, ()=> {
	logger.info(`address http://127.0.0.1:${port}`);
});







