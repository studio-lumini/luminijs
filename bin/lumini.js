function GATracker()
{
};

GATracker.prototype.ua = undefined;
GATracker.prototype.tracker = undefined;

GATracker.prototype.init = function(ua)
{
	this.ua = ua;
	if (typeof _gat !== 'undefined')
	{
		this.tracker = _gat._createTracker(this.ua);
	}
	else
	{
		_gaq.push(['_setAccount', this.ua]);
	}
};

GATracker.prototype.trackPageView = function(page)
{
	if (typeof _gat !== 'undefined')
	{
		if(!this.tracker)
		{
			this.tracker = _gat._createTracker(this.ua);
		}
	    this.tracker._trackPageview(page);
	}
	else
	{
		_gaq.push(['_trackPageview', page]);
	}
};
function Stats()
{
}

Stats.gaAccounts = undefined; // define ua array
Stats.prototype.gaTrackers = undefined;

Stats.instance = undefined;		

Stats.getInstance = function()
{
	if(!Stats.instance){
		Stats.instance = new Stats();
		Stats.instance.init();
	}
	return Stats.instance;
};

Stats.prototype.init = function()
{
	this.gaTrackers = new Array();
	for (var i = 0; i < Stats.gaAccounts.length; i++) 
	{
		var gaTracker = new GATracker();
		gaTracker.init(Stats.gaAccounts[i]);
		this.gaTrackers.push(gaTracker);
	}
};

Stats.prototype.trackPage = function(page)
{
	for (var i = 0; i < this.gaTrackers.length; i++)
		this.gaTrackers[i].trackPageView(page);
};
function AbstractObject()
{
	this.namespaceId = undefined;
}

AbstractObject.prototype.destroy = function(){};

AbstractObject.prototype.init = function(){
	window.namespaceId = window.namespaceId ? window.namespaceId : 1;
	this.namespaceId = window.namespaceId++;
};

AbstractObject.prototype.one = function(target, event, listener){
	jQuery(target).one(event+"."+this.namespaceId, jQuery.proxy(listener, this));
};

AbstractObject.prototype.bind = function(target, event, listener){
	jQuery(target).bind(event+"."+this.namespaceId, jQuery.proxy(listener, this));
};

AbstractObject.prototype.unbind = function(target,event,listener){
	jQuery(target).unbind(event+"."+this.namespaceId, jQuery.proxy(listener, this));
};

//
Function.prototype._extends = function(superClass){ 	 
	this.prototype = new superClass;
	this.prototype.constructor = this;
	this._super = superClass.prototype;
};
function StageSizeEvent()
{
}

StageSizeEvent.STAGE_RESIZE = "onStageResize";

function StageSizeModel()
{
	this.size = new Array(0,0);
	this.minimumSize = new Array(0,0);
	this.maximumSize = new Array(0,0);
}

StageSizeModel.prototype.setSize = function(size)
{
	this.size = size;
	jQuery(this).trigger(StageSizeEvent.STAGE_RESIZE);
};

// TODO : IE8 incompatible:
//Object.defineProperty(StageSizeModel.prototype, "size", {get : StageSizeModel.prototype.getSize,
//    set : StageSizeModel.prototype.setSize,
//    enumerable : true});
function StageSizeController()
{
	this.model = undefined;
}

StageSizeController.instance = undefined;

StageSizeController.getInstance =  function()
{
	if (StageSizeController.instance === undefined){
		var instance = new StageSizeController();
		instance.init(parent);
		StageSizeController.instance = instance;
	}
	return StageSizeController.instance;
};

StageSizeController.prototype.createModel = function()
{
	this.model = new StageSizeModel();
};

StageSizeController.prototype.destroy = function()
{
	jQuery(window).unbind('resize', jQuery.proxy(this.onStageResize, this));
};

StageSizeController.prototype.init = function()
{
	this.createModel();
	jQuery(window).resize(jQuery.proxy(this.onStageResize, this));
	this.onStageResize(null);
};

StageSizeController.prototype.onStageResize = function(event)
{
	this.model.setSize(new Array(jQuery(window).width(), jQuery(window).height()));
};

StageSizeController.prototype.setMinimumSize = function()
{
	this.model.setMinimumSize(minimumSize);
	onStageResize(null);
};

