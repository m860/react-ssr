import serverRoutes from "../configuration/routes.config"
import browserRoutes from "../configuration/routes.config.browser"
import logger from "./logger"

/**
 * 检查客户端和服务端的路由配置是否一致
 */
export function validateRouteConfig() {
    if (serverRoutes.length !== browserRoutes.length) {
        throw new Error("服务端route和客户端route配置的数量不一致");
    }
    for (let i = 0; i < serverRoutes.length; i++) {
        const path = serverRoutes[i].path;
        const title = serverRoutes[i].title;
        const route = browserRoutes.find(f => f.path === path);
        if (!route) {
            throw new Error(`browser route没有配置'${path}'`);
        }
        if (route.title !== title) {
            logger.warn(`${path}服务端和客户端的title配置不一致`);
        }
    }
}