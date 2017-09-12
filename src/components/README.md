* 文件的命名必须以大写开头
* 如果是客户端和服务端共用的组件,必须定义bundleName且值必须,同时需要添加decorator(renderInBrowser)如:
```javascript
@renderInBrowser("BUNDLE_NAME")
class XXX extends Component{
}
```
或者
```javascript
@renderInBrowser({
	bundleName:"BUNDLE_NAME"
})
class XXX extends Component{
}
```
* 每个页面必须应用如下库
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
```