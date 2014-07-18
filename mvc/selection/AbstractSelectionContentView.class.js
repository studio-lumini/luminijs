function AbstractSelectionContentView(){
	AbstractView.call(this);
}

AbstractSelectionContentView._extends(AbstractView);

AbstractSelectionContentView.prototype.destroy = function()
{
	this.unbindAll();
	this.tag.remove();
};

AbstractSelectionContentView.prototype.unbindAll = function()
{
	this.unbind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED, this.onCurrentUpdated);
};

AbstractSelectionContentView.prototype.init = function(tag){
	AbstractSelectionContentView._super.init.call(this, tag);
	
	if (this.id === undefined || this.controller === undefined)
		throw new Error('Id or controller undefined.');
	this.bind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED, this.onCurrentUpdated);
};

AbstractSelectionContentView.prototype.onCurrentUpdated = function(){
	if(this.controller.model.current === this.id){
		this.show();
	}else{
		this.hide();
	}
};

AbstractSelectionContentView.prototype.show = function(){
	this.tag.show();
};

AbstractSelectionContentView.prototype.hide = function(){
	this.tag.hide();
};
