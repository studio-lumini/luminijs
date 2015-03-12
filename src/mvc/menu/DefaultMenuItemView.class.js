function DefaultMenuItemView () {

}

DefaultMenuItemView._extends(AbstractMenuItemView);

DefaultMenuItemView.prototype.destroy = function(){
	this.unbind(this.$tag, 'mouseover', this.onMouseOver);
	this.unbind(this.$tag, 'mouseout', this.onMouseOut);
	this.unbind(this.$tag, 'click', this.onClick);
	DefaultMenuItemView._super.destroy.call(this);
};

DefaultMenuItemView.prototype.init = function(tag, parent){
	DefaultMenuItemView._super.init.call(this, tag, parent);
	this.bind(this.$tag, 'mouseover', this.onMouseOver);
	this.bind(this.$tag, 'mouseout', this.onMouseOut);
	this.bind(this.$tag, 'click', this.onClick);
};

DefaultMenuItemView.prototype.hilite = function() {
	this.$tag.addClass('over');
};

DefaultMenuItemView.prototype.unhilite = function() {
	this.$tag.removeClass('over');
};
