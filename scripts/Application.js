/**
 * Created by zhongxiaoming on 2015/11/5.
 * Class Application
 */
Application = {};
Application.isproxy = true;
//服务地址
Application.serverHost = 'http://192.168.3.20:8080/uapws/service/nc.itf.pims.web.JingYingZhuangKuang';
//show服务地址
Application.showServerHost =  'http://192.168.3.20:8080/uapws/service/nc.itf.pims.zjzs.Izjzc';
//地图初始化中心
Application.initCenter = [116.404, 39.915];
//地图初始化级别
Application.initZoom =11;
Application.minZoom =5;
//显示省级数据的级别
Application.province = 10;
//显示区级数据的级别
Application.direct = 15;
//登录用户
Application.userid = getQueryString('cuserid')

function getQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}