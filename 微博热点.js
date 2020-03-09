const hotSeachApi =
  "https://api.weibo.cn/2/guest/page?gsid=_2AkMtqmJ0f8NhqwJRmPEdxGnjaIx-wwDEieKb9pOvJRMxHRl-wT9kqnAAtRV6Bm0NBHg_Q_-5Rx4sx0moY_1sSSEoN2zx&uid=1009882141998&wm=3333_2001&i=ddd48a6&b=0&from=1084393010&checktoken=745495b139d5d0943c12418acc7a08f8&c=iphone&networktype=wifi&v_p=60&skin=default&s=ffffffff&v_f=1&did=10dc157a640f1c1bd53cbacbad02326f&lang=zh_CN&sflag=1&ft=0&moduleID=pagecard&uicode=10000011&featurecode=10000085&feed_mypage_card_remould_enable=1&luicode=10000003&count=20&extparam=filter_type%3Drealtimehot%26mi_cid%3D100103%26pos%3D0_0%26c_type%3D30%26display_time%3D1526132043&containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&fid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&page=1";

const hotWeiboApi =
  "https://api.weibo.cn/2/statuses/unread_hot_timeline";

//let containerid = {
//  "热门":"102803",
//  "小时":"102803_ctg1_9999_-_ctg1_9999_home",
//  "昨日":"102803_ctg1_8899_-_ctg1_8899",
//  "前日":"102803_ctg1_8799_-_ctg1_8799",
//  "周榜":"102803_ctg1_8698_-_ctg1_8698"
//}
let containerid=["","102803","102803_ctg1_9999_-_ctg1_9999_home","102803_ctg1_8899_-_ctg1_8899","102803_ctg1_8799_-_ctg1_8799","102803_ctg1_8698_-_ctg1_8698"]
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
        textColor:$app.env==$env.app?$color("black"): $device.isDarkMode == true ? $color("white") : $color("black"),
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
        textColor: $app.env==$env.app?$color("black"): $device.isDarkMode == true ? $color("white") : $color("black"),
        align: $align.left,
        font: $font(11),
        lines:2
      },
      layout: function(make, view) {
        make.right.inset(20);
        make.centerY.equalTo()
        make.left.inset(60);
      }
    },{
      type: "label",
      props: {
        id: "name",
        textColor: $app.env==$env.app?$color("black"): $device.isDarkMode == true ? $color("white") : $color("black"),
        align: $align.left,
        font: $font("bold",13),
        lines:2,
        autoFontSize:true
      },
      layout: function(make, view) {
        make.centerY.equalTo()
        make.left.inset(10);
        make.width.equalTo(40)
      }
    },
  ]
};

function weiboList(id,temp,height) {
  return {
    type: "list",
    props: {
      id: id,
      template: temp,
      hidden: true,
      rowHeight: height,
      bgcolor: $color("clear"),
      actions: [
        {
          title: "微博",
          color: $rgb(246, 22, 31), // default to gray
          handler: function(sender, indexPath) {
            console.log(sender.data[indexPath.row].label.info);
            $cache.set("app", "weibo");
            $app.openURL(sender.data[indexPath.row].label.info);
          }
        },
        {
          title: "微博国际",
          color: $rgb(242, 152,0), // default to gray
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
          title: "墨客",
          color: $rgb(69, 134, 209),
          handler: function(sender, indexPath) {
       $cache.set("app","moke")
            if($("fireList").hidden==false){
                      $app.openURL("moke:///status?mid="+sender.data[indexPath.row].label.id)
                    }else{
                      let text = /.、([\s\S]*)/g.exec(sender.data[indexPath.row].label.text)[1]
                      $app.openURL("moke:///search/statuses?query="+encodeURI(text))
                    }
          }
        }
      ]
    },
    layout: (make, view) => {
      make.left.right.bottom.inset(0)
      make.top.inset(25)
    },
    events: {
      didSelect: function(sender, indexPath) {
//        let app = $cache.get("app") || "weibo";

        let url = sender.data[indexPath.row].label.link;
        console.log(sender.data[indexPath.row])
        console.log(url);
        openWeb(url);
      },
      didLongPress: function(sender, indexPath, data) {
//        let name = sender.data[indexPath.row].label.infoname;
//        console.log(name);
//        url = "http://s.weibo.com/weibo?q=%23" + name + "%23&Refer=top";
//        $share.sheet(encodeURI(url));
$app.close()
      },
      pulled: function(sender) {
        if($("tab").index==0){
           $("hotList").data=[]
          
//                  $("weibo").add(weiboList("hotList",template));
                  getHotSearch();
        }else{
          $("fireList").data=[]
          
          getFire(containerid[$("tab").index])
        }
       sender.endRefreshing()
      }
    }
  };
}

