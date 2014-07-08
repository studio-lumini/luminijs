function VideoModel()
{
}

VideoModel.PLAYING = "playing";
VideoModel.PAUSE = "pause";
VideoModel.ENDED = "ended";

VideoModel.prototype.isPlaying = "";
VideoModel.prototype.isEnded = "";

VideoModel.prototype.playing = function()
{
	//console.info('VideoModel.prototype.playing');
	if(!this.isPlaying){
		this.isPlaying = true;
		jQuery(this).trigger(VideoModel.PLAYING);
	}
};

VideoModel.prototype.pause = function()
{
	//console.info('VideoModel.prototype.pause');
	if(this.isPlaying){
		this.isPlaying = false;
		jQuery(this).trigger(VideoModel.PAUSE);
	}
	
};

VideoModel.prototype.timeUpdate = function()
{
	//console.info(event.target.currentTime);
};

VideoModel.prototype.ended = function(event)
{
	//console.info('VideoModel.prototype.ended');
	this.isPlaying = false;
	if(!this.isEnded){
		this.isEnded = true;
		jQuery(this).trigger(VideoModel.ENDED);
	}
		
	
	
};
