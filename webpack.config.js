var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var StatsPlugin = require('stats-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin')
var EventCallbackWebpackPlugin = require('event-callback-webpack-plugin').default
var exec = require('child_process').exec;
var openurl = require('openurl')

var running = false;

var nodeModules = {};
fs.readdirSync(path.join(__dirname, 'node_modules'))
	.filter(x => ['.bin'].indexOf(x) === -1)
	.forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

var config = function (server, env, options) {
	var isProduction = env !== 'development';
	var configuration = {
		entry: path.join(__dirname, 'src', server ? 'server.js' : "client.js"),
		target: server ? 'node' : "web",
		output: {
			path: path.join(__dirname, 'dist', server ? '' : 'public'),
			filename: server ? 'server.js' : "bundle.js",
			chunkFilename: isProduction ? '[chunkhash].js' : '[id].js',
			publicPath: server ? '' : (options.spa ? '' : '/public/')
		},
		externals: (server ? nodeModules : {}),
		devtool: isProduction ? 'source-map' : "",
		resolve: {
			alias: {
				'initDataHandlers': 'export default void 0'
			},
			extensions: server ? [".server.js", ".js", ".server.json", ".json"] : [".client.js", ".js", ".client.json", ".json"]
		},
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
			new webpack.IgnorePlugin(server ? /\.(client\.js|client\.json)$/ : /\.(server\.js|server\.json)$/),
			new HtmlWebpackPlugin({
				filename: "index.html",
				template: './src/index.html',
				inject: false
			})
			/*
			 , new StatsPlugin('stats.json', {
			 chunkModules: true,
			 exclude: [/node_modules/]
			 })
			 */
			, new ExtractTextPlugin(isProduction ? "[contenthash].css" : "[name].css")
			, new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
				},
				'__SERVER__': JSON.stringify(server),
				'__SPA__': JSON.stringify(options.spa)
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
			}),
			new webpack.HotModuleReplacementPlugin(),
			new LiveReloadPlugin(),
			new EventCallbackWebpackPlugin('done', () => {
				if (!running && env === 'development') {
					running = true;
					console.log('start server ...');
					var delay = 10;
					exec('cd dist && ../node_modules/nodemon/bin/nodemon.js server.js --delay ' + delay + ' --ignore ../src').stdout.pipe(process.stdout);
					setTimeout(function () {
						if (server) {
							openurl.open('http://127.0.0.1:3000');
						}
						if (options.spa) {
							openurl.open('file://' + path.resolve(path.join(__dirname, 'dist/public/index.html')));
						}
					}, delay * 1000);
				}
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
	return [config(true, NODE_ENV, env), config(false, NODE_ENV, env)];
};