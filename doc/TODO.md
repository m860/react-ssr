- [x] 路由数据抽离到`routes.config.js`中
- [x] 服务端渲染和客户端渲染初始化数据的协同
- [x] 完善`服务端渲染和客户端渲染初始化数据的协同`的文档和DEMO
- [ ] 提高webpack编译速度
- [x] `uuid`替换`guid`
- [ ] 实现一个resolve plugin(处理多平台引用问题)处理`.server.js`,`.browser.js`空引用的问题
- [ ] code split
- [ ] node使用webpack打包的时候不打包资源文件,如:.png .css .svg等
      如果直接使用webpack ignore的话会导致编译出问题,目前想到的一个方法是打包完成之后执行一个脚本把不需要的文件删除
- [ ] 单元测试时无法区分.browser和.server后缀,导致找不到module.
      解决方法:使用babel resolve module实现不同扩展名的加载,但是目前这个插件有问题,等待插件bug修复了再看此问题,如果无法修复需要自己实现一个resolve module的插件