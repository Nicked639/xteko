$app.theme = "auto";
var dHeight = $cache.get("dh") ? $cache.get("dh") : 320; // 通知中心默认展开高度
$widget.height = dHeight;
var eHeight = $cache.get("eh") ? $cache.get("eh") : 450; // 通知中心默认扩展高度
var hotMode = $cache.get("hotMode") ? $cache.get("hotMode") : "simple";
var hotSearchMode = $cache.get("hotSearchMode")
  ? $cache.get("hotSearchMode")
  : "web";
var page = 1;
var uPage = 1;
var userId = "";
var searchOn = 1;
var areaCode = $cache.get("areaCode") ? $cache.get("areaCode") : getAreaCode();
var code = $cache.get("code") ? $cache.get("code") : "";
var city = code ? getKeyByValue($cache.get("areaCode"), code) : "";
var tabIndex = $cache.get("tabIndex") ? $cache.get("tabIndex") : 0;
var readme = $cache.get("readme") ? $cache.get("readme") : "";
var LocalDataPath = "Weibo.json";
var LocalData = "";
if ($file.read(LocalDataPath)) {
  LocalData = JSON.parse($file.read(LocalDataPath).string);
} else {
  LocalData = { follows: [] };
}
var arrayTemp = [];
const hotSeachApi =
  "https://weibointl.api.weibo.cn/portal.php?ct=feed&a=get_topic_weibo&auth=137bc4c95743aa9cb487e885df73c36c&lang=zh-Hans&page=1&time=1583981594565&ua=iPhone10%2C3_iOS13.4_Weibo_intl._373_wifi&udid=2AD2FF08-A479-49B1-984D-152652C6E0F4&user_id=1144318961&version=373";

//const hotWeiboApi = "https://api.weibo.cn/2/statuses/unread_hot_timeline";

const hotWeiboApi =
  "https://api.weibo.cn/2/statuses/unread_hot_timeline?gsid=_2A25zbf5gDeRxGedP71YS8SbFzT2IHXVuO3aorDV6PUJbkdANLVr5kWpNX-gVeUGvGmi6BRcxOymooYVtsr1th2nA&sensors_mark=0&wm=3333_2001&sensors_is_first_day=true&from=10A3093010&b=0&c=iphone&networktype=wifi&skin=default&v_p=81&v_f=1&s=88888888&sensors_device_id=443E6FB5-2EC1-4EC1-A52C-79FE7AB02DDB&lang=zh_CN&sflag=1&ua=iPhone10,3__weibo__10.3.0__iphone__os13.4&ft=0&aid=01A4mJNKK6GKh7WFpYiAYjBb1tVUqpdpIUMj5xc42WDV5i_Lo.&launchid=10000365--x";

const searchUrl =
  "https://api.weibo.cn/2/searchall?gsid=_2A25zbf5gDeRxGedP71YS8SbFzT2IHXVuO3aorDV6PUJbkdANLVr5kWpNX-gVeUGvGmi6BRcxOymooYVtsr1th2nA&sensors_mark=0&wm=3333_2001&sensors_is_first_day=true&from=10A3093010&b=0&c=iphone&networktype=wifi&skin=default&v_p=81&v_f=1&s=88888888&sensors_device_id=443E6FB5-2EC1-4EC1-A52C-79FE7AB02DDB&lang=zh_CN&sflag=1&ua=iPhone10%2C3__weibo__10.3.0__iphone__os13.4&ft=0&aid=01A4mJNKK6GKh7WFpYiAYjBb1tVUqpdpIUMj5xc42WDV5i_Lo.&uid=1144318961&luicode=10000327&count=10&featurecode=10000085&uicode=10000003&need_head_cards=1&extparam=phototab_style%3Dtrue&feed_mypage_card_remould_enable=1&st_bottom_bar_new_style_enable=0&need_new_pop=1&client_key=75e2c9bcd65d13ac61c877ddaa458060&moduleID=pagecard&oriuicode=10000010_10000327&launchid=10000365--x&page=";

const hotSeachApi1 =
  "https://api.weibo.cn/2/guest/page?gsid=_2AkMtqmJ0f8NhqwJRmPEdxGnjaIx-wwDEieKb9pOvJRMxHRl-wT9kqnAAtRV6Bm0NBHg_Q_-5Rx4sx0moY_1sSSEoN2zx&uid=1009882141998&wm=3333_2001&i=ddd48a6&b=0&from=1084393010&checktoken=745495b139d5d0943c12418acc7a08f8&c=iphone&networktype=wifi&v_p=60&skin=default&s=ffffffff&v_f=1&did=10dc157a640f1c1bd53cbacbad02326f&lang=zh_CN&sflag=1&ft=0&moduleID=pagecard&uicode=10000011&featurecode=10000085&feed_mypage_card_remould_enable=1&luicode=10000003&count=20&extparam=filter_type%3Drealtimehot%26mi_cid%3D100103%26pos%3D0_0%26c_type%3D30%26display_time%3D1526132043&containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&fid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&page=1";

const locationUrl =
  "https://api.weibo.cn/2/cardlist?gsid=_2A25zbf5gDeRxGedP71YS8SbFzT2IHXVuO3aorDV6PUJbkdANLVr5kWpNX-gVeUGvGmi6BRcxOymooYVtsr1th2nA&sensors_mark=0&wm=3333_2001&sensors_is_first_day=true&from=10A3093010&b=0&c=iphone&networktype=wifi&skin=default&v_p=81&v_f=1&s=88888888&sensors_device_id=443E6FB5-2EC1-4EC1-A52C-79FE7AB02DDB&lang=zh_CN&sflag=1&ua=iPhone10%2C3__weibo__10.3.0__iphone__os13.4&ft=0&aid=01A4mJNKK6GKh7WFpYiAYjBb1tVUqpdpIUMj5xc42WDV5i_Lo.&page_interrupt_enable=0&scenes=0&extparam=discover&orifid=231619&count=20&luicode=10000010&uicode=10000327&need_head_cards=0&need_new_pop=1&scenes_t=0&oriuicode=10000010&lfid=231619&moduleID=pagecard&launchid=10000365--x&containerid=";

