/**
 * Created by liwanchong on 2016/11/20.
 */
var $tableOfLane = $('#tableOfLane');
var $tableOfHouse = $('#tableOfHouse');
var $tableOfBuilding = $('#tableOfBuilding');
var $tableOfHug = $('#tableOfHug');
var laneParam = {
  'location': '',
  'yetai': '',
  'userid': Application.userid,
  'gongsi': '',
  'dijiye': '',
  'xianshitiaoshu': '',
  'tdsyr ': '',
  'dl': '',
  'tdxz': '',
  'syqmj': '',
  'zzdate': '',
  'syqmjpx': '',
  'zzdatepx': ''
};
var houseParam = {
  'location': '',
  'yetai': '',
  'userid': Application.userid,
  'gongsi': '',
  'dijiye': '',
  ' xianshitiaoshu': '',
  'tdsyr ': '',
  'dl': '',
  'tdxz': '',
  'syqmj': '',
  'zzdate': '',
  'syqmjpx': '',
  'zzdatepx': ''
};
var buildingParam = {
  'location': '',
  'yetai': '',
  'userid': Application.userid,
  'gongsi': '',
  'dijiye': '',
  'xianshitiaoshu': '',
  'xmmc ': '',
  'ldh ': ''
};
var hugParam = {
  'location': '',
  'yetai': '',
  'userid': Application.userid,
  'gongsi': '',
  'dijiye': '',
  ' xianshitiaoshu': '',
  ' fjbh ': '',
  ' ldh ': ''
};
var queryZoneData = [];
var queryCompanyData = [];
var queryRetailData = [];
var tableType = 'lane';
function setParam(path, param, xmlns, methodName) {
  return {
    "url": '118.26.130.12',
    "port": 8080,
    "path": path,
    "data": JSON.stringify(param),
    ajaxoptions: {
      "xmlns": xmlns,
      "xmlnsName": 'jin',
      "methodName": methodName
    }
  }
}
function initTableOfLane() {
  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
    setParam(
      '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
      laneParam,
      'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      'getDcXinXi'
    ), function (data) {
      var startindex = data.indexOf('<ns1:return>');
      var endindex = data.indexOf('</ns1:return>');
      data = data.substring(startindex+12,endindex)
      var dataTable = JSON.parse(data);
      $tableOfLane.bootstrapTable('load',dataTable.rows);
    });
}
function initTableOfHouse() {
  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
    setParam(
      '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
      houseParam,
      'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      'getDcXinXi'
    ), function (data) {
      var startindex = data.indexOf('<ns1:return>');
      var endindex = data.indexOf('</ns1:return>');
      data = data.substring(startindex+12,endindex)
      var dataTable = JSON.parse(data);
      $tableOfHouse.bootstrapTable('load',dataTable.rows);
    });
}
function initTableOfBuilding() {
  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
    setParam(
      '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
      buildingParam,
      'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      'getLdXinXi'
    ), function (data) {
      var startindex = data.indexOf('<ns1:return>');
      var endindex = data.indexOf('</ns1:return>');
      data = data.substring(startindex+12,endindex)
      var dataTable = JSON.parse(data);
      $tableOfBuilding.bootstrapTable('load',dataTable.rows);
    });
}
function initTableOfHug() {
  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
    setParam(
      '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
      hugParam,
      'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      'getFyXinXi'
    ), function (data) {
      var startindex = data.indexOf('<ns1:return>');
      var endindex = data.indexOf('</ns1:return>');
      data = data.substring(startindex+12,endindex)
      var dataTable = JSON.parse(data);
      $tableOfHug.bootstrapTable('load',dataTable.rows);
    });
}
function initTreeOfZone() {
  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
    setParam(
      '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
      {'userid':Application.userid},
      'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      'getHierarchyOrg'
    ), function (data) {
      var startindex = data.indexOf('<ns1:return>');
      var endindex = data.indexOf('</ns1:return>');
      data = data.substring(startindex+12,endindex)
      var treeData = JSON.parse(data);
      $('#treeOfZone').treeview({ expandIcon: "glyphicon glyphicon-stop",
        levels: 1,
        color:'#2a6496',
        showCheckbox: true,
        showBorder: false,
        backColor: "#f6f7fa",
        onNodeChecked:addZoneQueryData,
        onNodeUnchecked: minusZoneQueryData,
        data: treeData});
    });
}
function initTreeOfCompany() {
  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
    setParam(
      '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
      {'userid':Application.userid},
      'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      'getLocationByCurrentUser'
    ), function (data) {
      var startindex = data.indexOf('<ns1:return>');
      var endindex = data.indexOf('</ns1:return>');
      data = data.substring(startindex+12,endindex)
      var treeData = JSON.parse(data);
      $('#treeOfCompany').treeview({ expandIcon: "glyphicon glyphicon-stop",
        levels: 1,
        color:'#2a6496',
        showCheckbox: true,
        showBorder: false,
        backColor: "#f6f7fa",
        onNodeChecked:addCompanyQueryData,
        onNodeUnchecked: minusCompanyQueryData,
        data: changeZoneData(treeData)});
    });
}
function initTreeOfRetail() {
  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
    setParam(
      '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
      {'userid':Application.userid},
      'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      'getYeTaiByCurrentUser'
    ), function (data) {
      var startindex = data.indexOf('<ns1:return>');
      var endindex = data.indexOf('</ns1:return>');
      data = data.substring(startindex+12,endindex)
      var treeData = JSON.parse(data);
      $('#treeOfRetail').treeview({ expandIcon: "glyphicon glyphicon-stop",
        levels: 1,
        color:'#2a6496',
        showCheckbox: true,
        showBorder: false,
        backColor: "#f6f7fa",
        onNodeChecked:addRetailQueryData,
        onNodeUnchecked: minusRetailQueryData,
        data: changeRetailData(treeData)});
    });
}
$(function () {
  // 区域
  initTreeOfZone();
  // 公司
  initTreeOfCompany();
  // 业态
  initTreeOfRetail();
   // 地产
  initTableOfLane();
  //房产
  initTableOfHouse();
  //楼栋
  initTableOfBuilding();
  // 房源
  initTableOfHug();
//点击tab
  $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
    e.preventDefault();
    $(this).siblings('a.active').removeClass("active");
    $(this).addClass("active");
    var index = $(this).index();
    $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
    $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
  });
  //  //点击页数时获取页数的数据
  // $tableOfLane.on('page-change.bs.table', function (e, number, size) {
  //   getDataFromServer(number, size);
  // });
  // var options = $tableOfLane.bootstrapTable('getOptions');
  // getDataFromServer(options.pageNumber, options.pageSize);

  initMap();

  });
