/**
 * Parent class of FlushingCodeController. Waits for all digits to have been
 * input, then dispatches granted or denied. FlushingCodeController is the same,
 * except for it flushes buffer on first wrong digit.
 */

function CodeController() {
}

CodeController._extends(AbstractObject);

CodeController.prototype.init = function() {
	this.createModel();
};

CodeController.prototype.createModel = function() {
	this.model = new CodeModel();
};

CodeController.prototype.setCode = function(code) {
	this.model.setCode(code);
};

CodeController.prototype.push = function(element) {
	this.model.push(element);
	if (this.model.buffer.length == this.model.code.length) {
		if (this.model.buffer.equals(this.model.code)) {
			this.model.dispatchComplete();
			this.flush();
		} else {
			this.model.dispatchCompleteWrong();
			this.flush();
		}
	}
};

CodeController.prototype.flush = function() {
	this.model.initializeBuffer();
};