const userInfoApi =
  "https://api.weibo.cn/2/users/show?sensors_mark=0&wm=3333_2001&sensors_is_first_day=false&from=10A3193010&sensors_device_id=443E6FB5-2EC1-4EC1-A52C-79FE7AB02DDB&c=iphone&networktype=wifi&v_p=82&skin=default&v_f=1&b=0&lang=zh_CN&sflag=1&ua=iPhone10%2C3__weibo__10.3.1__iphone__os13.4&ft=0&aid=01A4mJNKK6GKh7WFpYiAYjBb1tVUqpdpIUMj5xc42WDV5i_Lo.&get_teenager=1&has_extend=1&s=8d2817c2&gsid=_2A25zaNB5DeRxGedP71YS8SbFzT2IHXVuPGSxrDV6PUJbkdANLVr5kWpNX-gVeWuDRrLLptpiHaYYy2jINw_P-LMw&has_profile=1&launchid=--x&uid=";

const userStApi =
  "https://api.weibo.cn/2/statuses/show?gsid=_2A25zaNB5DeRxGedP71YS8SbFzT2IHXVuPGSxrDV6PUJbkdANLVr5kWpNX-gVeWuDRrLLptpiHaYYy2jINw_P-LMw&sensors_mark=0&wm=3333_2001&sensors_is_first_day=false&from=10A3193010&b=0&c=iphone&networktype=wifi&skin=default&v_p=82&v_f=1&s=8d2817c2&sensors_device_id=443E6FB5-2EC1-4EC1-A52C-79FE7AB02DDB&lang=zh_CN&sflag=1&ua=iPhone10,3__weibo__10.3.1__iphone__os13.4&ft=0&aid=01A4mJNKK6GKh7WFpYiAYjBb1tVUqpdpIUMj5xc42WDV5i_Lo.&uicode=10000002&moduleID=feed&orifid=universallink&has_member=1&lfid=universallink&isGetLongText=1&oriuicode=10000360&launchid=default&id=";

const userContentApi =
  "https://api.weibo.cn/2/profile/statuses?gsid=_2A25zaNB5DeRxGedP71YS8SbFzT2IHXVuPGSxrDV6PUJbkdANLVr5kWpNX-gVeWuDRrLLptpiHaYYy2jINw_P-LMw&sensors_mark=0&wm=3333_2001&sensors_is_first_day=false&from=10A3193010&b=0&c=iphone&networktype=wifi&skin=default&v_p=82&v_f=1&s=8d2817c2&sensors_device_id=443E6FB5-2EC1-4EC1-A52C-79FE7AB02DDB&lang=zh_CN&sflag=1&ua=iPhone10%2C3__weibo__10.3.1__iphone__os13.4&ft=0&aid=01A4mJNKK6GKh7WFpYiAYjBb1tVUqpdpIUMj5xc42WDV5i_Lo.&oriuicode=10000011&count=20&luicode=10000011&uicode=10000198&st_bottom_bar_new_style_enable=0&need_head_cards=0&need_new_pop=1&client_key=4654bde8da914bb619fd60a5c1e8cc5d&moduleID=pagecard&page_interrupt_enable=0&launchid=--x&containerid=107603";
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
      type: "image",
      props: {
        id: "hotPic",
        radius: 5,
        src: "https://www.b2b315.com/skin/m03skinBlue/image/nopic320.gif"
      },
      layout: function(make, view) {
        make.left.inset(10);
        make.top.inset(10);
        make.size.equalTo($size(80, 80));
      },
      events: {
        tapped(sender) {
          console.log(sender.info);
          openSafari(sender.info);
        }
      }
    },
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
        align: $align.left,
        font: $font(15)
      },
      layout: function(make, view) {
        make.right.top.inset(0);
        make.height.equalTo(35);
        make.left.inset(100);
      }
    },
    {
      type: "label",
      props: {
        id: "hotContent",
        bgcolor: $color("clear"),
        textColor: $device.isDarkMode ? $color("#cccccc") : $color("#222222"),
        align: $align.left,
        font: $font(13),
        //        insets:$insets(0,0,0,0),
        //        editable:false,
        lines: 2
      },
      layout: function(make, view) {
        make.bottom.inset(23);
        make.right.inset(10);
        make.left.inset(100);
        make.top.inset(30);
      }
    },
    {
      type: "label",
      props: {
        id: "hotInfo",
        bgcolor: $color("clear"),
        textColor: $device.isDarkMode ? $color("#cccccc") : $color("#111111"),
        font: $font(11),
        align: $align.left,
        alpha: 0.8
      },
      layout: function(make, view) {
        make.left.inset(100);
        make.width.equalTo(300);
        make.bottom.inset(0);
        make.height.equalTo(30);
      },
      events: {
        tapped: function(sender) {}
      }
    }
  ]
};

