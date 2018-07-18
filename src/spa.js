/**
 * @overview 客户端的入口
 * @author jean.h.ma(m860)
 */
import "normalize-css/normalize.css";
import "font-awesome/css/font-awesome.css";
import './assets/sass/App.sass'
import {AppContainer} from 'react-hot-loader'
import React from 'react';
import {HashRouter} from 'react-router-dom';
import StateProvider from "./components/common/StateProvider"
import {render} from 'react-dom'
import App from "./components/App"

const root = document.getElementById('view');

const hotRender = Component => {
    render(
        <HashRouter>
            <StateProvider>
                <Component/>
            </StateProvider>
        </HashRouter>,
        root
    )
};

hotRender(App);

if (module.hot) {
    module.hot.accept("./components/App", () => {
        const NextApp = require("./components/App").default;
        hotRender(NextApp);
    })
}


