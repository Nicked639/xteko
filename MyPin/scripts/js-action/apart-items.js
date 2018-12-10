var tokenmode = 0;

async function takeApart(content) {
  return await $text.tokenize({
    text: content
  });
}

async function apart(content) {
  //  $cache.get("TokenizeMode") == "T_ELIMINATE" ? (tokenmode = 1) : (tokenmode = 0);
  //不加async会报错
  var picked = [];
  var pickedIO = [];
  var results = await takeApart(content);
  var pickedAll = results;
  var arr = Array.from({ length: results.length }, (v, k) => k);
  $ui.render({
    type: "blur",
    props: {
      id: "apartbg",
      style: 4
    },
    views: [
      {
        type: "views",
        props: {
          id: "apart",
          borderWidth: 0.2,
          borderColor: $rgba(100, 100, 100, 0.25),
          radius: 10,
          bgcolor: $rgba(200, 200, 200, 0.25)
        },
        layout: function(make) {
          make.edges.inset(4);
        },
        views: [
          {
            type: "label",
            props: {
              bgcolor: $rgba(100, 100, 100, 0.25)
            },
            layout: function(make, view) {
              make.right.left.inset(0);
              make.height.equalTo(0.2);
              make.top.inset(28);
            }
          },
          {
            type: "matrix",
            props: {
              id: "matrix",
              spacing: 4,
              scrollEnabled: false,
              template: [
                {
                  type: "label",
                  props: {
                    id: "tile",
                    radius: 10,
                    font: $font(12),
                    scrollEnabled: false,
                    textColor: $color("#333333"),
                    bgcolor: $color("#efefef"),
                    borderColor: $color("#dddddd"),
                    borderWidth: 0.5,
                    align: $align.center
                  },
                  layout: $layout.fill
                }
              ],
              data: results.map(function(item) {
                return {
                  tile: {
                    text: item
                  }
                };
              })
            },
            layout: function(make, view) {
              make.left.right.bottom.inset(0);
              make.top.inset(28.2);
            },
            events: {
              didSelect: function(sender, indexPath, data) {
                let cell = sender.cell(indexPath);
                let label = cell.get("tile");
                if (tokenmode == 0) {
                  var test = testRow(picked, indexPath.row);
                  if (test >= 0) {
                    picked.splice(test, 1);
                    pickedIO.splice(test, 1);
                    deselected(label);
                  } else {
                    picked.push(indexPath.row);
                    pickedIO.push(label.text);
                    selected(label);
                  }
                  $cache.set("picked", pickedIO);
                } else {
                  var test = testRow(arr, indexPath.row);
                  if (test >= 0) {
                    arr.splice(test, 1);
                    pickedAll.splice(test, 1);
                    selected(label);
                  } else {
                    arr = sortArr(arr, indexPath.row);
                    test = testRow(arr, indexPath.row);
                    pickedAll.splice(test, 0, label.text);
                    deselected(label);
                  }
                  $cache.set("picked", pickedAll);
                }
              },
              itemSize: function(sender, indexPath) {
                var data = sender.object(indexPath);
                var size = $text.sizeThatFits({
                  text: data.tile.text,
                  width: 320,
                  font: $font(12)
                });
                return $size(size.width + 14, 20);
              }
              //              touchesMoved: function(sender) {
              //                if (sender.contentOffset.y > 0) {
              //                  $("matrix").scrollEnabled = true;
              //                }
              //              }
            }
          }
        ]
      },
      {
        type: "button",
        props: {
          icon: $icon("225", $color("tint"), $size(18, 18)),
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.top.left.inset(9);
        },
        events: {
          tapped: function(sender) {
            $device.taptic(0);
            $("apartbg").remove();
            $cache.remove("picked");
            var dataManager = require("../data-manager");
            dataManager.init(mode);
            var path = $app.env == $env.app ? "scripts/app" : "scripts/widget";
            var module = require(path);
            module.init(mode);
            $("input").text = $clipboard.text;
          }
        }
      },
      {
        type: "label",
        props: {
          id: "mode",
          text: tokenmode == 1 ? $l10n("T_ELIMINATE") : $l10n("T_GENERAL"),
          font: $font("bold", 16),
          textColor: $color("tint"),
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.centerX.equalTo(view.super);
          make.top.inset(9);
        },
        events: {
          tapped(sender) {
            $device.taptic(0);
            picked = [];
            pickedIO = [];
            pickedAll = results;
            $cache.remove("picked");
            if (tokenmode == 0) {
              //              $cache.set("TokenizeMode", "T_ELIMINATE");
              $("mode").text = $l10n("T_ELIMINATE");
              tokenmode = 1;
            } else {
              //              $cache.set("TokenizeMode", "T_GENERAL");
              $("mode").text = $l10n("T_GENERAL");
              tokenmode = 0;
            }
            $ui.toast($l10n("MODE_CHANGED"), 0.6);
          }
        }
      },
      {
        type: "button",
        props: {
          icon: $icon("019", $color("tint"), $size(18, 18)),
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.right.top.inset(9);
        },
        events: {
          tapped: function(sender) {
            let pick = $cache.get("picked");
            let pio = pick.join("");
            if (pick.length > 0) {
              $clipboard.set({ "type": "public.plain-text", "value": pio });
              var dataManager = require("../data-manager");
              var items = dataManager.getTextItems();
              if (items.indexOf(pio) === -1) {
                items.unshift(pio);
                dataManager.setTextItems(items);
                $cache.remove("picked");
                var builder = require("../builder");
                builder.reloadTextItems();
                tokenmode == 0
                  ? $ui.toast($l10n("SELECTEDCOPIED"), 0.3)
                  : $ui.toast($l10n("SELECTEDELIMINATED"), 0.3);
              } else $ui.toast($l10n("NOTHING_SELECTED_OR_RECORDED"), 0.3);
            }
          }
        }
      }
    ]
  });
}

function selected(label) {
  label.textColor = $color("white");
  label.bgcolor = $color("lightGray");
  label.borderColor = $color("gray");
  label.borderWidth = 1;
}

function deselected(label) {
  label.textColor = $color("#333333");
  label.bgcolor = $color("#efefef");
  label.borderColor = $color("#dddddd");
  label.borderWidth = 0.5;
}

function testRow(pick, row) {
  if (pick != "") {
    var i = pick.indexOf(row);
    if (i >= 0) {
      return i;
    }
  }
}

function sortNumber(a, b) {
  return a - b;
}

function sortArr(arr, row) {
  arr.push(row);
  arr.sort(sortNumber);
  return arr;
}

module.exports = {
  apart: apart
};
