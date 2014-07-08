function TwitterModel()
{
	this.connected = false;
}

TwitterModel.prototype.setConnected = function(connected)
{
	this.connected = connected;
	jQuery(this).trigger(TwitterEvent.ON_CONNECTED_CHANGE);
};

TwitterModel.prototype.notify = function(eventType)
{
	jQuery(this).trigger(eventType);
};
