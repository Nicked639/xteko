$ui.render({
  props: {
    title: "Instagram",
    bgcolor: $color("#ffffff")
  },
  views: [{
      type: "input",
      props: {
        id: "keyword",
        stickyHeader: false,
        font: $font("Gill Sans", 15),
        clearsOnBeginEditing: true,
        bgcolor: $color("#eeeeee"),
        textColor: $color("#cccccc"),
        radius: 5
      },
      layout: function(make) {
        make.top.left.right.inset(5)
        make.height.equalTo(35)
      },
      events: {
        changed: function(sender) {
          $("quick").hidden = true
          $("keyword").textColor = $color("black")
        },
        returned(sender) {
          sender.blur();
          $("quick").hidden = false
          if (sender.text.length > 0) {
            homePageMode = "search";
            search(sender.text)
          }
        }
      }
    },
    {
      //已关注用户数
      type: "label", 
      props: {
        id: "title",
        stickyHeader: true,
        font: $font("Gill Sans", 15),
        textColor: $color("#cccccc")
      },
      layout: function(make) {
        make.top.equalTo(40)
        make.left.right.inset(5)
        make.height.equalTo(35)
      }
    }, {
      type: "button",
      props: {
        //title: "导入",
        id: "quick",
        icon: $icon("109", $color("#aaaaaa"), $size(20, 20)),
        bgcolor: $color("clear"),
        //titleColor: $color("#aaaaaa"),
        //radius: 8
      },
      layout: function(make, view) {
        make.top.equalTo(5)
        make.right.inset(0)
        make.height.equalTo(35)
        make.width.equalTo(50)
      },
      events: {
        tapped(sender) {
          if (homePageMode == "search") {
            loadLocalData()
            $("keyword").textColor = $color("#cccccc")
            //$("quick").title = "导入"
            $("quick").icon = $icon("109", $color("#aaaaaa"), $size(20, 20))
          } else {
            quickAdd($clipboard.link)
          }
        }
      }
    }, {
      type: "list",
      props: {
        id: "list",
        rowHeight: 70,
        bgcolor: $color("#eeeeee"),
        actions: [{
          title: "delete",
          handler: function(sender, indexPath) {
            if (homePageMode == "local") {
              $device.taptic(0)
              updateLocalData("del", indexPath.row)
            }
          }
        }],
        template: [{
            type: "image",
            props: {
              id: "casecover",
              radius: 25,
              borderWidth: 0,
              borderColor: $color("white")
            },
            layout: function(make, view) {
              make.left.top.bottom.inset(10)
              make.width.equalTo(50)
            },

          }, {
            type: "label",
            props: {
              id: "casename",
              textColor: $color("#021c38"),
              font: $font("Gill Sans", 20)
            },
            layout: function(make, view) {
              make.left.equalTo($("casecover").right).offset(10)
              make.top.inset(5)
              make.height.equalTo(30)
              //make.right.inset(50)
            }
          },
          /*{
            type: "label",
            props: {
              id: "caseprivate",
              textColor: $color("white"),
              font: $font(11),
              radius: 3,
              alpha: 0.7
            },
            layout: function(make) {
              make.left.equalTo($("casecover").right).offset(10)
              make.top.equalTo($("casename").bottom).offset(5)
              make.height.equalTo(18)
            }

          }, */
          {
            type: "label",
            props: {
              id: "caseverified",
              textColor: $color("white"),
              font: $font(11),
              radius: 3,
              alpha: 1
            },
            layout: function(make) {
              //make.left.equalTo(150)
              make.left.equalTo($("casename").right).offset(5)
              make.top.inset(15)
              make.height.equalTo(15)
            }

          }, {
            type: "label",
            props: {
              id: "caselike",
              bgcolor: $color("#021c38"),
              textColor: $color("white"),
              font: $font(11),
              radius: 3,
              alpha: 0.7
            },
            layout: function(make, view) {
              make.left.equalTo($("casecover").right).offset(10)
              make.top.equalTo($("casename").bottom).offset(5)
              make.height.equalTo(15)
              make.width.equalTo(63)
            }
          },
          {
            type: "button",
            props: {
              id: "baseadd",
              title: "➕",
              titleColor: $color("#008080"),
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.top.bottom.inset(20)
              make.right.inset(10)
              make.width.equalTo(view.height)
            },
            events: {
              tapped(sender) {
                $device.taptic(0);
                sender.alpha = 0.3;
                if (sender.info.is_private) {
                  $ui.toast("❌ 不支持浏览私密账户")
                } else {

                  updateLocalData("add", sender.info)
                }
              }
            }
          }
        ]
      },
      layout: function(make) {
        make.top.equalTo(75)
        make.left.right.bottom.inset(0)
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          var title = data.info.full_name || data.info.fullname;
          showPhoto(title);
          getHomePageJson("https://www.instagram.com/" + data.info.username)
        }
      }
    }
  ]
})

