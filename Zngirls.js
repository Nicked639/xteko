var method = "";
var CNUM = 0;
var LocalDataPath = "zngirls.json";
var LocalList = [];
var GirlList = [];
var GoodList = [];
var page = 0;
var acPage = 0;
var LocalData = [];
var interface = "";
var title = "Zngirls";
var detailUrl = "";
var acUrl = "";
var folderName = "";
var girlName = "";
var namePrefix = "";
var IMGList = [];
var SEARCH_MODE = false;
var Browse = true;
var TIME = 1; //自动浏览间隔
var Position = 0;
var PFlag = false;
var viewMode = "downToView";
var pushFlag = false;
var count = 0;


const searchUrl = "https://m.nvshens.org/query.aspx?name=";
const category = [
  {
    title: "首页",
    addr: "https://m.nvshens.org/gallery/"
  },
  {
    title: "美媛",
    addr: "https://m.nvshens.org/gallery/meiyuanguan/"
  },
  {
    title: "秀人",
    addr: "https://m.nvshens.org/gallery/xiuren/"
  },
  {
    title: "尤果",
    addr: "https://m.nvshens.org/gallery/ugirl/"
  },
  {
    title: "魅妍",
    addr: "https://m.nvshens.org/gallery/mistar/"
  },
  {
    title: "爱蜜",
    addr: "https://m.nvshens.org/gallery/imiss/"
  },
  {
    title: "尤蜜",
    addr: "https://m.nvshens.org/gallery/mfstar/"
  },
  {
    title: "模范",
    addr: "https://m.nvshens.org/gallery/mfstar/"
  },
  {
    title: "收藏"
  },
  {
    title: "女神"
  }
];

const template = [
  {
    type: "image",
    props: {
      id: "acImg"
    },
    layout: (make, view) => {
      make.left.top.bottom.inset(5);
      make.width.equalTo(80);
    }
  },
  {
    type: "label",
    props: {
      id: "acName",
      align: $align.left,
      font: $font(15)
    },
    layout: (make, view) => {
      make.left.equalTo(view.prev.right).offset(10);
      make.width.equalTo(200);
      make.height.equalTo(30);
      make.top.inset(20);
    }
  },
  {
    type: "button",
    props: {
      id: "acFav",
      title: "收藏",
      font: $font(15),
      bgcolor: $color("tint")
    },
    layout: (make, view) => {
      make.left.equalTo(view.prev.left);
      make.top.equalTo(view.prev.bottom).offset(20);
      make.width.equalTo(75);
      make.height.equalTo(30);
    },
    events: {
      tapped(sender) {
        $device.taptic(0);
        var data = sender.info;
        if (sender.title == "收藏") {
          girlFavButtonTapped("add", data);
          sender.title = "取消收藏";
          sender.bgcolor = $color("gray");
        } else {
          girlFavButtonTapped("del", data);
          sender.title = "收藏";
          sender.bgcolor = $color("tint");
        }
      }
    }
  }
];

function tabView() {
  return {
    type: "tab",
    props: {
      id: "tab",
      items: category.map(i => {
        return i.title;
      }),
      radius: 5
    },
    layout: function (make, view) {
      make.top.inset(0);
      make.centerX.equalTo();
      make.left.right.inset(5);
      make.height.equalTo(22);
    },
    events: {
      changed: function (sender) {
        CNUM = sender.index;
        page = 1;

        if (sender.index == 8) {
          $("preView").data = [];

          if (LocalList.length == 0) {
            $ui.error("暂无收藏内容，请收藏");
          } else {
            let temp = [];
            LocalData.fav.map(function (i) {
              temp = temp.concat({
                title: i.title,
                detail: i.url,
                interface: {
                  //                  src: i.src
                  source: {
                    url: i.src,
                    header: {
                      Referer: "https://m.nvshens.org/"
                    }
                  }
                },
                recGra: {
                  hidden: true
                },
                goodGra: {
                  hidden: GoodList.indexOf(i.src) > -1 ? false : true
                }
              });
            });
            //            console.log(temp)
            $("preView").data = temp;
          }
        } else if (CNUM == 9) {
          var temp = [];
          if (GirlList.length == 0) $ui.error("暂无收藏女神，请收藏");
          else {
            LocalData.girl.map(function (i) {
              temp = temp.concat({
                acName: {
                  text: i.name,
                  info: i.url
                },

                acImg: {
                  src: i.src
                },
                acFav: {
                  title: "取消收藏",
                  bgcolor: $color("gray"),
                  info: {
                    src: i.src,
                    url: i.url,
                    title: i.name
                  }
                }
              });
            });
          }
          //                    console.log(temp)
          showSearch("女神");
          $("acList").data = temp;
        } else getPostData(CNUM, page);
        $("preView").contentOffset = $point(0, 0);
      }
    }
  };
}

