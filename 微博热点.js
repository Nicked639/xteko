$widget.height=320
const hotSeachApi =
  "https://api.weibo.cn/2/guest/page?gsid=_2AkMtqmJ0f8NhqwJRmPEdxGnjaIx-wwDEieKb9pOvJRMxHRl-wT9kqnAAtRV6Bm0NBHg_Q_-5Rx4sx0moY_1sSSEoN2zx&uid=1009882141998&wm=3333_2001&i=ddd48a6&b=0&from=1084393010&checktoken=745495b139d5d0943c12418acc7a08f8&c=iphone&networktype=wifi&v_p=60&skin=default&s=ffffffff&v_f=1&did=10dc157a640f1c1bd53cbacbad02326f&lang=zh_CN&sflag=1&ft=0&moduleID=pagecard&uicode=10000011&featurecode=10000085&feed_mypage_card_remould_enable=1&luicode=10000003&count=20&extparam=filter_type%3Drealtimehot%26mi_cid%3D100103%26pos%3D0_0%26c_type%3D30%26display_time%3D1526132043&containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&fid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&page=1";

const hotWeiboApi = "https://api.weibo.cn/2/statuses/unread_hot_timeline";

//let containerid = {
//  "热门":"102803",
//  "小时":"102803_ctg1_9999_-_ctg1_9999_home",
//  "昨日":"102803_ctg1_8899_-_ctg1_8899",
//  "前日":"102803_ctg1_8799_-_ctg1_8799",
//  "周榜":"102803_ctg1_8698_-_ctg1_8698"
//}
let containerid = [
  "102803",
  "",
  "102803_ctg1_9999_-_ctg1_9999_home",
  "102803_ctg1_8899_-_ctg1_8899",
  "102803_ctg1_8799_-_ctg1_8799",
  "102803_ctg1_8698_-_ctg1_8698"
];
const template = {
  props: {
    bgcolor: $color("clear")
  },
  views: [
    {
      type: "label",
      props: {
        id: "label",
        bgcolor: $color("clear"),
        textColor:
          $app.env == $env.app
            ? $color("black")
            : $device.isDarkMode == true
            ? $color("white")
            : $color("black"),
        align: $align.center,
        font: $font(14)
      },
      layout: function(make, view) {
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
      layout: function(make, view) {
        make.right.inset(15);
        make.width.equalTo(15);
        make.height.equalTo(15);
        make.centerY.equalTo();
      },
      events: {
        tapped: function(sender) {}
      }
    }
  ]
};

const template2 = {
  props: {
    bgcolor: $color("clear")
  },
  views: [
    {
      type: "label",
      props: {
        id: "label",
        textColor:
          $app.env == $env.app
            ? $color("black")
            : $device.isDarkMode == true
            ? $color("white")
            : $color("black"),
        align: $align.left,
        font: $font(12),
        bgcolor: $color("clear"),
        lines: 4,
        autoFontSize: true
      },
      layout: function(make, view) {
        make.right.inset(90);
        make.left.inset(50);
        make.top.inset(35);
        make.bottom.inset(5);
      }
    },
    {
      type: "image",
      props: {
        id: "avatar",
        radius: 17
      },
      layout: function(make, view) {
        make.left.inset(10);
        make.top.inset(10);
        make.size.equalTo($size(34, 34));
      },
      events: {
        tapped(sender){
          openWeb2(sender.info)
        }
      }
    },
    {
      type: "image",
      props: {
        id: "pic",
        radius:5,
        src:"https://www.b2b315.com/skin/m03skinBlue/image/nopic320.gif"
      },
      layout: function(make, view) {
        make.right.inset(10);
        make.top.inset(10);
        make.size.equalTo($size(80, 80));
      },
      events: {
        tapped(sender) {
//          console.log(sender.src);
          console.log(sender.info)
          if (sender.info.length==1&&sender.info[0].indexOf("video")>0)
          openWeb2(sender.info[0])
          else
          $quicklook.open({
            list: sender.info,
            handler: function() {
              if ($app.env == $env.today && $app.widgetIndex == -1)
                  setWidgetBackground(0.1);
            }
          });
        }
      },
      views: [
        {
          type: "button",
          props: {
            id: "play",
            font: $font(12),
            icon: $icon("049", $rgba(255, 255, 255, 0.7), $size(30, 30)),
            bgcolor:$color("clear"),
            hidden: true
          },
          layout: function(make, view) {
            make.center.equalTo(view.super);
            
          },
          events: {
            tapped(sender) {
              $ui.toast("视频载入中...",5)
                 $quicklook.open({
                          url: sender.info,
                          handler: function() {
                            if ($app.env == $env.today && $app.widgetIndex == -1)
                                setWidgetBackground(0.1);
                          }
                        });
            }
          }
        },{
          type: "label",
                props: {
                  id: "num",
                  textColor:
                    $color("white"),
                  align: $align.right,
                  font: $font("bold", 15),
                  bgcolor:$color("clear")
                },
                layout: function(make, view) {
                  make.bottom.inset(-12)
                  make.right.inset(1)
                  make.width.equalTo(40)
                  make.height.equalTo(40)
                }
        },{
          type: "label",
                props: {
                  id: "gif",
                  textColor:
                    $color("white"),
                  align: $align.center,
                  font: $font(10),
                  bgcolor:$color("#637B96"),
                  text:"含动图",
                  radius:5,
                  hidden:true
                },
                layout: function(make, view) {
                  make.bottom.inset(0)
                  make.left.inset(0)
                  make.width.equalTo(35)
                  make.height.equalTo(17)
                }
        },
      ]
    },
    {
      type: "label",
      props: {
        id: "name",
        textColor:
          $app.env == $env.app
            ? $color("black")
            : $device.isDarkMode == true
            ? $color("white")
            : $color("black"),
        align: $align.left,
        font: $font("bold", 13)
      },
      layout: function(make, view) {
        //        make.centerY.equalTo()
        make.left.inset(50);
        make.width.equalTo(200);
        make.top.inset(10);
      }
    },{
      type: "label",
      props: {
        id: "time",
        textColor:
 $color("gray")
      ,
        align: $align.left,
        font: $font(10)
      },
      layout: function(make, view) {
        //        make.centerY.equalTo()
        make.top.equalTo($("name").bottom).offset(0)
        make.left.inset(50)
        make.width.equalTo(200);
//        make.top.inset(18);
      }
    }
  ]
};

function weiboList(id, temp, height) {
  return {
    type: "list",
    props: {
      id: id,
      template: temp,
      hidden: true,
      rowHeight: height,
      bgcolor: $color("clear"),
      actions: [{
          title: "微博国际",
          color: $rgb(242, 152, 0), // default to gray
          handler: function(sender, indexPath) {
            //            console.log(sender.data[indexPath.row].label.info)
            $cache.set("app", "weibointernational");
            let url = sender.data[indexPath.row].label.info.replace(
              "sinaweibo",
              "weibointernational"
            );
            $app.openURL(url);
          }
        },
        {
          title: "微博",
          color: $rgb(246, 22, 31), // default to gray
          handler: function(sender, indexPath) {
            //console.log(sender.data[indexPath.row].label.info);
            $cache.set("app", "weibo");
            $app.openURL(sender.data[indexPath.row].label.info);
          }
        },
        
        {
          title: "墨客",
          color: $rgb(69, 134, 209),
          handler: function(sender, indexPath) {
            $cache.set("app", "moke");
            if ($("fireList").hidden == false) {
              $app.openURL(
                "moke:///status?mid=" + sender.data[indexPath.row].label.id
              );
            } else {
              let text = /.、([\s\S]*)/g.exec(
                sender.data[indexPath.row].label.text
              )[1];
              $app.openURL("moke:///search/statuses?query=" + encodeURI(text));
            }
          }
        }
      ]
    },
    layout: (make, view) => {
      make.left.right.bottom.inset(0);
      make.top.inset(25);
    },
    events: {
      didSelect: function(sender, indexPath) {
        //        let app = $cache.get("app") || "weibo";

        let url = sender.data[indexPath.row].avatar.info;
        //console.log(sender.data[indexPath.row]);
        console.log(url);
        openWeb(url);
      },
      didLongPress: function(sender, indexPath, data) {
        //        let name = sender.data[indexPath.row].label.infoname;
        //        console.log(name);
        //        url = "http://s.weibo.com/weibo?q=%23" + name + "%23&Refer=top";
        //        $share.sheet(encodeURI(url));
        if ($app.env == $env.app || $app.widgetIndex !== -1) return
        $app.close();
      },
      pulled: function(sender) {
        if ($("tab").index == 1) {
          $("hotList").data = [];

          //                  $("weibo").add(weiboList("hotList",template));
          getHotSearch();
        } else {
          $("fireList").data = [];

          getFire(containerid[$("tab").index]);
        }
        sender.endRefreshing();
      }
    }
  };
}

function getHotSearch() {
    $ui.toast("载入中...", 10);
  $http.get({
    url: hotSeachApi,
    handler: function(resp) {
      let data = resp.data;
      if (data.errmsg) {
        alert(data.errmsg);
        return;
      }
      let hotCards = data.cards[0].card_group;
      $("hotList").hidden = false;
      $("fireList").hidden = true;
      $("hotList").data = [];
      var temp = [];
      for (let i = 0; i < hotCards.length; i++) {
        let icon = {};
        let prefix = "";

        let num = i;
        if (i == 0) num = "🏆";
        else if (i == 1) num = "🥇";
        else if (i == 2) num = "🥈";
        else if (i == 3) num = "🥉";
        prefix = num + "、";
        //          console.log(hotCards[i].icon)
        if (hotCards[i].icon) {
          if (hotCards[i].icon.indexOf("hot") > 0) {
            icon.hidden = false;
            icon.text = "热";
            icon.bgcolor = $rgb(254, 158, 25);
          } else if (hotCards[i].icon.indexOf("new") > 0) {
            icon.hidden = false;
            icon.text = "新";
            icon.bgcolor = $rgb(254, 73, 95);
          } else if (hotCards[i].icon.indexOf("recom") > 0) {
            icon.hidden = false;
            icon.text = "荐";
            icon.bgcolor = $rgb(76, 173, 254);
          } else if (hotCards[i].icon.indexOf("fei") > 0) {
            icon.hidden = false;
            icon.text = "沸";
            icon.bgcolor = $rgb(247, 98, 0);
          }
        }

        temp = temp.concat({
          label: {
            text: prefix + hotCards[i].desc,
            info: hotCards[i].scheme,
            link:
              "http://s.weibo.com/weibo?q=%23" +
              hotCards[i].desc +
              "%23&Refer=top"
          },
          icon: icon
        });
      }
      $("hotList").data = temp;
      $ui.toast(timeConvert(data.pageInfo.starttime) + "  更新", 0.6);
    }
  });
  //  alert($props($("tab")))
}

function getFire(containerid = "102803") {
  $ui.toast("载入中...")
  $http.request({
    method: "POST",
    url: hotWeiboApi,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      Host: "api.weibo.cn",
      "User-Agent": "WeiboOverseas/3.7.3 (iPhone; iOS 13.4; Scale/3.00)",
      "X-Sessionid": "FB2B9D47-FFCD-4A94-8D33-FDE1313557D9"
    },
    body: {
      adss: "a829644381d03fe621933a54999bc051",
      aid: "01A_gQlePB46dDPjzk7p6P7s8w1dwrmoa-4SYtwkBUm38_q48.",
      c: "weicoabroad",
      containerid: containerid,
      count: "25",
      extparam: "discover|new_feed",
      fid: "102803_ctg1_9999_-_ctg1_9999_home",
      from: "1237393010",
      fromlog: "1028039999",
      group_id: "1028039999",
      gsid:
        "_2A25zYd3xDeRxGedP71YS8SbFzT2IHXVuN1Y5rDV6PUJbkdAKLW7VkWpNX-gVeSRDdU4PP1TCE6amEC95bgTLekqn",
      i: "15a1eb5",
      lang: "zh_CN",
      refresh: "pulldown",
      s: "603068d8",
      since_id: "4480206255699492",
      trim_level: 1,
      trim_page_recom: 0,
      tz: "Asia/Shanghai",
      ua: "iPhone10,3_iOS13.4_Weibo_intl._3730_wifi",
      uid: "1144318961",
      v_p: 59
    },

    handler: function(resp) {
      let data = resp.data;
      //      if (data.errmsg) {
      //        alert(data.errmsg);
      //        return;
      //      }
      //      $clipboard.text=JSON.stringify(data)
      $("hotList").hidden = true;
      $("fireList").hidden = false;
      $("fireList").data = [];
      if ($("tab").index == 1) $ui.toast(data.remind_text_old, 1);
      else $ui.clearToast();
      var hots = data.statuses;
      var temp = [];
      
      for (let i = 0; i < hots.length; i++) {
       var pic_url = "";
       var ori_pic = "";
       var gifHidden = true
       var d = new Date(hots[i].created_at)
       var num = hots[i].pic_num
       var page_info = hots[i].page_info
//       console.log(page_info)
       var pic_infos = hots[i].pic_infos
       var pic_array = []
       d = d.getMonth()+1+"-"+d.getDate()+" "+addZero(d.getHours())+":"+addZero(d.getMinutes())
 
        if (num > 0) {
          num=num-1
          pic_url = hots[i].thumbnail_pic;
          ori_pic = hots[i].original_pic;
          for (var key in pic_infos){
            var reg =/.gif$/;
            if (reg.test(pic_infos[key].original.url)){
            pic_array=pic_array.concat(pic_infos[key].video)
            gifHidden = false
            }
            else
            pic_array=pic_array.concat(pic_infos[key].original.url)
            
          }

        } else if (page_info) {
          
          pic_url = page_info.page_pic;
          if(!pic_url)
          pic_url=page_info.cards[0].page_pic
          if (page_info.media_info)
            ori_pic = page_info.media_info.stream_url;
          else ori_pic = pic_url;
          pic_array=[ori_pic]
        }
        temp = temp.concat({
          label: {
            text: hots[i].text,
            info: hots[i].scheme,
            id: /.*mblogid=([\s\S]*)/g.exec(hots[i].scheme)[1],
            
          },
          name: {
            text: hots[i].user.name
          },
          avatar: {
            src: hots[i].user.profile_image_url,
            info: "https://m.weibo.cn/" + hots[i].user.id + "/" + hots[i].id
          },
          pic: {
            src: pic_url?pic_url:"http://ucar.gac-toyota.com.cn/Images/no_photo.GIF",
//            info: ori_pic,
            info:pic_array
           },
           play:{
             hidden:ori_pic.indexOf("video")>0?false:true,
             info:ori_pic
           },
           time:{
             text:d
           },
           num:{
             text:num>0?"+"+num:""
           },
           gif:{
             hidden:gifHidden
           }
        });
      }
      $("fireList").data = temp;
    }
  });
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function timeConvert(unixTime) {
  let date = new Date(unixTime * 1000);
  // Hours part from the timestamp
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dateN = date.getDate();
  // Will display time in 10:30:23 format
  let formattedTime =
    year +
    "-" +
    month +
    "-" +
    dateN +
    "  " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);
  return formattedTime;
}

