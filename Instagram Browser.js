const template = [{
    type: "button",
    props: {
      id: "casecover",
      radius: 25,
      borderWidth: 1,
      borderColor: $color("#eeeeee"),
      bgcolor: $color("white")
    },
    layout: function(make, view) {
      make.left.inset(15)
      make.top.bottom.inset(10)
      make.width.equalTo(50)
    },
    events: {
      tapped(sender) {
        // $("userList").header.animator.makeOpacity(0).animate(1.0)
        // $("userList").animator.moveY(-50).animate(1)
        $ui.animate({
          duration: 1,
          animation: function() {

            if ($("userList").header.alpha == 0) {

              $("userList").header.alpha = 1

            } else {
              $("userList").header.alpha = 0
            }
          },
          completion: function() {
            $ui.action("预留功能")
          }
        })
      }
    }

  }, {
    type: "label",
    props: {
      id: "caseusername",
      textColor: $color("#021c38"),
      font: $font("bold", 13)
    },
    layout: function(make, view) {
      make.left.equalTo($("casecover").right).offset(10)
      make.top.inset(2)
      make.height.equalTo(30)
      //make.right.inset(50)
    }
  }, {
    type: "label",
    props: {
      id: "casefullname",
      textColor: $color("#aaaaaa"),
      font: $font("bold", 14)
    },
    layout: function(make, view) {
      make.left.equalTo($("casecover").right).offset(10)
      make.top.inset(19)
      make.height.equalTo(30)
      make.width.equalTo(260)
      //make.right.inset(50)
    }
  },
  {
    type: "label",
    props: {
      id: "caseverified",
      textColor: $color("white"),
      font: $font(9),
      radius: 3,
      alpha: 1
    },
    layout: function(make) {
      //make.left.equalTo(150)
      make.left.equalTo($("caseusername").right).offset(4)
      make.top.inset(10)
      make.height.equalTo(15)
    }

  }, {
    type: "label",
    props: {
      id: "caselike",
      bgcolor: $color("#eeeeee"),
      textColor: $color("#888888"),
      font: $font(11),
      radius: 3,
      alpha: 0.7,
      hidden: false
    },
    layout: function(make, view) {
      make.left.equalTo($("casecover").right).offset(10)
      make.top.equalTo($("casefullname").bottom).offset(-5)
      make.height.equalTo(15)
      make.width.equalTo(63)
    }
  },
  {
    type: "button",
    props: {
      id: "baseadd",
      bgcolor: $color("clear")
    },
    layout: function(make, view) {
      make.top.bottom.inset(20)
      make.right.inset(5)
      make.width.equalTo(view.height)
    },
    events: {
      tapped(sender) {
        $device.taptic(0);
        if (sender.info.user.is_private) {
          $ui.toast("❌ 不支持浏览私密账户")
          var data = $("userList").data;
          data[0].rows[sender.info.idx].baseadd.alpha = 0.3;
          $("userList").data = data
        } else {

          updateLocalUserData("add", sender.info.user);
          var data = $("userList").data
          data[0].rows[sender.info.idx].baseadd.title = "❤️"
          data[0].rows[sender.info.idx].baseadd.alpha = 1
          $("userList").data = data
        }
      }
    }
  }
]
$ui.render({
  props: {
    title: "Instagram Browser",
    titleColor: $color("#021c38"),
    iconColor: $color("#bbbbbb"),
    //bgcolor: $color("black")
  },
  views: [{
      type: "view",
      props: {
        id: "preinfo"

      },
      views: [{
        type: "text",
        props: {
          text: "Designed by Nicked.\n\nBased on Wind.",
          textColor: $color("#CCCCCC"),
          font: $font(10),
          align: $align.center
        },

        layout: function(make, view) {
          make.top.inset(40)
          make.height.equalTo(100)
          make.width.equalTo(375)
        }
      }, {
        type: "image",
        props: {
          src: "https://i.loli.net/2017/11/06/59ffebf2eb071.jpeg",
          radius: 25,
          alpha: 0.8,
          align: $align.center,
        },
        layout: function(make, view) {
          make.size.equalTo($size(50, 50))
          make.top.inset(100)
          make.left.inset(162)
        }

      }, ]
    },
    {
      type: "view",
      props: {
        id: "mainPage",

      },
      views: [{
          type: "text",
          props: {
            id: "follow", //关注用户数
            bgcolor: $color("white"),
            textColor: $color("#aaaaaa"),
            font: $font(15),
            selectable: false,
            scrollEnabled: false,
            //insets: $insets(0, 10, 0, 0)
          },
          layout: function(make) {
            make.left.top.inset(5)
            make.height.equalTo(30)
          }
        }, {
          type: "button",
          props: {
            id: "back",
            title: "返回",
            font: $font(13),
            bgcolor: $color("#AAAAAA"),
            hidden: true,
            titleColor: $color("white")
          },
          layout: function(make) {
            make.right.inset(6)
            make.top.inset(10)
            make.height.equalTo(22)
            make.width.equalTo(40)
          },
          events: {
            tapped: function(sender) {
              loadLocalUserData();
              sender.hidden = true;
              $("tab").hidden = false;
              $("quick").hidden = false;
              $("keyword").text = "";
              $("keyword").blur();
            }

          }

        },
        {
          type: "list",
          props: {
            id: "userList",
            rowHeight: 70,
            stickyHeader: true,
            //hidden: true,
            bgcolor: $color("clear"),
            actions: [{
              title: "delete",
              handler: function(sender, indexPath) {
                if (homePageMode == "user") {
                  $device.taptic(0)
                  updateLocalUserData("del", indexPath.row)
                }
              }
            }, {
              title: "分享",
              handler: function(sender, indexPath) {
                $device.taptic(0);
                var username = $("userList").data[0].rows[indexPath.row].caseusername.text;
                $share.sheet("https://www.instagram.com/" + username)
              }
            }],
            data: [{
              title: "",
              rows: []
            }],
            template: template,
            footer: {
              type: "label",
              props: {
                text: "Version: 1.0",
                lines: 0,
                height: 100,
                font: $font(10),
                textColor: $color("#AAAAAA"),
                align: $align.center
              }
            },
            header: {
              type: "view",
              props: {
                height: 45,
                bgcolor: $color("white"),
                //hidden: true
              },
              views: [{
                type: "input",
                props: {
                  id: "keyword",
                  placeholder: "输入用户 ID 进行搜索",
                  stickyHeader: false,
                  hidden: false,
                  font: $font(13),
                  clearsOnBeginEditing: false,
                  bgcolor: $color("#f3f3f3"),
                  radius: 10
                },
                layout: function(make) {
                  make.left.inset(6)
                  make.right.inset(6)
                  make.top.inset(5)
                  make.height.equalTo(30)
                },
                events: {
                  changed: function(sender) {
                    if (sender.text.length > 0) {
                      $("quick").hidden = true
                    } else {
                      $("quick").hidden = false
                    }

                    $("keyword").textColor = $color("black")
                  },
                  returned: function(sender) {
                    sender.blur();

                    if (sender.text.length > 0) {
                      $("quick").hidden = true;
                      homePageMode = "search";
                      $("back").hidden = false;
                      $('tab').hidden = true;
                      search(sender.text);
                    }
                  }
                }
              }, {
                type: "button",
                props: {
                  //title: "导入",
                  id: "quick",
                  icon: $icon("109", $color("#bbbbbb"), $size(20, 20)),
                  bgcolor: $color("clear"),
                  //titleColor: $color("#aaaaaa"),
                  //radius: 8
                },
                layout: function(make, view) {
                  make.top.inset(10)
                  make.right.inset(10)
                },
                events: {
                  tapped(sender) {

                    quickAdd($clipboard.link)
                    $("keyword").blur()

                  }
                }
              }]
            }

          },
          layout: function(make) {
            make.top.inset(35)
            make.left.right.bottom.inset(0)
          },
          events: {
            didSelect: function(sender, indexPath, data) {
              $("keyword").blur();
              var title = data.info.username;
              getUserHomePageJson("https://www.instagram.com/" + data.info.username, "", indexPath.row);
              showPhoto(title);
            }
          }

        }
      ],
      layout: $layout.fill
    },
    {
      type: "view",
      props: {
        id: "favPage",
        hidden: true

      },
      layout: $layout.fill,
      views: [{
          type: "text",
          props: {
            id: "followpost", //关注用户数
            bgcolor: $color("white"),
            textColor: $color("#aaaaaa"),
            font: $font(15),
            selectable: false,
            scrollEnabled: false,
            text: "test"
            //insets: $insets(0, 10, 0, 0)
          },
          layout: function(make) {
            make.left.top.inset(5)
            make.height.equalTo(30)
          }
        },
        {
          type: "list",
          props: {
            id: "postList",
            rowHeight: $device.info.screen.width,
            bgcolor: $color("clear"),
            actions: [{
              title: "delete",
              handler: function(sender, indexPath) {
                updateLocalPostData("del", indexPath.row)
              }
            },{
              title: "分享链接",
              handler: function(sender, indexPath) {
                $device.taptic(0);
               code= $("postList").data[indexPath.row].code;
            
                $share.sheet("https://www.instagram.com/p/" + code)
              }
            }],
            template: [{
              type: "image",
              props: {
                id: "postCover"
              },
              layout: $layout.fill
            }, {
              type: "label",
              props: {
                id: "postInfo",
                bgcolor: $rgba(0, 0, 0, 0.5),
                textColor: $color("white"),
                align: $align.center,
                font: $font(14),
                autoFontSize: true
              },
              layout: function(make) {
                make.left.right.bottom.inset(0)
                make.height.equalTo(35)
              }
            }, {
              type: "label",
              props: {
                id: "detailType",
                bgcolor: $color("clear"),
                align: $align.right,
                font: $font(14)
              },
              layout: function(make) {
                make.left.right.bottom.inset(0)
                make.height.equalTo(35)
              }
            }]
          },
          layout: function(make) {
            make.top.equalTo($("followpost").bottom).offset(10)
            make.left.right.bottom.inset(0)
          },
          events: {
            didSelect: function(sender, indexPath, data) {
              $ui.toast("加载中...", 100);
              getPostMediaUrls(data.info.code)
            },
          }
        }
      ]
    }, {
      type: "tab",
      props: {
        id: "tab",
        hidden: false,
        items: ["关注", "收藏"],
        tintColor: $color("#aaaaaa")
      },
      layout: function(make) {
        make.right.inset(10)
        make.top.equalTo($("follow").buttom).offset(10)
        make.height.equalTo(22)
        //make.width.equalTo(40)
      },
      events: {
        changed: function(sender) {
          if (sender.index == 1) {
            homePageMode = "post";
            $("favPage").hidden = false;
            $("mainPage").hidden = true;
            loadLocalPostData()
          } else if (sender.index == 0) {
            homePageMode = "user";
            $("favPage").hidden = true;
            $("mainPage").hidden = false
          }
        }

      } //ev

    }, //tab
  ],
  layout: $layout.fill
})