const template1 = {
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
console.log("darkmode:"+$device.isDarkMode)
const template2 = {
  props: {
    bgcolor: $color("clear")
  },
  views: [
    {
      type: "label",
      props: {
        id: "hotContent",
        textColor: $device.isDarkMode ? $color("white") : $color("black"),

        align: $align.left,
        font: $font(12),
        bgcolor: $color("clear"),
        lines: 4,
        autoFontSize: true
      },
      layout: function(make, view) {
        make.right.inset(95);
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
        tapped(sender) {
          openSafari(sender.info);
        }
      }
    },
    {
      type: "image",
      props: {
        id: "pic",
        radius: 5,
        src: "https://www.b2b315.com/skin/m03skinBlue/image/nopic320.gif"
      },
      layout: function(make, view) {
        make.right.inset(10);
        make.top.inset(10);
        make.size.equalTo($size(80, 80));
      },
      events: {
        tapped(sender) {
          //          console.log(sender.src);

          //          alert("d")
          console.log(sender.info);
          if (sender.info.length) $ui.toast("载入中...", 3);

          if (typeof sender.info == "string") {
            getStreamUrl("safari", sender.info);
          } else {
            if (sender.info.length == 1 && sender.info[0].indexOf("video") > 0)
              openSafari(sender.info[0]);
            else {
              //              alert("f")
              //              return
              $delay(0.3, () => {
                $widget.height = eHeight;
                $quicklook.open({
                  list: sender.info,
                  handler: function() {
                    $ui.clearToast();
                    if ($app.env == $env.today && $app.widgetIndex == -1)
                      setWidgetBackground(0.1);
                    $widget.height = dHeight;
                  }
                });
              });
            }
          }
        }
      },
      views: [
        {
          type: "button",
          props: {
            id: "play",
            font: $font(12),
            icon: $icon("049", $rgba(255, 255, 255, 0.7), $size(30, 30)),
            bgcolor: $color("clear"),
            hidden: true
          },
          layout: function(make, view) {
            make.center.equalTo(view.super);
          },
          events: {
            tapped(sender) {
              //              console.log(sender.info)
              $ui.toast("视频载入中...", 5);
              if ($("tab").index == 0) {
                getStreamUrl("safari", sender.info);
              } else {
                console.log(sender.info);
                if (sender.info.indexOf("video") > 0) openSafari(sender.info);
                else
                  $quicklook.open({
                    url: sender.info,
                    handler: function() {
                      if ($app.env == $env.today && $app.widgetIndex == -1)
                        setWidgetBackground(0.5);
                    }
                  });
              }
            }
          }
        },
        {
          type: "label",
          props: {
            id: "num",
            textColor: $color("white"),
            align: $align.right,
            font: $font("bold", 15),
            bgcolor: $color("clear")
          },
          layout: function(make, view) {
            make.bottom.inset(-3);
            make.right.inset(1);
            make.width.equalTo(30);
            make.height.equalTo(20);
          }
        },
        {
          type: "label",
          props: {
            id: "gif",
            textColor: $color("white"),
            align: $align.center,
            font: $font(10),
            bgcolor: $color("#637B96"),
            text: "含动图",
            radius: 5,
            hidden: true
          },
          layout: function(make, view) {
            make.bottom.inset(0);
            make.left.inset(0);
            make.width.equalTo(35);
            make.height.equalTo(17);
          }
        }
      ]
    },
    {
      type: "label",
      props: {
        id: "name",
        textColor:
          $app.env == $env.app
            ? $device.isDarkMode
              ? $color("white")
              : $color("black")
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
    },
    {
      type: "label",
      props: {
        id: "time",
        textColor: $device.isDarkMode ? $color("#aaaaaaa") : $color("#666666"),
        align: $align.left,
        font: $font(10)
      },
      layout: function(make, view) {
        //        make.centerY.equalTo()
        make.top.equalTo($("name").bottom).offset(0);
        make.left.inset(50);
        make.width.equalTo(200);
        //        make.top.inset(18);
      }
    }
  ]
};

function list(id, temp) {
  return {
    type: "list",
    props: {
      id: id,
      template: temp,
      hidden: false,
      rowHeight: temp == template1 ? 35 : 100,
      bgcolor: $app.env==$env.today?$color("clear"):$device.isDarkMode?$color("black"):$color("white"),
      header: searchText(id),
      actions: [
        {
          title: "墨客",
          color: $rgb(69, 134, 209),
          handler: function(sender, indexPath) {
            $cache.set("app", "moke");
            if ($("fireList")) {
              $app.openURL(
                "moke:///status?mid=" + sender.data[indexPath.row].hotContent.id
              );
            } else {
              let text = "";
              if (hotMode == "detail")
                text = sender.data[indexPath.row].hotTitle.text;
              else
                text = /.、([\s\S]*)/g.exec(
                  sender.data[indexPath.row].hotTitle.text
                )[1];
              //              console.log(text)
              $app.openURL("moke:///search/statuses?query=" + encodeURI(text));
            }
          }
        },
        {
          title: "微博国际",
          color: $rgb(242, 152, 0), // default to gray
          handler: function(sender, indexPath) {
                        
            $cache.set("app", "weibointernational");
            
            let url = sender.data[indexPath.row].hotContent.info.replace(
              "sinaweibo",
              "weibointernational"
            );
            console.log(url)
            $app.openURL(url);
          }
        },
        {
          title: "微博",
          color: $rgb(246, 22, 31), // default to gray
          handler: function(sender, indexPath) {
            //console.log(sender.data[indexPath.row].label.info);
            $cache.set("app", "weibo");
            $app.openURL(sender.data[indexPath.row].hotContent.info);
          }
        },

        {
          title: tabIndex == 6 ? "删除" : "赞赏",
          color: tabIndex == 6 ? $color("gray") : $rgb(44, 161, 67), // default to gray
          handler: async function(sender, indexPath) {
            if (tabIndex !== 6) wechatPay();
            else {
              let uid = sender.data[indexPath.row].userId.toString();
              let index = LocalData.follows.indexOf(uid);
              //console.log("uid: "+uid+",index: "+index+",fo:"+LocalData.follows)

              LocalData.follows.splice(index, 1);
              let name = await getUserName(uid);

              writeCache();
              $ui.error("已删除: " + name);

              $("fireList").delete(indexPath.row);
              //console.log(LocalData)
            }
          }
        }
      ]
    },
    layout: function(make, view) {
      make.bottom.left.right.inset(0);
      make.top.inset(0);
    },
    events: {
      didEndDragging: function(sender) {
        if ($("fireList")) {
          let y = $("fireList").contentOffset.y;
                    console.log(y);
          let t = null;

          if (y < 35 && y >= 0) t = 0;
          if (y >= 30 && y < 45) t = 45;
          console.log(t)
          if (t == null) return
          else searchAnimate(t);
        } else {
          let y = $("hotList").contentOffset.y;
          //          console.log(y);
          let t = null;

          if (y < 35 && y >= 0) t = 0;
          if (y >= 26 && y < 45) t = 45;
          if (t == null) return;
          else searchAnimate(t, "hotList");
        }
      },

      didSelect: function(sender, indexPath) {
        let url = "";
        let userName = "";
        if ($("hotList") && hotMode == "simple")
          url = sender.data[indexPath.row].hotTitle.link;
        else {
          url = sender.data[indexPath.row].hotContent.link;
          userName = sender.data[indexPath.row].userName;
          userId = sender.data[indexPath.row].userId;
        }

        //console.log(sender.data[indexPath.row]);
        console.log(userId);
        $widget.height = eHeight;
        $delay(0.1, () => {
          openWeb(url, userName, userId);
        });
      },
      didLongPress: function(sender, indexPath, data) {
        //        let name = sender.data[indexPath.row].label.infoname;
        //        console.log(name);
        //        url = "http://s.weibo.com/weibo?q=%23" + name + "%23&Refer=top";
        //        $share.sheet(encodeURI(url));
        if ($app.env == $env.app || $app.widgetIndex !== -1) return;
        $app.close();
      },
      pulled: function(sender) {
        if (tabIndex == 1) {
          $("hotList").data = [];

          if (hotMode == "simple") getHotSearch1();
          else getHotSearch();
        } else if (tabIndex == 6) {
          getFollows();
    
        }
        else {
          $("fireList").data = [];

          page = 1;
          if (hotSearchMode == "web")
            getFire(page, containerid[$("tab").index]);
          else getLocal(page);
        }
        sender.endRefreshing();
      },
      didReachBottom: function(sender) {
        if ($("fireList") && tabIndex !== 6 && !$("userContentList")) {
          //           alert(hotSearchMode)
          page++;
          $ui.toast("载入中...", 1);
          if (searchOn == 1) getSearch($("searchText").text, page);
          else if (tabIndex == 0) {
            if (hotSearchMode == "web")
              getFire(page, containerid[$("tab").index]);
            else getLocal(page);
          } else getFire(page, containerid[$("tab").index]);
        } else if ($("userContentList")) {
          uPage++;
          getUserContent(userId, uPage);
        }
        sender.endFetchingMore();
      }
    }
  };
}

function getHotSearch1() {
  //  $ui.toast("载入中...", 10);
  $http.get({
    url: hotSeachApi1,
    handler: function(resp) {
      let data = resp.data;
      if (data.errmsg) {
        alert(data.errmsg);
        return;
      }
      let hotCards = data.cards[0].card_group;

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
          hotTitle: {
            text: prefix + hotCards[i].desc,
            info: hotCards[i].scheme,
            link:
              "http://s.weibo.com/weibo?q=%23" +
              hotCards[i].desc +
              "%23&Refer=top"
          },
          hotContent:{
            info: hotCards[i].scheme,
          },
          icon: icon
        });
      }
      $("hotList").data = temp;
      $ui.toast(timeConvert(data.pageInfo.starttime) + "  更新", 0.6);
      searchAnimate(45, "hotList");
    }
  });
  //  alert($props($("tab")))
}

