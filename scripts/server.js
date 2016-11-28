var http = require("http");
var fs = require("fs");
var qs = require('querystring');

function onRequest(request, response) {

    var postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
    // 数据块接收中
    request.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    })
    request.addListener("end", function () {
        console.log('数据接收完毕');

        var params = qs.parse(postData)

        var data = params.data;
        if(Object.prototype.toString.apply =='[object Object]'){
            data = JSON.stringify(data);
        }
        var ajaxoptions = params.ajaxoptions;
        // var soapMessage =
        //     '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" '
        //     +params['ajaxoptions[xmlns]'] + '>'
        //     + '<soapenv:Header/>'
        //     + '<soapenv:Body>'
        //     + '<' + params['ajaxoptions[xmlnsName]'] + ':' + params['ajaxoptions[methodName]'] + ' >';

        // soapMessage = soapMessage + "<"+params['ajaxoptions[xmlnsName]'] + ':'+"string>" + data + "</"+params['ajaxoptions[xmlnsName]'] + ':'+"string>";
        // soapMessage = soapMessage + '</' + params['ajaxoptions[xmlnsName]'] + ':' + params['ajaxoptions[methodName]'] + '>' + '</soapenv:Body>' + '</soapenv:Envelope>';
    
        // console.log('soapMessage:'+soapMessage)
var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"><soapenv:Header/><soapenv:Body><jin:getPk_orgAndLocation ><jin:string>{"userid":"1001ZZ10000000018FJF"}</jin:string></jin:getPk_orgAndLocation></soapenv:Body></soapenv:Envelope>'

        var options = {
            hostname: params.url,
            port:params.port,
            path: params.path,
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8'
            }
        };

        var req = http.request(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                var startindex = chunk.indexOf('<ns1:return>')
                var endindex = chunk.indexOf('</ns1:return>');
                //console.log('returndata:'+chunk.substring(startindex, endindex) )
                // chunk = chunk.substring(startindex+12, endindex)
                // response.write(chunk,function() {response.end()});
                // //response.end();
               
            });
             res.pipe(response);
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        // write data to request body  
        req.write(soapMessage);
        req.end();

        request.pipe(req);

        console.log('parameter=' + JSON.stringify(request.body))
        console.log("Request received.");
        response.writeHead(200, { "Content-Type": 'text/plain', 'charset': 'utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS' });//可以解决跨域的请求
    });

}

http.createServer(onRequest).listen(8088);

