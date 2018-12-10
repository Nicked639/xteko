$app.keyboardToolbarEnabled = true;
let typeOfTool = [
  {
    name: "MD5/SHA1/SHA256",
    id: "cvt0"
  },
  {
    name: "Base64编码解码",
    id: "cvt1"
  },
  {
    name: "URL编码解码",
    id: "cvt2"
  },
  {
    name: "颜色转换",
    id: "cvt3"
  },
  {
    name: "进制转换",
    id: "cvt4"
  },
  {
    name: "汉字转拼音",
    id: "cvt5"
  },
  {
    name: "人民币大小写",
    id: "cvt6"
  },
  {
    name: "字母类符号大小写",
    id: "cvt7"
  }
];
var le = require("../layout-utility");
var canvas = require("./canvas");
var markedView;
var typeNo = $cache.get("type") || 0;
var typeId = typeOfTool.map(function(item) {
  return item.id;
});

function show() {
  $ui.render({
    type: "blur",
    props: {
      id: "mainbg",
      style: 1
    },
    layout: $layout.fill,
    views: [
      {
        type: "view",
        props: {
          id: "mainvw",
          radius: 10,
          borderColor: $rgba(100, 100, 100, 0.25),
          borderWidth: 0.4
        },
        layout: function(make, view) {
          make.edges.inset(4);
        },
        views: [
          {
            type: "button",
            props: {
              id: "closebtn",
              bgcolor: $color("clear"),
              icon: $icon("225", $color("tint"), $size(20, 20))
            },
            layout: function(make, view) {
              make.top.left.inset(4);
            },
            events: {
              tapped: function(sender) {
                $device.taptic(0);
                $("mainbg").remove();
                var dataManager = require("../data-manager");
                dataManager.init();
                var path = $app.env == $env.app ? "scripts/app" : "scripts/widget";
                var module = require(path);
                module.init(mode);
              }
            }
          },
          {
            type: "label",
            props: {
              id: "title",
              text: typeOfTool[typeNo].name,
              textColor: $color("tint"),
              bgcolor: $color("clear"),
              font: $font("bold", 16)
            },
            layout: function(make, view) {
              le.textShadows(view, "tint");
              make.centerY.equalTo($("closebtn").centerY);
              make.centerX.equalTo(view.super);
              make.height.equalTo(22);
            },
            events: {
              tapped(sender) {
                convertMenu();
              }
            }
          },
          {
            type: "view",
            props: {
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.centerY.equalTo($("title").centerY);
              make.left.equalTo($("title").right).offset(0);
              make.size.equalTo($size(20, 20));
            },
            views: [
              canvas.triangle(10, "deltaDown", false, le),
              canvas.triangle(-10, "deltaUp", true, le)
            ],
            events: {
              tapped(sender) {
                convertMenu();
              }
            }
          },
          {
            type: "label", //分割线
            props: {
              id: "divideline",
              bgcolor: $rgba(100, 100, 100, 0.25)
            },
            layout: function(make, view) {
              make.left.right.inset(0);
              make.height.equalTo(0.4);
              make.top.inset(27.6);
            }
          },
          {
            type: "view", //转换界面父视图
            props: {
              id: "cvtsuper",
              bgcolor: $color("clear")
            },
            layout: convertLayout()
          },
          {
            type: "view",
            props: {
              id: "menubg",
              hidden: true,
              bgcolor: $color("clear")
            },
            layout: convertLayout(),
            events: {
              tapped(sender) {
                convertMenu();
              }
            }
          },
          {
            type: "list",
            props: {
              id: "menuView",
              hidden: true,
              alpha: 0,
              bgcolor: $rgba(255, 255, 255, 0.8),
              data: typeOfTool.map(function(item) {
                return item.name;
              }),
              radius: 10,
              borderColor: $rgba(100, 100, 100, 0.25),
              borderWidth: 0.4,
              showsVerticalIndicator: false,
              rowHeight: $app.env == $env.app ? 35 : 34,
              separatorColor: $rgba(100, 100, 100, 0.25),
              template: {
                props: {
                  textColor: $color("black"),
                  bgcolor: $color("clear"),
                  font: $font($app.env == $env.app ? 14 : 12)
                }
              }
            },
            layout: function(make, view) {
              make.centerX.equalTo(view.super);
              make.top.inset(32);
              $app.env == $env.today
                ? make.bottom.inset(4)
                : make.height.equalTo(280);
              make.width.equalTo(view.super).dividedBy(2);
            },
            events: {
              didSelect: function(sender, indexPath, data) {
                $device.taptic(0);
                $cache.set("type", indexPath.row);
                typeView.remove();
                typeNo = indexPath.row;
                $("title").text = data;
                convertMenu();
                coreFunction();
                typeView = $(typeId[indexPath.row]);
              }
            }
          }
        ]
      }
    ]
  });
  coreFunction();
  var typeView = $(typeId[typeNo]);
}

