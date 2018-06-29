/**
 * @overview 客户端的入口
 * @author jean.h.ma(m860)
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
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

