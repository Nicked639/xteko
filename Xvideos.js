var scale = 600 / 337;
const searchPreview = {
  type: "view",
  props: {
    id: "preview",
    borderWidth: 1,
    borderColor: $color("lightGray")
  },
  layout: function(make) {
    make.left.right.inset(10)
    make.top.equalTo(80)
    make.height.equalTo(180)
  },
  views: [{
    type: "list",
    props: {
      id: "previewList",
      rowHeight: 30,
      template: [{
        type: "text",
        props: {
          id: "title",
          font: $font("blod", 16),
          insets: $insets(0, 0, 5, 0),
          userInteractionEnabled: false
        },
        layout: function(make, view) {
          make.top.left.bottom.inset(5)
          make.width.equalTo(view.super).dividedBy(2)
        }
      }, {
        type: "label",
        props: {
          id: "count",
          bgcolor: $color("#7d7d7d"),
          textColor: $color("white"),
          font: $font(14),
          radius: 3
        },
        layout: function(make, view) {
          make.top.right.bottom.inset(5)
        }
      }]
    },
    layout: $layout.fill,
    events: {
      didSelect(sender, indexPath, data) {
        $device.taptic(0);
        $("input").text = searchKeyword = data.title.text;
        $("preview").remove();
        $("input").blur();
        searchPage = -1;
        getSearchVideoList()
      }
    }
  }]
}

const filters = {
  "sort": {
    "相关度": "relevance",
    "上传日期": "uploaddate",
    "评分": "rating",
    "时长": "length",
    "观看次数": "views"
  },
  "datef": {
    "不限": "all",
    "最近三天": "today",
    "本周": "week",
    "本月": "month",
    "最近三月": "3month",
    "最近六月": "6month"
  },
  "durf": {
    "不限": "allduration",
    "1-3分钟": "1-3min",
    "3-10分钟": "3-10min",
    "10-20分钟": "10-20min",
    "20分钟+": "20min_more"
  },
  "typef": {
    "直男": "straight",
    "男同": "gay",
    "人妖": "shemale"
  }
}

function refreshFilterData() {
  $("sort").data = Object.keys(filters.sort).map(function(i) {
    return {
      title: {
        text: i,
        textColor: searchFilters.sort == filters.sort[i] ? $color("red") : $color("black")
      }
    }
  })
  $("datef").data = Object.keys(filters.datef).map(function(i) {
    return {
      title: {
        text: i,
        textColor: searchFilters.datef == filters.datef[i] ? $color("red") : $color("black")
      }
    }
  })
  $("durf").data = Object.keys(filters.durf).map(function(i) {
    return {
      title: {
        text: i,
        textColor: searchFilters.durf == filters.durf[i] ? $color("red") : $color("black")
      }
    }
  })
  $("typef").data = Object.keys(filters.typef).map(function(i) {
    return {
      title: {
        text: i,
        textColor: searchFilters.typef == filters.typef[i] ? $color("red") : $color("black")
      }
    }
  })
}

function makeView(title, id, num) {
  return {
    type: "list",
    props: {
      id: id,
      info: id,
      rowHeight: 30,
      separatorHidden: true,
      scrollEnabled: true,
      selectable:true,
      header: {
        type: "label",
        props: {
          height: 30,
          text: "       " + title,
          textColor: $color("darkGray"),
          font: $font("bold", 16)
        }
      },
      template: [{
        type: "label",
        props: {
          id: "title",
          font: $font(14)
        },
        layout: function(make) {
          make.edges.insets($insets(0, 30, 0, 0))
        }
      }]
    },
    layout: function(make) {
      make.top.inset(0)
      make.height.equalTo(180)
      make.left.inset($device.info.screen.width / 4 * num)
      make.width.equalTo($device.info.screen.width / 4)
    },
    events: {
      didSelect(sender, indexPath, data) {
        switch (sender.info) {
          case "sort":
          $ui.alert("t")
            searchFilters.sort = filters.sort[data.title.text];
            break;
          case "datef":
            searchFilters.datef = filters.datef[data.title.text];
            break;
          case "durf":
            searchFilters.durf = filters.durf[data.title.text];
            break;
          case "typef":
            searchFilters.typef = filters.typef[data.title.text];
            break
        };
        $cache.set("searchFilters",searchFilters);
        refreshFilterData()
      }
    }
  }
}

