# React SSR

[![Build Status](https://travis-ci.org/m860/react-ssr.svg?branch=master)](https://travis-ci.org/m860/react-ssr)
[![Coverage Status](https://coveralls.io/repos/github/m860/react-ssr/badge.svg?branch=master)](https://coveralls.io/github/m860/react-ssr?branch=master)

react server-slide render 例子,bundle使用webpack.

# Run Example

## 克隆项目并安装相关依赖

```shell
$ git clone https://github.com/m860/react-ssr.git
$ cd react-ssr
$ npm install
```

## development模式

```shell
$ npm run dev
```

## build

```shell
$ npm run build
```

## 如何实现服务端页面渲染前数据的初始化?

在实现这个功能的时候使用了injectState,`<Route/>`对应的component需要注入初始化数据(state),
如果component在服务端进行渲染我们就需要提供初始化的state,其具体逻辑是在component.fetchInitialState这个静态函数里实现的,
因此我们定义的所有页面(其实也是组件)都需要实现其`fetchInitialState`这个方法.
如果component在客户端渲染,这个state永远都为null,完整例子可以参考[InitialStateDamo.js](./src/components/pages/InitialStateDemo.js)

```javascript
//同步的初始化数据
class DemoSync extends React.Component{
    static fetchInitialState(){
        return {
            message:"hello world!"
        }
    }
    constructor(props){
        super(props);
        this.state={
            message:""
        }
    }
    componentDidMount(){
        const state=DemoSync.fetchInitialState();
        this.setState(state);
    }
}
//异步的初始化数据
class DemoAsync extends React.Component{
    static fetchInitialState(){
        return new Promise.resolve({
             message:"hello world!"
        })
    }
    constructor(props){
        super(props);
        this.state={
            message:""
        }
    }
    async componentDidMount(){
        const state=await DemoAsync.fetchInitialState();
        this.setState(state);
    }
}
```

需要注意一点,从服务端返回的html是包含了数据的完整html,一旦请求返回客户端会根据SPA的模式再次初始化数据再进行渲染,
所以在`componentDidMount`中需要做对应的数据初始化.

## 如何配置路由?

客户端和服务端的路由配置是分开配置的,分别在`routes.config.browser.js`和`routes.config.server.js`中,
分开配置的主要原因是因为客户端的页面需要处理code split而服务端不需要处理.

> 路由配置的属性除了`title`是自定义外,其他的属性配置都来源于`react-router/Route`中

> 服务端在启动的时候会对服务端和客户端的路由配置做一致性验证

### 如何实现code split

异步组件使用`@m860/react-async-component`实现,这是一个HOC组件.代码片段如下:

```javascript
{
    title: "Code Split",
    path: "/demo/codesplit",
    render: props => {
        return (
            <AsyncComponent components={[
                import("../components/pages/CodeSplit")
            ]}>
                {(CodeSplit) => {
                    return (
                        <CodeSplit {...props}/>
                    );
                }}
            </AsyncComponent>
        );
    },
    exact: true
}
```

> PS:服务端不能使用异步组件

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
- [ ] redux-persist
- [ ] authentication
- [ ] Video - [video-react](https://github.com/video-react/video-react)
- [ ] 响应式查询和表单维护,主要解决单表或者是业务单一的增删改查
    - 所有api都是post
    - 提交的formData是没有嵌套的简单Object
    - 列表返回的数据也是没有嵌套的简单Object
    - form表单目前只支持text,password
    - form表单支持以下样式`form-vertical` `form-horizontal` `form-flow`
- [x] 服务端redux,异步数据造成server render失效
- [x] client error 记录
- [x] 优化nodemon,经常挂掉无法自动重启
- [ ] 实现一个resolve plugin(处理多平台引用问题)处理`.server.js`,`.browser.js`空引用的问题
- [ ] 路由配置重构,实现服务端和客户端统一配置,分离服务端初始化数据
- [ ] `uuid`替换`guid`

## 平台说明

- `.browser.js`使用于浏览器
- `.server.js`使用于node服务端
- `.js`使用于浏览器和node服务端

PS:目前没有处理空引用的问题,如果要分平台创建必须为每个平台创建对应的文件,如果某一个平台没有对应的实现需要进行mock实现

## Components

- [x] `async` ApplicationSetting
- [x] Loading
- [x] LoadingView
- [x] Toast
- [ ] Breadcrumbs
- [ ] Tip
- [ ] Avatar
- [x] SoftKeyboard
- passport
    - [x] SingIn
    - [x] SingUp
    - [ ] ForgotPassword

## Component.ApplicationSetting

ApplicationSetting中的配置对应`/configuration/application-setting.json`

使用ApplicationSetting中的值

```javascript
class XXX extends React.PureComponent{
    static contextTypes={
        setting: PropTypes.any
    };
    componentDidMount(){
        console.log(this.context.setting);
    }
}
```

## Forms

- [x] `主要是针对输入控件` 实现validation
- [ ] `主要是针对输入控件` 实现clear,即在输入框的右边显示一个清除按钮,可以清空文本内容
- [x] Select,RadioButtons,CheckboxGroup 支持options
- [x] RadioButtons,CheckboxGroup 重写onChange事件

#### TextInput

对应HTMLElement `<input>`元素,建议作为`type=text` `type=password`进行使用,其他input类型请使用对应的form控件

```javascript
<TextInput
    validate={value=>{
        if(!/^.{6,8}$/.test(value)){
            this.pushError('name')
            return 'Please input 6~8 characters for name!'
        }
        this.popError('name');
    }}
    onChange={event=>{
        this.updateState({
            name:{$set:event.target.value}
        })
    }}
    label="Name"/>
```

#### TextArea

对应HTMLElement `<textarea>`元素

#### Select

对应HTMLElement `<select>`元素

```jsx
<Select
    options={[{
        key:-1,
        value:'-- Please Select Age --'
    },{
            key:1,
            value:1
        },{
            key:2,
            value:2
        }]}
    onChange={event=>{

        this.updateState({
            age:{$set:parseFloat(event.target.value)}
        })
    }}
    label="Age"/>
```

#### RadioButtons

`<input type="radio"/>`组控件

```jsx
<RadioButtons
    defaultValue={this.state.sex.toString()}
    options={[{
        key:'1',
        value:'male'
    },{
        key:'2',
        value:'female'
    }]}
    onChange={event=>{
        this.updateState({sex:{$set:parseInt(event.target.value)}})
    }}
    label="Sex"/>
```

#### ~~CheckBox~~ Switch
#### CheckboxGroup

`<input type="checkbox"/>`组控件

```jsx
<CheckboxGroup
    options={[{
        key:'1',
        value:'male'
    },{
        key:'2',
        value:'female'
    }]}
    label="CheckboxGroup"/>
```

#### File

## CSS Media Query

|key|media query|applies|
|----|----|----|
|sm|@media screen and (min-width: 35.5em)|≥ 568px|
|md|@media screen and (min-width: 48em)|≥ 768px|
|lg|@media screen and (min-width: 64em)|≥ 1024px|
|xl|@media screen and (min-width: 80em)|≥ 1280px|


