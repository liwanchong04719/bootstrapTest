var showIndex = 1;
$(document).ready(function () {
	//点击tab
    $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
			  if(index === 1) {
					houseDataParam.yetai = queryRetailData.toString();
					houseDataParam.gongsi = queryCompanyData.toString();
					houseDataParam.location = queryZoneData.toString();
					setHouseData(Application.map);
				} else if (index === 2) {
					showIndex = index
          laneDataParam.yetai = queryRetailData.toString();
          laneDataParam.gongsi = queryCompanyData.toString();
          laneDataParam.location = queryZoneData.toString();
					setLaneData(Application.map);
				}

        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
	//左侧弹出框
	var bootOpened = true;
	$('#btn_leftfloat').click(function () {
		if (bootOpened) {
			$(this).removeClass('arrow-right');
			$(this).addClass('arrow-left');
			$('.foldleft').css('left', '-435px');
			bootOpened = false;
		} else {


			$(this).removeClass('arrow-left');
			$(this).addClass('arrow-right');
			$('.foldleft').css('left', '0px');
			bootOpened = true;
		}


	})
  //初始化树
	initTreeOfCompany();
	initTreeOfZone();
	initTreeOfRetail();
	//初始化左侧列表
	var directdata = ddata.data;
	//initHoouseList();
	var housedata = house.data.list;

	var cdata = communitydata.data;
	//$('#left_house_list').bootstrapTable('load',housedata);
	//地图
	var map = initmap();
	Application.map = map;
	//根据地图级别绘制图标
	$('#zoom').text(map.getZoom())
	map.addEventListener('tilesloaded', function () {
		$('#zoom').text(map.getZoom());
     if(showIndex === 2) {
			 setLaneData(map);
		 } else {
			 setHouseData(map);
		 }
	});
})

//初始化地图， 百度地图API功能
function initmap() {
	var map = new BMap.Map("map", { minZoom: Application.minZoom, enableHighResolution: true });    // 创建Map实例

	map.centerAndZoom(new BMap.Point(Application.initCenter[0],Application.initCenter[1]), Application.initZoom);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	return map;
}



//生成marker
function createMarker(options) {
	var opts = {
		position: options.point   // 指定文本标注所在的地理位置
	};
	var label = new BMap.Label("", opts);
	label.setContent(options.html);
	label.setStyle(options.style);
	label.addEventListener('mouseover', function (event) {
		event.target.setZIndex(1000)
	});
	return label;
}

/***
 * 翻页回调
 */
function pageselectCallback(page_index, data, createfunc, jq) {
	var list = []
	var contentList = data.slice(page_index * 10, 10)
	for (var i = 0, len = contentList.length; i < len; i++) {
		list = list.concat(createfunc(contentList[i]));
	}
	$("#houseDataDiv").empty().append(list.join(''));
	return false;
}
var locationFcData;
function locationFc(lng, lat) {
	var point = new BMap.Point(lng, lat);
	Application.map.centerAndZoom(point, 16);
}
/***
 * 生成大于11级的侧边栏房产
 */
function initLiItemOfHose(data) {
	locationFcData = data;
	var htmlArr = [];

	htmlArr.push('<li class="list-item" onclick="locationFc('+data.lng+','+data.lat+')">');
	htmlArr.push('<a href="#" >');
	htmlArr.push('<div class="item-aside">');
	htmlArr.push('<img alt="示例图片" src="' + data.img + '">');
	htmlArr.push('</div>');
	htmlArr.push('<div class="item-main">');
	htmlArr.push('<p class="item-tle">' + data.xmmc + '</p>');
	htmlArr.push('<p class="item-des">');
	htmlArr.push('<span>' + data.jzmj + '平米' + '</span>');
	htmlArr.push('<p class="item-community">');
	htmlArr.push('<span class="item-replace-com" data-origin="">' + data.fwzl + '</span>');
	htmlArr.push('</p>');
	htmlArr.push('<p class="item-community">');
	htmlArr.push('<span class="item-replace-com" data-origin="">' + data.fwsyqr + '</span>');
	htmlArr.push('</p>');

	htmlArr.push('</div>');
	htmlArr.push('</a>');
	htmlArr.push('</li>');

	return htmlArr;

}
/***
 * 生成大于11级的侧边栏地产
 */
