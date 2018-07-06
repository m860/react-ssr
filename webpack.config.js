var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var colors = require('colors/safe')
var nodemon = require('nodemon')
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var EventHooksPlugin = require('event-hooks-webpack-plugin');
var packageInfo = require("./package")
var CopyWebpackPlugin = require('copy-webpack-plugin');
var dllManifest = require("./build/manifest")

var running = false;

var nodeModules = {};
fs.readdirSync(path.join(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

var EXTENSION_BROWSER = "browser";
var EXTENSION_SERVER = "server";

var config = function (server, env, options) {
    var isProduction = env !== 'development';
    var copyWebpackConfig = [];
    if (server) {
        copyWebpackConfig.push({
            from: "./package.json"
        });
    }
    else {
        copyWebpackConfig.push({
            from: "./build/" + dllManifest.name + ".js"
        })
    }
    var output = {
        path: path.join(__dirname, 'dist', server ? '' : 'public'),
        filename: server ? 'server.js' : "bundle.[hash].js",
        chunkFilename: '[id].[chunkhash].js',
        publicPath: server ? '' : (options.spa ? '' : '/public/')
    };
    var configuration = {
        mode: isProduction ? "production" : "development",
        entry: path.join(__dirname, 'src', server ? 'server.js' : "browser.js"),
        target: server ? 'node' : "web",
        output: output,
        externals: (server ? nodeModules : {}),
        resolve: {
            extensions: server ?
                ["." + EXTENSION_SERVER + ".js", ".js", "." + EXTENSION_SERVER + ".json", ".json"] :
                ["." + EXTENSION_BROWSER + ".js", ".js", "." + EXTENSION_BROWSER + ".json", ".json"]
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }, {
                    loader: 'eslint-loader',
                    options: {
                        quiet: isProduction ? true : false
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
            new CopyWebpackPlugin(copyWebpackConfig),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new webpack.IgnorePlugin(server ?
                new RegExp("\.(" + EXTENSION_BROWSER + "\.js|" + EXTENSION_BROWSER + "\.json)$") :
                new RegExp("\.(" + EXTENSION_SERVER + "\.js|" + EXTENSION_SERVER + "\.json)$")),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.join(__dirname, "src/index.html"),
                inject: false,
                chunksSortMode: "none",
                dlls: [
                    output.publicPath + dllManifest.name + ".js"
                ]
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
                },
                "process.package": {
                    version: JSON.stringify(packageInfo.version)
                }
            }),
            new CleanWebpackPlugin([server ? 'dist' : "dist/public"], {
                root: __dirname,
                verbose: true,
                dry: false
            }),
        ]
    };
    if (isProduction) {
        configuration.plugins.push(
            new webpack.BannerPlugin({
                banner: "react-ssr version : " + packageInfo.version + " , file : [file]"
            })
        );
        configuration.optimization = {
            //如果mode=production,minimize默认为true
            // minimize: isProduction ? true : false
            minimizer: [
                // new UglifyJSPlugin({
                //     uglifyOptions: {
                //         compress: {
                //             drop_console: true,
                //             //only remove the follow console
                //             pure_funcs: ['console.log', 'console.info', 'console.dir', 'console.debug']
                //         }
                //     }
                // }),
                new OptimizeCSSAssetsPlugin({})
            ],
            mergeDuplicateChunks: true
        }
        // if (!server) {
        //     configuration.optimization.splitChunks = {
        //         chunks: "all",
        //         minSize: 200 * 1024
        //     };
        // }
    }
    else {
        configuration.devtool = "cheap-module-eval-source-map";
        configuration.plugins.push(
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        )
    }
    if (server) {
        if (!isProduction) {
            configuration.plugins.push(
                new EventHooksPlugin({
                    'done': () => {
                        if (env === 'development') {
                            if (!running) {
                                running = true;
                                process.chdir('dist');
                                nodemon({
                                    script: 'server.js',
                                    delay: 5 * 1000,
                                    ignore: ["public/*", "logs/*"]
                                });
                                nodemon.on('start', function () {
                                    var url;
                                    if (server) {
                                        url = 'http://127.0.0.1:3000';
                                    }
                                    else if (options.spa) {
                                        url = 'file://' + path.resolve(path.join(__dirname, 'dist/public/index.html'));
                                    }
                                    console.log(colors.green('\n Please access ' + url + ' in browser \n'));
                                });
                            }
                        }
                    }
                })
            );
        }
    }
    else {
        if (!isProduction) {
            configuration.plugins.push(new webpack.HotModuleReplacementPlugin());
        }
        configuration.plugins.push(
            new webpack.DllReferencePlugin({
                manifest: path.join(__dirname, "build/manifest.json"),
            })
        );
    }
    return configuration;
};

module.exports = function (env) {
    if (!env) {
        env = {
            NODE_ENV: 'development',
            spa: false
        };
    }
    if (!env.NODE_ENV) {
        env.NODE_ENV = 'development'
    }
    if (env.spa === undefined) {
        env.spa = false;
    }
    var NODE_ENV = env.NODE_ENV;
    console.log('**********************');
    console.log('* environment : ' + NODE_ENV);
    console.log('* spa : ' + env.spa);
    console.log('**********************');
    return [
        config(true, NODE_ENV, env),
        config(false, NODE_ENV, env)
    ];
};