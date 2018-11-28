$widget.height = 181
var dataManager = require("./data-manager");
var builder = require("./builder");
var helper = require("./helper");
//var textItems = dataManager.getTextItems();
var editor = require("./editor")
var views = [
  createButton(
      "024", //翻译
      function(make, view) {
        make.top.inset(3);
        make.right.inset(64);
        make.height.equalTo(26);
        make.width.equalTo(view.super).multipliedBy(0.06);
      },
      function() {
        var ptext = $("input").text=="轻点输入.."?"":$("input").text;
          var translator = require("./js-action/translator");
          translator.gtrans(ptext);
          $("input").blur();
      },
      function() {
            var ptext = $("input").text=="轻点输入.."?"":$("input").text;
              var dic = require("./js-action/dictionary");
              dic.dic(ptext);
              $("input").blur();
          }
    ),
    createButton(
        "023", //预览或搜索input内容
        function(make, view) {
          make.top.inset(3);
          make.right.inset(92);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.06);
        },function() {
          var stext = $("input").text;
          if (stext == "轻点输入..") {
            $("input").focus();
          } else if ($detector.link(stext) != "") {
            $app.openURL($detector.link(stext)[0]);
          } else if ($detector.phoneNumber(stext) != "") {
            $app.openURL("tel:" + $detector.phoneNumber(stext));
          } else if (stext) {
            helper.searchText(stext);
          }
        },
        function() {
          var ptext = $("input").text;
          if (ptext == "轻点输入..") {
            $("input").focus();
          } else {
            var widgetPreview = require("./js-action/widgetprvw");
            widgetPreview.show(ptext);
            $("input").blur();
          }
        }
        
      ),
      createButton(
        "022", //分享剪贴板记录列表
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
          if($("clipboard-list").data.length>0){
            let content = []
            $("clipboard-list").data.map(function(i){
              content = content.concat(i.label.text)
            })
            $share.sheet(content.join("\n"));
          } else $ui.toast("记录列表为空");
        }
      ),
      createButton(
        "027", //删除剪贴板内容
        function(make, view) {
          make.top.inset(3);
          make.right.inset(8);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.06);
        },
        function() {
          $("input").text = "轻点输入..";
          $("input").textColor = $color("gray")
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
              $("input").textColor = $color("gray")
              dataManager.clearTextItems();
            }
          });
        }
      ),
  createText(),
  createLine(),
  createClipboardView(),
  createActionView()
];

function init() {
  $ui.render({ views: views });
   // $("input").text = $clipboard.text || "";
$("clipboard-list").data = []
var textItems = dataManager.getTextItems();
  textItems.map(function(i){
    let flag = i.indexOf("\n") >= 0
    $("clipboard-list").data = $("clipboard-list").data.concat({
      label:{
        text: i,
        textColor: flag? $color("#325793"):$color("black")
      }
    })
  })
  initActionButtons();
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
function createButton(icon, layout, handler, handler2) {
  return {
    type: "button",
    props: {
      icon: $icon(icon, $color("darkText"), $size(18, 18)),
      font: $font(14),
      bgcolor: $color("clear")
    },
    layout: layout,
    events: {
      tapped: handler,
      longPressed: handler2
    }
  };
}


function createText(){
  return{
      type: "text",
      props: {
        id:"input",        
        //placeholder:"轻点输入..",
        font:$font(12),
        textColor:$clipboard.text? $color("black"):$color("gray"),
        borderWidth:0.4,
        borderColor:$rgba(100,100,100,0.25),
        bgcolor: $rgba(200, 200, 200, 0.25),   
        text: $clipboard.text||"轻点输入..",
        radius: 5,
        scrollEnabled: false,
        lines: 1,
        insets: $insets(4, 1, 0, 0),
        align:$align.natural,
        //editable: false
      },
      layout: function(make, view) {
        make.top.inset(5)
        make.left.inset(9)
        make.right.inset(120)
        make.height.equalTo(23)
      },
      events: {
        didBeginEditing: function(sender) {
          editor.clipEditor($clipboard.text)
        }
      }
    
  }
}

function createLine(){
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
    }
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
      borderWidth:0.2,
      borderColor:$rgba(100,100,100,0.25),
      alwaysBounceVertical: false,
      alwaysBounceHorizontal: true,
      showsHorizontalIndicator: false
    },
    layout: function(make, view) {
      make.left.right.inset(8);
      make.bottom.inset(0);
      make.height.equalTo(28);
    },
    views: views
  };

  return container;
}

function initActionButtons() {
  
  var actionView = $("action-view");
  actionView.relayout();

  var actions = dataManager.getActionItems();
  var itemHeight = 28;
  var leftView;
  var multiplyRatio = 1.0 / Math.min(actions.length, 8);
  var contentWidth = 0;

  for (var idx=0; idx<actions.length; ++idx) {
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
        contentWidth = (actionView.frame.width - 12) * multiplyRatio * actions.length;
        leftView = view;
      },
      events: {
        tapped: function(sender) {
          $device.taptic(1);
          helper.runAction(sender.info);
        },
        longPressed: function(sender){
          $device.taptic(2);
          helper.runLongAction(sender.sender.info)
        }
      }
    }
    actionView.add(button);
  }

  actionView.contentSize = $size(contentWidth, itemHeight);
}

module.exports = {
  init: init
}
