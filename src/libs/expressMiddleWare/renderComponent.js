import {renderToStaticMarkup, renderToString} from 'react-dom/server'

export default function(app){
	app.use((req, res, next)=> {
		if (res.renderComponent) {
			throw new Error('res.renderComponent is defined');
		}
		res.renderComponent = async function (Component, props = {}) {
			/*
			if (!Component.bundleName) {
				throw new Error(`bundleName is not defined in companent ${Component.name} .
			you must set as flow in ${Component.name} component and bundleName is same as filename:
			class ${Component.name} extends React.Component{
				static bundleName='YOUR BUNDLE NAME'
			}`);
			}
			*/
			/*
			let bundleName = Component.bundleName;
			let view = <Component {...props}/>;
			let bundles = renderBundle(bundleName);
			let vendorBundles = renderBundle('Vendor');
			if (!isProduction()) {
				if (bundles.scripts.push) {
					bundles.scripts.push(livereloadScript);
				}
			}
			*/
			let html = `
			<html>
			<head>
			</head>
			<body>
				<div id="view">
				${renderToStaticMarkup(
					
				)}
				</div>
				<script>
				window.__STATE__=${JSON.stringify(props)}
				</script>
				<script src="bundle.js"></script>
			</body>
			</html>
			`;
			res.send(html);
		};
		next();
	})
}