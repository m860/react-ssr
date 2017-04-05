/**
 * Created by jean.h.ma on 3/24/17.
 */
var path = require("path");
var webpack = require("webpack");
var fs = require("fs");
var walkSync = require("walk").walkSync;
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var EventCallbackWebpackPlugin = require("event-callback-webpack-plugin").default
var helper = require("./helpers/helper.es5");
var isProduction = helper.isProduction;
var displayEnvironment = helper.displayEnvironment;
var hash=require("string-hash");

displayEnvironment();

var entries = {
	Vendor: [
		"babel-polyfill",
		"react",
		"react-dom",
		"react-router",
		"classnames",
		"immutability-helper"
	]
};
walkSync(path.resolve(__dirname, 'components'), {
	listeners: {
		file: function (root, fileStats, next) {
			if (/\.js$/i.test(fileStats.name)) {
				var filepath = path.resolve(root, fileStats.name);
				var content = fs.readFileSync(filepath);
				if (content.indexOf('@renderInBrowser') > 0) {
					var bundleName = helper.getBundleName(filepath);
					// var filename = fileStats.name.replace(path.extname(fileStats.name), '');
					entries[bundleName] = filepath;
				}
			}
			next();
		},
		error: function (err) {
			throw err;
		}
	}
});

var plugins = [
	/*new webpack.ProvidePlugin({
		React: 'react'
		, ReactDOM: "react-dom"
		, classnames: "classnames"
		, "$update": "immutability-helper"
	})
	, */new EventCallbackWebpackPlugin('done', function (compilation) {
		var stats = compilation.toJson();
		var bundles = stats.assetsByChunkName;
		var bundleHash=hash(JSON.stringify(bundles));
		var bundlesPath=path.resolve(__dirname, 'dist/built/bundles.json');
		if(fs.existsSync(bundlesPath)){
			var oldBundleStr=fs.readFileSync(bundlesPath,'utf8');
			var oldBundleHash=hash(oldBundleStr);
			if(bundleHash!==oldBundleHash){
				fs.writeFileSync(bundlesPath, JSON.stringify(bundles));
			}
		}
		else{
			fs.writeFileSync(bundlesPath, JSON.stringify(bundles));
		}
	})
	, new webpack.LoaderOptionsPlugin({
		options: {
			postcss: [
				autoprefixer({
					browsers: ['> 5%']
				})
			],
			babel: {
				plugins: [
					"transform-decorators-legacy"
				]
			}
		}
	})
	, new webpack.optimize.CommonsChunkPlugin({
		name: "Vendor",
		filename: isProduction() ? "Vendor.[hash].js" : "Vendor.js"
	})
	, new ExtractTextPlugin(isProduction() ? "[contenthash].css" : "[name].css")
	, new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		}
	})

];
if (isProduction()) {
	plugins.push(
		new UglifyJSPlugin({
			comments: false,
			compress: {
				warnings: false,
				drop_console: true
			}
		})
	)
}


var config = {
	entry: entries,
	target: "web",
	output: {
		path: path.resolve(__dirname, 'dist/built/bundle'),
		filename: isProduction() ? '[hash].js' : '[name].js'
		, chunkFilename: isProduction() ? "[chunkhash].js" : "[name].js"
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader'
			}, {
				loader: "eslint-loader",
				options: {
					configFile: isProduction() ? path.resolve(__dirname, ".eslintrc") : path.resolve(__dirname, ".dev.eslintrc")
				}
			}],
			exclude: /node_modules/
		}, {
			test: /\.sass$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [{
					loader: "css-loader"
				}, {
					loader: "postcss-loader"
				}, {
					loader: "sass-loader"
				}]
			})
		}, {
			test: /\.css$/,
			loader: isProduction() ? ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [{
					loader: "css-loader"
				}]
			}) : ["style-loader", "css-loader"]
		}, {
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: isProduction() ? "file-loader" : "file-loader?name=[name].[ext]"
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: isProduction() ? "url-loader?limit=10000&mimetype=application/font-woff" : "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]"
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: [
				isProduction() ? 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]' : 'file-loader?hash=sha512&digest=hex&name=[name].[ext]',
				'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
			]
		}]
	},
	plugins: plugins
};

if (!isProduction()) {
	config.devtool = "#inline-source-map";
}

module.exports = config;