/**
 * @overview 处理react server-side render,主要处理初始化数据的问题
 * @author jean.h.ma(m860)
 */
import {matchPath, StaticRouter} from "react-router-dom";
import React from "react"
import {renderToStaticMarkup} from 'react-dom/server'
import App from "../../components/App"
import html from "../html"
import routeConfig from "../../configuration/routes.config"
import {buildServerRoutes} from "../helpers/route";

let routes = [];

async function _initRoutes() {
    console.log(`初始化路由...`)
    routes = await buildServerRoutes(routeConfig);
    console.log(`初始化路由结束,共有${routes.length}个路由配置`);
}

_initRoutes();

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
            console.info(`${req.path} is matched : ${JSON.stringify(matchResult)}`);
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
                console.info(`getInitialProps parameter : ${JSON.stringify(args)}`);
                // props = await getInitialProps(args);
                initialProps.props = await getInitialProps(args);
                console.info(`initial props : ${JSON.stringify(initialProps)}`);
            }
            else {
                console.warn(`path=${route.path}没有配置fetchInitialState`)
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
            console.info(`${req.path}  : ${markup}`)
            const content = html.getHtml()
                .replace("#INITIAL_PROPS#", JSON.stringify(initialProps))
                .replace('#MARKUP#', markup);
            res.send(content);
        }
        else {
            console.warn(`${req.url} is not matched`);
        }
    }
    next();
}