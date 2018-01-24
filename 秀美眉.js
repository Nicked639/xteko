const nickIcon = "data:image/jpeg;base64,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QTFGRjdDMUM0XzE1MTQ3MTcxNDg3MzAiLCJlbnRyeV9wb2ludCI6ImNyZWF0ZV9mbG93X2Z0ZSIsInBob3Rvc19hZGRlZCI6MCwidG90YWxfZWZmZWN0c190aW1lIjowLCJ0b29sc191c2VkIjp7InRpbHRfc2hpZnQiOjAsInJlc2l6ZSI6MiwiYWRqdXN0IjowLCJjdXJ2ZXMiOjAsIm1vdGlvbiI6MCwicGVyc3BlY3RpdmUiOjAsImNsb25lIjowLCJjcm9wIjowLCJlbmhhbmNlIjowLCJzZWxlY3Rpb24iOjAsImZyZWVfY3JvcCI6MCwiZmxpcF9yb3RhdGUiOjAsInNoYXBlX2Nyb3AiOjAsInN0cmV0Y2giOjB9LCJ3aWR0aCI6MTAwLCJzb3VyY2UiOiJzaGFyZV9hY3Rpb25fc2hlZXQiLCJvcmlnaW4iOiJnYWxsZXJ5IiwiaGVpZ2h0IjoxMDAsInN1YnNvdXJjZSI6ImRvbmVfYnV0dG9uIiwidG90YWxfZWRpdG9yX3RpbWUiOjYxLCJicnVzaGVzX3VzZWQiOjB9AAAAAGcAAAAZAAAAZwAAABkAAAALAAAABQAAAAsAAAAFQXBwbGUAaVBob25lIDVzIGJhY2sgY2FtZXJhIDQuMTJtbSBmLzIuMgAA/+ENymh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNC0wMS0xM1QxNzo1MjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTQtMDEtMTNUMTc6NTI6MDAiIHhtcDpDcmVhdG9yVG9vbD0iUGljc0FydCIgcGhvdG9zaG9wOkRhdGVDcmVhdGVkPSIyMDE0LTAxLTEzVDE3OjUyOjAwIj4gPGRjOmRlc2NyaXB0aW9uPiA8cmRmOkFsdD4gPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij57InRvdGFsX2VmZmVjdHNfYWN0aW9ucyI6MCwidG90YWxfZHJhd190aW1lIjowLCJsYXllcnNfdXNlZCI6MCwiZWZmZWN0c190cmllZCI6MCwidG90YWxfZHJhd19hY3Rpb25zIjowLCJ0b3RhbF9lZGl0b3JfYWN0aW9ucyI6eyJib3JkZXIiOjAsImZyYW1lIjowLCJtYXNrIjowLCJsZW5zZmxhcmUiOjAsImNsaXBhcnQiOjAsInRleHQiOjAsInNxdWFyZV9maXQiOjAsInNoYXBlX21hc2siOjAsImNhbGxvdXQiOjB9LCJlZmZlY3RzX2FwcGxpZWQiOjAsInVpZCI6IjM2REEyRDBCLTM1NTUtNDY3QS1BNjUwLTRCOUExRkY3QzFDNF8xNTE0NzE3MTQ4NzMwIiwiZW50cnlfcG9pbnQiOiJjcmVhdGVfZmxvd19mdGUiLCJwaG90b3NfYWRkZWQiOjAsInRvdGFsX2VmZmVjdHNfdGltZSI6MCwidG9vbHNfdXNlZCI6eyJ0aWx0X3NoaWZ0IjowLCJyZXNpemUiOjIsImFkanVzdCI6MCwiY3VydmVzIjowLCJtb3Rpb24iOjAsInBlcnNwZWN0aXZlIjowLCJjbG9uZSI6MCwiY3JvcCI6MCwiZW5oYW5jZSI6MCwic2VsZWN0aW9uIjowLCJmcmVlX2Nyb3AiOjAsImZsaXBfcm90YXRlIjowLCJzaGFwZV9jcm9wIjowLCJzdHJldGNoIjowfSwid2lkdGgiOjEwMCwic291cmNlIjoic2hhcmVfYWN0aW9uX3NoZWV0Iiwib3JpZ2luIjoiZ2FsbGVyeSIsImhlaWdodCI6MTAwLCJzdWJzb3VyY2UiOiJkb25lX2J1dHRvbiIsInRvdGFsX2VkaXRvcl90aW1lIjo2MSwiYnJ1c2hlc191c2VkIjowfTwvcmRmOmxpPiA8L3JkZjpBbHQ+IDwvZGM6ZGVzY3JpcHRpb24+IDxkYzpjcmVhdG9yPiA8cmRmOlNlcT4gPHJkZjpsaT5uaWNrdGltZWJyZWFrPC9yZGY6bGk+IDwvcmRmOlNlcT4gPC9kYzpjcmVhdG9yPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+AP/tADhQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAADhCSU0EJQAAAAAAENQdjNmPALIE6YAJmOz4Qn7/wAARCABkAGQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmq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"

 
let category = [{
  title: "首页",
  addr: "http://www.xiumeim.com",
  next: "http://www.xiumeim.com/albums/page-"
}, {
  title: "收藏",
},{
  title: "尤果",
  addr: "http://www.xiumeim.com/albums/UG.html",
  next: "http://www.xiumeim.com/albums/UG-"
}, {
  title: "波萝",
  addr: "http://www.xiumeim.com/albums/BOL.html",
  next: "http://www.xiumeim.com/albums/BOL-"
},{
  title: "秀人",
  addr: "http://www.xiumeim.com/albums/Goddess.html",
  next: "http://www.xiumeim.com/albums/Goddess.html-"
}, {
  title: "花の颜",
  addr: "http://www.xiumeim.com/albums/HuaYan.html",
  next: "http://www.xiumeim.com/albums/HuaYan.html-"
}, {
  title:"蜜桃",
  addr:"http://www.xiumeim.com/albums/MiiTao.html",
  next:"http://www.xiumeim.com/albums/MiiTao-.html"
},{
  title: "尤蜜荟",
  addr: "http://www.xiumeim.com/albums/YOUMI.html",
  next: "http://www.xiumeim.com/albums/YOUMI.html-"
},{
  title: "其他",
  addr: "http://www.xiumeim.com/albums/mix.html",
  next: "http://www.xiumeim.com/albums/mix-"
}, ]