function showPhoto(name) {
  $ui.push({
    props: {
      title: name,
      bgcolor: $color("white")
    },
    views: [{
        type: "scroll",
        props: {
          scrollEnabled: true,
          alwaysBounceVertical: true,
          showsVerticalIndicator: true,

        },
        layout: function(make, view) {
          make.top.left.right.inset(0)
          make.height.equalTo(20000)
        },
        events: {
          didReachBottom(sender) {
            if (mediaData.length == userPosted) {
              $device.taptic(0);
              sender.endFetchingMore();
            } else {
              $ui.toast("加载中...", 100)
              $thread.background({
                handler: function() {

                  getShortCode();
                }
              });
            }
          }
        },
        views: [

          {
            type: "image",
            props: {
              id: "showimage", //头像
              //src: "https://scontent-lga3-1.cdninstagram.com/t51.2885-19/10508054_598139606950922_1845033816_a.jpg",
              borderWidth: 2,
              borderColor: $color("#eeeeee"),
              bgcolor: $color("clear"),
              radius: 45
            },
            layout: function(make, view) {
              make.top.left.inset(20)
              make.height.width.equalTo(90)

            }

          }, {
            type: "label",
            props: {
              id: "showname", //名字
              font: $font("bold", 15),
              textColor: $color("#021c38"),
              bgcolor: $color("clear"),
              editable: false,
              //insets: $insets(0, 0, 0, 0)
            },
            layout: function(make, view) {
              var preView = $("showimage")
              make.top.equalTo(preView.bottom).offset(10)
              make.left.equalTo(preView.left).offset(0)
              //make.width.equalTo(view.super)
              make.height.equalTo(20)

            }

          }, {
            type: "label",
            props: {
              id: "showverified", //认证
              textColor: $color("black"),
              font: $font(10),
              text: "  🌐",
              hidden: true
            },
            layout: function(make, view) {
              var preView = $("showname")
              make.top.equalTo(preView.top)
              make.left.equalTo(preView.right)
              //make.width.equalTo(view.super)
              make.height.equalTo(20)

            }

          }, {
            type: "label", //标题
            props: {
              text: "帖子" + "              " + "关注者" + "              " + "关注",
              font: $font(13),
              textColor: $color("#aaaaaa")
            },
            layout: function(make, view) {
              var prewView = $("showimage")
              make.top.equalTo(prewView.top).offset(30)
              make.left.equalTo(prewView.right).offset(35)
            }

          }, {
            type: "text",
            props: {
              //text: "帖子",
              id: "userpost",
              font: $font("bold", 16),
              textColor: $color("#021c38"),
              //bgcolor:$color("blue"),
              insets: $insets(0, 0, 0, 0),
              align: $align.center,
              scrollEnabled: false
              //hidden:true
            },
            layout: function(make, view) {
              var prewView = $("showimage")
              make.top.equalTo(prewView.top).offset(7)
              make.left.equalTo(prewView.right).offset(8)
              make.width.equalTo(80)
              make.height.lessThanOrEqualTo(350)
            }

          }, {
            type: "text", //信息
            props: {
              //text: "关注者",
              id: "userfollowed",
              font: $font("bold", 16),
              textColor: $color("#021c38"),
              //bgcolor:$color("blue"),
              insets: $insets(0, 0, 0, 0),
              align: $align.center,
              scrollEnabled: false
              //hidden:true
            },
            layout: function(make, view) {

              make.top.equalTo($("showimage").top).offset(7)
              make.left.equalTo($("userpost").right).offset(3)
              make.width.equalTo(80)
              make.height.lessThanOrEqualTo(350)
            }

          }, {
            type: "text", //信息
            props: {
              //text: "关注",
              id: "userfollows",
              font: $font("bold", 16),
              textColor: $color("#021c38"),
              //bgcolor:$color("blue"),
              insets: $insets(0, 0, 0, 0),
              align: $align.center,
              scrollEnabled: false
              //hidden:true
            },
            layout: function(make, view) {

              make.top.equalTo($("showimage").top).offset(7)
              make.left.equalTo($("userfollowed").right).offset(4)
              make.width.equalTo(80)
              make.height.lessThanOrEqualTo(350)
            }

          }, {
            type: "button", //关注按钮
            props: {
              title: "关注",
              id: "followButton",
              font: $font("bold",15),
              //titleColor: $color("white"),
              bgcolor: $color("clear"),
              radius: 5
            },
            layout: function(make, view) {

              make.top.equalTo($("showimage").top).offset(55)
              make.width.equalTo(220)
              make.height.equalTo(25)
              make.left.equalTo($("userpost").left).offset(12)
            },
            events: {

              tapped(sender) {
                $device.taptic(0);
                if (sender.info.data.is_private) {
                  $ui.toast("❌ 不支持浏览私密账户")

                } else {

                  updateLocalUserData("add", sender.info.data);
                  $("followButton").title = "已关注"
                  $("followButton").bgcolor = $color("#eeeeee")
                  $("followButton").titleColor = $color("#aaaaaa")
                  var data = $("userList").data
                  data[0].rows[sender.info.idx].baseadd.title = "❤️"
                  data[0].rows[sender.info.idx].baseadd.alpha = 1
                  $("userList").data = data
                }

              }

            }

          },
          {
            type: "text",
            props: {
              id: "biography",
              //text: "ceshi",
              editable: false,
              font: $font(13),
              textColor: $color("black"),
              bgcolor: $color("clear"),
              align: $align.left,
              insets: $insets(0, 0, 0, 0),
              scrollEnabled: false
            },
            layout: function(make, view) {
              make.left.equalTo($("showname").left).offset(-5)
              make.top.equalTo($("showname").bottom).offset(5)
              make.width.equalTo(350)
            }

          }, {
            type: "button",
            props: {
              id: "externalUrl",
              //title: "user website",
              titleColor: $color("#3797f1"),
              font: $font(13),
              //titleEdgeInsets: $insets(0,0,0,0),
              bgcolor: $color("clear")
            },
            events: {
              tapped(sender) {
                $safari.open({
                  url: sender.title,
                  //entersReader: true,
                  height: 360,
                  handler: function() {

                  }
                })
              }
            }
          }, {
            type: "button",
            props: {
              id: "fanyi",
              title: "查看翻译",
              font: $font("bold", 10),
              titleColor: $color("black"),
              titleEdgeInsets: $insets(0, 0, 0, 0),
              bgcolor: $color("clear"),
              hidden: true
            },
            layout: function(make, view) {
              make.top.equalTo($("biography").bottom).offset(20)
              make.left.equalTo($("biography").left).offset(5)
              make.width.lessThanOrEqualTo(350)
              make.height.equalTo(25)
            },
            events: {
              tapped(sender) {
                if (sender.title == "查看翻译") {
                  Trans($("biography").text, "biography", "fanyi")
                } else {
                  $("biography").text = userBiography
                  sender.title = "查看翻译"
                }
              }
            }
          },
          {
            type: "matrix",
            props: {
              id: "show",
              columns: 3,
              spacing: 1,
              square: true,
              bgcolor: $color("#eeeeee"),
              template: [{
                  type: "image",
                  props: {
                    id: "cover"
                  },
                  layout: $layout.fill
                },
                {
                  type: "label",
                  props: {
                    id: "detail",
                    font: $font(10),
                    align: $align.left,
                    textColor: $color("white"),
                    bgcolor: $color("clear"),
                    shadowColor: $color("black"),
                    alpha: 0.9,
                    autoFontSize: true
                  },
                  layout: function(make, view) {

                    make.left.inset(2)
                    make.bottom.inset(0)
                    make.height.equalTo(15)
                  }
                },
                {
                  type: "label",
                  props: {
                    id: "detailType",
                    font: $font(10),
                    align: $align.right,
                    textColor: $color("white"),
                    bgcolor: $color("clear"),
                    shadowColor: $color("black"),
                    alpha: 0.7,
                    autoFontSize: true
                  },
                  layout: function(make, view) {
                    make.bottom.inset(0)
                    make.right.inset(2)
                    make.height.equalTo(15)
                  }
                },
              ]
            },
            //layout: $layout.fill,
            /*layout: function(make, view) {
              var t = $device.info.screen.width
              make.height.equalTo(t - 100)
              make.left.right.bottom.inset(0)
            },*/
            events: {
              didSelect: function(sender, indexPath, data) {
                $ui.toast("加载中...", 100);
                getPostMediaUrls(data.info.code)
              },
              didReachBottom(sender) {
                if (mediaData.length == userPosted) {
                  $device.taptic(0);
                  sender.endFetchingMore();
                } else {
                  $ui.toast("加载中...", 100)
                  $thread.background({
                    handler: function() {
                      getShortCode();
                    }
                  });
                }
              }
            }

          }

        ]
      }

    ]
  })
}

