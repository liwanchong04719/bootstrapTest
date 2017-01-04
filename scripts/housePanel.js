/**
 * Created by liwanchong on 2016/12/14.
 */
$(document).ready(function () {
    initAccordion();

    var fczbh = getUrlParam('fczbh');
    initFCPanel(fczbh,function (data) {
        initBarChart("barChart",data);
        var dataFc= data.fangChanPanelXinxi;
        $('#yezhu').text(dataFc.yezhu);
        $('#jzmj').text(dataFc.jzmj);
        $('#yetai').text(dataFc.yetai);
        $('#zuoluo').text(dataFc.zuoluo);
        $('#czl').text(dataFc.chuzulv);
        $('#xpjdj').text(dataFc.punjundanjia);
    })
});
function initAccordion() {
    $(".items > li > a").click(function (e) {
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

    $(".sub-items a").click(function () {
        $(".sub-items a").removeClass("current");
        $(this).addClass("current");
    });
}
function initFCPanel(id, callback) {
    $.post("http://127.0.0.1:8088/" + new Date().getTime(),
      setParam(
        '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
        {'fczbh': id, userid: '1001ZZ10000000018RVU'},
        'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
        "getFangChanPanel"
      ), function(data){
          var startindex = data.indexOf('<ns1:return>');
          var endindex = data.indexOf('</ns1:return>');
          data = data.substring(startindex+12,endindex)
          callback(JSON.parse(data));
      });

}
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

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}