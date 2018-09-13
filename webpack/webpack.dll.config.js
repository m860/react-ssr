var path = require("path");
var webpack = require("webpack");

var name = "[name]_[hash]";

var output = {
    path: path.join(__dirname, "../build"),
    filename: name + ".js",
    library: name
};

module.exports = {
    mode: "production",
    entry: {
        dll: [
            "babel-polyfill",
            "object-path",
            'react',
            'react-dom',
            "react-redux",
            "prop-types",
            "react-router-dom",
            "immutability-helper",
            "axios",
            "dateformat",
            "fbemitter",
            "uuid",
            "redux-persist",
            "redux",
            "redux-thunk"
        ]
    },
    output: output,
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "../build/manifest.json"),
            name: name
        })
    ]
};