function postDetailView(code, scale) {
  selectCode = code;
  var data = mediaData[code]["media"];
  var items = [];
  data.map(function(i) {
    if (i.video) {
      items.push({
        type: "video",
        props: {
          src: i.video,
          poster: i.image
        }
      })
    } else {
      items.push({
        type: "image",
        props: {
          src: i.image
        }
      })
    };
  });
  $ui.push({
    type: "view",
    props: {
      title: "详情"
    },
    views: [{
      type: "list",
      layout: $layout.fill,
      events: {
        rowHeight: function(sender, indexPath) {
          if (indexPath.row == 0) {
            return 375 / scale
          } else if (indexPath.row == 1) {
            return 60
          } else if (indexPath.row == 2) {
            return 200
          }
        }
      },
      props: {
        id: "content",
        bgcolor: $color("white"),
        showsVerticalIndicator: false,
        data: [{
            rows: [{
                type: "view",
                layout: $layout.fill,
                views: [{
                    type: "gallery",
                    props: {
                      id: "detail",
                      items: items
                    },
                    layout: $layout.fill
                  },
                  {
                    type: "view",
                    props: {
                      bgcolor: $color("clear")
                    },
                    layout: function(make) {
                      make.top.left.bottom.inset(0)
                      make.width.equalTo(20)
                    }
                  }
                ]
              }, //row2
              {
                type: "view",
                layout: $layout.fill,
                views: [{
                    type: "button",
                    props: {
                      id: "usercover",
                      src: userCover,
                      radius: 25
                    },
                    layout: function(make) {
                      make.top.bottom.inset(5)
                      make.left.inset(15)
                      make.height.width.equalTo(50)
                    },
                    events:{
                      tapped(sender){
                        $device.taptic(0);
                        if(homePageMode == "post"){
                          //$ui.pop();
                          showPhoto(userFullName || userName);
                          getUserHomePageJson("https://www.instagram.com/" + userName)
                          
                        }else {
                          $ui.pop()
                        }
                      }
                    }
                  },
                  {
                    type: "label",
                    props: {
                      id: "username",
                      font: $font("bold", 13),
                      text: userName,
                      autoFontSize: true
                    },
                    layout: function(make) {
                      make.top.inset(5)
                      make.height.equalTo(20)
                      make.left.equalTo($("usercover").right).offset(10)
                      make.right.inset(10)
                    }
                  },
                  {
                    type: "label",
                    props: {
                      id: "count",
                      font: $font(12),
                      text: formatTime(mediaData[code]["postDate"]) + "\n" + mediaData[code]["likes"] + " ♥      " + mediaData[code]["comment"] + " ♬",
                      lines: 2,
                      autoFontSize: true
                    },
                    layout: function(make, view) {
                      make.top.equalTo($("username").bottom)
                      make.left.equalTo($("username").left)
                      make.right.inset(10)
                      make.bottom.inset(5)
                    }
                  },
                  {
                    type: "button",
                    props: {
                      id: "favorite",

                      title: LocalPostCode.indexOf(code) < 0 ? "收藏" : "已收藏",
                      font: $font(13),
                      titleColor: LocalPostCode.indexOf(code) < 0 ? $color("black") : $color("white"),
                      bgcolor: LocalPostCode.indexOf(code) < 0 ? $color("white") : $color('black'),
                      borderWidth: 1,
                      borderColor: LocalPostCode.indexOf(code) < 0 ? $color("black") : $color("white"),
                      radius: 5

                    },
                    layout: function(make, view) {

                      make.right.inset(20)
                      make.bottom.inset(7)
                      make.width.equalTo(45)
                      make.height.equalTo(25)
                    },
                    events: {

                      tapped(sender) {
                        $device.taptic(0);
                        var index = LocalPostCode.indexOf(code);
                        if (index < 0) {
                          $("favorite").title = "已收藏"
                          $("favorite").bgcolor = $color("black")
                          $("favorite").titleColor = $color("white")
                          $("favorite").borderColor = $color("white")
                          updateLocalPostData("add", code, true)
                        } else {
                          $("favorite").title = "收藏"
                          $("favorite").bgcolor = $color("white")
                          $("favorite").titleColor = $color("black")
                          $("favorite").borderColor = $color("black")
                          updateLocalPostData("del", index, true)
                        }

                      }

                    }
                  }
                ]
              }, // row3
              {
                type: "view",
                layout: $layout.fill,
                views: [

                  {
                    type: "text",
                    props: {
                      id: "caption",
                      text: mediaData[code]["caption"],
                      font: $font(14),
                      radius: 0,
                      showsVerticalIndicator: false,
                      editable: false,
                      scrollEnabled: false
                    },
                    layout: function(make, view) {
                      make.top.inset(0)
                      make.left.right.inset(10)
                      make.height.lessThanOrEqualTo(667)
                    }
                  },
                  {
                    type: "button",
                    props: {
                      id: "trans",
                      title: "查看翻译",
                      font: $font("bold", 10),
                      titleColor: $color("black"),
                      bgcolor: $color("clear"),
                      titleColor: $color("black")
                    },
                    layout: function(make) {
                      make.top.equalTo($("caption").bottom)
                      make.left.inset(10)
                      make.width.equalTo(60)
                      make.height.equalTo(20)
                    },
                    events: {
                      tapped(sender) {
                        if (sender.title == "查看翻译") {
                          Trans($("caption").text, "caption", "trans")
                        } else {
                          $("caption").text = mediaData[code]["caption"];
                          sender.title = "查看翻译"
                        }
                      }
                    }

                  },
                ]

              },
            ] //row end
          } // data end

        ]
      } //list props end

    }, {
      type: "button",
      props: {
        id: "save",
        title: "保存文件",
        bgcolor: $color("black"),
        titleColor: $color("white"),
        alpha: 0.9,
        font: $font("bold", 18),
        radius: 0,
      },
      layout: function(make, view) {
        make.left.bottom.inset(0)
        make.height.equalTo(40)
        make.width.equalTo(view.super).dividedBy(3)
      },
      events: {
        tapped(sender) {
          //userAction("save")
          mediaSaveAction("save")
        }
      }

    }, {
      type: "button",
      props: {
        id: "share",
        title: "分享文件",
        bgcolor: $color("black"),
        titleColor: $color("white"),
        alpha: 0.9,
        font: $font("bold", 18),
        radius: 0,
      },
      layout: function(make, view) {
        make.bottom.inset(0)
        make.left.equalTo($("save").right)
        make.height.equalTo(40)
        make.width.equalTo(view.super).dividedBy(3)
      },
      events: {
        tapped(sender) {
          //userAction("share")
          mediaSaveAction("share")
        }
      }

    }, {
      type: "button",
      props: {
        id: "link",
        title: "分享链接",
        bgcolor: $color("#eeeeed"),
        titleColor: $color("black"),
        alpha: 0.9,
        font: $font("bold", 18),
        radius: 0,
      },
      layout: function(make, view) {
        make.right.bottom.inset(0)
        make.height.equalTo(40)
        make.width.equalTo(view.super).dividedBy(3)
      },
      events: {
        tapped(sender) {
          mediaSaveAction("link")
        }
      }
    }, {
      type: "progress",
      props: {
        id: "progress",
        value: 0,
        trackColor: $color("clear"),
        alpha: 0.8,
        progressColor: $color("#e71d36"),
        userInteractionEnabled: false
      },
      layout: function(make, view) {
        make.bottom.left.right.inset(0)
        make.height.equalTo(43)
      }
    }]

  })
  $ui.toast("💡加载完成", 0.1)
}

