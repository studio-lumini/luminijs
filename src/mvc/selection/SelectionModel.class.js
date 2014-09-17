function SelectionModel(){
	this.scope = [];
	this.offset = 0;
	this.totalCount = 0;
	this.over = undefined;
	this.current = undefined;
	this.state = undefined;
}

SelectionModel.prototype.destroy = function() {
	jQuery(this).unbind(SelectionEvent.ON_CURRENT_UPDATED);
	jQuery(this).unbind(SelectionEvent.ON_OVER_UPDATED);
	jQuery(this).unbind(SelectionEvent.ON_SCOPE_UPDATED);
	jQuery(this).unbind(SelectionEvent.ON_TOTAL_COUNT_UPDATED);
	jQuery(this).unbind(SelectionEvent.ON_OFFSET_UPDATED);
};

SelectionModel.prototype.setCurrent = function(current) {
	this.current = current;
	jQuery(this).trigger(SelectionEvent.ON_CURRENT_UPDATED, this.current);
};

SelectionModel.prototype.setOver = function(over) {
	this.over = over;
	jQuery(this).trigger(SelectionEvent.ON_OVER_UPDATED, this.over);
};

SelectionModel.prototype.setScope = function(scope) {
	this.scope = scope;
	jQuery(this).trigger(SelectionEvent.ON_SCOPE_UPDATED);
};

SelectionModel.prototype.setOffset = function(offset) {
	this.offset = offset;
	jQuery(this).trigger(SelectionEvent.ON_OFFSET_UPDATED, this.offset);
};

SelectionModel.prototype.setTotalCount = function(totalCount) {
	this.totalCount = totalCount;
	jQuery(this).trigger(SelectionEvent.ON_TOTAL_COUNT_UPDATED, this.totalCount);
};

SelectionModel.prototype.setState = function(state) {
	this.state = state;
	jQuery(this).trigger(SelectionEvent.ON_STATE_UPDATED, this.state);
};
