function UrlToolbox()
{
}

/**
 * @param key
 * 		The key of the get param you want.
 * @param useHash Boolean (optional)
 * 		If you want to search in the hash.
 */
UrlToolbox.getUrlParam = function(key, useHash)
{
	if (typeof useHash === "undefined") useHash = false;
	
	var query = window.location.search.replace("?", "");
	var params = query.split("&");
	
	if (useHash)
	{
		var hashQuery = window.location.hash.split("?").pop();
		params = params.concat(hashQuery.split("&"));
	}		
		
	for (var i = 0; i < params.length; i++)
	{
		var param = params[i].split("=");
		if (param[0] == key) 
			return param[1];
	}
	return null;
};

/**
 * Returns a string containing hashtag, or '' if no hashtag is present.
 */
UrlToolbox.getUrlHashtag = function()
{
	var href = window.location.href;
	var urlParts = href.split("#");
	return (urlParts.length == 2) ? urlParts[1] : "";
};

/**
 * Returns a string containing basepath (with protocol).
 */
UrlToolbox.getBasePath = function()
{
	var href = window.location.href;
	var urlParts = href.split("/");
	
	var basePath = urlParts[0] + "//" + urlParts[2];
	return basePath;
};

/**
 * Returns a string containing path.
 */
UrlToolbox.getPath = function()
{
	var href = window.location.href;
	href = href.split('?').shift();
	href = href.split('#').shift();
	
	var urlParts = href.split("/");
	urlParts.splice(0, 3);
	
	var path = urlParts.join("/");
	return path;
};

/**
 * Returns a string containing path element.
 * @param index
 * 		The index of the element.
 */
UrlToolbox.getPathElement = function(index)
{
	var href = window.location.href;
	href = href.split('?').shift();
	href = href.split('#').shift();
	
	var urlParts = href.split("/");
	urlParts.splice(0, 3);	
	
	var path = (urlParts.length > index) ? urlParts[index] : "";
	return path;
};