function getUserHomePageJson(input, mode, row) {
  $ui.toast("加载中...", 100);
  $http.get({
    header: Header,
    url: input,
    timeout: 3,
    handler: function(resp) {
      if (!resp.data) {
        $ui.toast("❌ 连接失败，稍后再试", 2)
      }
      var match = /window\.\_sharedData\s=\s.+?(?=\;\<\/script\>)/g.exec(resp.data)[0].replace("window._sharedData = ", "");
      homePageJson = JSON.parse(match).entry_data.ProfilePage[0].user;
      if (homePageJson.is_private) {
        $ui.toast("暂不支持浏览私密账户", 1);
        return;
      };
      if (mode == "import") {
        homePageMode = "user";
        updateLocalUserData("add", homePageJson)
      } else {
        postDataFormate(homePageJson, "home", row)
      }
    }
  })
}

function search(keyword) {
  homePageMode = "search";
  $ui.loading(true)
  $ui.toast("搜索中...")
  //$("quick").title = "返回";
  var idx = 0;
  $http.get({
    url: "https://www.instagram.com/web/search/topsearch/?context=blended&query=" + $text.URLEncode(keyword),
    timeout: 3,
    handler: function(resp) {
      if (!resp.data) {
        $ui.toast("❌ 连接失败，稍后再试", 2)

      }

      var data = [{
        title: "",
        rows: []
      }];
      resp.data.users.map(function(i) {
        data[0].rows.push({
          info: i.user,
          casecover: {
            src: i.user.profile_pic_url,
          },
          caseusername: {
            text: i.user.username
          },
          casefullname: {
            text: i.user.full_name
          },
          caselike: {
            text: " " + likedCountFormat("♥ ", i.user.follower_count) + " "
          },
          caseprivate: {
            text: i.user.is_private ? " 私密账户 " : " 公开账户 ",
            bgcolor: i.user.is_private ? $color("#8e8e8e") : $color("#6194ce")
          },
          caseverified: {
            /*wztext: i.user.is_verified ? " 官方认证 " : " 未经认证 ",
            bgcolor: i.user.is_verified ? $color("#6194ce") : $color("#8e8e8e")*/
            text: i.user.is_verified ? " 🌐" : " ",
            //font: $font(11)
          },
          baseadd: {
            info: {
              idx: idx,
              user: i.user
            },
            hidden: false,
            title: LocalUserName.indexOf(i.user.username) > -1 ? "❤️" : (i.user.is_private ? "💔" : "🖤"),
            alpha: LocalUserName.indexOf(i.user.username) > -1 ? 1 : 0.3
          }
        })
        idx++;
      });
      $ui.loading(false)
      $ui.toast("", 0.01)
      //data[0].title = "搜索到 " + data[0].rows.length + " 条相关结果"
      $("follow").text = "搜索到 " + data[0].rows.length + " 条相关结果"
      $("userList").data = data
      //$("title").text = "  搜索到 " + data.length + " 条相关结果"
    }
  })
}