let searchView = {
  type: "input",
  props: {
    type: $kbType.search,
    darkKeyboard: true,
    id: "search",
    placeholder: "请搜索...",
    font: $font(14),
    radius: 5
  },
  layout: function (make, view) {
    make.left.right.inset(5);
    make.top.inset(30);
    make.height.equalTo(27);
  },
  events: {
    returned: function (sender) {
      showSearch(sender.text);
      getSearch(sender.text);
      $("search").blur();
    }
  }
};

function splitView(title) {
  return {
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
    layout: function (make) {
      let top = pushFlag ? 0 : 33;
      let right = pushFlag ? 120 : 10;
      make.right.inset(right);
      make.top.inset(top);
      make.height.equalTo(22);
      make.width.equalTo(130);
    },
    events: {
      changed(sender) {
        $device.taptic(0);
        let id = sender.index;
        $cache.set("column", id);
        //        getPostData(CNUM,page);
        if (!pushFlag) mainSplit(id, title);
        else acSplit(id, title);
      }
    }
  };
}

function mainSplit(id, title) {
  let text = $("search").text;

  let temp = $("preView").data;

  $("main").remove();

  mainUI(Math.pow(2, id + 1), 275 / Math.pow(2, id), title);
  //            $("preView").data = [];

  temp.map(function (i) {
    temp.data = temp.concat({
      title: i.title,
      detail: i.detail,
      interface: {
        // src: i.interface.src
        source: {
          url: i.interface.src,
          header: {
            Referer: "https://m.nvshens.org/"
          }
        }
      },
      recGra: {
        hidden: LocalList.indexOf(i.interface.src) >= 0 ? false : true
      },
      goodGra: {
        hidden: GoodList.indexOf(i.interface.src) > -1 ? false : true
      }
    });
  });
  $("preView").data = temp;
  if (SEARCH_MODE == true && text) {
    $("search").text = text;
    return;
  }
  $("preView").contentOffset = $point(0, 0);
  if (id == 2) {
    page++;
    getPostData(CNUM, page);
    page++;
    getPostData(CNUM, page);
  }
}

function acSplit(id, title) {
  let temp = $("acView").data;

  $("acView").remove();
  $("actessView").add(matrixView(Math.pow(2, id + 1), 275 / Math.pow(2, id)));
  //            $("preView").data = [];

  temp.map(function (i) {
    temp.data = temp.concat({
      title: i.title,
      detail: i.detail,
      interface: {
        //src: i.interface.src
        source: {
          url: i.interface.src,
          header: {
            Referer: "https://m.nvshens.org/"
          }
        }
      },
      recGra: {
        hidden: LocalList.indexOf(i.interface.src) >= 0 ? false : true
      },
      goodGra: {
        hidden: GoodList.indexOf(i.interface.src) > -1 ? false : true
      }
    });
  });
  $("acView").data = temp;

  $("acView").contentOffset = $point(0, 0);
}

