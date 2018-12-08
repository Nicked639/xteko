const hotSeachApi =
  "https://api.weibo.cn/2/guest/page?gsid=_2AkMtqmJ0f8NhqwJRmPEdxGnjaIx-wwDEieKb9pOvJRMxHRl-wT9kqnAAtRV6Bm0NBHg_Q_-5Rx4sx0moY_1sSSEoN2zx&uid=1009882141998&wm=3333_2001&i=ddd48a6&b=0&from=1084393010&checktoken=745495b139d5d0943c12418acc7a08f8&c=iphone&networktype=wifi&v_p=60&skin=default&s=ffffffff&v_f=1&did=10dc157a640f1c1bd53cbacbad02326f&lang=zh_CN&sflag=1&ft=0&moduleID=pagecard&uicode=10000011&featurecode=10000085&feed_mypage_card_remould_enable=1&luicode=10000003&count=20&extparam=filter_type%3Drealtimehot%26mi_cid%3D100103%26pos%3D0_0%26c_type%3D30%26display_time%3D1526132043&containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&fid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&page=1";

const hotWeiboApi =
  "https://api.weibo.cn/2/guest/statuses_unread_hot_timeline?gsid=_2AkMsWcS5f8NhqwJRmPEdxGnjaIx-wwDEieKaBTViJRMxHRl-wT9jqhUHtRV6Bm0NBJtwNGf7sD9vWinqTxfteTn6j0PV&uid=1009882141998&wm=3333_2001&i=ddd48a6&b=0&from=1085193010&checktoken=745495b139d5d0943c12418acc7a08f8&c=iphone&networktype=4g&v_p=60&skin=default&s=ef3ddddd&v_f=1&did=10dc157a640f1c1bd53cbacbad02326f&lang=zh_CN&sflag=1&ua=iPhone9,2__weibo__8.5.1__iphone__os11.3&ft=0&aid=01AtRD1ZgBBPGE25lc8nv6Zf3kE2dc9EyFhUimttlBTNKYNmA.&cum=47EFCA86";

