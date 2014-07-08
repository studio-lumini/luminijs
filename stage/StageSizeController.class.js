function StageSizeController()
{
	this.model = undefined;
}

StageSizeController.instance = undefined;

StageSizeController.getInstance =  function()
{
	if (StageSizeController.instance === undefined){
		var instance = new StageSizeController();
		instance.init(parent);
		StageSizeController.instance = instance;
	}
	return StageSizeController.instance;
};

StageSizeController.prototype.createModel = function()
{
	this.model = new StageSizeModel();
};

StageSizeController.prototype.destroy = function()
{
	jQuery(window).unbind('resize', jQuery.proxy(this.onStageResize, this));
};

StageSizeController.prototype.init = function()
{
	this.createModel();
	jQuery(window).resize(jQuery.proxy(this.onStageResize, this));
	this.onStageResize(null);
};

StageSizeController.prototype.onStageResize = function(event)
{
	this.model.setSize(new Array(jQuery(window).width(), jQuery(window).height()));
};

StageSizeController.prototype.setMinimumSize = function()
{
	this.model.setMinimumSize(minimumSize);
	onStageResize(null);
};

StageSizeController.prototype.setMaximumSize = function(maximumSize)
{
	this.model.setMaximumSize(maximumSize);
	onStageResize(null);
};
