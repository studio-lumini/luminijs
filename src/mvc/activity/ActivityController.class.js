function ActivityController(){}
ActivityController._extends(AbstractObject);

ActivityController.instance = undefined;

ActivityController.getInstance = function(){
  if(ActivityController.instance === undefined){
    var instance = new ActivityController();
    instance.init();
    ActivityController.instance = instance;
  }
  return ActivityController.instance;
};

ActivityController.prototype.init = function(){
  this.createModel()
};

ActivityController.prototype.createModel = function() {
  this.model = new ActivityModel();
};

ActivityController.prototype.enable = function() {
  if(!this.model.enabled){
    this.model.enable();
    this.timeout = setTimeout(jQuery.proxy(this.onTimeout, this), this.model.inactivityDuration);
    this.bind(jQuery(document), 'mousemove', jQuery.proxy(this.onMouseMove, this));
  }
};

ActivityController.prototype.disable = function() {
  this.model.disable();
  clearTimeout(this.timeout);
  this.unbind(jQuery(document), 'mousemove', jQuery.proxy(this.onMouseMove, this));
};

ActivityController.prototype.onTimeout = function() {
  this.model.setActivityOFF();
};

ActivityController.prototype.onMouseMove = function() {
  if(!this.model.active){
    this.model.setActivityON();
  }
  clearTimeout(this.timeout);
  this.timeout = setTimeout(jQuery.proxy(this.onTimeout, this), this.model.inactivityDuration);
};
