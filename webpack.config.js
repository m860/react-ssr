var browserWebpackOptions = require("./webpack.browser.config");
var serverWebpackOptions = require("./webpack.server.config");
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = function () {
    return [
        {
            plugins: [
                new CleanWebpackPlugin(["dist/public"], {
                    root: __dirname,
                    verbose: true,
                    dry: false
                }),
            ]
        },
        browserWebpackOptions,
        serverWebpackOptions
    ];
};
