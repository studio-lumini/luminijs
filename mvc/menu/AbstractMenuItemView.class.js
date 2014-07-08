function AbstractMenuItemView()
{
}

AbstractMenuItemView.prototype = new AbstractView();

AbstractMenuItemView.prototype.destroy = function()
{
	if (this.controller != undefined)
	{
		jQuery(this.controller.model).unbind(SelectionEvent.ON_CURRENT_UPDATED+"."+this.namespaceId, jQuery.proxy(this.onCurrentUpdated, this));
		jQuery(this.controller.model).unbind(SelectionEvent.ON_OVER_UPDATED+"."+this.namespaceId, jQuery.proxy(this.onOverUpdated, this));
	}
	AbstractView.prototype.destroy.call(this);
};

AbstractMenuItemView.prototype.init = function(tag, parent)
{
	AbstractView.prototype.init.call(this, tag, parent);

	jQuery(this.controller.model).bind(SelectionEvent.ON_CURRENT_UPDATED+"."+this.namespaceId, jQuery.proxy(this.onCurrentUpdated, this));
	jQuery(this.controller.model).bind(SelectionEvent.ON_OVER_UPDATED+"."+this.namespaceId, jQuery.proxy(this.onOverUpdated, this));
};

//protected
AbstractMenuItemView.prototype.hilite = function()
{
};

AbstractMenuItemView.prototype.unhilite = function()
{
};

//private
AbstractMenuItemView.prototype.onMouseOver = function()
{
	if(this.controller != null){
		this.controller.setOver(this.id);
	}
};

AbstractMenuItemView.prototype.onMouseOut = function()
{
	if (this.controller != null)
	{
		this.controller.setOver(null);
	}
};

AbstractMenuItemView.prototype.onClick = function()
{
	if(this.controller != null){
		this.controller.setCurrent(this.id);
	}
};

AbstractMenuItemView.prototype.onOverUpdated = function()
{
	if (this.controller.model.over === this.id)
	{
		this.hilite();
	}
	else if (this.current !== this.id)
	{
		this.unhilite();
	}
};

AbstractMenuItemView.prototype.onCurrentUpdated = function()
{
	if (this.controller.model.current === this.id)
	{
		this.hilite();
	}
	else
	{
		this.unhilite();
	}
};
