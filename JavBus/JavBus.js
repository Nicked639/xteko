/*

简介：

你口袋中的 AV 辞典

加强版的 HList

特色：


1. 支持无码片源检索

2. 支持演员类目浏览

3. 支持分类选择浏览

4. 支持 Avgle 联动

5. 支持收藏与归档影片

6. 支持图像与视频预览

7. 支持磁链搜索优化显示

8. 支持剪贴板与分享扩展检测


By Nicked

https://t.me/nicked

*/

version = 5.6
ALL = false; // 全部与收录
ALLC = false; // 详细类目下的
Again = 0; // 用于二次搜索
Oumei = 0; // 欧美状态
catUrl = "https://www.javbus.com/genre";
Titles = ["主題", "角色", "服裝", "體型", "行為", "玩法", "類別"];
Utitles = ["主題", "角色", "服裝", "體型", "行為", "玩法", "其他", "場景"];
Category = [];
Menustatus = 0; // 分类选中状态
Trans = 0; // 翻译状态
uncensored = false; // 无码状态 
JavMag = 0 // 磁链获取状态 
timeout = 5;
flag = 0; // 用于判断从通知中心启动的状态
var colorData = [
  [$color("#fd354a"), $color("#da0a6f")],
  [$color("#f97227"), $color("#f52156")],
  [$color("#edb319"), $color("#e47b18")],
  [$color("#eecb01"), $color("#e8a400")],
  [$color("#7ace1e"), $color("#5aba23")],
  [$color("#25c578"), $color("#3ab523")],
  [$color("#24d59a"), $color("#24bb9d")],
  [$color("#00c0c8"), $color("#00a0ca")],
  [$color("#12b7de"), $color("#2193e6")],
  [$color("#2f74e0"), $color("#5d44e0")],
  [$color("#825af6"), $color("#6251f5")],
  [$color("#cc3ec8"), $color("#9f0cdd")],
  [$color("#f66295"), $color("#cf30a0")],
  [$color("#728199"), $color("#54617e")],
  [$color("#1f436a"), $color("#003268")]
]
const nickIcon = "data:image/jpeg;base64,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QTFGRjdDMUM0XzE1MTQ3MTcxNDg3MzAiLCJlbnRyeV9wb2ludCI6ImNyZWF0ZV9mbG93X2Z0ZSIsInBob3Rvc19hZGRlZCI6MCwidG90YWxfZWZmZWN0c190aW1lIjowLCJ0b29sc191c2VkIjp7InRpbHRfc2hpZnQiOjAsInJlc2l6ZSI6MiwiYWRqdXN0IjowLCJjdXJ2ZXMiOjAsIm1vdGlvbiI6MCwicGVyc3BlY3RpdmUiOjAsImNsb25lIjowLCJjcm9wIjowLCJlbmhhbmNlIjowLCJzZWxlY3Rpb24iOjAsImZyZWVfY3JvcCI6MCwiZmxpcF9yb3RhdGUiOjAsInNoYXBlX2Nyb3AiOjAsInN0cmV0Y2giOjB9LCJ3aWR0aCI6MTAwLCJzb3VyY2UiOiJzaGFyZV9hY3Rpb25fc2hlZXQiLCJvcmlnaW4iOiJnYWxsZXJ5IiwiaGVpZ2h0IjoxMDAsInN1YnNvdXJjZSI6ImRvbmVfYnV0dG9uIiwidG90YWxfZWRpdG9yX3RpbWUiOjYxLCJicnVzaGVzX3VzZWQiOjB9AAAAAGcAAAAZAAAAZwAAABkAAAALAAAABQAAAAsAAAAFQXBwbGUAaVBob25lIDVzIGJhY2sgY2FtZXJhIDQuMTJtbSBmLzIuMgAA/+ENymh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNC0wMS0xM1QxNzo1MjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTQtMDEtMTNUMTc6NTI6MDAiIHhtcDpDcmVhdG9yVG9vbD0iUGljc0FydCIgcGhvdG9zaG9wOkRhdGVDcmVhdGVkPSIyMDE0LTAxLTEzVDE3OjUyOjAwIj4gPGRjOmRlc2NyaXB0aW9uPiA8cmRmOkFsdD4gPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij57InRvdGFsX2VmZmVjdHNfYWN0aW9ucyI6MCwidG90YWxfZHJhd190aW1lIjowLCJsYXllcnNfdXNlZCI6MCwiZWZmZWN0c190cmllZCI6MCwidG90YWxfZHJhd19hY3Rpb25zIjowLCJ0b3RhbF9lZGl0b3JfYWN0aW9ucyI6eyJib3JkZXIiOjAsImZyYW1lIjowLCJtYXNrIjowLCJsZW5zZmxhcmUiOjAsImNsaXBhcnQiOjAsInRleHQiOjAsInNxdWFyZV9maXQiOjAsInNoYXBlX21hc2siOjAsImNhbGxvdXQiOjB9LCJlZmZlY3RzX2FwcGxpZWQiOjAsInVpZCI6IjM2REEyRDBCLTM1NTUtNDY3QS1BNjUwLTRCOUExRkY3QzFDNF8xNTE0NzE3MTQ4NzMwIiwiZW50cnlfcG9pbnQiOiJjcmVhdGVfZmxvd19mdGUiLCJwaG90b3NfYWRkZWQiOjAsInRvdGFsX2VmZmVjdHNfdGltZSI6MCwidG9vbHNfdXNlZCI6eyJ0aWx0X3NoaWZ0IjowLCJyZXNpemUiOjIsImFkanVzdCI6MCwiY3VydmVzIjowLCJtb3Rpb24iOjAsInBlcnNwZWN0aXZlIjowLCJjbG9uZSI6MCwiY3JvcCI6MCwiZW5oYW5jZSI6MCwic2VsZWN0aW9uIjowLCJmcmVlX2Nyb3AiOjAsImZsaXBfcm90YXRlIjowLCJzaGFwZV9jcm9wIjowLCJzdHJldGNoIjowfSwid2lkdGgiOjEwMCwic291cmNlIjoic2hhcmVfYWN0aW9uX3NoZWV0Iiwib3JpZ2luIjoiZ2FsbGVyeSIsImhlaWdodCI6MTAwLCJzdWJzb3VyY2UiOiJkb25lX2J1dHRvbiIsInRvdGFsX2VkaXRvcl90aW1lIjo2MSwiYnJ1c2hlc191c2VkIjowfTwvcmRmOmxpPiA8L3JkZjpBbHQ+IDwvZGM6ZGVzY3JpcHRpb24+IDxkYzpjcmVhdG9yPiA8cmRmOlNlcT4gPHJkZjpsaT5uaWNrdGltZWJyZWFrPC9yZGY6bGk+IDwvcmRmOlNlcT4gPC9kYzpjcmVhdG9yPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+AP/tADhQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAADhCSU0EJQAAAAAAENQdjNmPALIE6YAJmOz4Qn7/wAARCABkAGQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmq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"

//$cache.clear()

mainTemplate = {
  props: {
    bgcolor: $color("white"),
  },
  views: [{
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
      radius: 5
    },
    layout: function(make) {
      make.left.right.inset(0)
      make.bottom.inset(0)
      make.height.equalTo(20)
    },
  }, {
    type: "label",
    props: {
      text: "高清",
      id: "HD",
      bgcolor: $rgb(114, 148, 177),
      textColor: $color("white"),
      align: $align.center,
      font: $font("bold", 12),
      radius: 4,
      hidden: true,
      alpha: 0.8
    },
    layout: function(make, view) {
      make.top.left.inset(0)
      make.height.equalTo(18)
      make.width.equalTo(34)
    }
  }, {
    type: "label",
    props: {
      text: "字幕",
      id: "SUB",
      bgcolor: $rgb(242, 184, 103),
      textColor: $color("white"),
      align: $align.center,
      font: $font("bold", 12),
      radius: 4,
      hidden: true,
      alpha: 0.8
    },
    layout: function(make, view) {
      make.top.right.inset(0)
      make.height.equalTo(18)
      make.width.equalTo(34)
    }
  }, {
    type: "gradient",
    props: {
      id: "gradient",
      colors: colorData[randomColor(0, 11)],
      locations: [0.0, 1.0],
      startPoint: $point(0, 0),
      endPoint: $point(1, 1),
      radius: 8,
      hidden: true
    },
    layout: $layout.fill
  }, {
    type: "label",
    props: {
      id: "name",
      bgcolor: $color("clear"),
      textColor: $color("white"),
      align: $align.center,
      font: $font(15),
      autoFontSize: true,
      hidden: true
    },
    layout: $layout.fill
  }]
}

