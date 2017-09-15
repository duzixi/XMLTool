
function XML(filePath) {
	this.filePath = filePath;
	
	var xmlDoc;
	var isOk;
 	try{ // IE浏览器
 		xmlDoc = new ActiveXObject("microsoft.XMLDOM");
 		xmlDoc.async = false;
 		isOk = xmlDoc.load(this.filePath);
 	}catch(e){
 		try{ // Firefox, Mozilla, Opera, 其他浏览器
 			xmlDoc = document.implementation.createDocument("","",null);
 			xmlDoc.async = false;
 			isOk = xmlDoc.load(this.filePath);
 		}catch(e){
 			try{ // 谷歌,Safari 浏览器
 				var xmlhttp = new window.XMLHttpRequest();  
         		xmlhttp.open("GET",this.filePath,false);  
         		xmlhttp.send(null);  
                // alert(xmlhttp.responseText);
         		xmlDoc = xmlhttp.responseXML;
         		isOk = true;
     		} catch (e){  
     			isOk = false;
     		}  
 		}
 	}

 	if(isOk){
 		this.xmlDoc = xmlDoc;
 		this.root = xmlDoc.documentElement; 
 	} else {
 		alert("文件" + this.filePath + "载入失败");
 	}
}

XML.prototype.getRootName = function () {
	return this.root.nodeName;
}

