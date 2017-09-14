var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var StatsPlugin = require('stats-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var nodeModules = {};
fs.readdirSync(path.join(__dirname, 'node_modules'))
	.filter(x => ['.bin'].indexOf(x) === -1)
	.forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

var config = function (server, env) {
	var isProduction = env !== 'development';
	var configuration = {
		entry: path.join(__dirname, 'src', server ? 'server.js' : "client.js"),
		target: server ? 'node' : "web",
		output: {
			path: path.join(__dirname, 'dist', server ? '' : 'public'),
			filename: server ? 'server.js' : "bundle.js",
			chunkFilename: isProduction ? '[chunkhash].js' : '[id].[chunkhash].js',
			publicPath: server ? '' : '/public/'
		},
		externals: (server ? nodeModules : {}),
		devtool: isProduction ? 'source-map' : "",
		module: {
			rules: [{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader'
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
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "css-loader"
					}]
				})
			}, {
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader?name=" + (isProduction ? "[hash]" : "[name]") + ".[ext]"
			}, {
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff&name=" + (isProduction ? "[hash]" : "[name]") + ".[ext]"
			}, {
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=' + (isProduction ? "[hash]" : "[name]") + '.[ext]',
					'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}]
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: "index.html",
				template: './src/index.html',
				inject: false
			})

			 , new StatsPlugin('stats.json', {
			 chunkModules: true,
			 exclude: [/node_modules/]
			 })

			, new ExtractTextPlugin(isProduction ? "[contenthash].css" : "[name].[contenthash].css")
			, new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
				}
			})
			, new webpack.LoaderOptionsPlugin({
				options: {
					postcss: [
						autoprefixer({
							browsers: ['> 5%']
						})
					]
				}
			}),
			new CleanWebpackPlugin([server ? 'dist' : "dist/public"], {
				root: __dirname,
				verbose: true,
				dry: false
			})
		]
	};
	if (isProduction) {
		configuration.plugins.push(new UglifyJSPlugin({
			comments: false,
			compress: {
				warnings: false,
				drop_console: true
			}
		}));
	}
	return configuration;
};

module.exports = function (env) {
	if (!env) {
		env = {};
	}
	if (!env.NODE_ENV) {
		env.NODE_ENV = 'development';
	}
	var NODE_ENV = env.NODE_ENV;
	console.log('**********************');
	console.log('* ' + NODE_ENV);
	console.log('**********************');
	return [config(true, NODE_ENV), config(false, NODE_ENV)];
};