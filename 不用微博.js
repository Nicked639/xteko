const hotSearchApi =
  "https://m.weibo.cn/api/container/getIndex?containerid=106003%26filter_type%3Drealtimehot";
const family = $widget.family;
async function getHotSearch() {
  //    $ui.toast(family);
  let resp = await $http.get(hotSearchApi);
  let data = resp.data.data;
  //    if (data.errmsg) {
  //        alert(data.errmsg);
  //        return;
  //    }
  let hotCards = data.cards[0].card_group;
  let upTime = data.cardlistInfo.starttime;
  //console.log(upTime)
  return { hotCards, upTime };
}

function list() {
  return {
    type: "list",
    props: {
      id: "hotList",
      template: template,
      hidden: false,
      rowHeight: 35,
      bgcolor:
        $app.env == $env.today
          ? $color("clear")
          : $device.isDarkMode
          ? $color("black")
          : $color("white"),
      actions: [
        {
          title: "墨客",
          color: $rgb(69, 134, 209),
          handler: function (sender, indexPath) {
            $cache.set("app", "moke");
            let text = "";
            text = /.、([\s\S]*)/g.exec(
              sender.data[indexPath.row].hotTitle.text
            )[1];
            //              console.log(text)
            $app.openURL("moke:///search/statuses?query=" + encodeURI(text));
          }
        },
        {
          title: "微博",
          color: $rgb(246, 22, 31), // default to gray
          handler: function (sender, indexPath) {
            //console.log(sender.data[indexPath.row].label.info);
            $cache.set("app", "weibo");
            $app.openURL(sender.data[indexPath.row].hotContent.info);
          }
        }
      ]
    },
    layout: function (make, view) {
      make.bottom.left.right.inset(0);
      make.top.inset(0);
    },
    events: {
      didSelect: function (sender, indexPath) {
        let url = sender.data[indexPath.row].hotTitle.link;
        console.log(url);
        openSafari(url);
      },
      didLongPress: function (sender, indexPath, data) {
        if ($app.env == $env.app || $app.widgetIndex !== -1) return;
        $app.close();
      },
      pulled: function (sender) {
        $("hotList").data = [];
        inAppInit();
        sender.endRefreshing();
      }
    }
  };
}
function openSafari(url) {
  $safari.open({
    url: url,
    entersReader: false,
    handler: () => {
      $ui.clearToast();
    }
  });
}
const template = {
  props: {
    bgcolor: $color("clear")
  },
  views: [
    {
      type: "label",
      props: {
        id: "hotTitle",
        bgcolor: $color("clear"),
        textColor:
          $app.env == $env.app
            ? $device.isDarkMode
              ? $color("white")
              : $color("black")
            : $device.isDarkMode == true
            ? $color("white")
            : $color("black"),
        align: $align.center,
        font: $font(13)
      },
      layout: function (make, view) {
        make.right.top.bottom.inset(0);
        make.left.inset(0);
      }
    },
    {
      type: "label",
      props: {
        id: "icon",
        bgcolor: $color("clear"),
        text: "热",
        textColor: $color("white"),
        radius: 2,
        font: $font("bold", 11),
        align: $align.center,
        alpha: 0.8,
        hidden: true
      },
      layout: function (make, view) {
        make.right.inset(15);
        make.width.equalTo(15);
        make.height.equalTo(15);
        make.centerY.equalTo();
      },
      events: {
        tapped: function (sender) {}
      }
    }
  ]
};

async function inAppInit() {
  let data = await getHotSearch();
  let hot = data.hotCards;
  $("hotList").data = [];
  var temp = [];
  for (let i = 0; i < hot.length; i++) {
    let icon = {};
    let prefix = "";
    let num = i;
    if (i == 0) num = "🏆";
    else if (i == 1) num = "🥇";
    else if (i == 2) num = "🥈";
    else if (i == 3) num = "🥉";
    prefix = num + "、";
    //console.log(hot[i].icon)
    if (hot[i].icon) {
      if (hot[i].icon.indexOf("hot") > 0) {
        icon.hidden = false;
        icon.text = "热";
        icon.bgcolor = $rgb(254, 158, 25);
      } else if (hot[i].icon.indexOf("new") > 0) {
        icon.hidden = false;
        icon.text = "新";
        icon.bgcolor = $rgb(254, 73, 95);
      } else if (hot[i].icon.indexOf("recom") > 0) {
        icon.hidden = false;
        icon.text = "荐";
        icon.bgcolor = $rgb(76, 173, 254);
      } else if (hot[i].icon.indexOf("fei") > 0) {
        icon.hidden = false;
        icon.text = "沸";
        icon.bgcolor = $rgb(247, 98, 0);
      }
    }

    temp = temp.concat({
      hotTitle: {
        text: prefix + hot[i].desc,
        info: hot[i].scheme,
        link:
          "http://s.weibo.com/weibo?q=%23" +
          encodeURI(hot[i].desc) +
          "%23&Refer=top"
      },
      icon: icon
    });
  }
  $("hotList").data = temp;
  //$ui.toast(timeConvert(data.pageInfo.starttime) + "  更新", 0.6);
}
function inAppShow() {
  $ui.render({
    props: {
      title: "微博热点",
      id: "weibo",
      type: "view"
      //     navBarHidden: $app.env == $env.app ? false : true,
      // //bgcolor:$color("black"),
      //     navButtons: [
      //         {
      //         symbol: "lightbulb",
      //         handler: () => {
      //             readMe();
      //         }
      //         }
      //     ]
    },
    views: [list()],
    layout: $layout.fill
  });
}

