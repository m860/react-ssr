/**
 * @overview 客户端的入口
 * @author jean.h.ma(m860)
 */
import "babel-polyfill"
import "normalize-css/normalize.css";
import "font-awesome/css/font-awesome.css";
import './assets/sass/App.sass'
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom'
import App from "./components/App"
import {buildBrowserRoutes} from "./libs/helpers/route";
import routeConfig from "./configuration/routes.config"

const root = document.getElementById('view');

let initialProps = null;

if (window.__INITIAL_PROPS__) {
    try {
        initialProps = JSON.parse(window.__INITIAL_PROPS__);
    }
    catch (ex) {

    }
    delete window.__INITIAL_PROPS__;
}
//如果当前访问的页面时异步的则使用render,否则使用hyrate
let render = ReactDOM.hydrate;
if (initialProps && initialProps.async) {
    console.log(`use render`);
    render = ReactDOM.render;
}
render(
    <BrowserRouter>
        <App initialProps={initialProps}
             routes={buildBrowserRoutes(routeConfig)}/>
    </BrowserRouter>,
    root
);

