let category = [{
  title: "高清",
  addr: "https://www.192td.com/gq/",
  next: "https://www.192td.com/gq/index_"
}, {
  title: "国产",
  addr: "https://www.192td.com/gc/",
  next: "https://www.192td.com/gc/index_"
}, {
  title: "美图",
  addr: "https://www.192td.com/new/",
  next: "https://www.192td.com/listinfo-1-"
}, {
  title: "会展",
  addr: "https://www.192td.com/hz/",
  next: "https://www.192td.com/hz/index_"
},  {
    title: "综艺",
    addr: "https://www.192td.com/zy/",
    next: "https://www.192td.com/zy/index_"
  }, {
  title: "收藏",
}, ]

function mainUI(column, rowHeight) {
  $ui.render({
    props: {
      title: "套图吧",
      id: "main"
    },
    views: [
      createButton("高清", "b1", "l1",
        function(make, view) {
          make.top.inset(3);
          make.left.inset(5);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
          changeButton(1)
        }
      ), createButton("国产", "b2", "l2",
        function(make, view) {
          make.top.inset(3);
          make.left.equalTo($("b1").right).offset(19);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
          changeButton(2)
        }
      ), createButton("美图", "b3", "l3",
        function(make, view) {
          make.top.inset(3);
          make.left.equalTo($("b2").right).offset(19);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
           changeButton(3)
        }
      ), createButton("会展", "b4", "l4",
        function(make, view) {
          make.top.inset(3);
          make.left.equalTo($("b3").right).offset(19);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
          changeButton(4)
        }
      ),createButton("综艺", "b5", "l5",
        function(make, view) {
          make.top.inset(3);
          make.left.equalTo($("b4").right).offset(19);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
           changeButton(5)
        }
      ), createButton("收藏", "b6", "l6",
        function(make, view) {
          make.top.inset(3);
          make.left.equalTo($("b5").right).offset(19);
          make.height.equalTo(26);
          make.width.equalTo(view.super).multipliedBy(0.12);
        },
        function() {
           underline(6)
           if (LocalList.length == 0) {
                           $ui.toast("暂无收藏内容，请收藏")
                           $("preView").hidden = true
                         } else {
                           $("preView").data = []
                           LocalData.fav.map(function(i) {
                             $("preView").data = $("preView").data.concat({
                               title: i.title,
                               detail: i.url,
                               interface: {
                                 src: i.src
                               }
                             })
                           })
                         }
           
                       
           
                       $("preView").contentOffset = $point(0, 0)       
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
          make.left.right.inset(5)
          make.top.inset(30)
          make.height.equalTo(27)
        },
        events: {
          returned: function(sender) {
            showSearch(sender.text)
            $("search").blur()
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
          template: [{
            type: "image",
            props: {
              contentMode: $contentMode.scaleAspectFit,
              id: "interface",
            },
            layout: $layout.fill
          }],
        },
        layout: function(make, view) {
          make.left.right.bottom.inset(5)
          make.top.inset(60)
          // make.top.equalTo($("menu").bottom)
        },
        events: {
          didReachBottom(sender) {
            sender.endFetchingMore();
            if ($("menu").index !== 6) {

              getPostData()
              $delay(0.5, function() {
                getPostData()
              })
            }
          },
          didSelect(sender, indexPath, data) {
            $ui.toast("加载中...", 5)
            interface = data.interface.src
            title = data.title
            console.log(data.detail)
            if ($("l6").hidden == false) { //收藏栏
              showPhotos(title, 1, 563)
              $("favorite").title = "取消收藏"
              $("favorite").bgcolor = $color("#4f86f2")
              $("detailView").data = [];
              getDetailPost(data.detail)
              return
            } else {
              showPhotos(title, 2, 280)
            }
            $http.request({
              method: "GET",
              url: data.detail,
              handler: function(resp) {
                //console.log(resp.data)
                var url = /uaredirect\("(.*)"/g.exec(resp.data)[1]
                $("share").info = url
                detailUrl = url
                $("detailView").data = [];
                if (LocalList.indexOf(interface) > -1) {
                  $("favorite").title = "取消收藏"
                  $("favorite").bgcolor = $color("#4f86f2")
                }
                getDetailPost(url)
              }
            });

          }
        }
      }
    ]
  })

}

function showPhotos(title, columns, rowHeight) {
  $ui.push({
    props: {
      title: title,
    },
    views: [{
      type: "matrix",
      props: {
        id: "detailView",
        itemHeight: rowHeight,
        columns: columns,
        spacing: 2,
        bgcolor: $color("clear"),
        template: [{
          type: "image",
          props: {
            contentMode: $contentMode.scaleAspectFit,
            id: "detailImage"
          },
          layout: $layout.fill

        }],
      },
      layout: $layout.fill,
      events: {
        // didReachBottom(sender) {
        //   if (detailPage > num + 1) {
        //     $device.taptic(0);
        //     $ui.toast("🙈 已经到底啦",0.5)
        //     sender.endFetchingMore();
        //   } else {
        //     sender.endFetchingMore();
        //     getDetailPost(detailUrl)
        //     $delay(1, function() {
        //       getDetailPost(detailUrl)
        //     })
        //   }

        // },
        didSelect(sender, indexPath, data) {

          var v = $("detailView").cell(indexPath).views[0].views[0]
          //$ui.action(indexPath.constructor)
          $quicklook.open({
            image: v.image
          })

        }
      }
    }, {
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
        make.left.bottom.inset(0)
        make.width.equalTo(view.super).dividedBy(2)
        make.height.equalTo(50)
      },
      events: {
        tapped(sender) {
          $cache.clear()
          $device.taptic(0)
          if (detailPage < num) {
            $ui.toast("❌ 请滑至底部再按下载")

          } else {
            var urlList = []
            if ($("download").title == "下载") {
              $delay(0.5, function() {})
              sender.title = "正在下载...";
              urlList = $("detailView").data.map(function(i) {

                return i.detailImage.src

              })

              if (!$drive.exists("套图吧/" + folderName)) {
                $drive.mkdir("套图吧/" + folderName)
              }
              $("progress").value = 0;
              var count = 0
              for (var i = 0; i < urlList.length; i++) {
                $http.download({
                  url: urlList[i],
                  handler: function(resp) {
                    count++;
                    sender.title = "正在下载第 " + count + " 幅图";
                    $("progress").value = count * 1.0 / urlList.length
                    if (count == urlList.length) {
                      sender.title = "完成, iCloud Drive 查看"
                      $device.taptic(1)
                      $("progress").value = 0
                    }
                    var path = "套图吧/" + folderName + "/" + resp.response.suggestedFilename
                    $drive.write({
                      data: resp.data,
                      path: path
                    })
                  }
                })
              }
            }
            $cache.clear()
          }
        }
      }
    }, {
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
        let w = $device.info.screen.width / 3

        make.bottom.inset(0)
        make.left.inset(0)
        make.width.equalTo(view.super).dividedBy(2)
        make.height.equalTo(50)
      },
      events: {
        tapped(sender) {
          $device.taptic(0)
          var data = {
            "src": interface,
            "url": detailUrl,
            "title": title
          }
          if ($("favorite").title == "收藏") {
            favoriteButtonTapped("add", data)
            $("favorite").title = "取消收藏"
            $("favorite").bgcolor = $color("#4f86f2")
          } else {
            favoriteButtonTapped("del", data)
            $("favorite").title = "收藏"
            $("favorite").bgcolor = $color("black")

          }
          $app.openURL("pythonista://Tools/taotu8?action=run&args=" + encodeURI(sender.info))

        },
        longPressed: function(sender) {
          $device.taptic(1);
          $app.openURL(sender.sender.info);
        }
      }
    }, {
      type: "button",
      props: {
        id: "favorite",
        bgcolor: $color("black"),
        radius: 0,
        title: "收藏",
        alpha: 0.9
      },
      layout: function(make, view) {
        make.right.bottom.inset(0)
        make.width.equalTo(view.super).dividedBy(2)
        make.height.equalTo(50)
      },
      events: {
        tapped(sender) {
          $device.taptic(0)
          var data = {
            "src": interface,
            "url": detailUrl,
            "title": title
          }
          if ($("favorite").title == "收藏") {
            favoriteButtonTapped("add", data)
            $("favorite").title = "取消收藏"
            $("favorite").bgcolor = $color("#4f86f2")
          } else {
            favoriteButtonTapped("del", data)
            $("favorite").title = "收藏"
            $("favorite").bgcolor = $color("black")

          }
          $delay(0.5, function() {})
        }

      }

    }, {
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
        make.bottom.left.right.inset(0)
        make.height.equalTo(40)
      }
    }]
  })
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
      borderColor: $color("tint"),

    },
    views: [{
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
        make.centerX.equalTo()
        make.bottom.inset(0)
        make.height.equalTo(2)
      }
    }],
    layout: layout,
    events: {
      tapped: handler,
      longPressed: handler2,
    }
  };
}