function matrixView(column, rowHeight) {
  //console.log(pushFlag);
  return {
    type: "matrix",
    props: {
      id: pushFlag ? "acView" : "preView",
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
        {
          type: "gradient",
          props: {
            id: "goodGra",
            colors: [$color("red"), $color("gold")],
            locations: [0.0, 1.0],
            startPoint: $point(0, 0),
            endPoint: $point(1, 1),
            radius: 8,
            hidden: true,
            alpha: 0.5
          },
          layout: $layout.fill
        }
      ]
    },
    layout: function (make, view) {
      make.left.right.bottom.inset(5);
      let top = pushFlag ? 22 : 60;
      make.top.inset(top);
      // make.top.equalTo($("menu").bottom)
    },
    events: {
      didReachBottom(sender) {
        if ($("tab").index !== 8) {
          $ui.toast("加载中...", 0.5);
          if (pushFlag) {
            acPage++;
            getPostData(-1, acPage, acUrl);
          } else {
            page++;
            getPostData(CNUM, page);
          }
        }
        sender.endFetchingMore();
      },
      didSelect(sender, indexPath, data) {
        interface = data.interface.source.url;
        //console.log(interface)
        title = data.title;
        folderName = title;
        console.log(folderName);
        detailUrl = data.detail.replace("net", "org");

        $clipboard.text = detailUrl;
        if (/.*\s(.+)/g.test(folderName)) {
          girlName = /.*\s(.+)/g.exec(folderName)[1];
          if (/\d{4}\.\d{2}\.\d{2}\s(VOL\.\d{3,4})?/g.exec(folderName))
            namePrefix = /\d{4}.\d{2}.\d{2}\s(VOL\.\d{3,4})?/g.exec(
              folderName
            )[0];
          //          console.log(namePrefix);
        } else girlName = folderName;

        //        console.log(girlName);
        //        console.log(data.detail);
        let idx = $cache.get("shitu") || 1;

        showPhotos(girlName, Math.pow(2, idx), 563 / Math.pow(2, idx));

        if (CNUM == 8) {
          //收藏栏

          $("favorite").title = "取消收藏";
          $("favorite").bgcolor = $color("tint");
        } else if (LocalList.indexOf(interface) > -1) {
          $("favorite").title = "取消收藏";
          $("favorite").bgcolor = $color("tint");
        }
        $ui.toast("载入中...", 5);
        $("favorite").info = data.detail;
        $("detailView").data = [];

        getDetailPost(detailUrl);
      },
      didLongPress(sender, indexPath, data) {
        alert(data.title);
      }
    }
  };
}
function mainUI(column, rowHeight, title) {
  $ui.render({
    props: {
      title: title,
      id: "main"
      //pageSheet:true
    },
    views: [
      tabView(),
      searchView,
      splitView(title),
      matrixView(column, rowHeight)
    ]
  });
}
function showAcView(column, rowHeight, name) {
  $ui.push({
    props: {
      title: name,
      id: "actessView"
    },
    events: {
      disappeared: function () {
        pushFlag = false;
      },
      appeared: function () {
        pushFlag = true;
      }
    },
    views: [splitView(name), matrixView(column, rowHeight)]
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
    layout: function (make, view) {
      make.left.right.top.inset(0);
      make.bottom.inset(50);
    },
    events: {
      didSelect(sender, indexPath, data) {
        //        var v = $("detailView").cell(indexPath).views[0].views[0];
        //$ui.action(indexPath.constructor)
        PFlag = false;
        if (viewMode == "downToView") playImg2(indexPath, girlName);
        else playImg(IMGList, indexPath.row, girlName);
        //        $quicklook.open({
        //          image: v.image
        //        });
      },
      didLongPress: function (sender, indexPath, data) {
        if (viewMode == "downToView") viewMode = "httpToView";
        else viewMode = "downToView";
        $ui.toast("View Changed");
      }
    }
  };
}
function download(params) {
  params = params || {};
  params.handlers = params.handlers || {};
  const url = params.url;
  const method = params.method || "GET";
  const timeout =  10;
  const header = {
       Referer: "https://m.nvshens.org/"
     };
  const body = params.body;
  const callback = params.handler;

  const request = $objc("NSMutableURLRequest").$requestWithURL($objc("NSURL").$URLWithString(url));
  request.$setHTTPMethod(method);
  request.$setTimeoutInterval(timeout);

  for (const [key, value] of Object.entries(header)) {
    request.$addValue_forHTTPHeaderField(value, key);
  }

  if (body) {
    request.$setHTTPBody(body.ocValue());
  }

  const session = $objc("NSURLSession").$sharedSession();
  const completionHandler = $block("void, NSURL *, NSURLResponse *, NSError *", (location, response, error) => {
    if (callback) {
      const data = $objc("NSData").$dataWithContentsOfURL(location).$copy();
      $thread.main({
        handler: () => {
          callback({
            "data": data.jsValue(),
            "response": response.jsValue(),
            "error": error.jsValue(),
          });
        }
      });
    }
  });

  const task = session.$downloadTaskWithRequest_completionHandler(request, completionHandler);
  task.$resume();
}

// exports.download = download;
function downImg(url,sender){
  download({
    "url": url,
    "handler": result => {
//      console.log(`Finished: ${JSON.stringify(result)}`);
      // props: data, response, error
      const data = result.data;
      let error = result.error
      if ('key' in error)
      console.log(error)
      count++;
            sender.title = count;
            //                    $("progress").value = (count * 1.0) / urlList.length;
            if (count == IMGList.length) {
              sender.title = "完成";
              $device.taptic(1);
            }
            
            var fileName = url.split("/").pop();
            var namePrefix = folderName.split(' ')[1]
            if (namePrefix)
            fileName = namePrefix+"-"+fileName
            var path =
              "Zngirls/" +
              girlName +
              "/" +
              folderName +
              "/" +
              fileName;
            $drive.write({
              data: data,
              path: path
            });
    }
  });
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
          hidden: false
        },
        layout: function (make, view) {
          make.bottom.inset(0);
          make.left.inset(0);
          make.width.equalTo(view.super).dividedBy(4);
          make.height.equalTo(50);
        },
        events: {
          tapped(sender) {
            //$cache.clear();
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

            if (sender.title == "下载") {
              $delay(0.5, function () {});
              sender.title = "正在下载...";

              if (!$drive.exists("Zngirls/" + girlName))
                $drive.mkdir("Zngirls/" + girlName);
              if (!$drive.exists("Zngirls/" + girlName + "/" + folderName)) {
                $drive.mkdir("Zngirls/" + girlName + "/" + folderName);
              }

              count = 0;
              for (var i = 0; i < IMGList.length; i++) {
               downImg(IMGList[i],sender)
                            }
//              let requests = IMGList.map(img => downImg(img, sender));

             
//              Promise.all(IMGList).then(urls=>urls.forEach(url=>downImg(url,sender)));
            }
            //            $cache.clear();
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
          hidden: true
        },
        layout: function (make, view) {
          //        let w = $device.info.screen.width / 3

          make.bottom.inset(0);
          make.left.inset(0);
          make.width.equalTo(view.super).dividedBy(4);
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
              "pythonista2://Tools/taotu8_jsbox" +
                method +
                "?action=run&argv=" +
                encodeURI(girlName) +
                "&argv=" +
                encodeURI(folderName) +
                "&argv=" +
                encodeURI(IMGList) +
                "&argv=" +
                encodeURI(namePrefix)
            );
            //                        console.log(IMGList)
          }
        }
      },
      {
        type: "button",
        props: {
          id: "vc",
          bgcolor: $color("darkGray"),
          radius: 0,
          title: "视图",
          alpha: 0.9
        },
        layout: function (make, view) {
          let w = $device.info.screen.width / 4;
          make.right.inset(w);
          make.bottom.inset(0);
          make.width.equalTo(view.super).dividedBy(4);
          make.height.equalTo(50);
        },
        events: {
          tapped(sender) {
            $device.taptic(0);
            $ui.menu({
              items: [1, 2, 4, 8],
              handler: (title, idx) => {
                $("detailView").remove();
                $("photos").add(
                  detailMatrix(Math.pow(2, idx), 563 / Math.pow(2, idx))
                );
                $cache.set("shitu", idx);
                $("detailView").data = [];
                let temp = [];
                temp = temp.concat(
                  IMGList.map(function (i) {
                    return {
                      detailImage: {
                        src: i
                      }
                    };
                  })
                );
                $("detailView").data = temp;
              }
            });
          }
        }
      },
      {
        type: "button",
        props: {
          id: "actress",
          bgcolor: $color("gray"),
          radius: 0,
          title: "个人",
          alpha: 0.9
        },
        layout: function (make, view) {
          let w = $device.info.screen.width / 4;
          w = w * 2;
          make.right.inset(w);
          make.bottom.inset(0);
          make.width.equalTo(view.super).dividedBy(4);
          make.height.equalTo(50);
        },
        events: {
          tapped(sender) {
            pushFlag = true;
            acPage = 1;
            acUrl = sender.info;
            showAcView(
              Math.pow(2, column + 1),
              275 / Math.pow(2, column),
              girlName
            );
            getPostData(-1, acPage, acUrl);
          },
          longPressed: function (sender) {
            $device.taptic(1);
            $app.openURL(detailUrl);
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
        layout: function (make, view) {
          make.right.bottom.inset(0);
          make.width.equalTo(view.super).dividedBy(4);
          make.height.equalTo(50);
        },
        events: {
          tapped(sender) {
            $device.taptic(0);
            console.log(interface);
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
            $delay(0.5, function () {});
          },
          longPressed: function (sender) {
            $device.taptic(1);
            //            $app.openURL(detailUrl);
            console.log(detailUrl + " " + interface + " " + title);
            let data = {
              src: interface,
              url: detailUrl,
              title: title
            };
            if (GoodList.indexOf(interface) < 0) {
              goodButtonTapped("add", data);
              $ui.toast("已添加到精选集");
            } else {
              goodButtonTapped("del", data);
              $ui.error("已从精选集中删除");
            }
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
        layout: function (make, view) {
          make.bottom.left.right.inset(0);
          make.height.equalTo(40);
        }
      }
    ]
  });
}

