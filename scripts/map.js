$(document).ready(function(){
 //根据屏幕计算高度
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
	$('#map').css("height", height);
	$('select[name="inverse-select"]').select2({dropdownCssClass: 'select-inverse-dropdown'});
	//初始化左侧列表
	initHoouseList();
	var housedata = house.data.list;
	$('#left_house_list').bootstrapTable('load',housedata);
	//地图
	var map = initmap();
	//根据地图级别绘制图标
	$('#zoom').text(map.getZoom())
	map.addEventListener('zoomend',function(){
		$('#zoom').text(map.getZoom());
		if(map.getZoom() == Application.province + 1){
			for(var i in ddata.data){
				var customMarker = createMarker({
					point:new BMap.Point(ddata.data[i].longitude, ddata.data[i].latitude),
					html:"<div class='bubble'><p class='name'>"+ ddata.data[i].name +"</p><p class='number'>"+ddata.data[i].house_count+"</p></div>",
					style:{
							color : 'white',
							fontSize : "12px",
							height : "20px",
							lineHeight : "20px",
							fontFamily:"微软雅黑",
							border:'none'
						}
				})

				map.addOverlay(customMarker);
			}
		}

	})


})

//初始化地图， 百度地图API功能
function initmap(){
	var map = new BMap.Map("map",{minZoom:Application.minZoom,enableHighResolution:true});    // 创建Map实例

	map.centerAndZoom(Application.initCenter, Application.initZoom);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	return map;
}



//生成marker
function createMarker(options) {
	var opts = {
		position : options.point   // 指定文本标注所在的地理位置
		}

	var label = new BMap.Label("", opts);
	label.setContent(options.html);
	label.setStyle(options.style);
	label.addEventListener('mouseover',function (event) {
		event.target.setZIndex(1000)
	})
	return label;
}


//生成房产列表

function initHoouseList(){
   $('#left_house_list').bootstrapTable({
        height: (document.documentElement.clientHeight || document.body.clientHeight) - 230,
        classes:"table table-hover table-condensed",
        striped:true,
        toolbar:'#rawdata-toolbar',
        pagination:true,
		showHeader:false,
        showColumns: false,
        showRefresh:false,
        showToggle:false,
		
        pageSize: 5,
        columns: [ {
            field: 'house_code',
            align: 'center',
            title: '编号',
         	formatter:function(value, row){
                    var html='<div class="row"><a class="tableitem" href="/ershoufang/101100781178.html" target="_blank" title="富力城B区&nbsp;3室1厅" data-community="1111027374273"><div class="item-aside"><img src="house.jpg"></div><div class="item-main"><p class="item-tle">富力城B区&nbsp;3室1厅</p><p class="item-des"><span>3室1厅</span><span data-origin="102.8">102平米</span><span>南 北</span><span class="item-side">1050<span>万</span></span></p><p class="item-community"><span class="item-replace-com" data-origin="">富力城B区</span><span class="item-exact-com">富力城B区</span></p><p class="item-tag-wrap"><span class="item-tag-subway item-extra" title="距离10号线双井46铁</span><span class="item-tag-school item-extra" title="芳草地国际学校双花园校区">学区</span><span class="item-tag-taxfree item-extra" title="">房本满两年</span></p></div></a></div>'

return html;

                }
        }]
    })
}