function convertMenu() {
  view = $("menuView");
  if (view.hidden == false) {
    $("deltaUp").hidden = true;
    $("deltaDown").hidden = false;
    $("menubg").hidden = true;
    $ui.animate({
      duration: 0.5,
      damping: 1,
      velocity: 1,
      animation: function() {
        view.relayout();
        view.alpha = 0;
      },
      completion: function() {
        view.hidden = true;
      }
    });
  } else {
    view.hidden = false;
    $("menubg").hidden = false;
    $("deltaDown").hidden = true;
    $("deltaUp").hidden = false;
    $ui.animate({
      duration: 0.3,
      damping: 1,
      velocity: 1,
      animation: function() {
        view.relayout();
        view.alpha = 1;
      }
    });
  }
}

function coreFunction() {
  if (typeNo == 0) {
    $("cvtsuper").add(mss());
  } else if (typeNo == 1) {
    $app.tips(
      "若仅有可输入内容的文本框，\n点击文本框上方空白处复制,\n双击清空文本框内容,\n长按粘贴剪贴板文本到文本框。\n其他情况点击转换结果或者按钮即可复制。"
    );
    $("cvtsuper").add(
      dencode(
        "cvt1",
        "Base64解码",
        "Base64编码",
        function(sender) {
          $("entext").text = $text.base64Encode(sender.text);
        },
        function(sender) {
          $("detext").text = $text.base64Decode(sender.text);
        }
      )
    );
  } else if (typeNo == 2) {
    $("cvtsuper").add(
      dencode(
        "cvt2",
        "URL解码",
        "URL编码",
        function(sender) {
          $("entext").text = $text.URLEncode(sender.text);
        },
        function(sender) {
          $("detext").text = $text.URLDecode(sender.text);
        }
      )
    );
  } else if (typeNo == 3) {
    $("cvtsuper").add(colorcvt());
    markedView = "";
  } else if (typeNo == 4) {
    $("cvtsuper").add(numcvt());
    markedView = "";
  } else if (typeNo == 5) {
    $("cvtsuper").add(
      dencode("cvt5", "汉字", "拼音", function(sender) {
        $("entext").text = $text.convertToPinYin(sender.text);
      })
    );
    $("entext").editable = false;
  } else if (typeNo == 6) {
    $("cvtsuper").add(
      dencode(
        "cvt6",
        "小写",
        "大写",
        function(sender) {
          $("entext").text = formatRMB(sender.text);
        },
        function(sender) {
          $("detext").text = parseRMB(sender.text);
        }
      )
    );
  } else {
    $("cvtsuper").add(
      dencode(
        "cvt7",
        "小写",
        "大写",
        function(sender) {
          $("entext").text = sender.text.toLocaleUpperCase();
        },
        function(sender) {
          $("detext").text = sender.text.toLocaleLowerCase();
        }
      )
    );
  }
}

function convertLayout() {
  return function(make, view) {
    make.left.right.bottom.inset(0);
    make.top.inset(28);
  };
}

