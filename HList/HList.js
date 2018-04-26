/*

 H LIST
 收藏与归档你想看的影片
 同时搜索庞大的 AV 片库
 部分影片支持视频截图预览
 几大厂商番号可复制后启动脚本直接进入搜索结果

 By Nicked

 https://t.me/nicked

*/

var version = 1.62

const nickIcon = "data:image/jpeg;base64,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QTFGRjdDMUM0XzE1MTQ3MTcxNDg3MzAiLCJlbnRyeV9wb2ludCI6ImNyZWF0ZV9mbG93X2Z0ZSIsInBob3Rvc19hZGRlZCI6MCwidG90YWxfZWZmZWN0c190aW1lIjowLCJ0b29sc191c2VkIjp7InRpbHRfc2hpZnQiOjAsInJlc2l6ZSI6MiwiYWRqdXN0IjowLCJjdXJ2ZXMiOjAsIm1vdGlvbiI6MCwicGVyc3BlY3RpdmUiOjAsImNsb25lIjowLCJjcm9wIjowLCJlbmhhbmNlIjowLCJzZWxlY3Rpb24iOjAsImZyZWVfY3JvcCI6MCwiZmxpcF9yb3RhdGUiOjAsInNoYXBlX2Nyb3AiOjAsInN0cmV0Y2giOjB9LCJ3aWR0aCI6MTAwLCJzb3VyY2UiOiJzaGFyZV9hY3Rpb25fc2hlZXQiLCJvcmlnaW4iOiJnYWxsZXJ5IiwiaGVpZ2h0IjoxMDAsInN1YnNvdXJjZSI6ImRvbmVfYnV0dG9uIiwidG90YWxfZWRpdG9yX3RpbWUiOjYxLCJicnVzaGVzX3VzZWQiOjB9AAAAAGcAAAAZAAAAZwAAABkAAAALAAAABQAAAAsAAAAFQXBwbGUAaVBob25lIDVzIGJhY2sgY2FtZXJhIDQuMTJtbSBmLzIuMgAA/+ENymh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNC0wMS0xM1QxNzo1MjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTQtMDEtMTNUMTc6NTI6MDAiIHhtcDpDcmVhdG9yVG9vbD0iUGljc0FydCIgcGhvdG9zaG9wOkRhdGVDcmVhdGVkPSIyMDE0LTAxLTEzVDE3OjUyOjAwIj4gPGRjOmRlc2NyaXB0aW9uPiA8cmRmOkFsdD4gPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij57InRvdGFsX2VmZmVjdHNfYWN0aW9ucyI6MCwidG90YWxfZHJhd190aW1lIjowLCJsYXllcnNfdXNlZCI6MCwiZWZmZWN0c190cmllZCI6MCwidG90YWxfZHJhd19hY3Rpb25zIjowLCJ0b3RhbF9lZGl0b3JfYWN0aW9ucyI6eyJib3JkZXIiOjAsImZyYW1lIjowLCJtYXNrIjowLCJsZW5zZmxhcmUiOjAsImNsaXBhcnQiOjAsInRleHQiOjAsInNxdWFyZV9maXQiOjAsInNoYXBlX21hc2siOjAsImNhbGxvdXQiOjB9LCJlZmZlY3RzX2FwcGxpZWQiOjAsInVpZCI6IjM2REEyRDBCLTM1NTUtNDY3QS1BNjUwLTRCOUExRkY3QzFDNF8xNTE0NzE3MTQ4NzMwIiwiZW50cnlfcG9pbnQiOiJjcmVhdGVfZmxvd19mdGUiLCJwaG90b3NfYWRkZWQiOjAsInRvdGFsX2VmZmVjdHNfdGltZSI6MCwidG9vbHNfdXNlZCI6eyJ0aWx0X3NoaWZ0IjowLCJyZXNpemUiOjIsImFkanVzdCI6MCwiY3VydmVzIjowLCJtb3Rpb24iOjAsInBlcnNwZWN0aXZlIjowLCJjbG9uZSI6MCwiY3JvcCI6MCwiZW5oYW5jZSI6MCwic2VsZWN0aW9uIjowLCJmcmVlX2Nyb3AiOjAsImZsaXBfcm90YXRlIjowLCJzaGFwZV9jcm9wIjowLCJzdHJldGNoIjowfSwid2lkdGgiOjEwMCwic291cmNlIjoic2hhcmVfYWN0aW9uX3NoZWV0Iiwib3JpZ2luIjoiZ2FsbGVyeSIsImhlaWdodCI6MTAwLCJzdWJzb3VyY2UiOiJkb25lX2J1dHRvbiIsInRvdGFsX2VkaXRvcl90aW1lIjo2MSwiYnJ1c2hlc191c2VkIjowfTwvcmRmOmxpPiA8L3JkZjpBbHQ+IDwvZGM6ZGVzY3JpcHRpb24+IDxkYzpjcmVhdG9yPiA8cmRmOlNlcT4gPHJkZjpsaT5uaWNrdGltZWJyZWFrPC9yZGY6bGk+IDwvcmRmOlNlcT4gPC9kYzpjcmVhdG9yPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+AP/tADhQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAADhCSU0EJQAAAAAAENQdjNmPALIE6YAJmOz4Qn7/wAARCABkAGQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmq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"

