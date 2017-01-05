/**
 * Created by wangtun on 2016/11/17.
 */
$(function () {

  function GetQueryString(name)
  {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }
  Application.userid = GetQueryString('cuserid')?GetQueryString('cuserid'):Application.userid;
  $.fn.select2.defaults.set("theme", "bootstrap");
  //资产盘点
  getExistingAssets(Application.userid);
  getExistingChanges(Application.userid);
  //资产盘点环状图
  //公司、区域数据
  getOrgAndLocation(Application.userid);
  //getCircleGraph(Application.userid)

  //经营状况，出租率
  getManagementSituation(Application.userid);

  //区域业态
  getLocationAndYetai(Application.userid);

  // initPieChart();
  // initBarChart();
  // initPieStatus();
  // $("#propertyCompanySelect").select2({
  //   placeholder: "Select a state",
  //   allowClear: true
  // })

     initOfRetail(function (data) {
          var retails = [];
          retails.push({ id: "test", text: "全部" });
          for (var i = 0, len = data.length; i < len; i++) {
            retails.push({ id: data[i].fristvalue, text: data[i].secondvalue });
          }
          $('#statisticsretail').empty();
          $('#statisticsretail').select2({
            data: retails
          }).on('select2:select', function (event) {
             getStatisticData($("#statisticscompany").select2('val'),$("#statisticshouse").select2('val'),event.params.data.id)
          });

        })
    // 初始化预警信息
    initWarningInfo();


})

function initPieStatus(data) {
  var dom = document.getElementById("pieStatus");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  app.title = '';

  option = {
    backgroundColor: '#fff',
    title: {
      text: '',
      subtext: '',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'horizontal',
      x: 'center',
      y: 'bottom',
      data: ['已租', '未租', '自用']
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: false },
        dataView: { show: false, readOnly: false },
        magicType: {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'left',
              max: 1548
            }
          }
        },
        restore: { show: false },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    series: [
      {
        name: '',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: data.yizu, name: '已租' },
          { value: data.weizu, name: '未租' },
          { value: data.ziyong, name: '自用' }
        ]
      }
    ]
  };

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}

function initPieChart(data) {
  var dom = document.getElementById("pieChart");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  app.title = '';

  option = {
    backgroundColor: '#fff',
    title: {
      text: '',
      subtext: '',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'horizontal',
      x: 'center',
      y: 'bottom',
      data: ['自用', '工业用房', '商业用房', '办公楼']
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: false, readOnly: false },
        magicType: {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'left',
              max: 1548
            }
          }
        },
        restore: { show: false },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '70%'],
        data: data
      }
    ]
  };
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}

//柱状图暂时没有数据
function initBarChart(data) {
  var dom = document.getElementById("barChart");
  var myChart = echarts.init(dom);
  var app = {};



  var xAxis= [];
  var chuzulv = [];
  var pingjundanjia = [];

  for (var item in data){
    xAxis.push(data[item].name);
    chuzulv.push(data[item].chuzulv*100);
    pingjundanjia.push(data[item].pingjundanjia)
  }

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
      orient: 'horizontal',
      x: 'center',
      y: 'bottom',
      data: ['出租率', '单价']
    },
    xAxis: [
      {
        type: 'category',
        //data: ['北京城建集团投资有限公司', '城建置业', '3公司', '4公司', '5公司', '6公司', '7公司', '8公司', '9公司', '10公司', '11公司', '12公司']
        data:xAxis,
        axisLabel:{
          show:false,
        interval:'auto',
        rotate:45,
        margin:2,
        textStyle:{
          color:"#222"
        }
      },
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
    series: [
      {
        name: '出租率',
        type: 'bar',
        itemStyle: {
          normal: { color: '#0099FF' }
        },

        data:chuzulv
      },
      {
        name: '单价',
        type: 'line',
        yAxisIndex: 1,
        itemStyle: {
          normal: { color: '#C06410' }
        },

        data:pingjundanjia
      }
    ]
  };

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}


