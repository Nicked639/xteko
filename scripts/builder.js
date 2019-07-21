var dataManager = require("./data-manager");
var helper = require("./helper");
var textItems = dataManager.getTextItems();
var actionItems = dataManager.getActionItems();
var editor = require("./editor");
var aparter = require("./js-action/apart-items");
var fontType = $cache.get("fontType")||"Courier"
var fontSize = $cache.get("fontSize")||"13"
var apart = require("./js-action/apartWords");
function createClipboardView() {
  return {
    type: "list",
    props: {
      id: "clipboard-list",
      reorder: false,
      rowHeight: $app.env == $env.app?44:30,
      separatorColor:
        $app.env == $env.app ? $color("seperator"): $rgba(100, 100, 100, 0.25),
      //data: textItems,
      template: {
        views: [
          {
            type: "label",
            props: {
              id: "label",
              textColor: $color("black"),
              align: $align.left,
              font: $font(fontType,fontSize)
            },
            layout: function(make, view) {
              make.right.top.bottom.inset(0);
              make.left.inset(15);
            }
          },
          {
            type: "button",
            props: {
              id: "showBtn",
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.left.top.bottom.inset(0);
              make.width.equalTo(60);
            },
            events: {
              tapped: function(sender) {
                $device.taptic(1);
                var cell = sender.super.super;
                var view = $("clipboard-list").runtimeValue();
                var indexPath = view.invoke("indexPathForCell", cell).rawValue();
                editor.clipEditor($("clipboard-list").data[indexPath.row].label.text)
              },
            }
          },{
            type: "button",
            props: {
              id: "editBtn",
              bgcolor: $color("clear"),
              hidden: $app.env==$env.today?false:true
            },
            layout: function(make, view) {
              make.top.bottom.inset(0);
              make.right.inset(30)
              make.width.equalTo(60);
            },
            events: {
              tapped: function(sender) {
                $device.taptic(1);
                var cell = sender.super.super;
                var view = $("clipboard-list").runtimeValue();
                var indexPath = view.invoke("indexPathForCell", cell).rawValue();
                let url = "jsbox://run?name=MyPin%20Lite&location=local"
                let text = encodeURI($("clipboard-list").data[indexPath.row].label.text)
                $app.openURL(url+"&text="+text)
              },
            }
          },
        ]
      },
      
    },
    layout: listViewLayout(),
    events: {
      didSelect: function(sender, indexPath, object) {
        if($app.env == $env.keyboard){
          $keyboard.insert(object.label.text)
          return
        }
        $clipboard.text = object.label.text;
        $ui.toast($l10n("COPIED"), 0.3);
        if($app.env == $env.today){
          $("input").text = $clipboard.text;
          $device.taptic(1);
  $("input").textColor = $clipboard.text==undefined ?$color("gray"):($clipboard.text.indexOf("\n")>=0?$color("#325793"):$color("black"))
        }
        
      },
      didLongPress: function(sender, indexPath, data) {
        $device.taptic(1)
      let text = encodeURI($("clipboard-list").data[indexPath.row].label.text)
      apart.run(text)
      }
    }
  }
}

function saveTextItems(mode="clip") {
  dataManager.setTextItems(textItems,mode);
}

function reloadTextItems(mode="clip") {
  textItems = dataManager.getTextItems(mode);
}

function editAction(action, indexPath) {
  var creator = require("./action-creator");
  creator.edit(action, function(action) {
    actionItems[indexPath.row] = action;
    $("action-list").data = mapActionItems();
    saveActionItems();
  });
}

function saveActionItems() {
  dataManager.setActionItems(actionItems);
}

function reloadActionItems() {
  actionItems = dataManager.getActionItems();
}

function createActionView() {
  return {
    type: "list",
    props: {
      id: "action-list",
      rowHeight: 64,
      reorder: true,
      actions: [
        {
          title: "delete",
          handler: function(sender, indexPath) {
            helper.arrayRemove(actionItems, indexPath.row);
            saveActionItems();
          }
        },
        {
          title: $l10n("LAUNCH"),
          handler: function(sender, indexPath) {
            helper.runAction(actionItems[indexPath.row]);
          }
        },
        {
          title: $l10n("MAKE_ICON"),
          handler: function(sender, indexPath) {
            makeHomeIcon(actionItems[indexPath.row]);
          }
        }
      ],
      template: {
        views: [
          {
            type: "label",
            props: {
              id: "action-name-label"
            },
            layout: function(make, view) {
              make.top.inset(10);
              make.left.inset(15);
            }
          },
          {
            type: "label",
            props: {
              id: "action-pattern-label"
            },
            layout: function(make, view) {
              make.bottom.inset(8);
              make.left.inset(15);
              make.right.inset(72);
            }
          },
          {
            type: "image",
            props: {
              id: "action-icon-image",
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.centerY.equalTo(view.super);
              make.right.inset(15);
              make.size.equalTo($size(24, 24));
            }
          }
        ]
      },
      data: mapActionItems()
    },
    layout: listViewLayout(),
    events: {
      didSelect: function(sender, indexPath) {
        var action = actionItems[indexPath.row];
        editAction(action, indexPath);
      },
      reorderMoved: function(fromIndexPath, toIndexPath) {
        helper.arrayMove(actionItems, fromIndexPath.row, toIndexPath.row);
      },
      reorderFinished: function() {
        saveActionItems();
      }
    }
  };
}

function createActionItem(item) {
  return {
    "action-name-label": {
      "text": item.name
    },
    "action-pattern-label": {
      "text": item.pattern
    },
    "action-icon-image": {
      "icon": $icon(item.icon)
    }
  };
}

function mapActionItems() {
  return actionItems.map(function(item) {
    return createActionItem(item);
  });
}

function listViewLayout() {
  return function(make, view) {
    make.left.right.equalTo(0);
    make.top.inset($app.env == $env.app ? 44 : 33);
    make.bottom.inset($app.env == $env.app ? 52 : 30);
  };
}

function makeHomeIcon(action) {
  var options = [$l10n("USE_DEFAULT_ICON"), $l10n("PHOTO_LIBRARY")];
  $ui.menu(options).then(function(selected) {
    if (selected == null) {
      return;
    }
    if (selected.index == 0) {
      var icon = helper.makeIcon(action.icon, $color("tint"));
      createHomeShortcut(action, icon);
    } else {
      $photo.pick().then(function(result) {
        if (result && result.image) {
          createHomeShortcut(action, result.image);
        }
      });
    }
  });
}

function createHomeShortcut(action, icon) {
  $system.makeIcon({
    title: action.name,
    url: action.pattern.replace("%@", ""),
    icon: icon
  });
}

module.exports = {
  createClipboardView: createClipboardView,
  createActionView: createActionView,
  reloadTextItems: reloadTextItems,
  createActionItem: createActionItem,
  reloadActionItems: reloadActionItems
};
