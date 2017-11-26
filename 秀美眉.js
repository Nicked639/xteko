let category = [{
  title: "首页",
  addr: "http://www.xiumeim.com",
  next: "http://www.xiumeim.com/albums/page-"
}, {
  title: "尤果",
  addr: "http://www.xiumeim.com/albums/UG.html",
  next: "http://www.xiumeim.com/albums/UG-"
}, {
  title: "波萝",
  addr: "http://www.xiumeim.com/albums/BOL.html",
  next: "http://www.xiumeim.com/albums/BOL-"
}, {
  title: "其他",
  addr: "http://www.xiumeim.com/albums/mix.html",
  next: "http://www.xiumeim.com/albums/mix-"
}, {
  title: "收藏",
}]

function mainUI(column,rowHeight) {
  $ui.render({
    props: {
      title: "秀美眉",
    },
    views: [{
        type: "text",
        props: {
          id: "bgInfo",
          text: "Originated in Power Flow\n\nhttps://t.me/Flow_Script\n\nVersion: 1.1",
          textColor: $color("#CCCCCC"),
          font: $font(10),
          align: $align.center
        },

        layout: function(make, view) {
          make.top.inset(40)
          make.height.equalTo(100)
          make.width.equalTo($device.info.screen.width)
        }
      }, {
        type: "image",
        props: {
          id: "bgImage",
          src: "https://i.loli.net/2017/11/14/5a0a553e1c420.jpg",
          radius: 25,
          alpha: 0.8,
          align: $align.center,
        },
        layout: function(make, view) {
          make.size.equalTo($size(50, 50))
          make.top.inset(110)
          make.left.inset(162)
        }

      }, {
        type: "menu",
        props: {
          id: "menu",
          items: category.map(i => i.title)
        },
        layout: function(make, view) {
          make.top.left.right.inset(0)
          make.height.equalTo(30)
        },
        events: {
          changed(sender) {
            if (sender.index !== 4) {
              mainUI(2,280)
              $("menu").index = sender.index;
              $("preView").hidden = false
              page = 0;
              $("preView").data = [];
              getPostData()
            } else {
              mainUI(3,185)
              $("menu").index = 4
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

            }

            $("preView").contentOffset = $point(0, 0)

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
              id: "interface",
            },
            layout: $layout.fill
          }],
        },
        layout: function(make, view) {
          make.left.right.bottom.inset(0)
          make.top.equalTo($("menu").bottom)
        },
        events: {
          didReachBottom(sender) {
            sender.endFetchingMore();
            getPostData()
            $delay(0.5, function() {
              getPostData()
            })
          },
          didSelect(sender, indexPath, data) {
            interface = data.interface.src
            title = data.title

            showPhotos(title)
            if (LocalList.indexOf(interface) > -1) {
              $("favorite").title = "取消收藏"
            }
            $("detailView").data = [];
            detailPage = 0;
            detailUrl = data.detail
            $http.request({
              url: detailUrl,
              handler: function(resp) {
                num = parseInt(/(共)(.*)(页)/g.exec(resp.data)[2]);
                title = /<title>([\s\S]*?)<\/title>/g.exec(resp.data)[1]
                //$ui.action(title)
                getDetailPost(detailUrl)

                $delay(0.5, function() {
                  getDetailPost(detailUrl)
                })
              }
            })

          }
        }
      }
    ]
  })
}

