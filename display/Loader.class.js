function Loader()
{
	this.name = '';
	this.connections = 0;
	this.queue = new Array();
	this.div = jQuery("<div></div>").appendTo("body");
	this.div.css({'visibility': 'hidden', 'height': '0', 'overflow': 'hidden'});
}

Loader.LOADED = "loaded";
Loader.QUEUE_EMPTY = "queueEmpty";
Loader.maxConnections = 5;
Loader.prototype.div = "";
Loader.prototype.queue = "";
Loader.prototype.connections = "";

Loader.prototype.append = function(src)
{
	this.queue.push(src);
};

Loader.prototype.prepend = function(src)
{
	this.queue.reverse();
	this.queue.push(src);
	this.queue.reverse();
};

Loader.prototype.load = function()
{
	while (this.connections < Loader.maxConnections && 0 < this.queue.length)
	{
		var src = this.queue.shift();
		var element = jQuery("<img src='" + src + "'/>");
		this.connections++;
		element.load(jQuery.proxy(this.loaded, this));
		element.appendTo(this.div);
	}
};

Loader.prototype.getContent = function()
{
	return this.div.find("img");
};

//private
Loader.prototype.loaded = function(event)
{
	this.connections--;
	if (this.queue.length > 0)
		this.load();
	else if (this.connections == 0)
		jQuery(this).trigger(Loader.QUEUE_EMPTY);
	//jQuery(this).trigger(Loader.LOADED);
};