function addZoneQueryData(event,node){
  queryZoneData.push(node.id);
}
function minusZoneQueryData(event, node) {

  queryZoneData = queryZoneData.filter(function (item) {
    return item !== node.id;
    });
  return queryZoneData;
}function addCompanyQueryData(event,node){
  queryCompanyData.push(node.id);
}
function minusCompanyQueryData(event, node) {
  queryCompanyData = queryCompanyData.filter(function (item) {
    return item !== node.id;
    });
  return queryCompanyData;
}function addRetailQueryData(event,node){
  queryRetailData.push(node.id);
}
function minusRetailQueryData(event, node) {

  queryRetailData = queryRetailData.filter(function (item) {
    return item !== node.id;
    });
  return queryRetailData;
}
function positionFormatter(v,row) {
  return [
    '<div class="name">',
    '<a onclick="showPoiPosition('+row.lng+','+row.lat+')" title="' + row.dlwz + '" href="javascript:void(0)">'
    +row.dlwz,
    '<span class="glyphicon glyphicon-map-marker" style="text-align: right;"></span>',
    '</a>',
    '</div>'
  ].join('');
}
function handleFormatter(v,row) {
  return [
    '<div class="name">',
    '<a title="' + row.position + '" href="https://github.com/'+ '" target="_blank">',
     '查看附件 ',
    '</a>',
    '<span style="height:10px; width:1px; border-left:1px #16a085 solid"></span>',
    '<a title="' + row.position + '" href="https://github.com/'+ '" target="_blank">',
    '&nbsp查看详情',
    '</a>',
    '</div>'
  ].join('');
}
function changeData(type) {
  switch (type) {
    case 1:
      tableType = 'lane';
      initTableOfLane();
      break;
    case 2:
      tableType = 'house';
      initTableOfHouse();
      break;
    case 3:
      tableType = 'building';
      initTableOfBuilding();
      break;
    case 4:
      tableType = 'hug';
      initTableOfHug();
      break;
  }

}
function treeCallback(event, data) {
  $table.bootstrapTable('refresh',{
    url: '../json/data.json'
  });
}
function queryDataFromTree() {

  switch (tableType) {
    case "lane" :
      laneParam.gongsi = queryCompanyData.toString();
      laneParam.yetai = queryRetailData.toString();
      laneParam.location = queryZoneData.toString();
      initTableOfLane();
      break;
    case 'house' :
      houseParam.gongsi = queryCompanyData.toString();
      houseParam.yetai = queryRetailData.toString();
      houseParam.location = queryZoneData.toString();
      initTableOfHouse();
      break;
    case 'building':
      buildingParam.gongsi = queryCompanyData.toString();
      buildingParam.yetai = queryRetailData.toString();
      buildingParam.location = queryZoneData.toString();
      initTableOfBuilding();
      break;
    case 'hug':
      hugParam.gongsi = queryCompanyData.toString();
      hugParam.yetai = queryRetailData.toString();
      hugParam.location = queryZoneData.toString();
      initTableOfHug();
      break;

  }
}
function queryParams(params) {
  console.log(params.pageNumber);
}

function getDataFromServer(pageNum, pageSize) {
  console.log(pageNum);
  console.log(pageSize);
}

var map;
function initMap() {
  map = new BMap.Map("mapContainer", { minZoom: Application.minZoom, enableHighResolution: true });    // 创建Map实例

  map.centerAndZoom(Application.initCenter, Application.initZoom);  // 初始化地图,设置中心点坐标和地图级别
  map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
  map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
  map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}

function showPoiPosition(lng,lat){
  $.fancybox.open({
    href : '#mapContainer',
    padding : 5,
    afterShow:function(){
      if(map){
        map.clearOverlays();
        var marker = new BMap.Marker(new BMap.Point(lng,lat));       //创建标注
        map.addOverlay(marker);
        map.centerAndZoom(new BMap.Point(lng, lat), 13);
      }
    }
  });
}

function changeZoneData(data) {
  var zoneData = [];
  for (var i = 0, len = data.length; i < len; i++) {
    var obj = {};
    obj.text = data[i].secondvalue;
    obj.id = data[i].firstvalue;
    zoneData.push(obj);
  }
  return zoneData;
}

function changeRetailData(data){
  var retailData = [];
  for (var i = 0, len = data.length; i < len; i++) {
    var obj = {};
    obj.text = data[i].secondvalue;
    obj.id = data[i].firstvalue;
    retailData.push(obj);
  }
  return retailData;
}