var host = "www.taotu8.net";
var method = "";
var HOME = "https://www.192td.com";
var CNUM = 0;
var LocalDataPath = "taotu8.json";
var LocalList = [];
var page = 0;
var LocalData = [];
var interface = "";
var title = "";
var detailUrl = "";
var folderName = "";
var girlName = "";
var subNum = -1;
var IMGList = [];
var SEARCH_MODE = false;
let category = [
  {
    title: "高清",
    addr: "/gq/",
    sub: [
      {
        title: "秀人网",
        addr: "/gq/xiuren/"
      },
      {
        title: "美媛馆",
        addr: "/gq/mygirl/"
      },
      {
        title: "魅妍社",
        addr: "/gq/mistar/"
      },
      {
        title: "尤果网",
        addr: "/gq/ugirls/"
      },
      {
        title: "波萝社",
        addr: "/gq/bololi/"
      },
      {
        title: "模范学院",
        addr: "/gq/mfstar/"
      },
      {
        title: "嗲囡囡",
        addr: "/gq/feilin/"
      },
      {
        title: "爱蜜社",
        addr: "/gq/imiss/"
      },
      {
        title: "优星馆",
        addr: "/gq/uxing/"
      },
      {
        title: "影私荟",
        addr: "/gq/wings/"
      },
      {
        title: "蜜桃社",
        addr: "/gq/miitao/"
      },
      {
        title: "顽味生活",
        addr: "/gq/taste/"
      },
      {
        title: "尤物馆",
        addr: "/gq/youwu/"
      },
      {
        title: "花の颜",
        addr: "/gq/huayan/"
      },
      {
        title: "Kimoe",
        addr: "/gq/kimoe/"
      },
      {
        title: "星乐园",
        addr: "/gq/leyuan/"
      },
      {
        title: "糖果画报",
        addr: "/gq/candy/"
      },
      {
        title: "推女神",
        addr: "/gq/tgod/"
      },
      {
        title: "御女郎",
        addr: "/gq/dkgirl/"
      },
      {
        title: "尤蜜荟",
        addr: "/gq/youmi/"
      },
      {
        title: "克拉女神",
        addr: "/gq/kl/"
      },
      {
        title: "车展",
        addr: "/gq/car/"
      },
      {
        title: "ChinaJoy",
        addr: "/gq/chinajoy/"
      },
      {
        title: "CosPlay动漫",
        addr: "/gq/dm/"
      },
      {
        title: "会展",
        addr: "/gq/huizhan/"
      },
      {
        title: "性感美女",
        addr: "/gq/meinv/"
      }
    ]
  },
  {
    title: "国产",
    addr: "/gc/",
    sub: [
      {
        title: "Beautyleg",
        addr: "/gc/bl/"
      },
      {
        title: "Beautyleg Free download",
        addr: "/gc/blfd/"
      },
      {
        title: "森萝财团",
        addr: "/gc/slct/"
      },
      {
        title: "头条女神",
        addr: "/gc/toutiao/"
      },
      {
        title: "LegBaby",
        addr: "/gc/lb/"
      },
      {
        title: "IShow",
        addr: "/gc/ishow/"
      },
      {
        title: "Rosi",
        addr: "/gc/rosimm/"
      },
      {
        title: "假面女皇",
        addr: "/gc/mq/"
      },
      {
        title: "丽柜",
        addr: "/gc/ligui/"
      },
      {
        title: "PANS写真",
        addr: "/gc/pans/"
      },
      {
        title: "口罩系列",
        addr: "/gc/rosi/"
      },
      {
        title: "第四印象",
        addr: "/gc/disi/"
      },
      {
        title: "Beautyleg番外篇",
        addr: "/gc/blfw/"
      },
      {
        title: "动感小站",
        addr: "/gc/dg/"
      },
      {
        title: "如壹美眉",
        addr: "/gc/ru1mm/"
      },
      {
        title: "异思趣向",
        addr: "/gc/iess/"
      },
      {
        title: "AISS",
        addr: "/gc/aiss/"
      },
      {
        title: "V女郎",
        addr: "/gc/vgirl/"
      },
      {
        title: "10情趣",
        addr: "/gc/10qq/"
      },
      {
        title: "其他图系",
        addr: "/gc/qt/"
      }
    ]
  },
  {
    title: "美图",
    addr: "/new/",
    sub: [
      {
        title: "性感美女",
        addr: "/meitu/xingganmeinv/"
      },
      {
        title: "丝袜美腿",
        addr: "/meitu/siwameitui/"
      },
      {
        title: "唯美写真",
        addr: "/meitu/weimeixiezhen/"
      },
      {
        title: "网络美女",
        addr: "/meitu/wangluomeinv/"
      },
      {
        title: "高清美女",
        addr: "/meitu/gaoqingmeinv/"
      },
      {
        title: "模特美女",
        addr: "/meitu/motemeinv/"
      },
      {
        title: "体育美女",
        addr: "/meitu/tiyumeinv/"
      },
      {
        title: "动漫美女",
        addr: "/meitu/dongmanmeinv/"
      },
      {
        title: "爱尤物APP",
        addr: "/new/ugirlapp/"
      }
    ]
  },
  {
    title: "会展",
    addr: "/hz/",
    sub: [
      {
        title: "动感会展",
        addr: "/hz/dg/"
      },
      {
        title: "Beautyleg",
        addr: "/hz/beautyleg/"
      },
      {
        title: "车展",
        addr: "/hz/cz/"
      },
      {
        title: "动漫展",
        addr: "/hz/dm/"
      },
      {
        title: "内衣展",
        addr: "/hz/bra/"
      },
      {
        title: "数码展",
        addr: "/hz/tech/"
      },
      {
        title: "街拍",
        addr: "/jiepai/"
      },
      {
        title: "VR",
        addr: /vr/
      },
      {
        title: "其他",
        addr: "/hz/qt/"
      }
    ]
  },
  {
    title: "综艺",
    addr: "/zy/",
    sub: [
      {
        title: "Beautyleg",
        addr: "/zy/bl/"
      },
      {
        title: "RoSi视频写真",
        addr: "/zy/rosi/"
      },
      {
        title: "动感小站",
        addr: "/zy/dg/"
      },
      {
        title: "动感热舞",
        addr: "/zy/dgrw/"
      },
      {
        title: "秀人网视频",
        addr: "/zy/xiuren/"
      },
      {
        title: "美女写真",
        addr: "/zy/xz/"
      },
      {
        title: "活动代言",
        addr: "/zy/dy/"
      },
      {
        title: "韩国综艺",
        addr: "/zy/hgzy/"
      },
      {
        title: "辣妹热舞",
        addr: "/zy/lmrw/"
      },
      {
        title: "其他综艺",
        addr: "/zy/qtzy/"
      },
      {
        title: "Rq-Star",
        addr: "/zy/rqstar/"
      },
      {
        title: "尤果网",
        addr: "/zy/ugirls/"
      }
    ]
  },
  {
    title: "收藏"
  }
];

