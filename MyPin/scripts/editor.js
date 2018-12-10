let screenWidth = $device.info.screen.width;
let offset = (screenWidth * 0.2 - 16) / 7;
var canvas = require("./js-action/canvas");
var rightView;

function show(text) {
  $ui.render({
    type: "blur",
    props: {
      id: "mainbg",
      style: 2
    },
    views: [
      {
        type: "view",
        props: {
          radius: 10
        },
        layout: $layout.fill,
        views: [
          {
            type: "text",
            layout: $layout.fill,
            props: {
              id: "textvw",
              bgcolor: $color("clear"),
              font: $font("Avenir", 13),
              insets: $insets(9, 10, 2, 2),
              accessoryView: {
                type: "blur",
                props: {
                  height: 35,
                  style: 1,
                  borderWidth: 0.4,
                  borderColor: $rgba(200, 200, 200, 0.55)
                },
                views: [
                  accessoryBTN(
                    canvas.checkMark(5, 1.2),
                    function(make, view) {
                      make.height.equalTo(25);
                      make.right.inset(8);
                      make.centerY.equalTo(view.super);
                      make.width.equalTo(view.super).multipliedBy(0.1);
                      rightView = view;
                    },
                    function(sender) {
                      $device.taptic(0);
                      var content = contentCheck();
                      saveClip(content,mode)

                    }
                  ),
                  accessoryBTN(
                    canvas.cross(5, 1.2),
                    btnGeneralLayout(),
                    function(sender) {
                      $device.taptic(0);
                      $("mainbg").remove();
                      var dataManager = require("./data-manager");
                      dataManager.init(mode);
                      var path =
                        $app.env == $env.app ? "scripts/app" : "scripts/widget";
                      var module = require(path);
                      module.init(mode);
                      if (path == "scripts/widget") {
                        iconColor(mode);
                        $("input").text = $clipboard.text
                       
                          ? $clipboard.text
                          : "轻点输入..";
                        $("input").textColor = $clipboard.text
                          ? $color("darkText")
                          : $color("gray");
                      } else $("tab").index = mode == "clip" ? 0 : 1;
                    }
                  ),
                  accessoryBTN(
                    canvas.nav(6, 1.2),
                    btnGeneralLayout(),
                    function(sender) {
                      for (var i = 0; i < 5; i++) {
                        $device.taptic(0);
                        $("textvw")
                          .runtimeValue()
                          .$deleteBackward();
                      }
                    },
                    function(sender) {
                      $device.taptic(0);
                      $("textvw").text = "";
                    }
                  ),
                  accessoryBTN(
                    canvas.arrow(5, 1.2, -1),
                    btnGeneralLayout(),
                    function(sender) {
                      $device.taptic(0);
                      if (udrd.$canRedo()) udrd.$redo();
                      else $ui.error($l10n("NO_REDO"), 0.6);
                    }
                  ),
                  accessoryBTN(
                    canvas.arrow(5, 1.2, 1),
                    btnGeneralLayout(),
                    function(sender) {
                      $device.taptic(0);
                      if (udrd.$canUndo()) udrd.$undo();
                      else $ui.error($l10n("NO_UNDO"), 0.6);
                    }
                  ),
                  accessoryBTN2(
                    "022",
                    function(sender) {
                      $device.taptic(0);
                      var content = contentCheck();
                      if (content != "") $share.sheet(content);
                      else $ui.error($l10n("NO_CONTENT"), 0.6);
                    },
                    function(sender) {
                      $device.taptic(0);
                      if ($clipboard.image) {
                        $share.sheet($clipboard.image);
                        $ui.toast($l10n("IMAGE_SAVED"), 0.6);
                      } else $ui.error($l10n("CLIP_NO_IMAGE"), 0.6);
                    }
                  ),
                  accessoryBTN2(
                    "017",
                    function(sender) {
                      var content = contentCheck();
                      if (content != "") {
                        $device.taptic(0);
                        var qr = $qrcode.encode(content);
                        showImage(qr.png);
                      } else $ui.error($l10n("NO_CONTENT"), 0.6);
                    },
                    function(sender) {
                      $device.taptic(0);
                      var content = contentCheck();
                      if (content != "") {
                        var qr = $qrcode.encode(content);
                        $photo.save({
                          data: qr.png,
                          handler: function(success) {
                            $ui.toast($l10n("QR_SAVED"), 0.5);
                          }
                        });
                      } else $ui.error($l10n("NO_CONTENT"), 0.6);
                    }
                  ),
                  accessoryBTN2(
                    "023",
                    function(sender) {
                      $device.taptic(0);
                      var content = contentCheck();
                      var prvw = require("./js-action/widgetprvw");
                      if (content != "") {
                        $device.taptic(0);
                        $("textvw").blur();
                        prvw.show(content);
                      } else $ui.error($l10n("NO_CONTENT"), 0.6);
                    },
                    function(sender) {
                      $device.taptic(0);
                      if ($clipboard.image) {
                        showImage($clipboard.image);
                      } else $ui.error($l10n("CLIP_NO_IMAGE"), 0.6);
                    }
                  )
                ]
              }
            }
          }
        ]
      }
    ]
  });
  var udrd = $("textvw")
    .runtimeValue()
    .$undoManager();
}

