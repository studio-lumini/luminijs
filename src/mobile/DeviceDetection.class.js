function DeviceDetection()
{
}

DeviceDetection.isIpad = function()
{
	return navigator.userAgent.indexOf('iPad') != -1;
};

