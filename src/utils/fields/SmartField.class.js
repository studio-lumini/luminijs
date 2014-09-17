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
