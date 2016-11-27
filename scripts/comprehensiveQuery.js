/**
 * Created by liwanchong on 2016/11/20.
 */
var $table = $('#table');
var agencyTreeData = [
  {
    text: "置业有限公司",
  },
  {
    text: "北汽大酒店"
  },
  {
    text: "一公司"
  },
  {
    text: "二公司"
  },
  {
    text: "五公司"
  },
  {
    text: "八公司"
  },
  {
    text: "十六公司"
  }
];
var zoneTreeData = [
  {
    text: "海淀区",
  },
  {
    text: "朝阳区"
  },
  {
    text: "西城区"
  },
  {
    text: "东城区"
  },
  {
    text: "丰台区"
  },
  {
    text: "昌平区"
  },
  {
    text: "顺义区"
  },
  {
    text: "通州区"
  },
  {
    text: "大兴区"
  },
  {
    text: "房山区"
  },
  {
    text: "延庆区"
  }
];
var retailTreeData = [
  {
    text: "写字楼",
  },
  {
    text: "酒店"
  },
  {
    text: "商业用房"
  },
  {
    text: "工业厂房房"
  },
  {
    text: "住宅"
  },
  {
    text: "自用"
  }
];
var queryData = [];
var testParam =
{
  'location':'',
  'yetai':'',
  'userid':Application.userid,
  'gongsi':'',
  'dijiye':'',
  'xianshitiaoshu':'',
  'xmmc ':'',
  'fwsyqr ':'',
  'jzmj ':'',
  'zzdate ':'',
  'jzmjpx':'',
  'zzdatepx':''
}

$(function () {

  $('#treeOfZOne').treeview({ expandIcon: "glyphicon glyphicon-stop",
    levels: 1,
    showCheckbox: true,
    showBorder: false,
    color: "#428bca",
    backColor: "#f6f7fa",
    onNodeChecked:addQueryData,
    onNodeUnchecked: minusQueryData,
    data: agencyTreeData});

  $.post("http://127.0.0.1:8088/" + new Date().getTime(), {
    url: '192.168.6.4',
    // port: 8080,
    path: '/uapws/service/nc.itf.pims.web.ZongHeXinXi',
    data: JSON.stringify(testParam),
    ajaxoptions: {
      xmlns: 'xmlns:zon="http://web.pims.itf.nc/ZongHeXinXi"',
      xmlnsName: 'zon',
      methodName: 'getFcXinXi'
    }
  }, function (data) {
    console.log(data);
  });
//点击tab
  $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
    e.preventDefault();
    $(this).siblings('a.active').removeClass("active");
    $(this).addClass("active");
    var index = $(this).index();
    $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
    $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
  });
   //点击页数时获取页数的数据
  $table.on('page-change.bs.table', function (e, number, size) {
    getDataFromServer(number, size);
  });
  var options = $table.bootstrapTable('getOptions');
  getDataFromServer(options.pageNumber, options.pageSize);
  });
function addQueryData(event,node){
  queryData.push(node.text);
}
function minusQueryData(event, node) {

  return queryData.filter(function (item) {
    return item !== node.text;
    });
}
function positionFormatter(v,row) {
  return [
    '<div class="name">',
    '<a title="' + row.dlwz + '" href="../pages/map.html">'
    +row.dlwz,
    '<span class="glyphicon glyphicon-map-marker" style="text-align: right;"></span>',
    '</a>',
    '</div>'
  ].join('');
}
function handleFormatter(v,row) {
  return [
    '<div class="name">',
    '<a title="' + row.position + '" href="https://github.com/'+ '" target="_blank">',
     '查看附件',
    '</a>',
    '<span style="height:10px; width:1px; border-left:1px #16a085 solid"></span>',
    '<a title="' + row.position + '" href="https://github.com/'+ '" target="_blank">',
    '查看详情',
    '</a>',
    '</div>'
  ].join('');
}
function changeData(type) {
  switch (type) {
    case 1:
    $table.bootstrapTable('refresh',{
      url: '../json/data.json'
    });
      break;
    case 2:
      $table.bootstrapTable('refresh',{
        url: '../json/data1.json'
      });
      break;
    case 3:
      $table.bootstrapTable('refresh',{
        url: '../json/data2.json'
      });
      break;
    case 4:
      $table.bootstrapTable('refresh',{
        url: '../json/data3.json'
      });
      break;
  }

}
function treeCallback(event, data) {
  $table.bootstrapTable('refresh',{
    url: '../json/data.json'
  });
}
function changeTreeData(type) {
  switch (type) {
    case 1:
      $('#treeOfZOne').treeview({ expandIcon: "glyphicon glyphicon-stop",
        levels: 1,
        showBorder: false,
        showCheckbox: true,
        color: "#428bca",
        backColor: "#f6f7fa",
        data: agencyTreeData});
      $('#treeOfZOne').on('nodeSelected', treeCallback);
      break;
    case 2:
      $('#treeOfHouse').treeview({ expandIcon: "glyphicon glyphicon-stop",
        levels: 1,
        showBorder: false,
        showCheckbox: true,
        color: "#428bca",
        backColor: "#f6f7fa",
        data: zoneTreeData});
      $('#treeOfHouse').on('nodeSelected', treeCallback);
      break;
    case 3:
      $('#treeOfRetail').treeview({ expandIcon: "glyphicon glyphicon-stop",
        levels: 1,
        showCheckbox: true,
        showBorder: false,
        color: "#428bca",
        backColor: "#f6f7fa",
        data: retailTreeData});
      $('#treeOfRetail').on('nodeSelected', treeCallback);
      break;

  }
}
function queryDataFromTree() {
  console.log("dddd");
}
function queryParams(params) {
  console.log(params.pageNumber);
}

function getDataFromServer(pageNum, pageSize) {
  console.log(pageNum);
  console.log(pageSize);
}