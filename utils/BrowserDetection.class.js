function BrowserDetection(){}

BrowserDetection.isSafari = function(){
	  var ua = navigator.userAgent.toLowerCase(); 
	  if (ua.indexOf('safari')!=-1){ 
	    if(ua.indexOf('chrome')  > -1){
	     	return false;
	    }else{
	    	return true;
	    }
	   }
	  	
};

