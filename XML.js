// 定义浏览器类型
if(typeof BrowserType == "undefined"){
    var BrowserType = {};
    BrowserType.IE = 0;
    BrowserType.Firefox = 1;
    BrowserType.Safari = 2;
}



XML = function (filePath) {
	this.filePath = filePath + ".xml";
	
	var xmlDoc;
	var isOk;
 	try{ // IE浏览器
 		xmlDoc = new ActiveXObject("microsoft.XMLDOM");
 		xmlDoc.async = false;
 		isOk = xmlDoc.load(this.filePath);
        xmlDoc.setProperty('SelectionLanguage','XPath'); 
        this.browsertype = BrowserType.IE;
 	}catch(e){
 		try{ // Firefox, Mozilla, Opera, 其他浏览器
 			xmlDoc = document.implementation.createDocument("","",null);
 			xmlDoc.async = false;
 			isOk = xmlDoc.load(this.filePath);
            this.browsertype = BrowserType.Firefox;
 		}catch(e){
 			try{ // 谷歌,Safari 浏览器
 				var xmlhttp = new window.XMLHttpRequest();  
         		xmlhttp.open("GET",this.filePath,false);  
         		xmlhttp.send(null);  
                // alert(xmlhttp.responseText);
         		xmlDoc = xmlhttp.responseXML;
         		isOk = true;
                this.browsertype = BrowserType.Safari;
     		} catch (e){  
     			isOk = false;
     		}  
 		}
 	}

 	if(isOk){
        
        // 谷歌浏览器不支持 
        // http://www.lxway.com/811690101.htm
        // http://www.cnblogs.com/clso/p/4787854.html

 		this.xmlDoc = xmlDoc;
        // alert(xmlDoc);
 		this.root = xmlDoc.documentElement; 
 	} else {
 		alert("文件" + this.filePath + "载入失败");
 	}
}

XML.prototype.getRootName = function () {
	return this.root.nodeName;
}


XML.prototype.getSingleNode = function(nodeName) {
    
    if (this.browsertype == BrowserType.IE) {
        return this.root.selectSingleNode(nodeName);
    } else {
        var nsResolver = this.xmlDoc.createNSResolver (this.root);
        return this.xmlDoc.evaluate(nodeName, this.root, nsResolver, XPathResult.ANY_TYPE, null).iterateNext();
    }
}

XML.prototype.childCount = function(nodeName) {
    return this.getSingleNode(nodeName).childNodes.length;
}

XML.prototype.getChildNames = function(nodeName) {
    var names = new Array();
    var node = this.getSingleNode(nodeName);
    // alert(node.innerHTML); // OK 没问题
    // alert(node.childNodes.length); // 必须没有空格空行 否则有问题

/*
解决办法2：调用childNodes属性之前先将空格删除 
for(vari = 0; i < node.length; i++) { 
   //如果是文本节点，并且值为空，则删除该节点 
   if(node[i].nodeType == 3 && /\s/.test(node[i].nodeValue)) { 
      node[i].parentNode.removeChild(node[i]);        
   }
} 

alert(node.length); 

*/
    var count = node.childNodes.length;
    for (var i = 0; i < count; i++) {
       names[i] = node.childNodes[i].tagName;
    }
    return names;
}

// var elementName=elementClass.childNodes[i].getAttribute("text");

XML.prototype.getChildAttributes = function (nodeName, attribute) {
    var attributes = new Array();
    var node = this.getSingleNode(nodeName);
    var count = node.childNodes.length;
    for (var i = 0; i < count; i++) {
       attributes[i] = node.childNodes[i].getAttribute(attribute);
    }
    return attributes;
}

XML.prototype.selectNodeContains = function (keyword) {
    // 先对关键字做字符串处理
    keyword.replace(/'/g,"");
    keyword.replace(/"/g,"");
    var xPath="//*[contains(text(),'" + keyword + "')]";

    if (this.browsertype == BrowserType.IE) {
        return this.root.selectNodes(xPath);
    } else {
        var arr = new Array();
        var result = this.xmlDoc.evaluate(xPath, this.xmlDoc, null, XPathResult.ANY_TYPE, null);
        var nodes = result.iterateNext(); //枚举第一个元素
        arr[arr.length] = nodes;
        while (nodes) {
            // 对 nodes 执行操作;
            nodes=result.iterateNext(); //枚举下一个元素
            arr[arr.length] = nodes;
        }
        return arr;
    }
    
}