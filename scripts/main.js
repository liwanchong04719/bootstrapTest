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
        interval:0,
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
        //data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 90, 100, 32.6, 20.0, 6.4, 3.3]
        data:chuzulv
      },
      {
        name: '单价',
        type: 'line',
        yAxisIndex: 1,
        itemStyle: {
          normal: { color: '#C06410' }
        },
        //data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
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
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   {
  //     "url": "118.26.130.12",
  //     "port": '8080',
  //     "path": "/uapws/service/nc.itf.pims.web.JingYingZhuangKuang",
  //     "data": JSON.stringify({ userid: userid }),
  //     "ajaxoptions": {
  //       "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //       "xmlnsName": "jin",
  //       "methodName": "benyuexinzeng"
  //     }
  //   },
  //   function (data) {
  //      var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex + 12, endindex)
  //     data = JSON.parse(data);
  //     $('.landcountchange').text(data.dcCount + '块');
  //     $('.housecountchange').text(data.fcCount + '座');
  //     $('.departmentcountchange').text(data.fyCount + '套');
  //   })


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

  //  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //     {
  //       "url": "118.26.130.12",
  //       "port": '8080',
  //       "path": "/uapws/service/nc.itf.pims.web.JingYingZhuangKuang",
  //       "data": JSON.stringify({userid:userid}),
  //       "ajaxoptions": {
  //         "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //         "xmlnsName": "jin",
  //         "methodName": "getPk_orgAndLocation"
  //       }
  //     },
  //     function (data) {
  //       data = JSON.parse(data);
  //       console.log(data)
  // OrgAndLocationOptions(data)
  //
  // })
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



  //
  // data = [{ "firstvalue": "0001A110000000000MM6", "location": ['朝阳', '海淀', '东城', '西城'], "secondvalue": "董事会秘书部" }, { "firstvalue": "0001A110000000000MMX", "location": ['朝阳', '海淀', '东城', '西城'], "secondvalue": "审计稽查部（监事会办公室）" }, { "firstvalue": "0001A110000000000MLR", "location": ['朝阳', '海淀', '东城', '西城'], "secondvalue": "财务管理部" }, { "firstvalue": "0001A110000000000MMC", "location": [], "secondvalue": "工会" }, { "firstvalue": "0001A110000000000MMI", "location": [], "secondvalue": "纪检监察部" }, { "firstvalue": "0001A110000000000MMU", "location": [], "secondvalue": "人力资源部" }, { "firstvalue": "0001A110000000000MNC", "location": [], "secondvalue": "测试组织" }, { "firstvalue": "0001A110000000000MLL", "location": [], "secondvalue": "经营管理部" }, { "firstvalue": "0001A110000000000MM0", "location": [], "secondvalue": "第三监事会" }, { "firstvalue": "0001A110000000000MN6", "location": [], "secondvalue": "宣传部" }, { "firstvalue": "0001A110000000000ML3", "location": [], "secondvalue": "职能部门" }, { "firstvalue": "0001A110000000000MLO", "location": [], "secondvalue": "安全管理部" }, { "firstvalue": "0001A110000000000MM3", "location": [], "secondvalue": "第一监事会" }, { "firstvalue": "0001A110000000000MMO", "location": [], "secondvalue": "经理办公室" }, { "firstvalue": "0001A110000000000MLU", "location": [], "secondvalue": "党委工作部" }, { "firstvalue": "0001A110000000000MLX", "location": [], "secondvalue": "第二监事会" }, { "firstvalue": "0001A110000000000MML", "location": [], "secondvalue": "技术质量管理部" }, { "firstvalue": "0001A110000000000MLI", "location": [], "secondvalue": "生产管理部" }, { "firstvalue": "0001A110000000000MMF", "location": [], "secondvalue": "行政保卫部" }, { "firstvalue": "0001A110000000000MMR", "location": [], "secondvalue": "企业管理部" }, { "firstvalue": "0001A110000000000MN9", "location": [], "secondvalue": "资本运营部" }, { "firstvalue": "0001A110000000000MM9", "location": [], "secondvalue": "法律事务部" }, { "firstvalue": "0001A110000000000MN0", "location": [], "secondvalue": "市场营销部" }, { "firstvalue": "0001A110000000000MN3", "location": [], "secondvalue": "信访维稳办公室" }]
  // OrgAndLocationOptions(data)
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
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   {
  //     "url": "118.26.130.12",
  //     "port": '8080',
  //     "path": "/uapws/service/nc.itf.pims.web.JingYingZhuangKuang",
  //     "data": JSON.stringify({ 'gongsi': company, 'location': area, 'userid': '1001ZZ10000000018FJF' }),
  //     "ajaxoptions": {
  //       "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //       "xmlnsName": "jin",
  //       "methodName": "zichanpandianhuanzhuangtu"
  //     }
  //   },
  //   function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex + 12, endindex)
  //     data = JSON.parse(data);
  //     var pieData = [];
  //     for (var i = 0, len = data.length; i < len; i++) {
  //       pieData.push({ name: data[i].fristvalue, value: data[i].secondvalue });
  //     }
  //
  //     initPieChart(pieData);
  //   })


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



//环状图
// function getCircleGraph(userid) {
//   $.post("http://127.0.0.1:8088/" + new Date().getTime(),
//     {
//       "url": "118.26.130.12",
//       "port": '8080',
//       "path": "/uapws/service/nc.itf.pims.web.CheckProperty",
//       "data": JSON.stringify({ userid: userid }),
//       "ajaxoptions": {
//         "xmlns": 'xmlns:chec="http://web.pims.itf.nc/CheckProperty"',
//         "xmlnsName": "chec",
//         "methodName": "zichanpandianhuanzhuangtu"
//       }
//     },
//     function (data) {
//       data = JSON.parse(data);
//       console.log('-----:' + data);
//     })
// }

//经营状况,出租率

function getManagementSituation() {

  //  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //     {
  //       "url": "118.26.130.12",
  //       "port": '8080',
  //       "path": "/uapws/service/nc.itf.pims.web.JingYingZhuangKuang",
  //       "data": JSON.stringify({userid:userid}),
  //       "ajaxoptions": {
  //         "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //         "xmlnsName": "jin",
  //         "methodName": "getPk_orgAndfcname"
  //       }
  //     },
  //     function (data) {
  //       data = JSON.parse(data);
  //       console.log(data)
  // OrgAndLocationOptions(data)
  //  /   var fangchanand
  // })


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

  //
  //
  //
  // var data = [{ "fangchan": ['自用', '工业用房', '写字楼', '商业用房'], "firstvalue": "0001A110000000000MM6", "secondvalue": "董事会秘书部" }, { "fangchan": ['自用', '工业用房', '写字楼', '商业用房'], "firstvalue": "0001A110000000000MMX", "secondvalue": "审计稽查部（监事会办公室）" }, { "fangchan": ['自用', '工业用房', '写字楼', '商业用房'], "firstvalue": "0001A110000000000MLR", "secondvalue": "财务管理部" }, { "fangchan": [], "firstvalue": "0001A110000000000MMC", "secondvalue": "工会" }, { "fangchan": [], "firstvalue": "0001A110000000000MMI", "secondvalue": "纪检监察部" }, { "fangchan": [], "firstvalue": "0001A110000000000MMU", "secondvalue": "人力资源部" }, { "fangchan": [], "firstvalue": "0001A110000000000MNC", "secondvalue": "测试组织" }, { "fangchan": [{ "firstvalue": "1001C11000000001BKYU", "secondvalue": "为发" }], "firstvalue": "0001A110000000000MLL", "secondvalue": "经营管理部" }, { "fangchan": [], "firstvalue": "0001A110000000000MM0", "secondvalue": "第三监事会" }, { "fangchan": [], "firstvalue": "0001A110000000000MN6", "secondvalue": "宣传部" }, { "fangchan": [{ "firstvalue": "1001ZZ1000000001C5SY", "secondvalue": "11111111111" }, { "firstvalue": "1001ZZ1000000001C5SS", "secondvalue": "123123" }, { "firstvalue": "1001ZZ1000000001C5SQ", "secondvalue": "123" }, { "firstvalue": "1001ZZ1000000001EFLQ", "secondvalue": "tdzbh='丁测试'" }, { "firstvalue": "1001ZZ1000000001DG3E", "secondvalue": "测试项目房产1" }, { "firstvalue": "1001AA1000000001E1QJ", "secondvalue": "1" }, { "firstvalue": "1001ZZ1000000001FSZJ", "secondvalue": "xx" }, { "firstvalue": "1001ZZ1000000001C499", "secondvalue": "11111111111111" }, { "firstvalue": "1001ZZ1000000001BA5Y" }, { "firstvalue": "1001C110000000018TFW", "secondvalue": "111111111111111111111111111" }, { "firstvalue": "1001ZZ10000000018K6I", "secondvalue": "1231" }, { "firstvalue": "1001ZZ1000000001C9NZ" }, { "firstvalue": "1001ZZ10000000018RWF", "secondvalue": "45" }, { "firstvalue": "1001ZZ10000000018RW9", "secondvalue": "75878" }, { "firstvalue": "1001ZZ10000000018QCB", "secondvalue": "111" }, { "firstvalue": "1001ZZ10000000018IMO", "secondvalue": "6" }, { "firstvalue": "1001ZZ10000000018IMN", "secondvalue": "5" }, { "firstvalue": "1001ZZ10000000018IMM", "secondvalue": "4" }, { "firstvalue": "1001ZZ10000000018IML", "secondvalue": "3" }, { "firstvalue": "1001ZZ10000000018IMK", "secondvalue": "2" }, { "firstvalue": "1001ZZ10000000018IMJ", "secondvalue": "1" }], "firstvalue": "0001A110000000000ML3", "secondvalue": "职能部门" }, { "fangchan": [], "firstvalue": "0001A110000000000MLO", "secondvalue": "安全管理部" }, { "fangchan": [], "firstvalue": "0001A110000000000MM3", "secondvalue": "第一监事会" }, { "fangchan": [], "firstvalue": "0001A110000000000MMO", "secondvalue": "经理办公室" }, { "fangchan": [], "firstvalue": "0001A110000000000MLU", "secondvalue": "党委工作部" }, { "fangchan": [], "firstvalue": "0001A110000000000MLX", "secondvalue": "第二监事会" }, { "fangchan": [], "firstvalue": "0001A110000000000MML", "secondvalue": "技术质量管理部" }, { "fangchan": [{ "firstvalue": "1001AA1000000001FVAO", "secondvalue": "rr" }, { "firstvalue": "1001AA1000000001FUII", "secondvalue": "11" }], "firstvalue": "0001A110000000000MLI", "secondvalue": "生产管理部" }, { "fangchan": [], "firstvalue": "0001A110000000000MMF", "secondvalue": "行政保卫部" }, { "fangchan": [], "firstvalue": "0001A110000000000MMR", "secondvalue": "企业管理部" }, { "fangchan": [], "firstvalue": "0001A110000000000MN9", "secondvalue": "资本运营部" }, { "fangchan": [], "firstvalue": "0001A110000000000MM9", "secondvalue": "法律事务部" }, { "fangchan": [], "firstvalue": "0001A110000000000MN0", "secondvalue": "市场营销部" }, { "fangchan": [], "firstvalue": "0001A110000000000MN3", "secondvalue": "信访维稳办公室" }]
  // getCompanyAndHouse(data);
  // receivablesAndstatistics(data);
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
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   {
  //     "url": "118.26.130.12",
  //     "port": '8080',
  //     "path": "/uapws/service/nc.itf.pims.web.JingYingZhuangKuang",
  //     "data": JSON.stringify({ 'gongsi': company, 'fczbh': house, 'userid': Application.userid }),
  //     "ajaxoptions": {
  //       "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //       "xmlnsName": "jin",
  //       "methodName": "ChuZuLv"
  //     }
  //   },
  //   function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex + 12, endindex)
  //
  //
  //     //data = JSON.parse(data);
  //     data = JSON.parse('{"yizu":"31","weizu": "69","ziyong": "0"}');
  //
  //     initPieStatus(data);
  //   })

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

  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   {
  //     "url": "118.26.130.12",
  //     "port": '8080',
  //     "path": "/uapws/service/nc.itf.pims.web.JingYingZhuangKuang",
  //     "data": JSON.stringify({ 'yetai': retail, 'userid': Application.userid, 'fangchan': house, 'gongsi': company }),
  //     "ajaxoptions": {
  //       "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //       "xmlnsName": "jin",
  //       "methodName": "yingshoukuan"
  //     }
  //   },
  //   function (data) {
  //     //data = JSON.parse(data);
  //     //console.log(data)
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = JSON.parse(data.substring(startindex + 12, endindex));
  if(company =='test'){
    company = "";
  }
  if(house =='test'){
    house = "";
  }
  if(retail =='test'){
    retail = "";
  }

  //
  //     //统计数据
  //     $('#thisMonthReceivable').text(data[0].benyueyingshou);
  //     $("#thisMonthReceived").text(data[0].shangyueshishou);
  //     $('#thisMonthRatio').text(data[0].benyuewanchengbili);
  //
  //     $('#lastMonthReceivable').text(data[0].shangyueyingshou);
  //     $('#lastMonthReceived').text(data[0].shangyueshishou);
  //     $('#lastMonthRatio').text(data[0].shangyuewanchengbili);
  //
  //   }, function name(params) {
  //     console.log('error')
  //   },
  //   {
  //     "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     "xmlnsName": "jin",
  //     "methodName": "yingshoukuan"
  //   }
  // );

  Application.Util.ajaxConstruct(Application.serverHost,'POST',{ 'yetai': retail, 'userid': Application.userid, 'fangchan': house, 'gongsi': company },'text/xml;charset=UTF-8',function (data) {

          //data = JSON.parse(data);
          //console.log(data)
            //统计数据
          $('#thisMonthReceivable').text(data[0].benyueyingshou);
          $("#thisMonthReceived").text(data[0].shangyueshishou);
          $('#thisMonthRatio').text(data[0].benyuewanchengbili);

          $('#lastMonthReceivable').text(data[0].shangyueyingshou);
          $('#lastMonthReceived').text(data[0].shangyueshishou);
          $('#lastMonthRatio').text(data[0].shangyuewanchengbili);



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
  //  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   {
  //     "url": "118.26.130.12",
  //     "port": '8080',
  //     "path": "/uapws/service/nc.itf.pims.web.JingYingZhuangKuang",
  //     "data": JSON.stringify({userid:userid}),
  //     "ajaxoptions": {
  //       "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //       "xmlnsName": "jin",
  //       "methodName": "getLocationAndYetai"
  //     }
  //   },
  //   function (data) {
  //     data = JSON.parse(data);
  //     console.log(data)

  //     etRegionAndRetail(data);
  // })

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


  // var data = [{ "firstvalue": 1, "secondvalue": "东城区", "yetai": [{ "firstvalue": "6", "secondvalue": "自用" }] }, { "firstvalue": 2, "secondvalue": "西城区", "yetai": [{ "firstvalue": "6", "secondvalue": "自用" }] }, { "firstvalue": 2, "secondvalue": "西城区", "yetai": [{ "firstvalue": "6", "secondvalue": "自用" }] }, { "firstvalue": 3, "secondvalue": "朝阳区", "yetai": [{ "firstvalue": "2", "secondvalue": "写字楼" }] }, { "firstvalue": 5, "secondvalue": "石景山区", "yetai": [{ "firstvalue": "4", "secondvalue": "住宅" }, { "firstvalue": "5", "secondvalue": "工业用房" }, { "firstvalue": "3", "secondvalue": "酒店" }] }, { "firstvalue": 7, "secondvalue": "门头沟区", "yetai": [] }, { "firstvalue": 13, "secondvalue": "怀柔区", "yetai": [] }];
  // getRegionAndRetail(data);
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
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   {
  //     "url": "118.26.130.12",
  //     "port": '8080',
  //     "path": "/uapws/service/nc.itf.pims.web.JingYingZhuangKuang",
  //     "data": JSON.stringify({ 'location': location, 'yetai': retail, 'userid': Application.userid }),
  //     "ajaxoptions": {
  //       "xmlns": 'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //       "xmlnsName": "jin",
  //       "methodName": "ZhuZhuangTu"
  //     }
  //   },
  //   function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex + 12, endindex)
  //     data = JSON.parse(data);
  //     initBarChart(data);
  //   })

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
  // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
  //   setParam(
  //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
  //     { 'userid': '1001ZZ10000000018FJF' },
  //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
  //     'getYeTaiByCurrentUser'
  //   ), function (data) {
  //     var startindex = data.indexOf('<ns1:return>');
  //     var endindex = data.indexOf('</ns1:return>');
  //     data = data.substring(startindex + 12, endindex)
  //     var retailData = JSON.parse(data);
  //     fun(retailData)
  //   });


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
    // $.post("http://127.0.0.1:8088/" + new Date().getTime(),
    //   setParam(
    //     '/uapws/service/nc.itf.pims.web.JingYingZhuangKuang',
    //     { 'userid': Application.userid },
    //     'xmlns:jin="http://web.pims.itf.nc/JingYingZhuangKuang"',
    //     'yujingxinxi'
    //   ), function (data) {
    //       var startindex = data.indexOf('<ns1:return>');
    //       var endindex = data.indexOf('</ns1:return>');
    //       data = data.substring(startindex + 12, endindex)
    //       var waringData = JSON.parse(data);
    //       var ul = document.getElementById("information");
    //       $("#information").empty();
    //       for (var i = 0, len = waringData.length; i < len; i++) {
    //           var li = document.createElement("li");
    //           var a = document.createElement('a');
    //
    //           a.appendChild(document.createTextNode(waringData[i].message));
    //           a.setAttribute("onclick", function () {
    //               alert(waringData.id);
    //           });
    //           li.appendChild(a);
    //           ul.appendChild(li);
    //       }
    //
    //   });
    Application.Util.ajaxConstruct(Application.serverHost,'POST',{ 'userid': Application.userid },'text/xml;charset=UTF-8',function (data) {
          var ul = document.getElementById("information");
          $("#information").empty();
          for (var i = 0, len = data.length; i < len; i++) {
              var li = document.createElement("li");
              var a = document.createElement('a');

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