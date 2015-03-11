function AbstractObject()
{
	this.namespaceId = undefined;
}

AbstractObject.prototype.destroy = function(){};

AbstractObject.prototype.init = function(){
	window.namespaceId = window.namespaceId ? window.namespaceId : 1;
	this.namespaceId = window.namespaceId++;
};

AbstractObject.prototype.one = function(target, event, listener){
	jQuery(target).one(event+"."+this.namespaceId, jQuery.proxy(listener, this));
};

AbstractObject.prototype.live = function(target, event, listener){
    jQuery(target).live(event+"."+this.namespaceId, jQuery.proxy(listener, this));
};

AbstractObject.prototype.bind = function(target, event, listener){
	jQuery(target).bind(event+"."+this.namespaceId, jQuery.proxy(listener, this));
};

AbstractObject.prototype.unbind = function(target,event,listener){
	jQuery(target).unbind(event+"."+this.namespaceId, jQuery.proxy(listener, this));
};

AbstractObject.prototype.dispatchEvent = function(event, object){
    jQuery(this).trigger(event, object);
};

//
Function.prototype._extends = function(superClass){ 	 
	this.prototype = new superClass;
	this.prototype.constructor = this;
	this._super = superClass.prototype;
};
