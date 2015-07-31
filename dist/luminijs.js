function ContentFactory()
{
	
}

/**
 * @param film Film
 * @param height int
 * @param width int
 * @param autoplay Boolean
 * @param controls Boolean
 * @param preload String
 * 		auto|metadata|none
 */
ContentFactory.getVideo = function(film, width, height, autoplay, controls, preload)
{
	var attributes  = "";
	attributes += autoplay ? "autoplay='autoplay'" : "";
	attributes += controls ? "controls='controls'" : "";
	attributes += "height='" + height + "' ";
	attributes += "width='" + width + "' ";
	attributes += "preload='" + preload + "' ";
	
	$tag = "<video " + attributes + ">";
	$tag += "<source src='" + film.src + "' type='" + film.mime + "' >";
	$tag += "</video>";
	return $tag;
};function FullScreenDelegate()
{
}

FullScreenDelegate.prototype.parent = "";
FullScreenDelegate.prototype.tag = "";
FullScreenDelegate.prototype.tagInitWidth = "";
FullScreenDelegate.prototype.tagInitHeight = "";

FullScreenDelegate.prototype.destroy = function()
{
	jQuery(StageSizeController.getInstance().model).unbind(StageSizeEvent.STAGE_RESIZE, jQuery.proxy(this.onStageResize, this));
};

FullScreenDelegate.prototype.init = function(parent, tag)
{
	this.parent = jQuery(parent);
	this.tag = jQuery(tag);
	this.parent.css({"position": "fixed", "overflow": "hidden"});
	this.tag.css({"position": "absolute"});
	this.tagInitWidth = this.tag.width();
	
	this.tagInitHeight = this.tag.height();

	jQuery(StageSizeController.getInstance().model).bind(StageSizeEvent.STAGE_RESIZE, jQuery.proxy(this.onStageResize, this));
	this.onStageResize(null);
};