function getPostData(num, page, acUrl) {
  let url = "";
  if (num >= 0) url = category[num].addr + page + ".html";
  else {
    url = acUrl + page;
    url = page > 0 ? url + ".html" : url;
  }
  console.log(url);
  $http.get({
    url: url,
    handler: resp => {
      var data = resp.data;
      //      console.log(data);
      $ui.clearToast();
      let match0 = "";
      if (num >= 0) {
        let reg0 = /div id="ddesc"[\s\S]*?回顶部/g;
        match0 = data.match(reg0)[0];
      } else {
        let reg0 = /册<.*"/g;
        if (!data.match(reg0) && page < 2) {
          acUrl = acUrl.replace("album/", "");
          getPostData(num, "", acUrl);
          return;
        }
        if (!data.match(reg0)) $ui.error("已到底...");
        match0 = data.match(reg0)[0];
      }

      //      console.log(match0)
      let reg = /a href='([\s\S]*?)' class='ck-link[\s\S]*?img (src|data-original)='([\s\S]*?)' alt='([\s\S]*?)'/g;
      let array = [...match0.matchAll(reg)];
      //let match1 = match0.match(reg)
      //      console.log(array);
      let temp = [];

      array.map(i => {
        if (i[1].indexOf("girl") >= 0) {
          i[1] = i[1].match(/\/g\/\d{5}/);
        }
        temp = temp.concat({
          title: i[4],
          detail: num >= 0 ? i[1] : "https://m.nvshens.org" + i[1],
          interface: {
            //            src: i[3]
            source: {
              url: i[3],
              header: {
                Referer: "https://m.nvshens.org/"
              }
            }
          },
          recGra: {
            hidden: LocalList.indexOf(i[3]) >= 0 ? false : true
          },
          goodGra: {
            hidden: GoodList.indexOf(i[3]) > -1 ? false : true
          }
        });
      });
      if (num >= 0) {
        if (page == 1) $("preView").data = [];

        $("preView").data = $("preView").data.concat(temp);
      } else {
        if (page == 1) $("acView").data = [];

        let len = temp.length;
        if (len > 6) temp.splice(len - 3, 3);
        $("acView").data = $("acView").data.concat(temp);
        //console.log(temp)
      }
    }
  });
}

