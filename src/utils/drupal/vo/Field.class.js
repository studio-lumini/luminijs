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
