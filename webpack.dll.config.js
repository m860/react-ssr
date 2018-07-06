var path = require("path");
var webpack = require("webpack");
var CleanWebpackPlugin = require('clean-webpack-plugin')

var name = "[name]_[hash]";

module.exports = {
    mode: "production",
    entry: {
        dll: [
            'react',
            'react-dom',
            "react-redux",
            "prop-types",
            "react-router-dom",
            "immutability-helper",
            "axios",
            "dateformat",
            "fbemitter",
            "@m860/react-async-component",
            "uuid",
            "redux-persist",
            "redux",
            "redux-thunk"
        ]
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: name + ".js",
        library: name
    },
    plugins: [
        new CleanWebpackPlugin(["build"], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, "build/manifest.json"),
            name: name
        })
    ]
};