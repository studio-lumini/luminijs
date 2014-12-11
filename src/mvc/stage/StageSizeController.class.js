function StageSizeController() {
    this.model = undefined;
}

StageSizeController._extends(AbstractObject);

StageSizeController.instance = undefined;

StageSizeController.getInstance = function () {
    if (StageSizeController.instance === undefined) {
        StageSizeController.instance = new StageSizeController();
        StageSizeController.instance.init();
    }
    return StageSizeController.instance;
};

StageSizeController.prototype.createModel = function () {
    this.model = new StageSizeModel();
};

StageSizeController.prototype.destroy = function () {
    this.unbind(window, 'resize', this.onStageResize);
};

StageSizeController.prototype.init = function () {
    this.createModel();
    this.bind(window, 'resize', this.onStageResize);
    this.onStageResize(null);
};

StageSizeController.prototype.onStageResize = function (event) {
    this.model.setSize(new Array(jQuery(window).width(), jQuery(window).height()));
};

StageSizeController.prototype.setMinimumSize = function (minimumSize) {
    this.model.setMinimumSize(minimumSize);
    this.onStageResize(null);
};

StageSizeController.prototype.setMaximumSize = function (maximumSize) {
    this.model.setMaximumSize(maximumSize);
    this.onStageResize(null);
};
