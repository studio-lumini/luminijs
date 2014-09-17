function VideoController(video)
{
}

VideoController.prototype.model = "";
VideoController.prototype.video = "";

VideoController.prototype.createModel = function()
{
	this.model = new VideoModel();
};

VideoController.prototype.init = function()
{
	this.video = jQuery(this.video);
	this.video.bind(VideoModel.PLAYING, jQuery.proxy(this.onPlaying, this));
	this.video.bind(VideoModel.PAUSE, jQuery.proxy(this.onPause, this));
	//this.video.bind("timeupdate", jQuery.proxy(this.onTimeUpdate, this));
	this.video.bind(VideoModel.ENDED, jQuery.proxy(this.onEnded, this));
};

VideoController.prototype.play = function()
{
	if (!this.model.isPlaying)
	{
		this.video.get(0).play();
	}
};

VideoController.prototype.pause = function()
{
	if (this.model.isPlaying)
	{
		this.video.get(0).pause();
	}
};

//private
VideoController.prototype.onPlaying = function()
{
	this.model.playing();
	
};

VideoController.prototype.onPause = function()
{
	this.model.pause();
	
};

VideoController.prototype.onTimeUpdate = function(event)
{
	this.model.timeUpdate(event);
};

VideoController.prototype.onEnded = function()
{
		this.model.ended();
};

VideoController.prototype.load = function(){
	this.video.get(0).load();
	this.model.isPlaying = false;
	this.model.isEnded = false;
	
};

VideoController.prototype.seek = function(time){
	
	if(this.video.get(0).currentTime){
		this.video.get(0).currentTime = time;
	}	
};
