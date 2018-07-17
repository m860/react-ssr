# GuidLine

## component

- 一个组件对应一个文件
- 文件名和组件的`class`名称保持一致
- 组件一般都继承`Component`,如果使用不可变数据,可以使用`PureComponent`

## redux

- action的命名规范,所有的action都需要以`ACTION`开头,紧接着是action的分类,
  然后再是具体的操作,之间通过下划线链接,action对应的value值和名称保持一致,例如

  ```javascript
  const ACTION_PRODUCTION_FETCH=Symbol("ACTION_PRODUCTION_FETCH");
  const ACTION_PRODUCTION_MAINTAIN=Symbol("ACTION_PRODUCTION_MAINTAIN");
  ```

  ## 通用

  - 禁止使用全局变量或者方法
  - 写好注释,对于复杂业务建议先写注释,再写代码.只是的格式按照jsdoc的标准格式做
  - 对于复杂业务对象需要在`types.js`定义`type`,并使用flow语法

  ## 异步方法的定义和使用

  - 所有的异步方法(包括setTimeout,Promise,axios)都必须以`Async`结尾,同步方法不能加
      ```javascript
      function fetchUserInfoAsync(){
          //do something
      }
      ```

  - 所以异步方法的调用都必须要`async/await`的方式进行调用,就算是方法不返回任何值,
    也必须使用await.async已经表明是异步方法了,所以所有`async`声明的方法必须加后缀`Async`
      ```javascript
      async testAsync(){
          const {data}=await fetchUserInfoAsync();
          //do something
      }
      async test2Async(){
          await fetchUserInfoAsync();
      }
      ```

  - 不能定义带callback的异步方法,必须使用`Promise`.(非常特殊需求除外,需要在注释中说明)

  ## 如何正确的从Object/Array中取值不报错,或者是返回默认值

  一般情况下我们都是先判断一个Object/Array中是否有我们需要的值,仅有的时候再取值,
  对于层次很深的Object/Array需要写很多判断,为了减少代码的嵌套和提高容错性使用`object-path`来完成这个取值动作.
  更多用法参见[object-path](https://github.com/mariocasciaro/object-path)
  ```javascript

  import {get as getPath} from 'object-path'

  //get
  const value1=getPath(obj,"a.b.c");
  //hello 是默认值
  const value2=getPath(obj,"a.b.c","hello");
  //数组取值
  const value3=getPath(arr,'10');

  ```

  ## React Component的定义和使用

  - Component的定义,默认情况下一个文件一个Component,文件名和Component的名字一一对应,且名字所有的首字母大写,严禁使用简写
      ```javascript
      //User.js
      class User extends Component{

      }
      ```

  - Component的引用,默认情况下引用的名字和原Component的名字保持一致
      ```javascript
      import User from 'User'
      ```

  ## Redux的定义

  所有的reducer和action都定义在一个文件中,文件名以`.ar.js`结尾,文件放在`/ar`文件夹下.
  定义好的文件需要在`/ar/index.js`中进行引用,以下是一个标准的reducer和action的定义

  ```javascript
  //test.ar.js
  import update from 'immutability-helper'
  import guid from 'guid'

  const ACTION_PUSH_MESSAGE=guid();
  const ACTION_REMOVE_ALL_MESSAGE=guid();

  export function pushMessage(message){
      return {
          type:ACTION_PUSH_MESSAGE,
          payload:message
      };
  }

  export function removeAllMessage(){
      return {
          type:ACTION_REMOVE_ALL_MESSAGE
      }
  }

  const initialState = {
      list:[]
  };

  export default function(state=initialState,action={}){
      switch(action.type){
          case ACTION_PUSH_MESSAGE:
              return update(state,{
                  list:{$push:[action.payload]}
              })
          case ACTION_REMOVE_ALL_MESSAGE:
              return update(state,{
                  list:{$set:[]}
              })
          default:
              return state;
      }
  }
  ```


  ## Web Style的定义

  - app.sass/app.css是样式的入口文件,其他的样式都在这里通过import的方式进行引用
  - 默认情况下一个页面或者Component对应一个样式文件
  - 对于相同功能的多个Component可以把样式定义在同一个文件中

  ## 多语言

  所有的多语言的配置都在`assets/languages`.针对每种语言都有一个`.json`文件,目前只有中文的定义.
  系统会根据系统语言自动切换,默认是中文.使用如下:

  ```javascript
  import strings from '/assets/languages'

  strings[KEY]

  ```