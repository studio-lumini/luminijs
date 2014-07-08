function MovieClip()
{	
}

MovieClip.prototype.timerId = "";
MovieClip.prototype._frame = "";
MovieClip.prototype.frames = "";
MovieClip.ENDED = 'ended';

MovieClip.prototype.init = function(tag)
{
	if (!(this.tag = jQuery(tag)))
		return;
	this.frames = this.tag.find("img");
	this.frame = 0;
};

MovieClip.prototype.getFrame = function()
{
	return this._frame;
};

MovieClip.prototype.setFrame = function(frame)
{
	this._frame = Math.min(this.frames.length - 1, Math.max(0, parseInt(frame, 10)));
	this.frames.css({'display': 'none'});
	jQuery(this.frames[this._frame]).css({'display': 'block'});
};

Object.defineProperty(MovieClip.prototype, "frame", {get : MovieClip.prototype.getFrame,
    set : MovieClip.prototype.setFrame,
    enumerable : true});

MovieClip.prototype.play = function()
{
	if (this.timerId == "")
		this.timerId = setInterval(jQuery.proxy(this.nextFrame, this), 40);
};

MovieClip.prototype.stop = function()
{
	clearInterval(this.timerId);
	this.timerId = "";
};

//Private
MovieClip.prototype.nextFrame = function(){
	this.frame++;
	if(this.frame == this.frames.length - 1){
		this.stop();
		jQuery(this).trigger(MovieClip.ENDED);
		
	}
}; 

MovieClip.prototype.previousFrame = function(){
	if(this.frame != 0){
		this.frame--;
	}
}; 