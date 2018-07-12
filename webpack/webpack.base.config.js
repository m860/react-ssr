var webpack = require('webpack')
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var packageInfo = require("../package")

var EXTENSION_BROWSER = "browser";
var EXTENSION_SERVER = "server";
var ENV_PRODUCTION = "production";
var ENV_DEVELOPMENT = "development";

exports.EXTENSION_BROWSER = EXTENSION_BROWSER;
exports.EXTENSION_SERVER = EXTENSION_SERVER;
exports.ENV_PRODUCTION = ENV_PRODUCTION;
exports.ENV_DEVELOPMENT = ENV_DEVELOPMENT;

exports.getConfig = function () {
    var config = {
        mode: process.env.NODE_ENV === ENV_PRODUCTION ? ENV_PRODUCTION : ENV_DEVELOPMENT,
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }, {
                    loader: 'eslint-loader',
                    options: {
                        // quiet: process.env.NODE_ENV === ENV_PRODUCTION ? true : false
                        quiet: true
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
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                },
                "process.package": {
                    version: JSON.stringify(packageInfo.version)
                }
            })
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
        };
    }
    else {
        config.devtool = "cheap-module-eval-source-map";
    }
    return config;
};
