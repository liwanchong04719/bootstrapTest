/**
 * Created by liwanchong on 2016/12/14.
 */
var info =
  '<div id="houseInfo" style="height: 400px;width: 450px;overflow: auto;">' +
  '<h6 style="text-align: center;padding-bottom:3px;margin-top: 5px;margin-bottom: 10px;border-bottom: 1px solid #e8e8e8">房产信息</h6>' +
  '  <img style="width: 100%;height: 200px" id="houseimg" src=""/>' +
  '<ul class="fields" style="">' +
  '<li><label>业主：</label><label id="yezhu">---</label></li>' +
  '<li><label>建筑面积：</label><label id="jzmj">---</label></li>' +
  '<li><label>业态：</label><label id="yetai">---</label></li>' +
  '<li><label>座落：</label><label id="zuoluo">---</label></li>' +
  '<li><label>出租率：</label><label id="czl">---</label></li>' +
  '<li><label>现平均单价：</label><label id="xpjdj">---</label></li>' +
  '<li><label>房产证编号：</label><label id="fczbh">---</label></li>' +
  '<li><label>土地证编号：</label><label id="tdzbh">---</label></li>' +
  '<li><label>共有情况：</label><label id="gyqk">---</label></li>' +
  '<li><label>登记时间：</label><label id="djtime">---</label></li>' +
  '<li><label>房屋性质：</label><label id="fwxz">---</label></li>' +
  '<li><label>规划用途：</label><label id="ghyt">---</label></li>' +
  '<li><label>总层数：</label><label id="zcengshu">---</label></li>' +
  '<li><label>套内建筑面积：</label><label id="tnjzmj">---</label></li>' +
  '<li><label>地号：</label><label id="dihao">---</label></li>' +
  '<li><label>发证单位：</label><label id=" fzdw">---</label></li>' +
  '<li><label>发证时间：</label><label id="fztime">---</label></li>' +
  '<li><label>其他：</label><label id="其他">---</label></li>' +
  '<li><label>房屋名称：</label><label id="fwmc">---</label></li>' +
  '<li><label>不动产单元号：</label><label id="bdcdyh">---</label></li>' +
  '<li><label>权利类型：</label><label id="qllx">---</label></li>' +
  '<li><label>权利其他状况：</label><label id="qlqtzk">---</label></li>' +
  '<li><label>使用期限：</label><label id="syqx">---</label></li>' +
  '<li><label>房产证类型：</label><label id="fczlx">---</label></li>' +
  '<li><label>权力类型（地）：</label><label id="qllxd">---</label></li>' +
  '<li><label>权力类型（房）：</label><label id="qllxf">---</label></li>' +
  '<li><label>房屋（权力）性质：</label><label id="fwqlxz">---</label></li>' +
  '<li><label>共有宗地面积（平方米）：</label><label id="gyzdmj">---</label></li>' +
  '<li><label>房屋建筑面积（平方米）：</label><label id="fwjzmj">---</label></li>' +
  '<li><label>地理位置：</label><label id="location">---</label></li>' +
  '<li><label>土地使用权取得方式：</label><label id="tdsyqqdfs">---</label></li>' +
  '<li><label>土地使用年限开始：</label><label id="tdsynx_s">---</label></li>' +
  '<li><label>土地使用年限结束：</label><label id=" tdsynx_e">---</label></li>' +
  '<li><label>是否虚拟生成</label><label id="sfxnsc">---</label></li>' +
  '<li><label>土地（权利）性质</label><label id="tdqlxz">---</label></li>' +
  '</ul>' +
  '<div class="wrapper">' +
  '<ul class="items">' +
  '<li>' +
  '<a href="#">出租率及平均单价趋势 <i class="glyphicon glyphicon-chevron-right"></i></a>' +
  '<ul class="sub-items">' +
  '<li>' +
  '<div id="barChart" style="height: 250px;width: 350px">' +
  '</div></li></ul> </li>' +
  '<li>' +
  '<a href="#">对应地产信息<i class="glyphicon glyphicon-chevron-right"></i></a>' +
  '<ul class="sub-items" id="dyfcxx">' +
  '</ul>' +
  '</li>' +
  ' </ul>' +
  '</div>' +
  '</div>';