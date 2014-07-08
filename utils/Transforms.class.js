function Transforms(){}

Transforms.transform = function(tag,value){
	jQuery(tag).css('transform', value);
	jQuery(tag).css('-moz-transform', value);
	jQuery(tag).css('-ms-transform', value);
	jQuery(tag).css('-webkit-transform', value);
};