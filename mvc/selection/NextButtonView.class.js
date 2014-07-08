function NextButtonView()
{
	this.selectionController = undefined;
}

NextButtonView.prototype = new AbstractView();

NextButtonView.prototype.init = function(tag)
{
	AbstractView.prototype.init.call(this, tag);

	this.bind(this.tag, 'click', this.onClick);
};

//private
NextButtonView.prototype.onClick = function()
{
	this.selectionController.goNext();
};
