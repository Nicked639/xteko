var openURL = {
  name: "链接",
  pattern: "link"
};

function show(content) {
  $widget.height = 400;
  var tabEngines = [
    {
      name: "百度",
      pattern: "https://www.baidu.com/s?wd="
    },
    {
      name: "谷歌",
      pattern: "https://www.google.com/#newwindow=1&safe=off&q="
    },
    {
      name: "翻译",
      pattern: "http://translate.google.cn/?hl=en#auto/zh-CN/"
    },
    {
      name: "维基",
      pattern: "https://zh.wikipedia.org/wiki/"
    }
  ];
  if ($detector.link(content) != "") {
    tabEngines.unshift(openURL);
  }
  var tabSite = tabEngines[0].pattern;
  $ui.window.add({
    type: "blur",
    props: {
      id: "wprvw",
      style: 1
    },
    views: [
      {
        type: "tab",
        props: {
          id: "tabwp",
          items: tabEngines.map(function(item) {
            return item.name;
          })
        },
        layout: function(make, view) {
          make.left.right.inset(6);
          make.top.inset(4);
          make.height.equalTo(22);
        },
        events: {
          changed: function(sender) {
            tabSite = tabEngines[sender.index].pattern;
            $("web").url = detectContent(tabSite, content);
          }
        }
      },
      {
        type: "web",
        props: {
          id: "web",
          url: detectContent(tabSite, content),
          radius: 10,
          borderWidth: 0.4,
          borderColor: $rgba(100, 100, 100, 0.25),
          bounces: true
        },
        views: [
          {
            type: "button",
            props: {
              icon: $icon("225", $color("tint"), $size(20, 20)),
              bgcolor: $color("clear")
            },
            layout: function(make) {
              make.left.top.inset(4);
            },
            events: {
              tapped(sender) {
                $device.taptic(0);
                $widget.height = 180;
                $("wprvw").remove();
              }
            }
          },
          {
            type: "button",
            props: {
              icon: $icon("096", $color("tint"), $size(20, 20)),
              bgcolor: $color("clear")
            },
            layout: function(make) {
              make.bottom.left.inset(4);
            },
            events: {
              tapped(sender) {
                $app.openURL($("web").url);
              }
            }
          },
          {
            //网页后退
            type: "button",
            props: {
              title: "◄",
              font: $font(25),
              id: "goB",
              titleColor: $color("tint"),
              alpha: 0.5,
              bgcolor: $color("clear")
            },
            layout: function(make) {
              make.bottom.inset(-5);
              make.left.inset(130);
            },
            events: {
              tapped(sender) {
                $("web").goBack();
                $("goF").alpha = 1;
              }
            }
          },
          {
            //网页前进
            type: "button",
            props: {
              title: "►",
              id: "goF",
              font: $font(25),
              titleColor: $color("tint"),
              alpha: 0.5,
              bgcolor: $color("clear")
            },
            layout: function(make) {
              make.bottom.inset(-5);
              make.right.inset(130);
              
            },
            events: {
              tapped(sender) {
                $("web").goForward();
              }
            }
          }
        ],
        layout: function(make, view) {
          make.left.right.bottom.inset(4);
          make.top.equalTo($("tabwp").bottom).offset(4);
        },
        events: {
          didStart: function(sender, navigation) {
            $("goF").alpha = $("web").canGoForward ? 1 : 0.5;
            $("goB").alpha = $("web").canGoBack ? 1 : 0.5;
          }
        }
      }
    ],
    layout: $layout.fill
  });
}

function detectContent(tabSite, content) {
  if (tabSite.indexOf("link") != -1) {
    return $detector.link(content)[0];
  } else {
    var tsec = tabSite + encodeURIComponent(content);
  }
  return tsec;
}

module.exports = {
  show: show
};
