$widget.height = 181;
$keyboard.barHidden = false
var dataManager = require("./data-manager");
var builder = require("./builder");
var helper = require("./helper");
//var textItems = dataManager.getTextItems();
var editor = require("./editor");
var fontType = $cache.get("fontType")||"Courier"
var fontSize = $cache.get("fontSize")||13
var actionNum = $cache.get("actionNum")||7
var views = [
  createButton(
    "091", //上传
    "fav",
    function(make, view) {
      make.top.inset(3);
      make.right.inset(92);
      make.height.equalTo(26);
      make.width.equalTo(view.super).multipliedBy(0.06);
    },
    function() {
      $device.taptic(1);
      if (mode == "cloud") {
        $ui.error("已在 iCloud 模式", 0.5);
        return;
      }
      let text = $clipboard.text;
      if (text) {
        var items = dataManager.getTextItems("cloud");
        var index = items.indexOf(text);
        if (index != -1) {
          helper.arrayRemove(items, index);
        }
        items.unshift(text);
        dataManager.setTextItems(items, "cloud");
        $ui.toast("上传成功", 0.3);
        $ui.toast("上传成功", 0.3);
      } else $ui.error("剪贴板为空", 0.3);
      //
    },
    function() {
      $device.taptic(1);
      if (mode == "clip") {
        $("fav").icon = $icon("091", $color("#ed9e31"), $size(18, 18));
        mode = "cloud";
        dataManager.initData(mode);
      } else {
        $("fav").icon = $icon("091", $color("darkText"), $size(18, 18));
        mode = "clip";
        dataManager.initData(mode);
      }
    }
  ),
  createButton(
    "023", //预览或搜索input内容
    "search",
    function(make, view) {
      make.top.inset(3);
      make.right.inset(64);
      make.height.equalTo(26);
      make.width.equalTo(view.super).multipliedBy(0.06);
    },
    function() {
      var stext = $("input").text;
      if (stext == "轻点输入..") {
        
        editor.clipEditor()
        
      } else if ($detector.link(stext) != "") {
        $app.openURL($detector.link(stext)[0]);
      } else if ($detector.phoneNumber(stext) != "") {
        $app.openURL("tel:" + $detector.phoneNumber(stext));
      } else if (stext) {
        helper.searchText(stext);
      }
    },
    function() {
      $device.taptic(1)
      var ptext = $("input").text;
      if (ptext == "轻点输入..") {
        editor.clipEditor()
      } else {
        var widgetPreview = require("./js-action/widgetprvw");
        widgetPreview.show(ptext);
      }
    },
    function(sender,location){
      $device.taptic(1)
            var ptext = $("input").text;
            if (ptext == "轻点输入..") {
              $app.openURL("aisearch://command?q=")
            } else{
              if(location.y>150){
                                let s = encodeURI($clipboard.text)
                                $app.openURL("aisearch://command?q="+s)
                                
                                return
                              }else if(location.y<-100){
                                 
                                 return
                               }
            }
    }
  ),
  createButton(
    "022", //分享剪贴板记录列表
    "share",
    function(make, view) {
      make.top.inset(3);
      make.right.inset(36);
      make.height.equalTo(26);
      make.width.equalTo(view.super).multipliedBy(0.06);
    },
    function() {
      if ($clipboard.text) {
        $share.sheet($clipboard.text);
      } else $ui.toast("剪贴板为空");
    },
    function() {
      if ($("clipboard-list").data.length > 0) {
        let content = [];
        $("clipboard-list").data.map(function(i) {
          content = content.concat(i.label.text);
        });
        $share.sheet(content.join("\n"));
      } else $ui.toast("记录列表为空");
    }
  ),
  createButton(
    "027", //删除剪贴板内容
    "del",
    function(make, view) {
      make.top.inset(3);
      make.right.inset(8);
      make.height.equalTo(26);
      make.width.equalTo(view.super).multipliedBy(0.06);
    },
    function() {
      $("input").text = "轻点输入..";
      $("input").textColor = $color("gray");
      $clipboard.clear();
      $ui.toast("剪贴板已清空", 0.3);
    },
    function() {
      $ui.menu(["确认清空记录列表"]).then(function(selected) {
        if (selected.title.length > 0) {
          //              var textItems = dataManager.getTextItems();
          //              textItems = [];
          $("clipboard-list").data = [];
          $clipboard.clear();
          $("input").text = "轻点输入..";
          $("input").textColor = $color("gray");
          dataManager.clearTextItems(mode);
        }
      });
    }
  ),
  createText(),
  createLine(),
  createClipboardView(),
  createActionView()
];
function init(mode = "clip") {
  $ui.render({
    props: {
      navBarHidden: 1,
      id: "widget",
      bgcolor: $app.env==$env.today?$color("clear"):$color("white")
    },
    views: views
  });
  // $("input").text = $clipboard.text || "";
  dataManager.initData(mode);
  initActionButtons();
  if(mode=="cloud") $("fav").icon = $icon("091",$color("#ed9e31"),$size(18,18))
}

