function mainUI(column, rowHeight, title) {
  $ui.render({
    props: {
      title: title,
      id: "main",
      bgcolor: $color("#232227"),
      //pageSheet:true
    },
    views: [
      textView(),
      matrixView(column, rowHeight),
      grdientView()
    ]
  });
}

function textView(){
  return{
  type: "label",
  props: {
    text: "2022 My Year in Books",
    textColor:$color("white"),
//    bgcolor:$color("#232227"),
    font:$font("AmericanTypewriter",20),
    align:$align.center
  },
  layout: function(make, view) {
   make.top.inset(15)
//   make.left.right.inset(30)
   make.centerX.equalTo(view.super)
//   make.size.equalTo($size(200,40))
 }
}
}

function grdientView(){
  return    {
      type: "gradient",
      props: {
        colors: [$color("clear"),$color("black"), $color("black")],
        locations: [0.0, 0.2,0.4,0.6,1.0],
        startPoint: $point(1, 0),
        endPoint: $point(1, 1)
      },
      layout: function(make, view) {
        make.top.equalTo($("book").bottom).offset(-100)
        make.left.right.equalTo(0)
        make.height.equalTo(400)
      }
    }
}
function matrixView(column, rowHeight) {
  //console.log(pushFlag);
  return {
    type: "matrix",
    props: {
      id: "book",
      itemHeight: rowHeight,
      columns: column,
      spacing: 5,
      square: false,
      bgcolor: $color("#232227"),
      template: [
        {
          type: "image",
          props: {
            radius: 5,
            contentMode: $contentMode.scaleToFit,
            id: "interface"
          },
          layout: $layout.fill
        },
        
        
      ]
    },
    layout: function (make, view) {
      make.left.right.bottom.inset(5);
      make.top.inset(50)
      
      // make.top.equalTo($("menu").bottom)
    },
    
    
  };
}

