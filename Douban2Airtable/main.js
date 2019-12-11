$widget.height = 300
var airtable = require('scripts/airtable');
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
  var keyword = $clipboard.text 
  $ui.alert({
    title: "在豆瓣中搜索",
    message: keyword,
    actions: [
      {
        title: "确定",
        disabled: false, // Optional
        handler: function() {
          let k = keyword
          doubanUI(k)
        }
      },
      {
        title: "输入",
        handler: async function() {
         let k = await $input.text()
         doubanUI(k)
        }
      }
    ]
  })
  
}

function doubanUI(keyword){
  
$ui.render({
    props: {
        title: keyword
    },
    views: [{
        type: "web",
        props: {
            url: "https://m.douban.com/search/?query=" + $text.URLEncode(keyword),
//            toolbar: 1
        },
        layout: $layout.fill,
        events: {
            didFinish: function (sender, navigation) {
                var webUrl = $("web").url.match(/\/subject\/\d+/)
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
                var doubanUrl = $("web").url
                  $ui.toast($l10n("LOAD"),10)
                    
                    if(!/\/(\d{5,8})\//g.test(doubanUrl)) wrong();
                    else postData(doubanUrl);
                
                
            }
        }
    }]
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
