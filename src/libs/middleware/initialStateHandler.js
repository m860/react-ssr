import {matchPath} from "react-router-dom";
import logger from "../logger"
import routes from "../../configuration/routes.config"
import injectState from "../injectState";
import React from "react"

export default async function (req, res, next) {
    req.$route = null;
    const route = routes.find(f => {
        return matchPath(req.url, {
            path: f.path,
            exact: true,
            strict: false
        });
    });
    logger.info(`${req.url} is${route ? "" : " not"} matched`);
    if (route) {
        req.$route = Object.assign({}, route);
        const fetchInitialState = req.$route.component.fetchInitialState;
        if (fetchInitialState) {
            if (typeof(fetchInitialState) !== "function") {
                throw new Error('route handler is must a Function');
            }
            const state = await fetchInitialState();
            logger.info(`initial state : ${JSON.stringify(state)}`);
            req.$route.component = injectState(route.component, {
                users: state
            })
        }
    }
    else {
        //404
        req.$route = Object.assign({}, routes[routes.length - 1]);
    }
    next();
}