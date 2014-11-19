function AbstractView()
{
	this.controller = undefined;
	this.$tag = undefined;
	this.id = undefined;
	this.parent = undefined;
	this.childrenViews = new Array();
}

AbstractView._extends(AbstractObject);

AbstractView.prototype.destroy = function()
{	
	while (0 < this.childrenViews.length){
		this.childrenViews[0].destroy();
	}
	childrenViews = null;
	
	if (this.parent)
	{
		var index = this.parent.childrenViews.indexOf(this);
		this.parent.childrenViews.splice(index, 1);
	}
	
	AbstractView._super.destroy.call(this);
};

AbstractView.prototype.init = function(tag, parent){
	AbstractView._super.init.call(this);
	this.setParent(parent);
	if (this.parent && !this.controller)
		this.controller = this.parent.controller;

	this.$tag = jQuery(tag);
};

//private
AbstractView.prototype.addChildView = function(childView)
{
	if (this.childrenViews.indexOf(childView) === -1)
	{
		this.childrenViews.push(childView);
	}
};

AbstractView.prototype.setParent = function(parent){
	this.parent = parent;
	if (this.parent)
	{
		this.parent.addChildView(this);
	}
};
