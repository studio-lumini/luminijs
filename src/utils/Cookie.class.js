function Cookie()
{
}

//TODO: handle life expectancy parameter
Cookie.set = function(name, value, lifeExpectancy, path)
{
    if (!path) path  = '/';

	var now = new Date();
	var expirationDate = new Date(now.getDate() + lifeExpectancy);

    var cookie = name + '=' + value;
    cookie += ';path=' + path;

	document.cookie = cookie;
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