//$cache.clear()
const searchView = {
  type: 'view',
  props: {
    id: "searchView",
    bgcolor: $color("white")
  },
  views: [{
    type: "text",
    props: {
      id: "bgInfo",
      text: "Originated in Power Flow\n\nhttps://t.me/Flow_Script",
      editable: false,
      textColor: $color("#CCCCCC"),
      font: $font(10),
      align: $align.center,
      hidden: true
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
      hidden: true
    },
    layout: function(make, view) {
      make.size.equalTo($size(50, 50))
      make.top.inset(100)
      make.left.inset(162)
    }

  }, {
    type: "text",
    props: {
      id:"loading",
      text: "Loading...",
      bgcolor: $color("clear"),
      textColor: $color("#888888"),
      font: $font(20),
      align: $align.center
    },

    layout: function(make, view) {
      make.top.inset(200)
      make.height.equalTo(100)
      make.width.equalTo($device.info.screen.width)
    }
  },{
    type: "input",
    props: {
      id: "input",
      placeholder: "载入中, 请稍候...",
      id: "input",
      font: $font(13),
      clearsOnBeginEditing: false,
      bgcolor: $color("#f3f3f3"),
      radius: 8,
      stickyHeader: false
    },
    events: {
      returned: function(sender) {
        sender.blur()
        $("initialView").data = [];
        $ui.loading(true)
        if (sender.text) {
          mode = "search";
          keyword = sender.text;
          page = 0;
          getInitial(mode, keyword);
        } else {
          mode = "home"
          page = 0
          getInitial(mode)
        }
        $("initialView").contentOffset = $point(0, 0);
        $("initialView").hidden = false;
        $("menu").index = 0;
      }
    },
    layout: function(make, view) {
      make.left.right.top.inset(5)
      make.height.equalTo(30)
    }
  }, {
    type: "matrix",
    props: {
      id: "initialView",
      itemHeight: 180,
      columns: 3,
      spacing: 1,
      square: false,
      bgcolor: $color("clear"),
      template: [{
        type: "image",
        props: {
          id: "initialCover",
          radius: 5,
        },
        layout: $layout.fill
      }, {
        type: "label",
        props: {
          id: "info",
          bgcolor: $rgba(0, 0, 0, 0.35),
          textColor: $color("white"),
          align: $align.center,
          font: $font(10),
          autoFontSize: true,
          radius:5
        },
        layout: function(make) {
          make.left.right.inset(0)
          make.bottom.inset(0)
          make.height.equalTo(20)
        },
      },],
    },
    layout: function(make, view) {
      make.left.right.bottom.inset(5)
      make.top.equalTo($("input").bottom).offset(5)
    },
    events: {
      didReachBottom(sender) {
        sender.endFetchingMore();
        if ($("menu").index == 0) {
          $ui.loading(true)
          getInitial(mode, keyword);

        }

      },
      didSelect(sender, indexPath, data) {
        //$ui.action(data.code)

        favSrc = data.initialCover.src
        favInfo = data.info.text
        favLink = data.link
        shortCode = favLink.split('/').pop()
        favCode = data.code
        if ($("tab").hidden == false && $("tab").index == 1) {
          favActressCover = favSrc
          favActressName = favInfo
          url = favLink

          actressView(favInfo, favSrc)
          actressPage = 0
          getActress(favLink)
          if (LocalActressList.indexOf(shortCode) > -1) {
            $("favActress").title = "取消收藏";
            $("favActress").bgcolor = $color("#f25959");
            $("favActress").titleColor = $color("white");
            $("favActress").borderColor = $color("#f25959");
          }
        } else {
          getDetail(data.link)
          $ui.push(detailView)
          if ($("menu").index == 0) {
            if (LocalFavList.indexOf(shortCode) > -1) {
              $("favorite").title = "取消收藏"
              $("favorite").bgcolor = $color("#f25959")
            } else if (LocalArcList.indexOf(shortCode) > -1) {
              $("favorite").title = "已归档"
              $("favorite").bgcolor = $color("#aaaaaa")
            }
          } else if ($("menu").index == 1) {
            if (LocalFavList.indexOf(shortCode) > -1) {
              $("favorite").title = "归档"

            } else {
              $("favorite").title = "收藏"
            }

          } else {
            $("favorite").title = "删除"
            $("favorite").bgcolor = $color("#f25959")
          }
        }
      }

    }

  }, {
    type: "tab",
    props: {
      id: "tab",
      hidden: false,
      items: ["影片", "演员"],
      tintColor: $color("black"),
      radius: 5,
      bgcolor: $color("white"),
      hidden: true
    },
    layout: function(make) {
      make.left.right.inset(120)
      make.bottom.inset(20)
      make.height.equalTo(22)
      //make.width.equalTo(40)
    },
    events: {
      changed(sender) {
        if (sender.index == 0) {
          $("initialView").data = [];
          //$("initialView").contentOffset = $point(0, 0);
          var length = LocalFavList.length;
          $("input").text = ("")
          $("input").placeholder = "已收藏 " + length + " 部影片"
          if (length == 0) {
            $("initialView").hidden = true
          } else {
            $("initialView").hidden = false
          }
          LocalData.favorite.map(function(i) {
            $("initialView").data = $("initialView").data.concat({
              code: i.code,
              link: homeMoviePage + i.shortCode,
              initialCover: {
                src: i.src
              },
              info: {
                text: i.info
              }
            })
          })

        } else if (sender.index == 1) {
          $("initialView").data = [];
          $("initialView").contentOffset = $point(0, 0);
          var length = LocalActressList.length;
          $("input").text = ("")
          $("input").placeholder = "已收藏 " + length + " 位演员"
          if (length == 0) {
            $("initialView").hidden = true
          } else {
            $("initialView").hidden = false
          }
          LocalData.actress.map(function(i) {
            $("initialView").data = $("initialView").data.concat({
              link: homeStarPage + i.shortCode,
              initialCover: {
                src: i.src
              },
              info: {
                text: i.info
              }
            })
          })
        }
      }
    }

  }],
  layout: function(make, view) {
    make.left.right.bottom.inset(0)
    make.top.equalTo($("menu").bottom)
  }

}

