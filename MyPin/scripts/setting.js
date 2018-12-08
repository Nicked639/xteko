var dataManager = require("./data-manager");
var mHandlers = {};

var SETTINGS = {
  SEARCH_ENGINE: 0,
  DEFAULT_CLIPBOARD:1,
  CLEAR_CLIPBOARD: 2,
}

function show(handlers) {
  mHandlers = handlers;
  $ui.push({
    props: { title: $l10n("SETTINGS") },
    views: [
      {
        type: "list",
        props: {
          data: [
            {
              "title": " ",
              "rows": [$l10n("SEARCH_ENGINE"), $l10n("DEFAULT_CLIPBOARD"),$l10n("CLEAR_CLIPBOARD")]
            }
          ]
        },
        layout: $layout.fill,
        events: {
          didSelect: function(sender, indexPath) {
            switch (indexPath.row) {
            case SETTINGS.SEARCH_ENGINE:
              setEngine();
              break;
            case SETTINGS.DEFAULT_CLIPBOARD:
              setMode();
              break;
            case SETTINGS.CLEAR_CLIPBOARD:
              clearClipboard();
              break;
            }
          }
        }
      }
    ]
  })
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
  $("clipboard-list").data=[]
}

function setMode(){
  $ui.menu({
    items: ["本地", "iCloud"],
    handler: function(title, idx) {
      if(idx==0) {
        $cache.set("mode","clip")
        $("tab").index = 0
      }else {
        $cache.set("mode","cloud")
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
