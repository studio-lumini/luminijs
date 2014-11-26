function AbstractMenuItemView()
{
}

AbstractMenuItemView._extends(AbstractView);

AbstractMenuItemView.prototype.destroy = function()
{
	if (this.controller != undefined)
	{
		this.unbind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED, this.onCurrentUpdated);
		this.unbind(this.controller.model, SelectionEvent.ON_OVER_UPDATED, this.onOverUpdated);
	}
	AbstractMenuItemView._super.destroy.call(this);
};

AbstractMenuItemView.prototype.init = function(tag, parent)
{
	AbstractMenuItemView._super.init.call(this, tag, parent);

	this.bind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED, this.onCurrentUpdated);
  this.onCurrentUpdated(null),
	this.bind(this.controller.model, SelectionEvent.ON_OVER_UPDATED, this.onOverUpdated);
  this.onOverUpdated(null);
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
