/**
 * @overview 客户端的入口
 * @author jean.h.ma(m860)
 */
import "normalize-css/normalize.css";
import "font-awesome/css/font-awesome.css";
import './assets/sass/App.sass'
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App'
import StateWrapper from "./components/common/StateWrapper"

const root = document.getElementById('view');

if (process.env.NODE_ENV === "production") {
    const ReactDOM = require("react-dom");
    ReactDOM.render(
        <BrowserRouter>
            <StateWrapper>
                <App/>
            </StateWrapper>
        </BrowserRouter>,
        root
    );
}
else {
    const ReactDOM = require("react-dom");
    const {hot} = require("react-hot-loader");
    const Root = () => {
        return (
            <BrowserRouter>
                <StateWrapper>
                    <App/>
                </StateWrapper>
            </BrowserRouter>
        );
    }
    const HotApp = hot(module)(Root);
    ReactDOM.render(
        <HotApp/>,
        root
    );
}
