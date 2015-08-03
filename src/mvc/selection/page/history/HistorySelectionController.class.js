function HistorySelectionController(){
}

HistorySelectionController._extends(PageSelectionController);

HistorySelectionController.prototype.init = function()
{
    HistorySelectionController._super.init.call(this);

    History.Adapter.bind(window, 'statechange', jQuery.proxy(this.onHistoryStateChange, this));
    this.onHistoryStateChange();
};

HistorySelectionController.prototype.setCurrent = function(current)
{
    if (this.model.current !== current) {
        History.pushState(null, null, '/' + current);
    }
};

HistorySelectionController.prototype.getPreviousHistoryState = function () {
    var len = this.model.history.length;
    if (len < 2) return null;
    else {
        return this.model.history[len - 2];
    }
};

//private
HistorySelectionController.prototype.onHistoryStateChange = function(event)
{
    var state = History.getState();
    var url = normalizeUrl(state.url);
    var pageName = url.substring(1);

    this.model.history.push(pageName);
    this.model.setCurrent(pageName);

    this.loadPage(pageName);
};