FullScreenDelegate.prototype.onStageResize = function(event)
{
	var size = StageSizeController.getInstance().model.size;
	var offsetX = 10;
	var scale = Math.max((size[0]+2*offsetX)/this.tagInitWidth, size[1]/this.tagInitHeight);
	//this.tag.attr("width", size[0] * scale);
	//this.tag.attr("height", size[1] * scale);
	this.tag.attr("width", this.tagInitWidth * scale);
	this.tag.attr("height", this.tagInitHeight * scale);
	this.parent.width(size[0]);
	this.parent.height(size[1]);
	
	this.tag.css({"top": (size[1] - this.tag.attr("height")) / 2});
	this.tag.css({"left": (size[0] + 2 * offsetX - this.tag.attr("width")) / 2 - offsetX});
};
function Hotspot() {	this.enabled = '';	this.state = '';	this.tag = '';	this.id = '';}Hotspot.IN = "in";Hotspot.OUT = "out";Hotspot.ON_ROLLOVER = "onRollOver";Hotspot.ON_ROLLOUT = "onRollOut";Hotspot.prototype.destroy = function(){	this.disable();};Hotspot.prototype.onMouseMove = function(e){		this.checkPosition(e.pageX, e.pageY);};Hotspot.prototype.checkPosition = function(x, y){	if(this.isMouseOver(x, y, this.tag) && this.state != Hotspot.IN){		this.state = Hotspot.IN;		jQuery(this).trigger(Hotspot.ON_ROLLOVER);	}else if(!this.isMouseOver(x, y, this.tag) && this.state != Hotspot.OUT){		this.state = Hotspot.OUT;		jQuery(this).trigger(Hotspot.ON_ROLLOUT);	}};Hotspot.prototype.onTouchMoved = function(e, x, y){	this.checkPosition(x,y);};Hotspot.prototype.enable = function(){	if(!this.enabled){		this.enabled = true;		jQuery(document).bind('mousemove', jQuery.proxy(this.onMouseMove, this));		jQuery(document).bind(TouchObject.MOVED, jQuery.proxy(this.onTouchMoved, this));	}};Hotspot.prototype.disable = function(){	if(this.enabled){		this.enabled = false;		jQuery(document).unbind('mousemove', jQuery.proxy(this.onMouseMove, this));		jQuery(document).unbind(TouchObject.MOVED, jQuery.proxy(this.onTouchMoved, this));	}};Hotspot.prototype.isMouseOver = function(x,y,element){	if(0 < element.children().length){		//Si on est en contact avec le hotspotMain : 		//On considère que l'on est dans le jeu, et que l'on peut donc incrémenter les hotspot		var over = false;		for ( var i = 0; i < element.children().length; i++) {			over = this.isMouseOverElement(x,y,jQuery(element.children()[i]));			if(over){				return true;			}		}	}else{		return this.isMouseOverElement(x,y,element);	}	return false;};Hotspot.prototype.isMouseOverElement = function(x,y,element){	var offset;	var xTest;	var yTest;	offset = element.offset();	xTest = (0 < x-offset.left) && (x-offset.left < element.width());	yTest = (0 < y-offset.top) && (y-offset.top < element.height());	if(xTest && yTest){		return true;	}else{		return false;	}};function Loader()
{
	this.name = '';
	this.connections = 0;
	this.queue = new Array();
	this.div = jQuery("<div></div>").appendTo("body");
	this.div.css({'visibility': 'hidden', 'height': '0', 'overflow': 'hidden'});
}

Loader.LOADED = "loaded";
Loader.QUEUE_EMPTY = "queueEmpty";
Loader.maxConnections = 5;
Loader.prototype.div = "";
Loader.prototype.queue = "";
Loader.prototype.connections = "";

Loader.prototype.append = function(src)
{
	this.queue.push(src);
};

Loader.prototype.prepend = function(src)
{
	this.queue.reverse();
	this.queue.push(src);
	this.queue.reverse();
};

Loader.prototype.load = function()
{
	while (this.connections < Loader.maxConnections && 0 < this.queue.length)
	{
		var src = this.queue.shift();
		var element = jQuery("<img src='" + src + "'/>");
		this.connections++;
		element.load(jQuery.proxy(this.loaded, this));
		element.appendTo(this.div);
	}
};

Loader.prototype.getContent = function()
{
	return this.div.find("img");
};

//private
Loader.prototype.loaded = function(event)
{
	this.connections--;
	if (this.queue.length > 0)
		this.load();
	else if (this.connections == 0)
		jQuery(this).trigger(Loader.QUEUE_EMPTY);
	//jQuery(this).trigger(Loader.LOADED);
};

function MovieClip()
{	
}

MovieClip.prototype.timerId = "";
MovieClip.prototype._frame = "";
MovieClip.prototype.frames = "";
MovieClip.ENDED = 'ended';

MovieClip.prototype.init = function(tag)
{
	if (!(this.tag = jQuery(tag)))
		return;
	this.frames = this.tag.find("img");
	this.frame = 0;
};

MovieClip.prototype.getFrame = function()
{
	return this._frame;
};

MovieClip.prototype.setFrame = function(frame)
{
	this._frame = Math.min(this.frames.length - 1, Math.max(0, parseInt(frame, 10)));
	this.frames.css({'display': 'none'});
	jQuery(this.frames[this._frame]).css({'display': 'block'});
};

Object.defineProperty(MovieClip.prototype, "frame", {get : MovieClip.prototype.getFrame,
    set : MovieClip.prototype.setFrame,
    enumerable : true});

MovieClip.prototype.play = function()
{
	if (this.timerId == "")
		this.timerId = setInterval(jQuery.proxy(this.nextFrame, this), 40);
};

MovieClip.prototype.stop = function()
{
	clearInterval(this.timerId);
	this.timerId = "";
};

//Private
MovieClip.prototype.nextFrame = function(){
	this.frame++;
	if(this.frame == this.frames.length - 1){
		this.stop();
		jQuery(this).trigger(MovieClip.ENDED);
		
	}
}; 

MovieClip.prototype.previousFrame = function(){
	if(this.frame != 0){
		this.frame--;
	}
}; Object.defineProperty(Array.prototype, "equals", {
    enumerable: false,
    writable: true,
    value: function(array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time
        if (this.length != array.length)
            return false;

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
});
function ExtendedMath()
{
	
}

ExtendedMath.sign = function(x)
{
	if (x < 0)
		return -1;
	else if (x > 0)
		return 1;
	else
		return 0;
};

ExtendedMath.round = function(x, n)
{
	if (x.toString().indexOf('.') == -1)
		return x;
	if (n == 0)
		return Math.round(x);
	
	var integerPart = x.toString().split('.')[0];
	var decimalPart = x.toString().split('.')[1];
	decimalPart = decimalPart.substring(0, n);
	
	if (decimalPart.length == 0)
		return parseInt(integerPart);
	else
		return parseFloat(integerPart + '.' + decimalPart);
};
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
function KonamiCodeController() {
}

KonamiCodeController._extends(KeyboardCodeController);

KonamiCodeController.instance = undefined;

KonamiCodeController.getInstance = function() {
	if (KonamiCodeController.instance === undefined) {
		KonamiCodeController.instance = new KonamiCodeController();
		KonamiCodeController.instance.init();
	}
	return KonamiCodeController.instance;
};

KonamiCodeController.prototype.init = function() {
	KonamiCodeController._super.init.call(this);

	this.model.code = new Array(38, 38, 40, 40, 37, 39, 37, 39, 66, 65);
};
function PermutationCodeController(){
}
PermutationCodeController._extends(CodeController);

PermutationCodeController.prototype.canPush = function(element) {
	if(this.model.buffer.length == 0) return true;
	var lastIndex = this.model.code.indexOf(this.model.buffer[this.model.buffer.length-1]);
	return this.model.code[(lastIndex+1)%this.model.code.length] == element;
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
FacebookEvent.LIKES_UPDATED = "likesUpdated";function FacebookModel()
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
function NextButtonView()
{
	this.selectionController = undefined;
}

NextButtonView._extends(AbstractView);

NextButtonView.prototype.init = function(tag, parent)
{
	AbstractView.prototype.init.call(this, tag, parent);

	this.bind(this.tag, 'click', this.onClick);
};

//private
NextButtonView.prototype.onClick = function()
{
	this.selectionController.goNext();
};
function PreviousButtonView()
{
	this.selectionController = undefined;
}

PreviousButtonView._extends(AbstractView);

PreviousButtonView.prototype.init = function(tag, parent)
{
	AbstractView.prototype.init.call(this, tag, parent);

	this.bind(this.tag, 'click', this.onClick);
};

//private
PreviousButtonView.prototype.onClick = function()
{
	this.selectionController.goPrevious();
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
function TwitterEvent()
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
};function Cookie()
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
function BrowserDetection(){}

BrowserDetection.isSafari = function(){
	  var ua = navigator.userAgent.toLowerCase(); 
	  if (ua.indexOf('safari')!=-1){ 
	    if(ua.indexOf('chrome')  > -1){
	     	return false;
	    }else{
	    	return true;
	    }
	   }
	  	
};

function DeviceDetection(){}

DeviceDetection.isPad = function() {
	return navigator.userAgent.indexOf('iPad') != -1; 
};

DeviceDetection.isPhone = function() { 
	return navigator.userAgent.indexOf('iPhone') != -1; 
};

DeviceDetection.isAndroidTablet = function() {
	return navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') == -1;
};

DeviceDetection.isAndroidPhone = function() {
	return navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1;
};

DeviceDetection.hasTouchScreen = function() {
    return 'ontouchstart' in document.documentElement;
};
function DomUtils()
{
	
}

DomUtils.searchParentContainer = function(element, classname){
	while(!element.hasClass(classname)){
		element = element.parent();
	}
	return element;
};
function DrupalServices()
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
	request.url = this.basePath + 'services/session/token';
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
function Entity()
{
}
function Field() {}

Field.LANGUAGE_NONE = 'und';

Field.prototype.setValue = function(value, language, index, key)
{
	if (!language) language = Field.LANGUAGE_NONE;
	if (!index) index = 0;
	if (!key) key = 'value';
	
	this[language] = new Array();
	this[language][index] = {};
	this[language][index][key] = value;
};

Field.prototype.getValue = function(language, index, key)
{
	if (!language) language = Field.LANGUAGE_NONE;
	if (!index) index = 0;
	if (!key) key = 'value';
	
	return this[language][index][key]; 
};
function User()
{
	this.uid = undefined;
	this.name = undefined;
	this.mail = undefined;
}

User._extends(Entity);
function AgeCheckField()
{
	this.input = "";
	this.defaultText = "";
}

AgeCheckField.STATE_CHANGE = "stateChange";
AgeCheckField.prototype.active = false; 

AgeCheckField.prototype = new SmartField(); 
	
AgeCheckField.prototype.init = function(input)
{
	SmartField.prototype.init.call(this, input);	
	this.input.bind('input', jQuery.proxy(this.onInput, this));
	this.input.bind('keydown', jQuery.proxy(this.onKeyDown, this));
};

//private
AgeCheckField.prototype.onKeyDown = function(e)
{
	this.lastCode = e.keyCode;
};

AgeCheckField.prototype.onInput = function(){
	if(this.input.val().length == 10){
		this.setActive(true);
	}
	else if(this.input.val().length == 2 && this.lastCode != 8){
		var data = this.input.val();
		this.input.val('');
		this.input.val(data + '/');
	}
	else if(this.input.val().length == 4 && this.input.val().substr(3) == "/"){
		var data = this.input.val().slice(0,this.input.val().length-1);
		this.input.val(data);
	}
	else if(this.input.val().length == 5 && this.lastCode != 8){
		var data = this.input.val();
		this.input.val('');
		this.input.val(data + '/');
	}
	else if(this.input.val().length == 7 && this.input.val().substr(6) == "/"){
		var data = this.input.val().slice(0,this.input.val().length-1);
		this.input.val(data);
	}
	else{
		this.setActive(false);
	}
};

AgeCheckField.prototype.setActive = function(active){
	this.active = active;
	jQuery(this).trigger(AgeCheckField.STATE_CHANGE);
};
function SmartField()
{
	this.input = "";
	this.defaultText = "";
}

SmartField.prototype.init = function(input, defaultText)
{
	this.input = jQuery(input);
	if (!defaultText)
		this.defaultText = this.input.attr("value");
	else
		this.defaultText = defaultText;
	
	this.input.bind("focus", jQuery.proxy(this.onFocus, this));
	this.input.bind("blur", jQuery.proxy(this.onBlur, this));
};

//private
SmartField.prototype.onFocus = function()
{
	if (this.input.val() == this.defaultText)
		this.input.val('');
};

SmartField.prototype.onBlur = function()
{
	if (this.input.val() == '') 
		this.input.val(this.defaultText);
};
// This class is only to be used with Drupal Lumini Share module.
function DrupalSocialSharer()
{
}

DrupalSocialSharer.shareFacebook = function()
{
	var title = Drupal.settings.share.share_admin_facebook_title;
	var imageLink = Drupal.settings.share.share_admin_facebook_image;
	var link = Drupal.settings.share.share_admin_facebook_url;
	var description = Drupal.settings.share.share_admin_facebook_description;
	SocialSharer.shareFacebook(title, imageLink, link, description);
};

DrupalSocialSharer.shareTwitter = function()
{
	var hashtags = Drupal.settings.share.share_admin_twitter_hashtags;
	var url = Drupal.settings.share.share_admin_twitter_url;
	var text = Drupal.settings.share.share_admin_twitter_title;
	SocialSharer.shareTwitter(url, text, hashtags);
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
function Transforms(){}

Transforms.transform = function(tag,value){
	jQuery(tag).css('transform', value);
	jQuery(tag).css('-moz-transform', value);
	jQuery(tag).css('-ms-transform', value);
	jQuery(tag).css('-webkit-transform', value);
};function UrlToolbox()
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
function VideoController(video)
{
}

VideoController.prototype.model = "";
VideoController.prototype.video = "";

VideoController.prototype.createModel = function()
{
	this.model = new VideoModel();
};

VideoController.prototype.init = function()
{
	this.video = jQuery(this.video);
	this.video.bind(VideoModel.PLAYING, jQuery.proxy(this.onPlaying, this));
	this.video.bind(VideoModel.PAUSE, jQuery.proxy(this.onPause, this));
	//this.video.bind("timeupdate", jQuery.proxy(this.onTimeUpdate, this));
	this.video.bind(VideoModel.ENDED, jQuery.proxy(this.onEnded, this));
};

VideoController.prototype.play = function()
{
	if (!this.model.isPlaying)
	{
		this.video.get(0).play();
	}
};

VideoController.prototype.pause = function()
{
	if (this.model.isPlaying)
	{
		this.video.get(0).pause();
	}
};

//private
VideoController.prototype.onPlaying = function()
{
	this.model.playing();
	
};

VideoController.prototype.onPause = function()
{
	this.model.pause();
	
};

VideoController.prototype.onTimeUpdate = function(event)
{
	this.model.timeUpdate(event);
};

VideoController.prototype.onEnded = function()
{
		this.model.ended();
};

VideoController.prototype.load = function(){
	this.video.get(0).load();
	this.model.isPlaying = false;
	this.model.isEnded = false;
	
};

VideoController.prototype.seek = function(time){
	
	if(this.video.get(0).currentTime){
		this.video.get(0).currentTime = time;
	}	
};
function VideoModel()
{
}

VideoModel.PLAYING = "playing";
VideoModel.PAUSE = "pause";
VideoModel.ENDED = "ended";

VideoModel.prototype.isPlaying = "";
VideoModel.prototype.isEnded = "";

VideoModel.prototype.playing = function()
{
	//console.info('VideoModel.prototype.playing');
	if(!this.isPlaying){
		this.isPlaying = true;
		jQuery(this).trigger(VideoModel.PLAYING);
	}
};

VideoModel.prototype.pause = function()
{
	//console.info('VideoModel.prototype.pause');
	if(this.isPlaying){
		this.isPlaying = false;
		jQuery(this).trigger(VideoModel.PAUSE);
	}
	
};

VideoModel.prototype.timeUpdate = function()
{
	//console.info(event.target.currentTime);
};

VideoModel.prototype.ended = function(event)
{
	//console.info('VideoModel.prototype.ended');
	this.isPlaying = false;
	if(!this.isEnded){
		this.isEnded = true;
		jQuery(this).trigger(VideoModel.ENDED);
	}
		
	
	
};
function CuePoint()
{
	
}

CuePoint.prototype.time = "";
CuePoint.prototype.duration = "";
CuePoint.prototype.active = "";
function Film(src, mime)
{
	this.src = src;
	this.mime = mime;
}

Film.prototype.src = "";
Film.prototype.mime = "";
Film.prototype.cuepoints = "";