//md5 sha1 sha256
function mss() {
  var topView;
  return {
    type: "view",
    props: {
      id: "cvt0",
      bgcolor: $color("clear")
    },
    views: [
      {
        type: "input",
        props: {
          id: "mssinput",
          bgcolor: $rgba(200, 200, 200, 0.25),
          radius: 5,
          borderWidth: 0.4,
          borderColor: $rgba(100, 100, 100, 0.25),
          placeholder: "点击下方结果复制,点击下方空白粘贴剪贴板文本…",
          font: $font(12.5),
//          accessoryView:{
//            type:"view",
//            props: {
//              bgcolor:$color("red"),
//              height:40
//            }
//          }
        },
        layout: function(make, view) {
          make.right.left.inset(6);
          make.height.equalTo(28);
          make.top.inset(5);
        },
        events: {
          returned: function(sender) {
            sender.blur();
          },
          changed: function(sender) {
            text = sender.text;
            $("md5").text = $text.MD5(text);
            $("sha1").text = $text.SHA1(text);
            $("sha256").text = $text.SHA256(text);
          }
        }
      },
      {
        type: "scroll",
        props: {
          bgcolor: $color("clear"),
          showsVerticalIndicator: false,
          contentSize: $size(0, 216),
          pagingEnabled: true,
          alwaysBounceVertical: true,
          scrollEnabled: true
        },
        views: [
          {
            type: "label",
            props: {
              text: "MD5",
              font: $font(12.5),
              textColor: $color("darkGray")
            },
            layout: function(make, view) {
              make.top.inset(5);
              make.left.inset(8);
              topView = view;
            }
          },
          mssText("md5", function(make, view) {
            make.right.left.inset(6);
            make.top.equalTo(topView.bottom).offset(5);
            make.centerX.equalTo(view.super);
            make.height.equalTo(28);
            topView = view;
          }),
          {
            type: "label",
            props: {
              text: "SHA1",
              font: $font(12.5),
              textColor: $color("darkGray")
            },
            layout: function(make, view) {
              make.top.equalTo(topView.bottom).offset(5);
              make.left.inset(8);
              topView = view;
            }
          },
          mssText("sha1", function(make, view) {
            make.right.left.inset(6);
            make.top.equalTo(topView.bottom).offset(5);
            make.centerX.equalTo(view.super);
            make.height.equalTo(28);
            topView = view;
          }),
          {
            type: "label",
            props: {
              text: "SHA256",
              font: $font(12.5),
              textColor: $color("darkGray")
            },
            layout: function(make, view) {
              make.top
                .equalTo(topView.bottom)
                .offset($app.env == $env.app ? 5 : 19);
              make.left.inset(8);
              topView = view;
            }
          },
          mssText("sha256", function(make, view) {
            make.right.left.inset(6);
            make.top.equalTo(topView.bottom).offset(5);
            make.centerX.equalTo(view.super);
            make.height.equalTo(44);
            make.bottom.inset(33);
          })
        ],
        layout: function(make, view) {
          make.top.equalTo($("mssinput").bottom).offset(0);
          make.left.right.bottom.inset(0);
        }
      },{
        type:"view",
        props: {
          bgcolor:$color("clear")
        },
        layout: function(make, view) {
          make.top.equalTo($("mssinput").bottom)
          make.height.equalTo(25)
          make.left.right.inset(8)
        },
        events: {
          tapped(sender){
            ipt = $("mssinput")
            if ($clipboard.text !== undefined && $clipboard.text != ""){
              ipt.text = $clipboard.text
              ipt.runtimeValue().$insertText("")
            } else $ui.error("剪贴板无内容",0.3)
          }
        }
      }
    ],
    layout: $layout.fill
  };
}

function mssText(id, layout) {
  return {
    type: "text",
    props: {
      id: id,
      radius: 5,
      editable: false,
      font: $font(12.5),
      showsVerticalIndicator: false,
      bgcolor: $rgba(200, 200, 200, 0.25),
      borderWidth: 0.4,
      borderColor: $rgba(100, 100, 100, 0.25)
    },
    layout: layout,
    events: {
      tapped(sender) {
        if (sender.text != "") {
              $clipboard.text = sender.text;
              $("input").text = sender.text;
              $ui.toast("已复制",0.5);
        } else return;
      }
    }
  };
}

