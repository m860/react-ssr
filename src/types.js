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