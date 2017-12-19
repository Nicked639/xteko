version = 1.0
const filters = {
  "Time": {
    "全部视频": "a",
    "今日新增": "t",
    "本周新增": "w",
    "本月新增": "m"
  },
  "View": {
    "最近添加": "mr",
    "观看最多": "mv",
    "评论最多": "md",
    "喜欢最多": "tf"
  }
}
const filterName = {
  "a": "共计",
  "t": "今日新增",
  "w": "本周新增",
  "m": "本月新增",
  "mr": "Most Recent",
  "mv": "Most Viewed",
  "md": "Most Commented",
  "tr": "Top Rated",
  "tf": "Top Favorites"
}

const content = ["视频", "合集", "分类"]

const filterView = {
  type: "view",
  props: {
    id: "filter",
    radius: 7,
    bgcolor: $color("#5c98f9"),
    borderWidth: 2,
    borderColor: $color("white")
  },
  views: [{
    type: "list",
    props: {
      id: "filtersT",
      separatorHidden: true,
      rowHeight: 30,
      bgcolor: $color("white"),
      template: [{
        type: "label",
        props: {
          id: "filterLabel",
          bgcolor: $color("white"),
          font: $font(15),
          align: $align.center
        },
        layout: $layout.fill

      }],

      scrollEnabled: false
    },
    events: {
      didSelect(sender, indexPath, data) {
        if ($("player")) {
          $("player").stopLoading();
          $("player").remove()
        };
        $("search").text = "";
        mode = "Home";
        $device.taptic(0);
        $("filter").remove();
        $("videos").data = [];

        cacheFilters.Time = filters.Time[data.filterLabel.text];
        $cache.set("cacheFilters", cacheFilters);
        page = -1;
        getPostData(cacheFilters.Time, cacheFilters.View);
        $("videos").contentOffset = $point(0, 0);
      },

    },
    layout: function(make, view) {
      make.top.inset(0)
      make.right.inset(0)
      make.width.equalTo(120)
      make.height.equalTo(121)
    }
  }, {
    type: "list",
    props: {
      id: "filtersV",
      separatorHidden: true,
      rowHeight: 30,
      bgcolor: $color("white"),
      template: [{
        type: "label",
        props: {
          id: "filterLabel",
          bgcolor: $color("white"),
          font: $font(15),
          align: $align.center
        },
        layout: $layout.fill

      }],

      scrollEnabled: false
    },
    events: {
      didSelect(sender, indexPath, data) {
        if ($("player")) {
          $("player").stopLoading();
          $("player").remove()
        };
        $("search").text = "";
        mode = "Home";
        $device.taptic(0);
        $("filter").remove();
        $("videos").data = [];
        cacheFilters.View = filters.View[data.filterLabel.text];
        $cache.set("cacheFilters", cacheFilters);
        page = -1;
        getPostData(cacheFilters.Time, cacheFilters.View);
        $("videos").contentOffset = $point(0, 0);
      },

    },
    layout: function(make, view) {
      make.top.inset(122)
      make.right.inset(0)
      make.width.equalTo(120)
      make.height.equalTo(120)
    }
  }],
  layout: function(make, view) {
    make.top.inset(10)
    make.left.inset(15)
    make.width.equalTo(120)
    make.height.equalTo(0)
  }
}

const contentView = {
  type: "view",
  props: {
    id: "content",
    radius: 7,
    bgcolor: $color("white"),
    borderWidth: 2,
    borderColor: $color("white")
  },
  views: [{
    type: "list",
    props: {
      id: "contentList",
      separatorHidden: true,
      rowHeight: 30,
      bgcolor: $color("white"),
     // data:["1","2"],
      template: [{
        type: "label",
        props: {
          id: "contentLabel",
          bgcolor: $color("white"),
          font: $font(15),
          align: $align.center
        },
        layout: $layout.fill

      }],
      scrollEnabled: false,
      events:{
        
      }
    },
    layout: function(make, view) {
    make.top.inset(0)
    make.left.inset(0)
    make.width.equalTo(100)
    make.height.equalTo(200)
  }

  },{
    type: "button",
    props: {
      title: "收藏夹",
      id: "folder",
      titleColor: $color("#5c98f9"),
      bgcolor: $color("clear"),
      font: $font(15),
      borderWidth: 1,
      borderColor: $color("#5c98f9")
    },
    layout: function(make, view) {
      make.bottom.inset(10)
      make.left.right.inset(10)
      make.height.equalTo(25)
    },
    events: {
      tapped(sender) {
      
        if ($("player")) {
          $("player").stopLoading();
          $("player").remove()
        };
        $("search").text = "";
        $device.taptic(0);
        sender.super.remove();
        if ($("filter")) {
            $("filter").remove();
          }
        if (LocalFavList.length == 0) {
          $ui.alert("Get Some Favorites!")
          return
        }
        $("videos").contentOffset = $point(0, 0);
        mode = "Favorite";
        
        $("search").placeholder = "共有 " + LocalFavList.length + " 个收藏"
        $("videos").data = [];
        LocalData.favorite.map(function(i) {
          $("videos").data = $("videos").data.concat({
            interface: {
              src: i.image
            },
            title: {
              text: i.title
            },
            time: {
              text: i.time
            },
            videoUrl: i.video,
            duration: {
              text: i.duration
            },
            like: {
              text: i.like,
              alpha: 0.7

            },
            hd: {
              hidden: i.hd
            },
            favorite: {
              title: "😍",
              info: i
            }
          });
        });
      }
    }
  }],
  layout: function(make, view) {
    make.top.inset(10)
    make.right.inset(15)
    make.width.equalTo(100)
    make.height.equalTo(0)
  }
}

