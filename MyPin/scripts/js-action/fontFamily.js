$app.strings = {
  "en": {
    "copy": "Copy",
    "copied": " Copied"
  },
  "zh-Hans": {
    "copy": "复制",
    "copied": " 已复制"
  }
}

var TEMPLATE = [{
    type: "label",
    props: {
      id: "font",
      font: $font(13),
      textColor: $color("#AAAAAA"),
      align: $align.center
    },
    layout: function(make) {
      make.height.equalTo(15)
      make.left.right.inset(15)
      make.bottom.inset(5)
    }
  },
  {
    type: "label",
    props: {
      id: "input",
      align: $align.center
    },
    layout: function(make, view) {
      var pre = view.prev
      make.bottom.equalTo(pre.top)
      make.top.inset(5)
      make.left.right.inset(15)
    }
  }
]

function renderData(text) {
  var familyNames = $objc("UIFont").invoke("familyNames").rawValue().sort()
  var data = []
  for (var family of familyNames) {
    var fontNames = $objc("UIFont").invoke("fontNamesForFamilyName", family).rawValue()
    var rows = []
    for (var font of fontNames) {
      rows.push({
        font: {
          text: font
        },
        input: {
          text: text || "Hello World",
          font: $font(font, 20)
        }
      })
    }
    data.push({
      title: family,
      rows: rows
    })
  }
  $("list").data = data
}

function show(){
  $ui.push({
    props: {
      title: "Font Family"
    },
    views: [{
      type:"text",
      props:{
        id:"testFont",
        placeholder:"点击输入测试字体",

        font:$font(13),
        
              borderWidth: 0.4,
              borderColor: $rgba(100, 100, 100, 0.25),
              bgcolor: $rgba(200, 200, 200, 0.25),
              
              radius: 5,
              scrollEnabled: false,
              lines: 1,
//              insets: $insets(4, 1, 0, 0),
              align: $align.center,
              
      },
      layout: function(make, view) {
        make.top.inset(5)
        make.left.right.inset(0)
        make.height.equalTo(30)
      },
      events: {
        didChange(sender){
          renderData(sender.text)
        }
      }
    },{
      type: "list",
      props: {
        template: TEMPLATE,
        rowHeight: 70,
        separatorHidden: true,
        actions: [{
          title: $l10n("copy"),
          handler: function(view, indexPath) {
            var font = view.object(indexPath).font.text
            $clipboard.text = font
            $ui.toast(font + $l10n("copied"))
          }
        }]
      },
      layout: function(make, view) {
        make.left.right.bottom.inset(0)
        make.top.equalTo($("testFont").bottom).offset(5)
      },
      events: {
        didSelect: function(view, indexPath) {
          $cache.set("fontType",view.object(indexPath).font.text)
          $ui.toast(view.object(indexPath).font.text+" 已设置",1)
          $ui.pop()
          $device.taptic(2);
          $app.openURL("jsbox://run?name=MyPin")
        }
      }
    }]
  })
  
}

function run(){
  show()
  renderData()
}


module.exports={
  run:run
}
