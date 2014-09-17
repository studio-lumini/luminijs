function FullScreenDelegate()
{
}

FullScreenDelegate.prototype.parent = "";
FullScreenDelegate.prototype.tag = "";
FullScreenDelegate.prototype.tagInitWidth = "";
FullScreenDelegate.prototype.tagInitHeight = "";

FullScreenDelegate.prototype.destroy = function()
{
	jQuery(StageSizeController.getInstance().model).unbind(StageSizeEvent.STAGE_RESIZE, jQuery.proxy(this.onStageResize, this));
};

FullScreenDelegate.prototype.init = function(parent, tag)
{
	this.parent = jQuery(parent);
	this.tag = jQuery(tag);
	this.parent.css({"position": "fixed", "overflow": "hidden"});
	this.tag.css({"position": "absolute"});
	this.tagInitWidth = this.tag.width();
	
	this.tagInitHeight = this.tag.height();

	jQuery(StageSizeController.getInstance().model).bind(StageSizeEvent.STAGE_RESIZE, jQuery.proxy(this.onStageResize, this));
	this.onStageResize(null);
};

FullScreenDelegate.prototype.onStageResize = function(event)
{
	var size = StageSizeController.getInstance().model.size;
	var offsetX = 10;
	var scale = Math.max((size[0]+2*offsetX)/this.tagInitWidth, size[1]/this.tagInitHeight);
	//this.tag.attr("width", size[0] * scale);
	//this.tag.attr("height", size[1] * scale);
	this.tag.attr("width", this.tagInitWidth * scale);
	this.tag.attr("height", this.tagInitHeight * scale);
	this.parent.width(size[0]);
	this.parent.height(size[1]);
	
	this.tag.css({"top": (size[1] - this.tag.attr("height")) / 2});
	this.tag.css({"left": (size[0] + 2 * offsetX - this.tag.attr("width")) / 2 - offsetX});
};
