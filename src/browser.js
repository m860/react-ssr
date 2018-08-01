/**
 * @overview 客户端的入口
 * @author jean.h.ma(m860)
 */
import "normalize-css/normalize.css";
import "font-awesome/css/font-awesome.css";
import './assets/sass/App.sass'
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {hydrate} from 'react-dom'
import App from "./components/App"

const root = document.getElementById('view');

let initialState = null;

if (window.__INITIAL_STATE__) {
    try {
        initialState = JSON.parse(window.__INITIAL_STATE__);
    }
    catch (ex) {

    }
    delete window.__INITIAL_STATE__;
}

hydrate(
    <BrowserRouter>
        <App initialState={initialState}/>
    </BrowserRouter>,
    root
);

