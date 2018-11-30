var languageKv = {
  "de-DE": "de",
  "en-US": "en",
  "en-GB": "en",
  "es-ES": "es",
  "ja-JP": "ja",
  "ko-KR": "ko",
  "pt-PT": "pt",
  "ru-RU": "ru",
  "zh-CN": "zh-CN",
  "zh-HK": "zh-HK",
  "zh-TW": "zh-TW"
};
$app.strings = {
  "zh-Hans": {
    "undefined": "未知",
    "auto": "自动",
    "de-DE": "德语",
    "en-US": "英语(美国)",
    "en-GB": "英语(英国)",
    "es-ES": "西班牙语",
    "fr-FR": "法语",
    "ja-JP": "日语",
    "ko-KR": "韩语",
    "pt-PT": "葡萄牙语",
    "ru-RU": "俄语",
    "zh-CN": "简体中文",
    "zh-HK": "繁中(香港)",
    "zh-TW": "繁中(台湾)"
  }
};
var transClang = Object.keys(languageKv);
var transClangCN = transClang.map(function(item) {
  return $l10n(item);
});
var addAuto = ["auto"];
var origClang = addAuto.concat(transClang);
var origClangCN = origClang.map(function(item) {
  return $l10n(item);
});
var origLg;
var transLg;
var origPD;
var transPD;

