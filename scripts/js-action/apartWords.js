let inApp = $app.env == $env.app
$widget.height = 300
let fontSize = inApp ? 15 : 12
let navigateBarHeight = inApp ? 40 : 25
let iconSize = $size(navigateBarHeight * 0.5, navigateBarHeight * 0.5)
let cellHeight = inApp ? 24 : 20

function showToastView(
  text,
  topInset,
  icon = "064",
  appInset = 9,
  duration = 0.6
) {
  let _topInset = inApp ? 44 + appInset : 34;

  topInset = topInset == undefined ? _topInset : topInset;

  let time = new Date().getTime();
  //  if (duration === undefined) duration = text.length / 5;
  if ($("toastView") != undefined) $("toastView").remove();

  $ui.window.add({
    type: "blur",
    props: {
      style: 1,
      alpha: 0,
      radius: 8,
      info: time,
      id: "toastView",
      borderWidth: 0.4,
      userInteractionEnabled: 0,
      bgcolor: $color("clear"),
      borderColor: $rgba(100, 100, 100, 0.25)
    },
    layout: (make, view) => {
      let textSize = $text.sizeThatFits({
        text: text,
        width: view.super.frame.width,
        font: $font(14)
      });
      make.centerX.equalTo(view.super);
      make.top.equalTo(view.super.safeArea).offset(0);
      make.width.equalTo(textSize.width + 60);
      make.height.equalTo(30);
    },
    views: [
      {
        type: "image",
        props: {
          icon: $icon(icon, $color("tint"), $size(16, 16)),
          bgcolor: $color("clear")
        },
        layout: (make, view) => {
          make.centerY.equalTo(view.super);
          make.size.equalTo($size(16, 16));
          make.left.inset(10);
        }
      },
      {
        type: "view",
        layout: (make, view) => {
          make.centerY.equalTo(view.super);
          make.left.equalTo(view.prev.right);
          make.right.inset(10);
          make.height.equalTo(view.super);
        },
        views: [
          {
            type: "label",
            props: {
              text: text,
              bgcolor: $color("clear"),
              textColor: $color("darkGray"),
              font: $font(15)
            },
            layout: (make, view) => {
              make.center.equalTo(view.super);
            }
          }
        ]
      }
    ]
  });

  $delay(0.05, () => {
    let fView = $("toastView");
    if (fView == undefined) return 0;
    fView.updateLayout((make, view) => {
      make.top.equalTo(view.super.safeArea).offset(topInset);
    });
    $ui.animate({
      duration: 0.4,
      animation: () => {
        fView.alpha = 1.0;
        fView.relayout();
      },
      completion: () => {
        $delay(duration, () => {
          let fView = $("toastView");
          if (fView == undefined) return 0;
          else if (fView.info != time) return 0;
          fView.updateLayout((make, view) => {
            make.top.equalTo(view.super.safeArea).offset(0);
          });
          $ui.animate({
            duration: 0.4,
            animation: () => {
              fView.alpha = 0.0;
              fView.relayout();
            },
            completion: () => {
              if (fView != undefined) fView.remove();
            }
          });
        });
      }
    });
  });
}

function run(text){
  apart(text)
}



async function dataSource(content) {
  let res = await $text.tokenize({ text: content });

  return res.map(item => {
    return { tile: { text: item } };
  });
}

