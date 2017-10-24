# React Server Example

react server render 例子,bundle使用webpack.

# Run Example

## 克隆项目并安装相关依赖

```shell
$ git clone https://github.com/m860/react-server-example.git
$ cd react-server-example
$ npm install
```

## development模式

```shell
$ npm run dev
$ npm run dev:spa #single page application
```

## build

```shell
$ npm run build
$ npm run build:spa #single page application
```

## Globals

### __SERVER__
### __SPA__


## 服务端render初始化页面数据

当在服务端render时,初始化的数据通过`this.context.data`进行传递.`Routes`配置时需要配置`initDataHandler`,内部需要实现数据的初始化,方法可以返回一个javascript对象或者是Promise对象.

```javascript
//route 配置
//PS:__SERVER__ 表示只有server才引用打包
<Route exact path="/test/fetchdata" component={require('./pages/TestFetchData').default}
		   initDataHandler={__SERVER__&&require('../initDataHandlers/users').default}/>

//example
class Example extends PureComponent{
	constructor(props,context){
		super(props);
		this.state={
			//如果context.data存在即服务端render,则使用初始化的数据,否则不使用
			users:context.data?context.data:[]
		};
	}
	fetchUsers(){
		//do something
		//客户端获取数据
	}
	render(){
		return (
			<ul>
                {this.state.users.map((user, index)=> {
                    return <li key={index}>{user.name}:{user.age}</li>
                })}
            </ul>
		);
	}
	componentDidMount(){
		this.fetchUsers();
	}
}
```

## TODO
- [x] AsyncComponent - 异步组件
    - [x] 服务端异步组件问题 - 在编译时解决,如果是服务端编译则不进行代码分割,如果是客户端编译则使用代码分割
        ```text
        // 使用webpack.DefinePlugin定义一个变量
        module.exports={
          ...
          plugins:[
              new webpack.DefinePlugin({
                    '__SERVER__': JSON.stringify(server)
                })
          ]
          ...
        };
        
        ```
        ```text
        // import module的时候按照下面的方式
        <Async modules={[__SERVER__?require('./pages/PageB.js').default: System.import('./pages/PageB.js')]}>
        {PageB=>{
            return <PageB/>
        }}
        </Async>
        ```
        
        生成的dist目录结构如下:
        
        <img src="https://raw.githubusercontent.com/m860/react-server-example/master/screenshot/dist.png"/>
        
- [x] redux
- [x] redux-persist
- [x] `async` ApplicationSetting
- [ ] ~~Axios~~
- [x] Loading
- [x] LoadingView
- [x] Toast
- [ ] Login
- [ ] Register
- [ ] FileUploader
- [ ] authentication
- [x] 服务端redux,异步数据造成server render失效
- [x] client error 记录

## CSS Media Query

|key|media query|applies|
|----|----|----|
|sm|@media screen and (min-width: 35.5em)|≥ 568px|
|md|@media screen and (min-width: 48em)|≥ 768px|
|lg|@media screen and (min-width: 64em)|≥ 1024px|
|xl|@media screen and (min-width: 80em)|≥ 1280px|


