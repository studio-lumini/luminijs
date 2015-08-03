function PageSelectionModel()
{
	this.history = new Array();
}

PageSelectionModel.prototype = new SelectionModel();

PageSelectionModel.prototype.setCurrentPage = function(currentPage) {
    this.currentPage = currentPage;
    this.dispatchEvent(PageSelectionEvent.PAGE_LOAD_COMPLETE, {'currentPage' : this.currentPage});
};
