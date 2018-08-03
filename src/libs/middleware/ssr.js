/**
 * @overview 处理react server-side render,主要处理初始化数据的问题
 * @author jean.h.ma(m860)
 */
import {matchPath, StaticRouter} from "react-router-dom";
import logger from "../logger"
import React from "react"
import {renderToStaticMarkup} from 'react-dom/server'
import App from "../../components/App"
import html from "../html"
import routeConfig from "../../configuration/routes.config"
import {forEachAsync} from "../helper";

let routes = [];
forEachAsync(routeConfig, async (item) => {
    let routeProps = {
        exact: item.exact || false,
        async: false
    };
    if (item.path) {
        routeProps.path = item.path;
    }
    if (item.component instanceof Promise) {
        routeProps.component = await item.component;
        routeProps.async = true;
    }
    else {
        routeProps.component = item.component;
    }
    if (routeProps.component.default) {
        routeProps.component = routeProps.component.default
    }
    routes.push(routeProps);
})

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
            let component = route.component;
            let initialProps = {
                path: req.path,
                props: null,
                async: route.async
            };
            const getInitialProps = component.getInitialProps;
            if (getInitialProps) {
                if (typeof(getInitialProps) !== "function") {
                    throw new Error('route handler must be a Function');
                }
                const args = {
                    query: req.query,
                    params: matchResult ? matchResult.params : null
                };
                logger.info(`getInitialProps parameter : ${JSON.stringify(args)}`);
                // props = await getInitialProps(args);
                initialProps.props = await getInitialProps(args);
                logger.info(`initial props : ${JSON.stringify(initialProps)}`);
            }
            else {
                logger.warn(`path=${route.path}没有配置fetchInitialState`)
            }
            const context = {};
            const markup = renderToStaticMarkup(
                <StaticRouter
                    location={req.url}
                    context={context}>
                    <App routes={routes}
                         initialProps={initialProps}/>
                </StaticRouter>
            );
            logger.info(`${req.path}  : ${markup}`)
            const content = html.getHtml()
                .replace("#INITIAL_PROPS#", JSON.stringify(initialProps))
                .replace('#MARKUP#', markup);
            res.send(content);
        }
        else {
            logger.warn(`${req.url} is not matched`);
        }
    }
    next();
}