function searchView(height, catname, cols = 3, spa = 1) {
  return {
    type: "view",
    props: {
      title: catname,
      id: "searchView",
      bgcolor: $color("white")
    },
    views: [{
      type: "text",
      props: {
        id: "bgInfo",
        text: "Originated in Power Flow\n\n\n\nhttps://t.me/nicked",
        editable: false,
        textColor: $color("#CCCCCC"),
        font: $font(10),
        align: $align.center,
        hidden: false
      },

      layout: function(make, view) {
        make.top.inset(35)
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
        hidden: false
      },
      layout: function(make, view) {
        make.size.equalTo($size(50, 50))
        make.top.inset(120)
        make.left.inset(162)
      }

    }, {
      type: "text",
      props: {
        id: "loading",
        text: "Loading...",
        bgcolor: $color("clear"),
        textColor: $color("#888888"),
        font: $font("HelveticaNeue-BoldItalic", 20),
        align: $align.center,
        editable: false
      },

      layout: function(make, view) {
        make.top.inset(200)
        make.height.equalTo(100)
        make.width.equalTo($device.info.screen.width)
      }
    }, {
      type: "input",
      props: {
        id: "input",
        placeholder: "载入中, 请稍候...",
        font: $font(13),
        //      clearsOnBeginEditing: true,
        bgcolor: $color("#f3f3f3"),
        radius: 8,
        stickyHeader: false
      },
      events: {
        didBeginEditing: function(sender) {
          $("input").runtimeValue().invoke("selectAll")

        },
        returned: function(sender) {
          Again = 0
          let index = $("tabC").index
          if (index == 2) {
            homepage = "https://www.javbus.org/";
            Oumei = 1;
          } else if (index == 0) homepage = "https://www.javbus.com/";
          else hompage = "https://www.javbus.com/uncensored/"
          homeSearchPage = homepage + "search/"
          if ($("searchView").super == $("JavBus")) {
            $("searchView").remove()
          }
          $("JavBus").add(searchView(180))
          $("tabC").index = index
          $("input").text = sender.text
          sender.blur()
          $("initialView").data = [];
          $ui.loading(true)
          $("loading").text = "Loading..."
          keyword = sender.text
          if (sender.text) {
            mode = "search";
            keyword = sender.text.replace(/\s+/g, "");
            $("input").text = keyword
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
        itemHeight: height,
        columns: cols,
        spacing: spa,
        square: false,
        bgcolor: $color("clear"),
        template: mainTemplate,
      },
      layout: function(make, view) {
        make.left.right.bottom.inset(5)
        make.top.equalTo($("input").bottom).offset(5)
      },
      events: {
        pulled(sender) {
          $("initialView").endRefreshing()
          $ui.menu({
            items: ["微信打赏"],
            handler: function(title, idx) {
              if (idx == 0) {
                wechatPay()
              }
            }
          })
        },
        didReachBottom(sender) {
          sender.endFetchingMore();
          if ($("menu").index == 0 || $("menu").index == 2 || ("menu").index == 3) {
            $ui.loading(true)
            getInitial(mode, keyword);
          } else if ($("menu").index == 1) {
            $ui.loading(true)
            if ($("tabC").index == 0) url = "https://www.javbus.com/actresses/";
            else url = "https://www.javbus.com/uncensored/actresses/"
            getInitialActress(url)
          }

        },
        didSelect(sender, indexPath, data) {
          //$ui.action(data.code)

          favSrc = data.initialCover.src
          favInfo = data.info.text
          favLink = data.link
          shortCode = favLink.split('/').pop()
          favCode = shortCode
          favData = {
              "code": favCode,
              "src": favSrc,
              "info": favInfo,
              "shortCode": shortCode
            }
           if (isInToday()) $cache.set("cacheData",favData);
          // 演员tab
          if ($("tab").hidden == false && $("tab").index == 1 || $("menu").index == 1) {
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
          } else if ($("tab").hidden == false && $("tab").index > 1) {
            // 导演,制作商,发行商tab
            let sender = {
              "text": data.name.text,
              "info": data.link
            }
            if ($("tab").index == 2) pushCat(sender, "director");
            else if ($("tab").index == 3) pushCat(sender, "series");
            else if ($("tab").index == 4) pushCat(sender, "filmMaker");
            else if ($("tab").index == 5) pushCat(sender, "filmEstab");
          } else {
            $ui.push(detailView(favCode))
            getDetail(data.link)
            if ($("menu").index == 0 || $("menu").index == 1 || $("menu").index == 2) {
              if (LocalFavList.indexOf(shortCode) > -1) {
                $("favorite").title = "取消收藏"
                $("favorite").bgcolor = $color("#f25959")
              } else if (LocalArcList.indexOf(shortCode) > -1) {
                $("favorite").title = "已归档"
                $("favorite").bgcolor = $color("#aaaaaa")
              }
            } else if ($("menu").index == 3) {
              if (LocalFavList.indexOf(shortCode) > -1) {
                $("favorite").title = "归档"
                $("favorite").bgcolor = $color("#22bdcc")

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
        id: "tabAll",
        items: ["全部", "收录"],
        tintColor: $color("tint"),
        radius: 5,
        bgcolor: $color("white"),
        hidden: false,
        alpha: 0.8,
        index: ALL ? 0 : 1
      },
      layout: function(make) {
        make.centerX.equalTo()
        make.bottom.inset(20)
        make.height.equalTo(22)
      },
      events: {
        changed(sender) {
          $("input").placeholder = "载入中, 请稍候..."
          if (sender.index == 0) ALL = true;
          else ALL = false;
          page = 0;
          $("initialView").data = [];
          $("loading").text = "Loading...";
          //$ui.action(keyword)
          if (mode == "cat") mode = "home";
          getInitial(mode, keyword);
        }
      }
    }, {
      type: "tab",
      props: {
        id: "tab",
        items: ["影片", "演员", "导演", "系列", "制作商", "发行商"],
        tintColor: $color("tint"),
        radius: 5,
        bgcolor: $color("white"),
        alpha: 0.7,
        hidden: true
      },
      layout: function(make) {
        //      make.left.right.inset(120)
        make.centerX.equalTo()
        make.bottom.inset(20)
        make.height.equalTo(22)
        //make.width.equalTo(40)
      },
      events: {
        changed(sender) {
          if ($("searchView").super == $("JavBus")) {
            $("searchView").remove()
          }
          if (sender.index == 0) {
            // 影片
            $("JavBus").add(searchView(180))
            $("tab").hidden = false;
            $("tabC").hidden = true;
            $("tabAll").hidden = true;
            $("loading").text = ""
            $("tab").index = 0;
            $("initialView").data = [];
            var length = LocalFavList.length;
            $("input").text = ""
            $("input").placeholder = "已收藏 " + length + " 部影片"
            if (length == 0) {
              $("initialView").hidden = true
            } else {
              $("initialView").hidden = false
            }
            LocalData.favorite.map(function(i) {
              $("initialView").data = $("initialView").data.concat({
                code: i.code,
                link: homepage + i.shortCode,
                initialCover: {
                  src: i.src
                },
                info: {
                  text: i.info
                }
              })
            })

          } else if (sender.index == 1) {
            // 演员
            $("JavBus").add(searchView(120))
            $("tab").hidden = false;
            $("tabC").hidden = true;
            $("tabAll").hidden = true;
            $("loading").text = ""
            $("tab").index = 1;
            $("initialView").data = [];
            var length = LocalActressList.length;
            $("input").text = ""
            $("input").placeholder = "已收藏 " + length + " 位演员"
            if (length == 0) {
              $("initialView").hidden = true
            } else {
              $("initialView").hidden = false
            }
            LocalData.actress.map(function(i) {
              $("initialView").data = $("initialView").data.concat({
                link: "https://www.javbus.com/" + i.un + "star/" + i.shortCode,
                initialCover: {
                  src: i.src
                },
                info: {
                  text: i.info
                }
              })
            })
          } else if (sender.index >= 2) {
            $("JavBus").add(searchView(60, "", 2, 5))
            $("tab").hidden = false;
            $("tabC").hidden = true;
            $("tabAll").hidden = true;
            $("loading").text = ""
            $("initialView").data = [];
            $("input").text = ""
            let hp = "https://www.javbus.com/"
            if (sender.index == 2) {
              // 导演tab
              $("tab").index = 2;
              var length = LocalDirectorList.length;
              $("input").placeholder = "已收藏 " + length + " 位导演"
              if (length == 0) {
                $("initialView").hidden = true
              } else {
                $("initialView").hidden = false
              }
              LocalData.director.map(function(i) {
                $("initialView").data = $("initialView").data.concat({
                  link: hp + "director/" + i.shortCode,
                  name: {
                    text: i.name,
                    hidden: false
                  },
                  gradient: {
                    hidden: false,
                    colors: colorData[randomColor(0, 11)]
                  },
                  info: {
                    hidden: true
                  },
                  initialCover: {
                    hidden: true
                  }
                })
              })
            } else if (sender.index == 3) {
              // 系列tab
              $("tab").index = 3;
              var length = LocalDirectorList.length;
              $("input").placeholder = "已收藏 " + length + " 个系列"
              if (length == 0) {
                $("initialView").hidden = true
              } else {
                $("initialView").hidden = false
              }
              LocalData.series.map(function(i) {
                $("initialView").data = $("initialView").data.concat({
                  link: hp + "series/" + i.shortCode,
                  name: {
                    text: i.name,
                    hidden: false
                  },
                  gradient: {
                    hidden: false,
                    colors: colorData[randomColor(0, 11)]
                  },
                  info: {
                    hidden: true
                  },
                  initialCover: {
                    hidden: true
                  }
                })
              })
            } else if (sender.index == 4) {
              // 制作商tab
              $("tab").index = 4;
              var length = LocalFilmMakerList.length;
              $("input").placeholder = "已收藏 " + length + " 个制作商"
              if (length == 0) {
                $("initialView").hidden = true
              } else {
                $("initialView").hidden = false
              }
              LocalData.filmMaker.map(function(i) {
                $("initialView").data = $("initialView").data.concat({
                  link: hp + "studio/" + i.shortCode,
                  name: {
                    text: i.name,
                    hidden: false
                  },
                  gradient: {
                    hidden: false,
                    colors: colorData[randomColor(0, 11)]
                  },
                  info: {
                    hidden: true
                  },
                  initialCover: {
                    hidden: true
                  }
                })
              })
            } else if (sender.index == 5) {
              // 发行商tab
              $("tab").index = 5;
              var length = LocalFilmEstabList.length;
              $("input").placeholder = "已收藏 " + length + " 个发行商"
              if (length == 0) {
                $("initialView").hidden = true
              } else {
                $("initialView").hidden = false
              }
              LocalData.filmEstab.map(function(i) {
                $("initialView").data = $("initialView").data.concat({
                  link: hp + "label/" + i.shortCode,
                  name: {
                    text: i.name,
                    hidden: false
                  },
                  gradient: {
                    hidden: false,
                    colors: colorData[randomColor(0, 11)]
                  },
                  info: {
                    hidden: true
                  },
                  initialCover: {
                    hidden: true
                  }
                })
              })
            }
            if ($("initialView").data.length > 0) {
              $("bgInfo").hidden = true;
              $("bgImage").hidden = true;
            } else {
              $("bgInfo").hidden = false;
              $("bgImage").hidden = false;
            }
          }
        }
      }

    }, {
      type: "tab",
      props: {
        id: "tabC",
        hidden: false,
        items: ["有码", "无码", "欧美"],
        tintColor: $color("tint"),
        radius: 5,
        bgcolor: $color("white"),
        alpha: 0.8
      },
      layout: function(make) {
        make.right.inset(10)
        make.top.inset(8.5)
        make.height.equalTo(22)
        make.width.equalTo(100)
      },
      events: {
        changed(sender) {
          Again = 0
          $("input").placeholder = "载入中, 请稍候..."
          $("initialView").data = [];
          $("initialView").contentOffset = $point(0, 0);
          $("loading").text = "Loading..."
          mode = "home";
          keyword = "";
          $("input").text = ""
          page = 0;
          if (sender.index == 2) {
            // 欧美
            Oumei = 1
            $("input").text = ""
            uncensored = false
            homepage = "https://www.javbus.org/";
            homeSearchPage = homepage + "search/";
            if ($("menu").index == 1) {
              if ($("searchView").super == $("JavBus")) {
                $("searchView").remove();
              }
              $("JavBus").add(searchView(180));

            }
            $("menu").index = 0;
            $("tabC").index = 2;
            //            $("input").text = keyword
            //            mode = "home"
            getInitial()
            return
          }

          if ($("menu").index == 0) {

            url = "https://www.javbus.com/";
            if (sender.index == 1) {
              url = url + "uncensored/"
              uncensored = true
            } else uncensored = false;
            homepage = url
            homeSearchPage = homepage + "search/";

            getInitial(mode, keyword)
          } else if ($("menu").index == 1) {
            page = 0;
            $("input").text = ""
            if (sender.index == 0) {
              url = "https://www.javbus.com/actresses/";
              uncensored = false
              getInitialActress(url)
            } else if (sender.index == 1) {
              url = "https://www.javbus.com/uncensored/actresses/";
              uncensored = true
              getInitialActress(url)
            }
          }

        }
      }

    }],
    layout: function(make, view) {
      make.left.right.bottom.inset(0)
      make.top.equalTo($("menu").bottom)
    }

  }
}

function detailView(code) {
  return {
    type: "view",
    props: {
      title: code,
      id: "detailView",
      //scrollEnabled: true,
      //contentSize: $size(0, 1000)
    },
    views: [{
        type: "text",
        props: {
          id: "filmName",
          editable: false,
          textColor: $color("black"),
          font: $font(15),
          align: $align.left,
//          autoFontSize: true,
          scrollEnabled: false,
          hidden: false,
          lines: 1,
          insets: $insets(0, 0, 0, 0)
        },

        layout: function(make, view) {
          make.top.inset(10)
          make.left.right.inset(5)
          if(isInToday()) make.height.equalTo(20)
        },
        events: {
          tapped(sender) {
            if (sender.text !== "翻译中...") {
              if (Trans == 0) {
                Trans = 1;
                orig_text = sender.text
                translate(sender.text);
              } else {
                Trans = 0;
                $("filmName").text = orig_text
              }
            }
          }
        }
      }, {
        type: "image",
        props: {
          id: "filmCover",
          radius: 7,
          //scale: 2,
          //src: "https://i.loli.net/2017/11/14/5a0a553e1c420.jpg"
        },
        layout: function(make, view) {
          var width = $device.info.screen.width - 20;
          var height = width * 67 / 100
          make.left.right.inset(10)
          make.top.equalTo($("filmName").bottom).offset(5)
          make.size.equalTo($size(width, height))
        },
        events: {
          tapped(sender) {
            $quicklook.open({
              image: $("filmCover").image
            })
          }
        }
      }, {
        type: "text",
        props: {
          text: "上映时间:",
          hidden: true,
          bgcolor: $color("white"),
          id: "aboutFilm",
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
          font: $font(15),
          align: $align.left,
          scrollEnabled: false,
          insets: $insets(0, 0, 0, 0)
        },

        layout: function(make, view) {
          make.top.equalTo($("filmCover").bottom).offset(6)
          make.left.inset(83)
          //make.width.equalTo($device.info.screen.width)
        }
      }, {
        type: "text",
        props: {
          text: "发行商:",
          bgcolor: $color("white"),
          id: "filmEstab",
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
          make.top.equalTo($("aboutFilm").bottom).offset(5)
          //make.height.equalTo(20)
        },

      }, {
        type: "text",
        props: {
          hidden: false,
          bgcolor: $color("white"),
          id: "filmEstabName",
          //text:"一感动粉色",
          font: $font(15),
          editable: false,
          textColor: $color("black"),
          align: $align.left,
          //autoFontSize: true,
          scrollEnabled: false,
          insets: $insets(0, 0, 0, 0)
        },
        layout: function(make, view) {
          make.left.inset(86)
          make.top.equalTo($("aboutFilm").bottom).offset(6)
          //make.height.equalTo(20)
        },
        events: {
          tapped(sender) {
            if (sender.text !== "未知") {
              pushCat(sender, "filmEstab")
            }
          }
        }

      }, {
        type: "text",
        props: {
          text: "制作商:",
          bgcolor: $color("white"),
          id: "filmMaker",
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
          make.top.equalTo($("filmEstab").bottom).offset(5)
          //make.height.equalTo(20)
        },

      }, {
        type: "text",
        props: {
          hidden: false,
          bgcolor: $color("white"),
          id: "filmMakerName",
          //text:"这是一感动粉色",
          font: $font(15),
          editable: false,
          textColor: $color("black"),
          align: $align.left,
          //autoFontSize: true,
          scrollEnabled: false,
          insets: $insets(0, 0, 0, 0)
        },
        layout: function(make, view) {
          make.left.inset(86)
          make.top.equalTo($("filmEstab").bottom).offset(6)
          //make.height.equalTo(20)
        },
        events: {
          tapped(sender) {
            if (sender.text !== "未知") {
              pushCat(sender, "filmMaker")
            }
          }
        }

      }, {
        type: "text",
        props: {
          text: "系列:",
          bgcolor: $color("white"),
          id: "series",
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
          make.top.equalTo($("filmMaker").bottom).offset(5)
          //make.height.equalTo(20)
        },
      }, {
        type: "text",
        props: {
          hidden: false,
          bgcolor: $color("white"),
          id: "seriesName",
          //text:"这是一粉色",
          font: $font(15),
          editable: false,
          textColor: $color("black"),
          align: $align.left,
          //autoFontSize: true,
          scrollEnabled: false,
          insets: $insets(0, 0, 0, 0)
        },
        layout: function(make, view) {
          make.left.inset(86)
          make.top.equalTo($("filmMaker").bottom).offset(6)
          //make.height.equalTo(20)
        },
        events: {
          tapped(sender) {
            if (sender.text !== "未知") {
              pushCat(sender, "series")
            }
          }
        }

      }, {
        type: "text",
        props: {
          text: "导演:",
          bgcolor: $color("white"),
          id: "director",
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
          make.top.equalTo($("series").bottom).offset(5)
          //make.height.equalTo(20)
        },
      }, {
        type: "text",
        props: {
          hidden: false,
          bgcolor: $color("white"),
          id: "directorName",
          //text:"这是一粉色",
          font: $font(15),
          editable: false,
          textColor: $color("black"),
          align: $align.left,
          //autoFontSize: true,
          scrollEnabled: false,
          insets: $insets(0, 0, 0, 0)
        },
        layout: function(make, view) {
          make.left.inset(86)
          make.top.equalTo($("series").bottom).offset(6)
          //make.height.equalTo(20)
        },
        events: {
          tapped(sender) {
            if (sender.text !== "未知") {
              pushCat(sender, "director")
            }
          }
        }

      }, {
        type: "text",
        props: {
          text: "参演:",
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
          make.top.equalTo($("director").bottom).offset(5)
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
          id: "magnet",
          bgcolor: $color("#ededed"),
          radius: 0,
          title: "获取",
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
              items: ["磁链", "Avgle", "nyaa", "JavLibrary"],
              handler: function(title, idx) {
                if (idx == 0) {
                  if(JavMag == 0){
                    $ui.toast("磁链加载中...",2)
                    $delay(2,function(){
                                        $ui.push(magnetList(favCode))
                  getMagnet(favCode)
                  $("javbusList").data = javMagData
                  if (javMagData.length == 0) {
                    $("loadingm").text = "☹️ JavBus 暂无磁链"
                    $("loadingm").hidden = false
                  } else $("loadingm").hidden = true;
                    })
                    return
                  }
                  $ui.push(magnetList(favCode))
                  getMagnet(favCode)
                  $("javbusList").data = javMagData
                  if (javMagData.length == 0) {
                    $("loadingm").text = "☹️ JavBus 暂无磁链"
                    $("loadingm").hidden = false
                  } else $("loadingm").hidden = true;
                } else if (idx == 1) {
                  var js = jsDetect()["js"]
                  var num = jsDetect()["num"]
                  if (js) {
                    var version = $addin.list[num].version
                    if (version > 3) {
                      $addin.run({
                        name: js,
                        query: {
                          "code": favCode
                        }
                      })
                    }
                  } else {
                    $ui.alert({
                      title: "请更新至最新版本 Avgle",
                      message: "是否安装?\n安装完成后请再次点击。",
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
                } else if (idx == 2) {
                  $app.openURL("https://sukebei.nyaa.si/?q=" + favCode + "&f=0&c=0_0")
                } else if (idx == 3) {
                  $app.openURL("http://www.javlibrary.com/cn/vl_searchbyid.php?keyword=" + favCode)
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
          title: "预览",
          font: $font("bold", 16),
          titleColor: $color("black"),
          alpha: 0.9,
          radius: 6
        },
        layout: function(make, view) {
          make.bottom.inset(20)
          make.left.equalTo($("magnet").right).offset(5)
          make.width.equalTo(view.super).dividedBy(3).offset(-10)
          make.height.equalTo(30)
        },
        events: {
          tapped(sender) {
            $app.tips("预览视频来自 Avgle，请将 Avgle.com 加入代理")
            $ui.menu({
              items: ["样品图像", "八秒视频"],
              handler: function(title, idx) {
                if (idx == 0) {
                  if (screenData == "no") {
                    $ui.error("☹️ 暂无图像", 1)
                    return
                  } else {
                    $ui.push(screenshotView)
                    $("screenshot").data = screenData
                  }
                } else if (idx == 1) {
                  $device.taptic(1)
                  getAvglePreview(sender.info)
                }
              }
            })

          }

        }

      }, {
        type: "button",
        props: {
          id: "favorite",
          bgcolor: $color("tint"),
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
            let data = {}
            if ($context.query.code && flag == 1)  data = $cache.get("cacheData");
            else  data = favData;  
            if ($("favorite").title == "收藏") {
              $("favorite").title = "取消收藏"
              $("favorite").bgcolor = $color("#f25959");
              favoriteButtonTapped("add", data)
            } else if ($("favorite").title == "取消收藏") {
              $("favorite").title = "收藏"
              $("favorite").bgcolor = $color("tint")
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
          make.right.inset(10)
          if (isInToday()) make.top.equalTo($("filmCover").bottom).offset(10);
          else make.top.equalTo($("filmCover").bottom).offset(5)

          make.width.equalTo(60)
          make.height.equalTo(20)
        },
        events: {
          tapped(sender) {
            //$clipboard.text = favCode
            let items = ["打开 Safari", "复制番号", "分享链接"];
            $ui.menu({
              items: items,
              handler: function(title, idx) {
                if (idx == 0) $app.openURL(favLink);
                else if (idx == 1) {
                  $clipboard.text = sender.info
                  $ui.toast("番号 " + sender.info + "已复制")
                } else if (idx == 2) $share.sheet(favLink);
                
              },

            })

          }
        }

      }, {
        type: "button",
        props: {
          id: "openJS",
          bgcolor: $color("#ededed"),
          title: "应用打开",
          hidden: true,
          font: $font(11),
          //icon: $icon("022", $color("#666666"), $size(15, 15))
          titleColor: $color("black"),
          //alpha: 1,
          radius: 6
        },
        layout: function(make, view) {
          make.left.inset(10)
          make.top.equalTo($("filmCover").bottom).offset(10)
          make.width.equalTo(60)
          make.height.equalTo(20)
        },
        events: {
          tapped(sender) {
            //$clipboard.text = favCode    
            $app.openURL(
              "jsbox://run?name=JavBus&code=" + $("share").info + "&link=" + favLink
            )

          }
        }

      }, {
        type: "text",
        props: {
          id: "loading1",
          text: "Loading...",
          bgcolor: $color("clear"),
          textColor: $color("#888888"),
          font: $font("HelveticaNeue-BoldItalic", 20),
          align: $align.center,
          editable: false
        },

        layout: function(make, view) {
          make.top.inset(130)
          make.height.equalTo(100)
          make.width.equalTo($device.info.screen.width)
        }
      },

    ],
    layout: $layout.fill

  }
}
const urls = [
  /*{
    name: "磁力猫",
    pattern: "http://www.cilimao.me/api/search?size=10&sortDirections=desc&page=0&word="
  }, */
  {
    name: "种子搜",
    pattern: "http://bt.xiandan.in/api/search?source=%E7%A7%8D%E5%AD%90%E6%90%9C&keyword="
  }, {
    name: "屌丝搜",
    pattern: "http://bt.xiandan.in/api/search?source=E5%B1%8C%E4%B8%9D%E6%90%9C&keyword="
  }, {
    name: "磁力吧",
    pattern: "http://bt.xiandan.in/api/search?source=%E7%A3%81%E5%8A%9B%E5%90%A7&keyword="
  }, {
    name: "cililiana",
    pattern: "http://bt.xiandan.in/api/search?source=cililiana&keyword="
  },
]

const mTemplate = {
  props: {
    bgcolor: $color("clear")
  },
  views: [{
    type: "label",
    props: {
      id: "mFileName",
      bgcolor: $color("clear"),
      textColor: $color("black"),
      align: $align.left,
      font: $font(16)
    },
    layout: function(make, view) {
      make.left.inset(10)
      make.right.inset(90)
      make.top.inset(10)
      //make.center.equalTo(view.super)

    }
  }, {
    type: "label",
    props: {
      id: "mFileSize",
      bgcolor: $color("clear"),
      textColor: $color("gray"),
      align: $align.center,
      font: $font(12),
      hidden: false
    },
    layout: function(make, view) {
      make.left.inset(10)
      make.bottom.inset(2)
    }
  }, {
    type: "label",
    props: {
      id: "mTime",
      bgcolor: $color("clear"),
      textColor: $color("gray"),
      align: $align.center,
      font: $font(12),
      hidden: false
    },
    layout: function(make, view) {
      make.right.inset(10)
      make.bottom.inset(2)
    }
  }, {
    type: "label",
    props: {
      text: "高清",
      id: "HD",
      bgcolor: $rgb(114, 148, 177, 1),
      textColor: $color("white"),
      align: $align.center,
      font: $font("bold", 12),
      radius: 4,
      hidden: true
    },
    layout: function(make, view) {
      make.right.inset(43)
      make.bottom.inset(20)
      make.height.equalTo(18)
      make.width.equalTo(34)
    }
  }, {
    type: "label",
    props: {
      text: "字幕",
      id: "SUB",
      bgcolor: $rgb(242, 184, 103, 1),
      textColor: $color("white"),
      align: $align.center,
      font: $font("bold", 12),
      radius: 4,
      hidden: true
    },
    layout: function(make, view) {
      make.right.inset(10)
      make.bottom.inset(20)
      make.height.equalTo(18)
      make.width.equalTo(34)
    }
  }, ]
}

function magnetList(code) {
  return {
    props: {
      title: code
    },
    views: [{
      type: "text",
      props: {
        id: "loadingm",
        text: "Loading...",
        bgcolor: $color("clear"),
        textColor: $color("#888888"),
        font: $font("HelveticaNeue-BoldItalic", 20),
        align: $align.center,
        editable: false,
        hidden: isInToday()
      },

      layout: function(make, view) {
        make.top.inset(180)
        make.height.equalTo(100)
        make.width.equalTo($device.info.screen.width)
      }
    }, {
      type: "view",
      props: {
        id: "alreadyList",
      },
      views: [{
        type: "list",
        props: {
          id: "javbusList",
          rowHeight: 50,
          template: mTemplate,
          actions: [{
            title: "分享",
            handler: function(sender, indexPath) {
              let magnet = sender.data[indexPath.row].info
              $share.sheet(magnet)
            }
          }],
          header: {
            props: {},
            views: [{
              type: "label",
              props: {
                text: "JavBus 站点资源",
                textColor: $color("black"),
                bgcolor: $color("white"),
                align: $align.center,
                font: $font("Georgia-BoldItalic", 18)
              },
              layout: function(make, view) {
                make.left.inset(0)
                make.width.equalTo(view.super.width)
                make.center.equalTo(view.super)

              }
            }, ],
          }
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            let magnet = sender.data[indexPath.row].info
            $clipboard.text = magnet
            $ui.toast("💡 磁链已复制");

          },
          pulled(sender) {
            if($("javbusList").data.length==0){
              $("javbusList").endRefreshing()
              return
            }
            $("javbusList").data = [];
            getJavMag(javbusLink,"pulled");
            
            //$("javbusList").data = javMagData        
            //$("javbusList").endRefreshing();
          }
        },
        layout: $layout.fill
      }],
      layout: function(make, view) {
        let height = $device.info.screen.height
        make.left.right.top.inset(0)
        make.height.equalTo(height / 2)
      }
    }, {
      type: "text",
      props: {
        id: "loadingm",
        text: "Loading...",
        bgcolor: $color("clear"),
        textColor: $color("#888888"),
        font: $font("HelveticaNeue-BoldItalic", 20),
        align: $align.center,
        editable: false,
      },

      layout: function(make, view) {
        make.top.inset(200)
        make.height.equalTo(100)
        make.width.equalTo($device.info.screen.width)
      }
    }, {
      type: "label",
      props: {
        id: "others",
        text: "其他站点资源",
        textColor: $color("black"),
        //bgcolor:$color("tint"),
        radius: 8,
        align: $align.center,
        font: $font("bold", 18)
      },
      layout: function(make, view) {
        //make.width.equalTo(view.super).dividedBy(2)
        make.top.equalTo($("alreadyList").bottom)
        make.height.equalTo(30)
        make.center.equalTo(view.super)
      }
    }, {
      type: "view",
      props: {
        id: "webList"
      },
      views: [{
        type: "menu",
        props: {
          items: urls.map(i => i.name),
          index: 0,
          id: "mMenu"
        },
        layout: function(make) {
          make.left.top.right.equalTo(0)
          make.height.equalTo(40)
        },
        events: {
          changed: function(sender) {
            $("mlist").data = []
            getMagnet(code);
          }
        }
      }, {
        type: "list",
        props: {
          id: "mlist",
          rowHeight: 50,
          template: mTemplate,
          stickyHeader: false,
          actions: [{
            title: "分享",
            handler: function(sender, indexPath) {
              let magnet = sender.data[indexPath.row].info
              $share.sheet(magnet)
            }
          }]
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            let magnet = sender.data[indexPath.row].info
            $clipboard.text = magnet
            $ui.toast("💡 磁链已复制");

          },
          pulled(sender) {
            //              $ui.action(favCode)
            $("mlist").data = []
            getMagnet(favCode)
          }
        },
        layout: function(make, view) {
          make.top.inset(40)
          make.left.bottom.right.inset(0)
        }
      }, ],
      layout: function(make, view) {
        //let height = $device.info.screen.height
        //make.height.equalTo(height/2)
        make.top.equalTo($("others").bottom)
        make.left.right.bottom.inset(0)
      }
    }],
    layout: $layout.fill
  }
}

let sh = $device.info.screen.width / 9 * 16 - 70

const screenshotView = {

  type: "view",
  props: {
    title: "样品图像"
  },
  views: [{
    type: "matrix",
    props: {
      id: "screenshot",
      itemHeight: 120,
      columns: 2,
      spacing: 1,
      square: false,
      bgcolor: $color("clear"),
      template: [{
        type: "image",
        props: {
          id: "screenshotCover",
          contentMode: $contentMode.scaleAspectFit,
          // src: nickIcon
        },
        layout: $layout.fill

      }, ],
    },
    layout: $layout.fill,
    events: {
      didSelect(sender, indexPath, data) {
        var v = $("screenshot").cell(indexPath).views[0].views[0]
        let imageUrls = []
        for (let i = 0; i < screenData.length; i++) {
          imageUrls.push(sender.data[i].link)
        }
        $quicklook.open({
          //          list:imageUrls
          image: v.image
        })
      }
    }

  },{
    type:"button",
    props: {
      bgcolor: $color("tint"),
      titleColor: $color("white"),
      align: $align.center,
      font: $font("bold", 14),
      alpha: 0.7,
      autoFontSize: true,
      radius: 5,
      title: "批量下载",
      id: "download"
    },
    layout: function(make, view) {
      make.centerX.equalTo()
      make.bottom.inset(20)
      make.height.equalTo(28)
      make.width.equalTo(120)
    },
    events: {
      tapped: function(sender){
        if ($("download").title == "批量下载") {
            $device.taptic(1)
            sender.title = "正在下载...";
            let folderName = ""
            if ($("filmActress").data.length == 1)
               folderName = $("filmActress").data[0].actressName.text
            else  folderName = favCode
            if (!$drive.exists("样品图像/"+folderName)) {
              $drive.mkdir("样品图像/"+folderName)
            }
            $("progress").value = 0;
            var count = 0
            for (var i = 0; i < screenData.length; i++) {
              $http.download({
                url: screenData[i].link,
                handler: function(resp) {
                  count++;
                  sender.title = "下载第 " + count + " 幅图";
                  $("progress").value = count * 1.0 / screenData.length
                  if (count == screenData.length) {
                    sender.title = "完成!"
                    $device.taptic(1)
                    $("progress").value = 0
                  }
                  var path = "样品图像/"+folderName + "/" + resp.response.suggestedFilename
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
  },{
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
        make.centerX.equalTo()
        make.bottom.inset(20)
        make.height.equalTo(28)
        make.width.equalTo(120)
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
        radius: 5
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
            "shortCode": shortCode,
            "un": uncensored ? "uncensored/" : ""
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
            radius: 5
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
            radius: 5
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
        didReachBottom(sender) {
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
          favData = {
              "code": favCode,
              "src": favSrc,
              "info": favInfo,
              "shortCode": shortCode
            }
          //$ui.action(data.code)
          $ui.push(detailView(favCode))
          getDetail(data.link)

          if ($("menu").index == 0 || $("menu").index == 1 || $("menu").index == 2) {
            // 影片和女优
            if (LocalFavList.indexOf(shortCode) > -1) {
              $("favorite").title = "取消收藏"
              $("favorite").bgcolor = $color("#f25959")
            } else if (LocalArcList.indexOf(shortCode) > -1) {
              $("favorite").title = "已归档"
              $("favorite").bgcolor = $color("#aaaaaa")
            }
          } else if ($("menu").index == 3) {
            // 收藏
            if (LocalFavList.indexOf(shortCode) > -1) {
              $("favorite").title = "归档"
            } else if ((LocalArcList.indexOf(shortCode) > -1)) {

              $("favorite").title = "已归档"
              $("favorite").bgcolor = $color("#aaaaaa")
            } else {
              $("favorite").title = "收藏"
            }
          } else if ($("menu").index == 4) {
            //归档
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

    }, {
      type: "text",
      props: {
        id: "loadinga",
        text: "Loading...",
        bgcolor: $color("clear"),
        textColor: $color("#888888"),
        font: $font("HelveticaNeue-BoldItalic", 20),
        align: $align.center,
        editable: false
      },

      layout: function(make, view) {
        make.top.inset(200)
        make.height.equalTo(100)
        make.width.equalTo($device.info.screen.width)
      }
    }, {
      type: "tab",
      props: {
        id: "tabAll",
        items: ["全部", "收录"],
        tintColor: $color("tint"),
        radius: 5,
        bgcolor: $color("white"),
        hidden: false,
        alpha: 0.8,
        index: ALL ? 0 : 1
      },
      layout: function(make) {
        make.centerX.equalTo()
        make.bottom.inset(20)
        make.height.equalTo(22)
      },
      events: {
        changed(sender) {
          if (sender.index == 0) ALL = true;
          else ALL = false;
          actressPage = 0;
          $("actressView").data = [];
          $("loadinga").hidden = false;
          $("loadinga").text = "Loading...";
          //$ui.action(keyword)
          getActress(url);
        }
      }
    }, ],
    layout: $layout.fill
  })
}

$ui.render({
  props: {
    title: "JavBus",
    id: "JavBus",
    navBarHidden: isInToday()
  },
  views: [{
    type: "menu",
    props: {
      id: "menu",
      items: ["影片", "女优", "分类", "收藏", "归档"]
    },
    layout: function(make) {
      make.top.left.right.inset(0)
      make.height.equalTo(35)
    },
    events: {
      changed(sender) {
        Again = 0
        if (!Menustatus) {
          if ($("searchView").super == $("JavBus")) {
            $("searchView").remove()
          }
        } else {
          if ($("category").super == $("JavBus")) {
            $("category").remove()
          }
        }
        Menustatus = 0
        switch (sender.index) {
          case 0: // 影片
            $("JavBus").add(searchView(180))
            $("tabAll").hidden = false;
            $("loading").text = "Loading...";
            $("bgInfo").hidden = false;;
            $("bgImage").hidden = false;
            $("tab").hidden = true;
            $("tabC").hidden = false;
            $("tabC").index = 0;
            $("input").placeholder = "输入番号或演员进行搜索";
            $("initialView").hidden = false;
            $("initialView").data = [];
            $("initialView").contentOffset = $point(0, 0);
            homepage = "https://www.javbus.com/";
            page = 0;
            mode = "home";
            keyword = "";
            $("input").placeholder = "载入中, 请稍候...";
            getInitial(mode);
            break;
          case 1: //女优
            $("JavBus").add(searchView(120))
            $("tabAll").hidden = true
            $("loading").text = "Loading..."
            $("bgInfo").hidden = false;
            $("bgImage").hidden = false;
            $("tab").hidden = true;
            $("tabC").hidden = false;
            $("tabC").index = 0;
            $("input").text = ""
            $("input").placeholder = "载入中, 请稍候...";

            $("initialView").hidden = false;

            $("initialView").data = [];
            $("initialView").contentOffset = $point(0, 0);
            page = 0;
            url = "https://www.javbus.com/actresses/";
            getInitialActress(url);
            break;
          case 2: //分类
            Menustatus = 1
            //            if ($("searchView").super == $("JavBus")) {
            //              $("searchView").remove()
            //            }
            Category = []
            iniCat(Titles)
            getCat(catUrl)
            break;
          case 3: // 收藏            
            $("JavBus").add(searchView(180))
            $("tabAll").hidden = true
            $("loading").text = ""
            //   $("bgInfo").hidden = true;
            //   $("bgImage").hidden = true;
            $("tab").hidden = false;
            $("tabC").hidden = true;
            $("initialView").data = [];
            $("initialView").contentOffset = $point(0, 0);

            var length = LocalFavList.length;
            $("input").text = ("")
            if (length == 0) {
              $("initialView").hidden = true

            } else {
              $("initialView").hidden = false
            }
            //        if ($("tab").index == 0) {

            $("input").placeholder = "已收藏 " + length + " 部影片";
            LocalData.favorite.map(function(i) {
              $("initialView").data = $("initialView").data.concat({
                code: i.code,
                link: homepage + i.shortCode,
                initialCover: {
                  src: i.src
                },
                info: {
                  text: i.info
                }
              })
            })

            if ($("initialView").data.length == 1) {
              $("bgInfo").hidden = true;
              $("bgImage").hidden = true;
            } else {
              $("bgInfo").hidden = false;
              $("bgImage").hidden = false;
            }
            break;
          case 4: //归档            
            $("JavBus").add(searchView(180))
            $("tabAll").hidden = true
            $("loading").text = ""
            //   $("bgInfo").hidden = true;
            //   $("bgImage").hidden = true;
            $("tab").hidden = true;
            $("tabC").hidden = true;
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
                link: homepage + i.shortCode,
                initialCover: {
                  src: i.src
                },
                info: {
                  text: i.info
                }
              })
            })
            if ($("initialView").data.length == 1) {
              $("bgInfo").hidden = true;
              $("bgImage").hidden = true;
            } else {
              $("bgInfo").hidden = false;
              $("bgImage").hidden = false;
            }
            break;

        }
      }
    }
  }, ]
})
function aboutMag(){
                    $ui.push(magnetList(favCode))
                  getMagnet(favCode)
                  $("javbusList").data = javMagData
                  if (javMagData.length == 0) {
                    $("loadingm").text = "☹️ JavBus 暂无磁链"
                    $("loadingm").hidden = false
                  } else $("loadingm").hidden = true;
}

function catCover(title) {
  return {
    type: "view",
    props: {
      title: title,
      id: "catCover"
    },
    layout: $layout.fill,
    views: [{
      type: "text",
      props: {
        id: "bgInfo",
        text: "Originated in Power Flow\n\nhttps://t.me/nicked",
        editable: false,
        textColor: $color("#CCCCCC"),
        font: $font(10),
        align: $align.center,
        hidden: false
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
        hidden: false
      },
      layout: function(make, view) {
        make.size.equalTo($size(50, 50))
        make.top.inset(100)
        make.left.inset(162)
      }

    }, {
      type: "text",
      props: {
        id: "loadingc",
        text: "Loading...",
        bgcolor: $color("clear"),
        textColor: $color("#888888"),
        font: $font("HelveticaNeue-BoldItalic", 20),
        align: $align.center,
        editable: false
      },

      layout: function(make, view) {
        make.top.inset(200)
        make.height.equalTo(100)
        make.width.equalTo($device.info.screen.width)
      }
    }, {
      type: "matrix",
      props: {
        id: "initialViewCat",
        itemHeight: 180,
        columns: 3,
        spacing: 1,
        square: false,
        bgcolor: $color("clear"),
        template: mainTemplate,
      },
      layout: function(make, view) {
        make.left.right.top.bottom.inset(0)
      },
      events: {
        didReachBottom(sender) {
          sender.endFetchingMore();
          if ($("menu").index == 0 || $("menu").index == 2 || $("tab").index > 1) {
            $ui.loading(true)
            getInitial(mode, keyword);
          } else if ($("menu").index == 1) {
            $ui.loading(true)
            if ($("tabC").index == 0) url = "https://www.javbus.com/actresses/";
            else url = "https://www.javbus.com/uncensored/actresses/"
            getInitialActress(url)
          }

        },
        didSelect(sender, indexPath, data) {
          //$ui.action(data.code)

          favSrc = data.initialCover.src
          favInfo = data.info.text
          favLink = data.link
          shortCode = favLink.split('/').pop()
          favCode = shortCode
          $ui.push(detailView(favCode))
          getDetail(data.link)
          if ($("menu").index == 0 || $("menu").index == 1 || $("menu").index == 2) {
            if (LocalFavList.indexOf(shortCode) > -1) {
              $("favorite").title = "取消收藏"
              $("favorite").bgcolor = $color("#f25959")
            } else if (LocalArcList.indexOf(shortCode) > -1) {
              $("favorite").title = "已归档"
              $("favorite").bgcolor = $color("#aaaaaa")
            }
          } else if ($("menu").index == 3) {
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

    }, {
      type: "button",
      props: {
        id: "favDetail",
        title: "收藏",
        bgcolor: $color("tint"),
        font: $font(13),
        alpha: 0.7,
        radius: 5
      },
      layout: function(make, view) {
        make.bottom.inset(50)
        make.centerX.equalTo()
        make.width.equalTo(60)
      },
      events: {
        tapped(sender) {
          if (sender.title == "收藏") {
            favDetailTapped("add", sender.info)
            sender.title = "取消收藏"
            $("favDetail").bgcolor = $color("#f25959")
          } else {
            favDetailTapped("del", sender.info)
            sender.title = "收藏"
            $("favDetail").bgcolor = $color("tint")
          }
        }
      }
    }, {
      type: "tab",
      props: {
        id: "tabAllC",
        items: ["全部", "收录"],
        tintColor: $color("tint"),
        radius: 5,
        bgcolor: $color("white"),
        hidden: false,
        alpha: 0.8,
        index: ALL ? 0 : 1
      },
      layout: function(make) {
        make.centerX.equalTo()
        make.bottom.inset(20)
        make.height.equalTo(22)
      },
      events: {
        changed(sender) {
          if (sender.index == 0) ALLC = true;
          else ALLC = false;
          page = 0;
          //          $ui.action("d")
          $("initialViewCat").data = [];
          $("loadingc").text = "Loading...";
          //$ui.action(keyword)
          getInitial(mode, keyword);
        }
      }
    }]
  }
}

function favDetailTapped(mode, Button) {
  //label发行商 studio 制作商 director 导演
  let data = {
    "name": Button.name,
    "shortCode": Button.shortCode
  }
  if (mode == "add") {
    if (Button.position == "director") {
      LocalDirectorList.push(data.shortCode)
      LocalData.director.push(data)
    } else if (Button.position == "series") {
      LocalSeriesList.push(data.shortCode)
      LocalData.series.push(data)
    } else if (Button.position == "filmMaker") {
      LocalFilmMakerList.push(data.shortCode)
      LocalData.filmMaker.push(data)
    } else if (Button.position == "filmEstab") {
      LocalFilmEstabList.push(data.shortCode)
      LocalData.filmEstab.push(data)
    }

  } else if (mode == "del") {
    $ui.pop()
    if (Button.position == "director") {
      let idx = LocalDirectorList.indexOf(data.shortCode)
      LocalDirectorList.splice(idx, 1)
      LocalData.director.splice(idx, 1)
      if ($("tab").hidden == false && $("tab").index == 2) $("initialView").delete(idx);
    } else if (Button.position == "series") {
      let idx = LocalSeriesList.indexOf(data.shortCode)
      LocalSeriesList.splice(idx, 1)
      LocalData.series.splice(idx, 1)
      if ($("tab").hidden == false && $("tab").index == 3) $("initialView").delete(idx);
    } else if (Button.position == "filmMaker") {
      let idx = LocalFilmMakerList.indexOf(data.shortCode)
      LocalFilmMakerList.splice(idx, 1)
      LocalData.filmMaker.splice(idx, 1)
      if ($("tab").hidden == false && $("tab").index == 4) $("initialView").delete(idx);
    } else if (Button.position == "filmEstab") {
      let idx = LocalFilmEstabList.indexOf(data.shortCode)
      LocalFilmEstabList.splice(idx, 1)
      LocalData.filmEstab.splice(idx, 1)
      if ($("tab").hidden == false && $("tab").index == 5) $("initialView").delete(idx);
    }
  }
  writeCache()
}

function pushCat(sender, position = "") {
  $ui.push(catCover(sender.text))
  let shortCode = sender.info.split('/').pop()
  $("favDetail").info = {
    "shortCode": shortCode,
    "position": position,
    "name": sender.text
  }
  if (position == "") $("favDetail").hidden = true
  else $("favDetail").hidden = false
  //判断来自哪个分类，决定收藏按钮显示
  if (position == "director") {
    if (LocalDirectorList.indexOf(shortCode) > -1) {
      $("favDetail").title = "取消收藏"
      $("favDetail").bgcolor = $color("#f25959")
    }
  } else if (position == "series") {
    if (LocalSeriesList.indexOf(shortCode) > -1) {
      $("favDetail").title = "取消收藏"
      $("favDetail").bgcolor = $color("#f25959")
    }
  } else if (position == "filmMaker") {
    if (LocalFilmMakerList.indexOf(shortCode) > -1) {
      $("favDetail").title = "取消收藏"
      $("favDetail").bgcolor = $color("#f25959")
    }
  } else if (position == "filmEstab") {
    if (LocalFilmEstabList.indexOf(shortCode) > -1) {
      $("favDetail").title = "取消收藏"
      $("favDetail").bgcolor = $color("#f25959")
    }
  } else if (position == "series") {
    if (LocalSeriesList.indexOf(shortCode) > -1) {
      $("favDetail").title = "取消收藏"
      $("favDetail").bgcolor = $color("#f25959")
    }
  }
  page = 0;
  mode = "cat"
  keyword = sender.info;
  getInitial("cat", keyword)
  //$ui.toast("已复制 "+ sender.info)
}

function getInitial(mode = "home", keyword = "", caturl = "") {
  page++;
  if (mode == "home") {
    url = homepage + "page/"
  } else if (mode == "search") {
    url = encodeURI(homeSearchPage + keyword + "/")
  } else if (mode == "cat") {
    url = keyword + "/"
  }
  let cookies = {}
  // 是否来自导演等类目
  if (mode == "cat") {
    matrixID = "initialViewCat";
    loadingID = "loadingc";
    if (ALLC) cookies = { "cookie": "existmag=all" };
  } else {
    matrixID = "initialView";
    loadingID = "loading";
    if (ALL) cookies = { "cookie": "existmag=all" };
  }
  $http.request({
    url: url + page,
    timeout: timeout,
    header: cookies,
    handler: function(resp) {
      if (resp.data.indexOf("404 Page Not Found") > -1) {
        $ui.toast("🙈 到底了")
        $ui.loading(false)
        return
      } else if (resp.data.indexOf("沒有您要的結果") > -1) {
        if (mode == "search" && $("initialView").data.length > 0) {
          $ui.toast("🙈 到底了")
          $ui.loading(false)
          return
        } else {
          if (Again == 1) {
            $ui.alert("💔 搜索无果,车牌无效")
            $(loadingID).text = ""
            $ui.loading(false);
            return
          } else if (mode == "search") {
            if (uncensored) {
              homepage = "https://www.javbus.com/"
              homeSearchPage = homepage + "search/";
              uncensored = false
              $("tabC").index = 0

            } else {
              homepage = "https://www.javbus.com/uncensored/";
              homeSearchPage = homepage + "search/";
              uncensored = true;
              $("tabC").index = 1;
            }
            if (Oumei == 1) Again = 0;
            else Again = 1;
            Oumei = 0;
            page = 0;
            getInitial(mode, $("input").text);
            return
          }
        }

      }
      if (!resp.response) {
        $ui.alert("❌ 网络错误或无法访问")
        $(loadingID).text = ""
        $ui.loading(false);
        return
      }
      $ui.loading(false);
      //      uncensored = /class="active"><a href="[\s\S]*?">/.exec(resp.data)[0].includes("uncensored")
      //      if(uncensored) $("tabC").index = 1;
      //      else if(homepage.includes("org")) $("tabC").index = 2;
      //       else $("tabC").index = 0;
      var reg = /<a class="movie-box"[\s\S]*?<\/span>/g;
      var match = resp.data.match(reg)
      //      $console.log(match)
      var data = []
      match.map(function(i) {
        var link = /href="([\s\S]*?)(")/.exec(i)[1];
        var image = /<img src="([\s\S]*?)(")/.exec(i)[1];
        var title = /title="(.*?)(">)/.exec(i)[1];
        var code = /<date>(.*?)<\/date>/.exec(i)[1];
        var date = /\/\s<date>(.*?)<\/date><\/span>/.exec(i)[1];
        let hd = i.includes("高清")
        let sub = i.includes("字幕")
        $(matrixID).data = $(matrixID).data.concat({
          title: title,
          link: link,
          scode: code,
          initialCover: {
            src: image
          },
          info: {
            text: code + " | " + date
          },
          HD: {
            hidden: !hd
          },
          SUB: {
            hidden: !sub
          }
        });

      })
      $("input").placeholder = "输入番号或演员进行搜索"
      $(loadingID).text = ""
      if ($(matrixID).data.length == 1) {
        $("bgInfo").hidden = true;
        $("bgImage").hidden = true;
      } else {
        $("bgInfo").hidden = false;
        $("bgImage").hidden = false;
      }
      //	  $("initialView").endRefreshing()
    }
  })

}

function getInitialActress(url) {
  page++;
  //  $console.log(page)
  $http.request({
    url: url + page,
    handler: function(resp) {
      $ui.loading(false);
      var reg = /<a class="avatar-box text-center"[\s\S]*?<\/span>/g;
      var match = resp.data.match(reg)
      var data = []
      match.map(function(i) {
        var link = /href="([\s\S]*?)(")/.exec(i)[1];
        var image = /<img src="([\s\S]*?)(")/.exec(i)[1];
        var title = /title="(.*?)(">)/.exec(i)[1];
        $("initialView").data = $("initialView").data.concat({
          link: link,
          initialCover: {
            src: image
          },
          info: {
            text: title
          }
        });

      })
      $("loading").text = "";
      $("initialView").endRefreshing();
      $("input").placeholder = "输入番号或演员进行搜索";
    }
  })
}

//async function getInfo(link) {
//  javMagData = []
//  return new Promise(resolve => {
//    $('detailView').add({
//      type: 'web',
//      props: {
//        id: 'magnet',
//        url: link,
//        showsProgress: false
//      },
//      layout: function(make) {
//        make.size.equalTo($size(0, 0));
//      },
//      events: {
//        didSendRequest(request) {
//          if (!/uncledatoolsbyajax\.php/.test(request.url)) return;
//          $('magnet').eval({ script: `$.get('${request.url}', function(rep){$notify('getUrl', rep);})` });
//        },
//        getUrl(data) {
//          resolve(data);
//          //$ui.action(data)
//          $('magnet').remove();
//        }
//      }
//    });
//  });
//}

function getJavMag(link,flag="0") {
  javMagData = []
  $('detailView').add({
    type: 'web',
    props: {
      id: 'magnet',
      url: link,
      showsProgress: false
    },
    layout: function(make) {
      make.size.equalTo($size(0, 0));
    },
    events: {
      didSendRequest(request) {
        if (!/uncledatoolsbyajax\.php/.test(request.url)) return;
        $('magnet').eval({ script: `$.get('${request.url}', function(rep){$notify('getUrl', rep);})` });
      },
      getUrl(data) {
        //resolve(data);
        //$ui.action(data)
        if($('magnet'))$('magnet').remove();
        //          let html = await getInfo(link)
        let html = data;
        let pattern = /<tr onmouseover[\s\S]*?<\/tr>/g
        let match = html.match(pattern)
        if(!match) return
        //  $console.log(match)
        match.map(function(i) {
          let maglink = /window.open\('([\s\S]*?)'/g.exec(i)[1]
          let name = decodeURI(/dn=(.*)/g.exec(maglink)[1])
          let pat = /href[\s\S]*?<\/a>/g
          let m = i.match(pat)
          //let name = /href[\s\S]*?>([\s\S]*?)<\/a>/g.exec(m[0])[1]
          let size = /href[\s\S]*?>([\s\S]*?)<\/a>/g.exec(m[1])[1]
          size = size.replace(/\s+/g, "")
          let time = /href[\s\S]*?>([\s\S]*?)<\/a>/g.exec(m[2])[1]
          time = time.replace(/\s+/g, "")
          let hd = i.includes("高清")
          let sub = i.includes("字幕")
          javMagData.push({
            info: maglink,
            mFileName: {
              text: name
            },
            mFileSize: {
              text: size
            },
            mTime: {
              text: time
            },
            HD: {
              hidden: !hd
            },
            SUB: {
              hidden: !sub
            }
          })
        })
//        if (javMagData.length == 0) {
//          $("loadingm").text = "☹️ JavBus 暂无磁链"
//          $("loadingm").hidden = false
//        } else $("loadingm").hidden = true;
        if (flag=="pulled"){
          $("javbusList").data = javMagData
        $("javbusList").hidden = false
        $("javbusList").endRefreshing();
        }
        JavMag = 1;
      }
    }
  });
}

function getAvglePreview(keyword) {
  let url = "https://api.avgle.com/v1/search/" + encodeURI(keyword) + "/0?limit=10&t=a&o=bw"
  $http.request({
    url: url,
    handler: function(resp) {
      if ($("player")) {
        $("player").pause()
        $("player").stopLoading();
        $("player").remove()
      };
      var success = resp.data.success;
      if (!success || !resp.response) {
        $ui.error("❌ 网络连接出错！");
        return
      }
      let video_num = resp.data.response.total_videos
      //      $console.log(video_num)
      if (video_num == 0) {
        $ui.error("☹️ 暂无视频资源！");
        $ui.loading(false);
        return
      }
      let infos = resp.data.response.videos;
      let videoUrl = infos[0].preview_video_url
      $("detailView").add({
        type: "video",
        props: {
          id: "player",
          src: videoUrl,
          //poster: poster,
        },
        layout: function(make, view) {
          let width = $device.info.screen.width - 20;
          let height = width * 67 / 100
          make.left.right.inset(10)
          make.top.equalTo($("filmName").bottom).offset(5)
          make.size.equalTo($size(width, height))
        }
      });
      $("detailView").add({
        type: "button",
        props: {
          title: "X",
          id: "X",
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.top.equalTo($("filmName").bottom).offset(6)
          make.right.inset(11)
          make.width.equalTo(20)
          make.height.equalTo(20)
        },
        events: {
          tapped(sender) {
            if ($("player")) {
              $("player").pause()
              $("player").stopLoading();
              $("player").remove()
            };
            $("X").hidden = true
          }
        }
      })
      $("detailView").add({
        type: "button",
        props: {
          title: "↗",
          id: "shareVideo",
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.top.equalTo($("player").bottom).offset(-20)
          make.right.inset(11)
          make.width.equalTo(20)
          make.height.equalTo(20)
        },
        events: {
          tapped(sender) {
            $share.sheet([videoUrl])
          }
        }
      })
      $delay(0.5, function() {
        $("player").play()
      })
    }
  })
}

function getDetail(url) {
  flag++
  Trans = 0;
  $http.request({
    url: url,
    timeout: timeout,
    handler: function(resp) {
      if (!resp.response) {
        $ui.error("❌ 网络连接错误")
        return
      }
      javbusLink = url
      // 演员头像
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
      var temp = /<span class="header">發行日期:<\/span>([\s\S]*?)<\/p>/.exec(resp.data);
      if (temp) {
        var filmTime = temp[1]
      } else {
        var filmTime = "????-??-??"
      }
      var temp = /<span class="header">長度:<\/span>([\s\S]*?)<\/p>/.exec(resp.data);
      if (temp) {
        let lastmins = /\d+/.exec(temp[1])
        let hours = Math.floor(lastmins / 60)
        let mins = lastmins % 60
        mins = mins == "0" ? "00" : mins;
        var filmLast = hours + ":" + mins
      } else {
        var filmLast = "???分钟"
      }
      var temp = /<span class="header">發行商:[\s\S]*?"(.*?)">(.*?)<\/a>/.exec(resp.data);
      if (temp) {
        var filmEstabName = temp[2]
        $("filmEstabName").info = temp[1]
      } else {
        var filmEstabName = "未知"
      }
      var temp = /<span class="header">製作商:[\s\S]*?"(.*?)">(.*?)<\/a>/.exec(resp.data);
      if (temp) {
        var filmMakerbName = temp[2]
        $("filmMakerName").info = temp[1]
      } else {
        var filmMakerName = "未知"
      }
      var temp = /<span class="header">系列:[\s\S]*?"(.*?)">(.*?)<\/a>/.exec(resp.data);
      if (temp) {
        var seriesName = temp[2]
        $("seriesName").info = temp[1]
      } else {
        var seriesName = "未知"
      }
      var temp = /<span class="header">導演:[\s\S]*?"(.*?)">(.*?)<\/a>/.exec(resp.data);
      if (temp) {
        var directorName = temp[2]
        $("directorName").info = temp[1]
      } else {
        var directorName = "未知"
      }
      $("filmInfo").text = filmTime + "  " + "(时长 " + filmLast + ")";
      $("filmInfo").hidden = isInToday();
      var code = /<span class="header">識別碼:[\s\S]*?">([\s\S]*?)<\/span>/.exec(resp.data)[1];
      $("check").info = code
      $("aboutFilm").hidden = isInToday();
      $("share").info = code;
      $("filmEstabName").text = filmEstabName;
      $("filmEstabName").hidden = isInToday();
      $("filmEstab").hidden = isInToday();
      $("filmMakerName").text = filmMakerbName;
      $("filmMakerName").hidden = isInToday();
      $("filmMaker").hidden = isInToday();
      $("series").hidden = isInToday();
      $("seriesName").text = seriesName
      $("seriesName").hidden = isInToday()
      $("directorName").text = directorName;
      $("directorName").hidden = isInToday();
      $("director").hidden = isInToday();
      //$ui.action(filmSource)
      //影片截图
      screenData = []
      var regScreenshot = /<a class="sample-box" href="(.*?)"[\s\S]*?<img src="(.*?)">/g
      var match = resp.data.match(regScreenshot)
      if (match) {
        match.map(function(i) {
          var screenshot = /<a class="sample-box" href="(.*?)"[\s\S]*?<img src="(.*?)">/g.exec(i)[1];
          //         var resp = await $http.get(screenshot);
          var screenshotCover = /<a class="sample-box" href="(.*?)"[\s\S]*?<img src="(.*?)"\s/g.exec(i)[2];
          screenData.push({
            screenshotCover: {
              src: screenshot
            },
            link: screenshot
          })

        })
      } else {
        screenData = "no"
      }
      $("share").hidden = false
      $("openJS").hidden = !isInToday()
      $("loading1").hidden = true
      // 磁链获取
      JavMag = 0
      getJavMag(url)
//      if (javMagData.length == 0) {
//        $("loadingm").text = "☹️ JavBus 暂无磁链"
//        $("loadingm").hidden = false
//      } else $("loadingm").hidden = true;
    }
  })

}

function getActress(url) {
  actressPage++;
  let cookies = {}
  if (ALL) cookies = { "cookie": "existmag=all" };
  $http.request({
    url: url + "/" + actressPage,
    timeout: timeout,
    header: cookies,
    handler: function(resp) {

      if (!resp.response) {
        $ui.error("❌ 网络连接错误")
        return
      }
      if (resp.data.indexOf("404 Page Not Found") > -1) {
        $ui.toast("🙈 到底了")
        $ui.loading(false)
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
        var temp = /<div class="photo-info">[\s\S]*?年齡:\s(.*?)<\/p>/.exec(resp.data)
        if (temp) {
          var age = temp[1] + "岁"
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
        var temp = /<div class="photo-info">[\s\S]*?胸圍:\s(.*?)<\/p>/.exec(resp.data)
        if (temp) {
          var xiong = temp[1]
        } else {
          var xiong = "??cm"
        }
        var temp = /<div class="photo-info">[\s\S]*?腰圍:\s(.*?)<\/p>/.exec(resp.data)
        if (temp) {
          var yao = temp[1]
        } else {
          var yao = "??cm"
        }
        var temp = /<div class="photo-info">[\s\S]*?臀圍:\s(.*?)<\/p>/.exec(resp.data)
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

      var data = []
      match.map(function(i) {
        var link = /href="([\s\S]*?)(")/.exec(i)[1];
        var image = /<img src="([\s\S]*?)(")/.exec(i)[1];
        var title = /title="(.*?)(">)/.exec(i)[1];
        var code = /<date>(.*?)<\/date>/.exec(i)[1];
        var date = /\/\s<date>(.*?)<\/date><\/span>/.exec(i)[1];
        $("loadinga").hidden = true;
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
    let un = uncensored ? "uncensored/" : ""
    if ($("menu").index == 3 && $("tab").index == 1) {
      $("initialView").data = $("initialView").data.concat({
        link: "https://www.javbus.com/" + data.un + "star/" + data.shortCode,
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
    $ui.pop()
    let idx = LocalActressList.indexOf(data.shortCode)
    //$ui.action(idx)
    LocalActressList.splice(idx, 1)
    LocalData.actress.splice(idx, 1)
    if ($("menu").index == 3 && $("tab").index == 1) {
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
    if (!$context.query.code && $("menu").index == 3 && $("tab").index == 0) {
      $("initialView").data = $("initialView").data.concat({
        link: homepage + shortCode,
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
    if (!isInToday()) $ui.pop();
    var idx = LocalFavList.indexOf(data.shortCode)
    LocalFavList.splice(idx, 1)
    LocalData.favorite.splice(idx, 1)

  } else if (mode == "archive") {
    if (!isInToday()) $ui.pop();
    var idx = LocalFavList.indexOf(data.shortCode)
    LocalFavList.splice(idx, 1)
    LocalData.favorite.splice(idx, 1)
    if ($("menu").index == 3) {
      //$ui.action($("initialView").data)
      $("initialView").delete(idx)
      var length = LocalFavList.length;
      $("input").placeholder = "已收藏 " + length + " 部影片"
    } else if ($("menu").index == 4) {
      $("initialView").data = [{
        link: homepage + shortCode,
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
    if ($("menu").index == 4) {
      $("initialView").delete(idx)
      var length = LocalArcList.length;
      $("input").placeholder = "已归档 " + length + " 部影片"
    }
  }
  writeCache()
}

function translate(keyword) {
  $("filmName").text = "翻译中..."
  let url = "https://translate.google.cn/translate_a/single?client=it&dt=t&dt=rmt&dt=bd&dt=rms&dt=qca&dt=ss&dt=md&dt=ld&dt=ex&otf=3&dj=1&hl=zh_CN&ie=UTF-8&oe=UTF-8&sl=auto&tl=zh-CN&q=" + $text.URLEncode(keyword);
  $http.get({
    header: {
      "User-Agent": "GoogleTranslate/5.8.58002 (iPhone; iOS 10.3; zh_CN; iPhone8,1)"
    },
    url: url,
    handler: function(resp) {
      var json = resp.data.sentences;
      var count = json.length;
      var text = json.splice(0, count - 1).map(function(i) {
        return i.trans
      });

      $("filmName").text = text.join("");
    }
  })
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
        text: "本脚本运行内容包含成人视频、图片，可能会引起你的不适，请谨慎运行。\n未满十八岁，禁止运行。\n\n脚本运行需代理，请将 Https://javbus.com 加入代理。",
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
    }, {
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
          initial()
          main(url)
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

function getMagnet(code) {
  $app.tips("单击复制磁链，\n左滑分享磁链,\n若无磁链，尝试下拉刷新")
  $ui.loading(true)
  $http.request({
    url: urls[$("mMenu").index].pattern + code + "&page=1",
    handler: function(resp) {
      var data = resp.data.results
      if (!data) {
        $("mlist").data = [{
          mFileName: {
            text: "无资源",
          },
          mFileSize: {
            text: "请切换源",
          },
          mTime: {
            text: ""
          },
          info: ""
        }]
      } else {
        data.map(function(i) {
          $("mlist").data = $("mlist").data.concat({
            mFileName: {
              text: i.name,
            },
            mFileSize: {
              text: i.formatSize,
            },
            mTime: {
              text: i.count
            },
            info: i.magnet
          })
        })
      }

      $ui.loading(false)
      $("mlist").endRefreshing()
    }
  })
}

function getCat(url) {
  $http.request({
    url: url,
    handler: function(resp) {
      if (!resp.response) $ui.error("❌ 网络错误或无法访问")
      let catTitles = url.includes("uncensored") ? Utitles : Titles
      $("catMatrix").data = []
      for (let i = 0; i < catTitles.length; i++) {
        let re = new RegExp(catTitles[i] + "</h4>([\\s\\S]*?)</div>");
        let content = re.exec(resp.data)[1]
        let cats = content.match(/a class=(.*?)<\/a>/g)
        let data = []
        cats.map(function(i) {
          let link = /href="(.*?)">(.*?)<\/a>/.exec(i)[1]
          let name = /href="(.*?">)(.*?)<\/a>/.exec(i)[2]
          data = data.concat({
            mlabel: {
              text: name,
              info: link
            },
            gradient: {
              colors: colorData[randomColor(0, 11)]
            }
          })
        })
        Category.push(data)
        if (i == 0) {
          $("catMatrix").data = data
        }
      }
      $("loading2").hidden = true
      $("catMatrix").contentOffset = $point(0, 0)
    }
  })
}

function iniCat(titles) {
  $("JavBus").add({
    props: {
      title: "分类",
      id: "category"
      //debugging:true			
    },
    views: [{
      type: "menu",
      props: {
        id: "cmenu",
        items: titles,
      },
      layout: function(make, view) {
        make.left.right.inset(0)
        make.height.equalTo(40)
        make.top.inset(0)
      },
      events: {
        // 不同类目的切换
        changed: function(sender) {
          $("catMatrix").data = Category[sender.index]
          $("catMatrix").contentOffset = $point(0, 0)
          $("loading2").hidden = true
        }
      }
    }, {
      type: "matrix",
      props: {
        id: "catMatrix",
        columns: 3,
        itemHeight: 40,
        spacing: 10,
        template: [{
          type: "gradient",
          props: {
            id: "gradient",
            colors: colorData[randomColor(0, 11)],
            locations: [0.0, 1.0],
            startPoint: $point(0, 0),
            endPoint: $point(1, 1),
            radius: 8,
            hidden: false
          },
          layout: $layout.fill
        }, {
          type: "label",
          props: {
            id: "mlabel",
            radius: 8,
            bgcolor: $color("clear"),
            alpha: 1,
            textColor: $color("white"),
            align: $align.center,
            font: $font("font", 10),
            autoFontSize: true,
          },
          layout: $layout.fill
        }]
      },
      layout: function(make, view) {
        make.top.equalTo($("cmenu").bottom)
        make.left.right.bottom.inset(0)
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          pushCat(data.mlabel)
        },
      }
    }, {
      type: "text",
      props: {
        id: "loading2",
        text: "Loading...",
        bgcolor: $color("clear"),
        textColor: $color("#888888"),
        font: $font("HelveticaNeue-BoldItalic", 20),
        align: $align.center,
        hidden: false,
        editable: false
      },

      layout: function(make, view) {
        make.top.inset(200)
        make.height.equalTo(100)
        make.width.equalTo($device.info.screen.width)
      }
    }, {
      type: "tab",
      props: {
        id: "ctab",
        items: ["有码", "无码"],
        tintColor: $color("tint"),
        radius: 5,
        bgcolor: $color("white"),
        alpha: 0.7,
        hidden: false
      },
      layout: function(make) {
        make.centerX.equalTo()
        make.bottom.inset(20)
        make.height.equalTo(22)
      },
      events: {
        changed(sender) {
          $("category").remove()
          let catTitles = []
          let url = ""
          if (sender.index == 0) {
            catTitles = Titles;
            url = "https://www.javbus.com/genre";
          } else {
            catTitles = Utitles;
            url = "https://www.javbus.com/uncensored/genre";

          }
          Category = []
          iniCat(catTitles)
          $("loading2").hidden = false
          $("ctab").index = url.includes("uncensored") ? 1 : 0
          getCat(url)
        }
      }

    }, ],
    layout: function(make, view) {
      make.left.right.bottom.inset(0)
      make.top.equalTo($("menu").bottom)
    }
  })
}

//检测扩展更新
function scriptVersionUpdate() {
  $http.get({
    url: "https://raw.githubusercontent.com/nicktimebreak/xteko/master/JavBus/updateInfo",
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
              var url = "jsbox://install?url=https://raw.githubusercontent.com/nicktimebreak/xteko/master/JavBus/JavBus.js&name=JavBus" + afterVersion + "&icon=icon_087.png&types=1&author=Nicked&website=https://t.me/nicked";
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

function isInToday() {
  return ($app.env == $env.today) ? true : false
}

function wechatPay() {
  $ui.alert({
    title: "确定赞赏？",
    message: "点击确定二维码图片会自动存入相册同时会跳转至微信扫码,请选择相册中的二维码图片进行赞赏。",
    actions: [{
        title: "确定",
        handler: function() {
          let payUrl = "weixin://scanqrcode"
          $http.download({
            url: "https://raw.githubusercontent.com/nicktimebreak/xteko/master/JavBus/wechat.jpg",
            progress: function(bytesWritten, totalBytes) {
              var percentage = bytesWritten * 1.0 / totalBytes
            },
            handler: function(resp) {
              $photo.save({
                data: resp.data,
                handler: function(success) {
                  if (success) {
                    $app.openURL(payUrl)
                  }
                }
              })
            }
          })
        }
      },
      {
        title: "取消",
        handler: function() {

        }
      }
    ]
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
    LocalDirectorList = LocalData.director.map(i => i.shortCode);
    LocalFilmMakerList = LocalData.filmMaker.map(i => i.shortCode);
    LocalFilmEstabList = LocalData.filmEstab.map(i => i.shortCode);
    if (!LocalData.series) LocalData.series = []
    LocalSeriesList = LocalData.series.map(i => i.shortCode)
  } else {
    LocalData = { "favorite": [], "actress": [], "archive": [], "director": [], "filmMaker": [], "filmEstab": [], "series": [] };
    LocalFavList = [];
    LocalArcList = [];
    LocalActressList = [];
    LocalDirectorList = [];
    LocalFilmMakerList = [];
    LocalFilmEstabList = [];
    LocalSeriesList = []
  };

  mode = "home";
  keyword = "";

  scriptVersionUpdate();
  $("JavBus").add(searchView(180));
}

//剪贴板检测
function clipboardDetect(clip) {
  let str = clip
  let reg1 = /[sS][nN][iI][sS][\s\-]?\d{3}|[aA][bB][pP][\s\-]?\d{3}|[iI][pP][zZ][\s\-]?\d{3}|[sS][wW][\s\-]?\d{3}|[jJ][uU][xX][\s\-]?\d{3}|[mM][iI][aA][dD][\s\-]?\d{3}|[mM][iI][dD][eE][\s\-]?\d{3}|[mM][iI][dD][dD][\s\-]?\d{3}|[pP][gG][dD][\s\-]?\d{3}|[sS][tT][aA][rR][\s\-]?\d{3}|[eE][bB][oO][dD][\s\-]?\d{3}|[iI][pP][tT][dD][\s\-]?\d{3}/g;
  let reg2 = /[a-zA-Z]{3,5}[\s\-]?\d{3,4}/g;
  let match = str.match(reg1);
  if (match) {
    mode = "search";
    keyword = match[0].replace(/\s+/g, "");
    $("input").text = keyword
  } else {
    let match = str.match(reg2);
    if (match) {
      mode = "search";
      keyword = match[0].replace(/\s+/g, "");
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

function random256(begin, end) {
  //  return $rgb(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256))
  return $rgb(randomColor(begin, end), randomColor(begin, end), randomColor(begin, end))
}

function randomColor(begin, end) {
  return Math.floor(Math.random() * (end - begin)) + begin;
}

function randomColor(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range);
  return num;
}

function jsDetect() {
  var js = $file.extensions
  for (var i = 0; i < js.length; i++) {
    var match = /Avgle[\s\S]*?/g.exec(js[i])
    if (match) {
      return {
        "js": js[i],
        "num": i
      }
    }
  }
  return false
}

function openJS(code, link) {
  $ui.push(detailView(code))
  getDetail(link)
  getInitial()
}

function main(url) {
  page = 0;
  homepage = url
  homeSearchPage = homepage + "search/";
  //  homeStarPage = homepage + "star/";
  let clip = $clipboard.text
  let link = $detector.link(clip)
  let detect = {
    "mode": "home",
    "keyword": ""
  }
  if ($context.query.code) {
  let code = $context.query.code
  favCode = code
  openJS(code,$context.query.link)
  if (LocalFavList.indexOf(code) > -1) {
    $("favorite").title = "取消收藏"
    $("favorite").bgcolor = $color("#f25959")
  } else if (LocalArcList.indexOf(code) > -1) {
    $("favorite").title = "已归档"
    $("favorite").bgcolor = $color("#aaaaaa")
  }
//  getInitial("search",$context.query.code);
  return
}
  if (!$context.textItems && ($("tabC").index == 2 || clip == null || link.length > 0)) {
    getInitial()
  } else {
    if ($context.textItems) {
      detect = clipboardDetect($context.textItems[0])
    } else {
      detect = clipboardDetect(clip)
    }
    getInitial(detect.mode, detect.keyword)
  }
}

function start() {
  let check = $cache.get("adultCheck")
  if (!check) {
    checkAdult()
  } else {
    initial()
    main(url)
  }
}

LocalDataPath = "drive://JavBusBackup.json";
url = "https://www.javbus.com/"

//let LAContext = $objc("LAContext").invoke("alloc.init");
//
//let handler = $block("void, BOOL", success => $thread.main({
//  delay: 1,
//  handler: function() {
//    if (success) {
//      start()
//    } else $ui.alert("验证失败")
//  }
//}))

//LAContext.invoke("evaluatePolicy:localizedReason:reply:", 2, "验证以继续", handler);
start()