function formatTime(ns) {
  return new Date(parseInt(ns) * 1000).toLocaleString().replace(/:\d{1,2}$/, "").replace(/\//g, "-")
}

function getShortCode() {
  var queryvar = {
    "id": userID,
    "after": AfterID,
    "first": 12
  };
  var url = "https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables=" + encodeURI(JSON.stringify(queryvar));
  $http.get({
    header: Header,
    url: url,
    handler: function(resp) {
      postDataFormate(resp.data, "continue")
    }
  })
}

function postDataFormate(resdata, mode, row) {
  if (mode == "home") {
    //userVerified = resdata.is_verified? "  🌐":"";
    if (resdata.is_verified) {
      $("showverified").hidden = false
    }
    userName = resdata.username;
    userID = resdata.id;
    userFullName = resdata.full_name;
    userCover = resdata.profile_pic_url;
    userFollowed = resdata.followed_by.count;
    userPosted = resdata.media.count;
    userFollows = resdata.follows.count;
    userBiography = resdata.biography;
    userExternalUrl = resdata.external_url;
    $("showname").text = userFullName //+ userVerified
    $("userpost").text = likedCountFormat("", userPosted)
    $("userfollowed").text = likedCountFormat("", userFollowed);
    $("userfollows").text = likedCountFormat("", userFollows);
    $("showimage").src = userCover;

    // 更新 biography 布局
    if (userBiography) {
      $("biography").text = userBiography
      $("fanyi").hidden = false
    }
    //更新链接布局
    if (userExternalUrl) {
      $("externalUrl").title = userExternalUrl;
    }
    $("externalUrl").updateLayout(function(make, view) {
      make.left.equalTo($("showname").left).offset(0)
      make.width.lessThanOrEqualTo(view.super)
      make.height.equalTo(20)
      if (userBiography) {

        make.top.equalTo($("biography").bottom)

      } else {
        make.top.equalTo($("showname").bottom)
      }
    })
    //更新矩阵布局
    $("matrix").updateLayout(function(make) {
      if (userBiography) {
        make.top.equalTo($("fanyi").bottom).offset(10)
        make.height.greaterThanOrEqualTo($device.info.screen.height)
        make.left.right.inset(0)
        make.width.equalTo($device.info.screen.width)
      } else {
        make.top.equalTo($("externalUrl").bottom).offset(10)
      }
      make.height.greaterThanOrEqualTo($device.info.screen.height)
      make.left.right.inset(0)
      make.width.equalTo($device.info.screen.width)

      //make.left.right.bottom.inset(0);
    })
    $("followButton").info = {
      data: resdata,
      idx: row
    };
    if (LocalUserName.indexOf(userName) > -1) {
      $("followButton").title = "已关注"
      $("followButton").bgcolor = $color("#eeeeee")
      $("followButton").titleColor = $color("#aaaaaa")
    } else {
      $("followButton").title = "关注"
      $("followButton").bgcolor = $color("#3797f1")
      $("followButton").titleColor = $color("white")
    }
    //更新头像
    if (homePageMode == "user") {
      updateAvatar(row, userCover, userFollowed)
    }

    AfterID = resdata.media.page_info.end_cursor;
    NextPage = resdata.media.page_info.has_next_page;
    var media = resdata.media.nodes;
    shortCodeTask = [];
    media.map(function(i) {
      shortCodes.push(i.code);
      shortCodeTask.push(i.code);
      mediaData[i.code] = {
        "code": i.code,
        "postDate": i.date,
        "thumbnail": i.thumbnail_src,
        "comment": i.comments.count,
        "likes": i.likes.count,
        "type": i.__typename
      };
    });
  } else if (mode == "continue") {
    AfterID = resdata.data.user.edge_owner_to_timeline_media.page_info.end_cursor;
    NextPage = resdata.data.user.edge_owner_to_timeline_media.page_info.has_next_page;
    var media = resdata.data.user.edge_owner_to_timeline_media.edges;
    shortCodeTask = [];
    media.map(function(i) {
      var item = i.node
      shortCodes.push(item.shortcode);
      shortCodeTask.push(item.shortcode);
      mediaData[item.shortcode] = {
        "code": item.shortcode,
        "postDate": item.taken_at_timestamp,
        "thumbnail": item.thumbnail_src,
        "comment": item.edge_media_to_comment.count,
        "likes": item.edge_media_preview_like.count,
        "type": item.__typename
      };
    });
  }
  userHomePageDataPush()
}

function getPostMediaUrls(code,mode) {
  $http.get({
    header: Header,
    url: "https://www.instagram.com/p/" + code + "/?__a=1",
    timeout: 3,
    handler: function(resp) {
      if (!resp.data) {
        $ui.toast("❌ 连接失败，稍后再试", 2)
      }

      var res = resp.data.graphql.shortcode_media;
      if (!mediaData[code]) {
        mediaData[code] = {};
        mediaData[code]["comment"] = res.edge_media_to_comment.count;
        mediaData[code]["postDate"] = res.taken_at_timestamp;
        mediaData[code]["likes"] = res.edge_media_preview_like.count;
        userName = res.owner.username;
        userCover = res.owner.profile_pic_url;
        userFullName = res.owner.full_name;
      };
      mediaData[code]["caption"] = res.edge_media_to_caption.edges[0] ? res.edge_media_to_caption.edges[0].node.text : "";
      var items = [];
      if (res.edge_sidecar_to_children) {
        var json = res.edge_sidecar_to_children.edges;

        var imageSize = json[0].node.dimensions;
        json.map(function(i) {
          var video = i.node.is_video ? i.node.video_url : false;
          var image = i.node.display_url;
          items.push({
            "video": video,
            "image": image
          })
        });
        mediaData[code]["thumbnail"] = items[0].image
        mediaData[code]["type"] = "MultiMedia"
      } else {
        var json = resp.data.graphql.shortcode_media;
 $clipboard.text = JSON.stringify(json)
        var imageSize = json.dimensions;
        var video = json.is_video ? json.video_url : false;
        var image = json.display_url;
        if(video){
          mediaData[code]["type"] = "GraphVideo"
        }else{
          mediaData[code]["type"] = "GraphImage"
        }
        mediaData[code]["thumbnail"] = image
        items.push({
          "video": video,
          "image": image
        })
      };
      mediaData[code]["media"] = items;
      var scale = imageSize.width / imageSize.height;
      if(mode == "add"){
        mediaData[code]["code"] = code
        
        updateLocalPostData(mode,code)
     
      }else{
        postDetailView(code, scale)
      }
    }
  })
}
/*
//谷歌翻译
function Trans(keyword, positionID, buttonID) {
var url = "https://translate.google.cn/translate_a/single?client=it&dt=t&dt=rmt&dt=bd&dt=rms&dt=qca&dt=ss&dt=md&dt=ld&dt=ex&otf=3&dj=1&hl=zh_CN&ie=UTF-8&oe=UTF-8&sl=auto&tl=zh-CN&q=" + $text.URLEncode(keyword);
$(buttonID).title = "翻译中..."
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

    $(positionID).text = text.join("");
    $(buttonID).title = "显示原文"
  }
})
}*/

// 有道翻译
function Trans(keyword, positionID, buttonID) {
  $(buttonID).title = "翻译中..."
  $http.request({
    method: "POST",
    url: "http://m.youdao.com/translate",
    header: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_1 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 Mobile/15B93 Safari/604.1",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "http://m.youdao.com",
      "Referer": "http://m.youdao.com/translate?vendor=fanyi.web"
    },
    body: {
      type: "AUTO",
      inputtext: keyword
    },
    handler: function(resp) {

      var data = resp.data
      var match = /<ul\sid="translateResult">[\s\S]*?<\/ul>/gm.exec(resp.data)[0]
      $(positionID).text = /<li>[\s\S]*?<\/li>/gm.exec(match)[0].replace(/<li>/gm, "").replace(/<\/li>/gm, "");
      $(buttonID).title = "显示原文"
    }
  })
}

