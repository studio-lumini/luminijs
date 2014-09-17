function KeyboardCodeController(){}

KeyboardCodeController._extends(FlushingCodeController);

KeyboardCodeController.prototype.init = function()
{
	KeyboardCodeController._super.init.call(this);
	
	this.bind(document, 'keydown', this.onKeyDown);
};

KeyboardCodeController.prototype.onKeyDown = function(event)
{
	this.push(String.fromCharCode(event.keyCode));
};
