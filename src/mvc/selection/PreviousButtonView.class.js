function PreviousButtonView() {
}

PreviousButtonView._extends(AbstractView);

PreviousButtonView.prototype.destroy = function (tag, parent) {
    this.unbind(this.$tag, 'click', this.onClick);
    this.unbind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED, this.onCurrentUpdated);
};

PreviousButtonView.prototype.init = function (tag, parent) {
    PreviousButtonView._super.init.call(this, tag, parent);
    this.bind(this.$tag, 'click', this.onClick);
    this.bind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED, this.onCurrentUpdated);
};

//private
PreviousButtonView.prototype.onClick = function () {
    this.controller.goPrevious();
};

PreviousButtonView.prototype.onCurrentUpdated = function () {
    var index = this.controller.model.scope.indexOf(this.controller.model.current);
    if (index == 0 && !this.controller.model.looping)
        this.$tag.hide();
    else
        this.$tag.show();
};
