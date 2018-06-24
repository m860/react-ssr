type ResponsiveMaintainAction = {
    url: String,
    authentication: ?Boolean,
    fields: Array<{
        label: String,
        name: String,
        valueFrom: {
            from: 'params' | 'query' | 'component',
            path: ?String,
            component: {
                name: String,
                //such as TextInput.propTypes or Select.propTypes
                props: ?Object
            }
        },
    }>,
    //form表单使用的样式 form-vertical form-horizontal form-flow form-filter
    className: ?String
}

export default ResponsiveMaintainAction;