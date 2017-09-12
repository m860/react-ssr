# React Server Example

react server render 例子,bundle使用webpack.

# Run Example

## 克隆项目并安装相关依赖

```shell
$ git clone https://github.com/m860/react-server-example.git
$ cd react-server-example
$ npm install
```

## production模式

```shell
$ npm run production
```

## development模式

开发模式需要开2个终端

第一个终端运行

```shell
$ npm run build:watch
```

第二个终端运行

```shell
$ npm run dev
```

## build

```shell
$ npm run build
```

# Usage

## 创建react component

每个component必须要引用react和react-dom

```javascript
import React ,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
```

如果component需要在browser中进行render还需要引用react.helper.js

```javascript
import {
	renderInBrowser
} from '../helpers/react.helper'
```

Test component完整代码及关键注释如下

```javascript
import React ,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
import '../assets/sass/test.sass'
import {
	renderInBrowser
} from '../helpers/react.helper'
import BaseComponent from './BaseComponent'

// ABCD是bundle name,会在bundle时候使用,后面会详细说明具体参数等
@renderInBrowser("ABCD")
export default class Test extends BaseComponent{
	static propTypes={
		title:PropTypes.string.isRequired
	}
	constructor(props){
		super(props)
		this.state={
			items:[]
		};
	}
	render(){
		return (
			<div>
				<h6>{this.props.title}</h6>
				<button onClick={event=>{
					let state=Object.assign({},this.state);
					state.items.push(state.items.length);
					this.setState(state);
				}}>New Item</button>
				<ul>
					{this.state.items.map((item,index)=>{
						return (
							<li key={index}>{item}</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
```

假设路由为/test,服务端代码如下:

```javascript
import Test from '../components/Test'

const router = Router();

router.get('/test', (req, res)=> {
	res.renderComponent(Test,{
		title:'abc'
	})
})
```

至此所有的代码完成,包括客户端代码.可以在浏览器中查看/test页面,同时可以查看其bundle内容.

# API

## renderInBrowser

renderInBrowser是标示component是否可以在客户端运行.格式如下:

* renderInBrowser(bundleName:String)
* renderInBrowser(options:{bundleName:String,element:?HtmlElement})

bundleName:指定bundle时使用的名字,必须唯一不能重复.另外bundle name只能由数字和字符组成.

element:是当component在客户端运行时render的target element.默认值是:document.getElementById("view")

## res.renderComponent

服务端render component,格式如下:

* res.renderComponent(Component:Object,props:?Object)