function ActivityModel(){
  this.active = false;
  this.inactivityDuration = 2000;
}

ActivityModel.prototype.setActivityON = function(){
  this.active = true;
  jQuery(this).trigger(ActivityEvent.ACTIVITY_ON);
};

ActivityModel.prototype.setActivityOFF = function(){
  this.active = false;
  jQuery(this).trigger(ActivityEvent.ACTIVITY_OFF);
};

ActivityModel.prototype.enable = function() {
  this.enabled = true;
  jQuery(this).trigger(ActivityEvent.ACTIVITY_ENABLED);
};

ActivityModel.prototype.disable = function() {
  this.enabled = false;
  jQuery(this).trigger(ActivityEvent.ACTIVITY_DISABLED);
};

