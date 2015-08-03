function Stats()
{
}

Stats.gaAccounts = undefined; //define ua array before creating instance
Stats.prototype.gaTrackers = undefined;

Stats.instance = undefined;		

Stats.getInstance = function()
{
	if(!Stats.instance){
		Stats.instance = new Stats();
		Stats.instance.init();
	}
	return Stats.instance;
};

Stats.prototype.init = function()
{
	this.gaTrackers = new Array();
	for (var i = 0; i < Stats.gaAccounts.length; i++) 
	{
		var gaTracker = new GATracker();
		gaTracker.init(Stats.gaAccounts[i]);
		this.gaTrackers.push(gaTracker);
	}
};

Stats.prototype.trackPage = function(page)
{
	for (var i = 0; i < this.gaTrackers.length; i++)
		this.gaTrackers[i].trackPageView(page);
};