function mediaSaveAction(mode) {
  if ($("progress").value > 0) {
    return
  };
  $device.taptic(0);
  if (mode == "link") {
    $share.sheet("https://www.instagram.com/p/" + selectCode)
  } else {
    var i = mediaData[selectCode]["media"][$("detail").page];
    var url = i.video || i.image;
    var ext = url.split(".").pop();
    $http.download({
      header: Header,
      url: url,
      progress: function(bytesWritten, totalBytes) {
        var num = bytesWritten * 1.0 / totalBytes;
        $("progress").value = num
      },
      handler: function(resp) {
        $("progress").value = 0;
        if (ext == "mp4") {
          $share.sheet(resp.data)
        } else if (mode == "save" && ext != "mp4") {
          $photo.save({
            data: resp.data,
            handler: function(res) {
              res ? $ui.toast("✅已保存到相册", 1) : $ui.toast("❌保存失败", 1)
            }
          })
        } else if (mode == "share" && ext != "mp4") {
          $share.universal(resp.data)
        }
      }
    })
  }
}

function userAction(mode) {
  if ($("progress").value > 0) {
    return
  };
  $device.taptic(0);
  var i = mediaData[selectCode]["media"][$("detail").page];
  var url = i.video || i.image;
  var ext = url.split(".")[url.split(".").length - 1];
  $http.download({
    header: Header,
    url: url,
    progress: function(bytesWritten, totalBytes) {
      var num = bytesWritten * 1.0 / totalBytes;
      $("progress").value = num
    },
    handler: function(resp) {
      $("progress").value = 0;
      if (ext == "mp4") {
        $share.sheet(resp.data)
      } else if (mode == "save" && ext != "mp4") {
        $photo.save({
          data: resp.data,
          handler: function(res) {
            res ? $ui.toast("已保存到相册", 1) : $ui.toast("保存失败", 1)
          }
        })
      } else if (mode == "share" && ext != "mp4") {
        $share.universal(resp.data)
      }
    }
  })
}

