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
```

## build

```shell
$ npm run build
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
- [x] ApplicationSetting
- [ ] ~~Axios~~
- [x] Loading
- [x] LoadingView
- [ ] ToastView
- [ ] Login
- [ ] Register
- [ ] FileUploader
- [ ] authentication
- [ ] 服务端redux,异步数据造成server render失效

## CSS Media Query

|key|media query|applies|
|----|----|----|
|sm|@media screen and (min-width: 35.5em)|≥ 568px|
|md|@media screen and (min-width: 48em)|≥ 768px|
|lg|@media screen and (min-width: 64em)|≥ 1024px|
|xl|@media screen and (min-width: 80em)|≥ 1280px|


