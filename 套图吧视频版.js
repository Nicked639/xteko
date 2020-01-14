var HOME = "https://www.mm120.net/category";
var CNUM = 0;
var LocalDataPath = "test.json";
var LocalList = [];
var page = 0;
var LocalData = [];
var title = "";
var subNum = -1;
var SEARCH_MODE = false;
var postUrl = ""
let category = [
  {
    title: "MyGirl美媛馆",
    addr: "-27",
    sub: [
      {
        title: "美腿丝袜",
        addr: "-3"
      },
      

      {
        title: "CSGirl",
        addr: "-36"
      },
      {
        title: "露水TV",
        addr: "-37"
      },
      {
        title: "FEILIN嗲囡囡",
        addr: "-20"
      }
    ]
  },
  {
    title: "Miss爱蜜社",
    addr: "-24",
    sub: [
      {
              title: "MiStar魅妍社",
              addr: "-26"
            },
      {
        title: "ROSI写真",
        addr: "-16"
      },
      {
        title: "AAA女郎",
        addr: "-17"
      },
      
      {
        title: "108TV",
        addr: "-19"
      },

      {
        title: "YOUWU尤物馆",
        addr: "-21"
      },
      {
        title: "DKGirl御女郎",
        addr: "-22"
      },

      
    ]
  },
  {
    title: "XiuRen秀人网",
    addr: "-25",
    sub: [
      {
              title: "VIP视讯系列",
              addr: "-1"
            },
      {
        title: "钻石会员专属",
        addr: "-12"
      },
      {
              title: "Beautyleg",
              addr: "-32"
            },
    ]
  },
  {
    title: "尤美",
    addr: "-4",

    sub: [
      {
        title: "美女模特",
        addr: "-7"
      },
      {
        title: "热舞美女",
        addr: "-2"
      },
      
      

      {
        title: "欧美视讯直播",
        addr: "-29"
      }
    ]
  },
  {
    title: "日韩视讯直播",
    addr: "-30",
    sub: [
      {
        title: "街拍系列",
        addr: "-5"
      },
      {
        title: "SeeMeWalking",
        addr: "-33"
      },
      {
        title: "Alluregirls天使诱惑",
        addr: "-28"
      },
      {
              title: "AISS爱丝",
              addr: "-18"
            },
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
          rowHeight: 40
        },
        layout: $layout.fill,
        events: {
          didSelect(sender, indexPath, data) {
            $ui.toast(data.name.text + "加载中...", 5);
            listGone();

            //            $("preView").data = [];
            page = 0;
            subNum = indexPath.row;
            getPostData(CNUM, subNum);
            $("main").remove();

            let column = $cache.get("column") || 0;
            title = data.name.text;
            mainUI(Math.pow(2, column + 1), 120 / Math.pow(2, column), title);
            //console.log(data)
            underline(CNUM);
            $("preView").contentOffset = $point(0, 0);
          }
        }
      }
    ],
    layout: function(make, view) {
      var h =  40;
      var hn = category[wn].sub.length;
      make.top.inset(30);
      make.left.inset(5 + 60 * wn);
      make.width.equalTo(120);
      make.height.equalTo(hn * h);
    }
  };
}

