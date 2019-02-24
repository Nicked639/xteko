var dataManager = require("./data-manager");
var fontFamily = require("./js-action/fontFamily");
var mHandlers = {};
var fontType = $cache.get("fontType") || "Courier";
var fontSize = $cache.get("fontSize") || 13;
var actionNum = $cache.get("actionNum") || 7;
var SETTINGS = {
  SEARCH_ENGINE: 0,
  DEFAULT_CLIPBOARD: 1,
  CLEAR_CLIPBOARD: 2
};

function normalList(title, func) {
  return {
    type: "view",
    layout: $layout.fill,
    events: {
      tapped: function(sender) {
        func();
      }
    },
    views: [
      {
        type: "label",
        props: {
          text: title,
          align: $align.left,
          font: $font(".SFUIText", 15)
        },
        layout: function(make, view) {
          make.centerY.equalTo(view.super);
          make.left.equalTo(15);
        }
      }
    ]
  };
}

function fontList(title, indi, func) {
  return {
    type: "view",
    layout: $layout.fill,
    events: {
      tapped: function(sender) {
        func();
      }
    },
    views: [
      {
        type: "label",
        props: {
          text: title,
          align: $align.left,
          font: $font(".SFUIText", 15)
        },
        layout: function(make, view) {
          make.centerY.equalTo(view.super);
          make.left.equalTo(15);
        }
      },
      {
        type: "label",
        props: {
          id: title,
          textColor: $color("#A8A8A8"),
          align: $align.right,
          font: $font(".SFUIText", 15),
          text: indi,
          textColor:$color("tint")
        },
        layout: function(make, view) {
          make.centerY.equalTo(view.super);
          make.right.inset(35);
        }
      },
      {
        type: "button",
        props: {
          src: "assets/next.png"
        },
        layout: function(make, view) {
          make.centerY.equalTo(view.super);
          make.right.inset(10);
          make.size.equalTo($size(20, 20));
        },
        events: {
          tapped: function(sender) {
            func();
          }
        }
      }
    ]
  };
}

function stepList(title, indi, cache) {
  return {
    type: "view",
    layout: $layout.fill,
    events: {
      //            tapped: function (sender) {
      //                func()
      //            }
    },
    views: [
      {
        type: "label",
        props: {
          text: title,
          align: $align.left,
          font: $font(".SFUIText", 15)
        },
        layout: function(make, view) {
          make.centerY.equalTo(view.super);
          make.left.equalTo(15);
        }
      },
      {
        type: "stepper",
        props: {
          id: title,
          value: indi,
          min: 1
        },
        layout: function(make, view) {
          make.centerY.equalTo(view.super);
          make.right.inset(15);
        },
        events: {
          changed: function(sender) {
            sender.next.text = sender.value;
            $cache.set(cache, sender.value);
          }
        }
      },
      {
        type: "label",
        props: {
          textColor: $color("#A8A8A8"),
          align: $align.right,
          font: $font(".SFUIText", 15),
          text: indi.toString(),
          textColor: $color("tint")
        },
        layout: function(make, view) {
          make.centerY.equalTo(view.super);
          make.right.equalTo($(title).left).offset(-5);
        }
      }
    ]
  };
}

function setFontType() {
  fontFamily.run();
}

const beauty = [
  fontList("字体", fontType, setFontType),
  stepList("字号", fontSize, "fontSize")
];

function show(handlers) {
  mHandlers = handlers;
  $ui.push({
    props: { title: "设置" },
    views: [
      {
        type: "list",
        props: {
          data: [
            {
              "title": "通用",
              "rows": [
                normalList("搜索引擎", setEngine),
                normalList("默认剪贴板", setMode),
                stepList("动作个数", actionNum, "actionNum")
              ]
            },
            {
              "title": "美观",
              "rows": beauty
            },
            {
              "title": "其他",
              "rows": [normalList("清空剪贴板", clearClipboard)]
            }
          ],

          footer: {
            type: "label",
            props: {
              height: 50,
              text: "Modified By Nicked",
              id: "foot",
              textColor: $color("#A8A8A8"),
              align: $align.center,
              font: $font(".SFUIText", 12)
            }
          }
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
                  clearClipboard();
                  break;
              }
            }
          }
        }
      }
    ]
  });
}

function setEngine() {
  var engines = [
    {
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

  $ui
    .menu(
      engines.map(function(item) {
        return item.name;
      })
    )
    .then(function(selected) {
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
  $("clipboard-list").data = [];
}

function setMode() {
  $ui.menu({
    items: ["本地", "iCloud"],
    handler: function(title, idx) {
      if (idx == 0) {
        $cache.set("mode", "clip");
        $("tab").index = 0;
      } else {
        $cache.set("mode", "cloud");
        $("tab").index = 1;
      }
    },
    finished: function(cancelled) {}
  });
}
module.exports = {
  show: show
};
