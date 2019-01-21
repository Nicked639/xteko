 /*
    Xvideos X JSBox

    你口袋里的观影利器。

    以短视频为主，涵盖各种类型包括重口味、小清新、自拍...

    脚本特点：

    1.无广告困扰，想看就看；

    2.支持收藏，方便巩固温习;

    3.支持下载，分高低两种画质。

    注：源码来自 wind. 经 Nicked 修改。

    联系：https://t.me/nicked

    Tips: 轻按时间戳收藏视频，长按时间戳下载视频。

   */

version = 1.6

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
    make.top.equalTo(70)
    make.height.equalTo(240)
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
        $("searchVideoList").contentOffset = $point(0, 40);
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
          if ($("player")) {
        $("player").stopLoading();
        $("player").pause()
        $("player").remove()
      };
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
          if ($("player")) {
        $("player").stopLoading();
        $("player").pause()
        $("player").remove()
      };
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
        height: 40
      },
      views: [{
        type: "input",
        props: {
          id: "input",
          bgcolor: $color("#ffffff"),
          textColor: $color("darkGray"),
          placeholder:"输入关键字搜索...",
          clearButtonMode:0,
          font: $font(13),
          clearsOnBeginEditing: true,
          bgcolor: $color("#f3f3f3"),
          radius: 8,
          stickyHeader: false
        },
        layout: function(make) {
          make.top.bottom.inset(5)
          make.left.right.inset(10)
        },
        events: {
          didBeginEditing(sender){
            Returned = false
          },
          didEndEditing(sender) {
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
            Returned = true
            $device.taptic(0);
            if (sender.text) {
              searchPage = -1;
              searchKeyword = sender.text;
              getSearchVideoList()
              $("searchVideoList").contentOffset = $point(0, 40);
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
        type: "button",
        props: {
          id:"Filters",       
          title: "筛选器",
          font:$font("bold",14),
          bgcolor: $rgba(0,0,0,0.2),
          titleColor: $color("white"),
          hidden: true,
          radius:8
         
        },
        layout: function(make) {
          make.top.bottom.inset(5)
          make.right.inset(10)
          make.width.equalTo(55)
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
        textColor: $color("white"),
        font: $font("bold", 14),
        scrollEnabled: false,
        align: $align.center,
        bgcolor:$rgba(0,0,0,0.2),
        radius:5
      },
      layout: function(make) {
        make.left.right.inset(20)
        make.top.equalTo($("videoCover").bottom).offset(-20)
        make.height.equalTo(20)
      }
    }, {
      type: "button",
      props: {
        id: "videoInfo",
        textColor: $color("white"),
        align: $align.center,
        font: $font(12),
        radius: 3,
      },
      events: {
        tapped(sender) {
          var data = $("searchVideoList").data;  
          var row = sender.info[1].row
          if(LocalFavVideos.indexOf(sender.info[0].id)>-1){    
            data[0].rows[row].videoInfo.bgcolor = $color("#7d7d7d");
            videoFavoriteUpdate("del", sender.info[0])
          }else{
            data[0].rows[row].videoInfo.bgcolor = $color("#6ba292");
            videoFavoriteUpdate("add", sender.info[0])
          }
          
          $("searchVideoList").data = data
          $cache.set("searchVideoList", $("searchVideoList").data);
          
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
//      $("searchVideoList").data = []
      searchKeyword = null;
      searchPage = -1;
      getSearchVideoList()
      $("searchVideoList").endRefreshing()
      $("input").text = ""
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
        textColor: $color("white"),
        font: $font("bold", 14),
        scrollEnabled: false,
        align: $align.center,
        bgcolor:$rgba(0,0,0,0.2),
        radius:5
      },
      layout: function(make) {
        make.left.right.inset(20)
        make.top.equalTo($("videoCover").bottom).offset(-20)
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
          var data = $("localFavVideoList").data;  
          if(LocalFavVideos.indexOf(sender.info.i.id)>-1){    
            data[0].rows[sender.info.row].videoInfo.bgcolor = $color("#7d7d7d");
            videoFavoriteUpdate("del", sender.info.i)
          }else{
            data[0].rows[sender.info.row].videoInfo.bgcolor = $color("#6ba292");
            videoFavoriteUpdate("add", sender.info.i)
          }
          
          $("localFavVideoList").data = data
          //videoFavoriteUpdate("del", sender.info.i)
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
    pulled(sender) {
          $("localFavVideoList").endRefreshing()
          $ui.menu({
            items: ["微信打赏"],
            handler: function(title, idx) {
              if (idx == 0) {
                wechatPay()
              }
            }
          })
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
    itemHeight: 40,
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
        textColor: $color("white"),
        font: $font("bold", 12),
        scrollEnabled: false,
        align: $align.center,
        bgcolor:$rgba(0,0,0,0.2),
        radius:5
      },
      layout: function(make) {
        make.left.right.inset(0)
        make.top.equalTo($("channelCover").bottom).offset(-20)
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
    },
    pulled(sender){
      channelPage = -1;
      $("channelList").data=[]
      getChannelList();
      $("channelList").endRefreshing()
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
            textColor: $color("white"),
            font: $font("bold", 12),
            scrollEnabled: false,
            align: $align.center,
            bgcolor:$rgba(0,0,0,0.2),
        radius:5
          },
          layout: function(make) {
            make.left.right.inset(0)
            make.top.equalTo($("starCover").bottom).offset(-20)
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
          } else{
            $ui.action("ff")
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
            textColor: $color("white"),
            font: $font("bold", 14),
            scrollEnabled: false,
            align: $align.center,
            bgcolor:$rgba(0,0,0,0.2),
        radius:5
          },
          layout: function(make) {
            make.left.right.inset(20)
            make.top.equalTo($("videoCover").bottom).offset(-20)
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
              
              var data = $("videoList").data;
              
              if(LocalFavVideos.indexOf(sender.info[0].id)>-1){
          data[0].rows[sender.info[1].row].videoInfo.bgcolor = $color("#7d7d7d");
           videoFavoriteUpdate("del", sender.info[0])
          }else{
            data[0].rows[sender.info[1].row].videoInfo.bgcolor = $color("#6ba292");
            videoFavoriteUpdate("add", sender.info[0])
          }
              
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
          getChannelVideoList();
//          switch ($("menu").index) {
//            case 2:
//              getStarVideoList();
//              break;
//            case 3:
//              getChannelVideoList();
//              break
//          }
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

const mainUI = {
  type: "view",
  props: {
    title: "Xvideos"
  },
  views: [{
    type: "menu",
    props: {
      id: "menu",
      items: ["收藏","搜索", /*"明星",*/ "频道"]
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
            searchKeyword = null;
            searchFilters = { "sort": "relevance", "datef": "all", "durf": "allduration", "typef": "straight" };
            $cache.set("searchFilters",searchFilters) 
            if ($cache.get("searchVideoList")) {
              searchPage = $cache.get("searchPage");
              $("searchVideoList").data = $cache.get("searchVideoList");
              $("footer").text = searchPage+" Done!"
            } else {
              searchPage = -1;
              getSearchVideoList()
            };    
            break;
//          case 2:
//            $("content").add(starCountryListView);
//            if ($cache.get("starCountryList")) {
//              starCountryData = $cache.get("starCountryList");
//              $("starCountryList").data = starCountryData.splice(0, 40)
//            } else {
//              getStarCountryList()
//            };
//            break;
          case 2:
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
  }],
  layout: $layout.fill
}

function search(keyword) {
  $http.get({
    url: encodeURI(domain + "/search-suggest/" + keyword),
    handler: function(resp) {
      
      if (resp.data.KEYWORDS.length > 0) {
        if ($ui.window.views.length == 2) {          
          $ui.window.add(searchPreview)
        };
//        $ui.window.add(searchPreview)
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
        if(Returned){
          $("preview").remove()
        }
      } else {
        $("preview").remove()
      }
    }
  })
}

function getSearchVideoList() {
  if ($("player")) {
        $("player").stopLoading();
        $("player").pause()
        $("player").remove()
      };
  $("input").blur();
  $("footer").text = "Loading...";
  $ui.loading(true);
  //$cache.set("searchPage", ++searchPage);
  searchPage++
  var filter = `&sort=${searchFilters.sort}&datef=${searchFilters.datef}&durf=${searchFilters.durf}&typef=${searchFilters.typef}`;
  if (searchKeyword) {
    var url = `${domain}/?k=${encodeURI(searchKeyword)}&p=${searchPage}${filter}`
    $("Filters").hidden = false
  } else {
    var url = searchPage == 0 ? domain : domain + "/new/" + searchPage
    $("Filters").hidden = true
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
        
//        var views = /\d*?.\sViews/.exec(i)[0];
var views = /duration">[\s\S]*?<\/span>([\s\S]*?)<span/.exec(i)[1]
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
            bgcolor: LocalFavVideos.indexOf(videoid) > -1 ? $color("#6ba292") : $color("#7d7d7d")
          },
          videoTag: {
            text: tag,
            hidden: tag ? false : true
          }
        })
      });
      var rows = searchPage !=0 ? $("searchVideoList").data[0].rows.concat(items) : items;
      $("searchVideoList").endFetchingMore();
      $("searchVideoList").data = [{
        title: searchKeyword ? `${searchKeyword}   (${rows.length}/${count})` : "最近更新",
        rows: rows
      }];
      $("footer").text = "Page" + (searchPage + 1) + " Done!";
      if(!searchKeyword){
//        $("searchVideoList").contentOffset = $point(0, 0);
        $cache.set("searchVideoList", $("searchVideoList").data);
        $cache.set("searchKeyword", searchKeyword)
        $cache.set("searchPage", searchPage)
      }
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
//        var views = /\d*?.\sViews/.exec(i)[0];
        var views = /duration">[\s\S]*?<\/span>([\s\S]*?)<span/.exec(i)[1]
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
            bgcolor: LocalFavVideos.indexOf(videoid) > -1 ? $color("#6ba292") : $color("#7d7d7d")
          },
          videoTag: {
            text: tag,
            hidden: tag ? false : true
          }
        })
      });
      var data = [{
        title: `第 ${videoPage+1} 页`,
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
//        var views = /\d*?.\sViews/.exec(i)[0];
        var views = /duration">[\s\S]*?<\/span>([\s\S]*?)<span/.exec(i)[1]
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
            bgcolor: LocalFavVideos.indexOf(videoid) > -1 ? $color("#6ba292") : $color("#7d7d7d")
          },
          videoTag: {
            text: tag,
            hidden: tag ? false : true
          }
        })
      });
      var data = [{
        title: `第 ${videoPage+1} 页`,
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
    url: "https://www.xvideos.com/pornstars-index/countries",
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
        count = /\d+/.exec(count)[0] + " videos"
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
      starData = JSON.parse(JSON.stringify(data));
      $("starList").data = $("starList").data.concat(starData.splice(0, 20));
      $ui.loading(false)
    }
  })
}
function getChannelList() {
  $ui.loading(true);
  channelPage++
  $http.get({
    url: domain + "/channels-index/" + channelPage,
    handler: function(resp) {
      var match = resp.data.match(/xv\.thumbs\.replaceThumbUrl[\s\S]*?profile-counts[\s\S]*?<\/p>/g);
      var data = match.map(function(i) {
        var [url, name] = /<a\shref="(.*?)">(.*?)<\/a>/.exec(i).splice(1, 2);

        var cover = /<img\ssrc="(.*?)"/.exec(i)[1].replace("thumbs169ll", "thumbs169lll");
        var count = /<p\sclass="profile-counts">([\s\S]*?)<\/p>/.exec(i)[1].replace(/\s|(&nbsp;)/g, "");
        count = /\d+/.exec(count)[0] + " videos"
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
      channelData = JSON.parse(JSON.stringify(data));
      $("channelList").data = $("channelList").data.concat(channelData.splice(0, 20));
      $ui.loading(false);
      $cache.set("channelList", data)
      $cache.set("channelPage", channelPage);
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
          radius: 5,
          borderWidth: 0
        },
        layout: function(make) {
          make.top.inset(10)
          make.left.right.inset(20)
          make.height.equalTo(($device.info.screen.width - 40) / scale)
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
    items: ["低画质下载", "高画质下载","复制下载地址","Safari打开","nplayer打开"],
    handler: async function(title, idx) {
      switch (idx) {
        case 0:
          selectReg = /setVideoUrlLow\('(.*?)'\)/g;
          downloadVideo(url)
          break;
        case 1:
          selectReg = /setVideoUrlHigh\('(.*?)'\)/g;
          downloadVideo(url)
          break;
        case 2:
          selectReg = /setVideoUrlHigh\('(.*?)'\)/g
          $ui.toast("地址获取中...")
          let dUrl = domain + url
          let resp = await $http.get(domain+url);
          $ui.toast("复制成功！")
          $clipboard.text = selectReg.exec(resp.data)[1];
          break
        case 3:
////          dUrl = domain + url;
//          $ui.alert(domain+url)
          $app.openURL(encodeURI(domain+url))
          break;
        case 4:
          selectReg = /setVideoUrlHigh\('(.*?)'\)/g
          $ui.toast("地址获取中...")
          let r = await $http.get(domain+url);
          videoUrl = selectReg.exec(r.data)[1];
          $app.openURL("nplayer-" + videoUrl)
      }
    },
//    finished: function(c) {
//      if (!c) {
//        $ui.loading(true);
//        $http.get({
//          url: domain + url,
//          handler: function(resp) {
//            $ui.loading(false);
//            var videoUrl = selectReg.exec(resp.data)[1];
//            $http.download({
//              url: videoUrl,
//              progress: function(write, total) {
//                var precent = (write / total * 100).toFixed(1);
//                var totalSize = total / 1000 < 1000 ? (total / 1000).toFixed(1) + "KB" : (total / 1000 / 1000).toFixed(1) + "MB";
//                var writeSize = write / 1000 < 1000 ? write / 1000 : write / 1000 / 1000;
//                $ui.toast(`⏳下载中......${writeSize.toFixed(1)}/${totalSize}(${precent}%)`, 1)
//              },
//              handler: function(resp) {
//                $ui.toast("✅ 下载完成已存至脚本文件管理器内", 1);
//                let types = resp.data.fileName.split(".").pop()
//                let path = name +"."+types
//                let i = 1
//                while($file.exists(path)){
//                  var dname = name + `(${i})`
//                  path = dname +"."+types
//                  i++
//                }
//                $file.write({
//                  data: resp.data,
//                  path: path
//                })
//              }
//            })
//          }
//
//        })
//      }
//    }
  });
}

function downloadVideo(url){
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
                $ui.toast("✅ 下载完成已存至脚本文件管理器内", 1);
                let types = resp.data.fileName.split(".").pop()
                let path = name +"."+types
                let i = 1
                while($file.exists(path)){
                  var dname = name + `(${i})`
                  path = dname +"."+types
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

function rowHeight(columns, spacing) {
  var c = columns || 1;
  var s1 = spacing || 25;
  var s2 = c == 1 ? s1 : 0;
  return Math.ceil(($device.info.screen.width - (c + 1) * s1) / c / scale) + s2 + 20;
}

function escapeStr(str) {
  return str.replace(/&.*?;/ig, "")
}

function videoInfoButtonTapped(data) {
  if (LocalFavVideos.indexOf(data.id) > -1) {
    //videoFavoriteUpdate("del", data)
    $ui.toast("❌ 已经在收藏列表")
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
      $ui.toast("❌ 已删除", 0.5);
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
  var rows = LocalData.favorites.map(function(i,idx) {
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
        info: {i:i,url:i.url,name:i.title,row:idx},
        title: "  " + i.time + " — " + i.views + "  "
      },
      videoTag: {
        text: i.tag,
        hidden: i.tag ? false : true
      }
    }
  });
  $("localFavVideoList").data = [{
    title: `${rows.length} 个收藏`,
    rows: rows
  }]
}

//function scriptVersionUpdate() {
//  $http.get({
//    url: "https://raw.githubusercontent.com/nicktimebreak/xteko/master/Xvideos/updateInfo",
//    handler: function(resp) {
//      var afterVersion = resp.data.version;
//      var msg = resp.data.msg;
//      if (afterVersion > version) {
//        $ui.alert({
//          title: "检测到新的版本！V" + afterVersion,
//          message: "更新后请至扩展列表启动新版本。\n" + msg,
//          actions: [{
//            title: "更新",
//            handler: function() {
//              var url = "jsbox://install?url=https://raw.githubusercontent.com/nicktimebreak/xteko/master/Xvideos/Xvideos.js&name=Xvideos&icon=icon_135.png";
//              $app.openURL(encodeURI(url));
//              $app.close()
//            }
//          }, {
//            title: "取消"
//          }]
//        })
//      }
//    }
//  })
//}

//检测扩展更新
function scriptVersionUpdate() {
  $http.get({
    url:
      "https://raw.githubusercontent.com/nicktimebreak/xteko/master/Xvideos/updateInfo",
    handler: function(resp) {
      var afterVersion = resp.data.version;
      var msg = resp.data.msg;
      if (afterVersion > version) {
        $ui.toast("检测到脚本更新...");

        $http.download({
          url:
            "https://raw.githubusercontent.com/nicktimebreak/xteko/master/Xvideos/Xvideos.js",
          handler: resp => {
            let box = resp.data;
            $addin.save({
              name: $addin.current.name,
              data: box,
              version: afterVersion,
              author: "Nicked",
              icon: "icon_087",
              handler: success => {
                if (success) {
                  $device.taptic(2);
                  $delay(0.2, function() {
                    $device.taptic(2);
                  });

                  $ui.alert({
                    title: "更新已完成",
                    actions: [
                      {
                        title: "OK",
                        handler: function() {
                          $addin.restart();
                        }
                      }
                    ]
                  });
                }
              }
            });
          }
        });
      }
    }
  });
}


const checkAdultView = {
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
      text: "Federal law provides severe civil and criminal penalties for the unauthorized reproduction, distribution, or exhibition of copyrighted motion pictures (Title 17, United States Code, Sections 501 and 508). The Federal Bureau of Investigation investigates allegations of criminal copyright infringement (Title 17, United States Code, Section 506).",
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
      text: "本脚本运行内容包含成人影片、图片，可能会引起你的不适，请谨慎运行。\n未满十八岁，禁止运行。",
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
    type: "text",
    props: {
      text: "提示",
      textColor: $color("red"),
      font: $font("Helvetica-Bold", 20),
      bgcolor: $color("black"),
      insets: $insets(5, 0, 0, 0),
      align: $align.center,
      editable: false
    },
    layout: function(make, view) {
      make.top.inset(450)
      make.left.right.inset(130)
      make.height.equalTo(40)
    }
  },{
    type: "text",
    props: {
      text: "\n1.请将 http://xvideos.com 加入代理。\n2.轻按视频下方时间戳收藏视频\n3.长按视频下方时间戳下载视频",
      textColor: $color("red"),
      font: $font("bold", 14),
      bgcolor: $color("clear"),
      insets: $insets(0, 0, 0, 0),
      align: $align.center,
      editable: false
    },
    layout: function(make, view) {
      make.top.inset(470)
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
        $("checkAdult").remove()
        $cache.set("ADULT", true)
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

function main() {
  if ($cache.get("ADULT")) {
    $("checkAdult").remove()
  }
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


if ($app.env == $env.today) {
  var name = $addin.current.name.split(".js")
  $app.openURL("jsbox://run?name=" + name[0])
} else {
  scriptVersionUpdate()
  $ui.render({
    props: {
      title: "Xvideos",
      bgcolor: $color("white"),
    },
    views: [mainUI, checkAdultView],
    layout: $layout.fill
  })
  main()
}