function openWeb(url) {
  $widget.height=525
  $ui.push({
    props: {
      navBarHidden: $app.env == $env.app ? false : true,
      bgcolor: $color("clear")
    },
    views: [
      {
        type: "web",
        props: {
          url: encodeURI(url),
          bgcolor: $color("clear"),
          ua:"Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
        },
        layout: function(make, view) {
          make.left.right.inset(0);
          make.bottom.inset(0);
          make.top.inset($app.env == $env.app ? 0:0);
        },
        events: {
          didFinish: function(sender, navigation) {
            $delay(0.45, () => {
              shareButtonAnimate(make => {
                make.centerX.equalTo();
                make.width.equalTo(125);
                make.height.equalTo(34);
                make.bottom.inset(81);
              });
//              $widget.height=320
            });
            $("loading").hidden=true
          }
        }
      },{
          type: "label",
                props: {
                  id: "loading",
                  textColor:
                    $color("gray"),
                  align: $align.center,
                  font: $font("Rockwell-BoldItalic", 20),
                  bgcolor:$color("clear"),
                  text:"Loading..."
                },
                layout: $layout.fill
        },
      {
        type: "web",
        props: {
          id: "web",
          html: ""
        },
        frame: $rect(0, 0, 0, 0),
        events: {
          didFinish: function(sender, navigation) {
            if ($app.env == $env.today && $app.widgetIndex == -1)
              setWidgetBackground(0.1);
          },
          didStart: function(sender, navigation) {
            if ($app.env == $env.today && $app.widgetIndex == -1)
              setWidgetBackground(0.1);
          }
        }
      },
      {
        type: "gradient",
        props: {
          id: "gradient",
          colors: [$color("#ff8502"), $color("#ffb831")],
          locations: [0.0, 1.0],
          startPoint: $point(0, 0),
          endPoint: $point(1, 1),
          Radius: 18,
          alpha: 0
        },
        views: [
          {
            type: "button",
            props: {
              title: "分享热点",
              font: $font(15),
              radius: 18,
              bgcolor: $color("clear"),
              id: "share"
            },
            layout: $layout.fill,
            events: {
              tapped: function(sender) {
                $share.sheet(encodeURI(url));
              }
            }
          }
        ],
        layout: function(make, view) {
          make.centerX.equalTo();
          make.width.equalTo(125);
          make.height.equalTo(34);
          make.bottom.inset(0);
        }
      }
    ]
  });
  setWidgetBackground();
}

