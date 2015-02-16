function Cookie()
{
}

Cookie.set = function(name, value, lifeExpectancy)
{
	var expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + lifeExpectancy);
	value = escape(value);
    if (lifeExpectancy != 0) {
        value += "; expires=" + expirationDate.toUTCString();
    }
    value += '; path=/';
	document.cookie = name + "=" + value;
};

Cookie.get = function(name)
{
	var i, x, y, cookieArray = document.cookie.split(";");
	for (i = 0; i < cookieArray.length; i++)
	{
		x = cookieArray[i].substr(0, cookieArray[i].indexOf("="));
		y = cookieArray[i].substr(cookieArray[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == name)
		{
			return unescape(y);
		}
	}
};
