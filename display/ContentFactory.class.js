function ContentFactory()
{
	
}

/**
 * @param film Film
 * @param height int
 * @param width int
 * @param autoplay Boolean
 * @param controls Boolean
 * @param preload String
 * 		auto|metadata|none
 */
ContentFactory.getVideo = function(film, width, height, autoplay, controls, preload)
{
	var attributes  = "";
	attributes += autoplay ? "autoplay='autoplay'" : "";
	attributes += controls ? "controls='controls'" : "";
	attributes += "height='" + height + "' ";
	attributes += "width='" + width + "' ";
	attributes += "preload='" + preload + "' ";
	
	$tag = "<video " + attributes + ">";
	$tag += "<source src='" + film.src + "' type='" + film.mime + "' >";
	$tag += "</video>";
	return $tag;
};