function getPostData(mode) {
  page++
  if (mode == "firstRun") {
    url = category[0].addr  } else {
    if (page == 1) {
      url = category[parseInt(mode)].addr
    } else {
      url = category[parseInt(mode)].next + page + ".html"

    }
  }
  $http.request({
    url: url,
    handler: function(resp) {
      if (!resp) {
        $ui.alert("❌ 请检查网络")
      }
      var reg = /<li>[\s\S]*?<\/li>/g;
      var match = resp.data.match(reg);
      var removed = match.slice(8, )
      //console.log(removed)
      //      var postData = []
      removed.map(function(i) {
        var image = /(lazysrc=\")([\s\S]*?)(\")/.exec(i)[2];
        var detail = /(href=")([\s\S]*?)(")/.exec(i)[2];
        if (detail.indexOf("192td") < 0) {
          detail = "https://www.192td.com" + detail
        }
        var title = /alt="(.*?)"/.exec(i)[1];
        $("preView").data = $("preView").data.concat({
          title: title,
          detail: detail,
          interface: {
            src: image
          }
        });

      })

    }
  })
}

function getDetailPost(url) {
  $http.request({
    url: url,
    handler: function(resp) {
      if (!resp) {
        $ui.alert("❌ 请检查网络")
      }
      var reg = /lazysrc=[\s\S]*?  onerror/g;
      var match = resp.data.match(reg);
      //console.log(match)
      // if(detailPage == 1){
      //   folderName = /<title>([\s\S]*?) \-/g.exec(resp.data)[1]
      // }
      var imgList = [];
      match.map(function(i) {
        imgList.push(/lazysrc=(\r\n)?([\s\S]*?) /g.exec(i)[2])
      })
      //console.log(imgList)
      $ui.clearToast();
      $("detailView").data = $("detailView").data.concat(imgList.map(function(i) {
        return {
          detailImage: {
            src: i
          }
        }
      }))
    }
  })
}

function favoriteButtonTapped(mode, data) {
  if (mode == "add") {
    LocalData.fav.unshift(data)
    LocalList.unshift(data.src)
    if ($("menu").index == 6) {

      $("preView").data = $("preView").data.concat({
        title: data.title,
        detail: data.url,
        interface: {
          src: data.src
        }
      });

    }
  } else if (mode == "del") {
    idx = LocalList.indexOf(data.src)
    LocalList.splice(idx, 1)
    LocalData.fav.splice(idx, 1)
    if ($("menu").index == 6) {
      $("preView").delete(idx)

    }
  }
  writeCache()
}

function writeCache() {
  $file.write({
    data: $data({ string: JSON.stringify(LocalData) }),
    path: LocalDataPath
  })
}

function showSearch(text) {
  $ui.toast("搜索中...", 5);
  $http.post({
    url: "https://www.192td.com/e/search/",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: {
      "keyboard": text,
      "tempid": "1",
      "show": "title,keyboard",
    },
    handler: function(resp) {
      //      $("menu").remove()
      //      mainUI(2,280)
      $("search").text = text
      let data = resp
      var reg = /<li>[\s\S]*?<\/li>/g;
      var match = resp.data.match(reg);
      if (!match) {
        alert("未找到结果")
        return
      }
      var removed = match.slice(8, )
      console.log(removed)
      //      var postData = []
      $ui.toast("", 0.1);
      $("preView").hidden = false
      $("preView").data = [];
      $("preView").contentOffset = $point(0, 0)
      removed.map(function(i) {
        var image = /(img src=\")([\s\S]*?)(\")/.exec(i)[2];
        var detail = /(href=")([\s\S]*?)(")/.exec(i)[2];
        if (detail.indexOf("192td") < 0) {
          detail = "https://www.192td.com" + detail
        }
        var title = /<span>(.*?)<\/span>/.exec(i)[1];
        $("preView").data = $("preView").data.concat({
          title: title,
          detail: detail,
          interface: {
            src: image
          }
        });

      })
    }
  });
}

function underline(num) {
  $("l1").hidden = true
  $("l2").hidden = true
  $("l3").hidden = true
  $("l4").hidden = true
  $("l5").hidden = true
  $("l6").hidden = true  
  $("l"+num).hidden = false
}

function changeButton(num){
    underline(num)
    $("preView").hidden = false
    page = 0;
    $("preView").data = [];
    getPostData(num-1)
    $("preView").contentOffset = $point(0, 0)       
}
function main() {
  page = 0
  getPostData("firstRun")
  $("l1").hidden = false
  if ($file.read(LocalDataPath)) {
    LocalData = JSON.parse($file.read(LocalDataPath).string);
    LocalList = LocalData.fav.map(i => i.src)
  } else {
    LocalData = { "fav": [] };
    LocalList = [];
  };
}

LocalDataPath = "taotu8.json"
mainUI(2, 280)
main()


