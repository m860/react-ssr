- [x] 路由数据抽离到`routes.config.js`中
- [x] 服务端渲染和客户端渲染初始化数据的协同
- [x] 完善`服务端渲染和客户端渲染初始化数据的协同`的文档和DEMO
- [x] _documentation_ 路由配置的说明文档
- [x] _feature_ upgrade webpack to v4,webpack 使用本地版本
    - [x] _optimize_ 提高webpack编译速度,使用DllPlugin
    - [x] _feature_ style autoprefix 样式自动添加前缀
    - [x] _feature_ HMR
        - [x] css HMR
        - [x] webpack配置文件拆分
        - [x] HMR不能在SSR模式下很好的运行,HMR只有在webpack-dev-server的模式下工作,所以在开发阶段使用SPA,发布的时候使用SSR
        - [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)
        - [react-hot-loader](https://github.com/gaearon/react-hot-loader)
    - ~~_feature_ split chunks~~ 不处理使用`AsyncComponent`来进行代码拆分
- [x] _feature_ `uuid`替换`guid`
- [ ] _feature_ 实现一个resolve plugin(处理多平台引用问题)处理`.server.js`,`.browser.js`
      空引用的问题
- [x] _feature_ 异步页面的实现
- [x] _optimize_ node使用webpack打包的时候不打包资源文件,如:.png .css .svg等
      如果直接使用webpack ignore的话会导致编译出问题,目前想到的一个方法是打包完成
      之后执行一个脚本把不需要的文件删除
- [ ] _feature_ 单元测试时无法区分.browser和.server后缀,导致找不到module.
      解决方法:使用babel resolve module实现不同扩展名的加载,但是目前这个插件有问题,
      等待插件bug修复了再看此问题,如果无法修复需要自己实现一个resolve module的插件
- [x] _feature_ `fetchInitialState` 路由参数的实现
      为了保证`fetchInitialState`能在服务端和客户端都能够正常运行,因此对方法的参数做了结构化,其数据结构如下:
      ```type
      type fetchInitialStateParam={
          query:?object,
          params:?object,
          //自定义参数,一般只有在客户端的才需要使用,服务端不会用到,使用之前需要判断空操作
          customData:?object
      };
      ```
- [x] 客户端第一次render的时候state没有数据,导致页面会没有数据,实际服务端返回的html是包含数据的
      在constructor中定义state的时候,使用getSSRState进行初始化.如果有服务端的状态优先使用服务端状态,否则为`{}`
- [ ] _example_ 完成一个有路由参数的demo
- [ ] _example_ 嵌套路由
    - [ ] _component_ 面包屑
- [ ] _component_ SlideMenu
- [ ] _optimize_ 如果服务端已经把页面初始化好了,在客户端就不需要再次初始化过程了,这样可以提高性能.
      这个过程只有页面在服务端渲染的时候需要控制,客户端代理了路由之后不需要做这样的控制.
- [ ] _bug_ 404服务端渲染有问题
- [ ] _tool_ 静态文件生成工具
- [ ] 添加flow静态类型检查
    - [ ] 支持自定义类型
- ~~添加`prepack`~~
- [x] `Base`基类支持`PureComponent`和`Component`两种形式,默认是'Component'
    - [x] 'Base'基类扩展'updateState',支持`async/await`
- [ ] 集成'Karma'