const detailView = {
  type: "view",
  props: {
    title: "详情页",
    //scrollEnabled: true,
    //contentSize: $size(0, 1000)
  },
  views: [{
      type: "text",
      props: {
        id: "filmName",
        //text: "Originated in Power Flownhttps://t.me/Flow_Script\nVersion: 1.1",
        editable: false,
        textColor: $color("black"),
        font: $font(15),
        align: $align.left,
        //autoFontSize: true,
        scrollEnabled: false,
        hidden: false,
        lines: 1,
        insets: $insets(0, 0, 0, 0)
      },

      layout: function(make, view) {
        make.top.inset(10)
        make.left.right.inset(5)
        //make.height.equalTo(70)
      }
    }, {
      type: "image",
      props: {
        id: "filmCover",
        radius: 7
        //scale: 2,
        //src: "https://i.loli.net/2017/11/14/5a0a553e1c420.jpg"
      },
      layout: function(make, view) {
        var width = $device.info.screen.width - 20;
        var height = width * 67 / 100
        make.left.inset(10)
        make.top.equalTo($("filmName").bottom).offset(5)
        make.size.equalTo($size(width, height))
      }
    }, {
      type: "text",
      props: {
        text: "影片信息:",
        hidden: true,
        bgcolor: $color("white"),
        id: "aboutFilm",
        hidden: true,
        font: $font("bold", 17),
        editable: false,
        textColor: $color("black"),
        align: $align.left,
        //autoFontSize: true,
        scrollEnabled: false,
        insets: $insets(0, 0, 0, 0)
      },
      layout: function(make, view) {
        make.left.inset(5)
        make.top.equalTo($("filmCover").bottom).offset(5)
        //make.height.equalTo(20)
      },

    }, {
      type: "text",
      props: {
        id: "filmInfo",
        //text: "时间: 2017-12-04    长度: 124分钟    发行商: SOD",
        editable: false,
        textColor: $color("black"),
        font: $font(12),
        align: $align.left,
        scrollEnabled: false,
        insets: $insets(0, 0, 0, 0)
      },

      layout: function(make, view) {
        make.top.equalTo($("aboutFilm").bottom).offset(5)
        make.left.inset(5)
        //make.width.equalTo($device.info.screen.width)
      }
    }, {
      type: "text",
      props: {
        text: "参演女优:",
        bgcolor: $color("white"),
        id: "whoInFilm",
        font: $font("bold", 17),
        editable: false,
        textColor: $color("black"),
        align: $align.left,
        //autoFontSize: true,
        scrollEnabled: false,
        hidden: true,
        insets: $insets(0, 0, 0, 0)
      },
      layout: function(make, view) {
        make.left.inset(5)
        make.top.equalTo($("filmInfo").bottom).offset(5)
        //make.height.equalTo(20)
      },

    }, {
      type: "matrix",
      props: {
        id: "filmActress",
        itemHeight: 100,
        columns: 4,
        spacing: 6,
        square: false,
        bgcolor: $color("clear"),
        template: [{
          type: "view",
          props: {
            bgcolor: $color("#ededed"),
            radius: 5
          },
          views: [{
            type: "image",
            props: {
              id: "actressCover",
              radius: 5
            },
            layout: function(make, view) {
              make.left.right.top.inset(3);
              make.height.equalTo(80)
            }
          }, {
            type: "label",
            props: {
              id: "actressName",
              textColor: $color("black"),
              //text: "dfcvv",
              align: $align.center,
              font: $font("bold", 10),
              autoFontSize: true,
            },
            layout: function(make) {
              make.left.right.inset(0)
              make.top.equalTo($("actressCover").bottom).offset(2)
              //make.height.equalTo(20)
            },
          }],
          layout: $layout.fill
        }],
      },
      layout: function(make, view) {
        make.left.right.inset(5)
        make.bottom.inset(20)
        make.top.equalTo($("whoInFilm").bottom).offset(0)
      },
      events: {
        didSelect(sender, indexPath, data) {
          //$ui.action(data.actressName.text)
          url = data.link
          favActressName = data.actressName.text
          favActressCover = data.actressCover.src
          actressPage = 0
          shortCode = url.split("/").pop()
          actressView(favActressName, favActressCover)
          $("actressView").data = []
          getActress(url)
          if (LocalActressList.indexOf(shortCode) > -1) {
            $("favActress").title = "取消收藏";
            $("favActress").bgcolor = $color("#f25959");
            $("favActress").titleColor = $color("white");
            $("favActress").borderColor = $color("#f25959");
          }
        }
      }

    }, {
      type: "button",
      props: {
        id: "megnet",
        bgcolor: $color("#ededed"),
        radius: 0,
        title: "搜索",
        font: $font("bold", 16),
        titleColor: $color("black"),
        alpha: 0.9,
        radius: 6
      },
      layout: function(make, view) {
        make.left.inset(10)
        make.bottom.inset(20)
        make.width.equalTo(view.super).dividedBy(3).offset(-10)
        make.height.equalTo(30)
      },
      events: {
        tapped(sender) {
          //$clipboard.text = favCode
          //$ui.action(favCode)
         $ui.menu({
           items:["磁链","Avgle","复制番号"],
           handler:function(title,idx){
             if(idx==0){
                         $http.request({
            url: "https://btso.pw",
            timeout: 1,
            handler: function(resp) {
              if (resp.data) {
                $safari.open({
                  url: "http://btso.pw/search/" + encodeURI(favCode)
                })
              } else {
                $safari.open({
                  url: "http://www.nms999.com/l/" + encodeURI(favCode) + "-hot-desc-1"
                })
              }

            }
          })
             }else if(idx ==1){
//               $clipboard.text = favCode;
              var js = jsDetect()["js"]
              var num = jsDetect()["num"]
              if(js){
                var version = $addin.list[num].version
              $console.log(version)
              if(version>3){              
                $addin.run({
                name: js,
                query: {
                "code": favCode
                }
               })              
//                $app.openExtension(js+".js")
              }
              }else {
                $ui.alert({
                  title: "请更新至最新版本 Avgle",
                  message: "是否安装?\n安装完成后请再次点击。" ,
                  actions: [{
                    title: "安装",
                    handler: function() {
                      var url = "jsbox://install?url=https://raw.githubusercontent.com/nicktimebreak/xteko/master/Avgle/Avgle.js&name=Avgle&icon=icon_135.png&types=1&version=3.1&author=Nicked&website=https://t.me/nicked";
                      $app.openURL(encodeURI(url));
                      $app.close()
                    }
                  }, {
                    title: "取消"
                  }]
                })
              }
              //  $clipboard.text = favCode;
              //  $app.openExtension("Avgle.js")
               
             /*$safari.open({
               url:"https://avgle.com/search/videos?search_query="+encodeURI(favCode)+"&search_type=videos"
             })*/
           }else {
            $clipboard.text = favCode
           }
           }
         }) 
 
        }
      }

    }, {
      type: "button",
      props: {
        id: "check",
        bgcolor: $color("#ededed"),
        radius: 0,
        title: "查看截图",
        font: $font("bold", 16),
        titleColor: $color("black"),
        alpha: 0.9,
        radius: 6
      },
      layout: function(make, view) {
        make.bottom.inset(20)
        make.left.equalTo($("megnet").right).offset(5)
        make.width.equalTo(view.super).dividedBy(3).offset(-10)
        make.height.equalTo(30)
      },
      events: {
        tapped(sender) {
          if (screenData == "no") {
            $ui.toast("☹️ 暂无截图", 1)
            return
          } else {
            //$ui.action(screenData)
            $ui.push(screenshotView)
            screenData.map(function(i) {
              //$ui.action(i.link)
              $("screenshot").data = $("screenshot").data.concat({
                screenshotCover: {
                  src: i.src
                },
                link: i.link
              })
            })
          }

        }

      }

    }, {
      type: "button",
      props: {
        id: "favorite",
        bgcolor: $color("#5e9ced"),
        title: "收藏",
        font: $font("bold", 16),
        titleColor: $color("white"),
        alpha: 0.9,
        radius: 6
      },
      layout: function(make, view) {
        make.bottom.inset(20)
        make.right.inset(10)
        make.width.equalTo(view.super).dividedBy(3).offset(-10)
        make.height.equalTo(30)
      },
      events: {
        tapped(sender) {

          var data = {
            "code": favCode,
            "src": favSrc,
            "info": favInfo,
            "shortCode": shortCode
          }
          /*
          if ($("menu").index == 0) {
            if ($("favorite").title == "收藏") {
              $("favorite").title = "取消收藏"
              $("favorite").bgcolor = $color("#f25959");
              favoriteButtonTapped("add", data)
            } else if ($("favorite").title == "取消收藏") {
              $("favorite").title = "收藏"
              $("favorite").bgcolor = $color("#5e9ced")
              favoriteButtonTapped("cancel", data)
            }
          } else if ($("menu").index == 1) {
            if ($("favorite").title == "归档") {

              $("favorite").title = "已归档"
              favoriteButtonTapped("archive", data)

            }
          } else {
            if ($("favorite").title == "删除") {
              $("favorite").title = "已删除"
              $("favorite").bgcolor = $color("#aaaaaa")
              favoriteButtonTapped("del", data)
            }

          }*/

          if ($("favorite").title == "收藏") {
            $("favorite").title = "取消收藏"
            $("favorite").bgcolor = $color("#f25959");
            favoriteButtonTapped("add", data)
          } else if ($("favorite").title == "取消收藏") {
            $("favorite").title = "收藏"
            $("favorite").bgcolor = $color("#5e9ced")
            favoriteButtonTapped("cancel", data)
          } else if ($("favorite").title == "归档") {
            $("favorite").bgcolor = $color("#aaaaaa")
            $("favorite").title = "已归档"
            favoriteButtonTapped("archive", data)
          } else if ($("favorite").title == "删除") {
            $("favorite").title = "已删除"
            $("favorite").bgcolor = $color("#aaaaaa")
            favoriteButtonTapped("del", data)
          }

        } //tapped
      } //events

    }, {
      type: "button",
      props: {
        id: "share",
        bgcolor: $color("#ededed"),
        title: "分享影片",
        hidden: true,
        font: $font(11),
        //icon: $icon("022", $color("#666666"), $size(15, 15))
        titleColor: $color("black"),
        //alpha: 1,
        radius: 6
      },
      layout: function(make, view) {
        make.left.inset(90)
        make.top.equalTo($("filmCover").bottom).offset(5)
        make.width.equalTo(50)
        make.height.equalTo(20)
      },
      events: {
        tapped(sender) {
          //$clipboard.text = favCode
          $share.sheet(favLink)

        }
      }

    },

  ],
  layout: $layout.fill

}

