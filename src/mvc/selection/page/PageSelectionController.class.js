function PageSelectionController(){}

PageSelectionController._extends(SelectionController);

PageSelectionController.prototype.createModel = function(){
    this.model = new PageSelectionModel();
};

PageSelectionController.prototype.setCurrent = function(current) {
    if(this.model === undefined) return;
    if(this.model.current !== current){
        this.model.setCurrent(current);
        this.loadPage(current);
    }
};

//private
PageSelectionController.prototype.loadPage = function(page)
{
    var params = {};
    params.type = 'GET';
    params.url = UrlToolbox.getBasePath() + "/" + page;
    params.success = jQuery.proxy(this.onRequestSuccess, this);
    params.error = jQuery.proxy(this.onRequestError, this);
    jQuery.ajax(params);
};

PageSelectionController.prototype.onRequestSuccess = function(data)
{
    this.model.setCurrentPage(data);
};

PageSelectionController.prototype.onRequestError = function(jqXHR, textStatus, errorThrown)
{
    //console.info(errorThrown);
};
