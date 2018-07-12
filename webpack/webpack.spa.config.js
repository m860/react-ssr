var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var dllManifest = require("../build/manifest");
var webpackBase = require("./webpack.base.config");

var output = {
    path: path.join(__dirname, '../dist/public'),
    filename: "bundle.js",
    chunkFilename: "[id].js",
};

console.log('**********************');
console.log('* build SPA ...');
console.log('* mode : ' + (process.env.NODE_ENV === webpackBase.ENV_PRODUCTION ? webpackBase.ENV_PRODUCTION : webpackBase.ENV_DEVELOPMENT));
console.log('**********************');

var config = webpackBase.getConfig();
config.entry = [
    path.join(__dirname, "../node_modules/webpack/hot/dev-server"),
    path.join(__dirname, '../src/spa.js')
];
config.resolve = {
    extensions: ["." + webpackBase.EXTENSION_BROWSER + ".js", ".js", "." + webpackBase.EXTENSION_BROWSER + ".json", ".json"]
};
config.target = "web";
config.output = output;
config.externals = {};
config.devServer = {
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    // publicPath: "/",
    contentBase: path.join(__dirname, "../src")
}
config.plugins.push(
    new webpack.IgnorePlugin(new RegExp("\.(" + webpackBase.EXTENSION_SERVER + "\.js|" + webpackBase.EXTENSION_SERVER + "\.json)$"))
)
config.plugins.push(
    new CopyWebpackPlugin([
        {from: path.join(__dirname, "../build/" + dllManifest.name + ".js")}
    ])
);
config.plugins.push(
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "../src/index.html"),
        inject: false,
        chunksSortMode: "none",
        dlls: [
            dllManifest.name + ".js"
        ]
    })
);
config.plugins.push(
    new webpack.DllReferencePlugin({
        manifest: path.join(__dirname, "../build/manifest.json"),
    })
);

if (process.env.NODE_ENV === webpackBase.ENV_PRODUCTION) {
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    );
}
else {
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    );
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}

module.exports = config;

