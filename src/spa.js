/**
 * @overview 客户端的入口
 * @author jean.h.ma(m860)
 */
import "babel-polyfill"
import "normalize-css/normalize.css";
import "font-awesome/css/font-awesome.css";
import './assets/sass/App.sass'
import React from 'react';
import {HashRouter} from 'react-router-dom';
import {render} from 'react-dom'
import App from "./components/App"
import routeConfig from "./configuration/routes.config"
import {buildBrowserRoutes} from "./libs/helpers/route";

const root = document.getElementById('view');

const hotRender = (Component, props = {}) => {
    render(
        <HashRouter>
            <Component {...props}/>
        </HashRouter>,
        root
    )
};

hotRender(App, {
    routes: buildBrowserRoutes(routeConfig)
});

if (module.hot) {
    module.hot.accept("./components/App", () => {
        const NextApp = require("./components/App").default;
        hotRender(NextApp);
    })
}


