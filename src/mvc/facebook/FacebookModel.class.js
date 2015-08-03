function FacebookModel()
{
	this.uid = undefined; //null: user not logged to your app
	this.accessToken = undefined;
	this.appId = undefined;
	this.likes = undefined;
}

FacebookModel.prototype.setSession = function(uid, accessToken)
{
	this.uid = uid;
	this.accessToken = accessToken;
    Cookie.set('access_token', accessToken, 1, '/');
	jQuery(this).trigger(FacebookEvent.ON_SESSION);
};

FacebookModel.prototype.setLikes = function(likes)
{
	this.likes = likes;
	jQuery(this).trigger(FacebookEvent.LIKES_UPDATED);
};
