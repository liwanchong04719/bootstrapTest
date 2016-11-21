/**
 * Created by zhongxiaoming on 2015/11/5.
 * Class Application
 */
Application = {}
//服务地址
Application.serverHost = 'http://localhost:8888/';
//地图初始化中心
Application.initCenter = new BMap.Point(116.404, 39.915);
//地图初始化级别
Application.initZoom =11;
Application.minZoom =5;
//显示省级数据的级别
Application.province = 10;
//显示区级数据的级别
Application.direct = 15;
