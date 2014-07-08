function PreviousButtonView()
{
	this.selectionController = undefined;
}

PreviousButtonView.prototype = new AbstractView();

PreviousButtonView.prototype.init = function(tag)
{
	AbstractView.prototype.init.call(this, tag);

	this.bind(this.tag, 'click', this.onClick);
};

//private
PreviousButtonView.prototype.onClick = function()
{
	this.selectionController.goPrevious();
};