function showPhoto(name) {
  $ui.push({
    props: {
      title: name
    },
    views: [{
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
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          $ui.toast("加载中...", 100);
          getMediaUrl(data.info.code)
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
    }]
  })
}

function detailView(code, scale) {
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
      title: "Detail View"
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
              }, {
                type: "view",
                props: {
                  bgcolor: $color("clear")
                },
                layout: function(make) {
                  make.top.left.bottom.inset(0)
                  make.width.equalTo(20)
                }
              }]
            }, {
              type: "view",
              layout: $layout.fill,
              views: [{
                type: "image",
                props: {
                  id: "usercover",
                  src: userCover,
                  radius: 25
                },
                layout: function(make) {
                  make.top.bottom.inset(5)
                  make.left.inset(15)
                  make.height.width.equalTo(50)
                }
              }, {
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
              }, {
                type: "label",
                props: {
                  id: "count",
                  font: $font(12),
                  text: formatTime(mediaData[code]["postDate"]) + "\n" + mediaData[code]["likes"] + " 人点赞   " + mediaData[code]["comment"] + " 人留言",
                  lines: 2,
                  autoFontSize: true
                },
                layout: function(make, view) {
                  make.top.equalTo($("username").bottom)
                  make.left.equalTo($("username").left)
                  make.right.inset(10)
                  make.bottom.inset(5)
                }
              }]
            }, {
              type: "view",
              layout: $layout.fill,
              views: [{
                type: "button",
                props: {
                  id: "trans",
                  title: "显示译文",
                  bgcolor: $color("clear"),
                  font: $font(14),
                  titleColor: $color("#000091")
                },
                layout: function(make) {
                  make.top.inset(0)
                  make.left.inset(10)
                  make.width.equalTo(60)
                  make.height.equalTo(20)
                },
                events: {
                  tapped(sender) {
                    if (sender.title == "显示译文") {
                      Trans($("caption").text)
                    } else {
                      $("caption").text = mediaData[code]["caption"];
                      sender.title = "显示译文"
                    }
                  }
                }
              }, {
                type: "text",
                props: {
                  id: "caption",
                  text: mediaData[code]["caption"],
                  font: $font(14),
                  radius: 0,
                  showsVerticalIndicator: false,
                  editable: false
                },
                layout: function(make, view) {
                  make.top.equalTo($("trans").bottom)
                  make.bottom.left.right.inset(5)
                }
              }]
            }]
          }

        ]
      } //list props end

    }, {
      type: "button",
      props: {
        id: "save",
        title: "保存文件",
        bgcolor: $color("black"),
        titleColor: $color("white"),
        alpha: 0.8,
        font: $font("bold", 18),
        radius: 0,
      },
      layout: function(make, view) {
        make.left.bottom.inset(0)
        make.height.equalTo(40)
        make.width.equalTo(view.super).dividedBy(2)
      },
      events: {
        tapped(sender) {
          userAction("save")
        }
      }

    }, {
      type: "button",
      props: {
        id: "share",
        title: "分享文件",
        bgcolor: $color("black"),
        titleColor: $color("white"),
        alpha: 0.8,
        font: $font("bold", 18),
        radius: 0,
      },
      layout: function(make, view) {
        make.right.bottom.inset(0)
        make.height.equalTo(40)
        make.width.equalTo(view.super).dividedBy(2)
      },
      events: {
        tapped(sender) {
          userAction("share")
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
  $ui.toast("💡加载完成", 0.1)
}

function getHomePageJson(input, mode) {
  $ui.toast("加载中...", 100);
  $http.get({
    header: Header,
    url: input,
    handler: function(resp) {
      var match = /window\.\_sharedData\s=\s.+?(?=\;\<\/script\>)/g.exec(resp.data)[0].replace("window._sharedData = ", "");
      homePageJson = JSON.parse(match).entry_data.ProfilePage[0].user;
      if (homePageJson.is_private) {
        $ui.toast("暂不支持浏览私密账户", 1);
        return;
      };
      if (mode == "import") {
        homePageMode = "local";
        updateLocalData("add", homePageJson)
      } else {

        formatData(homePageJson, "home")
      }
    }
  })
}

function search(keyword) {
  homePageMode = "search";
  $ui.loading(true)
  $ui.toast("搜索中...")
  //$("quick").title = "返回";
  $("quick").icon = $icon("015", 
$color("#aaaaaa"), $size(20, 20))
  $http.get({
    url: "https://www.instagram.com/web/search/topsearch/?context=blended&query=" + $text.URLEncode(keyword),
    handler: function(resp) {
      var data = [];
      resp.data.users.map(function(i) {
        data.push({
          info: i.user,
          casecover: {
            src: i.user.profile_pic_url
          },
          casename: {
            text: i.user.username
          },
          caselike: {
            text: " " + likedCountFormat(i.user.follower_count) + " "
          },
          caseprivate: {
            text: i.user.is_private ? " 私密账户 " : " 公开账户 ",
            bgcolor: i.user.is_private ? $color("#8e8e8e") : $color("#6194ce")
          },
          caseverified: {
            /*text: i.user.is_verified ? " 官方认证 " : " 未经认证 ",
            bgcolor: i.user.is_verified ? $color("#6194ce") : $color("#8e8e8e")*/
            text: i.user.is_verified ? " 🌐" : " ",
            font: $font(11)
          },
          baseadd: {
            info: i.user,
            hidden: false,
            alpha: i.user.is_private || LocalUserName.indexOf(i.user.username) > -1 ? 0.3 : 1
          }
        })
      });
      $ui.loading(false)
      $ui.toast("",0.01)
      $("list").data = data
      $("title").text = "  搜索到 " + data.length + " 条相关结果"
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
    "first": 24
  };
  var url = "https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables=" + encodeURI(JSON.stringify(queryvar));
  $http.get({
    header: Header,
    url: url,
    handler: function(resp) {
      formatData(resp.data, false)
    }
  })
}

function formatData(resdata, mode) {
  if (mode == "home") {
    userName = resdata.username;
    userID = resdata.id;
    userFullName = resdata.full_name;
    userCover = resdata.profile_pic_url_hd;
    userFollowed = resdata.followed_by.count;
    userPosted = resdata.media.count;
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
  } else {
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
  pushData()
}

function getMediaUrl(code) {
  $http.get({
    header: Header,
    url: "https://www.instagram.com/p/" + code + "/?__a=1",
    handler: function(resp) {
      var res = resp.data.graphql.shortcode_media;
      mediaData[code]["caption"] = res.edge_media_to_caption.edges[0].node.text;
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
      } else {
        var json = resp.data.graphql.shortcode_media;
        var imageSize = json.dimensions;
        var video = json.is_video ? json.video_url : false;
        var image = json.display_url;
        items.push({
          "video": video,
          "image": image
        })
      };
      mediaData[code]["media"] = items;
      var scale = imageSize.width / imageSize.height;
      detailView(code, scale)
    }
  })
}

function Trans(keyword) {
  var url = "https://translate.google.cn/translate_a/single?client=it&dt=t&dt=rmt&dt=bd&dt=rms&dt=qca&dt=ss&dt=md&dt=ld&dt=ex&otf=3&dj=1&hl=zh_CN&ie=UTF-8&oe=UTF-8&sl=auto&tl=zh-CN&q=" + $text.URLEncode(keyword);
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

      $("caption").text = text.join("\n");
      $("trans").title = "显示原文"
    }
  })
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

function likedCountFormat(num) {
  if (num < 10000) {
    return " ♥ " + num;
  } else if (num === 10000) {
    return " ♥ " + num / 1000 + " k ";
  } else if (num > 10000 && num < 1000000) {
    return " ♥ " + (num / 1000).toFixed(1) + " k ";
  } else if (num === 1000000) {
    return " ♥ " + num / 1000000 + " m ";

  } else if (num > 1000000) {
    return " ♥ " + (num / 1000000).toFixed(1) + " m ";
  }
}

function quickAdd(input) {
  var match = /^http.+?instagram.com\/[^\/]+?\/?$/g.exec(input);
  if (!match) {
    $ui.toast("❌ 请导入用户主页地址", 1);
    return;
  } else {
    getHomePageJson(input, "import")

  }
}

function updateLocalData(mode, data) {
  if (mode == "add") {
    if (LocalUserName.indexOf(data.username) > -1) {
      $ui.toast("❌ " + data.username + " 已在关注列表中", 1);
      return;
    }
    LocalUserName.push(data.username);
    LocalData.push({
      "username": data.username,
      "fullname": data.full_name,
      "cover": data.profile_pic_url,
      "liked": data.follower_count || data.followed_by.count,
      "private": data.is_private,
      "verified": data.is_verified
    });
    $ui.toast("👀 已关注 " + data.username, 1)
  } else if (mode == "del") {
    $("list").delete(data);
    LocalData.splice(data, 1);
    $ui.toast("⚰️ 已取消对 " + LocalUserName[data] + " 的关注");
    LocalUserName.splice(data, 1)
  };
  $drive.write({
    data: $data({
      string: JSON.stringify(LocalData)
    }),
    path: config
  });
  if (homePageMode == "local") {
    loadLocalData()
  }
}

function pushData() {
  var data = [];
  shortCodeTask.map(function(i) {
    var item = mediaData[i];
    if (item.type.includes("Image")) {
      textType = "🏙"
    } else if (item.type.includes("Video")) {
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
      }
    })
  });
  $ui.toast("💡 加载完成", 0.1);
  $("show").endFetchingMore();
  $("show").data = $("show").data.concat(data);
}