//资产盘点/现有资产

function getExistingAssets(userid) {

  Application.Util.ajaxConstruct(Application.serverHost, 'POST', { userid: Application.userid }, 'text/xml;charset=UTF-8', function (data) {
       
      $('.landcount').text(data.dcCount);
      $('.housecount').text(data.fcCount);
      $('.departmentcount').text(data.fyCount);
    }, function name(params) {
      console.log('error');
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "xianyouzichan"
    }
  );


}


//固定资产改变情况
function getExistingChanges(userid) {

  Application.Util.ajaxConstruct(Application.serverHost,'POST',{ userid: Application.userid },'text/xml;charset=UTF-8',function (data) {
      $('.landcountchange').text(data.dcCount + '块');
      $('.housecountchange').text(data.fcCount + '座');
      $('.departmentcountchange').text(data.fyCount + '套');
    },function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "benyuexinzeng"
    }
  )

}

//资产盘点环状图
function getOrgAndLocation(userid) {

  Application.Util.ajaxConstruct(Application.serverHost,'POST',{ userid: Application.userid },'text/xml;charset=UTF-8',function (data) {
      OrgAndLocationOptions(data);
    },function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getPk_orgAndLocation"
    }
  )


}

//生成按公司下拉列表
function OrgAndLocationOptions(data) {
  var companyarr = [{ id: 'test', text: '全部' }]
  var locationObj = {};
  for (var i = 0, len = data.length; i < len; i++) {
    companyarr.push({ id: data[i].firstvalue, text: data[i].secondvalue, location: data[i].location });
    locationObj[data[i].firstvalue] = data[i].location;
  }

  $('#propertyCompanySelect').select2(
    {
      data: companyarr
    }
  ).on('select2:select', function (e) {

    getCircleGraphData(e.params.data.id, "");
    var areaArr = [];
    areaArr.push({ id: 'test', text: '全部' });
    for (var i = 0, len = locationObj[e.params.data.id].length; i < len; i++) {
      areaArr.push({ id:  locationObj[e.params.data.id][i].firstvalue, text: locationObj[e.params.data.id][i].secondvalue })
    }
    $('#propertyAreaSelect').empty();
    $('#propertyAreaSelect').select2({
      data: areaArr
    }).on('select2:select', function (event) {
      getCircleGraphData(e.params.data.id, event.params.data.text);
    });

  });

  $('#propertyAreaSelect').select2({
    data: [{ id: 'test', text: "全部" }]
  })

  getCircleGraphData('', '');

}

function getCircleGraphData(company, area) {
  if(company =='test'){
    company = "";
  }

  Application.Util.ajaxConstruct(Application.serverHost,'POST',{ 'gongsi': company, 'location': area, 'userid': Application.userid },'text/xml;charset=UTF-8',function (data) {
      var pieData = [];
      for (var i = 0, len = data.length; i < len; i++) {
        pieData.push({ name: data[i].fristvalue, value: data[i].secondvalue });
      }

      initPieChart(pieData);
    },function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "zichanpandianhuanzhuangtu"
    }
  )


}

//经营状况,出租率

function getManagementSituation() {
  Application.Util.ajaxConstruct(Application.serverHost,'POST',{ userid: Application.userid },'text/xml;charset=UTF-8',function (data) {
      getCompanyAndHouse(data);
      receivablesAndstatistics(data);
    },function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getPk_orgAndfcname"
    }
  )

}