function initLiItemOfLane(data) {

	var htmlArr = [];

	htmlArr.push('<li class="list-item">');
	htmlArr.push('<a href="#" target="_blank">');
	htmlArr.push('<div class="item-aside">');
	htmlArr.push('<img alt="示例图片" src="' + data.img + '">');
	htmlArr.push('</div>');
	htmlArr.push('<div class="item-main">');
	htmlArr.push('<p class="item-tle">' + data.xmmc + '</p>');
	htmlArr.push('<p class="item-des">');
	htmlArr.push('<span>' + data.jzmj + '平米' + '</span>');
	htmlArr.push('<p class="item-community">');
	htmlArr.push('<span class="item-replace-com" data-origin="">' + data.fwzl + '</span>');
	htmlArr.push('</p>');
	htmlArr.push('<p class="item-community">');
	htmlArr.push('<span class="item-replace-com" data-origin="">' + data.fwsyqr + '</span>');
	htmlArr.push('</p>');

	htmlArr.push('</div>');
	htmlArr.push('</a>');
	htmlArr.push('</li>');

	return htmlArr;

}
/**
 * 获取房产数据
 */
function setHouseData(map) {
	if (map.getZoom() == Application.province + 1 || map.getZoom() == Application.direct) {
		map.clearOverlays();
		getHouseOrLaneData(
			houseDataParam,
			'getFcTongJiXinxi_map',
			function (data) {
				for (var i in data) {
					var customMarker = createMarker({
						point: new BMap.Point(data[i].lat, data[i].lng),
						html: "<div class='bubble'><p class='name' style='margin-bottom: 5px;'><a href=javascript:void(0); onclick='showhouse("+data[i].lng+","+data[i].lat+")' >" + data[i].city + "</a></p><p class='number'>" + data[i].fccount + "</p></div>",
						style: {
							color: 'white',
							fontSize: "12px",
							height: "20px",
							lineHeight: "20px",
							fontFamily: "微软雅黑",
							border: 'none'
						}
					});
					map.addOverlay(customMarker);
					// initPagination();
				}
				createHouseContainer(data);
			}
		)

	}
	else if (map.getZoom() == Application.direct + 1) {
		map.clearOverlays();
		getHouseOrLaneData(
			houseDataSmallParam,
			'getFcXinxi_map',
			function (data) {
				for (var j in data) {
						var href = "../pages/housePanel.html?fczbh=" + data[j].xmmc;
						var customMarker = createMarker({
							point: new BMap.Point(data[j].lng, data[j].lat),
							// html:'<p class="bubble-3 bubble" >' +
							// '<i class="num">&nbsp;'+data[j].xmmc.substring(0,3)+'&nbsp;</i>' +
							// '<span class="name"><i class="name-des">' +
							// '<a href=javascript:void(0);" onclick="showSecondDirect('+data[j].lng+','+data[j].lat+')"'+
							// ' >' +
							// data[j].xmmc +
							// '</a></i></span><i class="arrow-up">' +
							// '<i class="arrow"></i><i></i></i></p>',
							 html:"<div class='bubble-3 bubble'><p class='name' style='margin-bottom: 5px;'> <a href=javascript:void(0); onclick='showSecondDirect("+data[j].lng+","+data[j].lat+")' >" + data[j].xmmc + "</a></p><p class='number'>" + data[i].fccount + "</p></div>",
							style: {
								color: 'white',
								fontSize: "12px",
								height: "20px",
								lineHeight: "20px",
								fontFamily: "微软雅黑",
								border: 'none'
							}
						})
						map.addOverlay(customMarker);

				}

				createHouseContainer(data);
			}
		);

	}


	function showhouse() {
		Application.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
	}
}/**
 * 获取地产数据
 */
