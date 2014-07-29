function PreviousButtonView()
{
	this.selectionController = undefined;
}

PreviousButtonView._extends(AbstractView);

PreviousButtonView.prototype.init = function(tag, parent)
{
	AbstractView.prototype.init.call(this, tag, parent);

	this.bind(this.tag, 'click', this.onClick);
};

//private
PreviousButtonView.prototype.onClick = function()
{
	this.selectionController.goPrevious();
};