const searchFilterView = {
  type: "view",
  props: {
    id: "searchFilterView"
  },
  layout: function(make) {
    make.top.left.right.inset(0)
    make.height.equalTo(0)
  },
  views: [
    makeView("排序方式", "sort", 0),
    makeView("日期", "datef", 1),
    makeView("时长", "durf", 2),
    makeView("类型", "typef", 3),
    {
      type: "button",
      props: {
        title: "重置条件",
        radius: 0,
        bgcolor: $color("white"),
        titleColor: $color("darkGray")
      },
      layout: function(make, view) {
        make.bottom.left.inset(0)
        make.height.equalTo(41)
        make.width.equalTo(view.super).dividedBy(2)
      },
      events: {
        tapped(sender) {
          sender.super.remove();
          searchFilters = { "sort": "relevance", "datef": "all", "durf": "allduration", "typef": "straight" };
$cache.clear("searchFilters");
          if (searchKeyword) {
            $device.taptic(0);
            searchPage = -1;
            getSearchVideoList()
          }
        }
      }
    }, {
      type: "button",
      props: {
        title: "应用条件",
        radius: 0,
        bgcolor: $color("white"),
        titleColor: $color("black")
      },
      layout: function(make, view) {
        make.bottom.right.inset(0)
        make.height.equalTo(41)
        make.width.equalTo(view.super).dividedBy(2)
      },
      events: {
        tapped(sender) {
          sender.super.remove();
          $cache.set("searchFilters", searchFilters);
          if (searchKeyword) {
            $device.taptic(0);
            searchPage = -1;
            getSearchVideoList()
          }
        }
      }
    }, {
      type: "view",
      props: {
        bgcolor: $color("darkGray")
      },
      layout: function(make) {
        make.bottom.left.right.inset(0)
        make.height.equalTo(1)
      }
    }
  ]
}

const searchVideoListView = {
  type: "list",
  props: {
    id: "searchVideoList",
    rowHeight: rowHeight(),
    separatorHidden: true,
    selectable: true,
    header: {
      type: "view",
      props: {
        height: 30
      },
      views: [{
        type: "input",
        props: {
          id: "input",
          bgcolor: $color("#ffffff"),
          textColor: $color("darkGray")
        },
        layout: function(make) {
          make.top.bottom.left.right.inset(5)
        },
        events: {
          didBeginEditing(sender) {
            $("inputBg").hidden = true;
          },
          didEndEditing(sender) {
            if (!sender.text) {
              $("inputBg").hidden = false
            };
            $("preview").remove();
          },
          changed(sender) {
            if (sender.text) {
              search(sender.text)
            } else {
              $("preview").remove()
            }
          },
          returned(sender) {
            sender.blur();
            $device.taptic(0);
            if (sender.text) {
              searchPage = -1;
              searchKeyword = sender.text;
              getSearchVideoList()
            } else {
              searchKeyword = null;
              $cache.remove("searchKeyword");
              searchPage = -1;
              getSearchVideoList()
            };
            $("preview").remove()
          }
        }
      }, {
        type: "label",
        props: {
          id: "inputBg",
          text: "输入关键字搜索...",
          font:$font(14),
          textColor: $color("#aaaaaa"),
        },
        layout: function(make) {
          make.top.bottom.inset(5)
          make.left.inset(15)
        }
      }, {
        type: "button",
        props: {
          title: "Filters",
          font:$font(14),
          bgcolor: $rgba(0,0,0,0.2),
          titleColor: $color("white"),
         
        },
        layout: function(make) {
          make.top.bottom.inset(5)
          make.right.inset(20)
          make.width.equalTo(60)
        },
        events: {
          tapped(sender) {
            $device.taptic(0);
            $("content").add(searchFilterView);
            refreshFilterData();
            $("searchFilterView").updateLayout(function(make) {
              make.height.equalTo(221)
            });
            $ui.animate({
              duration: 0.3,
              animation: function() {
                $("searchFilterView").relayout()
              }
            })
          }
        }
      }]
    },
    footer: {
      type: "label",
      props: {
        id: "footer",
        height: 40,
        text: "Loading...",
        align: $align.center,
        textColor: $color("#aaaaaa")
      }
    },
    template: [{
      type: "image",
      props: {
        id: "videoCover",
        borderWidth: 1,
        radius: 5
      },
      layout: function(make) {
        make.top.inset(10)
        make.left.right.inset(20)
        make.height.equalTo(($device.info.screen.width - 40) / scale)
      }
    }, {
      type: "label",
      props: {
        id: "videoTitle",
        textColor: $color("#424242"),
        font: $font("bold", 14),
        scrollEnabled: false,
        align: $align.center
      },
      layout: function(make) {
        make.left.right.inset(30)
        make.top.equalTo($("videoCover").bottom).offset(5)
        make.height.equalTo(20)
      }
    }, {
      type: "button",
      props: {
        id: "videoInfo",
        textColor: $color("white"),
        align: $align.center,
        font: $font(12),
        radius: 3
      },
      events: {
        tapped(sender) {
          videoInfoButtonTapped(sender.info[0]);
          var data = $("searchVideoList").data;
          data[0].rows[sender.info[1].row].videoInfo.bgcolor = $color("red");
          $("searchVideoList").data = data
        },
        longPressed(sender) {
          download(sender.sender.info[0].url,sender.sender.info[0].title)
        }
      },
      layout: function(make, view) {
        make.centerX.equalTo(view.super)
        make.top.equalTo($("videoTitle").bottom).offset(5)
        make.height.equalTo(20)
      }
    }, {
      type: "label",
      props: {
        id: "videoTag",
        bgcolor: $color("red"),
        textColor: $color("white"),
        font: $font("bold", 12),
        radius: 3,
        align: $align.center
      },
      layout: function(make) {
        make.top.inset(17.5)
        make.right.inset(30)
        make.width.equalTo(40)
        make.height.equalTo(20)
      }
    }]
  },
  events: {
    pulled(sender) {
      searchPage = -1;
      getSearchVideoList()
    },
    didReachBottom(sender) {
      $device.taptic(0);
      getSearchVideoList()
    },
    didSelect(sender, indexPath, data) {
     $("input").blur()
     if($("searchFilterView")){
       $("searchFilterView").remove()
     }
      play(data.url, indexPath)
    },
    willBeginDragging(sender) {
       if($("searchFilterView")){
       $("searchFilterView").remove()
     }
       $("input").blur()
      startY = sender.contentOffset.y;
      if ($("preview")) {
        $("preview").remove()
      }
    },
    didEndDragging(sender) {
      endY = sender.contentOffset.y;
      if (Math.abs(endY - startY) > 120 && $("player")) {
        $("player").pause()
        $("player").stopLoading();
        $("player").remove()
      }
    }
  },
  layout: $layout.fill
}

