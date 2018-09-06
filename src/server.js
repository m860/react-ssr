/**
 * @overview node的启动文件
 * @author jean.h.ma(m860)
 */
import "babel-polyfill"
import React from 'react';
import express from 'express';
import {renderToStaticMarkup} from 'react-dom/server'
import yargs from 'yargs'
import logger from "./libs/logger"
import middlewares from "./libs/middleware"
import favicon from 'serve-favicon'
// import {validateRouteConfig} from "./libs/validation";

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
middlewares.forEach(middleware => {
    server.use(middleware);
});

//检查客户端和服务端的路由配置是否一致
// validateRouteConfig();


server.listen(port, () => {
    logger.info(`runtime environment = ${process.env.NODE_ENV}`);
    logger.info(`address http://127.0.0.1:${port}`);
});







