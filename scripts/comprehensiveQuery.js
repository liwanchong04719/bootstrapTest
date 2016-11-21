/**
 * Created by liwanchong on 2016/11/20.
 */
var $table = $('#table');
var tree = [
  {
    text: "Parent 1",
    nodes: [
      {
        text: "Child 1",
        nodes: [
          {
            text: "Grandchild 1"
          },
          {
            text: "Grandchild 2"
          }
        ]
      },
      {
        text: "Child 2"
      }
    ]
  },
  {
    text: "Parent 2"
  },
  {
    text: "Parent 3"
  }
];
$(function () {
  $('#tree').treeview({ expandIcon: "glyphicon glyphicon-stop",
    levels: 1,
    data: tree});
  $('#tree').on('nodeSelected', treeCallback);
});
function positionFormatter(v,row) {
  return [
    '<div class="name">',
    '<a title="' + row.position + '" href="../pages/map.html'+ '" target="_blank">',
    +row.position,
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
      url: '../json/data1.json'
    });
      break;
    case 2:
      $table.bootstrapTable('refresh',{
        url: '../json/data.json'
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
    url: '../json/data4.json'
  });
}