function setLaneData(map) {
	if (map.getZoom() == Application.province + 1 || map.getZoom() == Application.direct) {
		map.clearOverlays();
		getHouseOrLaneData(
			laneDataParam,
			'getDcTongJiXinxi_map',
			function (data) {
				for (var i in data) {
					var customMarker = createMarker({
						point: new BMap.Point(data[i].lat, data[i].lng),
						html: "<div class='bubble'><p class='name'>" + data[i].city + "</p><p class='number'>" + data[i].dccount + "</p></div>",
						style: {
							color: 'white',
							fontSize: "12px",
							height: "20px",
							lineHeight: "20px",
							fontFamily: "微软雅黑",
							border: 'none'
						}
					})
					map.addOverlay(customMarker);
					createLaneContainer(data);
					// initPagination();
				}

			}
		)

	}
	else if (map.getZoom() == Application.direct + 1) {
		map.clearOverlays();
		getHouseOrLaneData(
			laneDataSmallParam,
			'getDcXinxi_map',
			function (data) {
				for (var j in data) {
					var customMarker = createMarker({
						point: new BMap.Point(data[j].lat, data[j].lng),
						html: "<div class='bubble'><p class='name'>" + data[j].tdsyr
            + "</p><p class='number'>" + data[i].syqmj + "</p></div>",
						style: {
							color: 'white',
							fontSize: "12px",
							height: "20px",
							lineHeight: "20px",
							fontFamily: "微软雅黑",
							border: 'none'
						}
					})
					map.addOverlay(customMarker);
				}

				createLaneContainer(data);
			}
		);

	}
}
/**
 * 生成小于11级时地图左侧栏展示内容房产
 */
function createHouseContainer(data) {
	var list = [];

	for (var i = 0, len = data.length; i < len; i++) {

		if (Application.map.getZoom() >= Application.province + 1 && Application.map.getZoom() < Application.direct) {
			list = list.concat(initDirectOfHouse(data[i]));
		}
		else if (Application.map.getZoom() >= Application.direct + 1) {
			list = list.concat(initLiItemOfHose(data[i]));
		}
	}

	$("#houseDataDiv").empty().append(list.join(''));
}/**
 * 生成小于11级时地图左侧栏展示内容地产
 */
function createLaneContainer(data) {
	var list = []

	for (var i = 0, len = data.length; i < len; i++) {

		if (Application.map.getZoom() >= Application.province + 1 && Application.map.getZoom() < Application.direct) {
			list = list.concat(initDirectOfLane(data[i]));
		}
		else if (Application.map.getZoom() >= Application.direct + 1) {
			list = list.concat(initLiItemOfLane(data[i]));
		}
	}

	$("#laneDataDiv").empty().append(list.join(''));
}
var houseMapData;
/**
 * 生成小于11级时地图左侧栏展示项房产
 */
function initDirectOfHouse(data) {
	houseMapData = data;
	var htmlArr = [];

	htmlArr.push('<li class="list-item">');
	htmlArr.push('<a href="javascript:void(0);" >');

	htmlArr.push('<p class="item-des">');
	htmlArr.push('<span>' + data.city + '</span>');

	htmlArr.push('<span class="item-side">' + data.fccount + '<span>套' + '</span></span>');
	htmlArr.push('</p>');
	htmlArr.push('</a>');
	htmlArr.push('</li>');

	return htmlArr;

}
/**
 * 生成小于11级时地图左侧栏展示项地产
 */
function initDirectOfLane(data) {
	var htmlArr = [];

	htmlArr.push('<li class="list-item">');
	htmlArr.push('<a href="javascript:void(0);">');

	htmlArr.push('<p class="item-des">');
	htmlArr.push('<span>' + data.city + '</span>');

	htmlArr.push('<span class="item-side">' + data.dccount + '<span>套' + '</span></span>');
	htmlArr.push('</p>');
	htmlArr.push('</a>');
	htmlArr.push('</li>');

	return htmlArr;

}


