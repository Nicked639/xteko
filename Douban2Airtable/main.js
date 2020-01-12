
var airtable = require('scripts/airtable');
airtable.get("Movies")
airtable.get("Books")
var scrollFlag = 0
if (!$cache.get("apiKey")) {
  $input.text({
    type: $kbType.default,
    placeholder: "Input Api Key",
    handler: function(text) {
      $cache.set("apiKey", text) 
      $ui.alert($l10n("START"))
    }
  })
  return
}else{
  if($app.env == $env.action){
      $ui.toast($l10n("LOAD"),10)
      let item = $context.linkItems[0]
      if(!/\/(\d{5,8})\?/g.test(item)) wrong();
      else postData(item);
    }else if($app.env == $env.safari){
      $ui.toast($l10n("LOAD"),10)
      let item = $safari.items
      if(!/\/(\d{5,8})\//g.test(item.baseURI)) wrong();
      else postData(item.baseURI);
    }else if($app.env == $env.siri){
      let item = $context.query.url
      if(!/(\d{5,8})/g.test(item)) $intents.finish($l10n("WRONG"))
      else postData(item);
  }else{
  var keyword = $clipboard.text
  let k = await $input.text({
    placeholder: keyword
  })
  if(!k) k = keyword
  doubanUI(k)
//  $delay(0.3, () => {
//      $ui.alert({
//        title: "在豆瓣中搜索",
//        message: keyword,
//        actions: [
//          {
//            title: "输入",
//            disabled: false, // Optional
//            handler: async function() {
//              let k = await $input.text()
//              $clipboard.text = k
//              doubanUI(k)
//            }
//          },
//          {
//            title: "确定",
//            handler: function() {
//             
//    
//             let k = keyword
//             doubanUI(k)
//            }
//          }
//        ]
//      })
//      
//  });
}
}

function doubanUI(keyword){
  $widget.height = 300
$ui.render({
    props: {
        title: keyword,
        
    },
    views: [{
        type: "web",
        props: {
            url: "https://m.douban.com/search/?query=" + $text.URLEncode(keyword),
            id:"douban",
//            toolbar: 1
        },
        layout: $layout.fill,
        events: {
            didFinish: function (sender, navigation) {
                var webUrl = $("douban").url.match(/\/subject\/\d+/)
//                alert($("douban").url)
                $("button").hidden = webUrl ? false : true
            }
        }
    }, {
        type: "button",
        props: {
            icon: $icon("061", $color("red"), $size(20, 20)),
            bgcolor: $color("clear"),
            hidden: true
        },
        layout: function (make, view) {
            make.right.inset(55)
            make.top.inset(15)
        },
        events: {
            tapped: function (sender) {
              $device.taptic(2)
                var doubanUrl = $("douban").url
                  $ui.toast($l10n("LOAD"),10)
                    
                    if(!/\/(\d{5,8})\//g.test(doubanUrl)) wrong();
                    else postData(doubanUrl);
                
                
            }
        }
    },
    createScrollButtonView()
    ]
});

}
function postData(url){
  var id = /\/(\d{5,8})\//g.exec(url)[1]
  console.info(id)
  if(/.*movie.*/.test(url)){            //获取 type
    data = airtable.postMovieData(url,id)
  } else{
//    $ui.menu({
//      items: ["有页码和装订","简略"],
//      handler: function(title, idx) {
//        if(idx==0) data = airtable.postBookData2(id)
//        else data = airtable.postBookData3(id)
//      }
//    });
    data = airtable.postBookData(url,id)
    
  }
  
}

function wrong(){
  $ui.toast("",.1)  
  $ui.error($l10n("WRONG"))
  return
}

function createScrollButtonView(){
  let views =  [{
      type: "button",
      props: {
        src:"assets/arrowUp.png",
        font: $font(34),
        bgcolor: $color("clear"),
        id: "scrollUp",
        hidden:true
      },
      layout: function(make,view){
        make.right.inset(9)
        make.height.equalTo(30)
        make.width.equalTo(30)
        make.bottom.inset(170)
      },
      events: {
        tapped: function(sender){
          if(scrollFlag >0){
            scrollFlag--;
            $cache.set("scrollFlag",scrollFlag)
                       let distance = scrollFlag*30
                       $("douban").scrollView.contentOffset = $point(0, distance);
          }else{
            $ui.error("已经到头",0.3)
          }
           
        },
      }
    },{
      type: "button",
      props: {
//        icon: $icon("24", $color("darkText"), $size(18, 18)),
        font: $font(34),
        src:"assets/arrowDown.png",
        bgcolor: $color("clear"),
        id: "scrollDown",
        hidden:true
      },
      layout: function(make,view){
        make.right.inset(9)
        make.height.equalTo(30) 
        make.width.equalTo(30)
        make.bottom.inset(105)
      },
      events: {
        tapped: function(sender){
           
           scrollFlag++;
            $cache.set("scrollFlag",scrollFlag)
           let distance = scrollFlag*30
           $("douban").scrollView.contentOffset = $point(0, distance);
           
        },
      }
    }]
    return {
      type:"view",
      props:{
        bgcolor:$color("clear")
      },
      layout: function(make,view){
        make.top.bottom.inset(30)
        make.width.equalTo(30)
        make.right.inset(0)
      },
      views:views
    }
}
