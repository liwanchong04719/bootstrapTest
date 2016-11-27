/**
 * Created by wangtun on 2016/11/17.
 */
$(function () {
  //资产盘点
  getExistingAssets(Application.userid);
  getExistingChanges(Application.userid);
  initPieChart();
  initBarChart();
  initPieStatus();
  $('select[name="inverse-select"]').select2({ dropdownCssClass: 'select-inverse-dropdown' });
})

function initPieStatus() {
  var dom = document.getElementById("pieStatus");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  app.title = '饼状图';

  option = {
    backgroundColor: '#fff',
    title: {
      text: '出租率',
      subtext: '',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'left',
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
        name: '出租率',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
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
  app.title = '饼状图';

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
      orient: 'vertical',
      x: 'left',
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
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 90, 100, 32.6, 20.0, 6.4, 3.3]
      },
      {
        name: '单价',
        type: 'line',
        yAxisIndex: 1,
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
      "url": "192.168.3.20",
      "port": '8080',
      "path": "/uapws/service/nc.itf.pims.web.CheckProperty",
      "data": JSON.stringify({userid:userid}),
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
      "url": "192.168.3.20",
      "port": '8080',
      "path": "/uapws/service/nc.itf.pims.web.CheckProperty",
      "data": JSON.stringify({userid:userid}),
      "ajaxoptions": {
        "xmlns": 'xmlns:chec="http://web.pims.itf.nc/CheckProperty"',
        "xmlnsName": "chec",
        "methodName": "benyuexinzeng"
      }
    },
    function (data) {
      data = JSON.parse(data);
      $('.landcountchange').text(data.dcCount+'块');
      $('.housecountchange').text(data.fcCount+'座');
      $('.departmentcountchange').text(data.fyCount+'套');
     })

}