const screenshotView = {

  type: "view",
  props: {
    title: "影片截屏"
  },
  views: [{
    type: "matrix",
    props: {
      id: "screenshot",
      itemHeight: 130,
      columns: 3,
      spacing: 1,
      square: false,
      bgcolor: $color("clear"),
      template: [{
        type: "image",
        props: {
          id: "screenshotCover",
         // src: nickIcon
        },
        layout: $layout.fill

      }, ],
    },
    layout: $layout.fill,
    events: {
      didSelect(sender, indexPath, data) {
        //$ui.action(data.actressName.text)
        url = data.link
        $quicklook.open({
          url: url
        })
      }
    }

  }],
  layout: $layout.fill
}

function actressView(actress, cover) {
  $ui.push({
    type: "view",
    props: {
      title: actress
    },
    views: [{
      type: "image",
      props: {
        id: "actress",
        src: cover,
        radius:5
      },
      layout: function(make, view) {
        make.left.top.inset(5)
        make.width.equalTo(125)
        make.height.equalTo(125)
      }
    }, {
      type: "text",
      props: {
        id: "actressInfo",
        text: "生日: ????-??-??\n\n年龄: ??岁\n\n身高: ???cm\n\n罩杯: ?",
        editable: false,
        textColor: $color("black"),
        font: $font("bold", 15),
        align: $align.left,
        scrollEnabled: false,
        insets: $insets(0, 0, 0, 0)

      },
      layout: function(make, view) {
        make.left.equalTo($("actress").right).offset(5)
        make.top.inset(5)
        make.height.equalTo(150)
        make.width.equalTo(150)
      }
    }, {
      type: "text",
      props: {
        id: "actressInfo2",
        text: "胸围: ??cm\n\n腰围: ??cm\n\n臀围: ??cm",
        editable: false,
        textColor: $color("black"),
        font: $font("bold", 15),
        align: $align.left,
        scrollEnabled: false,
        insets: $insets(0, 0, 0, 0)
      },
      layout: function(make, view) {
        //make.left.equalTo($("actressInfo").right).offset(-5)
        make.right.inset(5)
        make.top.inset(5)
        make.height.equalTo(150)
        make.width.equalTo(100)
      }
    }, {
      type: "button",
      props: {
        id: "favActress",
        title: "收藏演员",
        font: $font("bold", 15),
        bgcolor: $color("white"),
        titleColor: $color("black"),
        borderWidth: 1,
        borderColor: $color("black"),
        radius: 5
        //tintColor: $color("white")
      },
      layout: function(make, view) {
        //make.top.equalTo($("actressInfo2").bottom).offset(10)
        make.top.inset(110)
        make.left.equalTo($("actressInfo2").left).offset(2)
        make.width.equalTo(70)
        make.height.equalTo(22)
      },
      events: {
        tapped(sender) {
          var data = {
            "src": favActressCover,
            "info": favActressName,
            "shortCode": shortCode
          }

          //$ui.action(data)
          if ($("favActress").title == "收藏演员") {

            $("favActress").title = "取消收藏";
            $("favActress").bgcolor = $color("#f25959");
            $("favActress").titleColor = $color("white");
            $("favActress").borderColor = $color("#f25959");
            favActressButtonTapped("add", data);
            //$ui.action(data)
          } else if ($("favActress").title == "取消收藏") {
            $("favActress").title = "收藏演员";
            $("favActress").bgcolor = $color("white");
            $("favActress").titleColor = $color("black");
            $("favActress").borderColor = $color("black");
            // $ui.action(data)
            favActressButtonTapped("del", data);

          }
        }
      }
    }, {
      type: "matrix",
      props: {
        id: "actressView",
        itemHeight: 180,
        columns: 3,
        spacing: 1,
        square: false,
        bgcolor: $color("white"),
        template: [{
          type: "image",
          props: {
            id: "actressCovers",
            radius:5
          },
          layout: $layout.fill
        }, {
          type: "label",
          props: {
            id: "actressInfos",
            bgcolor: $rgba(0, 0, 0, 0.4),
            textColor: $color("white"),
            align: $align.center,
            font: $font(10),
            autoFontSize: true,
            radius:5
          },
          layout: function(make) {
            make.left.right.bottom.inset(0)
            make.height.equalTo(25)
          },
        }],
      },
      layout: function(make, view) {
        make.left.right.inset(5)
        make.bottom.inset(0)
        make.top.equalTo($("actressInfo").bottom).offset(-15)
      },
      events: {
        didReachBottom(sender, data) {
          $ui.loading(true)
          sender.endFetchingMore();
          getActress(url);

        },
        didSelect(sender, indexPath, data) {

          favSrc = data.actressCovers.src
          favInfo = data.actressInfos.text
          favLink = data.link
          shortCode = favLink.split("/").pop()
          favCode = data.code
          //$ui.action(data.code)
          getDetail(data.link)
          $ui.push(detailView)

          /*if (LocalFavList.indexOf(favLink) > -1) {
            if ($("menu").index == 0) {
              $("favorite").title = "取消收藏";
              $("favorite").bgcolor = $color("#f25959")
            } else if ($("menu").index == 1) {
              $("favorite").title = "归档"
            } else if ($("menu").index == 2){
              if (LocalArcList.indexOf(favLink) < 0){
                 $("favorite").title = "归档"
              }

            }
          } else {
            if(LocalArcList.indexOf(favLink) > -1){
              $("favorite").title = "已归档"
            }
            $("favorite").title = "收藏"
          }*/

          if ($("menu").index == 0) {
            if (LocalFavList.indexOf(shortCode) > -1) {
              $("favorite").title = "取消收藏"
            } else if (LocalArcList.indexOf(shortCode) > -1) {
              $("favorite").title = "已归档"
              $("favorite").bgcolor = $color("#aaaaaa")
            }
          } else if ($("menu").index == 1) {
            if (LocalFavList.indexOf(shortCode) > -1) {
              $("favorite").title = "归档"
            } else if ((LocalArcList.indexOf(shortCode) > -1)) {

              $("favorite").title = "已归档"
              $("favorite").bgcolor = $color("#aaaaaa")
            } else {

              $("favorite").title = "收藏"

            }
          } else if ($("menu").index == 2) {
            if (LocalArcList.indexOf(shortCode) > -1) {
              $("favorite").title = "删除"
              $("favorite").bgcolor = $color("#f25959");
            } else {
              if (LocalFavList.indexOf(shortCode) > -1) {
                $("favorite").title = "归档"
              } else {
                $("favorite").title = "收藏"
              }
            }
          }
        }
      }

    }],
    layout: $layout.fill
  })
}

