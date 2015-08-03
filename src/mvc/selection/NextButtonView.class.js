function NextButtonView() {
}

NextButtonView._extends(AbstractView);

NextButtonView.prototype.destroy = function () {
    this.unbind(this.$tag, 'click', this.onClick);
    this.unbind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED, this.onCurrentUpdated);
    NextButtonView._super.destroy.call(this);
};

NextButtonView.prototype.init = function (tag, parent) {
    NextButtonView._super.init.call(this, tag, parent);
    this.bind(this.$tag, 'click', this.onClick);
    this.bind(this.controller.model, SelectionEvent.ON_CURRENT_UPDATED, this.onCurrentUpdated);
    this.onCurrentUpdated(null);
};

//private
NextButtonView.prototype.onClick = function () {
    this.controller.goNext();
};

NextButtonView.prototype.onCurrentUpdated = function () {
    var scope = this.controller.model.scope;
    var index = scope.indexOf(this.controller.model.current);
    if (index == scope.length - 1 && !this.controller.model.looping)
        this.$tag.hide();
    else
        this.$tag.show();
};