var t =`
`
var m = `https://img1.doubanio.com/view/subject/l/public/s6015770.jpg
https://img1.doubanio.com/view/subject/l/public/s34323288.jpg
https://img9.doubanio.com/view/subject/l/public/s27306564.jpg
https://dl.airtable.com/.attachments/f9495a97c0a232d081f802b2ef6d3d25/a35ea3b5/s28982109.jpg
https://img1.doubanio.com/view/subject/l/public/s28063947.jpg
https://dl.airtable.com/.attachments/47579df91edf692298e944c880acc0ef/717f5d32/s28050760.jpg
https://img2.doubanio.com/view/subject/s/public/s28979112.jpg
https://dl.airtable.com/.attachments/fc5eaacb89314a8108478b3d3a46fd54/3b60e48c/s29768067.jpg
https://dl.airtable.com/.attachments/00e22c38988a31e814ddc919c6d17f33/3e4c5031/s33513675.jpg
https://dl.airtable.com/.attachments/256ff5d68f9c56ed182a4201846d2ad7/042d9ad9/s33443563.jpg
https://dl.airtable.com/.attachments/d98e88bb81b4e36c66dcacf93c858a0c/806af1ed/s33654477.jpg
https://dl.airtable.com/.attachments/e477636153c0dba677865ff76d29ba03/f2ec9585/s33919415.jpg
https://dl.airtable.com/.attachments/688fca9cddeb016ca9af101c5ddbaf77/f45b5cc0/s27455328.jpg
http://tva1.sinaimg.cn/large/4434ebf1ly1h9lwos7gm4j21mt26faw5.jpg
https://dl.airtable.com/.attachments/9dc72649a27a33818ee3c8bee10d01fc/909b5bf7/s27251177.jpg
https://dl.airtable.com/.attachments/84941bb41fae81d458c1e406847e33eb/980ab2f4/s28118682.jpg
https://dl.airtable.com/.attachments/a3fa97ae268a0524c4b25cf7285a1420/a46a34ef/s30021278.jpg
https://dl.airtable.com/.attachments/a405202af1bae21d42dc2778f9d4138d/354a3cac/s28036829.jpg
https://dl.airtable.com/.attachments/f5886ee4ba82b34aa14e89a19b8e63aa/588b054d/s33683876.jpg
https://dl.airtable.com/.attachments/401e5d2f3c87e1ae866e7fa0f9430999/53d61ce2/s29946431.jpg
https://dl.airtable.com/.attachments/77bf64af5c9b728efa319b7943172499/6e3727b4/s28982404.jpg
https://dl.airtable.com/.attachments/f548e8310dd1087c01100d385648043b/0c4f3189/s27874357.jpg
https://dl.airtable.com/.attachments/c46c1dbc9fb56f69fb2f6890f5b8cc93/bb77d6bf/s5957771.jpg
https://dl.airtable.com/.attachments/a2341d89a582510ee0f339fccd8ba6c8/769b7e1e/s34001916.jpg
https://dl.airtable.com/.attachments/03fc6b326cc97441b8ca77b786c9e67b/e3079dd1/s33507060.jpg
https://dl.airtable.com/.attachments/ed7031d2ab2b90659699a4030a9f10d6/c0e13e57/s23596856.jpg
https://dl.airtable.com/.attachments/e546962a7918618567bf8f6df04c78c3/beea4ec2/s33882591.jpg
https://dl.airtable.com/.attachments/8f73f91f0802bfc6028e6d681556d05f/031ba9b3/s30015832.jpg
https://dl.airtable.com/.attachments/49f3c86f68b083e5a17bc0db7b3a2e7f/b7db74d5/s29481581.jpg
https://dl.airtable.com/.attachments/29a3a15590901049ef8f5c48e0a4711c/a5da0fba/s29762733.jpg
https://dl.airtable.com/.attachments/3947c75975a0e0fe4c4a5e7a80e8356c/d9e676b9/s28076595.jpg
https://dl.airtable.com/.attachments/905f5e8188766fe6f623c2395242ffc5/aaadbd63/s33707634.jpg
https://dl.airtable.com/.attachments/6abaeb0f27adde8d1fc7e2d6f31d23ff/a9a815e3/s29831183.jpg
https://dl.airtable.com/.attachments/f8d3f399074417002484e444b88a010b/020d8e8e/s3140807.jpg
https://dl.airtable.com/.attachments/c07353ac9e07c37169817c1a53b484f3/b0b7738c/s33935768.jpg
https://dl.airtable.com/.attachments/4e0e396fc71d7a28041b349a630dc394/d5b7a310/s33733475.jpg
https://dl.airtable.com/.attachments/d8e2c0e841052cb92d9516787b58899e/4ef3bf63/s33527339.jpg
https://dl.airtable.com/.attachments/5ab04d1cf012b08da8723fdceabbc956/ca93d54f/s6954727.jpg
https://dl.airtable.com/.attachments/c16e815342e1924c49319f8b8eefb937/f4819dfa/s33973825.jpg
https://dl.airtable.com/.attachments/ac8a1903e442e0dff32f15a0b6394458/27b33b3a/s6565108.jpg
https://dl.airtable.com/.attachments/78c42ba0261867581f83f9dde7756964/eb8b6c51/s33841811.jpg
https://dl.airtable.com/.attachments/14d477af9df933b95023a3158c2622c9/4a8561d4/s29820803.jpg
https://dl.airtable.com/.attachments/3ac2e516a01731cdaa78190c738605c7/1cbfc368/s33559441.jpg
https://dl.airtable.com/.attachments/0b4f08de134766b72b507923bd0736bd/449a1e0b/s27153700.jpg
https://dl.airtable.com/.attachments/9f00ffd155142ddff13e47737272165f/6fc37362/s33717284.jpg
https://dl.airtable.com/.attachments/47715929daee0fa0f7020c1fad1965bd/b066a19c/s33877828.jpg
https://dl.airtable.com/.attachments/0d8619ba94602405bc96d15ba48571a1/1bf69a38/s29900086.jpg
https://dl.airtable.com/.attachments/d6bfec0611b317b7515d7dceda157b65/b724dc51/s33712788.jpg
https://dl.airtable.com/.attachments/725e84747fc8387b0e4a3ce7d4cc9dff/e25af5fb/s33638812.jpg
https://dl.airtable.com/.attachments/696b9e78d51839b82574fe18575ef5b7/1a3dcc76/s33923794.jpg
https://dl.airtable.com/.attachments/4bc2d41fc4e456733eeae59d2306a21c/7bd01add/s33666435.jpg
https://dl.airtable.com/.attachments/53318e78fb8535b79d3409d83ffef9cf/5d70175c/s29406105.jpg
https://dl.airtable.com/.attachments/9a77ec9f4aa8d3e0dd6a192dc7f2f6a1/15ae1456/s29753387.jpg
https://dl.airtable.com/.attachments/9bf1f96d64dfc4b53f3fc76abfe08427/31b0c6c5/2021-11-1422.51.57.jpg
`
let a = t.split("\n")
let b = m.split("\n")
console.log(b)


mainUI(4,125,"Books")
let temp = []
for( let i = 0;i<b.length;i++){
temp = temp.concat({
  interface:{
    src:b[i]
  }
})
}
$("book").data = temp
