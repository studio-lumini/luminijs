function GATracker()
{
}

GATracker.prototype.ua = undefined;
GATracker.prototype.tracker = undefined;

GATracker.prototype.init = function(ua)
{
	this.ua = ua;
	if (typeof _gat !== 'undefined')
	{
		this.tracker = _gat._createTracker(this.ua);
	}
	else
	{
		_gaq.push(['_setAccount', this.ua]);
	}
};

GATracker.prototype.trackPageView = function(page)
{
	if (typeof _gat !== 'undefined')
	{
		if(!this.tracker)
		{
			this.tracker = _gat._createTracker(this.ua);
		}
	    this.tracker._trackPageview(page);
	}
	else
	{
		_gaq.push(['_trackPageview', page]);
	}
};
