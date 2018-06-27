/**
 * Created by jean.h.ma on 3/15/17.
 */
import 'babel-polyfill'
import React from 'react';
import {StaticRouter, Switch, Route} from 'react-router-dom';
import express from 'express';
import fs from 'fs'
import {renderToStaticMarkup} from 'react-dom/server'
import yargs from 'yargs'
import logger from "./libs/logger"
import App from './components/App'
import middlewares from "./libs/middleware"
import favicon from 'serve-favicon'

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

server.use(favicon(require("./assets/favicon.ico")))

server.use('/public', express.static('./public'));

//attach middleware
middlewares.forEach(fn => {
    server.use(fn);
});

let _html;
const getHtml = () => {
    if (_html) {
        return _html;
    }
    _html = fs.readFileSync('./public/index.html', 'utf8');
    return _html;
};


server.get('/*', (req, res) => {
    const context = {};
    const markup = renderToStaticMarkup(
        <StaticRouter
            location={req.url}
            context={context}>
            <App>
                <Switch>
                    <Route {...req.$route}></Route>
                </Switch>
            </App>
        </StaticRouter>
    );
    if (markup === "") {
        logger.error(`[${req.url}] server render empty`);
    }
    const html = getHtml().replace('#HTML#', markup);
    logger.info(`[${req.url}] [markup] : #${markup}#`);
    res.send(html);
});


server.listen(port, () => {
    logger.log(`address http://127.0.0.1:${port}`);
});