const localVideoListView = {
  type: "list",
  props: {
    id: "localFavVideoList",
    rowHeight: rowHeight(),
    separatorHidden: true,
    selectable: true,
    template: [{
      type: "image",
      props: {
        id: "videoCover",
        borderWidth: 1,
        radius: 5
      },
      layout: function(make) {
        make.top.inset(10)
        make.left.right.inset(20)
        make.height.equalTo(($device.info.screen.width - 40) / scale)
      }
    }, {
      type: "label",
      props: {
        id: "videoTitle",
        textColor: $color("#424242"),
        font: $font("bold", 14),
        scrollEnabled: false,
        align: $align.center
      },
      layout: function(make) {
        make.left.right.inset(30)
        make.top.equalTo($("videoCover").bottom).offset(5)
        make.height.equalTo(20)
      }
    }, {
      type: "button",
      props: {
        id: "videoInfo",
        bgcolor: $color("#6ba292"),
        textColor: $color("white"),
        align: $align.center,
        font: $font(12),
        radius: 3
      },
      events: {
        tapped(sender) {
          videoFavoriteUpdate("del", sender.info.i)
        },
        longPressed(sender) {
          download(sender.sender.info.url,sender.sender.info.name)
        }
      },
      layout: function(make, view) {
        make.centerX.equalTo(view.super)
        make.top.equalTo($("videoTitle").bottom).offset(5)
        make.height.equalTo(20)
      }
    }, {
      type: "label",
      props: {
        id: "videoTag",
        bgcolor: $color("red"),
        textColor: $color("white"),
        font: $font("bold", 12),
        radius: 3,
        align: $align.center
      },
      layout: function(make) {
        make.top.inset(17.5)
        make.right.inset(30)
        make.width.equalTo(40)
        make.height.equalTo(20)
      }
    }]
  },
  events: {
    didSelect(sender, indexPath, data) {

      
      play(data.url, indexPath)

    },
    willBeginDragging(sender) {
    
      startY = sender.contentOffset.y
    },
    didEndDragging(sender) {
      endY = sender.contentOffset.y;
      if (Math.abs(endY - startY) > 120 && $("player")) {
        $("player").pause();            
        $("player").stopLoading();
        $("player").remove()
      }
    }
  },
  layout: $layout.fill
}

const starCountryListView = {
  type: "matrix",
  props: {
    id: "starCountryList",
    columns: 2,
    spacing: 1,
    itemHeight: 60,
    template: [{
      type: "label",
      props: {
        id: "country",
        font: $font("blod", 13),
        autoFontSize: true
      },
      layout: function(make, view) {
        make.top.bottom.inset(0)
        make.left.inset(30)
        make.width.lessThanOrEqualTo($device.info.screen.width / 2 - 25)
      }
    }, {
      type: "label",
      props: {
        id: "count",
        bgcolor: $color("#7d7d7d"),
        textColor: $color("white"),
        radius: 3,
        font: $font(13),
        align: $align.center
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super)
        make.height.equalTo(15)
        make.left.equalTo($("country").right).offset(5)
        make.width.greaterThanOrEqualTo(15)
      }
    }]
  },
  layout: $layout.fill,
  events: {
    didReachBottom(sender) {
      sender.endFetchingMore();
      if (starCountryData) {
        sender.data = sender.data.concat(starCountryData.splice(0, 30))
      }
    },
    pulled(sender) {
      getStarCountryList()
    },
    didSelect(sender, indexPath, data) {
      $device.taptic(0);
      starListView(data.country.text);
      getStarList(data.url)
    }
  }
}

