async function takeApart(content) {
  return await $text.tokenize({
    text: content
  });
}

async function apart(content) {
  //不加async会报错
  var picked = [];
  var pickedInOrder = [];
  var results = await takeApart(content);
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
        layout: function(make, view) {
          make.top.right.left.bottom.inset(4);
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
              scrollEnabled: true,
              template: [
                {
                  type: "label",
                  props: {
                    id: "tile",
                    radius: 10,
                    font: $font(12),
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
                for (let i = 0; i < results.length; i++) {
                  console.info(i);
                  cell = $("matrix").cell($indexPath(0, i));
                  label = cell.get("tile");
                  if (label.info) {
                    picked.push(label.text);
                  }
                }

                let thisCell = sender.cell(indexPath);
                let thisLabel = thisCell.get("tile");
                if (thisLabel.info >= 0) {
                  pickedInOrder.splice([thisLabel.info], 1);
                  deselected(thisLabel);
                } else {
                  selected(thisLabel, picked.length);
                  pickedInOrder.push(thisLabel.text);
                }
                $cache.set("pickedInOrder", pickedInOrder);
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
        type: "button",//关闭
        props: {
          icon: $icon("225", $color("tint"), $size(18, 18)),
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.top.left.inset(9);
        },
        events: {
          tapped: function(sender) {
exit()
          }
        }
      },
      {
        type: "label",
        props: {
          text: "分词",
          font: $font("bold", 16),
          textColor: $color("tint"),
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.centerX.equalTo(view.super);
          make.top.inset(9);
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
            let pickedInOrder = $cache.get("pickedInOrder");
            if(pickedInOrder){
              
            
                        let pio = pickedInOrder.join("");
                       
                       
                          
                          $clipboard.set({ "type": "public.plain-text", "value": pio });
                         
                          var dataManager = require("../data-manager");
                          mode = "clip"
                          var items = dataManager.getTextItems(mode);
                          if (pio) {
                             $("apartbg").remove();
//                            items.unshift(pio);
//                            dataManager.setTextItems(items,mode);
dataManager.init()
                            $cache.remove("pickedInOrder");
                            
                            var path = $app.env == $env.today ? "../widget" : "../app";
                                        var module = require(path);
                                        module.init(mode);
                                        var builder = require("../builder");
                                                                    builder.reloadTextItems(mode);
                                                                        $("input").text = $clipboard.text?$clipboard.text:"轻点输入..";
                                                                        $("input").textColor =$clipboard.text? $color("black"):$color("gray");

                            $ui.toast("已复制", 0.3);
                          } 
                        
          }else $ui.error("请选择",0.5)
          }
        }
      }
    ]
  });
}

function exit(){
              $device.taptic(0);
              $("apartbg").remove();
              
              mode = "clip"
              var dataManager = require("../data-manager");
              dataManager.init(mode);
              var path = $app.env == $env.today ? "../widget" : "../app";
              var module = require(path);
              module.init(mode);
}

function selected(label, count) {
  label.textColor = $color("white");
  label.bgcolor = $color("lightGray");
  label.borderColor = $color("gray");
  label.borderWidth = 1;
  label.info = count;
}

function deselected(label) {
  label.textColor = $color("#333333");
  label.bgcolor = $color("#efefef");
  label.borderColor = $color("#dddddd");
  label.borderWidth = 0.5;
  label.info = undefined;
}

module.exports = {
  apart: apart
};