function dencode(id, t1, t2, h1, h2) {
  return {
    type: "view",
    props: {
      id: id,
      bgcolor: $color("clear")
    },
    layout: $layout.fill,
    views: [
      {
        type: "label",
        props: {
          id: "delb",
          text: t1,
          font: $font(12.5),
          textColor: $color("darkGray")
        },
        layout: function(make, view) {
          make.top.inset(5);
          make.left.inset(8);
        }
      },
      {
        type: "text",
        props: {
          id: "detext",
          type: id == "cvt6" ? $kbType.decimal : $kbType.default,
          showsVerticalIndicator: false,
          bgcolor: $rgba(200, 200, 200, 0.25),
          radius: 5,
          borderWidth: 0.4,
          borderColor: $rgba(100, 100, 100, 0.25),
          font: $font(12.5)
        },
        layout: function(make, view) {
          make.right.left.inset(6);
          make.top.equalTo($("delb").bottom).offset(5);
          make.height.equalTo(44);
        },
        events: {
          returned: function(sender) {
            sender.blur();
          },
          changed: h1,
          tapped(sender) {
            sender.focus();
          }
        }
      },
      {
        type: "label",
        props: {
          id: "enlb",
          text: t2,
          font: $font(12.5),
          textColor: $color("darkGray")
        },
        layout: function(make, view) {
          make.top.equalTo($("detext").bottom).offset(5);
          make.left.inset(8);
        }
      },
      {
        type: "text",
        props: {
          id: "entext",
          type: id == "cvt6" ? $kbType.default : $kbType.ascii,
          showsVerticalIndicator: false,
          bgcolor: $rgba(200, 200, 200, 0.25),
          radius: 5,
          borderWidth: 0.4,
          borderColor: $rgba(100, 100, 100, 0.25),
          font: $font(12.5)
        },
        layout: function(make, view) {
          make.right.left.inset(6);
          make.top.equalTo($("enlb").bottom).offset(5);
          make.height.equalTo(44);
        },
        events: {
          returned: function(sender) {
            sender.blur();
          },
          changed: h2,
          tapped(sender) {
            if ($("enlb").text == "拼音" && sender.text != "") {
              $clipboard.text = sender.text;
              $("input").text = sender.text;
              $ui.toast("已复制",0.5);
            } else sender.focus()
          }
        }
      },
      dencodeCopy("delb", "detext"),
      dencodeCopy("enlb", "entext")
    ]
  };
}

function dencodeCopy(id, id2) {
  return {
    type: "view",
    props: {
      bgcolor: $color("clear")
    },
    layout: function(make) {
      make.right.inset(8);
      make.left.equalTo($(id).right);
      make.height.centerY.equalTo($(id));
    },
    events: {
      tapped(sender) {
        if ($(id2).text != "") {
          $device.taptic(0);
              $clipboard.text = sender.text;
              $("input").text = sender.text;
              $ui.toast("已复制",0.5);
        } else return;
      },
      doubleTapped: function(sender) {
        $("detext").text = "";
        $("entext").text = "";
      },
      longPressed:function(sender){
        if ($clipboard.text != "" && $clipboard.text !== undefined){
          $(id2).text = $clipboard.text
          $(id2).runtimeValue().$insertText("")
        } else $ui.error("剪贴板无文本",0.3)
      }
    }
  };
}
//RGB HEX
function colorcvt() {
  return {
    type: "view",
    props: {
      id: "cvt3",
      bgcolor: $color("clear")
    },
    layout: function(make) {
      make.left.right.inset(5);
      make.top.bottom.inset(0);
    },
    views: [
      colorIpt("Red", function(make, view) {
        make.left.inset(5);
        make.top.inset(35);
        make.height.equalTo(32);
        make.width
          .equalTo(view.super)
          .multipliedBy(0.25)
          .offset(-10);
        markedView = view;
      }),
      colorIpt("Green", colorLayout(-1)),
      colorIpt("Blue", colorLayout(-1)),
      colorBTN("RGB", colorLayout(-1), function(sender) {
        showRgbCopyMenu();
      }),
      colorBTN(
        "HEX",
        function(make, view) {
          make.right.inset(5);
          make.size.equalTo(markedView);
          make.top.equalTo(markedView.bottom).offset(10);
          markedView = view;
        },
        function(sender) {
          if ($("Hex").text != "") {
            showHexCopyMenu();
          } else return;
        }
      ),
      colorIpt("Hex", function(make, view) {
        make.left.inset(5);
        make.height.centerY.equalTo(markedView);
        make.right.equalTo(markedView.left).offset(-10);
      })
    ]
  };
}

function colorBTN(title, layout, handler) {
  return {
    type: "button",
    props: {
      title: title,
      titleColor: $color("tint"),
      font: $font("bold", 15),
      bgcolor: $rgba(255, 255, 255, 0.25),
      borderWidth: 0.8,
      radius: 5,
      borderColor: $rgba(100, 100, 100, 0.25)
    },
    layout: layout,
    events: {
      tapped: handler
    }
  };
}

