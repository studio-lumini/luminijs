function CodeModel(){
	this.code = new Array();
	this.buffer = new Array();
}

CodeModel.prototype.code = '';
CodeModel.prototype.buffer = '';

CodeModel.prototype.setCode = function(code){
	this.code = code;
};

CodeModel.prototype.push = function(element){
	this.buffer.push(element);
	jQuery(this).trigger(CodeEvent.DIGIT_PUSHED);
};

CodeModel.prototype.initializeBuffer = function(){
	this.buffer = new Array();
};

CodeModel.prototype.dispatchComplete = function(){
	jQuery(this).trigger(CodeEvent.CODE_COMPLETE);
};

CodeModel.prototype.dispatchCompleteWrong = function(){
	jQuery(this).trigger(CodeEvent.CODE_COMPLETE_WRONG);
};