const template = [{
  type: "view",
  props: {
    bgcolor: $color("white"),
    radius: 7
  },
  views: [{
    type: "image",
    props: {
      id: "interface",
    },
    layout: function(make, view) {
      make.top.left.right.inset(10)
      make.bottom.inset(55)
    }
  }, {
    type: "label",
    props: {
      id: "title",
      textColor: $color("#5c98f9"),
      font: $font(15)
    },
    layout: function(make, view) {
      make.top.equalTo($("interface").bottom).offset(5)
      make.left.right.inset(10)
    }
  }, {
    type: "label",
    props: {
      id: "time",
      textColor: $color("black"),
      font: $font(13)
    },
    layout: function(make, view) {
      make.top.equalTo($("title").bottom).offset(3)
      make.left.inset(10)
    }
  }, {
    type: "label",
    props: {
      id: "like",
      textColor: $color("black"),
      font: $font(12),
    },
    layout: function(make, view) {
      make.top.equalTo($("title").bottom).offset(4)
      make.right.inset(10)
    }
  }, {
    type: "text",
    props: {
      id: "duration",
      textColor: $color("white"),
      bgcolor: $color("black"),
      alpha: 0.5,
      font: $font(12),
      radius: 3,
      align: $align.left,
      editable: false,
      scrollEnabled: false,
      insets: $insets(1, 1, 2, 1)
    },
    layout: function(make, view) {
      make.top.equalTo($("interface").bottom).offset(-23)
      make.right.equalTo($("interface").right).offset(-5)
    }
  }, {
    type: "text",
    props: {
      id: "hd",
      textColor: $color("black"),
      bgcolor: $color("#fcbc05"),
      text: "HD",
      alpha: 0.8,
      font: $font("bold", 12),
      radius: 3,
      align: $align.center,
      editable: false,
      scrollEnabled: false,
      insets: $insets(0, 0, 0, 0)
    },
    layout: function(make, view) {
      make.top.equalTo($("interface").top).offset(5)
      make.right.equalTo($("interface").right).offset(-5)
    }
  }, {
    type: "button",
    props: {
      id: "favorite",
      bgcolor: $color("clear"),
      title: "🤔",
      font: $font("bold", 15),
      titleColor: $color("white"),
      alpha: 0.9,
      radius: 6
    },
    layout: function(make, view) {
      make.top.equalTo($("like").top).offset(-3)
      make.left.equalTo($("time").right).offset(0)
      make.width.equalTo(30)
      make.height.equalTo(20)
    },
    events: {
      tapped(sender) {
        favButtonTapped(sender);
        //$ui.action(sender.info.time)
        //var data = $("videos").data;
          //data[0].rows[sender.info.idx].baseadd.alpha = 0.3;
          //$ui.action($props(data))
          //$("videos").data = data
      }
    }

  }],
  layout: $layout.fill
}]