function colorIpt(id, layout) {
  return {
    type: "input",
    props: {
      id: id,
      placeholder: id,
      align: $align.center,
      type: id == "Hex" ? $kbType.ascii : $kbType.number,
      bgcolor: $rgba(200, 200, 200, 0.25),
      radius: 5,
      borderWidth: 0.4,
      borderColor: $rgba(100, 100, 100, 0.25),
      font: $font(15)
    },
    layout: layout,
    events: {
      returned: function(sender) {
        sender.blur();
      },
      changed: function(sender) {
        if (id == "Hex") {
          var text = sender.text.match(/^[0-9a-fA-F]{0,6}$/) || "";
          sender.text = (text === "" ? "" : text[0]).toUpperCase();
          hexToRgb();
        } else {
          if (sender.text >= 256) {
            sender.text = "";
          } else rgbToHex();
        }
      }
    }
  };
}

function colorLayout(i) {
  return function(make, view) {
    make.left.equalTo(markedView.right).offset(10);
    make.top.inset(35);
    make.size.equalTo(markedView);
    markedView = view;
  };
}

function rgbToHex() {
  function convert(id) {
    return (256 + Number($(id).text))
      .toString(16)
      .slice(1)
      .toUpperCase();
  }
  $("Hex").text = convert("Red") + convert("Green") + convert("Blue");
}

function showRgbCopyMenu() {
  var red = $("Red").text;
  var green = $("Green").text;
  var blue = $("Blue").text;
  if (red != "" && green != "" && blue != "") {
    $ui.menu({
      items: [
        "rgb(" + red + ", " + green + ", " + blue + ")",
        red + ", " + green + ", " + blue
      ],
      handler: function(title) {
              $clipboard.text = title
              $("input").text = title
              $ui.toast("已复制",0.5);
      }
    });
  } else return;
}

function hexToRgb() {
  var hex = parseInt($("Hex").text, 16);
  $("Red").text = ("" + (hex & 0xff0000)) >> 16;
  $("Green").text = ("" + (hex & 0xff00)) >> 8;
  $("Blue").text = "" + (hex & 0xff);
}

function showHexCopyMenu() {
  var value = $("Hex").text;
  $ui.menu({
    items: ["#" + value, "0x" + value],
    handler: function(title) {
              $clipboard.text = title
              $("input").text = title
              $ui.toast("已复制",0.5);
    }
  });
}
//进制转换
function numcvt() {
  return {
    type: "view",
    props: {
      id: "cvt4",
      bgcolor: $color("clear")
    },
    layout: $layout.fill,
    views: [
      numBTN("DEC"),
      numIpt("dec", 10),
      numBTN("OCT"),
      numIpt("oct", 8),
      numBTN("BIN"),
      numIpt("bin", 2),
      numBTN("HEX"),
      numIpt("hex", 16)
    ]
  };
}

function numBTN(title) {
  return {
    type: "button",
    props: {
      title: title,
      titleColor: $color("tint"),
      font: $font("bold", 12.5),
      bgcolor: $rgba(255, 255, 255, 0.25),
      borderWidth: 0.8,
      radius: 5,
      borderColor: $rgba(100, 100, 100, 0.25)
    },
    layout: function(make, view) {
      if (markedView) {
        make.top.equalTo(markedView.bottom).offset(8);
      } else {
        make.top.inset(8);
      }
      make.right.inset(8);
      make.height.equalTo(26);
      make.width.equalTo(36);
      markedView = view;
    },
    events: {
      tapped: function(sender) {
        var inputView = $(title.toLowerCase()).text;
        if (inputView != "") {
              $clipboard.text = inputView
              $("input").text = inputView
              $ui.toast("已复制",0.5);
        } else return;
      }
    }
  };
}

function numIpt(id, radix, handler) {
  return {
    type: "input",
    props: {
      id: id,
      type: id == "hex" ? $kbType.ascii : $kbType.number,
      bgcolor: $rgba(200, 200, 200, 0.25),
      radius: 5,
      borderWidth: 0.4,
      borderColor: $rgba(100, 100, 100, 0.25),
      font: $font(12.5)
    },
    layout: function(make, view) {
      make.left.inset(8);
      make.centerY.equalTo(markedView.centerY);
      make.right.equalTo(markedView.left).offset(-8);
      make.height.equalTo(26);
    },
    events: {
      returned: function(sender) {
        sender.blur();
      },
      changed: function(sender) {
        numChanged(sender.text, radix);
      }
    }
  };
}

