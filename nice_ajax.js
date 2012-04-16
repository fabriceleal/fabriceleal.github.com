/*
   Provide the XMLHttpRequest constructor for older versions of IE >:(
 
	Based on:
   http://blogs.msdn.com/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
*/

if (typeof XMLHttpRequest == "undefined")
  XMLHttpRequest = function () {
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
      catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
      catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); }
      catch (e) {}
    //Microsoft.XMLHTTP points to Msxml2.XMLHTTP and is redundant
    throw new Error("This browser does not support XMLHttpRequest.");
};


/*
 Based on http://ajaxpatterns.org/XMLHttpRequest_Call#Aynschronous Calls
*/
function request_json(url, callback){
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.onreadystatechange = function(){
		if(req.readyState != 4) { return; }
		
		var data = JSON.parse(req.responseText);
		callback(data);
	};
	req.send(null);
}
