function SWFAddressSelectionController() {
  this.started = false;
  this.nextvalue = undefined;
}

SWFAddressSelectionController._extends(PageSelectionController);

//known bug: this function must be called early, before SWFAddressEvent.INIT is dispatched.
SWFAddressSelectionController.prototype.init = function () {
  SWFAddressSelectionController._super.init.call(this);
  if (typeof SWFAddress != "undefined") {
    jQuery(SWFAddress).bind(SWFAddressEvent.INIT, jQuery.proxy(this.onSWFAddressInit, this));
  }
  else {
    this.started = true;
  }
};

SWFAddressSelectionController.prototype.setCurrent = function (current) {
  if (this.started) {
    if (typeof SWFAddress != "undefined") {
      SWFAddress.setValue(current);
    }
    else {
      this.loadPage(current);
    }
  }
  else {
    this.nextvalue = current;
  }
};

//private
SWFAddressSelectionController.prototype.onSWFAddressInit = function (event) {
  this.started = true;
  jQuery(SWFAddress).bind(SWFAddressEvent.CHANGE, jQuery.proxy(this.onSWFAddressChange, this));
  if (this.nextvalue != undefined) {
    this.setCurrent(this.nextvalue);
    this.nextvalue = '';
  }
};

SWFAddressSelectionController.prototype.onSWFAddressChange = function (event) {
  this.model.history.push(SWFAddress.getValue());
  this.model.setCurrent(SWFAddress.getValue());

  this.setState(PageSelectionEvent.LOADING);

  this.loadPage(SWFAddress.getValue().substr(1));
  return false;
};
