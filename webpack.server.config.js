var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
// var CleanWebpackPlugin = require('clean-webpack-plugin')
// var HtmlWebpackPlugin = require('html-webpack-plugin');
var colors = require('colors/safe')
var nodemon = require('nodemon')
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var EventHooksPlugin = require('event-hooks-webpack-plugin');
var packageInfo = require("./package")
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var dllManifest = require("./build/manifest")

var running = false;

var nodeModules = {};
fs.readdirSync(path.join(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

var EXTENSION_BROWSER = "browser";
var EXTENSION_SERVER = "server";
var ENV_PRODUCTION = "production";
var ENV_DEVELOPMENT = "development";

console.log('**********************');
console.log('* build server ...');
console.log('* mode : ' + (process.env.NODE_ENV === ENV_PRODUCTION ? ENV_PRODUCTION : ENV_DEVELOPMENT));
console.log('**********************');

var output = {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: ''
};

var config = {
    mode: process.env.NODE_ENV === ENV_PRODUCTION ? ENV_PRODUCTION : ENV_DEVELOPMENT,
    entry: path.join(__dirname, 'src', 'server.js'),
    target: 'node',
    output: output,
    externals: nodeModules,
    resolve: {
        extensions: ["." + EXTENSION_SERVER + ".js", ".js", "." + EXTENSION_SERVER + ".json", ".json"]
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader'
            }, {
                loader: 'eslint-loader',
                options: {
                    quiet: process.env.NODE_ENV === ENV_PRODUCTION ? true : false
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {importLoaders: 1}
                },
                "postcss-loader"
            ]
        }, {
            test: /\.sass$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {importLoaders: 1}
                },
                "postcss-loader",
                'sass-loader'
            ],
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            // loader: "file-loader?name=" + (isProduction ? "[hash]" : "[name]") + ".[ext]"
            use: [
                "file-loader"
            ]
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            // loader: "url-loader?limit=10000&mimetype=application/font-woff&name=" + (isProduction ? "[hash]" : "[name]") + ".[ext]"
            use: [
                "url-loader"
            ]
        }, {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            use: [
                "file-loader",
                "image-webpack-loader"
                // 'file-loader?hash=sha512&digest=hex&name=' + (isProduction ? "[hash]" : "[name]") + '.[ext]',
                // 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: "./package.json"}
        ]),
        // new MiniCssExtractPlugin({
        //     filename: '[name].[hash].css',
        //     chunkFilename: '[id].[hash].css',
        // }),
        new webpack.IgnorePlugin(new RegExp("\.(" + EXTENSION_BROWSER + "\.js|" + EXTENSION_BROWSER + "\.json)$")),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            },
            "process.package": {
                version: JSON.stringify(packageInfo.version)
            }
        }),
        // new CleanWebpackPlugin(['dist'], {
        //     root: __dirname,
        //     verbose: true,
        //     dry: false
        // }),
    ]
};

if (process.env.NODE_ENV === ENV_PRODUCTION) {
    config.plugins.push(
        new webpack.BannerPlugin({
            banner: "react-ssr version : " + packageInfo.version + " , file : [file]"
        })
    );
    config.optimization = {
        //如果mode=production,minimize默认为true
        // minimize: isProduction ? true : false
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ],
        mergeDuplicateChunks: true
    }
}
else {
    config.devtool = "cheap-module-eval-source-map";
    // config.plugins.push(
    //     new MiniCssExtractPlugin({
    //         filename: "[name].css",
    //         chunkFilename: "[id].css"
    //     })
    // );
    config.plugins.push(
        new EventHooksPlugin({
            'done': () => {
                if (process.env.NODE_ENV === ENV_DEVELOPMENT) {
                    if (!running) {
                        running = true;
                        process.chdir('dist');
                        nodemon({
                            script: 'server.js',
                            delay: 5 * 1000,
                            ignore: ["public/*", "logs/*"]
                        });
                        nodemon.on('start', function () {
                            var url = 'http://127.0.0.1:3000';
                            console.log(colors.green('\n Please access ' + url + ' in browser \n'));
                        });
                    }
                }
            }
        })
    );
}

module.exports = config;