StageSizeController.prototype.setMaximumSize = function(maximumSize)
{
	this.model.setMaximumSize(maximumSize);
	onStageResize(null);
};
function AbstractView()
{
	this.controller = undefined;
	this.tag = undefined;
	this.id = undefined;
	this.parent = undefined;
	this.childrenViews = new Array();
}

AbstractView._extends(AbstractObject);

AbstractView.prototype.destroy = function()
{	
	while (0 < this.childrenViews.length){
		this.childrenViews[0].destroy();
	}
	childrenViews = null;
	
	if (this.parent)
	{
		var index = this.parent.childrenViews.indexOf(this);
		this.parent.childrenViews.splice(index, 1);
	}
	
	AbstractView._super.destroy.call(this);
};

AbstractView.prototype.init = function(tag, parent){
	AbstractView._super.init.call(this);
	this.setParent(parent);
	if (this.parent && !this.controller)
		this.controller = this.parent.controller;

	this.tag = jQuery(tag);
};

//private
AbstractView.prototype.addChildView = function(childView)
{
	if (this.childrenViews.indexOf(childView) !== -1)
	{
		this.childrenViews.push(childView);
	}
};

AbstractView.prototype.setParent = function(parent){
	this.parent = parent;
	if (this.parent)
	{
		this.parent.addChildView(this);
	}
};
function AbstractSelectionContentView(){
	AbstractView.call(this);
}

AbstractSelectionContentView._extends(AbstractView);

AbstractSelectionContentView.prototype.destroy = function()
{
	this.unbind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED, this.onCurrentUpdated);
	AbstractSelectionContentView._super.destroy.call(this);
};

AbstractSelectionContentView.prototype.init = function(tag, parent){
	AbstractSelectionContentView._super.init.call(this, tag, parent);
	
	if (this.id === undefined || this.controller === undefined)
		throw new Error('Id or controller undefined.');
	this.bind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED, this.onCurrentUpdated);
	this.onCurrentUpdated(null);
};

AbstractSelectionContentView.prototype.onCurrentUpdated = function(){
	if(this.controller.model.current === this.id){
		this.show();
	}else{
		this.hide();
	}
};

AbstractSelectionContentView.prototype.show = function(){
	this.tag.show();
};

AbstractSelectionContentView.prototype.hide = function(){
	this.tag.hide();
};
function Cookie()
{
}

Cookie.set = function(name, value, lifeExpectancy)
{
	var expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + lifeExpectancy);
	value = escape(value) + ((lifeExpectancy == 0) ? "" : "; expires=" + expirationDate.toUTCString());
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
function SocialSharer()
{
}

/**
 * Shares content on Facebook.
 * @param url
 * 		The url to share.
 */
SocialSharer.shareFacebook = function(url)
{
	url = SocialSharer.cleanParam(url);
	var url = "https://www.facebook.com/sharer/sharer.php?u=" + url;
	
	SocialSharer.popup(url, 600, 368, "menubar=no,scrollbars=no,statusbar=no");
};

/**
 * Shares content on Pinterest.
 * @param url
 * @param media
 * @param description
 */
SocialSharer.sharePinterest = function(url, media, description)
{
	url = encodeURIComponent(url);
	media = encodeURIComponent(media);
	var text = SocialSharer.cleanParam(description);
	
	var queryString = "url="+url+"&media="+media+"&description="+text;
	var url = "//pinterest.com/pin/create/button?" + queryString;
	SocialSharer.popup(url, 600, 350, "menubar=no,scrollbars=no,statusbar=no");
};

/**
 * Shares content on Twitter
 * @param url
 * 		A fully-qualified HTTP or HTTPS-based URL, URL-encoded.
 * @param text
 * 		Pre-prepared, properly UTF-8 & percent-encoded Tweet body text.
 * @param hashtags
 * 		Add context to the pre-prepared status update by appending #hashtags. Omit the "#" symbol and separate multiple hashtags with commas.
 * @param via (optional)
 * 		A screen name to associate with the tweet. Omit the "@" symbol.
 */
SocialSharer.shareTwitter = function(url, text, hashtags, via)
{
	url = encodeURIComponent(url);
	text = SocialSharer.cleanParam(text);
	hashtags = SocialSharer.cleanParam(hashtags);
	
	var queryString = "hashtags="+hashtags+"&url="+url+"&text="+text;
	
	if (via)
	{
		via = SocialSharer.cleanParam(via);
		queryString += "&via="+via;
	}
	var url = "http://twitter.com/intent/tweet?" + queryString;
	SocialSharer.popup(url, 600, 350, "menubar=no,scrollbars=no,statusbar=no");
};