function getCompanyAndHouse(data) {
  var companyarr = [{ id: 'test', text: '全部' ,fangchan:[{id:'test',text:"全部"}]}]
  var locationObj = {};
  for (var i = 0, len = data.length; i < len; i++) {
    companyarr.push({ id: data[i].firstvalue, text: data[i].secondvalue, location: data[i].fangchan });
    locationObj[data[i].firstvalue] = data[i].fangchan;
  }

  $('#managementsituationcompanyselect').select2(
    {
      data: companyarr
    }
  ).on('select2:select', function (e) {

    getPieGraphData(e.params.data.id, "");
    var areaArr = [];
    areaArr.push({ id: 'test', text: '全部' });
    for (var i = 0, len = locationObj[e.params.data.id].length; i < len; i++) {
      areaArr.push({ id: locationObj[e.params.data.id][i].firstvalue, text: locationObj[e.params.data.id][i].secondvalue })
    }
    $('#managementsituationhouseselect').empty();
    $('#managementsituationhouseselect').select2({
      data: areaArr
    }).on('select2:select', function (event) {
      getPieGraphData(e.params.data.id, event.params.data.id);
    });

  });


  $('#managementsituationhouseselect').select2({
    data: [{ id: 'test', text: "全部" }]
  })

  //初始化
  getPieGraphData("", "");

}


function getPieGraphData(company, house) {
  if(company == 'test'){
    company = "";
  }

  if(house == 'test'){
    house = "";
  }
  Application.Util.ajaxConstruct(Application.serverHost,'POST',{ 'gongsi': company, 'fczbh': house, 'userid': Application.userid },'text/xml;charset=UTF-8',function (data) {
      initPieStatus(data);

    },function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "ChuZuLv"
    }
  )
}
//应收款统计
function receivablesAndstatistics(data) {
  var companyarr = [{ id: 'test', text: '全部' }]
  var locationObj = {};
  for (var i = 0, len = data.length; i < len; i++) {
    companyarr.push({ id: data[i].firstvalue, text: data[i].secondvalue, location: data[i].fangchan });
    locationObj[data[i].firstvalue] = data[i].fangchan;
  }

  $('#statisticscompany').select2(
    {
      data: companyarr
    }
  ).on('select2:select', function (e) {

    //getPieGraphData(e.params.data.id, "");
    var areaArr = [];
    areaArr.push({ id: 'test', text: '全部' });

    getStatisticData(e.params.data.id,$('#statisticshouse').select2('val'),$('#statisticsretail').select2('val'))

    for (var i = 0, len = locationObj[e.params.data.id].length; i < len; i++) {

      areaArr.push({ id: locationObj[e.params.data.id][i].firstvalue, text: locationObj[e.params.data.id][i].secondvalue })
    }
    $('#statisticshouse').empty();
    $('#statisticshouse').select2({
      data: areaArr
    }).on('select2:select', function (event) {
      //getPieGraphData(e.params.data.id, event.params.data.text);
      getStatisticData($('#statisticscompany').select2('val'),event.params.data.id,$('#statisticsretail').select2('val'))
    });

  });

  $('#statisticshouse').select2({
    data: [{ id: 'test', text: "全部" }]
  })
  //初始化
  getStatisticData("", "","");
}

//统计数据
function getStatisticData(company, house, retail) {
  if(company === '全部') {
    company = '';
  }
  if(house === '全部') {
    house = '';
  }
  if(retail === '全部') {
    retail = '';
  }

  if(company =='test'){
    company = "";
  }
  if(house =='test'){
    house = "";
  }
  if(retail =='test'){
    retail = "";
  }

  Application.Util.ajaxConstruct(Application.serverHost,'POST',{ 'yetai': retail, 'userid': Application.userid, 'fangchan': house, 'gongsi': company },'text/xml;charset=UTF-8',function (data) {

          //data = JSON.parse(data);
          //console.log(data)
            //统计数据
          $('#thisMonthReceivable').text(data[0].benyueyingshou+'元');
          $("#thisMonthReceived").text(data[0].shangyueshishou+'元');
          $('#thisMonthRatio').text(data[0].benyuewanchengbili+'元');

          $('#lastMonthReceivable').text(data[0].shangyueyingshou+'元');
          $('#lastMonthReceived').text(data[0].shangyueshishou+'元');
          $('#lastMonthRatio').text(data[0].shangyuewanchengbili+'元');



    },function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "yingshoukuan"
    }
  )


}
//区域业态查询
function getLocationAndYetai(userid) {

  Application.Util.ajaxConstruct(Application.serverHost,'POST',{userid:userid},'text/xml;charset=UTF-8',function (data) {
      getRegionAndRetail(data);

    },function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getLocationAndYetai"
    }
  )

}




