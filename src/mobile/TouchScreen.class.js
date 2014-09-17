function TouchScreen(){}

TouchScreen.isTouchScreenDevice = function()
{
	var isTouchDevice = 'ontouchstart' in document.documentElement;
	return isTouchDevice;
};
