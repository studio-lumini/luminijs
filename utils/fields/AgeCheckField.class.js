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
