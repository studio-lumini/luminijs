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

AbstractView.prototype.bind = function(target,event,listener){
	jQuery(target).bind(event+"."+this.namespaceId, jQuery.proxy(listener, this));
};

AbstractView.prototype.unbind = function(target,event,listener){
	jQuery(target).unbind(event+"."+this.namespaceId, jQuery.proxy(listener, this));
};