function getDetailPost(url) {
  url.replace("net", "org");
  $http.request({
    url: url,
    handler: function (resp) {
      if (!resp) {
        $ui.alert("❌ 请检查网络");
      }
      $ui.clearToast();
      console.log(url);
      let reg = /(\d{2,3})张/;
      let picNum = resp.data.match(reg)[1];
      picNum = Number(picNum);
      //      console.log(picNum);
      reg = /gallery\/(\d{5})\/\d{5}\/s/;
      let actressUrl = resp.data.match(reg)[1];
      actressUrl = "https://m.nvshens.org/girl/" + actressUrl + "/album/";
      $("actress").info = actressUrl;
      let imgPattern = resp.data.match(reg)[0];
      //console.log(resp.data)
      let url_head = "https://t1.onvshen.com:85/" + imgPattern + "/";
      let imgU = "";
      IMGList = [];
      //IMGList.push(interface)
      IMGList.push(url_head + "0.jpg");
      for (var i = 1; i < picNum; i++) {
        if (i < 10) imgU = url_head + "00" + i + ".jpg";
        else if (i < 100) imgU = url_head + "0" + i + ".jpg";
        else imgU = url_head + i + ".jpg";
        IMGList.push(imgU);
      }
      //console.log(IMGList);
      console.log("共计 " + IMGList.length + " 张图");

      let temp = $("detailView").data;

      temp = temp.concat(
        IMGList.map(function (i) {
          return {
            detailImage: {
              source: {
                url: i,
                header: {
                  Referer: "https://m.nvshens.org/"
                }
              }
            }
          };
        })
      );

      $("detailView").data = temp;
      //           $ui.clearToast();
    }
  });
}

