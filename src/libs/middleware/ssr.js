/**
 * @overview 处理react server-side render,主要处理初始化数据的问题
 * @author jean.h.ma(m860)
 */
import {matchPath, StaticRouter} from "react-router-dom";
import logger from "../logger"
import routes from "../../configuration/routes.config"
import React from "react"
import {renderToStaticMarkup} from 'react-dom/server'
import App from "../../components/App"
import html from "../html"

export default async function (req, res, next) {
    if (req.method === "GET") {
        let matchResult = null;
        const route = routes.find(f => {
            matchResult = matchPath(req.path, {
                path: f.path,
                exact: f.exact || false,
                strict: f.exact || false
            });
            return matchResult ? true : false
        });
        if (route) {
            logger.info(`${req.path} is matched : ${JSON.stringify(matchResult)}`);
            let component = route.component instanceof Promise ? await route.component : route.component;
            if (component.default) {
                component = component.default;
            }
            let initialState = null;
            const fetchInitialState = component.fetchInitialState;
            if (fetchInitialState) {
                if (typeof(fetchInitialState) !== "function") {
                    throw new Error('route handler must be a Function');
                }
                const args = {
                    query: req.query,
                    params: matchResult ? matchResult.params : null
                };
                logger.info(`fetchInitialState parameter : ${JSON.stringify(args)}`);
                initialState = await fetchInitialState(args);
                logger.info(`initial state : ${JSON.stringify(initialState)}`);
            }
            else {
                logger.warn(`path=${route.path}没有配置fetchInitialState`)
            }
            const context = {
                initialState: initialState
            };
            const markup = renderToStaticMarkup(
                <StaticRouter
                    location={req.url}
                    context={context}>
                    <App/>
                </StaticRouter>
            );
            console.log('>>>',markup)
            const content = html.getHtml()
                .replace("#INITIAL_STATE#", JSON.stringify(initialState))
                .replace('#MARKUP#', markup);
            res.send(content);
        }
        else {
            logger.warn(`${req.url} is not matched`);
        }
    }
    next();
}