function likedCountFormat(star, num) {
  if (num < 10000) {
    return star + num;
  } else if (num === 10000) {
    return star + num / 1000 + " k ";
  } else if (num > 10000 && num < 1000000) {
    return star + (num / 1000).toFixed(1) + " k ";
  } else if (num === 1000000) {
    return star + num / 1000000 + " m ";

  } else if (num > 1000000) {
    return star + (num / 1000000).toFixed(3) + " m ";
  }
}

function quickAdd(input) {
  var match1 = /^http.+?instagram.com\/[^\/]+?\/?$/g.exec(input);
  var match2 = /^http.+?instagram.com\/p\/.*\/?$/g.exec(input);
  if(match1){
    getUserHomePageJson(input, "import")
  }else if(match2){
    var code = /(\/p\/)(\w*)/gm.exec(input).pop()
    $ui.toast("导入中...",2)
    getPostMediaUrls(code,"add")
  }else{
    $ui.toast("❌ 请导入用户或帖子地址", 3);
    return;
  } 

  
}
// 列表更新
function updateLocalUserData(mode, data) {
  if (mode == "add") {
    if (LocalUserName.indexOf(data.username) > -1) {
      $ui.toast("❌ " + data.username + " 已在关注列表中", 1);
      return;
    }
    LocalUserName.push(data.username);
    LocalData.user.push({
      "username": data.username,
      "fullname": data.full_name,
      "cover": data.profile_pic_url,
      "liked": data.follower_count || data.followed_by.count,
      "private": data.is_private,
      "verified": data.is_verified,
    });
    var count = LocalData.user.length;
    $("follow").text = "已关注 " + count + " 位用户";
    $ui.toast("👀 已关注 " + data.username, 1);
    if (homePageMode == "user") {

      loadLocalUserData();

    }
  } else if (mode == "del") {
    //$("userList").delete(data);
    LocalData.user.splice(data, 1);
    $ui.toast("⚰️ 已取消对 " + LocalUserName[data] + " 的关注", 0.7);
    LocalUserName.splice(data, 1)
    //var listdata = $("userList").data
    var count = LocalData.user.length
    //listdata[0].title = "已关注 " + count + " 位用户";
    //$("userList").data = listdata
    $("follow").text = "已关注 " + count + " 位用户";
  };
  $drive.write({
    data: $data({
      string: JSON.stringify(LocalData)
    }),
    path: config
  });

}

