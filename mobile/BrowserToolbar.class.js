/**
 * Mobile only, not even iPad.
 */
function BrowserToolbar()
{
}

BrowserToolbar.hide = function()
{
	if (document.documentElement.scrollTop === 0)
	{
		window.scrollTo(0,0);
	}
};
