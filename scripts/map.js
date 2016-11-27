$(document).ready(function () {
	//根据屏幕计算高度
	$('select[name="inverse-select"]').select2({ dropdownCssClass: 'select-inverse-dropdown' });
	//点击tab
    $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
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

		if (map.getZoom() == Application.province + 1 || map.getZoom() == Application.direct) {
			map.clearOverlays();
			for (var i in ddata.data) {
				var customMarker = createMarker({
					point: new BMap.Point(ddata.data[i].longitude, ddata.data[i].latitude),
					html: "<div class='bubble'><p class='name'>" + ddata.data[i].name + "</p><p class='number'>" + ddata.data[i].house_count + "</p></div>",
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
			createLeftContainer(directdata);
			initPagination();
		}
		else if (map.getZoom() == Application.direct + 1) {
			map.clearOverlays();
			for (var j in cdata) {
				var customMarker = createMarker({
					point: new BMap.Point(cdata[j].longitude, cdata[j].latitude),
					html: '<p class="bubble-3 bubble" ><i class="num">&nbsp;程庄南里&nbsp;</i><span class="name"><i class="name-des"><a href="/xiaoqu/1111027376714/" target="_blank">3.9万&nbsp;&nbsp;2套</a></i></span><i class="arrow-up"><i class="arrow"></i><i></i></i></p>',
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

			createLeftContainer(housedata);
			initPagination();
		}
	});

	//前端分页
	function initPagination() {


		var element = $('#bp-3-element-test');

		var options = {
			bootstrapMajorVersion: 3,
			currentPage: 1,
			numberOfPages: 5,
			totalPages: 2,
			itemTexts: function (type, page, current) {
				switch (type) {
					case "first":
						return "首页";
					case "prev":
						return "上一页";
					case "next":
						return "下一页";
					case "last":
						return "末页";
					case "page":
						return page;
				}
			},
			onPageClicked: function (e, originalEvent, type, page) {
                //$('#alert-content').text("Page item clicked, type: "+type+" page: "+page);

				if (map.getZoom() >= Application.province + 1 && map.getZoom() < Application.direct) {
					pageselectCallback(page - 1, directdata, initDirectItem);
				}
				else if (map.getZoom() >= Application.direct + 1) {
					pageselectCallback(page - 1, housedata, initLiItem);
				}

            }
		}

		element.bootstrapPaginator(options);

		var element = $('#bp-3-element-test');


		var list = element.children();

		for (var i = 0; i < list.length; i++) {
			var item = $(list[i]);

		}



	};

	Application.Util.ajaxConstruct(Application.serverHost, 'POST', {
		userid: '1001ZZ10000000018FJF'
	}, 'XML', function () {
		console.log('请求成功！！！')
	}, function (params) {
		console.log('请求失败')
	}, { 'xmlns': 'xmlns:chec="http://web.pims.itf.nc/CheckProperty"', 'xmlnsName': 'chec', 'methodName': 'xianyouzichan' })


})

//初始化地图， 百度地图API功能
function initmap() {
	var map = new BMap.Map("map", { minZoom: Application.minZoom, enableHighResolution: true });    // 创建Map实例

	map.centerAndZoom(Application.initCenter, Application.initZoom);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	return map;
}



//生成marker
function createMarker(options) {
	var opts = {
		position: options.point   // 指定文本标注所在的地理位置
	}

	var label = new BMap.Label("", opts);
	label.setContent(options.html);
	label.setStyle(options.style);
	label.addEventListener('mouseover', function (event) {
		event.target.setZIndex(1000)
	})
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
	$(".r-content").empty().append(list.join(''));
	return false;
}

/***
 * 生成大于11级的侧边栏
 */
function initLiItem(data) {

	var htmlArr = [];

	htmlArr.push('<li class="list-item">');
	htmlArr.push('<a href="#" target="_blank">');
	htmlArr.push('<div class="item-aside">');
	htmlArr.push('<img alt="示例图片" src="' + data.list_picture_url + '">');
	htmlArr.push('</div>');
	htmlArr.push('<div class="item-main">');
	htmlArr.push('<p class="item-tle">' + data.community_name + '</p>');
	htmlArr.push('<p class="item-des">');
	htmlArr.push('<span>' + data.frame_bedroom_num + '室' + data.frame_hall_num + '厅' + '</span>');
	htmlArr.push('<span data-origin="' + data.house_area + '">' + data.house_area + '平米' + '</span>');
	htmlArr.push('<span>' + data.frame_orientation + '</span>');
	htmlArr.push('<span class="item-side">' + data.price_total + '<span>万元' + '</span></span>');
	htmlArr.push('</p>');
	htmlArr.push('<p class="item-community">');
	htmlArr.push('<span class="item-replace-com" data-origin="">' + data.community_name + '</span>');
	htmlArr.push('</p>');

	htmlArr.push('</div>');
	htmlArr.push('</a>');
	htmlArr.push('</li>');

	return htmlArr;

}

/**
 * 生成小于11级时地图左侧栏展示内容
 */
function createLeftContainer(data) {
	var list = []

	for (var i = 0, len = data.length; i < len; i++) {

		if (Application.map.getZoom() >= Application.province + 1 && Application.map.getZoom() < Application.direct) {
			list = list.concat(initDirectItem(data[i]));
		}
		else if (Application.map.getZoom() >= Application.direct + 1) {
			//pageselectCallback(page-1, housedata, initLiItem);
			list = list.concat(initLiItem(data[i]));
		}
		//list = list.concat(initDirectItem(data[i]));
	}

	$(".r-content").empty().append(list.join(''));
}

/**
 * 生成小于11级时地图左侧栏展示项
 */
function initDirectItem(data) {
	var htmlArr = [];

	htmlArr.push('<li class="list-item">');
	htmlArr.push('<a href="javascript:void(0);" onclick="showSecondDirect()">');

	htmlArr.push('<p class="item-des">');
	htmlArr.push('<span>' + data.name + '</span>');

	htmlArr.push('<span class="item-side">' + data.house_count + '<span>套' + '</span></span>');
	htmlArr.push('</p>');
	htmlArr.push('</a>');
	htmlArr.push('</li>');

	return htmlArr;

}

function showSecondDirect() {
	Application.map.setZoom(16);

}