function updateLocalPostData(mode, code, x) {
  if (mode == "add") {
    var data = mediaData[code];
    LocalPostCode.push(data.code)
    if (data.type == "GraphImage") {
      textType = "🏙"
    } else if (data.type == "GraphVideo") {
      textType = "▶️"
    } else {
      textType = "↔️"
    }
    LocalData.post.unshift({
      "username": userName,
      "code": data.code,
      "postDate": data.postDate,
      "thumbnail": data.thumbnail,
      "detailType": textType
    });
    $ui.toast("💡 已收藏", 0.5);
  } else if (mode == "del") {
    LocalPostCode.splice(code, 1);
    LocalData.post.splice(code, 1);
    $ui.toast("🗑 已取消收藏", 0.5)
    /*if (x) {
      $("postList").delete(code)
    }*/
  }
  $drive.write({
    data: $data({
      string: JSON.stringify(LocalData)
    }),
    path: config
  });
  loadLocalPostData()
}
/*function computeRows(str) {
// 计算 biography 行数
var strarray = str.split("\n")
var long = 0;
var short = 0;
for (var i = 0; i < strarray.length; i++) {
  if (strarray[i].length < 51) {
    short++;
  } else {
    long = long + Math.ceil(strarray[i].length / 51)
  }
}
rows = long + short
return rows
}*/

function userHomePageDataPush() {
  var data = [];
  shortCodeTask.map(function(i) {
    var item = mediaData[i];
    if (item.type == "GraphImage") {
      textType = "🏙"
    } else if (item.type == "GraphVideo") {
      textType = "▶️"
    } else {
      textType = "↔️"
    }
    data.push({
      info: item,
      cover: { src: item.thumbnail },
      detail: {
        text: "♥ " + item.likes
      },
      detailType: {
        text: textType
      },
    })
  });
  $ui.toast("💡 加载完成", 0.1);
  $("show").endFetchingMore();
  $("show").data = $("show").data.concat(data);
}

function loadLocalPostData() {
  LocalPostCode = [];
  var data = [];
  LocalData.post.map(function(i) {
    LocalPostCode.push(i.code)
    data.push({
      info: i,
      postCover: {
        src: i.thumbnail
      },
      postInfo: {
        text: i.username + "   " + formatTime(i.postDate),
        
      },
      detailType: {
          text: i.detailType
        },
        code: i.code
    })
  });
  //$ui.action(data)
  $("postList").data = data;
  $("followpost").text = "已收藏 " + data.length + " 条帖子";
}

function loadLocalUserData() {
  homePageMode = "user";
  //$("quick").title = "剪贴板导入";
  LocalUserName = [];
  LocalFullName = [];
  //var data = [];
  var data = [{
    title: "",
    rows: []
  }]
  LocalData.user.map(function(i) {
    LocalUserName.push(i.username)
    LocalFullName.push(i.fullname)
    data[0].rows.push({
      info: i,
      casecover: {
        src: i.cover
      },
      caseusername: {
        text: i.username
      },
      casefullname: {
        text: i.fullname || i.username
      },
      caselike: {
        text: " " + likedCountFormat("♥ ", i.liked) + " "
      },
      caseprivate: {
        text: i.private ? " 私密账户 " : " 公开账户 ",
        bgcolor: i.private ? $color("#8e8e8e") : $color("#6194ce")
      },
      caseverified: {
        /*text: i.verified ? " 官方认证 " : " 未经认证 ",
        bgcolor: i.verified ? $color("#6194ce") : $color("#8e8e8e")*/
        text: i.verified ? "🌐" : " ",
      },
      baseadd: {
        hidden: true
      }
    })
  })
  //$("title").text = "  已关注 " + data.length + " 位用户";
  //data[0].title = "已关注 " + LocalUserName.length + " 位用户";
  $("userList").data = data;
  $("follow").text = "已关注 " + LocalUserName.length + " 位用户";
  //$("keyword").text = "输入 id 搜索"

}


function updateAvatar(row, imageUrl, likecounts) {
  var file = $drive.read(config);
  var data = JSON.parse(file.string)
  if (data.user[row].cover != imageUrl || data.user[row].liked != likecounts) {
    data.user[row].cover = imageUrl
    data.user[row].liked = likecounts
    $drive.write({
      data: $data({
        string: JSON.stringify(data)
      }),
      path: config
    });
    main()
  }

}

function main() {
  var file = $drive.read(config);
  if (file) {
    LocalData = JSON.parse(file.string);
  } else {
    LocalData = { "user": [], "post": [] };
  }
  loadLocalUserData()
  loadLocalPostData()
}

var Header = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
  'Orgin': 'https://www.instagram.com/',
  'Referer': 'https://www.instagram.com/'
};

var config = "instagram-browser.json"
var shortCodes = [],
  mediaData = {};
$thread.background({
  handler: function() {
    main()
  }
})