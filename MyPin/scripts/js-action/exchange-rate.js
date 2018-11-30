$app.strings = {
    "zh-Hans":{
    "name-eur": "🇪🇺 欧元",
    "name-cny": "🇨🇳 人民币",
    "name-hkd": "🇭🇰 港币",
    "name-usd": "🇺🇸 美元",
    "name-gbp": "🇬🇧 英镑",
    "name-jpy": "🇯🇵 日元",
    "name-inr": "🇮🇳 印度卢比",
    "name-aud": "🇦🇺 澳元",
    "name-cad": "🇨🇦 加拿大元",
    "name-sgd": "🇸🇬 新加坡元",
    "name-chf": "🇨🇭 瑞士法郎",
    "name-myr": "🇲🇾 马来林吉特",
    "name-thb": "🇹🇭 泰铢",
    "name-krw": "🇰🇷 韩元",
    "name-bgn": "🇧🇬 保加利亚列弗",
    "name-brl": "🇧🇷 巴西雷亚尔",
    "name-czk": "🇨🇿 捷克克朗",
    "name-dkk": "🇩🇰 丹麦克郎",
    "name-hrk": "🇭🇷 克罗地亚库那",
    "name-huf": "🇭🇺 匈牙利福林",
    "name-idr": "🇮🇩 印尼卢比",
    "name-ils": "🇮🇱 以色列镑",
    "name-mxn": "🇲🇽 墨西哥比索",
    "name-nok": "🇳🇴 挪威克郎",
    "name-nzd": "🇳🇿 新西兰元",
    "name-php": "🇵🇭 菲律宾比索",
    "name-pln": "🇵🇱 波兰兹罗提",
    "name-ron": "🇷🇴 罗马尼亚列伊",
    "name-rub": "🇷🇺 俄罗斯卢布",
    "name-sek": "🇸🇪 瑞典克郎",
    "name-try": "🇹🇷 土耳其里拉",
    "name-zar": "🇿🇦 南非兰特"
  }
}
var symbols = [
  "EUR",
  "CNY",
  "HKD",
  "USD",
  "GBP",
  "JPY",
  "INR",
  "AUD",
  "CAD",
  "SGD",
  "CHF",
  "MYR",
  "THB",
  "KRW",
  "BGN",
  "BRL",
  "CZK",
  "DKK",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "MXN",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "RUB",
  "SEK",
  "TRY",
  "ZAR"
];

var names = symbols.map(function(item) {
  return $l10n("name-" + item.toLowerCase());
});

var rates = {};
var selectedIndex = $cache.get("selected-index") || 0;

