var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var packageInfo = require("./package")
var CopyWebpackPlugin = require('copy-webpack-plugin');
var dllManifest = require("./build/manifest")


var EXTENSION_BROWSER = "browser";
var EXTENSION_SERVER = "server";
var ENV_PRODUCTION = "production";
var ENV_DEVELOPMENT = "development";

var output = {
    path: path.join(__dirname, 'dist', 'public'),
    filename: process.env.NODE_ENV === ENV_PRODUCTION ? "bundle.[hash].js" : "bundle.js",
    chunkFilename: process.env.NODE_ENV === ENV_PRODUCTION ? '[id].[chunkhash].js' : "[id].js",
    publicPath: '/public/'
};

console.log('**********************');
console.log('* build browser ...');
console.log('* mode : ' + (process.env.NODE_ENV === ENV_PRODUCTION ? ENV_PRODUCTION : ENV_DEVELOPMENT));
console.log('**********************');

var config = {
    mode: process.env.NODE_ENV === ENV_PRODUCTION ? ENV_PRODUCTION : ENV_DEVELOPMENT,
    entry: process.env.NODE_ENV === ENV_DEVELOPMENT ?
        [
            // "webpack-hot-middleware/client",
            "webpack/hot/dev-server",
            "./src/browser.js"
        ] :
        path.join(__dirname, 'src', "browser.js"),
    target: "web",
    output: output,
    externals: {},
    resolve: {
        extensions: ["." + EXTENSION_BROWSER + ".js", ".js", "." + EXTENSION_BROWSER + ".json", ".json"]
    },
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
        new CopyWebpackPlugin([
            {from: "./build/" + dllManifest.name + ".js"}
        ]),
        new webpack.IgnorePlugin(new RegExp("\.(" + EXTENSION_SERVER + "\.js|" + EXTENSION_SERVER + "\.json)$")),
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
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            },
            "process.package": {
                version: JSON.stringify(packageInfo.version)
            }
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, "build/manifest.json"),
        })
    ]
};

if (process.env.NODE_ENV === ENV_PRODUCTION) {
    config.plugins.push(
        new webpack.BannerPlugin({
            banner: "react-ssr version : " + packageInfo.version + " , file : [file]"
        })
    );
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
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
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    );
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = config;

