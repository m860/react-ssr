/**
 * @property {String} type ['info'] - info,warn,error
 * @property {?Number} duration [5000] - 消息在页面上的存在的持续时间(包括动画的时间)
 * @property {?Number} timeout [200] - 动画时间
 * */
export type ToastType={
	message:String,
	duration:?Number,
	timeout:?Number,
	id:String,
	type:String
};

export type ActionType={
	type:String|Symbol,
	payload:any
};

export type ResponsiveMaintainAction={
	url:String,
	authentication:?Boolean,
	fields:Array<{
		label:String,
		name:String,
		valueFrom:{
			from:'params'|'query'|'component',
			path:?String,
			component:{
				name:String,
				//such as TextInput.propTypes or Select.propTypes
				props:?Object
			}
		},
	}>,
	//form表单使用的样式 form-vertical form-horizontal form-flow form-filter
	className:?String
}

export type ResponsiveMaintain={
	actions:{
		insert:?ResponsiveMaintainAction,
		update:?ResponsiveMaintainAction,
		delete:?ResponsiveMaintainAction,
		select:?ResponsiveMaintainAction
	},
	permissions:{
		insert:Boolean,
		update:Boolean,
		delete:Boolean,
		select:Boolean,
	},
	//DataTable.propTypes
	dataTableProps:Object
};