function mainUI(column,rowHeight) {
  $ui.render({
    props: {
      title: "秀美眉",
    },
    views: [{
        type: "text",
        props: {
          id: "bgInfo",
          text: "Originated in Power Flow\n\nhttps://t.me/Flow_Script\n\nCreated By Nicked\n\nhttps://t.me/nicked\n\nVersion: 1.1",
          editable: false,
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
          src: nickIcon,
          radius: 25,
          alpha: 0.8,
          align: $align.center,
        },
        layout: function(make, view) {
          make.size.equalTo($size(50, 50))
          make.top.inset(150)
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
            if (sender.index !== 1) {
              mainUI(2,280)
              $("menu").index = sender.index;
              $("preView").hidden = false
              page = 0;
              $("preView").data = [];
              getPostData()
            } else {
              mainUI(4,150)
              $("menu").index = 1
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
            if ($("menu").index !== 1){
              
            getPostData()
            $delay(0.5, function() {
              getPostData()
            })
            }
            //$ui.action($("menu").index)
          },
          didSelect(sender, indexPath, data) {
            interface = data.interface.src
            title = data.title
            if($("menu").index == 1){
              showPhotos(title,1,563)
            }else{
              showPhotos(title,2,280)
            }
            if (LocalList.indexOf(interface) > -1) {
              $("favorite").title = "取消收藏"
               $("favorite").bgcolor= $color("#4f86f2")
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
      if(!resp){
        $ui.alert("❌ 请检查网络")
      }

    //   var reg1 = /<div class="gallary_item_album album">([\s\S]*?)<\/span>/g;
    //   var match1 = resp.data.match(reg1)
    //  // $ui.action(match1)
    //   var postData = []
    //   match1.map(function(i){
    //     var image = /(data-original=")([\s\S]*?)(")/.exec(i)[2];
    //     var detail = /(href=")([\s\S]*?)(")/.exec(i)[2];
    //     var title = /alt="(.*?)-/.exec(i)[1]
    //     var path0 = /<span class="name">([\s\S]*?)<\/span>/g.exec(i)[1]
    //     $ui.action(path0)
    //     path = /target='_blank'>[\s\S]*?<\/a>([\s\S]*?)<\/a>/g.exec(path0)[1]

    //   })
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

function showPhotos(title,columns,rowHeight) {
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
        make.height.equalTo(40)
      },
      events: {
        tapped(sender) {
          $device.taptic(0)
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
            if (!$drive.exists(folderName)) {
              $drive.mkdir(folderName)
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
                  var path = folderName + "/" + resp.response.suggestedFilename
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
        bgcolor:$color("black"),
        radius: 0,
        title: "收藏",
        alpha: 0.9
      },
      layout: function(make, view) {
        make.right.bottom.inset(0)
        make.width.equalTo(view.super).dividedBy(2)
        make.height.equalTo(40)
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
      if(!resp){
        $ui.alert("❌ 请检查网络")
      }
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
      if(detailPage == 1){
        folderName = /<title>([\s\S]*?) \-/g.exec(resp.data)[1]
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
    LocalData.fav.unshift(data)
    LocalList.unshift(data.src)
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