function transUI() {
  $widget.height = 400;
  $ui.render({
    type: "blur",
    props: {
      style: 1,
      id: "mainbg"
    },
    layout: $layout.fill,
    views: [
      {
        type: "view",
        props: {
          id: "mainvw",
          radius: 10,
          borderWidth: 0.4,
          borderColor: $rgba(100, 100, 100, 0.25)
        },
        layout: function(make, view) {
          make.top.bottom.left.right.inset(4);
        },
        views: [
          {
            type: "button",
            props: {
              id: "closebtn",
              bgcolor: $color("clear"),
              icon: $icon("225", $color("tint"), $size(18, 18))
            },
            layout: function(make, view) {
              make.top.inset(4);
              make.left.inset(6);
            },
            events: {
              tapped(sender) {
                $device.taptic(0);
                $widget.height = 181;
                $("mainbg").remove();
                var dataManager = require("../data-manager");
                dataManager.init();
                var path = $app.env == $env.today ? "../widget" : "../app";
                var module = require(path);
                module.init();
                $("input").text = $clipboard.text
              }
            }
          },
          {
            type: "button",
            props: {
              id: "kbbtn",
              bgcolor: $color("clear"),
              icon: $icon("010", $color("tint"), $size(18, 18))
            },
            layout: function(make, view) {
              make.top.inset(4);
              make.right.inset(6);
            },
            events: {
              tapped(sender) {
                $("originput").blur();
              }
            }
          },
          {
            type: "label",
            props: {
              textColor: $color("tint"),
              text: "谷歌翻译",
              font: $font("bold", 16),
              bgcolor: $color("clear"),
              align: $align.center
            },
            layout: function(make, view) {
              make.centerX.equalTo(view.super);
              make.top.inset(4);
            },
            events: {
              tapped(sender) {
                translate();
              }
            }
          },
          {
            type: "label",
            props: {
              id: "divideline",
              bgcolor: $rgba(100, 100, 100, 0.25)
            },
            layout: function(make, view) {
              make.top.equalTo($("closebtn").bottom).offset(3.6);
              make.right.left.inset(0);
              make.height.equalTo(0.4);
            }
          },
          {
            type: "view",
            props: {
              id: "iptvw"
            },
            layout: function(make, view) {
              make.left.right.inset(0);
              make.bottom.inset(28);
              make.top.equalTo($("divideline").bottom);
            },
            views: [
              {
                type: "view",
                props: {
                  id: "originputbg",
                  bgcolor: $rgba(200, 200, 200, 0.25)
                },
                layout: function(make, view) {
                  make.left.right.top.inset(0);
                  make.height.equalTo(view.super).multipliedBy(0.5);
                },
                views: [
                  {
                    type: "text",
                    props: {
                      id: "originput",
                      font: $font(12),
                      bgcolor: $color("clear")
                    },
                    layout: function(make, view) {
                      make.left.right.top.inset(0);
                      make.bottom.inset(5);
                    },
                    events: {
                      didChange: function(sender) {
                        if ($("originput").title === undefined) {
                          $("origbtn").title = $l10n("en-US");
                          $("transbtn").title = $l10n("zh-CN");
                          origLg = "en-US";
                          transLg = "zh-CN";
                        } else return;
                        translate();
                      }
                    }
                  }
                ]
              },
              {
                type: "view",
                props: {
                  bgcolor: $rgba(100, 100, 100, 0.15)
                },
                layout: function(make, view) {
                  make.left.right.bottom.inset(0);
                  make.top.equalTo($("originputbg").bottom);
                },
                views: [
                  {
                    type: "text",
                    props: {
                      id: "transinput",
                      editable: false,
                      font: $font(12),
                      bgcolor: $color("clear")
                    },
                    layout: function(make, view) {
                      make.left.right.top.inset(0);
                      make.bottom.inset(5);
                    }
                  }
                ]
              }
            ]
          },
          {
            type: "view",
            props: {
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.top.equalTo($("iptvw").bottom);
              make.right.left.bottom.inset(0);
            },
            views: [
              {
                type: "button",
                props: {
                  icon: $icon("019", $color("tint"), $size(18, 18)),
                  bgcolor: $color("clear")
                },
                layout: function(make, view) {
                  make.right.inset(6);
                  make.centerY.equalTo(view.super);
                },
                events: {
                  tapped(sender) {
                    var ttext = $("transinput").text;
                    if (ttext == "") {
                      return;
                    } else {
                      $clipboard.set({
                        "type": "public.plain-text",
                        "value": ttext
                      });
                      $("mainbg").remove();
                      $widget.height=181
                                      var dataManager = require("../data-manager");
                                      dataManager.init();
                                      var path = $app.env == $env.today ? "../widget" : "../app";
                                      var module = require(path);
                                      module.init();
                                      $("input").text = $clipboard.text
                                      $ui.toast("翻译结果已复制",0.3)
                    }
                  }
                }
              },
              {
                type: "button",
                props: {
                  icon: $icon("027", $color("tint"), $size(18, 18)),
                  bgcolor: $color("clear")
                },
                layout: function(make, view) {
                  make.left.inset(6);
                  make.centerY.equalTo(view.super);
                },
                events: {
                  tapped(sender) {
                    $device.taptic(0);
                    $("originput").text = "";
                    $("transinput").text = "";
                  }
                }
              },
              {
                type: "button",
                props: {
                  id: "convertbtn",
                  bgcolor: $color("clear"),
                  icon: $icon("162", $color("tint"), $size(18, 18))
                },
                layout: function(make, view) {
                  make.centerX.centerY.equalTo(view.super);
                },
                events: {
                  tapped(sender) {
                    var switchLg = $("origbtn").title;
                    $("origbtn").title = $("transbtn").title;
                    $("transbtn").title = switchLg;
                    var switchText = $("originput").text;
                    $("originput").text = $("transinput").text;
                    $("transinput").text = switchText;
                    var switchTextlg = origLg;
                    origLg = transLg;
                    transLg = switchTextlg;
                  },
                  longPressed: function(sender) {}
                }
              },
              {
                type: "button",
                props: {
                  id: "origbtn",
                  font: $font("bold", 14),
                  titleColor: $color("tint"),
                  bgcolor: $color("clear")
                },
                layout: function(make, view) {
                  make.centerY.equalTo(view.super);
                  make.right.equalTo($("convertbtn").left).inset(10);
                },
                events: {
                  tapped(sender) {
                    $("lgPVBg").hidden = false;
                  }
                }
              },
              {
                type: "button",
                props: {
                  id: "transbtn",
                  font: $font("bold", 14),
                  titleColor: $color("tint"),
                  bgcolor: $color("clear")
                },
                layout: function(make, view) {
                  make.centerY.equalTo(view.super);
                  make.left.equalTo($("convertbtn").right).inset(10);
                },
                events: {
                  tapped(sender) {
                    $("lgPVBg").hidden = false;
                  }
                }
              }
            ]
          },
          {
            type: "view",
            props: {
              id: "lgPVBg",
              bgcolor: $color("clear"),
              style: 4,
              hidden: true
            },
            events: {
              tapped: function(sender) {
                $("lgPVBg").hidden = true;
              }
            },
            views: [
              {
                type: "blur",
                props: {
                  id: "lgPickBg",
                  radius: 10,
                  borderWidth: 0.4,
                  borderColor: $rgba(100, 100, 100, 0.25),
                  style: 4
                },
                layout: function(make, view) {
                  make.height.equalTo(150);
                  make.width.equalTo(view.super.width);
                  make.bottom.inset(0);
                },
                views: [
                  {
                    type: "picker",
                    props: {
                      id: "lgPick",
                      items: [origClangCN, ["翻译为"], transClangCN]
                    },
                    layout: function(make, view) {
                      make.left.right.inset(20);
                      make.bottom.inset(0);
                      make.height.equalTo(view.super).multipliedBy(0.9);
                    },
                    events: {
                      changed: function(sender) {
                        $device.taptic(0);
                        for (var i in origClangCN) {
                          if (origClangCN[i] === sender.data[0]) {
                            origPD = origClang[i];
                          }
                        }
                        for (let i in transClangCN) {
                          if (transClangCN[i] === sender.data[2]) {
                            transPD = transClang[i];
                          }
                        }
                      }
                    }
                  },
                  {
                    type: "button",
                    props: {
                      title: "取消",
                      font: $font(14),
                      titleColor: $color("black"),
                      bgcolor: $color("clear")
                    },
                    layout: function(make, view) {
                      make.top.inset(2);
                      make.left.inset(4);
                    },
                    events: {
                      tapped: function(sender) {
                        $device.taptic(0);
                        $("lgPVBg").hidden = true;
                      }
                    }
                  },
                  {
                    type: "button",
                    props: {
                      title: "完成",
                      font: $font(14),
                      titleColor: $color("black"),
                      bgcolor: $color("clear")
                    },
                    layout: function(make, view) {
                      make.top.inset(2);
                      make.right.inset(4);
                    },
                    events: {
                      tapped: function(sender) {
                        $device.taptic(0);
                        langPick();
                        translate();
                      }
                    }
                  }
                ]
              }
            ],
            layout: $layout.fill
          }
        ]
      }
    ]
  });
}