$ui.render({
  props: {
    title: "Avgle",
    bgcolor: $color("#dddddd"),
    id: "Avgle"
  },
  views: [{
      type: "input",
      props: {
        id: "search",
        bgcolor: $color("#fdfdfd"),
        placeholder: "搜索",
        font: $font(15)
      },
      layout: function(make, view) {
        make.top.inset(10)
        make.height.equalTo(30)
        make.left.inset(75)
        make.right.inset(45)
      },
      events: {
        didBeginEditing: function(sender) {
          if ($("filter")) {
            $("filter").remove();
          }
          
          if ($("content")) {
            $("content").remove();
          }

        },
        changed(sender) {
          if ($("filter")) {
            $("filter").remove();
          }
          if ($("content")) {
            $("content").remove();
          }
        },
        returned(sender) {
          sender.blur();
          if (sender.text) {
            if ($("player")) {
              $("player").stopLoading();
              $("player").remove()
            };
            mode = "Search";
            var code = codeCorrectify(sender.text);
            if (code !== "none") {
              keyword = code;
              $("search").text = code
            } else {
              keyword = encodeURI(sender.text);
            }
            $("videos").contentOffset = $point(0, 0);
            $("videos").data = [];
            page = -1;
            getPostData(keyword, "")
          } else {
            mode = "Home",
              $("videos").contentOffset = $point(0, 0);
            $("videos").data = [];
            page = -1;
            getPostData(cacheFilters.Time, cacheFilters.View);
          }
        }
      }
    }, {
      type: "button",
      props: {
        id: "filterButton",
        bgcolor: $color("#dddddd"),
        src: "https://avgle.com/images/logo/logo.png"
      },
      layout: function(make, view) {
        make.top.inset(12)
        make.height.equalTo(25)
        make.width.equalTo(55)
        make.left.inset(14)
      },
      events: {
        tapped(sender) {
          $device.taptic(0)
          if ($("content")) {
            $("content").remove();
          }
          
          $("Avgle").add(filterView);

          var data = []
          Object.keys(filters.Time).map(function(i) {
            data.push({
              filterLabel: {
                text: i,
                textColor: cacheFilters.Time == filters.Time[i] ? $color("white") : $color("black"),
                bgcolor: cacheFilters.Time == filters.Time[i] ? $color("#5c98f9") : $color("white")
              }
            })
          })
          $("filtersT").data = data
          data = []
          Object.keys(filters.View).map(function(i) {
            data.push({
              filterLabel: {
                text: i,
                textColor: cacheFilters.View == filters.View[i] ? $color("white") : $color("balck"),
                bgcolor: cacheFilters.View == filters.View[i] ? $color("#5c98f9") : $color("white")
              }
            })
          })
          $("filtersV").data = data
          //$ui.action(data)
          $("filter").updateLayout(function(make) {
            make.height.equalTo(240)
          });

          $ui.animate({
            duration: 0.3,
            animation: function() {
              $("filter").relayout()
            }
          });
        }
      }

    }, {
      type: "button",
      props: {
        id: "contentButton",
        bgcolor: $color("#dddddd"),
        icon: $icon("067", $color("#ffffff"))
        //src:"https://avgle.com/images/logo/logo.png"
      },
      layout: function(make, view) {
        make.top.inset(12)
        make.height.equalTo(25)
        make.width.equalTo(26)
        make.right.inset(14)
      },
      events: {
        tapped(sender) {
          $device.taptic(0)
          if ($("filter")) {
            $("filter").remove();
          }
          $("Avgle").add(contentView);
          var data = []
          content.map(function(i) {
            data.push({
              contentLabel: {
                text: i,
                textColor: cacheContent == i ? $color("white") : $color("balck"),
                bgcolor: cacheContent == i ? $color("#5c98f9") : $color("white")
              }
            })
          })
          $("contentList").data = data
          
          //$ui.action(data)
          $("content").updateLayout(function(make) {
            make.height.equalTo(130)
          });

          $ui.animate({
            duration: 0.3,
            animation: function() {
              $("content").relayout()
            }
          });
        }
      }

    },
    {
      type: "matrix",
      props: {
        id: "videos",
        itemHeight: 250,
        columns: 1,
        spacing: 15,
        square: false,
        bgcolor: $color("#dddddd"),
        template: template,
      },
      layout: function(make, view) {
        make.left.right.bottom.inset(0),
          make.top.equalTo($("search").bottom).offset(5)
      },
      events: {
        didSelect(sender, indexPath, data) {
          if ($("filter")) {
            $("filter").remove()
          }
          var url = encodeURI(data.videoUrl);
          play(url, indexPath, data.interface.src)

        },
        didReachBottom(sender) {
          sender.endFetchingMore();
          if (mode == "Favorite") {
            return
          } else if (mode == "Search") {
            getPostData(keyword, "")
          } else {
            getPostData(cacheFilters.Time, cacheFilters.View);

          }
        },
        pulled(sender) {
          if ($("filter")) {
            $("filter").remove()
          }
          if ($("content")) {
            $("content").remove();
          }
          sender.super.super.views[0].text = "";
          page = -1
          mode = "Home"
          $("videos").data = []
          getPostData(cacheFilters.Time, cacheFilters.View);

        },
        willBeginDragging(sender) {
          startY = sender.contentOffset.y;

        },
        didEndDragging(sender) {
          endY = sender.contentOffset.y;
          if (Math.abs(endY - startY) > 150  ){
            if ($("filter")) {
            $("filter").remove();
          }
          if ($("content")) {
            $("content").remove();
          }
          if($("player")){
             $("player").stopLoading();
            $("player").remove()
          }
          }
        }

      }
    },
    //contentView
  ],
  layout: $layout.fill
})