function listView(wn) {
  return {
    type: "view",
    props: {
      id: "listView",
      radius: 5,
      bgcolor: $color("clear"),
      borderWidth: 1,
      borderColor: $color("tint"),
      alpha: 0
    },
    views: [
      {
        type: "list",
        props: {
          id: "list",
          template: {
            props: {
              bgcolor: $color("clear")
            },
            views: [
              {
                type: "label",
                props: {
                  id: "name",
                  bgcolor: $color("clear"),
                  textColor: $color("tint"),
                  align: $align.center,
                  font: $font(15)
                },
                layout: $layout.fill
              }
            ]
          },
          rowHeight: wn == 0 ? 25 : wn == 1 ? 33 : 40
        },
        layout: $layout.fill,
        events: {
          didSelect(sender, indexPath, data) {
            $ui.toast(data.name.text + "加载中...", 5);
            listGone();
            $("preView").data = [];
            page = 0;
            subNum = indexPath.row;
            getPostData(CNUM, subNum);
            $("main").title = category[CNUM].sub[subNum].title;

            $("preView").contentOffset = $point(0, 0);
          }
        }
      }
    ],
    layout: function(make, view) {
      var h = wn == 0 ? 25 : wn == 1 ? 33 : 40;
      var hn = category[wn].sub.length;
      make.top.inset(30);
      make.left.inset(5 + 60 * wn);
      make.width.equalTo(120);
      make.height.equalTo(hn * h);
    }
  };
}