var money = ""
function show() {
  $ui.window.add({
    type: "blur",
    props: {
      id: "exr",
      style: 1
    },
    layout: $layout.fill,
    views: [{
      type: "view",
      props: {
        id: "exrview",
        bgcolor: $app.env == $env.today ?
          $rgba(200, 200, 200, 0.25) :
          $color("white"),
        radius: 10,
        borderWidth: 0.4,
        borderColor: $rgba(100, 100, 100, 0.25)
      },
      layout: function(make, view) {
        make.left.right.top.bottom.inset(4);
      },
      views: [{
          type: "input",
          props: {
            type: $kbType.decimal,
            id: "exrinput",
            text: money?money:"1",
            borderWidth: 0.4,
            borderColor: $rgba(100, 100, 100, 0.25),
          },
          layout: function(make, view) {
            make.top.inset(5);
            make.height.equalTo(25);
            make.left.inset(10);
            make.width.equalTo(150);
          },
          events: {
            changed: function(sender) {
              calculate();
              money = sender.text
            },
            didBeginEditing:function(sender){
              $("exrinput").runtimeValue().invoke("selectAll");
            }
          }
        },
        {
          type: "button",
          props: {
            id: "select-btn",
            title: names[selectedIndex],
            font: $font($app.env == $env.today ? 14 : 16)
          },
          layout: function(make) {
            make.height.equalTo(25);
            make.top.inset(5);
            make.right.inset(74);
            make.left.equalTo($("exrinput").right).offset(10);
          },
          events: {
            tapped(sender) {
              $device.taptic(0);
              $("exrinput").remove();
              $("exrlist").remove();
              $("btn").remove();
              $("select-btn").remove();
              $("exrview").add({
                type: "button",
                props: {
                  id:"backbtn",
                  icon: $icon("049", $color("tint"), $size(22, 22)),
                  bgcolor: $color("clear")
                },
                layout: function(make, view) {
                  make.top.inset(6);
                  make.left.inset(10);
                },
                events: {
                  tapped(sender) {
                    $device.taptic(0);
                    $("exr").remove();
                    show();
                  }
                }
              });
              $("exrview").add({
                type: "label",
                props: {
                  text: "选择待查询汇率的币种",
                  bgcolor: $color("clear"),
                  font:$font("bold",15)
                },
                layout: function(make, view) {
                  make.top.inset(6);
                  make.centerX.equalTo(view.super)
                }
              });
              $("exrview").add({
                type: "list",
                props: {
                  id: "selectedlist",
                  rowHeight: $app.env == $env.today ? 27 : 40,
                  template: [{
                    type: "label",
                    props: {
                      id: "select-label",
                      font: $font($app.env == $env.today ? 14 : 16)
                    },
                    layout: function(make, view) {
                      make.centerX.centerY.equalTo(view.super);
                    }
                  }],
                  data: names.map(function(item) {
                    return { "select-label": { text: item } };
                  })
                },
                layout: function(make) {
                  make.top.equalTo($("closebtn").bottom).offset(6);
                  make.left.right.bottom.inset(0);
                },
                events: {
                  didSelect: function(sender, indexPath) {
                    selectedIndex = indexPath.row;
                    $cache.set("selected-index", indexPath.row);
                    $("exr").remove();
                    show();
                  }
                }
              });
              $("backbtn").rotate(Math.PI);
              //          $ui.menu({
              //            items: names,
              //            handler: function(title, idx) {
              //              selectedIndex = idx;
              //              sender.title = names[idx];
              //              calculate();
              //              $cache.set("selected-index", idx);
              //            }
              //          });
            }
          }
        },
        {
          type: "button",
          props: {
            id: "closebtn",
            icon: $icon("225", $color("tint"), $size(22, 22)),
            bgcolor: $color("clear")
          },
          layout: function(make, view) {
            make.top.inset(6);
            make.right.inset(10);
          },
          events: {
            tapped(sender) {
                          $device.taptic(0);
                          $widget.height = 181;
                          $("exr").remove();
                          var dataManager = require("../data-manager");
                          dataManager.init();
                          var path = $app.env == $env.today ? "../widget" : "../app";
                          var module = require(path);
                          module.init();
                          $("input").text = $clipboard.text;
            }
          }
        },
        {
          type: "button",
          props: {
            id: "btn",
            icon: $icon("010", $color("tint"), $size(22, 22)),
            bgcolor: $color("clear")
          },
          layout: function(make, view) {
            make.top.inset(6);
            make.right.inset(42);
          },
          events: {
            tapped(sender) {
              if ($("exrinput").editing == true) {
                $("exrinput").blur();
              } else $("exrinput").focus();
            }
          }
        }, {
          type: "label",
          props: {
            bgcolor: $rgba(100, 100, 100, 0.25)
          },
          layout: function(make, view) {
            make.top.equalTo($("closebtn").bottom).offset(5.6);
            make.right.left.inset(0);
            make.height.equalTo(0.4);
          }
        },
        {
          type: "list",
          props: {
            id: "exrlist",
            rowHeight: $app.env == $env.today ? 27 : 40,
            template: [{
                type: "label",
                props: {
                  id: "nameLabel",
                  font: $font($app.env == $env.today ? 14 : 16)
                },
                layout: function(make, view) {
                  make.left.inset(18);
                  make.centerY.equalTo(view.super);
                }
              },
              {
                type: "label",
                props: {
                  id: "value-label",
                  font: $font($app.env == $env.today ? 14 : 16),
                  align: $align.center
                },
                layout: function(make, view) {
                  make.centerY.equalTo(view.super);
                  make.right.inset(15);
                }
              }
            ],
            data: names.map(function(item) {
              return { "nameLabel": { text: item } };
            })
          },
          layout: function(make) {
            make.top.equalTo($("closebtn").bottom).offset(6);
            make.left.right.bottom.inset(0);
          },
          events: {
            pulled: function() {
              fetch(true);
            },
            didSelect: function(sender, indexPath) {
              var base = rates[symbols[selectedIndex]] || 1.0;
              var number = Number($("exrinput").text);
              $clipboard.text = (
                (number * (rates[symbols[indexPath.row]] || 1.0)) /
                base
              ).toFixed(4) + " " + symbols[indexPath.row];
              $ui.toast(sender.data[indexPath.row].nameLabel.text+"已复制",0.3);
            
            }
          }
        }
      ]
    }]
  });
  fetch(false);
}

function calculate() {
  var base = rates[symbols[selectedIndex]] || 1.0;
  var number = Number($("exrinput").text);
  $("exrlist").data = symbols.map(function(symbol, idx) {
    return {
      "nameLabel": { text: names[idx] },
      "value-label": {
        text:
          ((number * (rates[symbol] || 1.0)) / base).toFixed(4) + " " + symbol
      }
    };
  });
}

function fetch(pulled) {
  $ui.loading(!pulled);
  $http.get({
    url: "https://api.exchangeratesapi.io/latest",
    handler: function(resp) {
      $ui.loading(false);
      $("exrlist").endRefreshing();
      rates = resp.data.rates;
      calculate();
    }
  });
}

module.exports = {
  show: show
};