function getPostData(filterT, filterV) {
  //$ui.toast("载入中...", 10);
  $ui.loading(true)
  page++;
  if (mode == "Search") {
    url = "https://api.avgle.com/v1/search/" + keyword + "/" + page + "?limit=10"
  } else {
    url = "https://api.avgle.com/v1/videos/" + page + "?limit=10&t=" + filterT + "&o=" + filterV;
  }
  var idx

  $http.request({
    url: url,
    timeout: 3,
    handler: function(resp) {
      //$ui.action(resp.data)
      var success = resp.data.success;
      if (!success || !resp.response) {
        $ui.alert("网络连接出错！");
        //$ui.toast("",0.1)
        return
      }
      var video_num = resp.data.response.total_videos
      if (video_num == 0) {
        $ui.alert("❌ 没有搜索结果！");
        $ui.loading(false);
        return
      }
      if (!resp.data.response.has_more && page > 0) {
        $ui.toast("已经到底了 🙈", 1);
        $ui.loading(false);
        return
      }
      var infos = resp.data.response.videos;
      //$ui.action(infos)
      infos.map(function(i) {
        $("videos").data = $("videos").data.concat({
          interface: {
            src: i.preview_url
          },
          title: {
            text: i.title
          },
          time: {
            text: formatTime(i.addtime)
          },
          videoUrl: i.video_url,
          duration: {
            text: formatDuration(i.duration)
          },
          like: {
            text: "❤️ " + i.likes + " 🖤 " + i.dislikes + " ▶️ " + i.viewnumber,
            alpha: 0.7
            /*i.likes == 0 && i.dislikes == 0 ? "🖤" : `❤️${Math.ceil(i.likes/(i.likes+i.dislikes)*100)}%`,
            alpha: i.likes == 0 && i.dislikes == 0 ? 0.5 : 1*/
          },
          hd: {
            hidden: i.hd == true ? false : true
          },
          favorite: {
            title: LocalFavList.indexOf(i.video_url) > -1 ? "😍" : "🤔",
            info: {
              title: i.title,
              image: i.preview_url,
              video: i.video_url,
              time: formatTime(i.addtime),
              duration: formatDuration(i.duration),
              like: "❤️ " + i.likes + " 🖤 " + i.dislikes + " ▶️ " + i.viewnumber,
              hd: i.hd == true ? false : true
            }
          }
        })
      })
      //$ui.toast("", 0.1);
      $ui.loading(false);
      if (mode == "Search" && page == 0) {
        $ui.toast("找到 " + video_num + " 个视频", 1);
        $("search").placeholder = "找到 " + video_num + " 个视频";
      } else {
        $("search").placeholder = filterName[filterT] + " " + video_num + " 个视频 "
      }

      $("videos").endRefreshing();
    }
  })
}

function formatDuration(ns) {
  var mins = Math.floor(ns / 60)
  var hours = mins > 60 ? Math.floor(mins / 60) : 0
  var seconds = Math.floor(((ns / 60) - mins) * 60)
  if (hours > 0) {
    mins = mins - 60 * hours
  }
  mins = mins.toString().length > 1 ? mins : `0${mins}`
  hours = hours.toString().length > 1 ? hours : `0${hours}`
  seconds = seconds.toString().length > 1 ? seconds : `0${seconds}`
  if (hours == "00") {
    return `${mins}:${seconds}`
  } else {
    return `${hours}:${mins}:${seconds}`
  }

}

function formatTime(ns) {
  var myTime = Math.floor(new Date() / 1000);
  var timeDiff = myTime - ns
  if (timeDiff / 60 < 60) {
    return Math.floor(timeDiff / 60) + " minutes ago"
  } else if (timeDiff / 3600 < 24) {
    return Math.floor(timeDiff / 3600) + " hours ago"
  } else {
    return Math.floor(timeDiff / 3600 / 25) + " days ago"
  }

}

function favButtonTapped(info) {
  if (info.title == "🤔") {
    info.title = "😍"
    addFav(info.info);
    $ui.toast("😍 已收藏！", 1)
  } else {
    info.title = "🤔"
    delFav(info.info);
    $ui.toast("🤔 已取消！", 1)
  }
  if (mode == "Favorite") {
      $("search").placeholder = "共有 " + LocalFavList.length + " 个收藏"
    }
}