function mainUI(column, rowHeight) {
  $ui.render({
    props: {
      title: "套图吧",
      id: "main"
    },
    views: [
      createButton(
        "高清",
        "b0",
        "l0",
        function(make, view) {
          make.top.inset(3);
          make.left.inset(5);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
          changeButton(0);
        },
        function() {
          subChannel(0);
        }
      ),
      createButton(
        "国产",
        "b1",
        "l1",
        function(make, view) {
          make.top.inset(3);
          make.left.equalTo($("b0").right).offset(19);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
          changeButton(1);
        },
        function() {
          subChannel(1);
        }
      ),
      createButton(
        "美图",
        "b2",
        "l2",
        function(make, view) {
          make.top.inset(3);
          make.left.equalTo($("b1").right).offset(19);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
          changeButton(2);
        },
        function() {
          subChannel(2);
        }
      ),
      createButton(
        "会展",
        "b3",
        "l3",
        function(make, view) {
          make.top.inset(3);
          make.left.equalTo($("b2").right).offset(19);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
          changeButton(3);
        },
        function() {
          subChannel(3);
        }
      ),
      createButton(
        "综艺",
        "b4",
        "l4",
        function(make, view) {
          make.top.inset(3);
          make.left.equalTo($("b3").right).offset(19);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
          changeButton(4);
        },
        function() {
          subChannel(4);
        }
      ),
      createButton(
        "收藏",
        "b5",
        "l5",
        function(make, view) {
          make.top.inset(3);
          make.left.equalTo($("b4").right).offset(19);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
          if ($("l5").hidden == false) return;
          $("main").remove();
          //          mainUI(4, 135);
          let column = $cache.get("column") || 0;
          mainUI(Math.pow(2, column + 1), 275 / Math.pow(2, column));
          $("preView").data = [];
          underline(5);
          if (LocalList.length == 0) {
            $ui.toast("暂无收藏内容，请收藏");
          } else {
            LocalData.fav.map(function(i) {
              $("preView").data = $("preView").data.concat({
                title: i.title,
                detail: i.url,
                interface: {
                  src: i.src
                }
              });
            });
          }

          $("preView").contentOffset = $point(0, 0);
        }
      ),
      {
        type: "input",
        props: {
          type: $kbType.search,
          darkKeyboard: true,
          id: "search",
          placeholder: "请搜索...",
          font: $font(14),
          radius: 5
        },
        layout: function(make, view) {
          make.left.right.inset(5);
          make.top.inset(30);
          make.height.equalTo(27);
        },
        events: {
          returned: function(sender) {
            page = 0
            showSearch(sender.text);
            $("search").blur();
            listGone();
          }
        }
      },
      {
        type: "tab",
        props: {
          id: "tabC",
          hidden: false,
          items: ["二列", "四列", "八列"],
          tintColor: $color("tint"),
          radius: 5,
          bgcolor: $color("white"),
          alpha: 0.8,
          index: $cache.get("column") ? $cache.get("column") : 0
        },
        layout: function(make) {
          make.right.inset(10);
          make.top.inset(33);
          make.height.equalTo(22);
          make.width.equalTo(130);
        },
        events: {
          changed(sender) {
            $device.taptic(0);
            let id = sender.index;
            $cache.set("column", id);
            let text = $("search").text;
   
            let temp = $("preView").data;

            $("main").remove();
            mainUI(Math.pow(2, id + 1), 275 / Math.pow(2, id));
            $("preView").data = [];

            temp.map(function(i) {
              $("preView").data = $("preView").data.concat({
                title: i.title,
                detail: i.detail,
                interface: {
                  src: i.interface.src
                },
                recGra:{
                                      hidden:LocalList.indexOf(i.interface.src)>=0?false:true
                                      }
              });
            });
            
            if (SEARCH_MODE == true && text) {
              $("search").text = text;
              return;
            }else{
              underline(CNUM)
            }
            $("preView").contentOffset = $point(0, 0);
            if(id==2){
              
              getPostData(CNUM)
              getPostData(CNUM)
            }
            
          }
        }
      },

      {
        type: "matrix",
        props: {
          id: "preView",
          itemHeight: rowHeight,
          columns: column,
          spacing: 1,
          square: false,
          bgcolor: $color("clear"),
          template: [
            {
              type: "image",
              props: {
                radius: 5,
                contentMode: $contentMode.scaleAspectFit,
                id: "interface"
              },
              layout: $layout.fill
            },
                   {
                     type: "gradient",
                     props: {
                       id: "recGra",
                       colors: [$color("#2f74e0"), $color("#5d44e0")],
                       locations: [0.0, 1.0],
                       startPoint: $point(0, 0),
                       endPoint: $point(1, 1),
                       radius: 8,
                       hidden: true,
                       alpha: 0.4
                     },
                     layout: $layout.fill
                   },
            
          ]
        },
        layout: function(make, view) {
          make.left.right.bottom.inset(5);
          make.top.inset(60);
          // make.top.equalTo($("menu").bottom)
        },
        events: {
          willBeginDragging(sender) {
            listGone();
          },
          didReachBottom(sender) {
            sender.endFetchingMore();
            
            if ($("l5").hidden !== false) {
              getPostData(CNUM, subNum);

              //              $delay(0.5, function() {
              //                getPostData(CNUM);
              //              });
            }
          },
          didSelect(sender, indexPath, data) {
            //            $ui.toast("加载中...", 5);
            interface = data.interface.src;
            title = data.title;
            folderName = title;
            //            console.log(folderName)

            if (/.*\s(.+)/g.test(folderName))
              girlName = /.*\s(.+)/g.exec(folderName)[1];
            else girlName = folderName;

            console.log(girlName);
            console.log(data.detail);
            let idx = $cache.get("shitu") || 1;

            showPhotos(title, Math.pow(2, idx), 563 / Math.pow(2, idx));
            if ($("l5").hidden == false) {
              //收藏栏

              $("favorite").title = "取消收藏";
              $("favorite").bgcolor = $color("#4f86f2");
              $("favorite").info = data.detail;
              $("detailView").data = [];
              getDetailPost(data.detail);
              getBaidu(data.detail);
              return;
            } else $ui.toast("载入中...", 5);
            $http.request({
              method: "GET",
              url: data.detail,
              handler: function(resp) {
                //console.log(resp.data)
                var url = /uaredirect\("(.*)"/g.exec(resp.data)[1];
                //                $("share").info = url
                $("favorite").info = url;
                detailUrl = url;
                $("detailView").data = [];
                if (LocalList.indexOf(interface) > -1) {
                  $("favorite").title = "取消收藏";
                  $("favorite").bgcolor = $color("#4f86f2");
                }
                getDetailPost(url);
                getBaidu(url);
              }
            });
          },
          didLongPress(sender, indexPath, data) {
            alert(data.title);
          }
        }
      }
      //      listView(CNUM)
    ]
  });
}

function detailMatrix(columns, rowHeight) {
  return {
    type: "matrix",
    props: {
      id: "detailView",
      itemHeight: rowHeight,
      columns: columns,
      spacing: 2,
      bgcolor: $color("clear"),
      template: [
        {
          type: "image",
          props: {
            contentMode: $contentMode.scaleAspectFit,
            id: "detailImage"
          },
          layout: $layout.fill
        }
      ]
    },
    layout: function(make, view) {
      make.left.right.top.inset(0);
      make.bottom.inset(50);
    },
    events: {
      didSelect(sender, indexPath, data) {
        var v = $("detailView").cell(indexPath).views[0].views[0];
        //$ui.action(indexPath.constructor)
        $quicklook.open({
          image: v.image
        });
      }
    }
  };
}

function showPhotos(title, columns, rowHeight) {
  $ui.push({
    props: {
      title: title,
      id: "photos"
    },
    views: [
      detailMatrix(columns, rowHeight),
      {
        type: "button",
        props: {
          id: "download",
          bgcolor: $color("black"),
          radius: 0,
          title: "下载",
          alpha: 0.9,
          hidden: true
        },
        layout: function(make, view) {
          make.left.bottom.inset(0);
          make.width.equalTo(view.super).dividedBy(2);
          make.height.equalTo(50);
        },
        events: {
          tapped(sender) {
            $cache.clear();
            $device.taptic(0);

            var urlList = [];
            if ($("download").title == "下载") {
              $delay(0.5, function() {});
              sender.title = "正在下载...";
              urlList = $("detailView").data.map(function(i) {
                return i.detailImage.src;
              });
              if (!$drive.exist("套图吧/" + girlName))
                $drive.mkdir("套图吧/" + girlName);
              if (!$drive.exists("套图吧/" + girlName + "/" + folderName)) {
                $drive.mkdir("套图吧/" + girlName + "/" + folderName);
              }
              $("progress").value = 0;
              var count = 0;
              for (var i = 0; i < urlList.length; i++) {
                $http.download({
                  url: urlList[i],
                  handler: function(resp) {
                    count++;
                    sender.title = "正在下载第 " + count + " 幅图";
                    $("progress").value = (count * 1.0) / urlList.length;
                    if (count == urlList.length) {
                      sender.title = "完成, iCloud Drive 查看";
                      $device.taptic(1);
                      $("progress").value = 0;
                    }
                    var path =
                      "套图吧/" +
                      girlName +
                      "/" +
                      folderName +
                      "/" +
                      resp.response.suggestedFilename;
                    $drive.write({
                      data: resp.data,
                      path: path
                    });
                  }
                });
              }
            }
            $cache.clear();
          }
        }
      },
      {
        type: "button",
        props: {
          id: "share",
          bgcolor: $color("black"),
          radius: 0,
          title: "下载",
          alpha: 0.9,
          hidden: false
        },
        layout: function(make, view) {
          //        let w = $device.info.screen.width / 3

          make.bottom.inset(0);
          make.left.inset(0);
          make.width.equalTo(view.super).dividedBy(3);
          make.height.equalTo(50);
        },
        events: {
          tapped(sender) {
            $device.taptic(0);
            var data = {
              src: interface,
              url: detailUrl,
              title: title
            };
            if ($("favorite").title == "收藏") {
              favoriteButtonTapped("add", data);
              $("favorite").title = "取消收藏";
              $("favorite").bgcolor = $color("#4f86f2");
            }

            //            $app.openURL(
            //              "pythonista://Tools/taotu8?action=run&args=" +
            //                encodeURI($("favorite").info)
            //            );

            $app.openURL(
              "pythonista://Tools/taotu8_jsbox" +
                method +
                "?action=run&argv=" +
                encodeURI(girlName) +
                "&argv=" +
                encodeURI(folderName) +
                "&argv=" +
                encodeURI(IMGList)
            );
            //            console.log(IMGList)
          },
          longPressed: function(sender) {
            $device.taptic(1);
            if (!sender.sender.info) {
              $ui.error("暂无百度云链接", 0.5);
              return;
            }
            $clipboard.text = $cache.get("code");
            $push.schedule({
              title: "密码:" + $cache.get("code"),
              body: "已复制",
              delay: 1
            });
            $app.openURL(sender.sender.info);
          }
        }
      },
      {
        type: "button",
        props: {
          id: "vc",
          bgcolor: $color("#00ae95"),
          radius: 0,
          title: "视图",
          alpha: 0.9
        },
        layout: function(make, view) {
          let w = $device.info.screen.width / 3;
          make.right.inset(w);
          make.bottom.inset(0);
          make.width.equalTo(view.super).dividedBy(3);
          make.height.equalTo(50);
        },
        events: {
          tapped(sender) {
            $device.taptic(0);
            $ui.menu({
              items: [1, 2, 4],
              handler: (title, idx) => {
                $("detailView").remove();
                $("photos").add(
                  detailMatrix(Math.pow(2, idx), 563 / Math.pow(2, idx))
                );
                $cache.set("shitu", idx);
                $("detailView").data = [];
                $("detailView").data = $("detailView").data.concat(
                  IMGList.map(function(i) {
                    return {
                      detailImage: {
                        src: i
                      }
                    };
                  })
                );
              }
            });
          }
        }
      },
      {
        type: "button",
        props: {
          id: "favorite",
          bgcolor: $color("black"),
          radius: 0,
          title: "收藏",
          alpha: 0.9
        },
        layout: function(make, view) {
          make.right.bottom.inset(0);
          make.width.equalTo(view.super).dividedBy(3);
          make.height.equalTo(50);
        },
        events: {
          tapped(sender) {
            $device.taptic(0);
            var data = {
              src: interface,
              url: detailUrl,
              title: title
            };
            if ($("favorite").title == "收藏") {
              favoriteButtonTapped("add", data);
              $("favorite").title = "取消收藏";
              $("favorite").bgcolor = $color("#4f86f2");
            } else {
              favoriteButtonTapped("del", data);
              $("favorite").title = "收藏";
              $("favorite").bgcolor = $color("black");
            }
            $delay(0.5, function() {});
          },
          longPressed: function(sender) {
            $device.taptic(1);
            if ($("l5").hidden == false) $app.openURL(detailUrl);
            //            console.log(sender.sender)
            $app.openURL(sender.sender.info);
          }
        }
      },
      {
        type: "progress",
        props: {
          id: "progress",
          value: 0,
          trackColor: $color("clear"),
          alpha: 0.8,
          progressColor: $color("green"),
          userInteractionEnabled: false
        },
        layout: function(make, view) {
          make.bottom.left.right.inset(0);
          make.height.equalTo(40);
        }
      }
    ]
  });
}

function createButton(text, id1, id2, layout, handler, handler2) {
  return {
    type: "button",
    props: {
      title: text,
      titleColor: $color("black"),
      font: $font("bold", 17),
      radius: 5,
      bgcolor: $color("clear"),
      id: id1,
      borderWidth: 0,
      borderColor: $color("tint")
    },
    views: [
      {
        type: "label",
        props: {
          id: id2,
          hidden: true,
          text: "下划1",
          align: $align.center,
          borderWidth: 20,
          borderColor: $color("tint")
        },
        layout: function(make, view) {
          make.centerX.equalTo();
          make.bottom.inset(0);
          make.height.equalTo(2);
        }
      }
    ],
    layout: layout,
    events: {
      tapped: handler,
      longPressed: handler2
    }
  };
}

function getPostData(CNUN, subNum) {
  page++;
  if(SEARCH_MODE==true){
      let u = $cache.get("searchUrl")
      let a = u.split("-")
      let url = a[0]+"-"+page+"-"+a[2]
//      console.log(url)
      $http.get({
        url: url,
        handler: resp => {
          
          var reg = /<li>[\s\S]*?<\/li>/g;
                var match = resp.data.match(reg);
                var removed = match.slice(8);
//                console.log(removed)
                //      var postData = []
//                $ui.clearToast();
                if(removed==0){
                  $ui.toast("已到底",0.5)
                  return
                }
                removed.map(function(i) {
                  var image = /(img src=")([\s\S]*?)(")/.exec(i)[2];
                  var detail = /(href=")([\s\S]*?)(")/.exec(i)[2];
                  if (detail.indexOf(HOME) < 0) {
                    detail = HOME + detail;
                  }
                  var title = /<span>(.*?)<\/span>/.exec(i)[1];
                  $("preView").data = $("preView").data.concat({
                    title: title,
                    detail: detail,
                    interface: {
                      src: image
                    },
                    recGra:{
                      hidden:LocalList.indexOf(image)>=0?false:true
                    }
                  });
                });
        }
      });
//      alert("d")
      return
    }
  if (page == 1) {
    if (!(subNum >= 0)) var url = category[CNUM].addr;
    else url = category[CNUM].sub[subNum].addr;
  } else {
    if (!(subNum >= 0)) url = category[CNUM].addr + "index_" + page + ".html";
    else url = category[CNUM].sub[subNum].addr + "index_" + page + ".html";
  }
  url = HOME + url;
  //  console.log(subNum)
  //  alert(url)
  $http.request({
    url: url,
    handler: function(resp) {
      if (!resp) {
        $ui.alert("❌ 请检查网络");
      }
      var reg = /<li>[\s\S]*?<\/li>/g;
      var match = resp.data.match(reg);
      var removed = match.slice(8);
      //console.log(removed)
      //      var postData = []
//      $ui.clearToast();
      removed.map(function(i) {
        var image = /(lazysrc=")([\s\S]*?)(")/.exec(i)[2];
        var detail = /(href=")([\s\S]*?)(")/.exec(i)[2];
        if (detail.indexOf(HOME) < 0) {
          detail = HOME + detail;
        }
        var title = /alt="(.*?)"/.exec(i)[1];
        $("preView").data = $("preView").data.concat({
          title: title,
          detail: detail,
          interface: {
            src: image
          },
          recGra:{
            hidden:LocalList.indexOf(image)>=0?false:true
          }
        });
      });
    }
  });
}

function getDetailPost(url) {
  $http.request({
    url: url,
    handler: function(resp) {
      if (!resp) {
        $ui.alert("❌ 请检查网络");
      }
      var reg = /lazysrc=[\s\S]*?  onerror/g;
      var match = resp.data.match(reg);
      //            console.log(match)
      //            console.log(url)
      IMGList = [];
      match.map(function(i) {
        IMGList.push(
          /lazysrc=(\r\n)?([\s\S]*?) /g.exec(i)[2].replace(/\r\n|\n/g, "")
        );
      });
      console.log("共计 "+IMGList.length+" 张图");
      $("detailView").data = $("detailView").data.concat(
        IMGList.map(function(i) {
          return {
            detailImage: {
              src: i
            }
          };
        })
      );
//           $ui.clearToast();
    }
  });
}

function favoriteButtonTapped(mode, data) {
  if (mode == "add") {
    LocalData.fav.unshift(data);
    LocalList.unshift(data.src);
    if ($("l5").hidden == false) {
      var temp = $("preView").data;
      temp.unshift({
        title: data.title,
        detail: data.url,
        interface: {
          src: data.src
        }
      });
      $("preView").data = temp;
    }
  } else if (mode == "del") {
    var idx = LocalList.indexOf(data.src);
    LocalList.splice(idx, 1);
    LocalData.fav.splice(idx, 1);
    if ($("l5").hidden == false) {
      $("preView").delete(idx);
    }
  }
  writeCache();
}

function writeCache() {
  $file.write({
    data: $data({ string: JSON.stringify(LocalData) }),
    path: LocalDataPath
  });
}

function showSearch(text) {
  SEARCH_MODE = true;
  $("l" + CNUM).hidden = true;
  $ui.toast("搜索中...", 5);
  $http.post({
    url: HOME + "/e/search/",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: {
      keyboard: text,
      tempid: "1",
      show: "title,keyboard"
    },
    handler: function(resp) {
//      $("search").text = text;
      $cache.set("searchUrl",resp.response.url)
      
      var reg = /<li>[\s\S]*?<\/li>/g;
      var match = resp.data.match(reg);
      if (!match) {
        alert("未找到结果");
        return;
      }
//      console.log(match);
      var removed = match.slice(8);
      //      console.log(removed);
      //      var postData = []
      $ui.toast("", 0.1);
      $("preView").data = [];
      $("preView").contentOffset = $point(0, 0);
      removed.map(function(i) {
        var image = /(img src=")([\s\S]*?)(")/.exec(i)[2];
        var detail = /(href=")([\s\S]*?)(")/.exec(i)[2];
        if (detail.indexOf(HOME) < 0) {
          detail = HOME + detail;
        }
        var title = /<span>(.*?)<\/span>/.exec(i)[1];
        $("preView").data = $("preView").data.concat({
          title: title,
          detail: detail,
          interface: {
            src: image
          },
          recGra:{
                      hidden:LocalList.indexOf(image)>=0?false:true
                      }
        });
      });
    }
  });
}

function underline(num) {
  //  if (CNUM == 5) {
  //    $("main").remove();
  //    mainUI(2, 270);
  //  }
  $("l0").hidden = true;
  $("l1").hidden = true;
  $("l2").hidden = true;
  $("l3").hidden = true;
  $("l4").hidden = true;
  $("l5").hidden = true;
  $("l" + num).hidden = false;
  CNUM = num;
}

function listGone() {
  //  SEARCH_MODE = true
  if (subNum >= 0 && CNUM != 5) {
    $ui.animate({
      duration: 0.5,
      animation: function() {
        $("listView").alpha = 0;
      }
    });
  }
}

function changeButton(num) {
  $device.taptic(0);
  SEARCH_MODE = false;
  $("search").text = "";
  $ui.toast("加载中...", 5);
  listGone();
  subNum = -1;
  underline(num);
  page = 0;
  $("preView").data = [];
  getPostData(num);
  $("preView").contentOffset = $point(0, 0);
}

function subChannel(num) {
  $device.taptic(1);
  if (CNUM != num) changeButton(num);
  $("search").text = "";
  listGone();
  subNum = num;
  underline(num);
  $("main").add(listView(num));
  $ui.animate({
    duration: 0.5,
    animation: function() {
      $("listView").alpha = 1;
    }
  });
  category[num].sub.map(function(i) {
    $("list").data = $("list").data.concat({
      name: {
        text: i.title
      },
      url: i.addr
    });
  });
}

function getBaidu(url) {
  $http.get({
    url: url,
    handler: function(resp) {
      var data = resp.data;
      var shortU = /http:\/\/17.*?"/g.exec(data);
      if (!shortU) {
        $ui.error("暂无百度云链接: "+IMGList.length+" 张图",1);
        return;
      }
      shortU = shortU[0].slice(0, -1);
      //      console.log(data)
      var code = /码[:：]\s?(\w{4})/g.exec(data)[1];
//      console.log(code);
      $cache.set("code", code);
      //      $clipboard.text = code
      $("share").code = code;
      //      alert(shortU)
      $http.get({
        url: shortU,
        handler: function(resp) {
          var data = resp.data;
          var panU = /https?:\/\/pan.*?"/g.exec(data)[0].slice(0, -1);
          $("share").info = panU;
          $ui.toast("百度盘链接已获取: "+IMGList.length+" 张图",1)
        }
      });
    }
  });
}

function main() {
  page = 0;
  getPostData(0);
  $("l0").hidden = false;
  if ($file.read(LocalDataPath)) {
    LocalData = JSON.parse($file.read(LocalDataPath).string);
    LocalList = LocalData.fav.map(i => i.src);
  } else {
    LocalData = { fav: [] };
    LocalList = [];
  }
}
$cache.remove("searchUrl")
let column = $cache.get("column") || 0;
mainUI(Math.pow(2, column + 1), 275 / Math.pow(2, column));
main();
