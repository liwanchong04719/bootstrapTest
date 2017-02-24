var showIndex = 1;
var clickFlag = false;
var center = null;
$(document).ready(function () {
	//点击tab
    $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
			if(index === 0) {
				 queryZoneData = [];
				 queryCompanyData = [];
				 queryRetailData = [];
			}
			  if(index === 1) {
					showIndex = index
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
	$('#zoom').text(map.getZoom());
	map.addEventListener('zoomstart',function () {
		center = null;
	})
	map.addEventListener('tilesloaded', function () {
		$('#zoom').text(map.getZoom());

		if(!center){
			if(showIndex === 2) {
				setLaneData(map);
			} else {
				setHouseData(map);
			}
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
function locationFc(lng, lat,cla) {
	$('.bubble').css('background-color','rgba(57,172,106,0.9)');
	$('.'+cla).css({'background-color':'rgba(228,57,60,0.9)'});
	$('.'+cla).parent().css('z-index','1000000');
	clickFlag = true;




	var point = new BMap.Point(lng, lat);
	Application.map.centerAndZoom(point, 16);
}
function locationDc(lng, lat,cla) {
	$('.bubble').css('background-color','rgba(57,172,106,0.9)');
	$('.'+cla).css('background-color','rgba(228,57,60,0.9)');
	$('.'+cla).parent().css({'z-index':10000000});
	clickFlag = true;
	var point = new BMap.Point(lng, lat);
	Application.map.centerAndZoom(point, 16);
}
/***
 * 生成大于11级的侧边栏房产
 */




function initLiItemOfHose(data) {
	locationFcData = data;
	var htmlArr = [];

	htmlArr.push('<li class="list-item '+data.pk+' " onclick="locationFc('+data.lng+','+data.lat+',\''+data.pk+'\')">');
	htmlArr.push('<a href="#" >');
	htmlArr.push('<div class="item-aside">');
	htmlArr.push('<img alt="示例图片" src="' + data.img.accessory_id + '">');
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

	htmlArr.push('<li class="list-item '+data.zhujian+' " onclick="locationDc('+data.lng+','+data.lat+',\''+data.zhujian+'\')">');
	htmlArr.push('<a href=javascript:void(0)>');
	htmlArr.push('<div class="item-aside">');
	htmlArr.push('<img alt="示例图片" src="' + data.img + '">');
	htmlArr.push('</div>');
	htmlArr.push('<div class="item-main">');
	htmlArr.push('<p class="item-tle">' + data.tdsyr + '</p>');
	htmlArr.push('<p class="item-des">');
	htmlArr.push('<span>' + data.syqmj + '平米' + '</span>');
	htmlArr.push('<p class="item-community">');
	htmlArr.push('<span class="item-replace-com" data-origin="">' + data.tdsyr + '</span>');
	htmlArr.push('</p>');
	htmlArr.push('<p class="item-community">');
	// htmlArr.push('<span class="item-replace-com" data-origin="">' + data.zl + '</span>');
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
						html: "<div class='bubble' ><p class='name' style='margin-bottom: 5px'><a style='color: white' href=javascript:void(0); onclick='showhouse("+data[i].lng+','+data[i].lat+',\"'+data[i].city+"\")' >" + data[i].city + "</a></p><p class='number'>" + data[i].fccount + "</p></div>",
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

							 html:"<div class='bubble-3 bubble'><p class='name' style='margin-bottom: 5px;font-size: 14px'> <a style='color: white'  href=javascript:void(0); onclick='showSecondDirect("+data[j].lng+","+data[j].lat+","+"\""+data[j].pk+"\""+")' >" + data[j].xmmc + "</a></p><p class='number' style='color: white;font-size: 14px'>" + data[j].jzmj + "</p></div>",
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

}


function showhouse(lng,lat,location) {
	//Application.map.centerAndZoom(new BMap.Point(lat, lng), 16);

	Application.map.clearOverlays();
	if(showIndex ==1){


		var para = {
			'location': location,
			'yetai': '',
			'userid': Application.userid,
			'gongsi': ''
		};
		if(queryCompanyData.length !=0){
			para.gongsi = queryCompanyData.toString();
		}
		if(queryZoneData.length !=0){
			para.location = queryZoneData.toString();
		}
		if(queryRetailData.length !=0){
			para.yetai = queryRetailData.toString();
		}

		getHouseOrLaneData(
			para,
			'getFcXinxi_map',
			function (data) {
				for (var j in data) {
					var href = "../pages/housePanel.html?fczbh=" + data[j].xmmc;
					var customMarker = createMarker({
						point: new BMap.Point(data[j].lng, data[j].lat),

						html:"<div class='bubble-3 bubble "+data[j].pk+"'><p class='name' style='margin-bottom: 5px;font-size: 14px'> <a style='color: white'  href=javascript:void(0); onclick='showSecondDirect("+data[j].lng+","+data[j].lat+","+"\""+data[j].pk+"\""+")' >" + data[j].xmmc + "</a></p><p class='number' style='color: white;font-size: 14px'>" + data[j].jzmj + "</p></div>",
						style: {
							color: 'white',
							fontSize: "12px",
							height: "20px",
							lineHeight: "20px",
							fontFamily: "微软雅黑",
							border: 'none'
						}
					})
					Application.map.addOverlay(customMarker);

				}
				createHouse(data);
			}
		)

	}else{
		var para1 = {
			'location': location,
			'yetai': '',
			'userid': Application.userid,
			'gongsi': '',
			'dijiye':'',
			'xianshitiaoshu':'',
			'tdsyr ':'',
			'dl':'',
			'tdxz':'',
			'syqmj':'',
			'zzdate':'',
			'syqmjpx':'',
			'zzdatepx':''
		};

		if(queryCompanyData.length !=0){
			para.gongsi = queryCompanyData.toString();
		}
		if(queryZoneData.length !=0){
			para.location = queryZoneData.toString();
		}
		if(queryRetailData.length !=0){
			para.yetai = queryRetailData.toString();
		}

		getHouseOrLaneData(para1
			,
			'getDcXinXi',
			function (data) {
				data = data.rows
				for (var i in data) {
					var customMarker = createMarker({
						point: new BMap.Point(data[i].lng, data[i].lat),
						html: "<div class='bubble "+data[i].pk+"' onclick='showSecondDC("+data[i].lng+","+data[i].lat+","+"\""+data[i].zhujian+"\""+")'><p class='name'>" + data[i].dlwz + "</p><p class='number'>" + data[i].syqmj + "</p></div>",
						style: {
							color: 'white',
							fontSize: "12px",
							height: "20px",
							lineHeight: "20px",
							fontFamily: "微软雅黑",
							border: 'none'
						}
					})
					Application.map.addOverlay(customMarker);

					// initPagination();
				}
				createlane(data);
			}
		)

	}




}

/**
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
						html: "<div class='bubble' onclick='showhouse("+data[i].lng+","+data[i].lat+","+"\""+data[i].city+"\""+")'><p class='name'>" + data[i].city + "</p><p class='number'>" + data[i].dccount + "</p></div>",
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
						point: new BMap.Point(data[j].lng, data[j].lat),
						html: "<div class='bubble' onclick='showSecondDC("+data[j].lng+","+data[j].lat+","+"\""+data[j].zhujian+"\""+")'><p  class='name'>" + data[j].tdsyr
            + "</p><p class='number'>" + data[j].syqmj + "</p></div>",
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


function createHouse(data) {
	var list = [];

	for (var i = 0, len = data.length; i < len; i++) {

			center = new BMap.Point(data[0].lng, data[0].lat);
			list = list.concat(initLiItemOfHose(data[i]));

	}
	if(center){
		Application.map.centerAndZoom(center,16);
	}

	$("#houseDataDiv").empty().append(list.join(''));


}


/**
 * 生成小于11级时地图左侧栏展示内容房产
 */



function createHouseContainer(data) {
	var list = [];

	for (var i = 0, len = data.length; i < len; i++) {

		if (Application.map.getZoom() >= Application.province + 1 && Application.map.getZoom() <= Application.direct) {
			list = list.concat(initDirectOfHouse(data[i]));
		}
		else if (Application.map.getZoom() >= Application.direct + 1) {
			center = new BMap.Point(data[0].lng, data[0].lat);
			list = list.concat(initLiItemOfHose(data[i]));
		}
	}
	if(center){
		Application.map.centerAndZoom(center,16);
	}

	$("#houseDataDiv").empty().append(list.join(''));
}


function createlane(data) {
	var list = []

	for (var i = 0, len = data.length; i < len; i++) {

			center = new BMap.Point(data[0].lng, data[0].lat);
			list = list.concat(initLiItemOfLane(data[i]));

	}

	if(center){
		Application.map.centerAndZoom(center,16);
	}
	$("#laneDataDiv").empty().append(list.join(''));


}

/**
 * 生成小于11级时地图左侧栏展示内容地产
 */
function createLaneContainer(data) {
	var list = []

	for (var i = 0, len = data.length; i < len; i++) {

		if (Application.map.getZoom() >= Application.province + 1 && Application.map.getZoom() <= Application.direct) {
			list = list.concat(initDirectOfLane(data[i]));
		}
		else if (Application.map.getZoom() >= Application.direct + 1) {
			center = new BMap.Point(data[0].lng, data[0].lat);
			list = list.concat(initLiItemOfLane(data[i]));
		}
	}

	if(center){
		Application.map.centerAndZoom(center,16);
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

	htmlArr.push('<li onclick="showhouse('+data.lng+','+data.lat+',\''+data.city+'\')" class="list-item">');
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

	htmlArr.push('<li onclick="showhouse('+data.lng+','+data.lat+',\''+data.city+'\')" class="list-item">');
	htmlArr.push('<a href="javascript:void(0);">');

	htmlArr.push('<p class="item-des">');
	htmlArr.push('<span>' + data.city + '</span>');

	htmlArr.push('<span class="item-side">' + data.dccount + '<span>套' + '</span></span>');
	htmlArr.push('</p>');
	htmlArr.push('</a>');
	htmlArr.push('</li>');

	return htmlArr;

}


function showSecondDirect(lng, lat,id) {
	 var point = new BMap.Point(lng, lat);

		var infoWindow = new BMap.InfoWindow(info);  // 创建信息窗口对象
		var fczbh = id;
		var self = this;
	  Application.map.openInfoWindow(infoWindow, point);
	//infoWindow.disableAutoPan();
	infoWindow.disableCloseOnClick();
		initFCPanel(fczbh,function (data) {
			var dataFc= data.fangChanPanelXinxi;

			$('#houseimg').attr('src',dataFc.img[0].accessory_id);
			if(!dataFc.yezhu){
				$($('#yezhu')[0].parentNode).hide();
			}
			$('#yezhu').text(dataFc.yezhu);
			if(!dataFc.jzmj){
				$($('#jzmj')[0].parentNode).hide();
			}
			$('#jzmj').text(dataFc.jzmj);
			if(!dataFc.yetai){
				$($('#yetai')[0].parentNode).hide();
			}
			$('#yetai').text(dataFc.yetai);
			if(!dataFc.zuoluo){
				$($('#zuoluo')[0].parentNode).hide();
			}
			$('#zuoluo').text(dataFc.zuoluo);
			if(!dataFc.chuzulv){
				$($('#czl')[0].parentNode).hide();
			}
			$('#czl').text(dataFc.chuzulv);
			if(!dataFc.punjundanjia){
				$($('#xpjdj')[0].parentNode).hide();
			}
			$('#xpjdj').text(dataFc.punjundanjia);
			if(!dataFc.fczbh){
				$($('#fczbh')[0].parentNode).hide();
			}
			$('#fczbh').text(dataFc.fczbh);

			if(!dataFc.tdzbh){
				$($('#tdzbh')[0].parentNode).hide();
			}
			$('#tdzbh').text(dataFc.tdzbh);
			if(!dataFc.gyqk){
				$($('#gyqk')[0].parentNode).hide();
			}
			$('#gyqk').text(dataFc.gyqk);
			if(!dataFc.djtime){
				$($('#djtime')[0].parentNode).hide();
			}
			$('#djtime').text(dataFc.djtime);
			if(!dataFc.fwxz){
				$($('#fwxz')[0].parentNode).hide();
			}
			$('#fwxz').text(dataFc.fwxz);
			if(!dataFc.ghyt){
				$($('#ghyt')[0].parentNode).hide();
			}
			$('#ghyt').text(dataFc.ghyt);
			if(!dataFc.zcengshu){
				$($('#zcengshu')[0].parentNode).hide();
			}
			$('#zcengshu').text(dataFc.zcengshu);
			if(!dataFc.tnjzmj){
				$($('#tnjzmj')[0].parentNode).hide();
			}
			$('#tnjzmj').text(dataFc.tnjzmj);
			if(!dataFc.dihao){
				$($('#dihao')[0].parentNode).hide();
			}
			$('#dihao').text(dataFc.dihao);
			if(!dataFc.fzdw){
				$($('#fzdw')[0].parentNode).hide();
			}
			$('#fzdw').text(dataFc.fzdw);
			if(!dataFc.fztime){
				$($('#fztime')[0].parentNode).hide();
			}
			$('#fztime').text(dataFc.fztime);
			if(!dataFc.qita){
				$($('#qita')[0].parentNode).hide();
			}
			$('#qita').text(dataFc.qita);
			if(!dataFc.fwmc){
				$($('#fwmc')[0].parentNode).hide();
			}
			$('#fwmc').text(dataFc.fwmc);
			if(!dataFc.bdcdyh){
				$($('#bdcdyh')[0].parentNode).hide();
			}
			$('#bdcdyh').text(dataFc.bdcdyh);
			if(!dataFc.qllx){
				$($('#qllx')[0].parentNode).hide();
			}
			$('#qllx').text(dataFc.qllx);
			if(!dataFc.qlqtzk){
				$($('#qlqtzk')[0].parentNode).hide();
			}
			$('#qlqtzk').text(dataFc.qlqtzk);
			if(!dataFc.syqx){
				$($('#syqx')[0].parentNode).hide();
			}
			$('#syqx').text(dataFc.syqx);
			if(!dataFc.fczlx){
				$($('#fczlx')[0].parentNode).hide();
			}
			$('#fczlx').text(dataFc.fczlx);
			if(!dataFc.qllxd){
				$($('#qllxd')[0].parentNode).hide();
			}
			$('#qllxd').text(dataFc.qllxd);
			if(!dataFc.qllxf){
				$($('#qllxf')[0].parentNode).hide();
			}
			$('#qllxf').text(dataFc.qllxf);
			if(!dataFc.fwqlxz){
				$($('#fwqlxz')[0].parentNode).hide();
			}
			$('#fwqlxz').text(dataFc.fwqlxz);
			if(!dataFc.gyzdmj){
				$($('#gyzdmj')[0].parentNode).hide();
			}
			$('#gyzdmj').text(dataFc.gyzdmj);
			if(!dataFc.fwjzmj){
				$($('#fwjzmj')[0].parentNode).hide();
			}
			$('#fwjzmj').text(dataFc.fwjzmj);
			if(!dataFc.location){
				$($('#location')[0].parentNode).hide();
			}
			$('#location').text(dataFc.location);
			if(!dataFc.tdsyqqdfs){
				$($('#tdsyqqdfs')[0].parentNode).hide();
			}
			$('#tdsyqqdfs').text(dataFc.tdsyqqdfs);
			if(!dataFc.tdsynx_s){
				$($('#tdsynx_s')[0].parentNode).hide();
			}
			$('#tdsynx_s').text(dataFc.tdsynx_s);
			if(!dataFc.tdsynx_e){
				$($('#tdsynx_e')[0].parentNode).hide();
			}
			$('#tdsynx_e').text(dataFc.tdsynx_e);
			if(!dataFc.sfxnsc){
				$($('#sfxnsc')[0].parentNode).hide();
			}
			$('#sfxnsc').text(dataFc.sfxnsc);
			if(!dataFc.tdqlxz){
				$($('#tdqlxz')[0].parentNode).hide();
			}
			$('#tdqlxz').text(dataFc.tdqlxz);
			initBarChart("barChart",data.fangChanPanelZhuZhuangTu);
			initAccordion();
			var dataOhter = data.fangChanPanelDuiyingDiChanXinxi;
			for (var i = 0, len =dataOhter.length; i < len ; i++) {
				var list = otherInfo(dataOhter[i]);
				$("#dyfcxx").append(list.join(''));
			}
		})


	var container = $('#housecontentlist'),
		scrollTo = $('li.'+id);
	container.scrollTop(0);
	container.scrollTop(
		//scrollTo.position().top +100
		scrollTo.offset().top - container.offset().top
	);


	//图片加载完毕重绘infowindow
		// document.getElementById('imgDemo').onload = function (){
		// 	infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
		// }
	// Application.map.setZoom(16);

}


function showSecondDC(lng, lat, id) {
	var point = new BMap.Point(lng, lat);
	var infoWindow = new BMap.InfoWindow(dcInfo);  // 创建信息窗口对象
	//infoWindow.disableAutoPan();
	infoWindow.disableCloseOnClick();
	Application.map.openInfoWindow(infoWindow, point);
	showDCDetails(id)
}

function showDCDetails(id) {
	$('#details').empty();

			$("#details").append(dcInfo);
			initDCPanel(id, function (data) {
				var dataDc= data.diChanPanelXinxi;

				$('#landimg').attr('src',dataDc.img[0].accessory_id);

				if(!dataDc.tdsyr){
					$($('#tdsyr')[0].parentNode).hide();
				}
				$('#tdsyr').text(dataDc.tdsyr);

				if(!dataDc.symj){
					$($('#symj')[0].parentNode).hide();
				}
				$('#symj').text(dataDc.symj);
				if(!dataDc.zuoluo){
					$($('#zuoluo')[0].parentNode).hide();
				}
				$('#zuoluo').text(dataDc.zuoluo);
				if(!dataDc.tdzbh){
					$($('#tdzbh')[0].parentNode).hide();
				}
				$('#tdzbh').text(dataDc.tdzbh);
				if(!dataDc.zzdate){
					$($('#zzdate')[0].parentNode).hide();
				}
				$('#zzdate').text(dataDc.zzdate);
				if(!dataDc.zzdate){
					$($('#fzdate')[0].parentNode).hide();
				}
				$('#fzdate').text(dataDc.fzdate);

				if(!dataDc.tdxz){
					$($('#tdxz')[0].parentNode).hide();
				}
				$('#tdxz').text(dataDc.tdxz);
				if(!dataDc.dwid){
					$($('#dwid')[0].parentNode).hide();
				}
				$('#dwid').text(dataDc.dwid);
				if(!dataDc.dihao){
					$($('#dihao')[0].parentNode).hide();
				}
				$('#dihao').text(dataDc.dihao);
				if(!dataDc.tuhao){
					$($('#tuhao')[0].parentNode).hide();
				}
				$('#tuhao').text(dataDc.tuhao);
				if(!dataDc.qdjg){
					$($('#qdjg')[0].parentNode).hide();
				}
				$('#qdjg').text(dataDc.qdjg);
				if(!dataDc.dymj){
					$($('#dymj')[0].parentNode).hide();
				}
				$('#dymj').text(dataDc.dymj);
				if(!dataDc.fzdw){
					$($('#fzdw')[0].parentNode).hide();
				}
				$('#fzdw').text(dataDc.fzdw);
				if(!dataDc.ftmj){
					$($('#ftmj')[0].parentNode).hide();
				}
				$('#ftmj').text(dataDc.ftmj);
				if(!dataDc.sfxnsc){
					$($('#sfxnsc')[0].parentNode).hide();
				}
				$('#sfxnsc').text(dataDc.sfxnsc);

				if(!dataDc.syqtype){
					$($('#syqtype')[0].parentNode).hide();
				}
				$('#syqtype').text(dataDc.syqtype);
				initBarChart("barChart",dataDc);
				initAccordion();
				var dataOhter = data.diChanPanelDuiyingFangChanXinxi;
				for (var i = 0, len =dataOhter.length; i < len ; i++) {
					var list = otherInfoDc(dataOhter[i]);
					$("#dydcxx").append(list.join(''));
				}
			})
			// $('#details').append(test);
	var container = $('#lanecontentlist'),
		scrollTo = $('li.'+id);
	container.scrollTop(0);
	container.scrollTop(
		//scrollTo.position().top +100
		scrollTo.offset().top - container.offset().top
	);


}

function initDCPanel(id, callback) {

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
function otherInfoDc(data) {
	var htmlArr = [];

	htmlArr.push('<li class="list-item">');
	htmlArr.push('<div style="width: 100%;padding: 10px 20px">');

	htmlArr.push('<div><span>'+data.fwmc+'</span></div>');
	htmlArr.push('<div><span>'+data.fwsyqr+'</span></div>');

	htmlArr.push('</div> </li>');
	return htmlArr;

}
function initTreeOfZone() {

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

	Application.Util.ajaxConstruct(Application.serverHost, 'POST', 	{'userid':Application.userid}, 'text/xml;charset=UTF-8', function (data) {
		$('#treeOfCompany').treeview({ expandIcon: "glyphicon glyphicon-plus",
			levels: 1,
			color:'#2a6496',
			showCheckbox: true,
			showBorder: false,
			backColor: "#f6f7fa",
			onNodeChecked:addCompanyQueryData,
			onNodeUnchecked: minusCompanyQueryData,
			data: data});
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

function initBarChart(id,data) {
	var dom = document.getElementById(id);
	var myChart = echarts.init(dom);

	var xAxis = [];
	var chuzulv = [];
	var danjia = [];

	for(var i=0,len =data.length; i<len; i++){
		xAxis.push(data[i].year);
		chuzulv.push(data[i].chuzulv);
		danjia.push(data[i].pingjundanjia);
	}



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
				data: xAxis
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
				data:chuzulv
			},
			{
				name: '单价',
				type: 'line',
				yAxisIndex: 1,
				itemStyle:{
					normal:{color:'#C06410'}
				},
				data:danjia
			}
		]
	};

	if (option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}

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