function numChanged(num, radix) {
  var number = parseInt(num, radix);
  var bases = [
    { radix: 10, view: $("dec") },
    { radix: 8, view: $("oct") },
    { radix: 2, view: $("bin") },
    { radix: 16, view: $("hex") }
  ];
  bases.forEach(function(item) {
    item.view.text = isNaN(number)
      ? ""
      : number.toString(item.radix).toUpperCase();
  });
}
//RMB
var c = "零壹贰叁肆伍陆柒捌玖".split("");
// ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"]
var _c = {}; // 反向对应关系
for (var i = 0; i < c.length; i++) {
  _c[c[i]] = i;
}
var d = "元***万***亿***万";
var e = ",拾,佰,仟".split(",");

function unit4(arr) {
  var str = "",
    i = 0;
  while (arr.length) {
    var t = arr.pop();
    str = c[t] + (t == 0 ? "" : e[i]) + str;
    i++;
  }
  str = str.replace(/[零]{2,}/g, "零");
  str = str.replace(/^[零]/, "");
  str = str.replace(/[零]$/, "");
  if (str.indexOf("零") == 0) {
    str = str.substring(1);
  }
  if (str.lastIndexOf("零") == str.length - 1) {
    str = str.substring(0, str.length - 1);
  }
  return str;
}

function _formatD(a) {
  // 转化整数部分
  var arr = a.split(""),
    i = 0,
    result = "";
  while (arr.length) {
    var arr1 = arr.splice(-4, 4);
    var dw = d.charAt(i),
      unit = unit4(arr1);
    if (dw == "万" && !unit) {
      dw = "";
    }
    result = unit + dw + result;
    i += 4;
  }
  return result == "元" ? "" : result;
}
function _formatF(b) {
  // 转化小数部分
  b = b || "";
  switch (b.length) {
    case 0:
      return "整";
    case 1:
      return c[b] + "角";
    default:
      return c[b.charAt(0)] + "角" + c[b.charAt(1)] + "分";
  }
}

function _format(n) {
  var a = ("" + n).split("."),
    a0 = a[0],
    a1 = a[1];
  return _formatD(a0) + _formatF(a1);
}

function parse4(u4) {
  var res = 0;
  while ((t = /([零壹贰叁肆伍陆柒捌玖])([拾佰仟]?)/g.exec(u4))) {
    var n = _c[t[1]],
      d = {
        "": 1,
        "拾": 10,
        "佰": 100,
        "仟": 1000
      }[t[2]];
    res += n * d;
    u4 = u4.replace(t[0], "");
  }
  var result = "0000" + res;
  return result.substring(result.length - 4);
}

function _parseD(d) {
  var arr = d.replace(/[零]/g, "").split(/[万亿]/),
    rs = "";
  for (var i = 0; i < arr.length; i++) {
    rs += parse4(arr[i]);
  }
  return rs.replace(/^[0]+/, "");
}
function _parseF(f) {
  var res = "",
    t = f.replace(/[^零壹贰叁肆伍陆柒捌玖]+/g, "").split(""); // 去掉单位
  if (t.length) {
    res = ".";
  } else {
    return "";
  }
  for (var i = 0; i < t.length && i < 2; i++) {
    res += _c[t[i]];
  }
  return res;
}
function _parse(rmb) {
  var a = rmb.split("元"),
    a1 = a[1],
    a0 = a[0];
  if (a.length == 1) {
    a1 = a0;
    a0 = "";
  }
  return _parseD(a0) + _parseF(a1);
}
//小写转大写
function formatRMB(num) {
  if (num.length == 0) {
    return "";
  }
  var n = Number(num);
  if (!isNaN(num)) {
    if (num == 0) {
      return "零元整";
    } else {
      return _format(n);
    }
  } else {
    return "";
  }
}
//大写转小写
function parseRMB(rmb) {
  if (/^[零壹贰叁肆伍陆柒捌玖元万亿拾佰仟角分整]{2,}$/.test(rmb)) {
    var result = _parse(rmb);
    return rmb == formatRMB(result) ? result : result + "(?)";
  } else {
    return "";
  }
}

module.exports = {
  run: show
};
