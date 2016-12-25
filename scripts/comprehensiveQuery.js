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
  'dijiye': 1,
  'xianshitiaoshu': 3,
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
    "url": 'i.bucg.com',
    // "port": 8080,
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
      $tableOfLane.bootstrapTable('load',dataTable);
    });

  // Application.Util.ajaxConstruct(Application.serverHost, 'POST', laneParam, 'text/xml;charset=UTF-8', function (data) {
  //     $tableOfLane.bootstrapTable('load',data);
  //   }, function name(params) {
  //     console.log('error')
  //   },
  //   {
  //     "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     "xmlnsName": "jin",
  //     "methodName": "getDcXinXi"
  //   }
  // );

}

function initTableOfHouse() {
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   setParam(
  //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
  //     houseParam,
  //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     'getFcXinXi'
  //   ), function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex+12,endindex)
  //     var dataTable = JSON.parse(data);
  //     dataTable.total = 100;
  //     $tableOfHouse.bootstrapTable('load',dataTable);
  //   });

  Application.Util.ajaxConstruct(Application.serverHost, 'POST', houseParam, 'text/xml;charset=UTF-8', function (data) {
      $tableOfHouse.bootstrapTable('load',data);
    }, function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getFcXinXi"
    }
  );

}
function initTableOfBuilding() {
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   setParam(
  //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
  //     buildingParam,
  //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     'getLdXinXi'
  //   ), function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex+12,endindex)
  //     var dataTable = JSON.parse(data);
  //     $tableOfBuilding.bootstrapTable('load',dataTable.rows);
  //   });

  Application.Util.ajaxConstruct(Application.serverHost, 'POST', buildingParam, 'text/xml;charset=UTF-8', function (data) {
      $tableOfBuilding.bootstrapTable('load',data);
    }, function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getLdXinXi"
    }
  );
}
function initTableOfHug() {
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   setParam(
  //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
  //     hugParam,
  //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     'getFyXinXi'
  //   ), function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex+12,endindex)
  //     var dataTable = JSON.parse(data);
  //     $tableOfHug.bootstrapTable('load',dataTable);
  //   });



  Application.Util.ajaxConstruct(Application.serverHost, 'POST', buildingParam, 'text/xml;charset=UTF-8', function (data) {
      $tableOfHug.bootstrapTable('load',data);
    }, function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getFyXinXi"
    }
  );
}
function initTreeOfCompany() {
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   setParam(
  //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
  //     {'userid':Application.userid},
  //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     'getHierarchyOrg'
  //   ), function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex+12,endindex)
  //     var treeData = JSON.parse(data);
  //     $('#treeOfZone').treeview({ expandIcon: "glyphicon glyphicon-stop",
  //       color:'#2a6496',
  //       showCheckbox: true,
  //       showBorder: false,
  //       backColor: "#f6f7fa",
  //       onNodeChecked:addCompanyQueryData,
  //       onNodeUnchecked: minusCompanyQueryData,
  //       data: changeCompanyData(treeData)});
  //   });

  Application.Util.ajaxConstruct(Application.serverHost, 'POST',   {'userid':Application.userid}, 'text/xml;charset=UTF-8', function (data) {

      $('#treeOfZone').treeview({ expandIcon: "glyphicon glyphicon-plus",
        levels: 1,
        color:'#2a6496',
        showCheckbox: true,
        showBorder: false,
        backColor: "#f6f7fa",
        onNodeChecked:addCompanyQueryData,
        onNodeUnchecked: minusCompanyQueryData,
        data:  data});
    }, function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getHierarchyOrg"
    }
  );
}
function initTreeOfZone() {
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   setParam(
  //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
  //     {'userid':Application.userid},
  //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     'getLocationByCurrentUser'
  //   ), function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex+12,endindex)
  //     var treeData = JSON.parse(data);
  //     $('#treeOfCompany').treeview({ expandIcon: "glyphicon glyphicon-stop",
  //       levels: 1,
  //       color:'#2a6496',
  //       showCheckbox: true,
  //       showBorder: false,
  //       backColor: "#f6f7fa",
  //       onNodeChecked:addCompanyQueryData,
  //       onNodeUnchecked: minusCompanyQueryData,
  //       data: changeZoneData(treeData)});
  //   });

  Application.Util.ajaxConstruct(Application.serverHost, 'POST',   {'userid':Application.userid}, 'text/xml;charset=UTF-8', function (data) {

      $('#treeOfCompany').treeview({ expandIcon: "glyphicon glyphicon-plus",
        levels: 1,
        color:'#2a6496',
        showCheckbox: true,
        showBorder: false,
        backColor: "#f6f7fa",
        onNodeChecked:addZoneQueryData,
        onNodeUnchecked: minusZoneQueryData,
        data: changeZoneData(data)});
    }, function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getLocationByCurrentUser"
    }
  );
}
function initTreeOfRetail() {
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   setParam(
  //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
  //     {'userid':Application.userid},
  //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     'getYeTaiByCurrentUser'
  //   ), function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex+12,endindex)
  //     var treeData = JSON.parse(data);
  //     $('#treeOfRetail').treeview({ expandIcon: "glyphicon glyphicon-stop",
  //       levels: 1,
  //       color:'#2a6496',
  //       showCheckbox: true,
  //       showBorder: false,
  //       backColor: "#f6f7fa",
  //       onNodeChecked:addRetailQueryData,
  //       onNodeUnchecked: minusRetailQueryData,
  //       data: changeRetailData(treeData)});
  //   });


  Application.Util.ajaxConstruct(Application.serverHost, 'POST',   {'userid':Application.userid}, 'text/xml;charset=UTF-8', function (data) {

      $('#treeOfRetail').treeview({ expandIcon: "glyphicon glyphicon-plus",
        levels: 1,
        color:'#2a6496',
        showCheckbox: true,
        showBorder: false,
        backColor: "#f6f7fa",
        onNodeChecked:addRetailQueryData,
        onNodeUnchecked: minusRetailQueryData,
        data: changeRetailData(data)});
    }, function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getYeTaiByCurrentUser"
    }
  );
}
$(function () {
  // 区域
  initTreeOfZone();
  // 公司
  initTreeOfCompany();
  // 业态
  initTreeOfRetail();
//点击tab
  $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
    e.preventDefault();
    $(this).siblings('a.active').removeClass("active");
    $(this).addClass("active");
    var index = $(this).index();
    $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
    $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
  });
   //点击页数时获取地产页数的数据
  $tableOfLane.on('page-change.bs.table', function (e, number, size) {
    getLaneTabDataFromServer(number, size);
  });
  var laneTabOptions = $tableOfLane.bootstrapTable('getOptions');
  getLaneTabDataFromServer(laneTabOptions.pageNumber, laneTabOptions.pageSize);
  //点击页数时获取房产页数的数据
  $tableOfHouse.on('page-change.bs.table', function (e, number, size) {
    getHouseTabDataFromServer(number, size);
  });
  //点击页数时楼栋房产页数的数据
  $tableOfBuilding.on('page-change.bs.table', function (e, number, size) {
    getBuildingTabDataFromServer(number, size);
  });
  //点击页数时获取房源页数的数据
  $tableOfHug.on('page-change.bs.table', function (e, number, size) {
    getHugTabDataFromServer(number, size);
  });
  initMap();

  });
