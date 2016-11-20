$(document).ready(function(){
 //根据屏幕计算高度
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
	$('#map').css("height", height);
	
	
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