/**
 * Uses Twitter user intent.
 * @param screen_name
 * 		Twitter user screen name.
 */
SocialSharer.twitterIntentUser = function(screen_name)
{
	var url = "https://twitter.com/intent/user?screen_name="+screen_name;
	SocialSharer.popup(url, 600, 500, "menubar=no,scrollbars=no,statusbar=no");
};

/**
 * Shares a link on Tumblr.
 * @param link
 * 		The link to share.
 * @param name (optional)
 * 		The name of the link.
 * @param description (optional)
 */
SocialSharer.shareTumblrLink = function(link, name, description)
{
	var url = "http://www.tumblr.com/share/link?url=" + encodeURIComponent(link);
	if (name)
		url += "&name=" + encodeURIComponent(name);
	if (description)
		url += "&description" + encodeURIComponent(description);
	SocialSharer.popup(url, 600, 500, "menubar=no,scrollbars=no,statusbar=no");
};

/**
 * Shares a link on LinkedIn
 * @param url
 * 		The permanent link to the article. Must be URL encoded.
 * @param title
 * 		The title of the article. Must be URL encoded
 * @param source
 * 		The source of the article. Must be URL encoded. Example: Wired Magazine
 * @param summary
 * 		A brief summary of the article. Must be URL encoded. Longer titles will be truncated gracefully with ellipses.
 */

SocialSharer.shareLinkedIn = function(url, title, source, summary) 
{
	var url = "http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(url);
	
	url += "&title=" + encodeURIComponent(title);
	url += "&summary=" + encodeURIComponent(summary);
	url += "&source=" + encodeURIComponent(source);

	SocialSharer.popup(url, 600, 500, "menubar=no,scrollbars=no,statusbar=no");
};

/**
 * Shares an url on Google plus.
 * @param url
 * 		The URL of the page to share. This value should be url encoded.
 * @param h1 (optional)
 * 		The language code for the locale to use on the Google+ sharing page.
 */
SocialSharer.shareGoogle = function(url, h1)
{
	var url = "https://plus.google.com/share?url=" + encodeURIComponent(url);
	if (h1)
		url += "&h1=" + encodeURIComponent(h1);
	SocialSharer.popup(url, 600, 500, "menubar=no,scrollbars=no,statusbar=no");
};

//private
SocialSharer.popup = function(url, width, height, options)
{
	var top = ((window.innerHeight) - height) / 2;
	var left = ((window.innerWidth) - width) / 2;
	window.open(url, "", "top="+top+",left="+left+",width="+width+",height="+height+","+options);
};

SocialSharer.cleanParam = function(string)
{
	if (string)
	{
		string = string.replace('#', '%23');
		return string;
	}
	else
		return "";
};
function CodeEvent()
{
}

CodeEvent.DIGIT_PUSHED = 'digitPushed';
CodeEvent.CODE_COMPLETE = 'codeComplete';
CodeEvent.CODE_COMPLETE_WRONG = 'codeCompleteWrong';
function CodeModel(){
	this.code = new Array();
	this.buffer = new Array();
}

CodeModel.prototype.code = '';
CodeModel.prototype.buffer = '';

CodeModel.prototype.setCode = function(code){
	this.code = code;
};

CodeModel.prototype.push = function(element){
	this.buffer.push(element);
	jQuery(this).trigger(CodeEvent.DIGIT_PUSHED);
};

CodeModel.prototype.initializeBuffer = function(){
	this.buffer = new Array();
};

CodeModel.prototype.dispatchComplete = function(){
	jQuery(this).trigger(CodeEvent.CODE_COMPLETE);
};

CodeModel.prototype.dispatchCompleteWrong = function(){
	jQuery(this).trigger(CodeEvent.CODE_COMPLETE_WRONG);
};
/**
 * Parent class of FlushingCodeController. Waits for all digits to have been
 * input, then dispatches granted or denied. FlushingCodeController is the same,
 * except for it flushes buffer on first wrong digit.
 */

function CodeController() {
}

CodeController._extends(AbstractObject);

