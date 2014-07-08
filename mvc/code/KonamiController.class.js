function KonamiController()
{}
KonamiController.prototype = new CodeController();

KonamiController.instance = undefined;
		
KonamiController.getInstance = function()
{
	if (KonamiController.instance === undefined){
		KonamiController.instance = new KonamiController();
		KonamiController.instance.init();
	}
	return KonamiController.instance;
};

KonamiController.prototype.init = function()
{
	CodeController.prototype.init.call(this);
	
//	if(Capabilities.os.indexOf("Mac") != -1){
		this.model.code = new Array(38,38,40,40,37,39,37,39,66,65);
//	}else{
//		this.model.code = new Array(Keyboard.UP,Keyboard.UP,Keyboard.DOWN,Keyboard.DOWN,Keyboard.LEFT,Keyboard.RIGHT,Keyboard.LEFT,Keyboard.RIGHT,Keyboard.B,Keyboard.A);
//	}
	document.onkeydown = jQuery.proxy(this.onKeyDown, this);
};

KonamiController.prototype.onKeyDown = function(event)
{
	this.push(event.keyCode);
};