const channelListView = {
  type: "matrix",
  layout: $layout.fill,
  props: {
    id: "channelList",
    columns: 2,
    spacing: 10,
    itemHeight: rowHeight(2, 10),
    separatorHidden: true,
    selectable: false,
    template: [{
      type: "image",
      props: {
        id: "channelCover",
        borderWidth: 0.5,
        radius: 3
      },
      layout: function(make) {
        make.top.left.right.inset(0)
        make.height.equalTo(($device.info.screen.width - 30) / 2 / scale)
      }
    }, {
      type: "label",
      props: {
        id: "channelName",
        textColor: $color("#424242"),
        font: $font("bold", 14),
        scrollEnabled: false,
        align: $align.center
      },
      layout: function(make) {
        make.left.right.inset(30)
        make.top.equalTo($("channelCover").bottom).offset(5)
        make.height.equalTo(20)
      }
    }, {
      type: "label",
      props: {
        id: "channelInfo",
        bgcolor: $color("#7d7d7d"),
        textColor: $color("white"),
        align: $align.center,
        font: $font(12),
        radius: 3
      },
      layout: function(make, view) {
        make.centerX.equalTo(view.super)
        make.top.equalTo($("channelName").bottom).offset(5)
        make.height.equalTo(20)
      }
    }]
  },
  events: {
    didReachBottom(sender) {
      $device.taptic(0);
      sender.endFetchingMore();
      if (channelData.length > 0) {
        sender.data = sender.data.concat(channelData.splice(0, 20))
      } else {
        getChannelList()
      }
    },
    didSelect(sender, indexPath, data) {
      $device.taptic(0);
      channelUrl = data.url;
      genericVideoListView(data.channelName.text)
      videoPage = -1;
      getChannelVideoList()
    }
  }
}

function starListView(country) {
  $ui.push({
    type: "view",
    props: {
      title: country
    },
    views: [{
      type: "matrix",
      layout: $layout.fill,
      props: {
        id: "starList",
        columns: 2,
        spacing: 10,
        itemHeight: rowHeight(2, 10),
        separatorHidden: true,
        selectable: true,
        template: [{
          type: "image",
          props: {
            id: "starCover",
            borderWidth: 0.5,
            radius: 3
          },
          layout: function(make) {
            make.top.left.right.inset(0)
            make.height.equalTo(($device.info.screen.width - 30) / 2 / scale)
          }
        }, {
          type: "label",
          props: {
            id: "starName",
            textColor: $color("#424242"),
            font: $font("bold", 14),
            scrollEnabled: false,
            align: $align.center
          },
          layout: function(make) {
            make.left.right.inset(30)
            make.top.equalTo($("starCover").bottom).offset(5)
            make.height.equalTo(20)
          }
        }, {
          type: "label",
          props: {
            id: "starInfo",
            bgcolor: $color("#7d7d7d"),
            textColor: $color("white"),
            align: $align.center,
            font: $font(12),
            radius: 3
          },
          layout: function(make, view) {
            make.centerX.equalTo(view.super)
            make.top.equalTo($("starName").bottom).offset(5)
            make.height.equalTo(20)
          }
        }]
      },
      events: {
        didReachBottom(sender) {
          sender.endFetchingMore();
          if (starData.length > 0) {
            $device.taptic(0);
            sender.data = sender.data.concat(starData.splice(0, 20))
          }
        },
        didSelect(sender, indexPath, data) {
          $device.taptic(0)
          genericVideoListView(data.starName.text)
          videoPage = -1;
          starUrl = data.url;
          getStarVideoList()
        }
      }
    }]
  })
}