function addZoneQueryData(event,node){
  queryZoneData.push(node.text);
}
function minusZoneQueryData(event, node) {

  queryZoneData = queryZoneData.filter(function (item) {
    return item !== node.text;
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
  queryRetailData.push(node.nodeId);
}
function minusRetailQueryData(event, node) {

  queryRetailData = queryRetailData.filter(function (item) {
    return item !== node.nodeId;
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
// 房产
function handleFormatterFC(v,row) {
  var pk = row.zhujian;
  return [
    "<div class='name'>",
    "<a  onclick='showFCAttachment(&quot;"+pk+"&quot;)' href='javascript:void(0)'>",
     "查看附件 ",
    "</a>",
    "<span style='height:10px; width:1px; border-left:1px #16a085 solid'></span>",
    "<a onclick='showFCDetails(&quot;"+pk+"&quot;)' href='javascript:void(0)'>",
    "&nbsp查看详情",
    "</a>",
    "</div>"
  ].join('');
}
// 地产
function handleFormatterDC(v,row) {
  var pk = row.zhujian;
  return [
    "<div class='name'>",
    "<a  onclick='showDCAttachment(&quot;"+pk+"&quot;)' href='javascript:void(0)'>",
     "查看附件 ",
    "</a>",
    "<span style='height:10px; width:1px; border-left:1px #16a085 solid'></span>",
    "<a onclick='showDCDetails(&quot;"+pk+"&quot;)' href='javascript:void(0)'>",
    "&nbsp查看详情",
    "</a>",
    "</div>"
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
      laneParam.dijiye = 0;
      laneParam.xianshitiaoshu = 10;
      laneParam.gongsi = queryCompanyData.toString();
      laneParam.yetai = queryRetailData.toString();
      laneParam.location = queryZoneData.toString();
      initTableOfLane();
      break;
    case 'house' :
      houseParam.dijiye = 0;
      houseParam.xianshitiaoshu = 10;
      houseParam.gongsi = queryCompanyData.toString();
      houseParam.yetai = queryRetailData.toString();
      houseParam.location = queryZoneData.toString();
      initTableOfHouse();
      break;
    case 'building':
      buildingParam.dijiye = 0;
      buildingParam.xianshitiaoshu = 10;
      buildingParam.gongsi = queryCompanyData.toString();
      buildingParam.yetai = queryRetailData.toString();
      buildingParam.location = queryZoneData.toString();
      initTableOfBuilding();
      break;
    case 'hug':
      hugParam.dijiye = 0;
      hugParam.xianshitiaoshu = 10;
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
// 地产分页
function getLaneTabDataFromServer(pageNum, pageSize) {
  laneParam.dijiye = pageNum;
  laneParam.xianshitiaoshu = pageSize;
  initTableOfLane();
}

// 房产分页
function getHouseTabDataFromServer(pageNum, pageSize) {
  houseParam.dijiye = pageNum;
  houseParam.xianshitiaoshu = pageSize;
  initTableOfHouse();
}
// 楼栋分页
function getBuildingTabDataFromServer(pageNum, pageSize) {
  buildingParam.dijiye = pageNum;
  buildingParam.xianshitiaoshu = pageSize;
  initTableOfBuilding();
}
// 房源分页
function getHugTabDataFromServer(pageNum, pageSize) {
  hugParam.dijiye = pageNum;
  hugParam.xianshitiaoshu = pageSize;
  initTableOfHug();
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
// 房产附件
function showFCAttachment(pk) {
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   setParam(
  //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
  //     {pk:pk},
  //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     'getImgsOrFiles'
  //   ), function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex+12,endindex)
  //     var imgData = JSON.parse(data);
  //     $('#attachment').empty();
  //     $.fancybox.open({
  //       href : '#attachment',
  //       padding : 5,
  //       afterShow:function(){
  //         for (var i = 0, len = imgData.length; i < len; i++) {
  //           var imgDiv = document.createElement("div");
  //           imgDiv.setAttribute("class", "section");
  //           imgDiv.style.background = "url("+imgData[i].accessory_id+")";
  //           $('#attachment').append(imgDiv);
  //         }
  //         // $('#attachmentImg').src(imgData)
  //       }
  //     });
  //   });

  Application.Util.ajaxConstruct(Application.serverHost, 'POST',    {pk:pk}, 'text/xml;charset=UTF-8', function (data) {

      $('.sections').empty();
      $.fancybox.open({
        href : '#attachment',
        padding : 5,
        afterShow:function(){
          for (var i = 0, len = imgData.length; i < len; i++) {
            var imgDiv = document.createElement("div");
            imgDiv.setAttribute("class", "section");
            imgDiv.style.background = "url("+imgData[i].accessory_id+")";
            $('.sections').append(imgDiv);
          }
          $("#attachment").PageSwitch({
            direction:'horizontal',
            easing:'ease-in',
            duration:0,
            interval: 3000,
            autoPlay:true,
            loop:'false'
          });
        }
      });
    }, function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getImgsOrFiles"
    }
  );
}
//地产附件
function showDCAttachment(pk) {
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   setParam(
  //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
  //     {pk:pk},
  //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     'getImgsOrFiles'
  //   ), function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex+12,endindex)
  //     var imgData = JSON.parse(data);
  //     $('.sections').empty();
  //     $.fancybox.open({
  //       href : '#attachment',
  //       padding : 5,
  //       afterShow:function(){
  //         for (var i = 0, len = imgData.length; i < len; i++) {
  //           var imgDiv = document.createElement("div");
  //           imgDiv.setAttribute("class", "section");
  //           imgDiv.style.background = "url("+imgData[i].accessory_id+")";
  //           $('.sections').append(imgDiv);
  //         }
  //         $("#attachment").PageSwitch({
  //           direction:'horizontal',
  //           easing:'ease-in',
  //           duration:0,
  //           interval: 3000,
  //           autoPlay:true,
  //           loop:'false'
  //         });
  //       }
  //     });
  //   });

  Application.Util.ajaxConstruct(Application.serverHost, 'POST',    {pk:pk}, 'text/xml;charset=UTF-8', function (data) {

      $('.sections').empty();
      $.fancybox.open({
        href : '#attachment',
        padding : 5,
        afterShow:function(){
          for (var i = 0, len = imgData.length; i < len; i++) {
            var imgDiv = document.createElement("div");
            imgDiv.setAttribute("class", "section");
            imgDiv.style.background = "url("+imgData[i].accessory_id+")";
            $('.sections').append(imgDiv);
          }
          $("#attachment").PageSwitch({
            direction:'horizontal',
            easing:'ease-in',
            duration:0,
            interval: 3000,
            autoPlay:true,
            loop:'false'
          });
        }
      });
    }, function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getImgsOrFiles"
    }
  );
}
//房产详细信息
function showFCDetails(id) {
  $('#details').empty();
  $.fancybox.open({
    href : '#details',
    padding : 5,
    afterShow:function(){
      $("#details").append(info);
      initFCPanel(id, function (data) {
        var dataFc= data.fangChanPanelXinxi;
        $('#yezhu').text(dataFc.yezhu);
        $('#jzmj').text(dataFc.jzmj);
        $('#yetai').text(dataFc.yetai);
        $('#zuoluo').text(dataFc.zuoluo);
        $('#czl').text(dataFc.chuzulv);
        $('#xpjdj').text(dataFc.punjundanjia);
        initBarChart("barChart");
        initAccordion();
        var dataOhter = data.fangChanPanelDuiyingDiChanXinxi;
        for (var i = 0, len =dataOhter.length; i < len ; i++) {
          var list = otherInfo(dataOhter[i]);
          $("#dyfcxx").append(list.join(''));
        }
      })
      // $('#details').append(test);
    }
  });
}
//地产详细信息
function showDCDetails(id) {
  $('#details').empty();
  $.fancybox.open({
    href : '#details',
    padding : 5,
    afterShow:function(){
      $("#details").append(dcInfo);
      initDCPanel(id, function (data) {
        var dataDc= data.diChanPanelXinxi;
        $('#tdsyr').text(dataDc.tdsyr);
        $('#symj').text(dataDc.symj);
        $('#zuoluo').text(dataDc.zuoluo);
        $('#tdzbh').text(dataDc.tdzbh);
        $('#zzdate').text(dataDc.zzdate);
        initBarChart("barChart");
        initAccordion();
        var dataOhter = data.diChanPanelDuiyingFangChanXinxi;
        for (var i = 0, len =dataOhter.length; i < len ; i++) {
          var list = otherInfoDc(dataOhter[i]);
          $("#dydcxx").append(list.join(''));
        }
      })
      // $('#details').append(test);
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
function changeCompanyData(data) {
  var commpanyData = [];
  for(var i = 0, len = data.length; i < len; i++) {
    var obj = data[i];
    obj.nodes = data[i].children;
    commpanyData.push(obj);
  }
  return commpanyData;
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
function initDCPanel(id, callback) {
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   setParam(
  //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
  //     {'tdzbh': id, userid: Application.userid},
  //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     "getDiChanPanel"
  //   ), function(data){
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     callback(JSON.parse(data.substring(startindex + 12, endindex)))
  //   });


		Application.Util.ajaxConstruct(Application.serverHost, 'POST', {'tdzbh': id, userid: Application.userid}, 'text/xml;charset=UTF-8', function (data) {
		callback(data);
	}, function name(params) {
		console.log('error')
	},
	{
		"xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
		"xmlnsName": "jin",
		"methodName": 'getDiChanPanel'
	});
}
function initFCPanel(id, callback) {
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   setParam(
  //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
  //     {'fczbh': id, userid: Application.userid},
  //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     "getFangChanPanel"
  //   ), function(data){
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     callback(JSON.parse(data.substring(startindex + 12, endindex)))
  //   });


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
function initBarChart(id) {
  var dom = document.getElementById(id);
  var myChart = echarts.init(dom);
  var app = {};
  option = {
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: false },
        dataView: { show: false, readOnly: false },
        magicType: { show: false, type: ['line', 'bar'] },
        restore: { show: false },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    legend: {
      orient : 'horizontal',
      x : 'center',
      y:'bottom',
      data:['出租率','单价']
    },
    xAxis: [
      {
        type: 'category',
        data: ['北京城建集团投资有限公司', '城建置业', '3公司', '4公司', '5公司', '6公司', '7公司', '8公司', '9公司', '10公司', '11公司', '12公司']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '100%',
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '单价',
        axisLabel: {
          formatter: '{value}元'
        }
      }
    ],
    series : [
      {
        name:'出租率',
        type:'bar',
        itemStyle:{
          normal:{color:'#0099FF'}
        },
        data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 90, 100, 32.6, 20.0, 6.4, 3.3]
      },
      {
        name: '单价',
        type: 'line',
        yAxisIndex: 1,
        itemStyle:{
          normal:{color:'#C06410'}
        },
        data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}
function initAccordion(){
  $(".items > li > a").click(function(e) {
    e.preventDefault();
    var $this = $(this);
    if ($this.hasClass("expanded")) {
      $this.removeClass("expanded");
      $this.find('i').addClass("glyphicon-chevron-right").removeClass("glyphicon-chevron-down");
    } else {
      $(".items a.expanded>i").addClass("glyphicon-chevron-right").removeClass("glyphicon-chevron-down");
      $(".items a.expanded").removeClass("expanded");
      $this.addClass("expanded");
      $this.find("i").addClass("glyphicon-chevron-down").removeClass("glyphicon-chevron-right");
      $(".sub-items").filter(":visible").slideUp("normal");
    }
    $this.parent().children("ul").stop(true, true).slideToggle("normal");
  });

  $(".sub-items a").click(function() {
    $(".sub-items a").removeClass("current");
    $(this).addClass("current");
  });
}

function otherInfoDc(data) {
  var htmlArr = [];

  htmlArr.push('<li class="list-item">');
  htmlArr.push('<div style="width: 100%;padding: 10px 20px">');

  htmlArr.push('<div><span>'+data.fwmc+'</span></div>');
  htmlArr.push('<div><span>'+data.fwsyqr+'</span></div>');

  htmlArr.push('</div> </li>');
  return htmlArr;

}
function otherInfo(data) {
  var htmlArr = [];

  htmlArr.push('<li class="list-item">');
  htmlArr.push('<div style="width: 100%;padding: 10px 20px">');

  htmlArr.push('<div><span>'+data.tdsyr+'</span></div>');
  htmlArr.push('<div><span>'+data.zuoluo+'</span></div>');

  htmlArr.push('</div> </li>');
  return htmlArr;

}

// 页面跳转
function setLocationParam(type) {
  switch (type) {
    case 1:
      window.location = 'main.html?cuserid=' + Application.userid;
      break;
    case 2:
      window.location = 'comprehensiveQuery.html?cuserid=' + Application.userid;
      break;
    case 3:
      window.location = 'map.html?cuserid=' + Application.userid;
      break;

  }
}