CodeController.prototype.init = function() {
	this.createModel();
};

CodeController.prototype.createModel = function() {
	this.model = new CodeModel();
};

CodeController.prototype.setCode = function(code) {
	this.model.setCode(code);
};

CodeController.prototype.push = function(element) {
	this.model.push(element);
	if (this.model.buffer.length == this.model.code.length) {
		if (this.model.buffer.equals(this.model.code)) {
			this.model.dispatchComplete();
			this.flush();
		} else {
			this.model.dispatchCompleteWrong();
			this.flush();
		}
	}
};

CodeController.prototype.flush = function() {
	this.model.initializeBuffer();
};
function FlushingCodeController() {
}

FlushingCodeController._extends(CodeController);

FlushingCodeController.prototype.push = function(element) {
	if (this.canPush(element)) {
		this.model.push(element);
	} else {
		this.flush();
		if (this.canPush(element)) {
			this.model.push(element);
		}
	}
	if (this.model.buffer.length == this.model.code.length) {
		this.model.dispatchComplete();
		this.flush();
	}
};

FlushingCodeController.prototype.canPush = function(element) {
	return this.model.code[this.model.buffer.length] == element;
};
function KeyboardCodeController(){}

KeyboardCodeController._extends(FlushingCodeController);

KeyboardCodeController.prototype.init = function()
{
	KeyboardCodeController._super.init.call(this);
	
	this.bind(document, 'keydown', this.onKeyDown);
};

KeyboardCodeController.prototype.onKeyDown = function(event)
{
	this.push(String.fromCharCode(event.keyCode));
};
function SelectionEvent()
{
}

SelectionEvent.ON_CURRENT_UPDATED = "onCurrentUpdated";
SelectionEvent.ON_OVER_UPDATED = "onOverUpdated";
SelectionEvent.ON_SCOPE_UPDATED = "onScopeUpdated";
SelectionEvent.ON_TOTAL_COUNT_UPDATED = "onTotalCountUpdated";
SelectionEvent.ON_OFFSET_UPDATED = "onOffsetUpdated";
SelectionEvent.ON_STATE_UPDATED = "onStateUpdated";
function SelectionModel(){
	this.scope = [];
	this.offset = 0;
	this.totalCount = 0;
	this.over = undefined;
	this.current = undefined;
	this.state = undefined;
}

SelectionModel.prototype.destroy = function() {
	jQuery(this).unbind(SelectionEvent.ON_CURRENT_UPDATED);
	jQuery(this).unbind(SelectionEvent.ON_OVER_UPDATED);
	jQuery(this).unbind(SelectionEvent.ON_SCOPE_UPDATED);
	jQuery(this).unbind(SelectionEvent.ON_TOTAL_COUNT_UPDATED);
	jQuery(this).unbind(SelectionEvent.ON_OFFSET_UPDATED);
};

SelectionModel.prototype.setCurrent = function(current) {
	this.current = current;
	jQuery(this).trigger(SelectionEvent.ON_CURRENT_UPDATED, this.current);
};

SelectionModel.prototype.setOver = function(over) {
	this.over = over;
	jQuery(this).trigger(SelectionEvent.ON_OVER_UPDATED, this.over);
};

SelectionModel.prototype.setScope = function(scope) {
	this.scope = scope;
	jQuery(this).trigger(SelectionEvent.ON_SCOPE_UPDATED);
};

SelectionModel.prototype.setOffset = function(offset) {
	this.offset = offset;
	jQuery(this).trigger(SelectionEvent.ON_OFFSET_UPDATED, this.offset);
};

SelectionModel.prototype.setTotalCount = function(totalCount) {
	this.totalCount = totalCount;
	jQuery(this).trigger(SelectionEvent.ON_TOTAL_COUNT_UPDATED, this.totalCount);
};

SelectionModel.prototype.setState = function(state) {
	this.state = state;
	jQuery(this).trigger(SelectionEvent.ON_STATE_UPDATED, this.state);
};
function SelectionController()
{
	this.model = undefined;
}

SelectionController._extends(AbstractObject);

SelectionController.prototype.destroy = function(){
	if(this.model !== undefined){
		this.model.destroy();
		this.model = null;
	}
};

SelectionController.prototype.init = function(){
	this.createModel();
};

SelectionController.prototype.createModel = function(){
	this.model = new SelectionModel();
};

