function DrupalServices()
{
	this.postponedRequests = new Array();
}

DrupalServices.token = undefined;

DrupalServices.prototype.callAction = function(action, resultCallback, faultCallback, data)
{
	var request = new Object();
	request.url = Drupal.settings.basePath + 'rest-endpoint/' + action;
	request.type = 'POST';
	request.data = JSON.stringify(data);

	request.beforeSend = function (request) {
		request.setRequestHeader('X-CSRF-Token', DrupalServices.token);
		request.setRequestHeader('Content-Type', 'application/json');
	};
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

//private
DrupalServices.prototype.requestToken = function() 
{
	var request = new Object();
	request.url = Drupal.settings.basePath + 'services/session/token';
	request.type = 'GET';

	request.success = jQuery.proxy(this.onServiceTokenLoad, this);
	jQuery.ajax(request);
	
};

DrupalServices.prototype.onServiceTokenLoad = function(data)
{
	DrupalServices.token = data;
	
	while (this.postponedRequests.length > 0)
	{
		var request = this.postponedRequests.pop();
		request.beforeSend = function (request) {
			request.setRequestHeader('X-CSRF-Token', DrupalServices.token);
			request.setRequestHeader('Content-Type', 'application/json');
		};
		jQuery.ajax(request);
	}
};
