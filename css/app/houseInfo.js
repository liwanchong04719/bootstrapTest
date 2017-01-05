/**
 * Created by wangtun on 2016/12/25.
 */
function initFCPanel(id, callback) {
    Application.Util.ajaxConstruct(Application.serverHost, 'POST', {'fczbh': id, userid: Application.userid}, 'text/xml;charset=UTF-8', function (data) {
            callback(data);
        }, function name(params) {
            console.log('error')
        },
        {
            "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
            "xmlnsName": "jin",
            "methodName": 'getFangChanPanel'
        });
}