SelectionController.prototype.goNext = function(current)
{
	var index = jQuery.inArray(this.model.current, this.model.scope);
	this.model.setCurrent(this.model.scope[(index+1)%this.model.scope.length]);
};

SelectionController.prototype.setState = function(state){
	if(this.model === undefined) return;
	if(this.model.state !== state){
		this.model.setState(state);
	}
};

SelectionController.prototype.setCurrent = function(current){
	if(this.model === undefined) return;
	if(this.model.current !== current){
		this.model.setCurrent(current);
	}
};

SelectionController.prototype.setOver = function(over){
	if(this.model === undefined) return;
	if(this.model.over !== over){
		this.model.setOver(over);
	}
};

SelectionController.prototype.setScope = function(scope){
	this.model.setScope(scope);
};

SelectionController.prototype.goPrevious = function()
{
	var scope = this.model.scope;
	var index = jQuery.inArray(this.model.current, scope);
	this.setCurrent(scope[(index-1+scope.length)%scope.length]);
};

SelectionController.prototype.goNext = function()
{
	var scope = this.model.scope;
	var index = jQuery.inArray(this.model.current, scope);
	this.setCurrent(scope[(index+1)%scope.length]);
};
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
	jQuery(this).trigger(FacebookEvent.ON_SESSION);
};

FacebookModel.prototype.setLikes = function(likes)
{
	this.likes = likes;
	jQuery(this).trigger(FacebookEvent.LIKES_UPDATED);
};
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
function FacebookEvent()
{
}

FacebookEvent.ON_SESSION = "onSession";
FacebookEvent.PHOTO_ADDED = "photoAdded";
FacebookEvent.API_CALL_SUCCESS = "apiCallSuccess";
FacebookEvent.LIKES_UPDATED = "likesUpdated";function TwitterEvent()
{
}

TwitterEvent.ON_CONNECTED_CHANGE = "onConnectedChange";
TwitterEvent.ON_TWEET_SUCCESS = "onTweetSuccess";function TwitterModel()
{
	this.connected = false;
}

TwitterModel.prototype.setConnected = function(connected)
{
	this.connected = connected;
	jQuery(this).trigger(TwitterEvent.ON_CONNECTED_CHANGE);
};

TwitterModel.prototype.notify = function(eventType)
{
	jQuery(this).trigger(eventType);
};
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
function SWFAddressSelectionController(){
	this.started = false;
	this.nextvalue = undefined;
}

SWFAddressSelectionController.prototype = new SelectionController();

//known bug: this function must be called early, before SWFAddressEvent.INIT is dispatched.
SWFAddressSelectionController.prototype.init = function()
{
	SelectionController.prototype.init.call(this);
	if(typeof SWFAddress != "undefined"){
		jQuery(SWFAddress).bind(SWFAddressEvent.INIT, jQuery.proxy(this.onSWFAddressInit, this));
	}else{
		this.started = true;
	}
};

SWFAddressSelectionController.prototype.createModel = function(){
	this.model = new SWFAddressSelectionModel();
};

SWFAddressSelectionController.prototype.setCurrent = function(current)
{
	if(this.started){
		if(typeof SWFAddress != "undefined"){
			SWFAddress.setValue(current);
		}else{
			this.loadPath(current);
		}
	}else{
		this.nextvalue = current;
	}
};

//private
SWFAddressSelectionController.prototype.onSWFAddressInit = function(event)
{
	this.started = true;
	jQuery(SWFAddress).bind(SWFAddressEvent.CHANGE, jQuery.proxy(this.onSWFAddressChange, this));
	if(this.nextvalue != undefined){
		this.setCurrent(this.nextvalue);
		this.nextvalue = '';
	}
};

SWFAddressSelectionController.prototype.onSWFAddressChange = function(event)
{
	this.model.history.push(SWFAddress.getValue());
	this.setState(SWFAddressSelectionEvent.LOADING);
	
	this.loadPath(SWFAddress.getValue().substr(1));
	return false;
};

SWFAddressSelectionController.prototype.loadPath = function(path)
{
	var params = {};
	params.type = 'GET';
	params.url = UrlToolbox.getBasePath() + "/" + path;
	params.success = jQuery.proxy(this.onRequestSuccess, this);
	params.error = jQuery.proxy(this.onRequestError, this);
	jQuery.ajax(params);
};

