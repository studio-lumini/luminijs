function AbstractView()
{
	this.controller = undefined;
	this.tag = undefined;
	this.id = undefined;
	this.parent = undefined;
}

AbstractView.prototype.destroy = function(){};

AbstractView.prototype.init = function(tag, parent){
	this.parent = parent;
	if (this.parent && !this.controller)
		this.controller = this.parent.controller;
	
	window.namespaceId = window.namespaceId? window.namespaceId: 1;
	this.namespaceId = window.namespaceId++;
	this.tag = jQuery(tag);
};

AbstractView.prototype.bind = function(target,event,listener){
	jQuery(target).bind(event+"."+this.namespaceId, jQuery.proxy(listener, this));
};

AbstractView.prototype.unbind = function(target,event,listener){
	jQuery(target).unbind(event+"."+this.namespaceId, jQuery.proxy(listener, this));
};