$ui.render({
  props: {
    title: "欲望清单"
  },
  views: [{
      type: "menu",
      props: {
        id: "menu",
        items: ["搜索", "收藏", "归档"]
      },
      layout: function(make) {
        make.top.left.right.inset(0)
        make.height.equalTo(35)
      },
      events: {
        changed(sender) {
          switch (sender.index) {
            case 0:
              $("bgInfo").hidden = false;
              $("bgImage").hidden = false;
              $("tab").hidden = true;
              $("input").placeholder = "输入番号或演员进行搜索"
              $("initialView").hidden = false

              $("initialView").data = []
              $("initialView").contentOffset = $point(0, 0)
              page = 0
              mode = "home"
              keyword = ""
              getInitial(mode)
              break;
            case 1:
              $("bgInfo").hidden = true;
              $("bgImage").hidden = true;
              $("tab").hidden = false;
              $("initialView").data = [];
              $("initialView").contentOffset = $point(0, 0);

              var length = LocalFavList.length;
              $("input").text = ("")
              if (length == 0) {
                $("initialView").hidden = true

              } else {
                $("initialView").hidden = false
              }
              if ($("tab").index == 0) {

                $("input").placeholder = "已收藏 " + length + " 部影片";
                LocalData.favorite.map(function(i) {
                  $("initialView").data = $("initialView").data.concat({
                    code: i.code,
                    link: homeMoviePage + i.shortCode,
                    initialCover: {
                      src: i.src
                    },
                    info: {
                      text: i.info
                    }
                  })
                })

              } else if ($("tab").index == 1) {
                var length = LocalActressList.length;
                $("input").placeholder = "已收藏 " + length + " 位演员";
                LocalData.actress.map(function(i) {
                  $("initialView").data = $("initialView").data.concat({
                    link: homeStarPage + i.shortCode,
                    initialCover: {
                      src: i.src
                    },
                    info: {
                      text: i.info
                    }
                  })
                })
              }

              break;
            case 2:
              $("bgInfo").hidden = true;
              $("bgImage").hidden = true;
              $("tab").hidden = true;
              var length = LocalArcList.length;
              $("input").text = ("")
              $("input").placeholder = "已归档 " + length + " 部影片"
              if (length == 0) {
                $("initialView").hidden = true
              } else {
                $("initialView").hidden = false
              }
              $("initialView").data = []
              $("initialView").contentOffset = $point(0, 0)
              LocalData.archive.map(function(i) {
                $("initialView").data = $("initialView").data.concat({
                  code: i.code,
                  link: homeMoviePage + i.shortCode,
                  initialCover: {
                    src: i.src
                  },
                  info: {
                    text: i.info
                  }
                })
              })
              break;

          }
        }
      }
    },
    searchView,
  ]
})