function getHotSearch() {
  //  $ui.toast("载入中...", 10);
  $http.get({
    url: hotSeachApi,
    handler: function(resp) {
      let data = resp.data;
      //      console.log(data)
      if (data.errmsg) {
        alert(data.errmsg);
        return;
      }

      $("hotList").data = [];
      var temp = [];
      var topics = resp.data.topics;
      for (var i = 0; i < topics.length; i++) {
        let t = topics[i];
        let desc2 = t.desc2;
        let desc1 = t.desc1;
        let pic = t.pic;
        let name = t.card_type_name;

        temp = temp.concat({
          hotTitle: {
            text: name
          },
          hotContent: {
            text: desc1,
            info:
              "sinaweibo://searchall?containerid=100103&q=%23" +
              encodeURI(name) +
              "%23&isnewpage=1&extparam=cate=0&pos=4&realpos=4&flag=1&filter_type=realtimehot&c_type=31&display_time=1583982910",
            link:
              "http://s.weibo.com/weibo?q=%23" +
              encodeURI(name) +
              "%23&Refer=top"
          },
          hotPic: {
            src: pic,
            info:
              "http://s.weibo.com/weibo?q=%23" +
              encodeURI(name) +
              "%23&Refer=top"
          },
          hotInfo: {
            text: desc2
          }
        });
      }

      $("hotList").data = temp;
      $ui.toast(timeConvert() + "  更新", 0.6);
      searchAnimate(45, "hotList");
    }
  });
  //  alert($props($("tab")))
}

function getFire(page, containerid = "102803") {
  //  $ui.toast("载入中...");
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
      refresh: "loadmore",
      group_id: 1028038799,
      show_toplist: 1,
      extparam: "discover|new_feed",
      fid: containerid,
      uicode: 10000495,
      count: 25,
      trim_level: 1,
      max_id: page,
      trim_page_recom: 0,
      containerid: containerid,
      fromlog: 1028038799,
      uid: 1144318961,
      orifid: "",
      refresh_sourceid: 10000010,
      featurecode: 10000001,
      lastAdInterval: -1,
      oriuicode: "",
      daily_total_times: 20,
      need_jump_scheme: 1
    },

    handler: function(resp) {
      let data = resp.data;
//      console.log(data);
      var hots = data.statuses;
      var temp = [];

      for (let i = 0; i < hots.length; i++) {
        var t = calcHots(hots[i]);
        temp = temp.concat(t);
      }

      if (page > 1) {
        temp = $("fireList").data.concat(temp);
        $("fireList").data = [];
        $("fireList").data = temp;
      } else {
        $("fireList").data = [];
        $("fireList").data = temp;
        searchAnimate(45, "fireList");
      }
    }
  });
}