//function createButton(title, layout, handler) {
//  return {
//    type: "button",
//    props: {
//      title: title,
//      titleColor: $color("tint"),
//      font: $font("bold", 16),
//      bgcolor: $rgba(200, 200, 200, 0.25)
//    },
//    layout: layout,
//    events: { tapped: handler }
//  }
//}
function createButton(icon, id, layout, handler, handler2,handler3) {
  return {
    type: "button",
    props: {
      icon: $icon(icon, $color("darkText"), $size(18, 18)),
      font: $font(14),
      bgcolor: $color("clear"),
      id: id
    },
    layout: layout,
    events: {
      tapped: handler,
      longPressed: handler2,
      touchesEnded: handler3,
    }
  };
}

function createText() {
  return {
    type: "label",
    props: {
      id: "fa",
      //placeholder:"轻点输入..",
//      font: $font(fontType,fontSize),
//      textColor: $clipboard.text ? $color("black") : $color("gray"),
      borderWidth: 0.4,
      borderColor: $rgba(100, 100, 100, 0.25),
      bgcolor: $rgba(200, 200, 200, 0.25),
//      text: $clipboard.text || "轻点输入..",
      radius: 5,
      scrollEnabled: false,
//      lines: 1,
//      insets: $insets(4, 1, 0, 0),
      
      //editable: false
    },
    layout: function(make, view) {
      make.top.inset(5);
      make.left.inset(9);
      make.right.inset(120);
      make.height.equalTo(23);
    },
    events: {
      tapped: function(sender) {
        editor.clipEditor($clipboard.text);
      },
      
    },
    views: [
      {
        type: "label",
        props: {
          id: "input",
          font: $font(fontType,fontSize),
          textColor: $clipboard.text ==undefined ?$color("gray"):($clipboard.text.indexOf("\n")>=0?$color("#325793"):$color("black")),
          text: $clipboard.text || "轻点输入..",
          scrollEnabled: false,
//          lines: 1,
          
        },
        layout: function(make, view) {
          make.left.inset(6)
          make.top.inset(3)
          make.right.inset(5)
          make.bottom.inset(0)
        },
      }
    ]
  };
}

function createLine() {
  return {
    type: "label",
    props: {
      bgcolor: $rgba(100, 100, 100, 0.25)
    },

    layout: function(make, view) {
      make.top.equalTo($("input").bottom).offset(5);
      make.right.left.inset(0);
      make.height.equalTo(0.4);
    }
  };
}

function createClipboardView() {
  return builder.createClipboardView();
}

function createActionView() {
  var container = {
    type: "scroll",
    props: {
      id: "action-view",
      bgcolor: $rgba(200, 200, 200, 0.25),
      radius: 8,
      borderWidth: 0.2,
      borderColor: $rgba(100, 100, 100, 0.25),
      alwaysBounceVertical: false,
      alwaysBounceHorizontal: true,
      showsHorizontalIndicator: false
    },
    layout: function(make, view) {
      make.left.right.inset(8);
      make.bottom.inset(0);
      make.height.equalTo(28);
    }
    //views: views
  };

  return container;
}

function initActionButtons() {
  var actionView = $("action-view");
  actionView.relayout();

  var actions = dataManager.getActionItems();
  var itemHeight = 28;
  var leftView;
  var multiplyRatio = 1.0 / Math.min(actions.length, actionNum);
  var contentWidth = 0;

  for (var idx = 0; idx < actions.length; ++idx) {
    var action = actions[idx];
    var button = {
      type: "button",
      props: {
        bgcolor: $color("clear"),
        icon: $icon(action.icon, $color("darkText"), $size(18, 18)),
        info: { pattern: action.pattern, noenc: action.noenc }
      },
      layout: function(make, view) {
        if (leftView) {
          make.left.equalTo(leftView.right);
        } else {
          make.left.equalTo(0);
        }
        make.top.equalTo(0);
        make.height.equalTo(itemHeight);
        make.width.equalTo(view.super).multipliedBy(multiplyRatio);
        contentWidth =
          (actionView.frame.width - 12) * multiplyRatio * actions.length;
        leftView = view;
      },
      events: {
        tapped: function(sender) {
          $device.taptic(1);
          helper.runAction(sender.info);
        },
        longPressed: function(sender) {
          $device.taptic(2);
          //alert($props(sender.sender))
          helper.runLongAction(sender.sender.info);
        },
        touchesEnded: function(sender, location) {
          
          if(location.y>150){
            helper.runMoveAction(sender.info)
            
            return
          }else if(location.y<-100){
             helper.runMoveAction2(sender.info)
             return
           }
        }
      }
    };
    actionView.add(button);
  }

  actionView.contentSize = $size(contentWidth, itemHeight);
  actionView.bgcolor = $app.env == $env.today?$color("clear"):$color("white")
}

module.exports = {
  init: init
};

