import generateAsyncComponent from "../decorators/generateAsyncComponent";
import {getValuePath} from "./object";
import {forEachAsync} from "./array";

/**
 * 将routes.config.js中的route配置转换成<Route>的props
 * @param route
 * @return {{exact: (*|boolean)}}
 */
export function convertToRouteProps(route) {
    let routeProps = {
        exact: getValuePath(route, "exact", false)
    };
    if (route.path) {
        routeProps.path = route.path;
    }
    if (route.component instanceof Promise || route.component.then) {
        routeProps.component = generateAsyncComponent(route.component);
    }
    else {
        routeProps.component = route.component.default ? route.component.default : route.component;
    }
    return routeProps;
}

/**
 * [Browser] 把routes.config.js路由配置转换成<Route>的props
 * @param routeConfig
 * @return {{exact: (*|boolean)}[]}
 */
export function buildBrowserRoutes(routeConfig) {
    if (!routeConfig) {
        throw new Error(`routeConfig is required`);
    }
    if (!(routeConfig instanceof Array)) {
        throw new Error(`routeConfig must be a Array type`);
    }
    return routeConfig.map(f => convertToRouteProps(f));
}

/**
 * [Server] 把routes.config.js路由配置转换成<Route>的props
 * @param routeConfig
 * @return {Promise<Array>}
 */
export async function buildServerRoutes(routeConfig) {
    let routes = [];
    await forEachAsync(routeConfig, async (item) => {
        let routeProps = {
            exact: getValuePath(item, "exact", false),
            async: false
        };
        if (item.path) {
            routeProps.path = item.path;
        }
        if (item.component instanceof Promise || item.component.then) {
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
    });
    return routes;
}