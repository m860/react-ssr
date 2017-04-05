/**
 * Created by jean.h.ma on 3/15/17.
 */
import express from 'express'
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {renderToStaticMarkup, renderToString} from 'react-dom/server'
import path from 'path'
import routers from './routers'
import config from './config/express.config'
import 'colors'
import {displayEnvironment, isProduction} from './helpers/helper.es5'
import fs from 'fs'
import 'babel-polyfill'
import Table from 'cli-table2'
import 'colors'


let bundleMap;

const livereloadScript = `
<script>
document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
	':35729/livereload.js?snipver=1"></' + 'script>')
</script>
`;

displayEnvironment();

const app = express();

function renderBundle(bundleName) {
	let chunks = bundleMap[bundleName];
	let result = {
		scripts: [],
		styles: []
	};
	if (chunks) {
		if (chunks.map) {
			chunks.map(item=> {
				if (/\.js$/.test(item)) {
					result.scripts.push(`<script type="text/javascript" src="/bundle/${item}"></script>`);
				}
				if (/\.css$/.test(item)) {
					result.styles.push(`<link rel="stylesheet" href="/bundle/${item}"/>`);
				}
			});
		}
		else {
			if (/\.js$/.test(chunks)) {
				result.scripts.push(`<script type="text/javascript" src="/bundle/${chunks}"></script>`);
			}
			if (/\.css$/.test(chunks)) {
				result.styles.push(`<link rel="stylesheet" href="/bundle/${chunks}"/>`);
			}
		}
	}
	else {
		console.warn(`bundleName '${bundleName}' is not found`.yellow);
	}
	return result;
}

app.use('/bundle', express.static('./built/bundle'));

app.use((req, res, next)=> {
	if (res.renderComponent) {
		throw new Error('res.renderComponent is defined');
	}
	res.renderComponent = async function (Component, props = {}) {
		if (!Component.bundleName) {
			throw new Error(`bundleName is not defined in companent ${Component.name} .
			you must set as flow in ${Component.name} component and bundleName is same as filename: 
			class ${Component.name} extends React.Component{
				static bundleName='YOUR BUNDLE NAME'
			}`);
		}
		let bundleName = Component.bundleName;
		let view = <Component {...props}/>;
		let bundles = renderBundle(bundleName);
		let vendorBundles = renderBundle('Vendor');
		if (!isProduction()) {
			if (bundles.scripts.push) {
				bundles.scripts.push(livereloadScript);
			}
		}
		let html = `
			<html>
			<head>
			</head>
			${bundles.styles.join('\n')}
			<body>
				<div id="view">
				${renderToStaticMarkup(view)}
				</div>
				<script>
				window.__STATE__=${JSON.stringify(props)}
				</script>
				${vendorBundles.scripts.join('\n')}
				${bundles.scripts.join('\n')}
			</body>
			</html>
			`;
		res.send(html);
	};
	next();
})

routers.map((router)=> {
	router(app);
})

app.listen(config.port, ()=> {
	bundleMap = JSON.parse(fs.readFileSync('./built/bundles.json'));
	let table = new Table({
		head: ['bundle name', 'values']
	})
	for (let key in bundleMap) {
		let values;
		if (bundleMap[key].join) {
			values = bundleMap[key].join(',')
		}
		else {
			values = bundleMap[key];
		}

		table.push(
			[key, values]
		);
	}
	console.log(table.toString())
	console.log(`please access http://127.0.0.1:${config.port} in browser`);
});

if (!isProduction()) {
	let livereload = require('livereload')
	let lrserver = livereload.createServer({
		//delay:5*1000,
		usePolling: true
	});
	lrserver.watch('./built/bundle');
}






