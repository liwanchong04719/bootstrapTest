/**
 * Created by wangtun on 2016/11/17.
 */
$(function () {
  initPieChart();
  initBarChart();
  initPieStatus();
 // $('select[name="inverse-select"]').select2({dropdownCssClass: 'select-inverse-dropdown'});
})

function initPieStatus(){
  var dom = document.getElementById("pieStatus");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  app.title = '';

  option = {
    backgroundColor:'#fff',
    title : {
      text: '',
      subtext: '',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient : 'horizontal',
      x : 'center',
      y:'bottom',
      data:['已租','未租','自用']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: false},
        dataView : {show: false, readOnly: false},
        magicType : {
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
        restore : {show: false},
        saveAsImage : {show: true}
      }
    },
    calculable : true,
    series : [
      {
        name:'',
        type:'pie',
        radius : '55%',
        center: ['50%', '50%'],
        data:[
          {value:335, name:'已租'},
          {value:310, name:'未租'},
          {value:234, name:'自用'}
        ]
      }
    ]
  };

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}

function initPieChart(){
  var dom = document.getElementById("pieChart");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  app.title = '';

  option = {
    backgroundColor:'#fff',
    title : {
      text: '',
      subtext: '',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient : 'horizontal',
      x : 'center',
      y:'bottom',
      data:['自用','工业用房','商业用房','办公楼']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        dataView : {show: false, readOnly: false},
        magicType : {
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
        restore : {show: false},
        saveAsImage : {show: true}
      }
    },
    calculable : true,
    series : [
      {
        name:'访问来源',
        type:'pie',
        radius : ['50%', '70%'],
        data:[
          {value:335, name:'自用'},
          {value:310, name:'工业用房'},
          {value:234, name:'商业用房'},
          {value:135, name:'办公楼'}
        ]
      }
    ]
  };
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}


function  initBarChart() {
  var dom = document.getElementById("barChart");
  var myChart = echarts.init(dom);
  var app = {};
  option = {
    backgroundColor:'#fff',
    tooltip : {
      trigger: 'axis'
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: false},
        dataView : {show: false, readOnly: false},
        magicType: {show: false, type: ['line', 'bar']},
        restore : {show: false},
        saveAsImage : {show: true}
      }
    },
    calculable : true,
    legend: {
      orient : 'horizontal',
      x : 'center',
      y:'bottom',
      data:['出租率','单价']
    },
    xAxis : [
      {
        type : 'category',
        data : ['北京城建集团投资有限公司','城建置业','3公司','4公司','5公司','6公司','7公司','8公司','9公司','10公司','11公司','12公司']
      }
    ],
    yAxis : [
      {
        type : 'value',
        name : '100%',
        axisLabel : {
          formatter: '{value}'
        }
      },
      {
        type : 'value',
        name : '单价',
        axisLabel : {
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
        data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 90, 100, 32.6, 20.0, 6.4, 3.3]
      },
      {
        name:'单价',
        type:'line',
        yAxisIndex: 1,
        itemStyle:{
          normal:{color:'#2EC7C9'}
        },
        data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}