function getAreaCode() {
  let url =
    "https://raw.githubusercontent.com/Nicked639/xteko/master/Weibo/areaCode.txt";

  $http.get({
    url: url,
    handler: function(resp) {
      areaCode = resp.data;
      $cache.set("areaCode", resp.data);
    }
  });
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

async function getLocal(page) {
  $("searchText").text = "输入完整市或区名称以更改（当前：" + city + "）";
  if (!code) {
    $ui.alert({
      title: "请在上方输入完整市或区名称",
      message: "如「北京市」",
      actions: [
        {
          title: "OK",
          disabled: false, // Optional
          handler: function() {
            searchAnimate(0);
            inputCity();
          }
        }
      ]
    });

    return;
  }
  //  console.log(code);
  let m =
    "102803_ctg1_1552_-_ctg1_1552_-_object_id_-_80086" +
    code +
    "00000000_-_page_type_-_1_-_name_-_"; //+encodeURI(city)
  //  console.log(m)
  let locUrl = locationUrl + m + "&fid=" + m + "&page=" + page;
  let resp = await $http.get({ url: locUrl });
  let data = resp.data;
  //  console.log(data)
  let cards = data.cards;

  var temp = [];
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].mblog) {
      var t = calcHots(cards[i].mblog);
      temp = temp.concat(t);
    }
  }
  //        console.log(temp);
  if (temp.length == 0) {
    $ui.error("无本地微博");
    return;
  }

  if (page > 1) {
    temp = $("fireList").data.concat(temp);
    $("fireList").data = [];
    $("fireList").data = temp;
  } else {
    $("fireList").data = [];
    $("fireList").data = temp;
  }
}

function getSearch(kw, page) {
  
  let url =
    searchUrl + page + "&containerid=100103type%3D1%26q%3D" + encodeURI(kw);
  //  $ui.toast("载入中...");
  $http.get({
    url: url,
    handler: resp => {
      var data = resp.data;
      console.log(data);
      let cards = data.cards;

      var temp = [];
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].mblog) {
          var t = calcHots(cards[i].mblog);
          temp = temp.concat(t);
        }
      }
//      console.log(temp);
      if (temp.length == 0) {
        $ui.error("无搜索结果");
        return;
      }

      if (page > 1) {
        temp = $("fireList").data.concat(temp);
        $("fireList").data = [];
        $("fireList").data = temp;
      } else {
        $("fireList").data = [];
        $("fireList").data = temp;
        searchAnimate(45, "fireList");
      }
    }
  });
}

function getFollows() {
  $("searchText").text = "点击输入要关注的用户 UID";
  $("fireList").data = [];
  
  if (LocalData.follows.length == 0) {
    $ui.alert({
      title: "请在上方输入要关注的用户 UID",
      message: "也可粘贴该用户微博链接",
    });
  }
  arrayTemp = [];
  LocalData.follows.map(i => {
    getUserInfo(i);
    
  });
  
//  $delay(1,()=>{
//    searchAnimate(45,"fireList");
//  })
}

function inputUid() {
  $input.text({
    type: $kbType.search,
    placeholder: $clipboard.text ? $clipboard.text : "点击输入要关注的用户 UID",

    darkKeyboard: true,
    handler: async function(text) {
      if (!text) text = $clipboard.text;
      let reg = /\/?(\d{10})\/?/;
      if (text.match(reg)) {
        console.log(text.match(reg));
        let uid = text.match(reg)[1];
        let name = await getUserName(uid);
        if (!name) {
          $ui.error("用户 UID 错误！");
          return;
        }
        $ui.toast("已关注用户: " + name);
        LocalData.follows.push(uid);
        writeCache();
        getFollows();
      } else $ui.error("用户 UID 输入错误");
    }
  });
}

function writeCache() {
  $file.write({
    data: $data({ string: JSON.stringify(LocalData) }),
    path: LocalDataPath
  });
}

function getUserInfo(userid) {
  $http.get({
    url: userInfoApi + userid,
    handler: function(resp) {
      var d = resp.data;
      //console.log(resp)
      //        let id = d.id;
      let st = d.status;
      let stId = st.id;
      console.log(stId);

      $http.get({
        url:
          userStApi +
          stId +
          "&mid=" +
          stId +
          "&luicode=10000360&_status_id=" +
          stId,
        handler: resp => {
          var data = resp.data;
          //             console.log(data)
          var temp = calcHots(data);

          arrayTemp = arrayTemp.concat(temp);
          arrayTemp.sort((x, y) => {
            return y.time - x.time;
          });
          
          $("fireList").data = arrayTemp;

        }
      });
    }
  });
}

async function getUserName(userid) {
  let resp = await $http.get({
    url: userInfoApi + userid
  });
  let name = resp.data.name;
  console.log(name);
  return name;
}

function getUserContent(uid, page) {
  $http.get({
    url:
      userContentApi +
      uid +
      "&fid=107603" +
      uid +
      "&orid=100505" +
      uid +
      "&lfid=100505" +
      uid +
      "&page=" +
      page,
    handler: function(resp) {
      let data = resp.data;
      let cards = data.cards;

      var temp = [];
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].mblog) {
          var t = calcHots(cards[i].mblog);
          temp = temp.concat(t);
        }
      }

      if (page > 1) {
        temp = $("userContentList").data.concat(temp);
        $("userContentList").data = [];
        $("userContentList").data = temp;
      } else {
        $("userContentList").data = [];
        $("userContentList").data = temp;
        searchAnimate(45, "userContentList");
      }
    }
  });
}

