//bugged, stops after several loops

function AnimationHelper()
{
}

AnimationHelper.ENTER_FRAME = "enterFrame";
AnimationHelper.instance = undefined;

AnimationHelper.getInstance = function()
{
	if (!AnimationHelper.instance)
	{
		AnimationHelper.instance = new AnimationHelper();
		AnimationHelper.instance.init();
	}
	return AnimationHelper.instance;
};

AnimationHelper.prototype.init = function()
{
	var requestAnimationFrame = window.requestAnimationFrame 
			|| window.mozRequestAnimationFrame 
			|| window.webkitRequestAnimationFrame 
			|| window.msRequestAnimationFrame 
			|| window.oRequestAnimationFrame 
			|| function(callback){
        			window.setTimeout(callback, 1000 / 60);
    			};  
	window.requestAnimationFrame = requestAnimationFrame;
	window.requestAnimationFrame(jQuery.proxy(this.onEnterFrame, this));
};

AnimationHelper.prototype.onEnterFrame = function()
{
	window.requestAnimationFrame(jQuery.proxy(this.onEnterFrame, this));
	jQuery(this).trigger(AnimationHelper.ENTER_FRAME);
};