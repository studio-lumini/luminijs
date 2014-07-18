function SelectionController()
{
	this.model = undefined;
}

SelectionController._extends(AbstractObject);

SelectionController.prototype.destroy = function(){
	if(this.model !== undefined){
		this.model.destroy();
		this.model = null;
	}
};

SelectionController.prototype.init = function(){
	this.createModel();
};

SelectionController.prototype.createModel = function(){
	this.model = new SelectionModel();
};

SelectionController.prototype.goNext = function(current)
{
	var index = jQuery.inArray(this.model.current, this.model.scope);
	this.model.setCurrent(this.model.scope[(index+1)%this.model.scope.length]);
};

SelectionController.prototype.setState = function(state){
	if(this.model === undefined) return;
	if(this.model.state !== state){
		this.model.setState(state);
	}
};

SelectionController.prototype.setCurrent = function(current){
	if(this.model === undefined) return;
	if(this.model.current !== current){
		this.model.setCurrent(current);
	}
};

SelectionController.prototype.setOver = function(over){
	if(this.model === undefined) return;
	if(this.model.over !== over){
		this.model.setOver(over);
	}
};

SelectionController.prototype.setScope = function(scope){
	this.model.setScope(scope);
};

SelectionController.prototype.goPrevious = function()
{
	var scope = this.model.scope;
	var index = jQuery.inArray(this.model.current, scope);
	this.setCurrent(scope[(index-1+scope.length)%scope.length]);
};

SelectionController.prototype.goNext = function()
{
	var scope = this.model.scope;
	var index = jQuery.inArray(this.model.current, scope);
	this.setCurrent(scope[(index+1)%scope.length]);
};
