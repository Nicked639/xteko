var tabEngines = [
  {
    name: "必应",
    pattern: "bing"
  },
  {
    name: "扇贝",
    pattern: "shanbei"
  },
  {
    name: "金山",
    pattern: "kingsoft"
  },
  {
    name: "谷歌",
    pattern: "google"
  }
];

var searchEngines = [
  {
    name: "M-W",
    pattern: "http://merriam-webster.com/dictionary/"
  },
  {
    name: "Oxford",
    pattern: "https://www.oxfordlearnersdictionaries.com/us/definition/english/"
  },
  {
    name: "Collins",
    pattern: "https://www.collinsdictionary.com/dictionary/english/"
  },
  {
    name: "Free Dictionary",
    pattern: "http://idioms.thefreedictionary.com/"
  },
  {
    name: "Urban",
    pattern: "https://www.urbandictionary.com/define.php?term="
  },
  {
    name: "有道词典",
    pattern: "http://m.youdao.com/dict?le=eng&q="
  }
];

function show() {
  $ui.window.add({
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
          radius: 10,
          bgcolor: $color("clear"),
          borderWidth: 0.4,
          borderColor: $rgba(100, 100, 100, 0.25)
        },
        layout: function(make, view) {
          make.top.right.left.bottom.inset(4);
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
              make.top.left.inset(6);
            },
            events: {
              tapped(sender) {
                $device.taptic(0);
                $("mainbg").remove();
              }
            }
          },
          {
            type: "input",
            props: {
              id: "wordsearch",
              font: $font(14),
              placeholder: "输入单词或词语查询…",
              bgcolor: $rgba(200, 200, 200, 0.25),
              borderWidth: 0.4,
              borderColor: $rgba(100, 100, 100, 0.25)
            },
            layout: function(make, view) {
              make.top.inset(5);
              make.height.equalTo(24);
              make.left.equalTo($("closebtn").right).offset(10);
              make.width.equalTo(view.super.width).dividedBy(2);
            },
            events: {
              returned: function(sender) {
                $("wordsearch").blur();
                translate(sender.text);
              }
            }
          },
          {
            type: "button",
            props: {
              id: "copybtn",
              icon: $icon("019", $color("tint"), $size(18, 18)),
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.right.top.inset(6);
            },
            events: {
              tapped(sender) {
                if ($("result").text != "") {
                  $clipboard.set({
                    "type": "public.plain-text",
                    "value": $("result").text
                  });
                  $("mainbg").remove();
                  $widget.height = 181;
                  var dataManager = require("../data-manager");
                  dataManager.init();
                  var path = $app.env == $env.today ? "../widget" : "../app";
                  var module = require(path);
                  module.init();
                  $("input").text = $clipboard.text;
                  $ui.toast("翻译结果已复制", 0.3);
                } else return;
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
              make.top.inset(6);
              make.right.inset(38);
            },
            events: {
              tapped(sender) {
                if ($("wordsearch").editing == true) {
                  $("wordsearch").blur();
                } else $("wordsearch").focus();
              }
            }
          },
          {
            type: "label",
            props: {
              textColor: $color("tint"),
              text: "英汉词典",
              font: $font("bold", 15),
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.left.equalTo($("wordsearch").right).offset(10),
                make.top.inset(7);
            },
            events: {
              tapped(sender) {
                if ($("wordsearch").editing == true) {
                  if ($("wordsearch").text === "") {
                    return;
                  } else translate($("wordsearch").text);
                } else {
                  $("wordsearch").text = "";
                  $("result").text = "";
                }
              }
            }
          },
          {
            type: "label",
            props: {
              bgcolor: $rgba(100, 100, 100, 0.25)
            },
            layout: function(make, view) {
              make.left.right.inset(0),
                make.top.equalTo($("closebtn").bottom).offset(5.6),
                make.height.equalTo(0.4);
            }
          },
          {
            type: "view",
            props: {
              bgcolor: $rgba(200, 200, 200, 0.25)
            },
            layout: function(make, view) {
              make.top.inset(34);
              make.left.right.bottom.inset(0);
            },
            views: [
              {
                type: "text",
                props: {
                  radius: 10,
                  font: $font(12),
                  id: "result",
                  editable: false,
                  bgcolor: $color("clear")
                },
                layout: function(make, view) {
                  make.left.right.top.inset(4);
                  make.bottom.inset(34);
                },
                events: {
                  tapped(sender) {}
                }
              },
              {
                type: "tab",
                props: {
                  bgcolor: $color("clear"),
                  font: $font(14),
                  items: tabEngines.map(function(item) {
                    return item.name;
                  })
                },
                layout: function(make, view) {
                  make.left.inset(6),
                    make.top.equalTo($("result").bottom).offset(6);
                  make.height.equalTo(22),
                    make.width.equalTo(view.super).multipliedBy(0.5);
                },
                events: {
                  changed: function(sender) {
                    var engine = tabEngines[sender.index].pattern;
                    $cache.set("engine", engine);
                    $cache.remove("textSound");
                    $("result").text = "";
                    if ($("wordsearch").text === "") {
                      return;
                    } else {
                      translate($("wordsearch").text);
                    }
                  }
                }
              },
              {
                type: "button",
                props: {
                  bgcolor: $color("clear"),
                  icon: $icon("042", $color("tint"), $size(18, 18))
                },
                layout: function(make, view) {
                  make.right.inset(6);
                  make.top.equalTo($("result").bottom).offset(6);
                },
                events: {
                  tapped(sender) {
                    if ($("wordsearch").text != "") {
                      searchMore($("wordsearch").text);
                    } else return;
                  }
                }
              },
              {
                type: "button",
                props: {
                  id: "speechbtn",
                  hidden: false,
                  bgcolor: $color("clear"),
                  icon: $icon("012", $color("tint"), $size(18, 18))
                },
                layout: function(make, view) {
                  make.right.inset(38);
                  make.top.equalTo($("result").bottom).offset(6);
                },
                events: {
                  tapped(sender) {
                    $device.taptic(0);
                    let sound = $cache.get("textSound");
                    if (sound != undefined && sound.length == 2) {
                      $audio.play({
                        url: sound[0],
                        events: {
                          didPlayToEndTime: function() {
                            $audio.play({ url: sound[1] });
                          }
                        }
                      });
                    } else {
                      if ($("result").text === "") {
                        return;
                      } else {
                        $ui.toast("系统TTS", 0.3);
                        speechText($("wordsearch").text);
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  });
}
//TTS
function speechText(text) {
  let lan = whichLan(text);
  let rate = 0.5;
  if (lan == "en") {
    lan = "en-US";
    rate = 0.4;
  }
  $text.speech({
    text: text,
    rate: rate,
    language: lan
  });
}

function translate(text) {
  $cache.remove("textSound");
  var engine = $cache.get("engine", engine) || "bing";
  if (engine == "bing") {
    bingtrans(text);
  } else if (engine == "shanbei") {
    shanbeitrans(text);
  } else if (engine == "kingsoft") {
    kingsofttrans(text);
  } else googletrans(text);
}
//必应翻译
function bingtrans(text) {
  let url =
    "http://xtk.azurewebsites.net/BingDictService.aspx?Word=" +
    text +
    "&Samples=false";
  let codeUrl = encodeURI(url);
  $http.request({
    method: "GET",
    url: codeUrl,
    timeout: 5,
    handler: function(resp) {
      let data = resp.data;
      console.info(data);
      if (!resp.data.hasOwnProperty("defs")) {
        if (resp.data.indexOf("An error occurs") >= 0) {
          $ui.error("请检查输入内容", 0.5);
        }
      } else if (data.defs == null) {
        $("result").text = "未查询到";
      } else {
        let length = data.defs.length;
        let meanText = "";
        for (let i = 0; i < length; i++) {
          meanText += data.defs[i].pos;
          meanText += " ";
          meanText += data.defs[i].def;
          meanText += ";";
          if (i < length - 1) {
            meanText += "\n";
          }
        }
        if (data.pronunciation === null || data.pronunciation.BrE === null) {
          $("result").text = meanText;
        } else {
          $("result").text =
            "BrE /" +
            data.pronunciation.BrE +
            "/   AmE /" +
            data.pronunciation.AmE +
            "/\n" +
            meanText;
        }
      }
      if (data.pronunciation != null) {
        $cache.set("textSound", [
          data.pronunciation.AmEmp3,
          data.pronunciation.BrEmp3
        ]);
      } else return;
    }
  });
}
//扇贝接口
function shanbeitrans(text) {
  $http.request({
    method: "GET",
    url: "https://api.shanbay.com/bdc/search/?word=" + text,
    timeout: 5,
    handler: function(resp) {
      var data = resp.data;
      console.log(data);
      if (data == "") {
        $ui.error("请检查输入内容,该API不支持汉译英");
      } else if (data.msg != "SUCCESS") {
        $("result").text = data.msg;
      } else {
        $("result").text =
          "BrE /" +
          data.data.pronunciations.uk +
          "/   AmE /" +
          data.data.pronunciations.us +
          "/\n" +
          data.data.definition;
      }
      var uss = data.data.audio_addresses.us[0];
      var uks = data.data.audio_addresses.uk[0];
      $cache.set("textSound", [uss, uks]);
    }
  });
}
//金山词霸
function kingsofttrans(text) {
  let url =
    "http://dict-mobile.iciba.com/interface/index.php?c=word&m=getsuggest&nums=1&client=6&is_need_mean=1&word=" +
    text;
  let codeUrl = encodeURI(url);
  $http.get({
    url: codeUrl,
    timeout: 5,
    handler: function(resp) {
      $console.info(resp);
      let data = resp.data.message[0];
      if (resp.data.status == 1) {
        let length = data.means.length;
        let meanText = "";
        for (let i = 0; i < length; i++) {
          meanText += data.means[i].part;
          meanText += " ";
          let meansLength = data.means[i].means.length;
          for (let j = 0; j < meansLength; j++) {
            meanText += data.means[i].means[j];
            meanText += "; ";
          }
          if (i < length - 1) {
            meanText += "\n";
          }
        }
        if ($("wordsearch").text == data.key) {
          $("result").text = meanText;
        } else {
          $("result").text =
            "提示:查询到与键入内容不符的单词 [ " + data.key + " ]\n" + meanText;
        }
      } else $ui.error("请检查输入内容");
    }
  });
}
//谷歌翻译
function googletrans(text) {
  let sl = whichLan(text);
  let tl = "";
  if (sl == "en") {
    tl = "zh-CN";
  } else {
    tl = "en";
  }
  $http.request({
    method: "POST",
    url: "http://translate.google.cn/translate_a/single",
    timeout: 5,
    header: {
      "User-Agent": "iOSTranslate",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: {
      "dt": "t",
      "q": text,
      "tl": tl,
      "ie": "UTF-8",
      "sl": sl,
      "client": "ia",
      "dj": "1"
    },
    showsProgress: false,
    handler: function(resp) {
      let data = resp.data;
      console.log(data);
      let length = data.sentences.length;
      if (length != undefined) {
        let meanText = " ";
        for (let i = 0; i < length; i++) {
          meanText += data.sentences[i].trans;
          if (i < length - 1) {
            meanText += "\n";
          }
        }
        $("result").text = meanText;
      }
    }
  });
}

function whichLan(text) {
  let englishChar = text.match(/[a-zA-Z]/g);
  let englishNumber = !englishChar ? 0 : englishChar.length;
  let chineseChar = text.match(/[\u4e00-\u9fff\uf900-\ufaff]/g);
  let chineseNumber = !chineseChar ? 0 : chineseChar.length;
  let tl = "en";
  if (chineseNumber * 2 >= englishNumber) {
    tl = "zh-CN";
  } else {
    tl = "en";
  }
  return tl;
}

function searchMore(text) {
  $ui.menu({
    items: searchEngines.map(function(item) {
      return item.name;
    }),
    handler: function(title, idx) {
      $thread.main({
        delay: 0.4,
        handler: function() {
          search(searchEngines[idx].pattern, text);
        }
      });
    }
  });
}

function search(pattern, text) {
  $app.openURL(pattern + encodeURIComponent(text));
}

function dic(text) {
  $cache.remove("engine");
  $cache.remove("textSound");
  show();
  $("wordsearch").text = text;
  translate(text);
}

module.exports = {
  dic: dic
};