function loadLocalData() {
  homePageMode = "local";
  //$("quick").title = "剪贴板导入";
  LocalUserName = [];
  var data = [];
  LocalData.map(function(i) {
    LocalUserName.push(i.username)
    data.push({
      info: i,
      casecover: {
        src: i.cover
      },
      casename: {
        text: i.username
      },
      caselike: {
        text: " " + likedCountFormat(i.liked) + " "
      },
      caseprivate: {
        text: i.private ? " 私密账户 " : " 公开账户 ",
        bgcolor: i.private ? $color("#8e8e8e") : $color("#6194ce")
      },
      caseverified: {
        /*text: i.verified ? " 官方认证 " : " 未经认证 ",
        bgcolor: i.verified ? $color("#6194ce") : $color("#8e8e8e")*/
        text: i.verified ? "🌐" : " ",
        font: $font(11)
      },
      baseadd: {
        hidden: true
      }
    })
  })
  $("list").data = data;
  $("title").text = "  已关注 " + data.length + " 位用户";
  $("keyword").text = "输入 id 搜索"

}

function main() {
  var file = $drive.read(config);
  if (file) {
    LocalData = JSON.parse(file.string);
    loadLocalData()
  } else {
    LocalData = [];
  }
}

var Header = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
  'Orgin': 'https://www.instagram.com/',
  'Referer': 'https://www.instagram.com/'
};

var config = "instagram-waterfall.json"
var shortCodes = [],
  mediaData = {};

main()