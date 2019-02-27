$ui.render({
  props: {
    title: ""
  },
  views: [
    {
      type: "text",
      props: {
        id: "penzi",
        placeholder:"点击刷新开喷吧"
      },
      layout: function(make, view) {
         make.top.left.right.inset(10)
         make.bottom.inset(70)
      },
      events: {
        
      }
    },
    {
      type:"button",
      props: {
        id:"load",
        bgcolor:$color("tint"),
        title:"刷新"
      },
      layout: function(make, view) {
        make.bottom.inset(20)
        make.left.inset(30)
        make.width.equalTo(150)
      },
      events: {
        tapped(sender){
          load()
        }
      }
      },{
      type:"button",
      props: {
        id:"insert",
        bgcolor:$color("tint"),
        title:"上屏"
      },
      layout: function(make, view) {
        make.bottom.inset(20)
        make.right.inset(30)
        make.width.equalTo(150)
      },
      events: {
        tapped(sender){
          $keyboard.insert($("penzi").text)
          $delay(0.3,function(){
            $keyboard.insert("\n")
          })
        }
      }
    }
  ]
});

function load(){
  $http.get("https://nmsl.shadiao.app/").then(function(resp){
      $("penzi").text = resp.data
      
  })

//  $http.get({
//    url:"https://nmsl.shadiao.app/",
//    handler:function(resp){
//      $("penzi").text = resp.data
//    }
//  })
//  
}
