var builder = require("./builder");
var dataManager = require("./data-manager");
var editor = require("./editor");
//var layoutUtility = require("./layout-utility");
var LIST_TYPE = { CLIPBOARD: 0, CLOUD:1,ACTION: 2 };
var listType = LIST_TYPE.CLIPBOARD;

var tabView = {
  type: "tab",
  props: {
    id:"tab",
    items: [$l10n("CLIPBOARD"),"iCloud",$l10n("ACTION")],
    index: mode=="clip"?0:1
  },
  layout: function(make, view) {
    make.centerX.equalTo(view.super);
    make.width.equalTo(view.super).multipliedBy(0.5);
    make.top.inset(8);
    make.height.equalTo(28);
  },
  events: {
    changed: function(sender) {
      if(sender.index==0) mode = "clip"
      else mode = "cloud"
      setListViewType(sender.index);
      dataManager.initData(mode)
    }
  }
};

var clipboardView = builder.createClipboardView();
var actionView = builder.createActionView();

var createButton = {
  type: "button",
  props: {
    //title: $l10n("CREATE")
    icon: $icon("104", $color("tint")),
    bgcolor: $color("clear")
  },
  layout: function(make, view) {
    make.size.equalTo($size(20, 20));
    make.top.left.inset(12);
  },
  events: {
    tapped: function() {
      if ($("tab").index==2) {
        //createNewTextItem();
        createNewActionItem();
      } else {
        editor.clipEditor()
      }
    }
  }
};

var settingButton = {
  type: "button",
  props: {
    //src: "assets/setting.png"
    icon: $icon("002", $color("tint")),
    bgcolor: $color("clear")
  },
  layout: function(make, view) {
    make.size.equalTo($size(20, 20));
    make.top.right.inset(12);
  },
  events: {
    tapped: function() {
      var setting = require("./setting");
      setting.show({
        "clear": function() {
          if(mode == "clip")
            $("clipboard-list").data = [];
          else{
            LocalData.fav=[]
            dataManager.writeCloud()
          }
          builder.reloadTextItems(mode);
        }
      });
    }
  }
};

function init() {
  $ui.render({
    props: { title: "Pin" },
    views: [tabView, clipboardView, actionView, createButton, settingButton]
  });

  dataManager.initData(mode);

  setListViewType(0);
}

function setListViewType(type) {
  listType = type;

  var clipboardView = $("clipboard-list");
  var actionView = $("action-list");
  if(type == 2){
    actionView.hidden = false
    clipboardView.hidden = true
  } else{
    actionView.hidden = true
        clipboardView.hidden = false
  }
    
}

function createNewTextItem() {
  $input.text().then(function(text) {
    var items = dataManager.getTextItems();
    if (items.indexOf(text) === -1 && text.length > 0) {
      items.unshift(text);
      $("clipboard-list").insert({ "index": 0, "value": text });
      dataManager.setTextItems(items);
      builder.reloadTextItems();
    }
  });
}

function createNewActionItem() {
  var creator = require("./action-creator");
  creator.create(function(action) {
    var items = dataManager.getActionItems();
    items.unshift(action);
    $("action-list").insert({
      index: 0,
      value: builder.createActionItem(action)
    });
    dataManager.setActionItems(items);
    builder.reloadActionItems();
  });
}

module.exports = {
  init: init
};
