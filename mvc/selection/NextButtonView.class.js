function NextButtonView()
{
	this.selectionController = undefined;
}

NextButtonView._extends(AbstractView);

NextButtonView.prototype.init = function(tag, parent)
{
	AbstractView.prototype.init.call(this, tag, parent);

	this.bind(this.tag, 'click', this.onClick);
};

//private
NextButtonView.prototype.onClick = function()
{
	this.selectionController.goNext();
};
