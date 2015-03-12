function DefaultSelectionContentView() {

}

DefaultSelectionContentView._extends(AbstractSelectionContentView);

AbstractSelectionContentView.prototype.onCurrentUpdated = function(){
  if(this.controller.model.current === this.id){
    this.show();
  }else{
    this.hide();
  }
};