SWFAddressSelectionController.prototype.onRequestSuccess = function(data)
{
	this.setState(SWFAddressSelectionEvent.LOADED);
	this.model.setCurrent(data);
};

SWFAddressSelectionController.prototype.onRequestError = function(jqXHR, textStatus, errorThrown)
{
	//console.info(errorThrown);
};
function SWFAddressSelectionEvent()
{
}

SWFAddressSelectionEvent.LOADING = 'loading';
SWFAddressSelectionEvent.LOADED = 'loaded';
function SWFAddressSelectionModel()
{
	this.history = new Array();
}

SWFAddressSelectionModel.prototype = new SelectionModel();


function AbstractMenuItemView()
{
}

AbstractMenuItemView._extends(AbstractView);

AbstractMenuItemView.prototype.destroy = function()
{
	if (this.controller != undefined)
	{
		this.unbind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED+"."+this.namespaceId, this.onCurrentUpdated);
		this.unbind(this.controller.model, SelectionEvent.ON_OVER_UPDATED+"."+this.namespaceId, this.onOverUpdated);
	}
	AbstractMenuItemView._super.destroy.call(this);
};

AbstractMenuItemView.prototype.init = function(tag, parent)
{
	AbstractMenuItemView._super.init.call(this, tag, parent);

	this.bind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED+"."+this.namespaceId, this.onCurrentUpdated);
	this.bind(this.controller.model, SelectionEvent.ON_OVER_UPDATED+"."+this.namespaceId, this.onOverUpdated);
};

//protected
AbstractMenuItemView.prototype.hilite = function()
{
};

AbstractMenuItemView.prototype.unhilite = function()
{
};

//private
AbstractMenuItemView.prototype.onMouseOver = function()
{
	if(this.controller != null){
		this.controller.setOver(this.id);
	}
};

AbstractMenuItemView.prototype.onMouseOut = function()
{
	if (this.controller != null)
	{
		this.controller.setOver(null);
	}
};

AbstractMenuItemView.prototype.onClick = function()
{
	if(this.controller != null){
		this.controller.setCurrent(this.id);
	}
};

AbstractMenuItemView.prototype.onOverUpdated = function()
{
	if (this.controller.model.over === this.id)
	{
		this.hilite();
	}
	else if (this.current !== this.id)
	{
		this.unhilite();
	}
};

AbstractMenuItemView.prototype.onCurrentUpdated = function()
{
	if (this.controller.model.current === this.id)
	{
		this.hilite();
	}
	else
	{
		this.unhilite();
	}
};
//bugged, stops after several loops

function AnimationHelper()
{
}

AnimationHelper.ENTER_FRAME = "enterFrame";
AnimationHelper.instance = undefined;

AnimationHelper.getInstance = function()
{
	if (!AnimationHelper.instance)
	{
		AnimationHelper.instance = new AnimationHelper();
		AnimationHelper.instance.init();
	}
	return AnimationHelper.instance;
};

AnimationHelper.prototype.init = function()
{
	var requestAnimationFrame = window.requestAnimationFrame 
			|| window.mozRequestAnimationFrame 
			|| window.webkitRequestAnimationFrame 
			|| window.msRequestAnimationFrame 
			|| window.oRequestAnimationFrame 
			|| function(callback){
        			window.setTimeout(callback, 1000 / 60);
    			};  
	window.requestAnimationFrame = requestAnimationFrame;
	window.requestAnimationFrame(jQuery.proxy(this.onEnterFrame, this));
};

AnimationHelper.prototype.onEnterFrame = function()
{
	window.requestAnimationFrame(jQuery.proxy(this.onEnterFrame, this));
	jQuery(this).trigger(AnimationHelper.ENTER_FRAME);
};function DrupalServices()
{
	this.basePath = window['Drupal'] ? Drupal.settings.basePath : undefined;
	this.postponedRequests = new Array();
	this.headers = {
		'Content-Type': 'application/json'
	};
}

DrupalServices._extends(AbstractObject);

DrupalServices.token = undefined;

DrupalServices.prototype.callAction = function(action, resultCallback, faultCallback, data)
{
	if (this.basePath == undefined)
		throw new Error('Basepath is undefined');
	
	var request = new Object();
	request.url = this.basePath + 'rest-endpoint/' + action;
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