function showSecondDirect(lng, lat) {
	 var point = new BMap.Point(lng, lat);

		var infoWindow = new BMap.InfoWindow(info);  // 创建信息窗口对象
		var fczbh = '1001C11000000001JUT0';
		var self = this;
	  Application.map.openInfoWindow(infoWindow, point);
		initFCPanel(fczbh,function (data) {
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

		//图片加载完毕重绘infowindow
		// document.getElementById('imgDemo').onload = function (){
		// 	infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
		// }
	// Application.map.setZoom(16);

}

function initTreeOfZone() {
// 	$.post("http://127.0.0.1:8088/" + new Date().getTime(),
// 		setParam(
// 			'/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
// 			{'userid':Application.userid},
// 			'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
// 			'getLocationByCurrentUser'
// 		), function (data) {
// 			var startindex = data.indexOf('<ns1:return>');
// 			var endindex = data.indexOf('</ns1:return>');
// 			data = data.substring(startindex+12,endindex)
// 			var treeData = JSON.parse(data);
// 			$('#treeOfZone').treeview({ expandIcon: "glyphicon glyphicon-stop",
// 				levels: 1,
// 				color:'#2a6496',
// 				showCheckbox: true,
// 				showBorder: false,
// 				backColor: "#f6f7fa",
// 				onNodeChecked:addZoneQueryData,
// 				onNodeSelected:showMapCenter,
// 				onNodeUnchecked: minusZoneQueryData,
// 				data: changeZoneData(treeData)});
// 		});

	Application.Util.ajaxConstruct(Application.serverHost, 'POST', 	{'userid':Application.userid}, 'text/xml;charset=UTF-8', function (data) {
		$('#treeOfZone').treeview({ expandIcon: "glyphicon glyphicon-plus",
			levels: 1,
			color:'#2a6496',
			showCheckbox: true,
			showBorder: false,
			backColor: "#f6f7fa",
			onNodeChecked:addZoneQueryData,
			onNodeSelected:showMapCenter,
			onNodeUnchecked: minusZoneQueryData,
			data: changeZoneData(data)});
	}, function name(params) {
		console.log('error')
	},
	{
		"xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
		"xmlnsName": "jin",
		"methodName": "getLocationByCurrentUser"
	});
}
function initTreeOfCompany() {
// 	$.post("http://127.0.0.1:8088/" + new Date().getTime(),
// 		setParam(
// 			'/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
// 			{'userid':Application.userid},
// 			'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
// 			'getHierarchyOrg'
// 		), function (data) {
// 			var startindex = data.indexOf('<ns1:return>');
// 			var endindex = data.indexOf('</ns1:return>');
// 			data = data.substring(startindex+12,endindex)
// 			var treeData = JSON.parse(data);
// 			$('#treeOfCompany').treeview({ expandIcon: "glyphicon glyphicon-stop",
// 				levels: 1,
// 				color:'#2a6496',
// 				showCheckbox: true,
// 				showBorder: false,
// 				backColor: "#f6f7fa",
// 				onNodeChecked:addCompanyQueryData,
// 				onNodeUnchecked: minusCompanyQueryData,
// 				data: treeData});
// 		});

	Application.Util.ajaxConstruct(Application.serverHost, 'POST', 	{'userid':Application.userid}, 'text/xml;charset=UTF-8', function (data) {
		$('#treeOfCompany').treeview({ expandIcon: "glyphicon glyphicon-plus",
			levels: 1,
			color:'#2a6496',
			showCheckbox: true,
			showBorder: false,
			backColor: "#f6f7fa",
			onNodeChecked:addCompanyQueryData,
			onNodeUnchecked: minusCompanyQueryData,
			data: changeCompanyData(data)});
	}, function name(params) {
		console.log('error')
	},
	{
		"xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
		"xmlnsName": "jin",
		"methodName": "getHierarchyOrg"
	});
}
function initTreeOfRetail() {
// 	$.post("http://127.0.0.1:8088/" + new Date().getTime(),
// 		setParam(
// 			'/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
// 			{'userid':Application.userid},
// 			'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
// 			'getYeTaiByCurrentUser'
// 		), function (data) {
// 			var startindex = data.indexOf('<ns1:return>');
// 			var endindex = data.indexOf('</ns1:return>');
// 			data = data.substring(startindex+12,endindex)
// 			var treeData = JSON.parse(data);
// 			$('#treeOfRetail').treeview({ expandIcon: "glyphicon glyphicon-stop",
// 				levels: 1,
// 				color:'#2a6496',
// 				showCheckbox: true,
// 				showBorder: false,
// 				backColor: "#f6f7fa",
// 				onNodeChecked:addRetailQueryData,
// 				onNodeUnchecked: minusRetailQueryData,
// 				data: changeRetailData(treeData)});
// 		});


	Application.Util.ajaxConstruct(Application.serverHost, 'POST', 	{'userid':Application.userid}, 'text/xml;charset=UTF-8', function (data) {
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
	});
}

function setParam(path, param, xmlns, methodName) {
	return {
		"url": 'i.bucg.com',
		"port": '',
		"path": path,
		"data": JSON.stringify(param),
		ajaxoptions: {
			"xmlns": xmlns,
			"xmlnsName": 'jin',
			"methodName": methodName
		}
	}
}
var queryZoneData = [];
var queryCompanyData = [];
var queryRetailData = [];
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
function changeZoneData(data) {
	var zoneData = [];
	for (var i = 0, len = data.length; i < len; i++) {
		var obj = {};
		obj.text = data[i].secondvalue;
		obj.id = data[i].firstvalue;
		obj.lng = data[i].lng;
		obj.lat = data[i].lat;
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
function changeCompanyData(data) {
	var commpanyData = [];
	for(var i = 0, len = data.length; i < len; i++) {
		var obj = data[i];
		obj.nodes = data[i].children;
		commpanyData.push(obj);
	}
	return commpanyData;
}
var houseDataParam = {
	'location': '',
	'yetai': '',
	'userid': Application.userid,
	'gongsi': '',
	'locationType': ''
};
var houseDataSmallParam = {
	'location': '',
	'yetai': '',
	'userid': Application.userid,
	'gongsi': ''
};
var laneDataParam = {
    'location': '',
    'yetai': '',
    'userid': Application.userid,
    'gongsi': '',
    'locationType': ''
};
var laneDataSmallParam = {
    'location': '',
    'yetai': '',
    'userid': Application.userid,
    'gongsi': ''
};

function getHouseOrLaneData(param, type, callback) {
	// $.post("http://127.0.0.1:8088/" + new Date().getTime(),
	// 	setParam(
	// 		'/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
	// 		param,
	// 		'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
	// 		type
	// 	), function(data){
	// 		var startindex = data.indexOf('<ns1:return>');
	// 		var endindex = data.indexOf('</ns1:return>');
	// 		data = data.substring(startindex+12,endindex)
	// 		callback(JSON.parse(data));
	// 	});

	Application.Util.ajaxConstruct(Application.serverHost, 'POST', param, 'text/xml;charset=UTF-8', function (data) {
		callback(data);
	}, function name(params) {
		console.log('error')
	},
	{
		"xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
		"xmlnsName": "jin",
		"methodName": type
	});
}
function showMapCenter(event, node) {
	var point = new BMap.Point(node.lng, node.lat);
	// 百度地图API功能
	Application.map.centerAndZoom(point, 13);
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

function initFCPanel(id, callback) {
// 	$.post("http://127.0.0.1:8088/" + new Date().getTime(),
// 	setParam(
// 	'/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
// 	{'fczbh': id, userid: Application.userid},
// 	'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
// 	"getFangChanPanel"
// 	), function(data){
// 		var startindex = data.indexOf('<ns1:return>');
// 		var endindex = data.indexOf('</ns1:return>');
// 		data = data.substring(startindex+12,endindex)
// 		callback(JSON.parse(data));
// 	});


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