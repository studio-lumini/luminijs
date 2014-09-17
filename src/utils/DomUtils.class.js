function DomUtils()
{
	
}

DomUtils.searchParentContainer = function(element, classname){
	while(!element.hasClass(classname)){
		element = element.parent();
	}
	return element;
};