function getHotSearch() {
  //  $ui.toast("载入中", 10);
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
            link:"http://s.weibo.com/weibo?q=%23" + hotCards[i].desc + "%23&Refer=top"
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

function getFire(containerid="102803") {
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
    adss:"a829644381d03fe621933a54999bc051",
    aid:"01A_gQlePB46dDPjzk7p6P7s8w1dwrmoa-4SYtwkBUm38_q48.",
    c:"weicoabroad",
    containerid:containerid,
    count:"25",
    extparam:"discover|new_feed",
    fid:"102803_ctg1_9999_-_ctg1_9999_home",
    from:"1237393010",
    fromlog:"1028039999",
    group_id:"1028039999",
    gsid:"_2A25zYd3xDeRxGedP71YS8SbFzT2IHXVuN1Y5rDV6PUJbkdAKLW7VkWpNX-gVeSRDdU4PP1TCE6amEC95bgTLekqn",
    i:"15a1eb5",
    lang:"zh_CN",
    refresh:"pulldown",
    s:"603068d8",
    since_id:"4480206255699492",
    trim_level:1,
    trim_page_recom:0,
    tz:"Asia/Shanghai",
    ua:"iPhone10,3_iOS13.4_Weibo_intl._3730_wifi",
    uid:"1144318961",
    v_p:59
    
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
      if($("tab").index==1)
        $ui.toast(data.remind_text_old, 1);
      else
        $ui.clearToast()
      let hots = data.statuses;
      for(let i=0;i<hots.length;i++){
        $("fireList").data = $("fireList").data.concat({
          label:{
            text:hots[i].text,
            info:hots[i].scheme,
            id:/.*mblogid=([\s\S]*)/g.exec(hots[i].scheme)[1],
            link:"https://m.weibo.cn/"+hots[i].user.id+"/"+hots[i].id
          },
          name:{
            text:hots[i].user.name
          }
        })
      }
    }
  });
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
  $ui.push({
    props: {
      navBarHidden: true,
      bgcolor:$color("clear")
    },
    views: [
      {
        type: "web",
        props: {
          url: encodeURI(url),
          bgcolor:$color("clear")
        },
        layout: function(make, view) {
          make.left.right.inset(0);
          make.bottom.inset(0);
          make.top.inset(-45);
        },
        events: {
          didFinish: function(sender, navigation) {
            $delay(0.45,()=>{
              shareButtonAnimate(make => {
                            make.centerX.equalTo();
                            make.width.equalTo(125);
                            make.height.equalTo(34);
                            make.bottom.inset(81);
                           
                          });
                          
            })
            
          }
        }
      },{
                type: "web",
                props: {
                  id: "web",
                  html: ""
                },
                frame: $rect(0, 0, 0, 0),
                events: {
                  didStart: function(sender, navigation) {
                   if ($app.env == $env.today && $app.widgetIndex == -1) setWidgetBackground(0.1);
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
          alpha:0
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
  setWidgetBackground()
}

function shareButtonAnimate(layout) {
  $("gradient").remakeLayout(layout);
  let alpha = 0
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
                  $("gradient").alpha=alpha
                  alpha += 0.02;
                } else {
                  timer.invalidate();
                }
              }
            });
    }
  });
}

function setWidgetBackground(time=0.5) {
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
  if ($app.env == $env.today && $app.widgetIndex == -1) setWidgetBackground(0.3);
  $ui.render({
    props: {
      title: "微博热点",
      id: "weibo",
      navBarHidden:true,
      //      bgcolor: $color("clear")
    },
    views: [weiboList("hotList",template,35),
    weiboList("fireList",template2,40),
          {
            type: "tab",
            props: {
              id:"tab",
              items: ["热搜", "热门","小时","昨日","前日","周榜"],
              radius:5
            },
            layout: function(make, view) {
              make.top.inset(0);
              make.centerX.equalTo();
              make.height.equalTo(22)
            },
            events: {
              changed: function(sender) {
                $ui.toast("载入中...",10)
                if (sender.index == 0) getHotSearch();
                 else  {
                  getFire(containerid[sender.index]);
                }
              }
            }
          }
    ]
  });
}

function run() {
  show();
  getHotSearch();
}
run();