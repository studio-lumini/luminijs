function DrupalServices()
{
}

DrupalServices.prototype.callAction = function(action, resultCallback, faultCallback, data)
{
	var request = new Object();
	request.url = Drupal.settings.basePath + 'rest-endpoint/' + action;
	request.type = 'POST';
	request.data = JSON.stringify(data);

	request.beforeSend = function (request) {
		/*request.setRequestHeader('X-CSRF-Token', 'sWDXFdlFpCK8z1fLjrWHFmC0Pt6-UZcr97sB7mDjkpo'); */
		request.setRequestHeader('Content-Type', 'application/json');
	};
	request.success = resultCallback;
	request.error = faultCallback;
	jQuery.ajax(request);
};