async function getTimeStamp(family){
  if(family==0) return "微博热搜"
  let url = "http://calendar.netcore.show/api/day/days?day="
  let date = new Date()
  let m = date.getMonth()+1
  let d = date.getDate()
  let y = date.getFullYear()
  
  url = url+y+"-"+m+"-"+d
  let resp = await $http.get(url)
  if (!resp) return
  let lm = resp.data.data[0].calendarMonth.lunarMonthText
  let ld = resp.data.data[0].calendarDay.lunarDayText
  let timeStamp = lm+"月"+ld+"  "+date.toDateString().slice(4,10)
//  console.log(timeStamp)
  timeStamp = "微博热搜                             " + timeStamp
  return timeStamp
}

function timeConvert() {
  let date = new Date();
  // Hours part from the timestamp
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
//  let seconds = "0" + date.getSeconds();
//
//  let year = date.getFullYear();
//  let month = date.getMonth() + 1;
//  let dateN = date.getDate();
  // Will display time in 10:30:23 format
  let formattedTime =
    //year +
    //"-" +
    //month +
    // "-" +
    //dateN +
    // "  " +
    hours + ":" + minutes.substr(-2);
  // +":" +
  //seconds.substr(-2);
  return formattedTime;
}
function requestFailed(resp) {
  return (
    resp == null || resp.response == null || resp.response.statusCode != 200
  );
}

async function fetch() {
  const cache = $cache.get("image");
  let size = "500x500";
  if (family == 1) size = "800x375";
  let url = "https://source.unsplash.com/random/" + size + "/?dark";
  const file = await $http.download(url);
  if (requestFailed(file)) {
    return cache;
  }
  const image = file.data.image;
  if (image) {
    $cache.set("image", image);
  }

  return image;
}

function getGrid(family, data) {
  if (family == 1)
    return {
      type: "vgrid",
      props: {
        columns: Array(2).fill({
          flexible: {
            minimum: 10,
            maximum: Infinity
          }
          // spacing: 10,
          // alignment: $widget.alignment.left
        })
        // spacing: 10,
        // alignment: $widget.horizontalAlignment.leading
      },
      views: [
        {
          type: "vstack",
          props: {
            spacing: 8,
            alignment: $widget.horizontalAlignment.leading,
            offset: $point(-5, 7),
            frame: {
                            width: 140,
                           
                          }
          },
          views: data.slice(0, 5)
        },
        {
          type: "vstack",
          props: {
            spacing: 8,
            alignment: $widget.horizontalAlignment.leading,
            offset: $point(-5, 7),
            frame: {
                width: 140,
               
              }
            
          },
          views: data.slice(5, 10)
        }
      ]
    };
  else
    return {
      type: "vstack",
      props: {
        spacing: 8,
        alignment: $widget.horizontalAlignment.leading,
        offset: $point(0, 7),
        frame: {
                        width: 140,
                       
                      }
      },
      views: data.slice(0, 5)
    };
}

async function widgetInit() {
  let temp = [];
  let data = await getHotSearch();
  let hot = data.hotCards;
  let upTime = data.upTime;
  let image = await fetch();
  const date = new Date();
  date.setMinutes(date.getMinutes(date) + 15);
  let timeStamp = await getTimeStamp(family)
  for (let i = 0; i < hot.length; i++) {
    let prefix = "";
    let num = i;
    if (i == 0) num = "🏆";
    else if (i == 1) num = "🥇";
    else if (i == 2) num = "🥈";
    else if (i == 3) num = "🥉";
    else if (i == 4) num = "4⃣️";
    else if (i == 5) num = "5️⃣";
    else if (i == 6) num = "6️⃣️";
    else if (i == 7) num = "7️⃣️";
    else if (i == 8) num = "8️⃣️";
    else if (i == 9) num = "9️⃣️";
    prefix = num + " ";

    temp = temp.concat({
      type: "text",
      props: {
        text: prefix + hot[i].desc,
        font: $font(11),
        color: $color("white"),
        offset: $point(7, 0),
        lineLimit: 1,
        link:
          "http://s.weibo.com/weibo?q=%23" +
          encodeURI(hot[i].desc) +
          "%23&Refer=top"
      }
    });
  }
  $widget.setTimeline({
    policy: {
      afterDate: date
    },
    render: ctx => {
      return {
        type: "zstack",
        props: {
          alignment: $widget.alignment.center,
          widgetURL: "jsbox://run?name=" + encodeURI("不用微博") + ".js"
        },
        views: [
          {
            type: "image",
            props: {
              image: image,
              resizable: true,
              scaledToFit: false,
              opacity: 0.9,
              background: {
                  type: "gradient",
                  props: {
                    colors: [
                      $color("#0d0116", "#22186"),
                      $color("#4c444d", "#5d5d63"),
                    ]
                  }
                }
            }
          },
          {
            type: "vstack",
            props: {
              spacing: 5,
              alignment: $widget.horizontalAlignment.leading
              // spacing: 10,
              //alignment: $widget.verticalAlignment.left
              //widgetURL: "jsbox://runjs?file=javbus.js"
            },
            views: [
              {
                type: "text",
                props: {
                  text: timeStamp,
                  font: $font("bold", 15),
                  color: $color("white"),
                  frame: {
                    alignment: $widget.alignment.leading,
                    height: 18
                  },
                  offset: family==1?$point(15, 5):$point(10,5)
                }
              },
              getGrid(family, temp),
              {
                type: "text",
                props: {
                  text: "更新时间:" + timeConvert(upTime),
                  font: $font(8),
                  color: $color("white"),
                  frame: {
                    maxWidth: Infinity,
                    alignment: $widget.alignment.trailing
                  },
                  offset: $point(-10, 5)
                }
              }
            ]
          }
        ]
      };
    }
  });
}

if ($env.app == $app.env) {
  inAppShow();
  inAppInit();
} else
widgetInit();
