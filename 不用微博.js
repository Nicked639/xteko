const hotSearchApi =
  "https://weibointl.api.weibo.cn/portal.php?ct=feed&a=search_topic";
//"https://m.weibo.cn/api/container/getIndex?containerid=106003%26filter_type%3Drealtimehot";
const family = $widget.family;
const opacity =0.8
async function getHotSearch() {
  let cache = $cache.get("c");
  let resp = await $http.get(hotSearchApi);
  if (requestFailed(resp)) {
    return JSON.parse(cache);
  }
  let hotCards = resp.data.data;
  console.log(hotCards);

  $cache.set("hot", hotCards);
  return hotCards;
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
          title: "微博国际",
          color: $rgb(69, 134, 209),
          handler: function (sender, indexPath) {
            $cache.set("app", "weibointl");
            let text = "";
            text = /.、([\s\S]*)/g.exec(
              sender.data[indexPath.row].hotTitle.text
            )[1];
            console.log(sender.data[indexPath.row])
            $app.openURL(sender.data[indexPath.row].hotTitle.intlLink);
          }
        },
        {
          title: "微博",
          color: $rgb(246, 22, 31), // default to gray
          handler: function (sender, indexPath) {
            $cache.set("app", "weibo");
            console.log(sender.data[indexPath.row])
            $app.openURL(sender.data[indexPath.row].hotTitle.link);
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
        //console.log(url);
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
  url = encodeURI(url);
  url = url.replace("#", "%2523");
  //alert(url)
  $ui.push({
    props: {},
    views: [
      {
        type: "web",
        props: {
          id: "web",
          url: url,
          script: function () {
            var script = document.createElement("script");

            script.src =
              "https://unpkg.com/ajax-hook@2.0.9/dist/ajaxhook.min.js";
            document.getElementsByTagName("head")[0].appendChild(script);

            var timer = setInterval(function () {
              if (ah) {
                clearInterval(timer);
                ah.proxy({
                  //请求发起前进入
                  onRequest: (config, handler) => {
                    // console.log(config.url)
                    handler.next(config);
                  },
                  //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
                  onError: (err, handler) => {
                    // console.log(err.type)
                    handler.next(err);
                  },
                  //请求成功后进入
                  onResponse: (response, handler) => {
                    console.log(response.response);
                    var resp = JSON.parse(response.response);
                    if (resp.ok == -100) {
                      $notify("login", { key: "value" });
                      resp.ok = 1;
                      resp.data = {
                        status: {
                          comment_manage_info: {
                            comment_permission_type: -1,
                            approval_comment_type: 0,
                            comment_sort_type: 0
                          }
                        },
                        data: [],
                        total_number: 0,
                        max_id: 0,
                        max: 89,
                        max_id_type: 0
                      };
                      resp.url = "";
                      response.response = JSON.stringify(resp);
                    }
                    handler.next(response);
                  }
                });
              }
            }, 1000);
          }
        },
        layout: $layout.fill,

        events: {
          login: function (object) {
            $ui.toast("已拦截登录请求！");
          }
        }
      }
    ]
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
  let hot = await getHotSearch();
  //let hot = data.hotCards;
  //console.log(hot)
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
    else if (i == 4) num = "4⃣️";
    else if (i == 5) num = "5️⃣";
    else if (i == 6) num = "6️⃣️";
    else if (i == 7) num = "7️⃣️";
    else if (i == 8) num = "8️⃣️";
    else if (i == 9) num = "9️⃣️";
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
      } else if (hot[i].icon.indexOf("firestorm") > 0) {
        icon.hidden = false;
        icon.text = "爆";
        icon.bgcolor = $rgb(176, 36, 25);
      } else if (hot[i].icon.indexOf("fei") > 0) {
        icon.hidden = false;
        icon.text = "沸";
        icon.bgcolor = $rgb(247, 98, 0);
      }
    }

    temp = temp.concat({
      hotTitle: {
        text: prefix + hot[i].title,
        info: hot[i].scheme,
        intlLink:"weibointernational://search?keyword="+ encodeURIComponent(hot[i].scheme.match(/search\?keyword=(.*)/)[1]),
        link:
          "https://s.weibo.com/weibo?q=" +
          encodeURIComponent(hot[i].scheme.match(/search\?keyword=(.*)/)[1]) // + "&Refer=index"
      },
      icon: icon
    });
  }
  //console.log(temp)
  $("hotList").data = temp;

  //$ui.toast(timeConvert(data.pageInfo.starttime) + "  更新", 0.6);
}
function inAppShow() {
  $ui.render({
    props: {
      title: "不用微博",
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

async function getTimeStamp(family) {
  //  if(family==0) return "微博热搜"
  //  let url = "http://calendar.netcore.show/api/day/days?day="
  //  let date = new Date()
  //  let m = date.getMonth()+1
  //  let d = date.getDate()
  //  let y = date.getFullYear()
  //
  //  url = url+y+"-"+m+"-"+d
  //  let resp = await $http.get(url)
  //
  //  if (requestFailed(resp)) return "微博热搜"
  //  let lm = resp.data.data[0].calendarMonth.lunarMonthText
  //  let ld = resp.data.data[0].calendarDay.lunarDayText
  //  let timeStamp = lm+"月"+ld+"  "+date.toDateString().slice(4,10)
  ////  console.log(timeStamp)
  //  timeStamp = "微博热搜                           " + timeStamp
  //  return timeStamp
  return "不用微博";
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

/*
async function unsplash1() {
  const cache = $file.read("bg.jpg");
  let o = "squarish";
  if (family == 1) o = "landscape";
  // 调用 Unsplash API 获取随机图片
  const url =
    "https://api.unsplash.com/photos/random?client_id=loXIhcb0RGvhvC1PC8eNJk1AQN4daYXPLBfrO-cOPtg&query=dark&count=1&orientation=" +
    o;

  $http.get({
    url: url,
    header: { "Accept-Version": "v1" },
    handler: function (resp) {
      if (resp.data.errors) {
        $ui.error("请求失败：" + resp.data.errors[0]);
        return;
      }

      const data = resp.data;
      //console.log(data)

      // 备选方案：拼接原始链接并添加裁剪参数
      //const rawUrl = `${data[0].urls.raw}&w=500&h=500&fit=crop`;
      const regularUrl = `${data[0].urls.regular}`;
      alert(regularUrl)
      const file = $http.download(regularUrl);
      //console.log(file)
      if (requestFailed(file)) {
        return cache.image;
      }
      const image = file.data.image;

      if (image) {
        $file.write({
          data: file.data,
          path: "bg.jpg"
        });
      }

      return image;
    }
  });
}
*/

async function unsplash() {
  const cache = $file.read("bg.jpg");
  const orientation = family === 1 ? "landscape" : "squarish";
  const url = $device.isDarkMode ?`https://api.unsplash.com/photos/random?client_id=loXIhcb0RGvhvC1PC8eNJk1AQN4daYXPLBfrO-cOPtg&query=dark&count=1&orientation=${orientation}`:`https://api.unsplash.com/photos/random?client_id=loXIhcb0RGvhvC1PC8eNJk1AQN4daYXPLBfrO-cOPtg&query=white&count=1&orientation=${orientation}`;
  try {
    // 1. 将$http.get改为Promise形式
    const resp = await $http.get({
      url: url,
      header: { "Accept-Version": "v1" }
    });
    if(resp.data.includes("Rate Limit")) {
        alert(resp.data)
        return
    }


    if (resp.data.errors) {
      $ui.error("请求失败：" + resp.data.errors[0]);
      return cache?.image;
    }

    // 2. 同步处理后续下载
    const regularUrl = resp.data[0].urls.regular;
    const file = await $http.download(regularUrl);
    
    if (!file?.data?.image) {
      console.log("下载失败，使用缓存");
      return cache?.image;
    }

    // 3. 同步写入文件
    $file.write({
      data: file.data,
      path: "bg.jpg"
    });

    return file.data.image;
  } catch (error) {
    $ui.error(`操作失败：${error}`);
    return cache?.image;
  }
}

/*
async function fetch() {
  const cache = $file.read("bg.jpg");
  let size = "500x500";
  if (family == 1) size = "800x375";
  let url = "https://source.unsplash.com/random/" + size + "/?dark";
  //let url = "https://api.cutowallpaper.com/api/v1/wallpapers/random/?build=35&lang=en&lang=en&build=35&os=ios&osv=14.4.0&did=3D1FD7C2-B80A-4AED-84AD-B5D6E063E5A8&tz=Asia/Shanghai&ds=" +size+"x3"
  //let resp = await $http.get(url);
  //console.log(resp.data)
  //url = resp.data.url
  //console.log(url)

  const file = await $http.download(url);
  //console.log(file)
  if (requestFailed(file)) {
    return cache.image;
  }
  const image = file.data.image;

  if (image) {
    $file.write({
      data: file.data,
      path: "bg.jpg"
    });
  }

  return image;
}

*/

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
            offset: $point(-2, 7),
            frame: {
              width: 145
            }
          },
          views: data.slice(0, 5)
        },
        {
          type: "vstack",
          props: {
            spacing: 8,
            alignment: $widget.horizontalAlignment.leading,
            offset: $point(-15, 7),
            frame: {
              width: 145
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
          width: 140
        }
      },
      views: data.slice(0, 5)
    };
}

async function widgetInit() {
  let temp = [];
  let hot = await getHotSearch();
  let image = await unsplash()//fetch();
  const date = new Date();
  date.setMinutes(date.getMinutes(date) + 60);
  let timeStamp = await getTimeStamp(family);
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
        text: prefix + hot[i].title + "    ",
        font: $font(11),
        color: $device.isDarkMode ?$color("white"):$color("black"),
        offset: $point(7, 0),
        lineLimit: 1,
        link:
          "jsbox://run?name=" +
          encodeURI("不用微博") +
          ".js&url=" +
          encodeURI("https://s.weibo.com/weibo?q=") +
          encodeURIComponent(hot[i].scheme.match(/search\?keyword=(.*)/)[1])
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
              opacity: opacity,
//              background:  $device.isDarkMode ?{
//                type: "gradient",
//                props: {
//                  colors: [
//                    $color("#0d0116", "#22186"),
//                    $color("#4c444d", "#5d5d63")
//                  ]
//                }
//              }:{}
            }
          },
          {
            type: "vstack",
            props: {
              spacing: 5,
              alignment: $widget.horizontalAlignment.leading
            },
            views: [
              {
                type: "text",
                props: {
                  text: "不用微博 📖",
                  font: $font("bold", 15),
                  color:  $device.isDarkMode ?$color("white"):$color("black"),
                  frame: {
                    alignment: $widget.alignment.leading,
                    height: 18
                  },
                  offset: family == 1 ? $point(15, 5) : $point(10, 5)
                }
              },
              getGrid(family, temp),
              {
                type: "text",
                props: {
                  text: "更新时间 " + timeConvert(),
                  font: $font(8),
                  color: $device.isDarkMode ?$color("#7e8b8c"):$color("#555555"),
                  frame: {
                    maxWidth: Infinity,
                    alignment: $widget.alignment.trailing
                  },

                  offset: $point(-18, 7)
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
  if ($context.query.url !== undefined) openSafari($context.query.url);
} else widgetInit();

//await widgetInit()
