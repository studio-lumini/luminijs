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

SelectionController.prototype.setLooping = function(looping){
    if(this.model.looping !== looping){
        this.model.setLooping(looping);
    }
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
	var index = scope.indexOf(this.model.current);
    if (index != 0 || (index == 0 && this.model.looping))
	    this.setCurrent(scope[(index-1+scope.length)%scope.length]);
};

SelectionController.prototype.goNext = function()
{
	var scope = this.model.scope;
    var index = scope.indexOf(this.model.current);
    if (index != scope.length - 1 || (index == scope.length - 1 && this.model.looping))
	    this.setCurrent(scope[(index+1)%scope.length]);
};