function getInitial(mode, keyword) {
  page++;
  //$ui.toast("⏱ 搜索中", 100)
  if (mode == "home") {
    url = homepage + "page/"
  } else if (mode == "search") {
    url = encodeURI(homeSearchPage + keyword + "/page/")
  }
  $http.request({
    url: url + page,
    timeout: timeout,
    handler: function(resp) {
      $ui.loading(false);
      if (!resp.response) {
        $ui.toast("❌ 网络连接错误")
        return
      }
      if (resp.data.indexOf("404 Not Found") > -1) {
        $ui.toast("🙈 到底了")
        return
      } else if (resp.data.indexOf("没有结果") > -1) {
        if (mode == "search" && $("initialView").data.length > 0) {
          $ui.toast("🙈 到底了")
          return
        } else {
          $ui.toast("💔 搜索无果,车牌无效")
          return
        }

      }
      var reg = /<a class="movie-box"[\s\S]*?<\/span>/g;
      var match = resp.data.match(reg)
      //$ui.action(match)
      var data = []
      match.map(function(i) {
        var link = /href="([\s\S]*?)(")/.exec(i)[1];
        var image = /<img src="([\s\S]*?)(")/.exec(i)[1];
        var title = /title="(.*?)(">)/.exec(i)[1];
        var code = /<br><date>(.*?)<\/date>/.exec(i)[1];
        var date = /\/\s<date>(.*?)<\/date><\/span>/.exec(i)[1];
        $("initialView").data = $("initialView").data.concat({
          //title: title,
          link: link,
          code: code,
          initialCover: {
            src: image
          },
          info: {
            text: code + " | " + date
          }
        });

      })
      if ($("initialView").data.length == 1) {
        $("bgInfo").hidden = true;
        $("bgImage").hidden = true;
      } else {
        $("bgInfo").hidden = false;
        $("bgImage").hidden = false;
      }
      $("input").placeholder = "输入番号或演员进行搜索"
      //$ui.toast("", 0.1)

    }

  })

}

function getDetail(url) {
  $http.request({
    url: url,
    timeout: timeout,
    handler: function(resp) {
      if (!resp.response) {
        $ui.toast("❌ 网络连接错误")
        return
      }
      //演员头像
      var actressReg = /<a class="avatar-box"[\s\S]*?<\/a>/g;
      var match = resp.data.match(actressReg)
      if (match) {
        $("whoInFilm").hidden = false
        match.map(function(i) {
          var name = /<span>(.*?)<\/span>/.exec(i)[1];
          var nameLink = /href="([\s\S]*?)(")/.exec(i)[1];
          var nameImage = /<img src="([\s\S]*?)(")/.exec(i)[1];
          //$ui.action(nameImage)
          $("filmActress").data = $("filmActress").data.concat({
            link: nameLink,
            actressCover: {
              src: nameImage
            },
            actressName: {
              text: name
            }
          });
        })

      } else {
        $("whoInFilm").hidden = true
      }
      // 影片详情
      var filmCover = /<a class="bigImage" href="(.*?)"/.exec(resp.data)[1];
      $("filmCover").src = filmCover;
      var filmName = /<a class="bigImage" href="(.*?)" title="(.*?)"/.exec(resp.data)[2];
      $("filmName").text = filmName;
      var temp = /<span class="header">发行时间:<\/span>([\s\S]*?)<\/p>/.exec(resp.data);
      if (temp) {
        var filmTime = temp[1]
      } else {
        var filmTime = "????-??-??"
      }
      var temp = /<span class="header">长度:<\/span>([\s\S]*?)<\/p>/.exec(resp.data);
      if (temp) {
        var filmLast = temp[1]
      } else {
        var filmLast = "???分钟"
      }
      var temp = /<p class="header">发行商:[\s\S]*?">(.*?)<\/a>/.exec(resp.data);
      if (temp) {
        var filmSource = temp[1]
      } else {
        var filmSource = "??"
      }
      $("filmInfo").text = "上映: " + filmTime + "    长度: " + filmLast + "    发行商: " + filmSource;
      $("aboutFilm").hidden = false

      //$ui.action(filmSource)
      //影片截图
      var regScreenshot = /<a class="sample-box" href="(.*?)"[\s\S]*?<img src="(.*?)">/g
      var match = resp.data.match(regScreenshot)

      if (match) {
        screenData = []
        match.map(function(i) {
          var screenshot = /<a class="sample-box" href="(.*?)"[\s\S]*?<img src="(.*?)">/g.exec(i)[1];

          var screenshotCover = /<a class="sample-box" href="(.*?)"[\s\S]*?<img src="(.*?)">/g.exec(i)[2];
          //$ui.action(screenshotCover)
          screenData.push({
            "src": screenshotCover,
            "link": screenshot
          })

        })

      } else {
        screenData = "no"
      }
      $("share").hidden = false

    }
  })

}

