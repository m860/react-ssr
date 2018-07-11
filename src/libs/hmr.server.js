import webpack from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import browserWebpackOption from '../../webpack.browser.config'
import logger from "./logger"

const compiler = webpack(browserWebpackOption);

export default function (app) {
    logger.info('attach HMR ...');
    app.use(webpackDevMiddleware(compiler, {
        publicPath: browserWebpackOption.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
}

