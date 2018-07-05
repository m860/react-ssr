/**
 * @overview 客户端的入口
 * @author jean.h.ma(m860)
 */
import "normalize-css/normalize.css";
import "font-awesome/css/font-awesome.css";
import './assets/sass/App.sass'
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {render} from 'react-dom';
import App from './components/App'
import StateWrapper from "./components/common/StateWrapper"

render(
    <BrowserRouter>
        <StateWrapper>
            <App/>
        </StateWrapper>
    </BrowserRouter>
    , document.getElementById('view')
);

