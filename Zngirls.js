var method = "";
var HOME = "https://www.192td.com";
var CNUM = 0;
var LocalDataPath = "zngirls.json";
var LocalList = [];
var page = 0;
var LocalData = [];
var interface = "";
//var title = "";
var detailUrl = "";
var folderName = "";
var girlName = "";
var namePrefix = "";
var IMGList = [];
var SEARCH_MODE = false;
var Browse = true;
var TIME = 1; //自动浏览间隔
var Position = 0;
var PFlag = false;
var viewMode = "httpToView";
const category = [
  {
    title: "首页",
    addr: "https://m.nvshens.net/gallery/"
  },
  {
    title: "美媛",
    addr: "https://m.nvshens.net/gallery/meiyuanguan/"
  },
  {
    title: "秀人",
    addr: "https://m.nvshens.net/gallery/xiuren/"
  },
  {
    title: "尤果",
    addr: "https://m.nvshens.net/gallery/ugirl/"
  },
  {
    title: "魅妍",
    addr: "https://m.nvshens.net/gallery/mistar/"
  },
  {
    title: "爱蜜",
    addr: "https://m.nvshens.net/gallery/imiss/"
  },
  {
    title: "尤蜜",
    addr: "https://m.nvshens.net/gallery/mfstar/"
  },
  {
    title: "模范",
    addr: "https://m.nvshens.net/gallery/mfstar/"
  },
  {
    title: "收藏"
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
    layout: function(make, view) {
      make.top.inset(0);
      make.centerX.equalTo();
      make.left.right.inset(10);
      make.height.equalTo(22);
    },
    events: {
      changed: function(sender) {
        //$ui.toast("载入中...", 10);
        CNUM = sender.index;
        page = 1;
        
        if(sender.index==8){
          $("preView").data = [];
                    
                    if (LocalList.length == 0) {
                      $ui.toast("暂无收藏内容，请收藏");
                    } else {
                      let temp = $("preView").data
                      LocalData.fav.map(function(i) {
                     temp = temp.concat({
                          title: i.title,
                          detail: i.url,
                          interface: {
                            src: i.src
                          }
                        });
                      });
          //            console.log(temp)
                       $("preView").data = temp
                    }
                   
                   
        }else
        getPostData(CNUM, page);
         $("preView").contentOffset = $point(0, 0);
      }
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
      tabView(),
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
            mainUI(Math.pow(2, column + 1), 275 / Math.pow(2, column), title);

            showSearch(sender.text);
            $("search").blur();
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

            mainUI(Math.pow(2, id + 1), 275 / Math.pow(2, id), title);
            //            $("preView").data = [];

            temp.map(function(i) {
              temp.data = temp.concat({
                title: i.title,
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
            }
          ]
        },
        layout: function(make, view) {
          make.left.right.bottom.inset(5);
          make.top.inset(60);
          // make.top.equalTo($("menu").bottom)
        },
        events: {
          didReachBottom(sender) {
            $ui.toast("加载中...", 0.5);
            page++;
            getPostData(CNUM, page);
            sender.endFetchingMore();
          },
          didSelect(sender, indexPath, data) {
            //            $ui.toast("加载中...", 5);
            interface = data.interface.src;
            title = data.title;
            folderName = title;
            console.log(folderName);
            detailUrl = data.detail;
            if (/.*\s(.+)/g.test(folderName)) {
              girlName = /.*\s(.+)/g.exec(folderName)[1];
              if (/\d{4}\.\d{2}\.\d{2}\sVOL\.\d{3,4}/g.exec(folderName))
                namePrefix = /\d{4}.\d{2}.\d{2}\sVOL\.\d{3,4}/g.exec(
                  folderName
                )[0];
              console.log(namePrefix);
            } else girlName = folderName;

            console.log(girlName);
            console.log(data.detail);
            let idx = $cache.get("shitu") || 1;

            showPhotos(girlName, Math.pow(2, idx), 563 / Math.pow(2, idx));

            if (CNUM == 9) {
              //收藏栏

              $("favorite").title = "取消收藏";
              $("favorite").bgcolor = $color("#4f86f2");

              return;
            } else if (LocalList.indexOf(interface) > -1) {
               $("favorite").title = "取消收藏";
               $("favorite").bgcolor = $color("#4f86f2");
             } 
            $ui.toast("载入中...",5)
            $("favorite").info = data.detail;
            $("detailView").data = [];

            
            getDetailPost(data.detail);
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
        //        var v = $("detailView").cell(indexPath).views[0].views[0];
        //$ui.action(indexPath.constructor)
        PFlag = false;
        if (viewMode == "downToView") playImg2(indexPath, girlName);
        else playImg(IMGList, indexPath.row, girlName);
        //        $quicklook.open({
        //          image: v.image
        //        });
      },
      didLongPress: function(sender, indexPath, data) {
        if (viewMode == "downToView") viewMode = "httpToView";
        else viewMode = "downToView";
        $ui.toast("View Changed");
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
                encodeURI(IMGList) +
                "&argv=" +
                encodeURI(namePrefix)
            );
            //                        console.log(IMGList)
          },
          
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
                  IMGList.map(function(i) {
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

function getPostData(num, page) {
  let url = category[num].addr + page + ".html";
  $http.get({
    url: url,
    handler: resp => {
      var data = resp.data;
      //console.log(data)
      $ui.clearToast()
      let reg0 = /div id="ddesc"[\s\S]*?回顶部/g;
      let reg = /a href='([\s\S]*?)'[\s\S]*?img src='([\s\S]*?)' alt='([\s\S]*?)'/g;
      let match0 = data.match(reg0)[0];
      let array = [...match0.matchAll(reg)];
      //let match1 = match0.match(reg)
      console.log(array[0]);
      let temp = [];

      array.map(i => {
        temp = temp.concat({
          title: i[3],
          detail: i[1],
          interface: {
            src: i[2]
          },
          recGra: {
            hidden: LocalList.indexOf(i[2]) >= 0 ? false : true
          }
        });
      });
      if (page == 1) $("preView").data = [];

      $("preView").data = $("preView").data.concat(temp);
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
      $ui.clearToast()
      //console.log(resp.data)
      let reg = /(\d{2,3})张/
      let picNum = resp.data.match(reg)[1]
      picNum = Number(picNum)
      console.log(picNum)
      reg=/gallery\/\d{5}\/\d{5}\/s/
      let imgPattern=resp.data.match(reg)
      //console.log(imgPattern)
      let url_head = "https://t1.onvshen.com:85/"+imgPattern+"/"
      let imgU = ""
      IMGList = [];
      IMGList.push(url_head + "0.jpg")
      for(var i=0;i<picNum;i++){
        if(i<10)  imgU = url_head+"00"+i+".jpg"
        else if(i<100) imgU = url_head+"0"+i+".jpg"
        else imgU = url_head+i+".jpg"
        IMGList.push(imgU)
      }
      console.log(IMGList)
      console.log("共计 " + IMGList.length + " 张图");
      //       console.log(IMGList)
      let temp = $("detailView").data;
      temp = temp.concat(
        IMGList.map(function(i) {
          return {
            detailImage: {
              src: i
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
    if ($("tab").index==8) {
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
    if ($("tab").index==9) {
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
      $cache.set("searchUrl", resp.response.url);

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
          recGra: {
            hidden: LocalList.indexOf(image) >= 0 ? false : true
          }
        });
      });
    }
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
        layout: function(make, view) {
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
        layout: function(make, view) {
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
        layout: function(make, view) {
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
        layout: function(make, view) {
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
            //            let c = $cache.get("column")
            //                                 let rH = 285/Math.pow(2, c)
            //                                 let row = Math.floor(Position/4)
            //                                                      $("detailView").contentOffset = $point(0, rH*row);
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
        layout: function(make, view) {
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
            //            let c = $cache.get("column")
            //                                 let rH = 285/Math.pow(2, c)
            //                                 let row = Math.floor(Position/4)
            //                                                      $("detailView").contentOffset = $point(0, rH*row);
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
        layout: function(make, view) {
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
  } else {
    LocalData = { fav: [] };
    LocalList = [];
  }
}

let column = $cache.get("column") || 0;
mainUI(Math.pow(2, column + 1), 275 / Math.pow(2, column), "Zngirls");
main();