function mainUI(column, rowHeight, title) {
  $ui.render({
    props: {
      title: title,
      id: "main"
    },
    views: [
      createButton(
        "美媛馆",
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
        "爱蜜社",
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
        "秀人网",
        "b2",
        "l2",
        function(make, view) {
          make.top.inset(3);
          make.left.equalTo($("b1").right).offset(19);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.13);
        },
        function() {
          changeButton(2);
        },
        function() {
          subChannel(2);
        }
      ),
      createButton(
        "尤美",
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
        "日韩",
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

          $("preView").data = [];
          underline(5);
          if (LocalList.length == 0) {
            $ui.toast("暂无收藏内容，请收藏");
          } else {
            let temp = $("preView").data;
            console.log(LocalData.fav)
            
            LocalData.fav.map(function(i) {
              temp = temp.concat({
                title: {
                  text:i.title
                },
                detail: i.url,
                interface: {
                  src: i.src
                },
                recGra: {
                                    hidden: true
                                  }
              });
              
            });
 
              
            $("preView").data = temp;
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
            page = 0;
            title = "搜索";
            $("main").remove();
            let column = $cache.get("column") || 0;
            mainUI(Math.pow(2, column + 1), 120 / Math.pow(2, column), title);

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

            mainUI(Math.pow(2, id + 1), 120 / Math.pow(2, id), title);
            //            $("preView").data = [];

            temp.map(function(i) {
              temp.data = temp.concat({
                title: {
                  text:i.title
                },
                detail: i.detail,
                interface: {
                  src: i.interface.src
                },
                recGra: {
                  hidden: LocalList.indexOf(i.interface.src) >= 0 ? false : true
                }
              });
            });
            $("preView").data = temp;
            if (SEARCH_MODE == true && text) {
              $("search").text = text;
              return;
            } else {
              underline(CNUM);
            }
            $("preView").contentOffset = $point(0, 0);
            if (id == 2) {
              getPostData(CNUM);
              getPostData(CNUM);
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
              layout: (make, view) => {
                make.left.right.top.inset(0);
                make.bottom.inset(10);
              }
            },
            {
              type: "label",
              props: {
                id: "title",
                text: "Hello, World!",
                align: $align.center,
                font: $font(10),
                textColor: $color("black")
              },
              layout: function(make, view) {
                make.centerX.equalTo(view.super);

                make.left.right.bottom.inset(0);
              }
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
            }
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
              if (SEARCH_MODE == true|| CNUM==5) return
               $ui.toast("加载中...", 0.5);

            if ($("l5").hidden !== false) {
              getPostData(CNUM, subNum);
            }
          },
          didSelect(sender, indexPath, data) {
            let cover = data.interface.src;
            let title = data.title.text;
            //            $ui.toast("载入中...", 5);
            postUrl = data.detail
            if(CNUM==5&&SEARCH_MODE==false) {
              showVid(title,data.detail,cover)
                                                $("favorite").title = "取消收藏";
                                                $("favorite").bgcolor = $color("#4f86f2");
                                                return
              
            }
            
            $http.request({
              method: "GET",
              url: data.detail,
              handler: function(resp) {
                var videoUrl = /src='(.*?\.m3u8)/g.exec(resp.data)[1];
                
                showVid(title, videoUrl, cover);
                                $("share").info = videoUrl
                                $("favorite").info = videoUrl;
                
                                if (LocalList.indexOf(cover) > -1) {
                                  $("favorite").title = "取消收藏";
                                  $("favorite").bgcolor = $color("#4f86f2");
                                }
              }
            });
          },
                    didLongPress(sender, indexPath, data) {
                      let t = data.title.text|| data.title
                      alert(t);
                      $clipboard.text = t
                    }
        }
      }
      //      listView(CNUM)
    ]
  });
}
function showVid(title, url, cover) {
  $ui.push({
    props: {
      title: title,
      id: "vid"
    },
    views: [
      {
        type: "web",
        props: {
          id: "player",
          url: url,
//          poster: cover,
//          loop: true
//pictureInPicture:true
        },
        layout: function(make, view) {
          let width = $device.info.screen.width - 16;
          let height = (width * 67) / 100;
          make.centerX.equalTo();
          make.top.inset(200);
          make.size.equalTo($size(width, height));
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
          make.width.equalTo(view.super).dividedBy(2);
          make.height.equalTo(50);
        },
        events: {
          tapped(sender) {
            $device.taptic(0);
            var data = {
              src: cover,
              url: url,
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
            if ($("l5").hidden == false) $app.openURL(url);
            //            console.log(sender.sender)
            $app.openURL(postUrl);
          }
        }
      },
      {
        type: "button",
        props: {
          id: "share",
          bgcolor: $color("black"),
          radius: 0,
          title: "分享",
          alpha: 0.9
        },
        layout: function(make, view) {
          make.left.bottom.inset(0);
          make.width.equalTo(view.super).dividedBy(2);
          make.height.equalTo(50);
        },
        events: {
          tapped(sender) {
            $device.taptic(0);
            $share.sheet(url);
          },
          longPressed(sender) {
            $device.taptic(0);
            $clipboard.text = url;
            $ui.toast("已复制", 0.5);
          }
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
      font: $font("bold", 15),
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
  if (CNUM == 5) return;
  page++;
  var url = "";

  if (!(subNum >= 0)) url = category[CNUM].addr + "_" + page + ".html";
  else url = category[CNUM].sub[subNum].addr + "_" + page + ".html";
  url = HOME + url;
  console.log(url);

  $http.request({
    url: url,
    handler: function(resp) {
      if (!resp) {
        $ui.alert("❌ 请检查网络");
      }
      var reg = /<li class=[\s\S]*?<\/li>/g;
      var match = resp.data.match(reg);
      //      console.log(resp.data)
//            console.log(match)
      match.map(function(i) {
        var image = /img src="(.*?)"/.exec(i)[1];
        var detail = /href="(.*?)"/.exec(i)[1];

        var title = /alt="(.*?)"/.exec(i)[1].replace("性感美女写真视频","").replace("写真视频"," ").split("_").join(" ");
        let temp = $("preView").data;
        temp = temp.concat({
          detail: detail,
          title: {
            text: title
          },
          interface: {
            src: image
          },
          recGra: {
            hidden: LocalList.indexOf(image) >= 0 ? false : true
          }
        });
        $("preView").data = temp;
      });
      $ui.clearToast();
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
  $("search").text = text;
  let url = "https://www.mm120.net/search.php?q="+encodeURI(text)
  SEARCH_MODE = true;
  $("l" + CNUM).hidden = true;
  $ui.toast("搜索中...", 5);
  $http.post({
    url: url,
    handler: function(resp) {
      var reg = /<li class=[\s\S]*?<\/li>/g;
            var match = resp.data.match(reg);
//                  console.log(resp.data)
                  
            match.map(function(i) {
              var image = /img src="(.*?)"/.exec(i)[1];
              var detail = /href="(.*?)"/.exec(i)[1];
      
              var title = /alt="(.*?)"/.exec(i)[1].replace("<span class='schwords'>","").replace("</span>","").replace("性感美女写真视频","").replace("写真视频"," ").split("_").join(" ");;
              let temp = $("preView").data;
              temp = temp.concat({
                detail: detail,
                title: {
                  text: title
                },
                interface: {
                  src: image
                },
                recGra: {
                  hidden: LocalList.indexOf(image) >= 0 ? false : true
                }
              });
              $("preView").data = temp;
            });
            $ui.clearToast();
      
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
  //  $("main").remove()
  //  title=category[num].title
  //  mainUI(Math.pow(2, column + 1), 275 / Math.pow(2, column),title);

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
$cache.remove("searchUrl");
let column = $cache.get("column") || 0;
mainUI(Math.pow(2, column + 1), 120 / Math.pow(2, column), "套图吧");
main();
