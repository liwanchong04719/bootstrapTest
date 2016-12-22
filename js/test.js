/**
 * Created by liwanchong on 2016/11/22.
 */
var obj = [
  {
    "attributes": "",
    "children": [
      {
        "attributes": "",
        "children": [
          {
            "attributes": "",
            "children": [
              {
                "attributes": "",
                "children": "",
                "iconCls": "",
                "id": "0001A11000000000P6WB",
                "parentId": "0001A11000000000DLLR",
                "text": "北京市园林古建工程有限公司"
              },
              {
                "attributes": "",
                "children": "",
                "iconCls": "",
                "id": "0001A11000000000PICA",
                "parentId": "0001A11000000000DLLR",
                "text": "北京市花木有限公司"
              },
              {
                "attributes": "",
                "children": "",
                "iconCls": "",
                "id": "0001A11000000000P6W8",
                "parentId": "0001A11000000000DLLR",
                "text": "北京市园林古建设计研究院有限公司"
              }
            ],
            "iconCls": "",
            "id": "0001A11000000000DLLR",
            "parentId": "0001A11000000000DLIL",
            "text": "北京园林绿化集团有限公司"
          },
          {
            "attributes": "",
            "children": "",
            "iconCls": "",
            "id": "0001A11000000000ECCK",
            "parentId": "0001A11000000000DLIL",
            "text": "北京城建房地产开发有限公司"
          },
          {
            "attributes": "",
            "children": [
              {
                "attributes": "",
                "children": "",
                "iconCls": "",
                "id": "0001A11000000000PSR5",
                "parentId": "0001A11000000000PSQZ",
                "text": "测试二级组织2"
              }
            ],
            "iconCls": "",
            "id": "0001A11000000000PSQZ",
            "parentId": "0001A11000000000DLIL",
            "text": "测试组织"
          },
          {
            "attributes": "",
            "children": "",
            "iconCls": "",
            "id": "0001A11000000000DLJF",
            "parentId": "0001A11000000000DLIL",
            "text": "北京城建五建设集团有限公司"
          },
          {
            "attributes": "",
            "children": "",
            "iconCls": "",
            "id": "0001A11000000000P78D",
            "parentId": "0001A11000000000DLIL",
            "text": "北京城建四建设工程有限责任公司"
          },
          {
            "attributes": "",
            "children": "",
            "iconCls": "",
            "id": "0001A11000000000DLIT",
            "parentId": "0001A11000000000DLIL",
            "text": "北京城建建设工程有限公司"
          },
          {
            "attributes": "",
            "children": "",
            "iconCls": "",
            "id": "0001A11000000000ECBZ",
            "parentId": "0001A11000000000DLIL",
            "text": "北京城建北苑大酒店有限公司"
          },
          {
            "attributes": "",
            "children": "",
            "iconCls": "",
            "id": "0001A11000000000DLJM",
            "parentId": "0001A11000000000DLIL",
            "text": "北京城建八建设发展有限责任公司"
          },
          {
            "attributes": "",
            "children": "",
            "iconCls": "",
            "id": "0001A11000000000DLJJ",
            "parentId": "0001A11000000000DLIL",
            "text": "北京城建七建设工程有限公司"
          },
          {
            "attributes": "",
            "children": "",
            "iconCls": "",
            "id": "0001A11000000000DLJC",
            "parentId": "0001A11000000000DLIL",
            "text": "北京城建二建设工程有限公司"
          },
          {
            "attributes": "",
            "children": "",
            "iconCls": "",
            "id": "0001A11000000000ECBW",
            "parentId": "0001A11000000000DLIL",
            "text": "北京城建集团总公司材料公司"
          },
          {
            "attributes": "",
            "children": "",
            "iconCls": "",
            "id": "0001A11000000000DLJQ",
            "parentId": "0001A11000000000DLIL",
            "text": "北京城建十六建设工程有限公司"
          },
          {
            "attributes": "",
            "children": "",
            "iconCls": "",
            "id": "0001A11000000000DLLV",
            "parentId": "0001A11000000000DLIL",
            "text": "北京城建置业有限公司"
          }
        ],
        "iconCls": "",
        "id": "0001A11000000000DLIL",
        "parentId": "0001A1100000000008V7",
        "text": "二级单位"
      }
    ],
    "iconCls": "",
    "id": "0001A1100000000008V7",
    "parentId": "0",
    "text": "北京城建集团有限责任公司"
  }
];
function test(data) {
  if(data.children) {
    data['nodes'] = data.children;
    delete data.children;
    return data;
  }

}
console.log(test(obj[0]));