function getPostData(mode) {
  page++
  if( mode == "firstRun"){
    url = category[0].addr
  } else{
    if (page == 1) {
    url = category[$("menu").index].addr
  } else {
    url = category[$("menu").index].next + page + ".html"

  }
  }
  
  $http.request({
    url: url,
    handler: function(resp) {
      var reg = /<table>[\s\S]*?<\/table>/g;
      var match = resp.data.match(reg);
      var postData = []
      match.map(function(i) {
        var image = /(data-original=")([\s\S]*?)(")/.exec(i)[2];
        var detail = /(href=")([\s\S]*?)(")/.exec(i)[2];
        var title = /alt="(.*?)-/.exec(i)[1];
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

function showPhotos(title) {
  $ui.push({
    props: {
      title: title,
    },
    views: [{
      type: "matrix",
      props: {
        id: "detailView",
        itemHeight: 280,
        columns: 2,
        spacing: 2,
        bgcolor: $color("clear"),
        template: [{
          type: "image",
          props: {
            id: "detailImage"
          },
          layout: $layout.fill

        }],
      },
      layout: $layout.fill,
      events: {
        didReachBottom(sender) {
          if (detailPage > num + 1) {
            $device.taptic(0);
            $ui.toast("🙈 已经到底啦")
            sender.endFetchingMore();
          } else {
            sender.endFetchingMore();
            getDetailPost(detailUrl)
            $delay(1, function() {
              getDetailPost(detailUrl)
            })
          }

        },
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
        alpha: 0.9
      },
      layout: function(make, view) {
        make.left.bottom.inset(0)
        make.width.equalTo(view.super).dividedBy(2)
        make.height.equalTo(30)
      },
      events: {
        tapped(sender) {
          if (detailPage < num) {
            $ui.toast("❌ 请滑至底部再按下载")

          } else if ($("download").title == "下载") {
            sender.title = "正在下载...";
            var urlList = $("detailView").data.map(function(i) {
              return i.detailImage.src
            })
            /*$quicklook.open({
            list: urlList

          })*/

            if (!$drive.exists(title)) {
              $drive.mkdir(title)
            }
            var count = 1
            $("progress").value = 0;
            for (var i = 0; i < urlList.length; i++) {
              $http.download({
                url: urlList[i],
                handler: function(resp) {
                  count++
                  $("button").title = "正在下载第 " + count + " 幅图";
                  $("progress").value = count * 1.0 / urlList.length
                  if (count == urlList.length + 1) {
                    $("button").title = "完成, iCloud Drive 查看"
                    $("progress").value = 0
                  }

                  var path = title + "/" + resp.response.suggestedFilename
                  $drive.write({
                    data: resp.data,
                    path: path
                  })
                }
              })
            }
          }

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
        make.height.equalTo(30)
      },
      events: {
        tapped(sender) {
          var data = {
            "src": interface,
            "url": detailUrl,
            "title": title
          }
          if ($("favorite").title == "收藏") {
            favoriteButtonTapped("add", data)
            $("favorite").title = "取消收藏"
          } else {
            favoriteButtonTapped("del", data)
            $("favorite").title = "收藏"

          }

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
        make.height.equalTo(30)
      }
    }]
  })
}

function getDetailPost(inputUrl) {
  detailPage++
  if (detailPage == 1) {
    url = inputUrl
  } else {
    url = inputUrl.split(".html")[0] + "-" + detailPage + ".html"
  }
  $http.request({
    url: url,
    handler: function(resp) {
      var reg = /<table>[\s\S]*?<\/table>/g;
      var match = resp.data.match(reg);
      if (!match && detailPage == 1) {
        $ui.alert({
          title: "无图片，可能为打包或者视频",
          message: "前往网页",
          actions: [{
              title: "确定",
              handler: function() {
                $safari.open({
                  url: inputUrl,
                })
              }
            },
            {
              title: "取消",
              handler: function() {
                $ui.pop()
                return false
              }
            }
          ]
        })

      }
      var imgList = [];
      match.map(function(i) {
        imgList.push(/(src=")([\s\S]*?)(")/g.exec(i)[2])
      })
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
    LocalData.fav.push(data)
    LocalList.push(data.src)
    if ($("menu").index == 4) {

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
    if ($("menu").index == 4) {
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

function main() {
  page = 0
  getPostData("firstRun")
  if ($file.read(LocalDataPath)) {
    LocalData = JSON.parse($file.read(LocalDataPath).string);
    LocalList = LocalData.fav.map(i => i.src)
  } else {
    LocalData = { "fav": [] };
    LocalList = [];
  };
}


LocalDataPath = "drive://xiumeim.json"
main()
mainUI(2,280)