const template = {
  views: [
    {
      type: "label",
      props: {
        id: "label",
        textColor: $color("black"),
        align: $align.center,
        font: $font(14)
      },
      layout: function(make, view) {
        make.right.top.bottom.inset(0);
        make.left.inset(15);
      }
    },
    {
      type: "label",
      props: {
        id: "icon",
        bgcolor: $rgb(254, 158, 25),
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
  views: [
    {
      type: "label",
      props: {
        id: "label",
        textColor: $color("black"),
        align: $align.left,
        font: $font(14),
        lines:2
      },
      layout: function(make, view) {
        make.right.inset(0);
        make.centerY.equalTo()
        make.left.inset(60);
      }
    },{
      type: "label",
      props: {
        id: "name",
        textColor: $color("black"),
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

function weiboList(mode,temp) {
  return {
    type: "list",
    props: {
      id: mode,
      template: temp,
      //data:options
      bgcolor: $color("clear"),
      hidden: true,
      rowHeight:mode=="fireList"?40:35,
      actions: [
        {
          title: "微博",
          color: $rgb(246,22,31), // default to gray
          handler: function(sender, indexPath) {
            $cache.set("app","weibo")
      $app.openURL(sender.data[indexPath.row].label.info);
          }
        },
        {
          title: "墨客",
          color:$rgb(69,134,209),
          handler: function(sender, indexPath) {
            $cache.set("app","moke")
      if(mode == "fireList"){
                $app.openURL("moke:///status?mid="+sender.data[indexPath.row].label.id)
              }else{
                let text = /.、([\s\S]*)/g.exec(sender.data[indexPath.row].label.text)[1]
                $app.openURL("moke:///search/statuses?query="+encodeURI(text))
              }
          }
        }
      ]
    },
    layout: $layout.fill,
    events: {
      didSelect: function(sender, indexPath) {
        let app = $cache.get("app")||"weibo"
        if(app=="weibo") $app.openURL(sender.data[indexPath.row].label.info);
        else{
          if(mode == "fireList"){
                    $app.openURL("moke:///status?mid="+sender.data[indexPath.row].label.id)
                  }else{
                    let text = /.、([\s\S]*)/g.exec(sender.data[indexPath.row].label.text)[1]
                    $app.openURL("moke:///search/statuses?query="+encodeURI(text))
                  }
        }
        
      }
    }
  };
}

function show() {
  $ui.render({
    props: {
      title: "微博热点",
      id: "weibo",
      navBarHidden:true,
    },
    views: [
      weiboList("hotList",template),
      weiboList("trendList",template),
      weiboList("fireList",template2),
      {
                  type: "button",
                  props: {
                    id: "closebtn",
                    bgcolor: $color("clear"),
                    icon: $icon("225", $color("tint"), $size(18, 18))
                  },
                  layout: function(make, view) {
                    make.bottom.inset(10);
                    make.left.inset(6);
                  },
                  events: {
                    tapped(sender) {
                      $device.taptic(0);
                      $widget.height = 181;
                      $("weibo").remove();
                      var dataManager = require("../data-manager");
                      dataManager.init(mode);
                      var path = $app.env == $env.app ? "scripts/app" : "scripts/widget";
                      var module = require(path);
                      module.init(mode);
                      $("input").text = $clipboard.text
                    }
                  }
                },
      {
        type: "tab",
        props: {
          id:"tab",
          items: ["热搜", "趋势", "热门"],
          bgcolor:$color("clear"),
          tintColor:$color("tint"),
          borderColor:$color("clear"),
//          alpha:0.8,
          radius:5
        },
        layout: function(make, view) {
          make.bottom.inset(10);
          make.centerX.equalTo();
        },
        events: {
          changed: function(sender) {
            $ui.toast("载入中...",10)
            if (sender.index == 0) getHotSearch();
            else if (sender.index == 1) {
              getHotSearch("trend");
            } else if (sender.index == 2) {
              getFire();
            }
          }
        }
      }
    ]
  });
}

function getFire() {
  $http.request({
    method: "POST",
    url: hotWeiboApi,
    header: {
      "User-Agent": "Weibo/27683 (iPhone; iOS 11.3; Scale/3.00) "
    },
    form: {
      refresh: "pulldown",
      group_id: "102803",
      extparam: "discover|new_feed",
      fid: "102803",
      lon: "116.233115",
      uicode: "10000225",
      containerid: "102803",
      featurecode: "10000225",
      refresh_sourceid: "10000365",
      since_id: "4242760586282015",
      need_jump_scheme: "1"
    },
    handler: function(resp) {
      let data = resp.data;
      if (data.errmsg) {
        alert(data.errmsg);
        return;
      }
      $("hotList").hidden = true;
      $("trendList").hidden = true;
      $("fireList").hidden = false;
      $("fireList").data = [];
      $ui.toast(data.remind_text_old, 1);
      let hots = data.statuses;
      for(let i=0;i<hots.length;i++){
        $("fireList").data = $("fireList").data.concat({
          label:{
            text:hots[i].text,
            info:hots[i].scheme,
            id:/.*mblogid=([\s\S]*)/g.exec(hots[i].scheme)[1]
          },
          name:{
            text:hots[i].user.name
          }
        })
      }
    }
  });
}

function getHotSearch(mode = "hotSearch") {
  //  $ui.toast("载入中", 10);
  $http.get({
    url: hotSeachApi,
    handler: function(resp) {
      let data = resp.data;
      if (data.errmsg) {
        alert(data.errmsg);
        return;
      }
      mode = mode == "hotSearch" ? 0 : data.cards.length - 1;
      let hotCards = data.cards[mode].card_group;
      $("hotList").data = [];
      $("trendList").data = [];
      if (mode == 0) {
        $("hotList").hidden = false;
        $("trendList").hidden = true;
        $("fireList").hidden = true;
      } else {
        $("hotList").hidden = true;
        $("trendList").hidden = false;
        $("fireList").hidden = true;
      }
      for (let i = 0; i < hotCards.length; i++) {
        let icon = {};
        let prefix = "";
        if (mode == 0) {
          let num = i;
          if (i == 0) num = "🏆";
          else if (i == 1) num = "🥇";
          else if (i == 2) num = "🥈";
          else if (i == 3) num = "🥉";
          prefix = num + "、";
          if (hotCards[i].icon) {
            if (hotCards[i].icon.indexOf("re") > 0) {
              icon.hidden = false;
              icon.text = "热";
              icon.bgcolor = $rgb(254, 158, 25);
            } else if (hotCards[i].icon.indexOf("xin") > 0) {
              icon.hidden = false;
              icon.text = "新";
              icon.bgcolor = $rgb(254, 73, 95);
            } else if (hotCards[i].icon.indexOf("jian") > 0) {
              icon.hidden = false;
              icon.text = "荐";
              icon.bgcolor = $rgb(76, 173, 254);
            } else if (hotCards[i].icon.indexOf("fei") > 0) {
              icon.hidden = false;
              icon.text = "沸";
              icon.bgcolor = $rgb(247, 98, 0);
            }
          }
          $("hotList").data = $("hotList").data.concat({
            label: {
              text: prefix + hotCards[i].desc,
              info: hotCards[i].scheme
            },
            icon: icon
          });
        } else {
          if (hotCards[i].icon) {
            if (hotCards[i].icon.indexOf("sheng") > 0) {
              icon.hidden = false;
              icon.text = "升";
              icon.bgcolor = $rgb(254, 75, 95);
            }
          }
          $("trendList").data = $("trendList").data.concat({
            label: {
              text: prefix + hotCards[i].desc,
              info: hotCards[i].scheme
            },
            icon: icon
          });
        }
      }
      
      $ui.toast(timeConvert(data.pageInfo.starttime)+"  更新", 1);
    }
  });
}

function timeConvert(unixTime){
  let date = new Date(unixTime*1000);
          // Hours part from the timestamp
          let hours = date.getHours();
          // Minutes part from the timestamp
          let minutes = "0" + date.getMinutes();
          // Seconds part from the timestamp
          let seconds = "0" + date.getSeconds();
          
          let year = date.getFullYear()
          let month = date.getMonth()+1
          let dateN = date.getDate()
          // Will display time in 10:30:23 format
          let formattedTime = year + "-"+month+"-"+dateN+ "  "+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          return formattedTime
}

function run() {
  $widget.height = 400
  show();
  getHotSearch();
}

module.exports={
  run:run
}
