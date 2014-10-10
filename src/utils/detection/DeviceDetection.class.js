function DeviceDetection(){}

DeviceDetection.isPad = function() {
	return navigator.userAgent.indexOf('iPad') != -1; 
};

DeviceDetection.isPhone = function() { 
	return navigator.userAgent.indexOf('iPhone') != -1; 
};

DeviceDetection.isAndroidTablet = function() {
	return navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') == -1;
};

DeviceDetection.isAndroidPhone = function() {
	return navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1;
};

DeviceDetection.hasTouchScreen = function() {
    return 'ontouchstart' in document.documentElement;
};