async function apart(content) {
  let picked = [], pickedText = [];

  $ui.render({
    props: {
      bgcolor: $color("clear"),
      navBarHidden: 0,
      statusBarStyle: 0,
      id:"mainbg"
    },
    views: [
      {
        type: "view",
        props: {
          id: "apartb",
          bgcolor: $color("clear")
        },
        layout: $layout.fillSafeArea,
        views: [
          {
            type: "views",
            props: {
              id: "apart",
              borderWidth: 0.4,
              borderColor: $color("clear"),
              radius: 10,
              bgcolor: $color("clear")
            },
            layout: make => {
              make.top.left.right.bottom.inset(4);
            },
            views: [
              {
                type: "views",
                props: {
                  id: "NavigateBar",
                  borderWidth: 0.4,
                  borderColor: $rgba(100, 100, 100, 0.25),
                  radius: 10,
                  bgcolor: $rgba(200, 200, 200, 0.25)
                },
                layout: (make, view)=> {
                  make.top.left.right.equalTo(view.super);
                  make.height.equalTo(navigateBarHeight);
                },
                views: [
                  {
                    type: "button",
                    props: {
                      id:"CloseBtn",
                      icon: $icon("225", $color("tint"), iconSize),
                      bgcolor: $color("clear")
                    },
                    layout: (make, view) => {
                      make.left.equalTo(view.super).offset(5);
                      make.centerY.equalTo(view.super);
                    },
                    events: {
                      tapped(sender) {
                            $device.taptic(0);
                                       $widget.height = 181;
                                       $("mainbg").remove();
                                       var dataManager = require("../data-manager");
                                       dataManager.init(mode);
                                       var path = $app.env == $env.app ? "scripts/app" : "scripts/widget";
                                       var module = require(path);
                                       module.init(mode);
                                       $("input").text = $clipboard.text||"轻点输入.."
                                       $("input").textColor = $clipboard.text ==undefined ?$color("gray"):($clipboard.text.indexOf("\n")>=0?$color("#325793"):$color("black"))
                      }
                    }
                  },
                  {
                    type: "button",
                    props: {
                      icon: $icon("21", $color("tint"), iconSize),
                      bgcolor: $color("clear")
                    },
                    layout: (make, view) => {
                      make.left.equalTo($("CloseBtn").right).offset(20);
                      make.centerY.equalTo(view.super);
                    },
                    events: {
                      async tapped(sender) {
                        apartReset()
                        let info = content.replace(/[^A-Z\u4e00-\u9fa5]/ig," ")
                        $("matrix").data = await dataSource(info)
                      }
                    }
                  },
                  {
                    type: "label",
                    props: {
                      text: "分词",
                      font: $font("bold", fontSize),
                      textColor: $color("tint")
                    },
                    layout: (make, view) => {
                      make.center.equalTo(view.super);
                    },
                    events: {
                      async tapped(sender) {
                        apartReset()
                        $("matrix").data = await dataSource(content)
                      }
                    }
                  },

                  {
                    type: "button",
                    props: {
                      id: "ClipBtn",
                      icon: $icon("019", $color("tint"), iconSize),
                      bgcolor: $color("clear")
                    },
                    layout: (make, view) => {
                      make.right.equalTo(view.super).offset(-5);
                      make.centerY.equalTo(view.super);
                    },
                    events: {
                      tapped(sender) {
                        let text =  pickedText.join("");
                        if (text.length > 0) {
                          $clipboard.set({ type: "public.plain-text", value: text });
                          $ui.toast("已复制",0.3)
//                          goBack()
//                          $app.close()
                        } else {
                          showToastView("Not selected", 34, "225");
                          $device.taptic(0);
                        }
                      }
                    }
                  },
                  {
                    type: "button",
                    props: {
                      icon: $icon("023", $color("tint"), iconSize),
                      bgcolor: $color("clear")
                    },
                    layout: (make, view) => {
                      make.right.equalTo($("ClipBtn").left).offset(-20);
                      make.centerY.equalTo(view.super);
                    },
                    events: {
                      tapped(sender) {
//                        apartReset()
$device.taptic(0)
let text = $("CurrentTextLb").text
if ($detector.link(text) != "") {
//        
        $app.openURL($detector.link(text)[0]);
      } else{
        let link = "https://www.google.com/search?q="+encodeURI(text)+"&ie=UTF-8&oe=UTF-8&hl=en-cn&client=safari"
        $app.openURL(link)
      }
                      }
                    }
                  },
                  {
                    type: "label",
                    props: { bgcolor: $rgba(100, 100, 100, 0.25) },
                    layout: (make, view) => {
                      make.right.bottom.left.equalTo(view.super);
                      make.height.equalTo(0.3);
                    }
                  },
                ]
              },
              {
                type: "label",
                props: {
                  id: "CurrentTextLb",
                  text: "",
                  lines: 0,
                  font: $font(fontSize),
                  textColor: $color("white"),
                  align: $align.left,
                },
                layout: (make, view) => {
                  make.left.right.equalTo(view.super).inset(10)
                  make.top.equalTo($("NavigateBar").bottom).offset(5);
                }
              },
              {
                type: "matrix",
                props: {
                  bgcolor:$color("clear"),
                  spacing: fontSize / 3,
                  template: [
                    {
                      type: "label",
                      props: {
                        id: "tile",
                        radius: 5,
                        font: $font(fontSize),
                        scrollEnabled: 0,
                        bgcolor: $rgba(255, 255, 255, 0.28),
                        textColor: $color("#333"),
                        borderColor: $rgba(100, 100, 100, 0.25),
                        borderWidth: 0.4,
                        align: $align.center
                      },
                      layout: $layout.fill
                    }
                  ],
                  data: await dataSource(content)
                },
                layout: make => {
                  make.left.right.bottom.inset(0.2);
                  make.top.equalTo($("CurrentTextLb").bottom).offset(5);
                },
                events: {
                  didSelect: (sender, indexPath) => {
                    $device.taptic(0);
                    let cell = sender.cell(indexPath),
                        row = indexPath.row,
                        label = cell.get("tile");

                    let test = testRow(picked, row);
                    if (test >= 0) {
                      picked.splice(test, 1);
                      pickedText.splice(test, 1);
                      deselected(label);
                    } else {
                      picked.push(row);
                      pickedText.push(label.text);
                      selected(label);
                    }

                    $("CurrentTextLb").text = pickedText.join(" ")
                  },
                  itemSize: (sender, indexPath) => {
                    let data = sender.object(indexPath),
                        size = $text.sizeThatFits({
                          text: data.tile.text,
                          width: 320,
                          font: $font(fontSize)
                        });
                    return $size(size.width + fontSize, cellHeight);
                  },
                  forEachItem: function(view, indexPath) {
                    const row = indexPath.row;
                    let tile = view.get("tile");
                    if (picked.includes(row)) {
                      selected(tile);
                    } else {
                      deselected(tile);
                    }
                  },
                }
              }
            ]
          }
        ]
      }
    ]
  });

  function apartReset() {
    $device.taptic(0);

    for (let i of picked) {
      let cell = $("matrix").cell($indexPath(0, i));
      deselected(cell.get("tile"));
    }
    picked = [];
    pickedText = [];
    $("CurrentTextLb").text = ""
  };
}

function selected(label) {
  label.textColor = $color("white");
  label.bgcolor = $color("lightGray");
  label.borderColor = $color("gray");
  label.borderWidth = 1;
}

function deselected(label) {
  label.textColor = $color("#333");
  label.bgcolor = $rgba(255, 255, 255, 0.28);
  label.borderColor = $rgba(100, 100, 100, 0.25);
  label.borderWidth = 0.5;
}

function testRow(_picked, row) {
  let i = _picked.indexOf(row);
  if (i >= 0) return i;
}


module.exports = {
  run: run
}
