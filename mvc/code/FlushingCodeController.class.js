function FlushingCodeController() {
}

FlushingCodeController._extends(CodeController);

FlushingCodeController.prototype.push = function(element) {
	if (this.canPush(element)) {
		this.model.push(element);
	} else {
		this.flush();
		if (this.canPush(element)) {
			this.model.push(element);
		}
	}
	if (this.model.buffer.length == this.model.code.length) {
		this.model.dispatchComplete();
		this.flush();
	}
};

FlushingCodeController.prototype.canPush = function(element) {
	return this.model.code[this.model.buffer.length] == element;
};
