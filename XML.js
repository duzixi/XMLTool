
function XML(filePath) {
	alert("XML");
	this.filePath = filePath;
	
	var xmlDoc;
	var isOk;
 	try{ //IE浏览器
 		xmlDoc = new ActiveXObject("microsoft.XMLDOM");
 		xmlDoc.async = false;
 		isOk = xmlDoc.load(this.filePath);
 		alert("第一种");
 	}catch(e){
 		try{ //Firefox, Mozilla, Opera, 其他浏览器
 			xmlDoc = document.implementation.createDocument("","",null);
 			xmlDoc.async = false;
 			isOk = xmlDoc.load(this.filePath);
 			alert("第二种");
 		}catch(e){
 			try{ // 谷歌浏览器
 				var xmlhttp = new window.XMLHttpRequest();  
         		xmlhttp.open("GET",this.filePath,false);  
         		xmlhttp.send(null);  
         		xmlDoc = xmlhttp.responseXML;
         		isOk = true;
         		alert("第三种");
     		} catch (e){  
     			isOk = false;
     		}  
 		}
 	}
 	alert("isOk:" + isOk);
 	//转载xml文件
 	if(isOk){
 		this.xmlDoc = xmlDoc;
 		alert("xmlDoc:" + xmlDoc);
 		this.root = xmlDoc.documentElement; // Safari出错
 		alert("this.root = xmlDoc.documentElement;");
 		alert("文件" + this.filePath + "载入成功");
 	} else {
 		alert("文件" + this.filePath + "载入失败");
 	}
 	
}

XML.prototype.getRootName = function () {
	alert(this.root.nodeName);
	return this.root.nodeName;
}