function favoriteButtonTapped(mode, data) {
  if (mode == "add") {
    LocalData.fav.unshift(data);
    LocalList.unshift(data.src);
    console.log(data.src);
    if ($("tab").index == 8) {
      var temp = $("preView").data;
      temp.unshift({
        title: data.title,
        detail: detailUrl,
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
    if ($("tab").index == 8) {
      $("preView").delete(idx);
    }
  }
  writeCache();
}

function girlFavButtonTapped(mode, data) {
  if (mode == "add") {
    LocalData.girl.push(data);
    GirlList.push(data.name);
  } else if (mode == "del") {
    var idx = GirlList.indexOf(data.name);
    GirlList.splice(idx, 1);
    LocalData.girl.splice(idx, 1);
  }
  writeCache();
}

function goodButtonTapped(mode, data) {
  if (mode == "add") {
    LocalData.good.push(data);
    GoodList.push(data.src);
  } else if (mode == "del") {
    var idx = GoodList.indexOf(data.src);
    GoodList.splice(idx, 1);
    LocalData.good.splice(idx, 1);
  }
  writeCache();
}

function writeCache() {
  $file.write({
    data: $data({ string: JSON.stringify(LocalData) }),
    path: LocalDataPath
  });
}

function getSearch(text) {
  let url = searchUrl + encodeURI(text);
  console.log(url);
  $http.get({
    url: url,
    handler: resp => {
      var data = resp.data;
      //console.log(data);

      let reg0 = /查询结果.*"/g;
      let match0 = data.match(reg0)[0];

      console.log(match0);
      let reg = /a href='([\s\S]*?)' class='ck-link[\s\S]*?img src='([\s\S]*?)'.*?ck-title'>([\s\S]*?)</g;
      let array = [...match0.matchAll(reg)];
      //let match1 = match0.match(reg)
      console.log(array);
      if (array.length == 0) $ui.error("无搜索结果");
      let temp = [];
      $("acList").data = [];
      array.map(i => {
        temp.push({
          acName: {
            text: i[3],
            info: "https://m.nvshens.org" + i[1] + "album/"
          },
          acImg: {
            src: i[2]
          },
          acFav: {
            title: GirlList.indexOf(i[3]) >= 0 ? "取消收藏" : "收藏",
            bgcolor:
              GirlList.indexOf(i[3]) >= 0 ? $color("gray") : $color("tint"),
            info: {
              src: i[2],
              url: "https://m.nvshens.org" + i[1] + "album/",
              name: i[3]
            }
          }
        });
      });
      $("acList").data = temp;
      console.log(temp);
    }
  });
}

function showSearch(text) {
  $ui.push({
    props: {
      title: text,
      pageSheet: true
    },
    views: [
      {
        type: "list",
        props: {
          rowHeight: 120,
          template: template,
          id: "acList"
        },
        events: {
          didSelect(sender, indexPath, data) {
            pushFlag = true;
            acPage = 1;
            acUrl = data.acName.info;
            showAcView(
              Math.pow(2, column + 1),
              275 / Math.pow(2, column),
              data.acName.text
            );
            getPostData(-1, acPage, acUrl);
          }
        },
        layout: $layout.fill
      }
    ],
    layout: $layout.fill
  });
}

function playImg(imgList, position, title) {
  $ui.push({
    props: {
      title: title
    },
    views: [
      {
        type: "web",
        props: {
          id: "IMG",
          url: imgList[position]
        },
        layout: $layout.fill
      },
      {
        type: "button",
        props: {
          id: "download",
          bgcolor: $color("tint"),
          radius: 15,
          title: "向左",
          alpha: 0.9
          //              hidden: true
        },
        layout: function (make, view) {
          make.left.bottom.inset(15);
          make.width.equalTo(140);
          make.height.equalTo(30);
        },
        events: {
          tapped(sender) {
            Browse = false;
            position = position - 1;
            //               console.log()
            if (position < 0) {
              $ui.error("已浏览到第一页");
              position = 0;
              return;
            }

            $("page").text = position + "/" + imgList.length;
            $("IMG").url = imgList[position];
          },
          async longPressed(sender) {
            Browse = true;
            $ui.toast("开启负向自动浏览", 0.5);
            $device.taptic(0);
            while (Browse) {
              await $wait(TIME);
              position = position - 1;

              if (position < 0) {
                $ui.error("已浏览到第一页");
                position = 0;
                return;
              }
              $("page").text = position + "/" + imgList.length;
              $("IMG").url = imgList[position];
            }
          }
        }
      },
      {
        type: "button",
        props: {
          id: "download",
          bgcolor: $color("tint"),
          radius: 15,
          title: "向右",
          alpha: 0.9
        },
        layout: function (make, view) {
          make.right.bottom.inset(15);
          make.width.equalTo(140);
          make.height.equalTo(30);
        },
        events: {
          tapped(sender) {
            Browse = false;

            position = position + 1;

            if (position > imgList.length - 1) {
              $ui.error("已浏览完图片", 0.5);
              position = imgList.length - 1;

              return;
            }

            $("page").text = position + "/" + imgList.length;
            $("IMG").url = imgList[position];
          },
          async longPressed(sender) {
            $ui.toast("开启正向自动浏览", 0.5);
            Browse = true;
            $device.taptic(0);
            while (Browse) {
              await $wait(TIME);
              position = position + 1;
              if (position > imgList.length - 1) {
                $ui.error("已浏览完图片", 0.5);
                position = imgList.length - 1;

                return;
              }
              $("page").text = position + "/" + imgList.length;
              $("IMG").url = imgList[position];
            }
          }
        }
      },
      {
        type: "label",
        props: {
          text: position + "/" + IMGList.length,
          id: "page",
          align: $align.center
        },
        layout: function (make, view) {
          make.centerX.equalTo(view.super);
          make.bottom.inset(20);
        }
      }
    ]
  });
}

function playImg2(indexPath, title) {
  $ui.push({
    props: {
      title: title
    },
    views: [
      {
        type: "scroll",
        props: {
          zoomEnabled: true,
          maxZoomScale: 3, // Optional, default is 2,
          doubleTapToZoom: true // Optional, default is true
        },
        layout: (make, view) => {
          make.left.right.top.inset(0);
          make.bottom.inset(50);
        },
        views: [
          {
            type: "image",
            props: {
              id: "IMG",
              image: $("detailView").cell(indexPath).views[0].views[0].image
            },
            layout: $layout.fill
          }
        ]
      },
      {
        type: "button",
        props: {
          id: "download",
          bgcolor: $color("tint"),
          title: "向左",
          alpha: 0.9,
          radius: 15

          //              hidden: true
        },
        layout: function (make, view) {
          make.left.bottom.inset(15);
          make.width.equalTo(140);
          make.height.equalTo(30);
        },
        events: {
          tapped(sender) {
            Browse = false;

            if (!PFlag) {
              Position = indexPath.row - 1;
              PFlag = true;
            } else Position = Position - 1;

            if (Position < 0) {
              $ui.error("已浏览至第一张", 0.5);
              Position = 0;

              return;
            }

            $("page").text = Position + "/" + IMGList.length;
            let i = $indexPath(indexPath.section, Position);
            $("IMG").image = $("detailView").cell(i).views[0].views[0].image;
          },
          async longPressed(sender) {
            Browse = true;
            $device.taptic(0);
            $ui.toast("开启负向自动浏览", 0.5);
            while (Browse) {
              await $wait(TIME);
              if (!PFlag) {
                Position = indexPath.row - 1;
                PFlag = true;
              } else Position = Position - 1;

              if (Position < 0) {
                $ui.error("已浏览至第一张", 0.5);
                Position = 0;

                return;
              }
              $("page").text = Position + "/" + IMGList.length;
              let i = $indexPath(indexPath.section, Position);
              $("IMG").image = $("detailView").cell(i).views[0].views[0].image;
            }
          }
        }
      },
      {
        type: "button",
        props: {
          id: "download",
          bgcolor: $color("tint"),
          title: "向右",
          alpha: 0.9,
          radius: 15
        },
        layout: function (make, view) {
          make.right.bottom.inset(15);
          make.width.equalTo(140);
          make.height.equalTo(30);
        },
        events: {
          tapped(sender) {
            Browse = false;
            if (!PFlag) {
              Position = indexPath.row + 1;
              PFlag = true;
            } else Position = Position + 1;

            if (Position > IMGList.length - 1) {
              $ui.error("已浏览完图片", 0.5);
              Position = IMGList.length - 1;

              return;
            }

            $("page").text = Position + "/" + IMGList.length;
            let i = $indexPath(indexPath.section, Position);
            $("IMG").image = $("detailView").cell(i).views[0].views[0].image;
          },
          async longPressed(sender) {
            $ui.toast("开启正向自动浏览", 0.5);
            $device.taptic(0);
            Browse = true;

            while (Browse) {
              await $wait(TIME);
              if (!PFlag) {
                Position = indexPath.row + 1;
                PFlag = true;
              } else Position = Position + 1;

              if (Position > IMGList.length - 1) {
                $ui.error("已浏览完图片", 0.5);
                Position = IMGList.length - 1;

                return;
              }
              $("page").text = Position + "/" + IMGList.length;
              let i = $indexPath(indexPath.section, Position);
              $("IMG").image = $("detailView").cell(i).views[0].views[0].image;
            }
          }
        }
      },
      {
        type: "label",
        props: {
          text: indexPath.row + "/" + IMGList.length,
          id: "page",
          align: $align.center
        },
        layout: function (make, view) {
          make.centerX.equalTo(view.super);
          make.bottom.inset(20);
        }
      }
    ]
  });
}

function main() {
  page = 1;
  getPostData(0, page);

  if ($file.read(LocalDataPath)) {
    LocalData = JSON.parse($file.read(LocalDataPath).string);
    LocalList = LocalData.fav.map(i => i.src);
    GirlList = LocalData.girl.map(i => i.name);
    GoodList = LocalData.good.map(i => i.src);
  } else {
    LocalData = { fav: [], girl: [], good: [] };
    LocalList = [];
    GirlList = [];
    GoodList = [];
  }
}

var column = $cache.get("column") || 0;
mainUI(Math.pow(2, column + 1), 275 / Math.pow(2, column), "Zngirls");
main();
