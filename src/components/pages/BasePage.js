import Base, {PureBase} from '../Base'
import {parse as queryParse} from "query-string"


/**
 * 获取页面的state
 * @return {*}
 * @private
 */
function getInitialProps() {
    const {search} = this.props.location;
    const query = queryParse(search);
    if (this.constructor.getInitialProps) {
        const args = {
            query: query,
            params: this.props.match.params
        }
        return this.constructor.getInitialProps(args);
    }
    return null;
}

export default class BasePage extends Base {
    constructor(...args) {
        super(...args);
        this.getInitialProps = getInitialProps.bind(this);
    }
}

export class PureBasePage extends PureBase {
    constructor(...args) {
        super(...args);
        this.getInitialProps = getInitialProps.bind(this);
    }
}