function getRegionAndRetail(data) {
  var regionarr = [{ id: 'test', text: '全部' }]
  var retailObj = {};
  var locationObj = {};
  for (var i = 0, len = data.length; i < len; i++) {
    regionarr.push({ id: data[i].firstvalue, text: data[i].secondvalue, retail: data[i].yetai });

  }

  $('#managementsituationregionselect').select2(
    {
      data: regionarr
    }
  )

    .on('select2:select', function (e) {

      getBarData(e.params.data.text, "");



      if (e.params.data.retail) {
        var retailArr = [];
        retailArr.push({ id: 'test', text: '全部' });
        for (var i = 0, len = e.params.data.retail.length; i < len; i++) {
          retailArr.push({ id: e.params.data.retail[i].firstvalue, text: e.params.data.retail[i].secondvalue })
        }
        $('#managementsituationretailselect').empty();
        $('#managementsituationretailselect').select2({
          data: retailArr
        }).on('select2:select', function (event) {
          getBarData(e.params.data.text, event.params.data.id);
        });
      }

      // else {
      //   //
      //   initOfRetail(function (data) {
      //     var retails = [];
      //     retails.push({ id: "", text: "全部" });
      //     for (var i = 0, len = data.length; i < len; i++) {
      //       retails.push({ id: data[i].fristvalue, text: data[i].secondvalue });
      //     }
      //     $('#managementsituationretailselect').empty();
      //     $('#managementsituationretailselect').select2({
      //       data: retails
      //     }).on('select2:select', function (event) {
      //       getBarData(e.params.data.text, event.params.data.text);
      //     });
      //
      //   })
      // }


    });

  $('#managementsituationretailselect').select2({
    data: [{ id: 'test', text: "全部" }]
  })
  //初始化
  getBarData("", "");

}

//柱状图
function getBarData(location, retail) {
  if (location == "全部") {
    location = "";
  }
  if(retail == 'test'){
    retail = "";
  }

  Application.Util.ajaxConstruct(Application.serverHost,'POST',{ 'location': location, 'yetai': retail, 'userid': Application.userid },'text/xml;charset=UTF-8',function (data) {
      initBarChart(data);

    },function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "ZhuZhuangTu"
    }
  )
}


/***
 * 查询业态
 */
function initOfRetail(fun) {
  Application.Util.ajaxConstruct(Application.serverHost,'POST',{'userid': Application.userid },'text/xml;charset=UTF-8',function (data) {
      fun(data);

    },function name(params) {
      console.log('error')
    },
    {
      "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
      "xmlnsName": "jin",
      "methodName": "getYeTaiByCurrentUser"
    }
  )

}


function setParam(path, param, xmlns, methodName) {
  return {
    "url": '192.168.3.20',
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

function initWarningInfo() {

    Application.Util.ajaxConstruct(Application.serverHost,'POST',{ 'userid': Application.userid },'text/xml;charset=UTF-8',function (data) {
          var ul = document.getElementById("information");
          $("#information").empty();
          for (var i = 0, len = data.length; i < len; i++) {
              var li = document.createElement("li");
              var a = document.createElement('a');
              a.href = 'command://' + encodeURIComponent("CONTRACT_LINK_QUEEY")+"&"+encodeURIComponent(data[i].htpk);
              a.appendChild(document.createTextNode(data[i].message));
              // a.setAttribute("onclick", function () {
              //     alert(waringData.id);
              // });
              li.appendChild(a);
              ul.appendChild(li);
          }

      },function name(params) {
          console.log('error')
      },
      {
          "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
          "xmlnsName": "jin",
          "methodName": "yujingxinxi"
      }
    )

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