function genericVideoListView(title) {
  $ui.push({
    type: "view",
    props: {
      title: title
    },
    views: [{
      type: "list",
      props: {
        id: "videoList",
        rowHeight: rowHeight(),
        separatorHidden: true,
        selectable: true,
        footer: {
          type: "label",
          props: {
            id: "footer",
            height: 40,
            text: "Loading...",
            font:$font(15),
            align: $align.center,
            textColor: $color("#aaaaaa")
          }
        },
        template: [{
          type: "image",
          props: {
            id: "videoCover",
            borderWidth: 1,
            radius: 5
          },
          layout: function(make) {
            make.top.inset(10)
            make.left.right.inset(20)
            make.height.equalTo(($device.info.screen.width - 40) / scale)
          }
        }, {
          type: "label",
          props: {
            id: "videoTitle",
            textColor: $color("#424242"),
            font: $font("bold", 14),
            scrollEnabled: false,
            align: $align.center
          },
          layout: function(make) {
            make.left.right.inset(30)
            make.top.equalTo($("videoCover").bottom).offset(5)
            make.height.equalTo(20)
          }
        }, {
          type: "button",
          props: {
            id: "videoInfo",
            textColor: $color("white"),
            align: $align.center,
            font: $font(12),
            radius: 3
          },
          events: {
            tapped(sender) {
              videoInfoButtonTapped(sender.info[0]);
              var data = $("videoList").data;
              data[sender.info[1].section].rows[sender.info[1].row].videoInfo.bgcolor = $color("red");
              $("videoList").data = data
            },
            longPressed(sender) {
              download(sender.sender.info[0].url,sender.sender.info[0].title)
            }
          },
          layout: function(make, view) {
            make.centerX.equalTo(view.super)
            make.top.equalTo($("videoTitle").bottom).offset(5)
            make.height.equalTo(20)
          }
        }, {
          type: "label",
          props: {
            id: "videoTag",
            bgcolor: $color("red"),
            textColor: $color("white"),
            font: $font("bold", 12),
            radius: 3,
            align: $align.center
          },
          layout: function(make) {
            make.top.inset(17.5)
            make.right.inset(30)
            make.width.equalTo(40)
            make.height.equalTo(20)
          }
        }]
      },
      events: {
        didReachBottom(sender) {
          $device.taptic(0);
          switch ($("menu").index) {
            case 2:
              getStarVideoList();
              break;
            case 3:
              getChannelVideoList();
              break
          }
        },
        didSelect(sender, indexPath, data) {
          play(data.url, indexPath)
        },
        willBeginDragging(sender) {
          startY = sender.contentOffset.y
        },
        didEndDragging(sender) {
          endY = sender.contentOffset.y;
          if (Math.abs(endY - startY) > 120 && $("player")) {
            $("player").pause()
            $("player").stopLoading();
            $("player").remove()
          }
        }
      },
      layout: $layout.fill
    }]
  })
}

$ui.render({
  props: {
    title: "Xvideos"
  },
  views: [{
    type: "menu",
    props: {
      id: "menu",
      items: ["收藏","搜索", "明星", "频道"]
    },
    layout: function(make) {
      make.top.left.right.inset(0)
      make.height.equalTo(35)
    },
    events: {
      changed(sender) {
        $device.taptic(0);
        $("content").views.map(i => i.remove());
        switch (sender.index) {
          case 0:
            $("content").add(localVideoListView);
            getLocalFavVideos();
            break;
          case 1:
            $("content").add(searchVideoListView);
            searchKeyword = $cache.get("searchKeyword") || null;
            searchFilters = $cache.get("searchFilters") || { "sort": "relevance", "datef": "all", "durf": "allduration", "typef": "straight" };
            if ($cache.get("searchVideoList")) {
              searchPage = $cache.get("searchPage");
              $("searchVideoList").data = $cache.get("searchVideoList");
              $("footer").text = searchPage+" Done!"
            } else {
              searchPage = -1;
              getSearchVideoList()
            };
            $("input").focus()
            break;
          case 2:
            $("content").add(starCountryListView);
            if ($cache.get("starCountryList")) {
              starCountryData = $cache.get("starCountryList");
              $("starCountryList").data = starCountryData.splice(0, 30)
            } else {
              getStarCountryList()
            };
            break;
          case 3:
            $("content").add(channelListView);
            if ($cache.get("channelList")) {
              channelPage = $cache.get("channelPage");
              channelData = $cache.get("channelList");
              $("channelList").data = channelData.splice(0, 20)
            } else {
              channelPage = -1;
              getChannelList();
              break
            }
        }
      }
    }
  }, {
    type: "view",
    props: {
      id: "content"
    },
    layout: function(make) {
      make.top.equalTo($("menu").bottom)
      make.left.right.bottom.inset(0)
    }
  }]
})

function search(keyword) {
  $http.get({
    url: encodeURI(domain + "/search-suggest/" + keyword),
    handler: function(resp) {
      if (resp.data.KEYWORDS.length > 0) {
        if ($ui.window.views.length == 1) {
          $ui.window.add(searchPreview)
        };
        var data = resp.data.KEYWORDS.map(function(i) {
          return {
            title: {
              text: i.N,
            },
            count: {
              text: " " + i.R + " "
            }
          }
        });
        $("previewList").data = data
      } else {
        $("preview").remove()
      }
    }
  })
}

