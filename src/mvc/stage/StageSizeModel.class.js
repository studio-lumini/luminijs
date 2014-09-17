function StageSizeModel()
{
	this.size = new Array(0,0);
	this.minimumSize = new Array(0,0);
	this.maximumSize = new Array(0,0);
}

StageSizeModel.prototype.setSize = function(size)
{
	this.size = size;
	jQuery(this).trigger(StageSizeEvent.STAGE_RESIZE);
};

// TODO : IE8 incompatible:
//Object.defineProperty(StageSizeModel.prototype, "size", {get : StageSizeModel.prototype.getSize,
//    set : StageSizeModel.prototype.setSize,
//    enumerable : true});
