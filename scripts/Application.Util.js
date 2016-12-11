/*
 *	程序工具类
 *  @namespace Application.Util
 *  @class  Application.Util
 */

Application.Util = Application.Util || {};


/*
*  Ajax构造函数
*  @method ajaxConstruct Ajax构造函数
*  @param url            Ajax请求子地址
*  @param type           Ajax请求方式,POST、GET..
*  @param data           Ajax请求参数
*  @param dataType       Ajax返回数据类型
*  @param successFunc    Ajax请求成功回调函数
*  @param errorFuc       Ajax请求失败回调函数
    var soapMessage =
　　'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"  '         
   +xmlns
   +'<soapenv:Header/>'
   +'<soapenv:Body>'
   +   '<'+xmlnsName+':'+methodName+' >';
     

	 if(para){
	    var arr=para.split(",");// 
		for(var i=0;i<arr.length;i++){
		   if(0==i){
		   soapMessage=soapMessage+"<string>"+arr[0]+"</string>";
		   }else{
		   soapMessage=soapMessage+"<string"+i+">"+arr[i]+"</string"+i+">";
		   }
		}
	 }
     soapMessage=soapMessage+'</'+xmlnsName+':'+methodName+'>'+'</soapenv:Body>' +'</soapenv:Envelope>';


*/
Application.Util.ajaxConstruct = function (url, type, data, dataType, successFuc, errorFuc,ajaxoptions) {
    // var soapMessage =
    //     　　'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"  '
    //     + ajaxoptions.xmlns+'>'
    //     + '<soapenv:Header/>'
    //     + '<soapenv:Body>'
    //     + '<' + ajaxoptions.xmlnsName + ':' + ajaxoptions.methodName + ' >';

    // soapMessage = soapMessage + "<string>" + JSON.stringify(data) + "</string>";
    // soapMessage = soapMessage + '</' + ajaxoptions.xmlnsName + ':' + ajaxoptions.methodName + '>' +
    // '</soapenv:Body>' + '</soapenv:Envelope>';

    var soapMessage =
            '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" '
            +ajaxoptions['xmlns'] + '>'
            + '<soapenv:Header/>'
            + '<soapenv:Body>'
            + '<' + ajaxoptions['xmlnsName'] + ':' + ajaxoptions['methodName'] + ' >';
        soapMessage = soapMessage + "<"+ajaxoptions['xmlnsName'] + ':'+"string>" + JSON.stringify(data) + "</"+ajaxoptions['xmlnsName'] + ':'+"string>";
        soapMessage = soapMessage + '</' + ajaxoptions['xmlnsName'] + ':' + ajaxoptions['methodName'] + '>' + '</soapenv:Body>' + '</soapenv:Envelope>';
        console.log('soapMessage参数:' + soapMessage);


    $.support.cors = true;
    /*
     *	get 方式将access_token加到url里面
     *  post 方式将access_token加到 data里面
     */

    // if(userid == null || userid == undefined){
    //     userid =userid;
    // }


  function callback(data) {
    var startindex = data.indexOf('<ns1:return>');
    var endindex = data.indexOf('</ns1:return>');
    data = data.substring(startindex + 12, endindex)
    data = JSON.parse(data);
    successFuc (data)
  }
   
    $.ajax({
        url: url,
        type: type,
        data: soapMessage,
        contentType: "text/xml;charset=UTF-8",//设置返回值类型xml
        dataType: dataType,
        success: callback,
        error: errorFuc
    });
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}