function getActress(url) {
  actressPage++
  $http.request({
    url: url + "/page/" + actressPage,
    timeout: timeout,
    handler: function(resp) {
      if (!resp.response) {
        $ui.toast("❌ 网络连接错误")
        return
      }
      if (resp.data.indexOf("404 Not Found") > -1) {
        $ui.toast("🙈 到底了")
        return
      }
      //$ui.toast("搜索中")
      if (actressPage == 1) {
        var temp = /<div class="photo-info">[\s\S]*?生日:\s(.*?)<\/p>/.exec(resp.data)
        if (temp) {
          var birth = temp[1];
        } else {
          var birth = "????-??-??"
        }
        var temp = /<div class="photo-info">[\s\S]*?年龄:\s(.*?)<\/p>/.exec(resp.data)
        if (temp) {
          var age = temp[1]+"岁"
        } else {
          var age = "??岁"
        }
        var temp = /<div class="photo-info">[\s\S]*?身高:\s(.*?)<\/p>/.exec(resp.data)
        if (temp) {
          var height = temp[1]
        } else {
          var height = "???cm"
        }
        var temp = /<div class="photo-info">[\s\S]*?罩杯:\s(.*?)<\/p>/.exec(resp.data)
        if (temp) {
          var breast = temp[1]
        } else {
          var breast = "?"
        }
        var temp = /<div class="photo-info">[\s\S]*?胸围:\s(.*?)<\/p>/.exec(resp.data)
        if (temp) {
          var xiong = temp[1]
        } else {
          var xiong = "??cm"
        }
        var temp = /<div class="photo-info">[\s\S]*?腰围:\s(.*?)<\/p>/.exec(resp.data)
        if (temp) {
          var yao = temp[1]
        } else {
          var yao = "??cm"
        }
        var temp = /<div class="photo-info">[\s\S]*?臀围:\s(.*?)<\/p>/.exec(resp.data)
        if (temp) {
          var tun = temp[1]
        } else {
          var tun = "??cm"
        }
        $("actressInfo").text = "生日: " + birth + "\n\n年龄: " + age + "\n\n身高: " + height + "\n\n罩杯: " + breast;
        $("actressInfo2").text = "胸围: " + xiong + "\n\n腰围: " + yao + "\n\n臀围: " + tun;

      }

      var reg = /<a class="movie-box"[\s\S]*?<\/span>/g;
      var match = resp.data.match(reg)
      //$ui.action(match)
      var data = []
      match.map(function(i) {
        var link = /href="([\s\S]*?)(")/.exec(i)[1];
        var image = /<img src="([\s\S]*?)(")/.exec(i)[1];
        var title = /title="(.*?)(">)/.exec(i)[1];
        var code = /<br><date>(.*?)<\/date>/.exec(i)[1];
        var date = /\/\s<date>(.*?)<\/date><\/span>/.exec(i)[1];
        $("actressView").data = $("actressView").data.concat({
          //title: title,
          link: link,
          code: code,
          actressCovers: {
            src: image
          },
          actressInfos: {
            text: code + " | " + date
          }
        });

      })
      // $ui.toast("",0.1)
    }
  })
}

function favActressButtonTapped(mode, data) {
  if (mode == "add") {
    LocalData.actress.push(data)
    LocalActressList.push(data.shortCode)
    if ($("menu").index == 1 && $("tab").index == 1) {
      $("initialView").data = $("initialView").data.concat({
        link: homeStarPage + data.shortCode,
        //code:code,
        initialCover: {
          src: data.src
        },
        info: {
          text: data.info
        }
      })
    }

  } else if (mode == "del") {

    idx = LocalActressList.indexOf(data.shortCode)
    //$ui.action(idx)
    LocalActressList.splice(idx, 1)
    LocalData.actress.splice(idx, 1)
    if ($("menu").index == 1 && $("tab").index == 1) {
      // $ui.action(data.link)
      $("initialView").delete(idx)
    }
  }

  var length = LocalActressList.length;
  $("input").placeholder = "已收藏 " + length + " 位演员";
  writeCache()
}