function openWeb2(url){
  $safari.open({
    url: url,
    entersReader: false,
    height: 500,
    handler: () => {
      if ($app.env == $env.today && $app.widgetIndex == -1)
      $delay(0.1,()=>{
        setWidgetBackground(0.1);
      })
                    
//                      $widget.height = 320
    }
  
  });
}


function shareButtonAnimate(layout) {
  $("gradient").remakeLayout(layout);
  let alpha = 0;
  $ui.animate({
    duration: 1,
    damping: 0.9,
    velocity: 0.8,
    animation: () => {
      $("gradient").relayout();
      let timer = $timer.schedule({
        interval: 0.01,
        handler: function() {
          if (alpha < 1) {
            $("gradient").alpha = alpha;
            alpha += 0.02;
          } else {
            timer.invalidate();
          }
        }
      });
    }
  });
}

function setWidgetBackground(time = 0.5) {
  let alpha = 1;
  $delay(time, function() {
    let timer = $timer.schedule({
      interval: 0.01,
      handler: function() {
        if (alpha > 0) {
          $ui.vc
            .runtimeValue()
            .$view()
            .$setBackgroundColor(
              $device.isDarkMode
                ? $rgba(0, 0, 0, alpha)
                : $rgba(255, 255, 255, alpha)
            );
          alpha -= 0.02;
        } else {
          timer.invalidate();
        }
      }
    });
  });
}

function show() {
  $ui.render({
    props: {
      title: "微博热点",
      id: "weibo",
      navBarHidden: $app.env == $env.app ? false : true
      //      bgcolor: $color("clear")
    },
    views: [
      weiboList("fireList", template2, 100),
      weiboList("hotList", template, 35),
      {
        type: "tab",
        props: {
          id: "tab",
          items: ["热搜", "热门", "小时", "昨日", "前日", "周榜"],
          radius: 5
        },
        layout: function(make, view) {
          make.top.inset(0);
          make.centerX.equalTo();
          make.height.equalTo(22);
        },
        events: {
          changed: function(sender) {
//            $ui.toast("载入中...", 10);
            if (sender.index == 1) getHotSearch();
            else {
              getFire(containerid[sender.index]);
            }
          }
        }
      }
    ]
  });
  if ($app.env == $env.today && $app.widgetIndex == -1)
    setWidgetBackground(0.5);
}

function run() {
  show();
  getFire();
}
run();