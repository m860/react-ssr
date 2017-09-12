/**
 * Created by jean.h.ma on 3/21/17.
 */
import React from 'react'
import ReactDOM from 'react-dom'

type renderInBrowserOption={
	element:?HTMLElement,
	bundleName:String
}

export function renderInBrowser(options: renderInBrowserOption = {}) {
	let bundleName, element;
	if (typeof options === "string") {
		bundleName = options;
		if (typeof window !== "undefined") {
			element = document.getElementById("view");
		}
	}
	else {
		if (typeof options === "object") {
			if (!options.bundleName) {
				throw new Error(`Please provide parameter options.bundleName`);
			}
			else {
				bundleName = options.bundleName;
			}
			if (!options.element) {
				if (typeof window !== "undefined") {
					element = document.getElementById("view");
				}
			}
			else {
				element = options.element;
			}
		}
	}

	if(!/[0-9a-z]*/i.test(bundleName)){
		throw new Error(`bundleName : ${bundleName} must be made up of numbers and characters`)
	}

	return function (RootComponent) {
		if (typeof window !== "undefined") {

			ReactDOM.render(
				<RootComponent {...window.__STATE__}/>,
				element
			)
		}
		return class WrapperComponent extends RootComponent {
			static bundleName = bundleName
		}
	}
}