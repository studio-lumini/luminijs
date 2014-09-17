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
