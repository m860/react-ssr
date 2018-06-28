# GuidLine

## component

- 一个组件对应一个文件
- 文件名和组件的`class`名称保持一致
- 组件一般都继承`Component`,如果使用不可变数据,可以使用`PureComponent`

## redux

- action的命名规范,所有的action都需要以`ACTION`开头,紧接着是action的分类,
  然后再是具体的操作,之间通过下划线链接,action对应的value值和名称保持一致,例如

  ```javascript
  const ACTION_PRODUCTION_FETCH="ACTION_PRODUCTION_FETCH";
  const ACTION_PRODUCTION_MAINTAIN="ACTION_PRODUCTION_MAINTAIN";
  ```