function favoriteButtonTapped(mode, data) {
  if (mode == "add") {
    //$ui.pop();
    LocalData.favorite.push(data)
    LocalFavList.push(data.shortCode)
    if ($("menu").index == 1 && $("tab").index == 0) {
      $("initialView").data = $("initialView").data.concat({
        link: homeMoviePage + shortCode,
        code: data.code,
        initialCover: {
          src: data.src
        },
        info: {
          text: data.info
        }
      })
      var length = LocalFavList.length;
      $("input").placeholder = "已收藏 " + length + " 部影片";
    }

  } else if (mode == "cancel") {
    $ui.pop();
    var idx = LocalFavList.indexOf(data.shortCode)
    LocalFavList.splice(idx, 1)
    LocalData.favorite.splice(idx, 1)

  } else if (mode == "archive") {
    $ui.pop();
    var idx = LocalFavList.indexOf(data.shortCode)
    LocalFavList.splice(idx, 1)
    LocalData.favorite.splice(idx, 1)
    if ($("menu").index == 1) {
      //$ui.action($("initialView").data)
      $("initialView").delete(idx)
      var length = LocalFavList.length;
      $("input").placeholder = "已收藏 " + length + " 部影片"
    } else if ($("menu").index == 2) {
      $("initialView").data = [{
        link: homeMoviePage + shortCode,
        code: data.code,
        initialCover: {
          src: data.src
        },
        info: {
          text: data.info
        }
      }].concat($("initialView").data)
      var length = LocalArcList.length;
      $("input").placeholder = "已归档 " + length + " 部影片"
    }
    LocalData.archive.unshift(data)
    LocalArcList.unshift(data.shortCode)

  } else if (mode == "del") {
    $ui.pop();
    var idx = LocalArcList.indexOf(data.shortCode)
    LocalArcList.splice(idx, 1)
    LocalData.archive.splice(idx, 1)
    if ($("menu").index == 2) {
      $("initialView").delete(idx)
      var length = LocalArcList.length;
      $("input").placeholder = "已归档 " + length + " 部影片"
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

function checkAdult() {
  $ui.window.add({
    type: "view",
    props: {
      id: "checkAdult",
      bgcolor: $color("black")
    },
    views: [{
      type: "text",
      props: {
        text: "FBI WARNING",
        textColor: $color("white"),
        font: $font("Helvetica-Bold", 25),
        bgcolor: $color("red"),
        insets: $insets(5, 0, 0, 0),
        align: $align.center,
        editable: false
      },
      layout: function(make, view) {
        make.top.inset(55)
        make.left.right.inset(90)
        make.height.equalTo(40)
      }
    }, {
      type: "text",
      props: {
        text: "Federal law provides severe civil and criminal penalties for the unauthorized reproduction, distribution, or exhibition of copyrighted motion pictures (Title 17, United States Code,Sections 501 and 508). The Federal Bureau of Investigation investigates allegations of criminal copyright infringement (Title 17, United States Code, Section 506).",
        textColor: $color("white"),
        font: $font("bold", 14),
        bgcolor: $color("clear"),
        insets: $insets(0, 0, 0, 0),
        align: $align.justified,
        editable: false
      },
      layout: function(make, view) {
        make.top.inset(120)
        make.left.right.inset(10)
        make.height.equalTo(160)
      }
    }, {
      type: "text",
      props: {
        text: "警告 ⚠️",
        textColor: $color("white"),
        font: $font("Helvetica-Bold", 25),
        bgcolor: $color("red"),
        insets: $insets(5, 0, 0, 0),
        align: $align.center,
        editable: false
      },
      layout: function(make, view) {
        make.top.inset(280)
        make.left.right.inset(130)
        make.height.equalTo(40)
      }
    }, {
      type: "text",
      props: {
        text: "本脚本运行内容包含成人视频、图片，可能会引起你的不适，请谨慎运行。\n未满十八岁，禁止运行。\n\n脚本运行需代理，请将 Https://tellme.pw 加入代理。",
        textColor: $color("white"),
        font: $font("bold", 14),
        bgcolor: $color("clear"),
        insets: $insets(0, 0, 0, 0),
        align: $align.center,
        editable: false
      },
      layout: function(make, view) {
        make.top.inset(350)
        make.left.right.inset(10)
        make.height.equalTo(160)
      }
    },{
      type: "button",
      props: {
        title: "已满十八岁",
        titleColor: $color("black"),
        bgcolor: $color("white")
      },
      layout: function(make, view) {
        make.left.right.inset(120)
        make.bottom.inset(100)
        make.height.equalTo(30)
      },
      events: {
        tapped: function(sender) {
          $cache.set("adultCheck", {
            "adult": "true",
          })

          sender.super.remove()
          main()
        }
      }
    }, {
      type: "button",
      props: {
        title: "未满十八岁",
        titleColor: $color("white"),
        bgcolor: $color("red")
      },
      layout: function(make, view) {
        make.left.right.inset(120)
        make.bottom.inset(40)
        make.height.equalTo(30)
      },
      events: {
        tapped: function(sender) {
          $app.close()
        }
      }
    }],
    layout: $layout.fill
  })
}

//检测扩展更新
function scriptVersionUpdate() {
  $http.get({
    url: "https://raw.githubusercontent.com/nicktimebreak/xteko/master/HList/updateInfo",
    handler: function(resp) {
      var afterVersion = resp.data.version;
      var msg = resp.data.msg;
      if (afterVersion > version) {
        $ui.alert({
          title: "检测到新的版本！V" + afterVersion,
          message: "是否更新?\n更新完成后请退出至扩展列表重新启动新版本。\n" + msg,
          actions: [{
            title: "更新",
            handler: function() {
              var url = "jsbox://install?url=https://raw.githubusercontent.com/nicktimebreak/xteko/master/HList/HList.js&name=HList" + afterVersion + "&icon=icon_135.png";
              $app.openURL(encodeURI(url));
              $app.close()
            }
          }, {
            title: "取消"
          }]
        })
      }
    }
  })
}

//初始化设定
function initial() {
  var current = $addin.current;
current.author = "Nicked";
current.website = "https://t.me/nicked";
current.version = version;

  if ($file.read(LocalDataPath)) {
    LocalData = JSON.parse($file.read(LocalDataPath).string);
    LocalFavList = LocalData.favorite.map(i => i.shortCode);
    LocalArcList = LocalData.archive.map(i => i.shortCode);
    LocalActressList = LocalData.actress.map(i => i.shortCode);
  } else {
    LocalData = { "favorite": [], "actress": [], "archive": [] };
    LocalFavList = [];
    LocalArcList = [];
    LocalActressList = [];
  };

}

//剪贴板检测
function clipboardDetect() {
  var str = $clipboard.text
  var reg1 = /[sS][nN][iI][sS][\s\-]?\d{3}|[aA][bB][pP][\s\-]?\d{3}|[iI][pP][zZ][\s\-]?\d{3}|[sS][wW][\s\-]?\d{3}|[jJ][uU][xX][\s\-]?\d{3}|[mM][iI][aA][dD][\s\-]?\d{3}|[mM][iI][dD][eE][\s\-]?\d{3}|[mM][iI][dD][dD][\s\-]?\d{3}|[pP][gG][dD][\s\-]?\d{3}|[sS][tT][aA][rR][\s\-]?\d{3}|[eE][bB][oO][dD][\s\-]?\d{3}|[iI][pP][tT][dD][\s\-]?\d{3}/g;
  var reg2 = /[a-zA-Z]{3,5}[\s\-]?\d{3,4}/g;
  var match = str.match(reg1);
  if (match) {
    mode = "search";
    keyword = match[0];
    $("input").text = keyword
  } else {
    var match = str.match(reg2);
    if (match) {
      mode = "search";
      keyword = match[0];
      $("input").text = keyword
    } else {
      mode = "home"
      keyword = ""
    }

  }
  return {
    "mode": mode,
    "keyword": keyword
  }
}

function jsDetect() {
  var js = $file.extensions
  for (var i = 0; i < js.length; i++) {
    var match = /Avgle[\s\S]*?/g.exec(js[i])
    if (match) {
      return {
        "js":js[i],
        "num":i
      }
    }
  }
  return false
}

function main() {
  initial()
  scriptVersionUpdate()
  timeout = 5
  var url = "https://tellme.pw/avmoo";
  $http.request({
    timeout: timeout,
    url: url,
    handler: function(resp) {
      var match = /<strong><a href="(.*?)"/g.exec(resp.data)
      if (match) {
        //$ui.toast("载入成功", 1)
        page = 0
        //$ui.action(match)
        homepage = match[1] + "/cn/";
        $console.log(homepage)
        homeMoviePage = homepage + "movie/";
        homeSearchPage = homepage + "search/"
        homeStarPage = homepage + "star/";
        if ($clipboard.text) {
          var detect = clipboardDetect()
        } else {
          var detect = {
            "mode": "home",
            "keyword": ""
          }
        }

        getInitial(detect.mode, detect.keyword)

        $ui.toast("载入成功", 1)
        $("loading").text=""
        // $("input").placeholder = "输入番号或演员进行搜索"
      } else {
        $ui.action({
          title: "无法找到主页",
          message: "请联系脚本作者或稍后再试",
          action: [{
            title: "确认",
            handler: function() {
              $safari.open("https://t.me/nicked")
              $app.close()
            }
          }, {
            title: "取消",
            handler: function() {
              $app.close()
            }
          }]
        })
      }

    }
  })

}

LocalDataPath = "drive://HList.json";
var check = $cache.get("adultCheck")
if (!check) {
  checkAdult()
} else {
  main()
}