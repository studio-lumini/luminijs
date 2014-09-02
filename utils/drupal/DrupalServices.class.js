function DrupalServices()
{
	this.postponedRequests = new Array();
	this.headers = {
		'Content-Type': 'application/json'
	};
}

DrupalServices._extends(AbstractObject);

DrupalServices.token = undefined;

DrupalServices.prototype.callAction = function(action, resultCallback, faultCallback, data)
{
	var request = new Object();
	request.url = Drupal.settings.basePath + 'rest-endpoint/' + action;
	request.type = 'POST';
	request.data = JSON.stringify(data);

	request.beforeSend = jQuery.proxy(this.beforeSend, this);
	request.success = resultCallback;
	request.error = faultCallback;
	
	if (!DrupalServices.token)
	{
		this.postponedRequests.push(request);
		this.requestToken();
	}
	else
		jQuery.ajax(request);
};

DrupalServices.prototype.beforeSend = function (xhr) {
	if (DrupalServices.token)
		this.headers['X-CSRF-Token'] = DrupalServices.token;
	for (var name in this.headers)
	{
		xhr.setRequestHeader(name, this.headers[name]);
	}
};

//private
DrupalServices.prototype.requestToken = function() 
{
	var request = new Object();
	request.url = Drupal.settings.basePath + 'services/session/token';
	request.type = 'GET';
	
	request.beforeSend = jQuery.proxy(this.beforeSend, this);
	request.success = jQuery.proxy(this.onServiceTokenLoad, this);
	jQuery.ajax(request);
	
};

DrupalServices.prototype.onServiceTokenLoad = function(data)
{
	DrupalServices.token = data;
	
	while (this.postponedRequests.length > 0)
	{
		var request = this.postponedRequests.pop();
		request.beforeSend = jQuery.proxy(this.beforeSend, this);
		jQuery.ajax(request);
	}
};
