/**
 * Created by wangtun on 2016/11/17.
 */
$(function () {
  $.fn.select2.defaults.set("theme", "bootstrap");
  //资产盘点
  //getExistingAssets(Application.userid);
  //getExistingChanges(Application.userid);
  //资产盘点环状图
  //公司、区域数据
  getOrgAndLocation(Application.userid);
  //getCircleGraph(Application.userid)



  initPieChart();
  initBarChart();
  initPieStatus();
  $("#propertyCompanySelect").select2({
    placeholder: "Select a state",
    allowClear: true
  })
})

function initPieStatus() {
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
          { value: 335, name: '已租' },
          { value: 310, name: '未租' },
          { value: 234, name: '自用' }
        ]
      }
    ]
  };

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}

function initPieChart() {
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
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        data: [
          { value: 335, name: '自用' },
          { value: 310, name: '工业用房' },
          { value: 234, name: '商业用房' },
          { value: 135, name: '办公楼' }
        ]
      }
    ]
  };
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}


function initBarChart() {
  var dom = document.getElementById("barChart");
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
      orient: 'horizontal',
      x: 'center',
      y: 'bottom',
      data: ['出租率', '单价']
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
    series: [
      {
        name: '出租率',
        type: 'bar',
        itemStyle: {
          normal: { color: '#0099FF' }
        },
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 90, 100, 32.6, 20.0, 6.4, 3.3]
      },
      {
        name: '单价',
        type: 'line',
        yAxisIndex: 1,
        itemStyle: {
          normal: { color: '#C06410' }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}


//资产盘点/现有资产

function getExistingAssets(userid) {
  //部署时需要替换
  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
    {
      "url": "118.26.130.12",
      "port": '8080',
      "path": "/uapws/service/nc.itf.pims.web.CheckProperty",
      "data": JSON.stringify({ userid: userid }),
      "ajaxoptions": {
        "xmlns": 'xmlns:chec="http://web.pims.itf.nc/CheckProperty"',
        "xmlnsName": "chec",
        "methodName": "xianyouzichan"
      }
    },
    function (data) {
      data = JSON.parse(data);
      $('.landcount').text(data.dcCount);
      $('.housecount').text(data.fcCount);
      $('.departmentcount').text(data.fyCount);
    })

}
//固定资产改变情况
function getExistingChanges(userid) {
  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
    {
      "url": "118.26.130.12",
      "port": '8080',
      "path": "/uapws/service/nc.itf.pims.web.CheckProperty",
      "data": JSON.stringify({ userid: userid }),
      "ajaxoptions": {
        "xmlns": 'xmlns:chec="http://web.pims.itf.nc/CheckProperty"',
        "xmlnsName": "chec",
        "methodName": "benyuexinzeng"
      }
    },
    function (data) {
      data = JSON.parse(data);
      $('.landcountchange').text(data.dcCount + '块');
      $('.housecountchange').text(data.fcCount + '座');
      $('.departmentcountchange').text(data.fyCount + '套');
    })

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

  // })
  data = [{ "firstvalue": "0001A110000000000MM6", "location": ['朝阳', '海淀', '东城', '西城'], "secondvalue": "董事会秘书部" }, { "firstvalue": "0001A110000000000MMX", "location": [], "secondvalue": "审计稽查部（监事会办公室）" }, { "firstvalue": "0001A110000000000MLR", "location": [], "secondvalue": "财务管理部" }, { "firstvalue": "0001A110000000000MMC", "location": [], "secondvalue": "工会" }, { "firstvalue": "0001A110000000000MMI", "location": [], "secondvalue": "纪检监察部" }, { "firstvalue": "0001A110000000000MMU", "location": [], "secondvalue": "人力资源部" }, { "firstvalue": "0001A110000000000MNC", "location": [], "secondvalue": "测试组织" }, { "firstvalue": "0001A110000000000MLL", "location": [], "secondvalue": "经营管理部" }, { "firstvalue": "0001A110000000000MM0", "location": [], "secondvalue": "第三监事会" }, { "firstvalue": "0001A110000000000MN6", "location": [], "secondvalue": "宣传部" }, { "firstvalue": "0001A110000000000ML3", "location": [], "secondvalue": "职能部门" }, { "firstvalue": "0001A110000000000MLO", "location": [], "secondvalue": "安全管理部" }, { "firstvalue": "0001A110000000000MM3", "location": [], "secondvalue": "第一监事会" }, { "firstvalue": "0001A110000000000MMO", "location": [], "secondvalue": "经理办公室" }, { "firstvalue": "0001A110000000000MLU", "location": [], "secondvalue": "党委工作部" }, { "firstvalue": "0001A110000000000MLX", "location": [], "secondvalue": "第二监事会" }, { "firstvalue": "0001A110000000000MML", "location": [], "secondvalue": "技术质量管理部" }, { "firstvalue": "0001A110000000000MLI", "location": [], "secondvalue": "生产管理部" }, { "firstvalue": "0001A110000000000MMF", "location": [], "secondvalue": "行政保卫部" }, { "firstvalue": "0001A110000000000MMR", "location": [], "secondvalue": "企业管理部" }, { "firstvalue": "0001A110000000000MN9", "location": [], "secondvalue": "资本运营部" }, { "firstvalue": "0001A110000000000MM9", "location": [], "secondvalue": "法律事务部" }, { "firstvalue": "0001A110000000000MN0", "location": [], "secondvalue": "市场营销部" }, { "firstvalue": "0001A110000000000MN3", "location": [], "secondvalue": "信访维稳办公室" }]
  OrgAndLocationOptions(data)
}

//生成按公司下拉列表
function OrgAndLocationOptions(data) {
  var companyarr = [{ id: '', text: '全部' }]
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

    var areaArr = [];
    areaArr.push({ id: '', text: '全部' });
    for (var i = 0, len = locationObj[e.params.data.id].length; i < len; i++) {
      areaArr.push({ id: 0, text: locationObj[e.params.data.id][i] })
    }
    $('#propertyAreaSelect').empty();
    $('#propertyAreaSelect').select2({
      data: areaArr
    })

  });


}

function generateRegionOptions() {

}

//生成区域
function createregionOptions(data) {
  var optionshtml = '';
  for (var i = 0, len = data.length; i < len; i++) {
    optionshtml += '<option value="' + i + '">' + data[i] + '</option>'
  }
  return optionshtml;
}

//环状图
function getCircleGraph(userid) {
  $.post("http://127.0.0.1:8088/" + new Date().getTime(),
    {
      "url": "118.26.130.12",
      "port": '8080',
      "path": "/uapws/service/nc.itf.pims.web.CheckProperty",
      "data": JSON.stringify({ userid: userid }),
      "ajaxoptions": {
        "xmlns": 'xmlns:chec="http://web.pims.itf.nc/CheckProperty"',
        "xmlnsName": "chec",
        "methodName": "zichanpandianhuanzhuangtu"
      }
    },
    function (data) {
      data = JSON.parse(data);
      console.log('-----:' + data);
    })
}