function gtrans(text) {
  transUI();
  if (text) {
    $("originput").text = text;
    origLg = "auto";
    transLg = cnTest();
    translate();
  } else {
    $("origbtn").title = $l10n("en-US");
    $("transbtn").title = $l10n("zh-CN");
    origLg = "en-US";
    transLg = "zh-CN";
  }
}

function cnTest() {
  var cn = new RegExp("[\u4e00-\u9fa5]+");
  var slang = cn.test($("originput").text);
  if (slang == 0) {
     translang = "zh-CN";
  } else {
     translang = "en-US";
  }
  return translang;
}

function translate() {
  $ui.loading("Translating...");
  $http.request({
    method: "POST",
    url: "http://translate.google.cn/translate_a/single",
    header: {
      "User-Agent": "iOSTranslate",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: {
      "dt": "t",
      "q": $("originput").text,
      "tl": transLg,
      "ie": "UTF-8",
      "sl": origLg,
      "client": "ia",
      "dj": "1"
    },
    handler: function(resp) {
      $ui.loading(false);
      var data = resp.data.sentences;
      var orig = "";
      var trans = "";
      data.forEach(e => {
        orig = orig.concat(e.orig + "\n");
        trans = trans.concat(e.trans + "\n");
      });
      var src = resp.data.src || data.src;
      if (src == "en" || src == "es" || src == "fr" || src == "pt") {
        if (origLg == "auto") {
          $("origbtn").title = $l10n(getKeyByValue(src));
          origLg = getKeyByValue(src);
        }
      } else {
        $("origbtn").title = $l10n(getKeyByValue(src));
        origLg = getKeyByValue(src);
      }
      $("transinput").text = trans;
      $("transbtn").title = $l10n(transLg);
    }
  });
}

function langPick() {
  origLg = origPD || "auto";
  $("origbtn").title = $l10n(origLg);
  transLg = transPD || "de-DE";
  $("transbtn").title = $l10n(transLg);
  $("lgPVBg").hidden = true;
}

function getKeyByValue(value) {
  for (var i in languageKv) {
    if (languageKv[i] === value) {
      return i;
    }
  }
}

module.exports = {
  gtrans: gtrans
};