function addFav(info) {
  LocalData.favorite.push(info);
  LocalFavList.push(info.video);
  writeCache();
}

function delFav(info) {
  idx = LocalFavList.indexOf(info.video);
  LocalData.favorite.splice(idx, 1);
  LocalFavList.splice(idx, 1)
  writeCache()
}

function writeCache() {
  $file.write({
    data: $data({ string: JSON.stringify(LocalData) }),
    path: LocalDataPath
  })
}

function clipboardDetect() {
  var str = $clipboard.text
  if (!str) {
    return false
  }
  var detect = ""
  var reg = /[sS][nN][iI][sS][\s\-]?\d{3}|[aA][bB][pP][\s\-]?\d{3}|[iI][pP][zZ][\s\-]?\d{3}|[sS][wW][\s\-]?\d{3}|[jJ][uU][xX][\s\-]?\d{3}|[mM][iI][aA][dD][\s\-]?\d{3}|[mM][iI][dD][eE][\s\-]?\d{3}|[mM][iI][dD][dD][\s\-]?\d{3}|[pP][gG][dD][\s\-]?\d{3}|[sS][tT][aA][rR][\s\-]?\d{3}|[eE][bB][oO][dD][\s\-]?\d{3}|[iI][pP][tT][dD][\s\-]?\d{3}|[cC][hH][nN][\s\-]?\d{3}/g;
  var match = str.match(reg);
  if (match) {
    detect = match[0];
  }
  keyword = codeCorrectify(detect)
  if (keyword == "none") {
    return false
  } else {
    return true
  }

}

function codeCorrectify(detect) {
  if (!detect) {
    return "none"
  } else {
    var s = /([a-zA-Z]{3,5})[\s\-]?(\d{3})/g.exec(detect)
    if (s) {
      return s[1] + "-" + s[2]
    } else {
      return detect
    }
  }

}

function play(url, indexPath, poster) {
  $ui.loading(true);
  $ui.toast("正在加载视频…", 10);
  $http.request({
    url: url,
    handler: function(resp) {
      $ui.loading(false);
      $ui.toast("", 0.1);
      var reg = /<video id[\s\S]*?<\/video>/g;
      var match = resp.data.match(reg);
      var videoUrl = /<source src="([\s\S]*?)" data/g.exec(match)[1]
      if (!videoUrl) {
        $ui.alert("❌ 视频加载失败！")
        return
      }

      if ($("player")) {
        $("player").stopLoading();
        $("player").remove()
      };
      $("videos").cell(indexPath).add({
        type: "video",
        props: {
          id: "player",
          src: videoUrl,
          poster: poster,
        },
        layout: function(make) {
          make.top.left.right.inset(10)
          make.bottom.inset(52)
        }
      });
    }
  })
}

function openURL(title, url) {
  $ui.push({
    props: {
      title: title
    },
    views: [{
      type: "web",
      props: {
        url: url
      },
      layout: $layout.fill
    }]
  })
}

function initial() {
  if ($file.read(LocalDataPath)) {
    LocalData = JSON.parse($file.read(LocalDataPath).string);
    LocalFavList = LocalData.favorite.map(i => i.video);

  } else {
    LocalData = { "favorite": [] };
    LocalFavList = [];
  };
  cacheFilters = $cache.get("cacheFilters") || { "Time": "a", "View": "mr" };
  cacheContent = $cache.get("cacheContent") || "视频";
}

function scriptVersionUpdate() {
  $http.get({
    url: "https://raw.githubusercontent.com/nicktimebreak/xteko/master/Avgle/updateInfo",
    handler: function(resp) {
      var afterVersion = resp.data.version;
      $ui.action(afterVersion)
      var msg = resp.data.msg;
      if (afterVersion > version) {
        $ui.alert({
          title: "检测到新的版本！V" + afterVersion,
          message: "是否更新?\n更新完成后请退出至扩展列表重新启动新版本。\n" + msg,
          actions: [{
            title: "更新",
            handler: function() {
              var url = "pin://install?url=https://raw.githubusercontent.com/nicktimebreak/xteko/master/Avgle/Avgle.js&name=Avgle" + afterVersion + "&icon=icon_135.png";
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

function main() {
  initial();
  page = -1;
  var search = clipboardDetect()
  if (!search) {
    mode = "Home";
    getPostData(cacheFilters.Time, cacheFilters.View);
  } else {
    mode = "Search";
    getPostData(keyword, "");
    $("search").text = keyword;
  }

}

LocalDataPath = "drive://Avgle.json";
scriptVersionUpdate()
main()