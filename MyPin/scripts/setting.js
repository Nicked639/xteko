var dataManager = require("./data-manager");
var fontFamily = require("./js-action/fontFamily")
var mHandlers = {};
var fontType = $cache.get("fontType")||"Courier"
var fontSize = $cache.get("fontSize")||"13"
var SETTINGS = {
  SEARCH_ENGINE: 0,
  DEFAULT_CLIPBOARD: 1,
  CLEAR_CLIPBOARD: 2,
}

function fontList(title,indi,func){
  return {
      type: "view",
      layout: $layout.fill,
      events: {
          tapped: function (sender) {
              func()
          }
      },
      views: [{
          type: "label",
          props: {
              text: title,
              align: $align.left,
              font: $font(".SFUIText", 15)
          },
          layout: function (make, view) {
              make.centerY.equalTo(view.super)
              make.left.equalTo(15)
          }
      }, {
          type: "label",
          props: {
              id: title,
              textColor: $color("#A8A8A8"),
              align: $align.right,
              font: $font(".SFUIText", 15),
              text: indi
          },
          layout: function (make, view) {
              make.centerY.equalTo(view.super)
              make.right.inset(35)
          }
      }, {
          type: "button",
          props: {
              src: "assets/next.png",
          },
          layout: function (make, view) {
              make.centerY.equalTo(view.super)
              make.right.inset(10)
              make.size.equalTo($size(20, 20))
          },
          events: {
              tapped: function (sender) {
                  func()
              }
          }
      }]
  }
}


function setFontType(){
  fontFamily.run()
}

function setFontSize(){
  $ui.menu(["9","10","11","12","13","14","15","16","17"]).then(function(selected) {
     let size = selected.title
      if (size.length > 0) {
        $device.taptic(2);
        $cache.set("fontSize",size)
        $("字号").text = size
        $app.openURL("jsbox://run?name=MyPin")
      }
    });
}

const beauty = [fontList("字体",fontType,setFontType),fontList("字号",fontSize,setFontSize)]

function show(handlers) {
  mHandlers = handlers;
  $ui.push({
    props: { title: "设置"},
    views: [{
      type: "list",
      props: {
        data: [{
          "title": "通用",
          "rows": ["搜索引擎", "默认剪贴板", ]
        }, {
          "title": "美观",
          "rows": beauty
        },{
          "title":"其他",
          "rows":["清空剪贴板"]
        }],
        footer: {
                            type: "label",
                            props: {
                                height: 50,
                                text: "Modified By Nicked",
                                id:"foot",
                                textColor: $color("#A8A8A8"),
                                align: $align.center,
                                font: $font(".SFUIText", 12)
                            }
                        },
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath) {
          if (indexPath.section == 0) {
            switch (indexPath.row) {
              case SETTINGS.SEARCH_ENGINE:
                setEngine();
                break;
              case SETTINGS.DEFAULT_CLIPBOARD:
                setMode();
                break;

            }
          } else if (indexPath.section == 2) {
            switch (indexPath.row) {
              case 0:
              clearClipboard()
              break;
            }
          }

        }
      }
    }]
  })
}

function setEngine() {

  var engines = [{
      "name": $l10n("AS_DEFAULT"),
      "pattern": "x-web-search://?"
    },
    {
      "name": $l10n("AS_GOOGLE"),
      "pattern": "https://www.google.com/#newwindow=1&q="
    },
    {
      "name": $l10n("AS_BING"),
      "pattern": "http://cn.bing.com/search?q="
    },
    {
      "name": $l10n("AS_BAIDU"),
      "pattern": "https://www.baidu.com/s?wd="
    }
  ];

  $ui.menu(engines.map(function(item) {
    return item.name;
  })).then(function(selected) {
    if (selected == undefined) {
      return;
    }
    dataManager.setSearchEngine(engines[selected.index].pattern);
  });
}

function clearClipboard() {
  $ui.menu([$l10n("CLEAR")]).then(function(selected) {
    if (selected.title.length > 0) {
      $device.taptic(2);
      $clipboard.clear();
      dataManager.clearTextItems(mode);
      var handler = mHandlers["clear"];
      if (handler) {
        handler();
      }
    }
  });
  $("clipboard-list").data = []
}

function setMode() {
  $ui.menu({
    items: ["本地", "iCloud"],
    handler: function(title, idx) {
      if (idx == 0) {
        $cache.set("mode", "clip")
        $("tab").index = 0
      } else {
        $cache.set("mode", "cloud")
        $("tab").index = 1
      }
    },
    finished: function(cancelled) {

    }
  })
}
module.exports = {
  show: show
}