function getSearchVideoList() {
  $("footer").text = "Loading...";
  $ui.loading(true);
  $cache.set("searchPage", ++searchPage);
  var filter = `&sort=${searchFilters.sort}&datef=${searchFilters.datef}&durf=${searchFilters.durf}&typef=${searchFilters.typef}`;
  if (searchKeyword) {
    var url = `${domain}/?k=${encodeURI(searchKeyword)}&p=${searchPage}${filter}`
  } else {
    var url = searchPage == 0 ? domain : domain + "/new/" + searchPage
  };
  var num = searchPage==0?0:$("searchVideoList").data[0].rows.length;
  $http.get({
    url: url,
    handler: function(resp) {
      var count = searchKeyword ? /<span\sclass="sub">.*?<\/span>/g.exec(resp.data)[0].replace(/\D*/g, "") : null;
      var match = resp.data.match(/<div\sid="video[\s\S]*?<\/script>/g);
      if ((searchPage > 0 && $("searchVideoList").data[0].rows.length == count) || !match) {
        $("footer").text = "Done!"
        $("searchVideoList").endFetchingMore();
        return
      };
      var items = match.map(function(i, idx) {
        var videoid = /videoid="(.*?)"/.exec(i)[1];
        var time = /<span\sclass="duration">([\s\S]*?)<\/span>/.exec(i)[1];
        var views = /\d*?.\sViews/.exec(i)[0];
        var url = /<a\shref="(.*?)">/.exec(i)[1];
        var image = /data-src="(.*?)"/.exec(i)[1].replace("thumbs169", "thumbs169lll").replace("THUMBNUM", "20");
        var title = escapeStr(/title="(.*?)"/.exec(i)[1]);
        try {
          var tag = /<span\sclass="video-hd-mark">(.*?)<\/span>/.exec(i)[1]
        } catch (error) {
          var tag = ""
        };
        return ({
          videoid: videoid,
          url: url,
          videoCover: {
            src: image
          },
          videoTitle: {
            text: title
          },
          videoInfo: {
            info: [{ "id": videoid, "title": title, "url": url, "cover": image, "tag": tag, "views": views, "time": time }, { "section": 0, "row": idx + num }],
            title: "  " + time + " - " + views + "  ",
            bgcolor: LocalFavVideos.indexOf(videoid) > -1 ? $color("red") : $color("#7d7d7d")
          },
          videoTag: {
            text: tag,
            hidden: tag ? false : true
          }
        })
      });
      var rows = searchPage !=0 ? $("searchVideoList").data[0].rows.concat(items) : items;
      $("searchVideoList").endFetchingMore();
      $("searchVideoList").endRefreshing();
      $("searchVideoList").data = [{
        title: searchKeyword ? `${searchKeyword}   (${rows.length}/${count})` : "Rencent Update",
        rows: rows
      }];
      $("footer").text = "Page" + (searchPage + 1) + " Done!";
      $cache.set("searchVideoList", $("searchVideoList").data);
      $cache.set("searchKeyword", searchKeyword)
    }
  })
}

function getStarVideoList() {
  $("footer").text = "Loading...";
  $ui.loading(true);
  videoPage++;
  $http.get({
    url: encodeURI(domain + starUrl + "/videos/pornstar/" + videoPage),
    handler: function(resp) {
      var match = resp.data.match(/<div\sid="video[\s\S]*?<\/script>/g);
      if (!match) {
        $("footer").text = "Done!";
        $("videoList").endFetchingMore();
        return
      };
      var items = match.map(function(i, idx) {
        var videoid = /videoid="(.*?)"/.exec(i)[1];
        var time = /<span\sclass="duration">([\s\S]*?)<\/span>/.exec(i)[1];
        var views = /\d*?.\sViews/.exec(i)[0];
        var url = /<a\shref="(.*?)">/.exec(i)[1];
        var image = /data-src="(.*?)"/.exec(i)[1].replace("thumbs169", "thumbs169lll").replace("THUMBNUM", "20");
        var title = escapeStr(/title="(.*?)"/.exec(i)[1]);
        try {
          var tag = /<span\sclass="video-hd-mark">(.*?)<\/span>/.exec(i)[1]
        } catch (error) {
          var tag = ""
        };
        return ({
          videoid: videoid,
          url: url,
          videoCover: {
            src: image
          },
          videoTitle: {
            text: title
          },
          videoInfo: {
            info: [{ "id": videoid, "title": title, "url": url, "cover": image, "tag": tag, "views": views, "time": time }, { "section": videoPage, "row": idx }],
            title: "  " + time + " - " + views + "  ",
            bgcolor: LocalFavVideos.indexOf(videoid) > -1 ? $color("red") : $color("#7d7d7d")
          },
          videoTag: {
            text: tag,
            hidden: tag ? false : true
          }
        })
      });
      var data = [{
        title: `Page${videoPage+1}`,
        rows: items
      }];
      $("videoList").endFetchingMore();
      $("videoList").data = $("videoList").data.concat(data);
      $("footer").text = "Page" + (videoPage + 1) + " Done!"
    }
  })
}

function getChannelVideoList() {
  $("footer").text = "Loading...";
  $ui.loading(true);
  videoPage++;
  $http.get({
    url: encodeURI(domain + channelUrl + "/videos/best/" + videoPage),
    handler: function(resp) {
      var match = resp.data.match(/<div\sid="video[\s\S]*?<\/script>/g);
      if (!match) {
        $("footer").text = "Done!";
        $("videoList").endFetchingMore();
        return
      };
      var items = match.map(function(i, idx) {
        var videoid = /videoid="(.*?)"/.exec(i)[1];
        var time = /<span\sclass="duration">([\s\S]*?)<\/span>/.exec(i)[1];
        var views = /\d*?.\sViews/.exec(i)[0];
        var url = /<a\shref="(.*?)">/.exec(i)[1];
        var image = /data-src="(.*?)"/.exec(i)[1].replace("thumbs169", "thumbs169lll").replace("THUMBNUM", "20");
        var title = escapeStr(/title="(.*?)"/.exec(i)[1]);
        try {
          var tag = /<span\sclass="video-hd-mark">(.*?)<\/span>/.exec(i)[1]
        } catch (error) {
          var tag = ""
        };
        return ({
          videoid: videoid,
          url: url,
          videoCover: {
            src: image
          },
          videoTitle: {
            text: title
          },
          videoInfo: {
            info: [{ "id": videoid, "title": title, "url": url, "cover": image, "tag": tag, "views": views, "time": time }, { "section": videoPage, "row": idx }],
            title: "  " + time + " - " + views + "  ",
            bgcolor: LocalFavVideos.indexOf(videoid) > -1 ? $color("red") : $color("#7d7d7d")
          },
          videoTag: {
            text: tag,
            hidden: tag ? false : true
          }
        })
      });
      var data = [{
        title: `Page${videoPage+1}`,
        rows: items
      }];
      $("videoList").endFetchingMore();
      $("videoList").data = $("videoList").data.concat(data);
      $("footer").text = "Page" + (videoPage + 1) + " Done!"
    }
  })
}

function getStarCountryList() {
  $ui.loading(true);
  $http.get({
    url: "https://www.xvideos.com/pornstars/countries",
    handler: function(resp) {
      var match = resp.data.match(/<li>.*?flag-small.*?<\/li>/g);
      var data = match.map(function(i, idx) {
        var [url, country] = /<a href="(.*?)"><b><span class="flag-small.*?"><\/span>(.*?)<\/b>/.exec(i).splice(1, 2);
        var count = /navbadge default">(.*?)<\/span>/.exec(i)[1];
        return {
          url: url,
          country: {
            text: country
          },
          count: {
            text: count + " "
          }
        }
      });
      $("starCountryList").endRefreshing();
      $("starCountryList").data = data;
      $ui.loading(false);
      $cache.set("starCountryList", data)
    }
  })
}

function getStarList(url) {
  $ui.loading(true);
  $http.get({
    url: domain + url,
    handler: function(resp) {
      var match = resp.data.match(/xv\.thumbs\.replaceThumbUrl[\s\S]*?profile-counts[\s\S]*?<\/p>/g);
      var data = match.map(function(i) {
        var [url, name] = /<a\shref="(.*?)">(.*?)<\/a>/.exec(i).splice(1, 2);
        var cover = /<img\ssrc="(.*?)"/.exec(i)[1].replace("thumbs169ll", "thumbs169lll");
        var count = /<p\sclass="profile-counts">([\s\S]*?)<\/p>/.exec(i)[1].replace(/\s|(&nbsp;)/g, "");
        return {
          url: url,
          starCover: {
            src: cover
          },
          starName: {
            text: name
          },
          starInfo: {
            text: count + "  "
          }
        }
      });
      starData = data;
      $("starList").data = $("starList").data.concat(starData.splice(0, 20));
      $ui.loading(false)
    }
  })
}

function getChannelList() {
  $ui.loading(true);
  $cache.set("chanelPage", ++channelPage);
  $http.get({
    url: domain + "/channels/" + channelPage,
    handler: function(resp) {
      var match = resp.data.match(/xv\.thumbs\.replaceThumbUrl[\s\S]*?profile-counts[\s\S]*?<\/p>/g);
      var data = match.map(function(i) {
        var [url, name] = /<a\shref="(.*?)">(.*?)<\/a>/.exec(i).splice(1, 2);
        var cover = /<img\ssrc="(.*?)"/.exec(i)[1].replace("thumbs169ll", "thumbs169lll");
        var count = /<p\sclass="profile-counts">([\s\S]*?)<\/p>/.exec(i)[1].replace(/\s|(&nbsp;)/g, "");
        return {
          url: url,
          channelCover: {
            src: cover
          },
          channelName: {
            text: name
          },
          channelInfo: {
            text: count + "  "
          }
        }
      });
      channelData = data;
      $("channelList").data = $("channelList").data.concat(channelData.splice(0, 20));
      $ui.loading(false);
      $cache.set("channelList", data)
    }
  })
}

function play(url, indexPath, mode) {
  $ui.loading(true);
  $ui.toast("正在获取视频地址……", 100);
  $http.get({
    url: domain + url,
    handler: function(resp) {
      $ui.loading(false);
      $ui.toast("✅", 0.1);
      var url = /setVideoUrlHigh\('(.*?)'\)/g.exec(resp.data)[1];
      var thumb = /setThumbUrl\('(.*?)'\)/g.exec(resp.data)[1].replace("thumbs169", "thumbs169lll");
      switch ($("menu").index) {
        case 0:
          var listView = $("localFavVideoList");
          break;
        case 1:
          var listView = $("searchVideoList");
          break;
        default:
          var listView = $("videoList");
          break;
      };
      if ($("player")) {
        $("player").stopLoading();
        $("player").pause()
        $("player").remove()
      };
      listView.cell(indexPath).add({
        type: "video",
        props: {
          id: "player",
          src: url,
          poster: thumb,
          radius: 6,
          borderWidth: 1
        },
        layout: function(make) {
          make.top.inset(12.5)
          make.left.right.inset(25)
          make.height.equalTo(($device.info.screen.width - 50) / scale)
        }
      });
        $delay(0.5, function() {
    $("player").play()
  })
    }
  })
}

function download(url,name) {
  $ui.menu({
    items: ["低画质下载", "高画质下载"],
    handler: function(title, idx) {
      switch (idx) {
        case 0:
          selectReg = /setVideoUrlLow\('(.*?)'\)/g;
          break;
        case 1:
          selectReg = /setVideoUrlHigh\('(.*?)'\)/g;
          break;
      }
    },
    finished: function(c) {
      if (!c) {
        $ui.loading(true);
        $http.get({
          url: domain + url,
          handler: function(resp) {
            $ui.loading(false);
            var videoUrl = selectReg.exec(resp.data)[1];
            $http.download({
              url: videoUrl,
              progress: function(write, total) {
                var precent = (write / total * 100).toFixed(1);
                var totalSize = total / 1000 < 1000 ? (total / 1000).toFixed(1) + "KB" : (total / 1000 / 1000).toFixed(1) + "MB";
                var writeSize = write / 1000 < 1000 ? write / 1000 : write / 1000 / 1000;
                $ui.toast(`⏳下载中......${writeSize.toFixed(1)}/${totalSize}(${precent}%)`, 1)
              },
              handler: function(resp) {
                $ui.toast("✅ 下载完成已经存到 iCloud", 1);
                let types = resp.data.fileName.split(".").pop()
                let path = "drive://xvideos/"+name +"."+types
                let i = 1
                while($file.exists(path)){
                  var dname = name + `(${i})`
                  path = "drive://xvideos/"+dname +"."+types
                  i++
                }
                $file.write({
                  data: resp.data,
                  path: path
                })
              }
            })
          }

        })
      }
    }
  });
}

function rowHeight(columns, spacing) {
  var c = columns || 1;
  var s1 = spacing || 25;
  var s2 = c == 1 ? s1 : 0;
  return Math.ceil(($device.info.screen.width - (c + 1) * s1) / c / scale) + s2 + 50;
}

function escapeStr(str) {
  return str.replace(/&.*?;/ig, "")
}

function videoInfoButtonTapped(data) {
  if (LocalFavVideos.indexOf(data.id) > -1) {
    $ui.toast("⚠️ 此视频已在收藏列表中", 0.5)
  } else {
    videoFavoriteUpdate("add", data)
  }
}

function videoFavoriteUpdate(mode, data) {
  switch (mode) {
    case "add":
      LocalData.favorites.push(data);
      LocalFavVideos.push(data.id);
      $ui.toast("✅ 已收藏", 0.5);
      break;
    case "del":
      var idx = LocalFavVideos.indexOf(data.id);
      LocalData.favorites.splice(idx, 1);
      LocalFavVideos.splice(idx, 1);
      $ui.toast("❎ 已删除", 0.5);
      getLocalFavVideos();
      break;
  };
  writeCache()
}

function writeCache() {
  $file.write({
    data: $data({ string: JSON.stringify(LocalData) }),
    path: LocalDataPath
  })
}

function getLocalFavVideos() {
  var rows = LocalData.favorites.map(function(i) {
    return {
      videoid: i.id,
      url: i.url,
      videoCover: {
        src: i.cover
      },
      videoTitle: {
        text: i.title
      },
      videoInfo: {
        info: {i:i, url:i.url,name:i.title},
        title: "  " + i.time + " — " + i.views + "  "
      },
      videoTag: {
        text: i.tag,
        hidden: i.tag ? false : true
      }
    }
  });
  $("localFavVideoList").data = [{
    title: `${rows.length}  ${rows.length>1?"Favorites":"Favorite"}`,
    rows: rows
  }]
}

function main() {
  $app.tips("1.轻按视频下方时间戳收藏视频\n2.长按视频下方时间戳下载视频")

  $("content").add(localVideoListView);
  if ($file.read(LocalDataPath)) {
    LocalData = JSON.parse($file.read(LocalDataPath).string);
  } else {
    $file.mkdir("drive://xvideos");
    LocalData = { "favorites": []};
  };
  LocalFavVideos = LocalData.favorites.map(i => i.id);
  getLocalFavVideos()
}

var LocalDataPath = "drive://xvideos/config.json";

var domain = "https://www.xvideos.com";

main()