function CodeController(){

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
		if(this.canPush(element)){
			this.model.push(element);
		}else{
			this.model.initializeBuffer();
			if(this.canPush(element)){
				this.model.push(element);
			}
		}
		if(this.model.buffer.length == this.model.code.length){
			this.model.dispatchComplete();
			this.model.initializeBuffer();
		}
	};
	CodeController.prototype.flush = function() {
		this.model.initializeBuffer();
	};
	CodeController.prototype.canPush = function(element) {
		return this.model.code[this.model.buffer.length] == element;
	};
}