function contentCheck() {
  var ctext;
  if ($("textvw").text.length > 0) {
    ctext =
      $("textvw").selectedRange.length > 0
        ? $("textvw").text.substr(
            $("textvw").selectedRange.location,
            $("textvw").selectedRange.length
          )
        : $("textvw").text;
  } else {
    ctext = "";
  }
  return ctext;
}

function showImage(image) {
  if ($app.env == $env.today) {
    $widget.height = 400;
  }
  $("textvw").blur();
  $ui.window.add({
    type: "blur",
    props: {
      style: 4,
      id: "image"
    },
    views: [
      {
        type: "image",
        props: {
          data: image
        },
        layout: function(make, view) {
          make.center.equalTo(view.super);
          make.size.equalTo($size(256, 256));
        }
      }
    ],
    events: {
      tapped(sender) {
        $("image").remove();
        $widget.height = 180;
        $delay(0.2, function() {
          $("textvw").focus();
        });
      },
      doubleTapped: function(sender) {
        $photo.save({
          data: image,
          handler: function(success) {
            $ui.toast($l10n("QR_IMG_SAVED"), 0.5);
          }
        });
      },
      longPressed: function(sender) {
        $share.sheet({
          item: ["image.png", image],
          handler: function(success) {
            if (success) {
              $("image").remove();
              $delay(0.6, function() {
                $("textvw").focus();
              });
            }
          }
        });
      }
    },
    layout: $layout.fill
  });
}

function accessoryBTN(canvas, layout, handler, handler2) {
  return {
    type: "button",
    props: {
      radius: 10,
      bgcolor: $color("clear"),
      borderWidth: 0.4,
      borderColor: $rgba(100, 100, 100, 0.25)
    },
    layout: layout,
    views: [canvas],
    events: {
      tapped: handler,
      longPressed: handler2
    }
  };
}

function accessoryBTN2(icon, handler, handler2) {
  return {
    type: "button",
    props: {
      radius: 10,
      icon: $icon(icon, $color("tint"), $size(16, 16)),
      bgcolor: $color("clear"),
      borderWidth: 0.4,
      borderColor: $rgba(100, 100, 100, 0.25)
    },
    layout: btnGeneralLayout(),
    events: {
      tapped: handler,
      longPressed: handler2
    }
  };
}

function btnGeneralLayout() {
  return function(make, view) {
    make.height.equalTo(25);
    make.centerY.equalTo(view.super);
    make.width.equalTo(view.super).multipliedBy(0.1);
    make.right.equalTo(rightView.left).offset(-offset);
    rightView = view;
  };
}

function iconColor(mode) {
  if (mode == "clip") {
    $("fav").icon = $icon("091", $color("darkText"), $size(18, 18));
  } else $("fav").icon = $icon("091", $color("#ed9e31"), $size(18, 18));
}

function saveClip(text, mode = "clip") {
  var dataManager = require("./data-manager");
  $clipboard.set({ "type": "public.plain-text", "value": text });
  $device.taptic(0);
  $("mainbg").remove();
  dataManager.init(mode);
  var path = $app.env == $env.app ? "scripts/app" : "scripts/widget";
  var module = require(path);
  module.init(mode);
  var builder = require("./builder");
  builder.reloadTextItems(mode);
  $("input").text = $clipboard.text ? $clipboard.text : "轻点输入..";
  $("input").textColor = $clipboard.text ? $color("black") : $color("gray");
  iconColor(mode);
}

function editor(text) {
  $device.taptic(0);
  show(text);
  $("textvw").focus();
  if (text !== undefined && text.length > 0) {
    $("textvw").text = text;
  } else if ($app.env == $env.app && $clipboard.text !== undefined) {
    $("textvw").text = $clipboard.text;
  }
}

module.exports = {
  clipEditor: editor
};
