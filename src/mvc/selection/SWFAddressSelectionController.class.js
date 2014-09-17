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