function calcHots(hots) {
  var pic_url = "";
  var ori_pic = "";
  var gifHidden = true;
  var d = new Date(hots.created_at);
  var unixT = d.getTime();
  var num = hots.pic_num;
  var page_info = hots.page_info;
  //       console.log(page_info)
  var pic_infos = hots.pic_infos;
  var pic_array = [];
  var isVideo = false;
  let m = d.getMonth()+1
  d =d.getFullYear().toString().substr(0,2)+"-"+
    m +
    "-" +
    d.getDate() +
    " " +
    addZero(d.getHours()) +
    ":" +
    addZero(d.getMinutes());

  if (num > 0) {
    num = num - 1;
    pic_url = hots.thumbnail_pic;
    ori_pic = hots.original_pic;
    if (pic_infos) {
      for (var key in pic_infos) {
        var reg = /.gif$/;
        if (reg.test(pic_infos[key].original.url)) {
          //              if(pic_infos[key].video) pic_array=pic_array.concat(pic_infos[key].video)
          //              else
          //              pic_array = pic_array.concat(pic_infos[key].original.url)
          gifHidden = false;
        } //else
        pic_array = pic_array.concat(pic_infos[key].original.url);
      }
    } else {
      ori_pic = page_info.page_pic;
    }
  } else if (page_info) {
//    console.log(page_info);
    pic_url = page_info.page_pic;
    if (!pic_url) {
      if (page_info.cards) pic_url = page_info.cards[0].page_pic;
    }
    if (page_info.media_info) {
      ori_pic = page_info.media_info.stream_url_hd;
      if (!ori_pic) ori_pic = page_info.media_info.stream_url;
      isVideo = true;
    } else ori_pic = pic_url;
    pic_array = ori_pic ? [ori_pic] : [];
  }
  //if(!ori_pic) console.log(hots[i].text)
  var t = {
    userId: hots.user.id,
    userName: hots.user.screen_name,
    uTime: unixT,
    hotContent: {
      text: hots.text,
      info: hots.scheme,
      id: /.*mblogid=([\s\S]*)/g.exec(hots.scheme)[1],
      link: "https://m.weibo.cn/" + hots.user.id + "/" + hots.id
    },
    name: {
      text: hots.user.name
    },
    avatar: {
      src: hots.user.profile_image_url,
      info: "https://m.weibo.cn/" + hots.user.id + "/" + hots.id
    },
    pic: {
      src: pic_url
        ? pic_url
        : "http://ucar.gac-toyota.com.cn/Images/no_photo.GIF",
      //            info:pic_array.length==0?pic_array:("tab").index>0?pic_array:pic_array.length>1?pic_array:pic_array[0].indexOf("video")<0?pic_array:"https://m.weibo.cn/" + hots[i].user.id + "/" + hots[i].id
      info: isVideo
        ? "https://m.weibo.cn/" + hots.user.id + "/" + hots.id
        : pic_array
    },
    play: {
      hidden: !ori_pic ? true : ori_pic.indexOf("video") > 0 ? false : true,
      info:
        $("tab").index == 0
          ? "https://m.weibo.cn/" + hots.user.id + "/" + hots.id
          : ori_pic
    },
    time: {
      text: d
    },
    num: {
      text: num > 0 ? "+" + num : ""
    },
    gif: {
      hidden: gifHidden
    }
  };

  return t;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function timeConvert() {
  let date = new Date();
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

function openWeb(url, userName, userId) {
  //  $widget.height = detailHeight;
  $ui.push({
    props: {
      navBarHidden: $app.env == $env.app ? false : true,
      bgcolor: $color("clear")
    },
    events: {
      disappeared: function() {
        if ($app.env == $env.today && $app.widgetIndex == -1)
          setWidgetBackground(0);
        $widget.height = dHeight;
      },
      appeared: function() {
        $delay(0.45, () => {
          if($("hotList")){
            shareButtonAnimate("gradient", make => {
                        make.centerX.equalTo();
                        make.width.equalTo(60);
                        make.height.equalTo(34);
                        make.bottom.inset(10);
                      });
          }else {
            shareButtonAnimate("gradient", make => {
                        make.right.inset(100);
                        make.width.equalTo(60);
                        make.height.equalTo(34);
                        make.bottom.inset(10);
                      });
          }

          shareButtonAnimate("gradient2", make => {
            make.left.inset(100);
            make.width.equalTo(60);
            make.height.equalTo(34);
            make.bottom.inset(10);
          });
        });

        $("loading").hidden = true;
      }
    },
    views: [
      {
        type: "web",
        props: {
          url: encodeURI(url),
          bgcolor: $color("clear"),
          ua:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
          style: ".login-btn,.OpenInAppButton{display:none;}",
          script:
            "window.addEventListener('pagehide', function (event) { window.event.cancelBubble = true; } );"
        },
        layout: function(make, view) {
          make.left.right.inset(0);
          make.bottom.inset(0);
          make.top.inset($app.env == $env.app ? 0 : 0);
        }
      },
      {
        type: "label",
        props: {
          id: "loading",
          textColor: $color("gray"),
          align: $align.center,
          font: $font("Rockwell-BoldItalic", 20),
          bgcolor: $color("clear"),
          text: "Loading..."
        },
        layout: $layout.fill
      },

      {
        type: "gradient",
        props: {
          id: "gradient",
          colors:[$color("#ff8502"), $color("#ffb831")],
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
              title: "分享",
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
          make.width.equalTo(60);
          make.height.equalTo(34);
          make.bottom.inset(-40);
        }
      },
      {
        type: "gradient",
        props: {
          id: "gradient2",
          colors:[$color("#4095e9"), $color("#50b1ed")], 
          locations: [0.0, 1.0],
          startPoint: $point(0, 0),
          endPoint: $point(1, 1),
          Radius: 18,
          hidden:tabIndex==1?true:false
        },
        views: [
          {
            type: "button",
            props: {
              title: "访问",
              font: $font(15),
              radius: 18,
              bgcolor: $color("clear"),
              id: "user"
            },
            layout: $layout.fill,
            events: {
              tapped: function(sender) {
                showUserContent(userName);
                
                uPage = 1;
                $("userContentListheader").hidden=true
                getUserContent(userId, uPage);
                if ($app.env == $env.today && $app.widgetIndex == -1)
                setWidgetBackground(0.5)
              }
            }
          }
        ],
        layout: function(make, view) {
          make.centerX.equalTo();
          make.width.equalTo(60);
          make.height.equalTo(34);
          make.bottom.inset(-40);
        }
      }
    ]
  });
  setWidgetBackground();
}

function openSafari(url) {
  $safari.open({
    url: url,
    entersReader: false,
    height: 550,
    handler: () => {
      $ui.clearToast();
      if ($app.env == $env.today && $app.widgetIndex == -1)
        $delay(0.1, () => {
          setWidgetBackground(0.4);
        });
    }
  });
}

async function getStreamUrl(mode = "quicklook", url) {
  console.log(url);
  $http.get({
    url: url,
    handler: function(resp) {
      $ui.clearToast();
      var data = resp.data;
      var reg = /stream_url": "([\s\S]*?)"/g;
      var video = reg.exec(data)[1];
      if (mode == "safari") {
        openSafari(video);
        return;
      }
      $quicklook.open({
        url: video,
        handler: function() {
          if ($app.env == $env.today && $app.widgetIndex == -1)
            setWidgetBackground(0.5);
        }
      });
    }
  });
}

function shareButtonAnimate(id, layout) {
  $(`${id}`).remakeLayout(layout);
  let alpha = 0;
  $ui.animate({
    duration: 1,
    damping: 0.9,
    velocity: 0.8,
    animation: () => {
      $(`${id}`).relayout();
      let timer = $timer.schedule({
        interval: 0.01,
        handler: function() {
          if (alpha < 1) {
            $(`${id}`).alpha = alpha;
            alpha += 0.02;
          } else {
            timer.invalidate();
          }
        }
      });
    }
  });
}

function searchAnimate(num, list = "fireList") {
  //  let alpha = 0;
  $ui.animate({
    duration: 1,
    damping: 0.9,
    velocity: 0.8,
    animation: () => {
      $(`${list}`).contentOffset = $point(0, num);
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

function searchText(id) {
  return {
    type: "view",
    props: {
      id: id+"header",
      hidden: false
    },
    views: [
      {
        type: "label",
        props: {
          id: "searchTextBG",
          bgcolor: $rgba(170, 170, 170, 0.2),
          radius: 7
        },
        layout: function(make, view) {
          make.centerX.equalTo(view.super);
          make.top.bottom.inset(7);
          make.left.right.inset(11);
          //            make.height.equalTo(20);
        }
      },
      {
        type: "label",
        props: {
          id: id=="userContentList"?"userSearch":"searchText",
          darkKeyboard: true,
          font: $font(12),
          bgcolor: $color("clear"),

          text: "点击输入搜索微博",
          textColor: $device.isDarkMode ? $color("#aaaaaa") : $color("#555555")
        },
        layout: function(make, view) {
          make.centerX.equalTo(view.super);
          make.top.bottom.inset(7);
          make.left.right.inset(21);
          //            make.height.equalTo(20);
        },
        events: {
          tapped: function(sender) {
            
            if (tabIndex !== 6) inputCity();
            else inputUid();
          }
        }
      },
      {
        type: "tab",
        props: {
          id: id+"mode",
          hidden: false,
          items: tabIndex==1?["简单", "详情"]:["全网", "本地"],
          index: hotSearchMode == "web" ? 0 : 1,
          radius: 5,
          font: $font(9)
        },
        layout: function(make, view) {
          make.top.inset(7);

          make.right.inset(10);
          make.height.equalTo(28);
          make.width.equalTo(90);
        },
        events: {
          changed: function(sender) {
            page = 1;
            if(id=="hotList"){
              let t = sender.index
              searchOn = 1
              hotMode=sender.index==0?"simple":"detail"
              $("hotList").remove();
                            $("weiboList").add(
                              list("hotList", hotMode == "simple" ? template1 : template)
                            );
              $("hotListmode").index=t
              $cache.set("hotMode",hotMode)
              if(hotMode=="simple"){
                getHotSearch1()
              }else{
                getHotSearch()
              }
              
            }else{
              $("fireList").data=[]
              hotSearchMode=sender.index==0?"web":"local"
              $cache.set("hotSearchMode",hotSearchMode)
              if(hotSearchMode=="web"){
                searchOn=1
                $("searchText").text = "点击输入搜索微博";
                getFire(page, "102803")
              }else{
                searchOn=0
                getLocal(page)
              }
              
            }
            
            
            
            
//            if (sender.index == 0) {
//              $("searchText").text = "点击输入搜索微博";
//              searchOn = 1
//              if ($("hotList")) {
//                hotMode = "simple";
//
//                $cache.set("hotMode", hotMode);
//
//                getHotSearch1();
//              } else {
//                hotSearchMode = "web";
//                $cache.set("hotSearchMode", hotSearchMode);
//                getFire(page);
//              }
//            } else {
//              if ($("hotList")) {
//                hotMode = "detail";
//
//                $cache.set("hotMode", hotMode);
//
//searchOn = 1
//                getHotSearch();
//              } else {
//                hotSearchMode = "local";
//                $cache.set("hotSearchMode", hotSearchMode);
//                searchOn = 0
//                getLocal(page);
//              }
//            }
//            if ($("hotList")) {
//              $("hotList").remove();
//              $("weiboList").add(
//                list("hotList", hotMode == "simple" ? template1 : template)
//              );
//              $("mode").items = ["简单", "详情"];
//            } else {
//              $("fireList").data = [];
//            }
//
//            $("mode").index = sender.index;
          }
        }
      }
    ]
  };
}

function inputCity() {
  $input.text({
    type: $kbType.search,
    placeholder: $clipboard.text ? $clipboard.text :($("fireList") && tabIndex==0&&hotSearchMode=="local")? "输入完整市或区名":"点击输入搜索微博",

    darkKeyboard: true,
    handler: async function(text) {
      if (!text) text = $clipboard.text;
      if (setHeight(text)) return;
      if ($("fireList") && tabIndex==0&& hotSearchMode == "local") {
        console.log(areaCode);
        code = areaCode[text];
        if (!code) {
          $ui.error("市区名字输入有误,请输入完整市区名", 2);
          code=$cache.get("code")
          return;
        }
        $ui.toast("地名记录成功");
        city = text;
        $cache.set("code", code);

        getLocal(page);

        return;
      }
      page = 1;
      searchOn = 1;
      if ($("hotList")) {
        $("hotList").remove();
        $("weiboList").add(list("fireList", template2));
        
        $("fireListheader").hidden = false;
      }
      tabIndex=0
              $("tab").index=0
      $("searchText").text = text;
      $("fireList").data = [];
      getSearch(text, page);
    }
  });
}

function tabView() {
  return {
    type: "tab",
    props: {
      id: "tab",
      items: ["热搜", "热门", "小时", "昨日", "前日", "周榜", "关注"],
      radius: 5,
    },
    layout: function(make, view) {
      make.top.inset(0);
      make.centerX.equalTo();
      make.left.right.inset(10);
      make.height.equalTo(22);
    },
    events: {
      changed: function(sender) {
        //$ui.toast("载入中...", 10);
      
        page = 1;
        $cache.set("tabIndex", sender.index);
        tabIndex = sender.index;
        tabInit(tabIndex);
      }
    }
  };
}

function setHeight(text) {
  let h = text.match(/\$[d|e]h\s*(\d+)/);
  if (h) {
    console.log(h);
    if (h[0].indexOf("d") == 1) {
      $cache.set("dh", h[1]);
      dHeight = h[1];
      $widget.height = dHeight;
      $ui.toast("默认展开 => " + dHeight);
    } else {
      $cache.set("eh", h[1]);
      eHeight = h[1];
      $ui.toast("默认扩展 => " + eHeight);
    }
    return true;
  }
  return false;
}

function weiboList(list) {
  return {
    props: {
      type: "view",
      id: "weiboList"
    },
    layout: (make, view) => {
      make.left.right.bottom.inset(0);
      make.top.inset(24);
    },
    views: [
      list
    ]
  };
}

function wechatPay() {
  $ui.alert({
    title: "赞赏脚本作者？",
    message:
      "点击确定二维码图片会自动存入相册同时会跳转至微信扫码,请选择相册中的二维码图片进行赞赏。",
    actions: [
      {
        title: "确定",
        handler: function() {
          let payUrl = "weixin://scanqrcode";
          $ui.toast("赞赏码下载中...", 5);
          $http.download({
            url:
              "https://raw.githubusercontent.com/Nicked639/xteko/master/JavBus/wechat.jpg",
            progress: function(bytesWritten, totalBytes) {
              //              var percentage = (bytesWritten * 1.0) / totalBytes;
            },
            handler: function(resp) {
              $photo.save({
                data: resp.data,
                handler: function(success) {
                  if (success) {
                    $push.schedule({
                      title: "二维码已存入相册",
                      body: "点击右下角「相册」选取",
                      delay: 0.8
                    });
                    $app.openURL(payUrl);
                  }
                }
              });
            }
          });
        }
      },
      {
        title: "取消",
        handler: function() {}
      }
    ]
  });
}

function showUserContent(name) {
  $ui.push({
    props: {
      title: name,
      id: "userWeibo",
      navBarHidden: $app.env == $env.app ? false : true
    },
    events: {
          disappeared: function() {
//           $("fireList").header.add(searchText("fireList"))
          },
    },
    views: [list("userContentList", template2)],
    layout: $layout.fill
  });
}

function show() {
  $ui.render({
    props: {
      title: "微博热点",
      id: "weibo",
      navBarHidden: $app.env == $env.app ? false : true,
//bgcolor:$color("black"),
      navButtons: [
        {
          symbol: "lightbulb",
          handler: () => {
            readMe();
          }
        }
      ]
    },
    views: [
      tabView(),
      weiboList(list("fireList"),template2)
    ],
    layout: $layout.fill
  });
}

function readMe() {
  let url =
    "https://raw.githubusercontent.com/Nicked639/xteko/master/Weibo/Readme.txt";

  $http.get({
    url: url,
    handler: function(resp) {
      $cache.set("readme", "1");
      //      $cache.set("tips", resp.data);
      $ui.push({
        views: [
          {
            type: "markdown",
            props: {
              content: resp.data
            },
            layout: function(make, view) {
              make.left.bottom.right.top.inset(0);
            }
          }
        ]
      });
    }
  });
}

function tabInit(index) {
  if (index == 1) {
    if ($("fireList")) {
      $("fireList").remove();
      $("weiboList").add(
        list("hotList", hotMode == "simple" ? template1 : template)
      );
    }
       $("hotListmode").index = hotMode == "simple" ? 0 : 1;
    $("hotListmode").hidden = false;
    if (hotMode == "simple") getHotSearch1();
    else getHotSearch();
  } else {
    if ($("hotList")) {
      $("hotList").remove();
      $("weiboList").add(list("fireList", template2));
    }
    $("fireList").remove();
    $("weiboList").add(list("fireList", template2));
    $("fireList").data = [];
    if (index == 0) {
      $("fireListmode").hidden = false;
      if (hotSearchMode == "web") getFire(page, "102803");
      else getLocal(page);
    } else {
      $("fireListmode").hidden = true;
      if (index == 6) getFollows();
      else getFire(page, containerid[index]);
    }

    $("fireListmode").index = hotSearchMode == "web" ? 0 : 1;
  }
}

function init() {
  if ($app.env == $env.today && $app.widgetIndex == -1)
    setWidgetBackground(0.5);
  $("tab").index = tabIndex;
 
  tabInit(tabIndex);
  if (!readme) readMe();
}

function run() {
  show();
  init();
}
run();