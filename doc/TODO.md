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
- [x] `uuid`替换`guid`
- [ ] 实现一个resolve plugin(处理多平台引用问题)处理`.server.js`,`.browser.js`
      空引用的问题
- [x] 异步页面的实现
- [x] node使用webpack打包的时候不打包资源文件,如:.png .css .svg等
      如果直接使用webpack ignore的话会导致编译出问题,目前想到的一个方法是打包完成
      之后执行一个脚本把不需要的文件删除
- [ ] 单元测试时无法区分.browser和.server后缀,导致找不到module.
      解决方法:使用babel resolve module实现不同扩展名的加载,但是目前这个插件有问题,
      等待插件bug修复了再看此问题,如果无法修复需要自己实现一个resolve module的插件
- [x] 客户端第一次render的时候state没有数据,导致页面会没有数据,实际服务端返回的html是包含数据的
      在constructor中定义state的时候,使用getSSRState进行初始化.如果有服务端的状态优先使用服务端状态,否则为`{}`
- [x] 完成一个有路由参数的demo
- [ ] 嵌套路由的demo
    - [ ] 面包屑
- [ ] SlideMenu
- [x] 如果服务端已经把页面初始化好了,在客户端就不需要再次初始化过程了,这样可以提高性能.
      这个过程只有页面在服务端渲染的时候需要控制,客户端代理了路由之后不需要做这样的控制.
- [ ] 404服务端渲染有问题
- [ ] 静态文件生成工具
- [ ] 添加flow静态类型检查
    - [ ] 支持自定义类型
- ~~添加`prepack`~~
- [x] `Base`基类支持`PureComponent`和`Component`两种形式,默认是'Component'
    - [x] 'Base'基类扩展'updateState',支持`async/await`
- [ ] 集成'Karma'
- 测试api使用[tvmaze](http://www.tvmaze.com/api)
- [x] 以`SPA`模式运行时,使用android手机访问页面异常.Promise的判断有问题,使用特性判断解决了
- [ ] `.browserslistrc`对`babel-preset-env`没有生效 : babel 7.x 才开始支持
- [x] BasePage 需要废弃掉,所有的组件只使用Component或者PureComponent
- [x] 取消`.browser`和`.server`的文件区分,如果存在这种差异,使用特性检查来做