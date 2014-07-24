/**
 * To be used with twitter light module.
 */
function TwitterController()
{
	this.model = undefined;
	this.popup = undefined;
	this.interval = undefined;
}

TwitterController.instance = undefined;

TwitterController.getInstance = function()
{
	if (TwitterController.instance === undefined)
	{
		var instance = new TwitterController();
		instance.init();
		TwitterController.instance = instance;
	}
	return TwitterController.instance;
};

TwitterController.prototype.init = function()
{
	this.model = new TwitterModel();
};

TwitterController.prototype.login = function()
{
	var height = 400;
	var width = 600;
	var top = window.screenTop + (window.innerHeight - height) / 2;
	var left = window.screenLeft + (window.innerWidth - width) / 2;
	if(window.name){
		this.originalWindowName = window.name;
	}
	window.name = 'parent';
	if(window.navigator.userAgent.indexOf('iPhone') != -1 || window.navigator.userAgent.indexOf('iPad') != -1 || window.navigator.userAgent.indexOf('Android') != -1){
		this.popup = window.open(window.location.protocol + '//' + window.location.host + Drupal.settings.basePath + 'twitter-light-user/login', "", "");
	}else{
		this.popup = window.open(window.location.protocol + '//' + window.location.host + Drupal.settings.basePath + 'twitter-light-user/login', "", "top="+top+",left="+left+",width="+width+",height="+height+","+"menubar=no,scrollbars=no,statusbar=no");
	}
	this.interval = setInterval(jQuery.proxy(this.onInterval, this), 500);
};

TwitterController.prototype.tweet = function(status)
{
	if(this.status != null) return;

	this.status = status;

	if(this.model.connected){
		var serviceData = new Object();
		serviceData.status = status;

		var request = new Object();
		request.url = Drupal.settings.basePath + 'rest-endpoint/twitter_light/tweet';
		request.type = 'POST';
		request.data = JSON.stringify(serviceData);
		request.beforeSend = function (request) {request.setRequestHeader('Content-Type', 'application/json');};
		request.success = jQuery.proxy(this.onTweetSuccess, this);
		//request.error = error;
		jQuery.ajax(request);
	}else{
		this.login();
	}
};

//private
TwitterController.prototype.onTweetSuccess = function(result)
{
	if(result.id == null){
		this.model.setConnected(false);
		this.status = null;
//		this.login();
	}else{
		this.status = null;
		this.model.notify(TwitterEvent.ON_TWEET_SUCCESS);
	}
};

TwitterController.prototype.onInterval = function()
{
	//if popup is not closed
	if (this.popup.top){
		var href = '';
		try{
			var href = this.popup.location.href;
		}
		catch(e){}

		if (href && href.indexOf('twitter-light-user/login/success') != -1)
		{
			clearInterval(this.interval);
			this.model.setConnected(true);
			this.popup.close();
			if(this.status != null){
				var status = this.status;
				this.status = null;
				this.tweet(status);
			}
			if(this.originalWindowName != null){
				window.name = this.originalWindowName;
				this.originalWindowName = null;
			}
		}
		else if (href && href.indexOf('twitter-light-user/login/failure') != -1)
		{
			clearInterval(this.interval);
			this.model.setConnected(false);
			this.popup.close();
			this.status = null;
			if(this.originalWindowName != null){
				window.name = this.originalWindowName;
				this.originalWindowName = null;
			}
		}
	}else{
		clearInterval(this.interval);
	}
};
