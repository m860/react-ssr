- [x] 路由数据抽离到`routes.config.js`中
- [x] 服务端渲染和客户端渲染初始化数据的协同
- [x] 完善`服务端渲染和客户端渲染初始化数据的协同`的文档和DEMO
- [x] _documentation_ 路由配置的说明文档
- [x] _feature_ upgrade webpack to v4,webpack 使用本地版本
    - [ ] _optimize_ 提高webpack编译速度,使用DllPlugin
    - [x] _feature_ style autoprefix 样式自动添加前缀
    - [ ] _feature_ HMR
    - [ ] _feature_ split chunks
- [x] _feature_ `uuid`替换`guid`
- [ ] _feature_ 实现一个resolve plugin(处理多平台引用问题)处理`.server.js`,`.browser.js`
      空引用的问题
- [x] _feature_ 异步页面的实现
- [ ] _optimize_ node使用webpack打包的时候不打包资源文件,如:.png .css .svg等
      如果直接使用webpack ignore的话会导致编译出问题,目前想到的一个方法是打包完成
      之后执行一个脚本把不需要的文件删除
- [ ] _feature_ 单元测试时无法区分.browser和.server后缀,导致找不到module.
      解决方法:使用babel resolve module实现不同扩展名的加载,但是目前这个插件有问题,
      等待插件bug修复了再看此问题,如果无法修复需要自己实现一个resolve module的插件
- [ ] _feature_ `fetchInitialState` 路由参数的实现
- [ ] _example_ 完成一个有路由参数的demo
- [ ] _optimize_ 如果服务端已经把页面初始化好了,在客户端就不需要再次初始化过程了,这样可以提高性能.
      这个过程只有页面在服务端渲染的时候需要控制,客户端代理了路由之后不需要做这样的控制.
