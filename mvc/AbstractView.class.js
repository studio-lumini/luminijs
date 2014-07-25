function AbstractView()
{
	this.controller = undefined;
	this.tag = undefined;
	this.id = undefined;
	this.parent = undefined;
}

AbstractView._extends(AbstractObject);

AbstractView.prototype.init = function(tag, parent){
	AbstractView._super.init.call(this);
	this.parent = parent;
	if (this.parent && !this.controller)
		this.controller = this.parent.controller;

	this.tag = jQuery(tag);
};
