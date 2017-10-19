/**
 * @property {String} type ['info'] - info,warn,error
 * */
export type ToastType={
	message:String,
	duration:?Number,
	id:String,
	type:String
};

export type ActionType={
	type:String|Symbol,
	payload:any
};