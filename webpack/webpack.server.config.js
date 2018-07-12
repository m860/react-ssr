var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
var EventHooksPlugin = require('event-hooks-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var cp = require("child_process");
var webpackBase = require("./webpack.base.config")
var nodemon = require("nodemon");

var running = false;

var nodeModules = {};
fs.readdirSync(path.join(__dirname, '../node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

console.log('**********************');
console.log('* build server ...');
console.log('* mode : ' + (process.env.NODE_ENV === webpackBase.ENV_PRODUCTION ? webpackBase.ENV_PRODUCTION : webpackBase.ENV_DEVELOPMENT));
console.log('**********************');


var output = {
    path: path.join(__dirname, '../dist'),
    filename: 'server.js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: ''
};
var config = webpackBase.getConfig();
config.entry = path.join(__dirname, '../src/server.js');
config.resolve = {
    extensions: ["." + webpackBase.EXTENSION_SERVER + ".js", ".js", "." + webpackBase.EXTENSION_SERVER + ".json", ".json"]
};
config.target = "node";
config.output = output;
config.externals = nodeModules;
config.plugins.push(
    new CopyWebpackPlugin([
        {from: path.join(__dirname, "../package.json")}
    ])
);
config.plugins.push(
    new webpack.IgnorePlugin(new RegExp("\.(" + webpackBase.EXTENSION_BROWSER + "\.js|" + webpackBase.EXTENSION_BROWSER + "\.json)$"))
);

if (process.env.NODE_ENV === webpackBase.ENV_PRODUCTION) {
    //do something
}
else {
    config.plugins.push(
        new EventHooksPlugin({
            'done': () => {
                if (process.env.NODE_ENV === webpackBase.ENV_DEVELOPMENT) {
                    if (!running) {
                        running = true;
                        process.chdir(path.join(__dirname, "../dist"));
                        // cp.exec("node server.js").stdout.pipe(process.stdout);
                        nodemon({
                            script: 'server.js',
                            delay: 5 * 1000,
                            ignore: ["public/*", "logs/*"]
                        });
                        // nodemon.on('start', function () {
                        //     var url = 'http://127.0.0.1:3000';
                        //     console.log(colors.green('\n Please access ' + url + ' in browser \n'));
                        // });
                    }
                }
            }
        })
    );
}

module.exports = config;
