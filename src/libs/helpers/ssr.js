import {parse as queryParse} from "query-string"

/**
 * 此方法仅客户端调用,获取页面的默认数据
 * @param componentInstance
 * @return {*}
 */
export function getInitialProps(componentInstance) {
    const {search} = componentInstance.props.location;
    const query = queryParse(search);
    if (componentInstance.constructor.getInitialProps) {
        const args = {
            query: query,
            params: componentInstance.props.match.params
        }
        return componentInstance.constructor.getInitialProps(args);
    }
    return null;
}