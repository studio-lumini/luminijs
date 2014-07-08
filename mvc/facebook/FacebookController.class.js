function FacebookController()
{
	this.model = undefined;
}

FacebookController.instance = undefined;

FacebookController.getInstance = function()
{
	if(FacebookController.instance === undefined)
	{
		var instance = new FacebookController();
		instance.init();
		FacebookController.instance = instance;
	}
	return FacebookController.instance;
};

FacebookController.prototype.init = function()
{
	this.model = new FacebookModel();
};

FacebookController.prototype.initFacebook = function(appId)
{
	this.model.appId = appId;
	
	FB.init({
		appId: this.model.appId,
		status: false,
		cookie: true,
		xfbml: true
	});
	
	FB.getLoginStatus(jQuery.proxy(this.onAuthStatusChange, this));
};

FacebookController.prototype.login = function(scope)
{
	var params = {};
	if (scope)
		params.scope = scope;
	FB.login(jQuery.proxy(this.onLogin, this), params);
};

FacebookController.prototype.addImageInAlbum = function(albumName, albumDescription, url, description)
{
	var self = this;
	FB.api('/me/albums', 'get', {'fields': 'name', 'limit': 100000000000000},
		function(response) {
			var album = undefined;
			for (var i = 0; i < response.data.length ; i ++)
			{
				album = response.data[i];
				if (album.name == albumName) break;
				else album = undefined;
			}
			if (album)
			{
				self.addImageInExistingAlbum(album.id, url, description);
			}
			else
			{
				FB.api('/me/albums', 'post', {'name': albumName, 'message': albumDescription},
					function(response) 
					{
						self.addImageInExistingAlbum(response.id, url, description);
					}
				);
			}
		}
	);
};

FacebookController.prototype.addImageInExistingAlbum = function(albumId, url, description)
{
	var self = this;
	FB.api('/' + albumId + '/photos', 'post', {'message': description, 'url': url},
		function(response){
			jQuery(self.model).trigger(FacebookEvent.PHOTO_ADDED);
		}
	);
};

FacebookController.prototype.api = function(url, method, params)
{
	var self = this;
	FB.api(url, method, params,
		function(response){
			jQuery(self.model).trigger(FacebookEvent.API_CALL_SUCCESS, [response]);
		}
	);
};

FacebookController.prototype.getLikes = function(fields, uid)
{
	if(uid == null) uid = this.model.uid;
	var params = fields == null ? {}: {'fields': 'likes.fields('+fields+')'};
	var self = this;
	
	FB.api('/' + uid, 'get', params,
		function(response){
			self.model.setLikes(response.likes.data);
		}
	);
};


//private
/* @param response
 * 		documented here: https://developers.facebook.com/docs/facebook-login/login-flow-for-web/#checklogin
 */
FacebookController.prototype.onAuthStatusChange = function(response)
{
	switch(response.status){
	case 'connected':
		Cookie.set('access_token', response.authResponse.accessToken, 1);
		this.model.setSession(response.authResponse.userID, response.authResponse.accessToken);
		break;
	case 'not_authorized':
		this.model.setSession(null, null);
	default:
		this.model.setSession(null, null);
		break;
	}
};

FacebookController.prototype.onLogin = function(response)
{
	if (response.authResponse)
	{
		this.model.setSession(response.authResponse.userID, response.authResponse.accessToken);
	}
	else
		this.model.setSession(null, null);
};
