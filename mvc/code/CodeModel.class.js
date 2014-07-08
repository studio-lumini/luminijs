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
};

CodeModel.prototype.initializeBuffer = function(){
	this.buffer = new Array();
};

CodeModel.prototype.dispatchComplete = function(){
	jQuery(this).trigger(CodeEvent.CODE_COMPLETE);
	this.initializeBuffer();
};
