function PermutationCodeController(){
}
PermutationCodeController.prototype = new CodeController();

PermutationCodeController.prototype.canPush = function(element) {
	if(this.model.buffer.length == 0) return true;
	var lastIndex = this.model.code.indexOf(this.model.buffer[this.model.buffer.length-1]);
	return this.model.code[(lastIndex+1)%this.model.code.length] == element;
};
