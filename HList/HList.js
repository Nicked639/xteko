/*

 H LIST
 收藏与归档你想看影片
 同时搜索庞大的 AV 片库
 部分影片支持视频截图预览
 几大厂商番号可复制后启动脚本直接进入搜索结果

 By Nicked

 https://t.me/nicked

*/
//$cache.clear()
var version = 1.2
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
      text: "Originated in Power Flow\n\nhttps://t.me/Flow_Script\n\nVersion: 1.0",
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
      src: "https://i.loli.net/2017/11/14/5a0a553e1c420.jpg",
      radius: 25,
      alpha: 0.8,
      align: $align.center,
      hidden: true
    },
    layout: function(make, view) {
      make.size.equalTo($size(50, 50))
      make.top.inset(110)
      make.left.inset(162)
    }

  }, {
    type: "input",
    props: {
      id: "input",
      placeholder: "输入番号或演员进行搜索",
      id: "input",
      font: $font(13),
      clearsOnBeginEditing: false,
      bgcolor: $color("#f3f3f3"),
      radius: 8,
      stickyHeader: false
    },
    events: {
      returned: function(sender) {
        $("menu").index = 0
        if (sender.text) {
          sender.blur()
          $("initialView").data = [];
          mode = "search";
          keyword = sender.text;
          page = 0;
          getInitial(mode, keyword);

        } else {
          $("initialView").data = [];
          sender.blur()
          mode = "home"
          page = 0
          getInitial(mode)
        }
        $("initialView").contentOffset = $point(0, 0);
        $("initialView").hidden = false;
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
        },
        layout: $layout.fill
      }, {
        type: "label",
        props: {
          id: "info",
          bgcolor: $rgba(0, 0, 0, 0.4),
          textColor: $color("white"),
          align: $align.center,
          font: $font(10),
          autoFontSize: true
        },
        layout: function(make) {
          make.left.right.inset(0)
          make.bottom.inset(0)
          make.height.equalTo(20)
        },
      }],
    },
    layout: function(make, view) {
      make.left.right.bottom.inset(5)
      make.top.equalTo($("input").bottom).offset(5)
    },
    events: {
      didReachBottom(sender) {
        sender.endFetchingMore();
        if ($("menu").index == 0) {
          $ui.loading = true
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
            bgcolor: $color("#ededed")
          },
          views: [{
            type: "image",
            props: {
              id: "actressCover",
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
        make.bottom.inset(40)
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
        title: "搜磁链",
        titleColor: $color("black"),
        alpha: 1,
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
          $safari.open({
            url: "http://btspread.rip/" + encodeURI(favCode) + "/1-0-0/"
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
        titleColor: $color("black"),
        alpha: 1,
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
        titleColor: $color("white"),
        alpha: 1,
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
        title: "分享",
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
        make.width.equalTo(30)
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
          src: "https://i.loli.net/2017/11/14/5a0a553e1c420.jpg"
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
        src: cover
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
            autoFontSize: true
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
        make.top.equalTo($("actressInfo").bottom)
      },
      events: {
        didReachBottom(sender, data) {
          $ui.loading = true
          sender.endFetchingMore();
          getActress(url);

        },
        didSelect(sender, indexPath, data) {

          favSrc = data.actressCovers.src
          favInfo = data.actressInfos.text
          favLink = data.link
          shortCode = favLink.split("/").pop()
          //$ui.action(data.link)
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
            }
          } else if ($("menu").index == 1) {
            if (LocalFavList.indexOf(shortCode) > -1) {
              $("favorite").title = "归档"
            } else {
              if (LocalArcList.indexOf(shortCode) > -1) {
                $("favorite").title = "已归档"
              } else {
                $("favorite").title = "收藏"
              }
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
  page++
  //$ui.toast("⏱ 搜索中", 100)
  if (mode == "home") {
    url = homepage + "page/"
  } else if (mode == "search") {
    url = encodeURI(homepage + "search/" + keyword + "/page/")
  } else if (mode == "actress") {
    url = keyword + "/page/"
  }
  $http.request({
    url: url + page,
    timeout: timeout,
    handler: function(resp) {
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
      $ui.loading = false
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
          code: code,
          link: link,
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
          var age = temp[1]
        } else {
          var age = "??"
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
          title: title,
          link: link,
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
    LocalData.favorite.push(data)
    LocalFavList.push(data.shortCode)
    if ($("menu").index == 1) {
      $("initialView").data = $("initialView").data.concat({
        link: homeMoviePage + shortCode,
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
    idx = LocalFavList.indexOf(data.shortCode)
    LocalFavList.splice(idx, 1)
    LocalData.favorite.splice(idx, 1)

  } else if (mode == "archive") {
    idx = LocalFavList.indexOf(data.shortCode)
    LocalFavList.splice(idx, 1)
    LocalData.favorite.splice(idx, 1)
    if ($("menu").index == 1) {
      $("initialView").delete(idx)
      var length = LocalFavList.length;
      $("input").placeholder = "已收藏 " + length + " 部影片"
    } else if ($("menu").index == 2) {
      $("initialView").data = $("initialView").data.concat({
        link: homeMoviePage + shortCode,
        initialCover: {
          src: data.src
        },
        info: {
          text: data.info
        }
      })
      var length = LocalArcList.length;
      $("input").placeholder = "已归档 " + length + " 部影片"
    }
    LocalData.archive.push(data)
    LocalArcList.push(data.shortCode)

  } else if (mode == "del") {
    idx = LocalArcList.indexOf(data.shortCode)
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
        align: $align.center
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
        align: $align.justified
      },
      layout: function(make, view) {
        make.top.inset(120)
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
        make.bottom.inset(80)
        make.height.equalTo(30)
      },
      events: {
        tapped: function(sender) {
          $cache.set("adultCheck", {
            "adult": "true",
          })

          sender.super.remove()
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
        make.bottom.inset(20)
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
              var url = "pin://install?url=https://raw.githubusercontent.com/nicktimebreak/xteko/master/HList/HList.js&name=Hlist V" + afterVersion&icon+"=icon_135.png";
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
  var reg1 = /[sS][nN][iI][sS][\s\-]\d{3}|[aA][bB][pP][\s\-]\d{3}|[iI][pP][zZ][\s\-]\d{3}|[sS][wW][\s\-]\d{3}|[jJ][uU][xX][\s\-]\d{3}|[mM][iI][aA][dD][\s\-]\d{3}|[mM][iI][dD][eE][\s\-]\d{3}|[mM][iI][dD][dD][\s\-]\d{3}|[pP][gG][dD][\s\-]\d{3}|[sS][tT][aA][rR][\s\-]\d{3}|[eE][bB][oO][dD][\s\-]\d{3}|[iI][pP][tT][dD][\s\-]\d{3}/g;
  var reg2 = /[a-zA-Z]{3,5}[\s\-]\d{3}/g;
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

function main() {
  var check = $cache.get("adultCheck")
  if (!check) {
    checkAdult()
  }

  scriptVersionUpdate()
  var url = "https://tellme.pw/avmoo";
  $http.request({
    timeout: timeout,
    url: url,
    handler: function(resp) {
      match = /<strong><a href="(.*?)"/g.exec(resp.data)
      if (match) {
        $("input").placeholder = "载入中,请稍候..."
        timeout = 3
        page = 0
        initial()
        //$ui.action(match)
        homepage = match[1] + "/cn/";
        homeMoviePage = homepage + "movie/";
        homeStarPage = homepage + "star/";
        var detect = clipboardDetect()
        getInitial(detect.mode, detect.keyword)
        $("input").placeholder = "输入番号或演员进行搜索"
      } else {
        $ui.action({
          title: "无法找到主页",
          message: "请联系脚本作者",
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

LocalDataPath = "drive://HList.json"
main()