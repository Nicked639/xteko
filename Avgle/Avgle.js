/*
 Avgle X JSBox

 你口袋里的观影利器。

 庞大的在线片源库：

 骑兵、步兵、日韩、欧美，近9万部影片日日更新。

 脚本特点：

 1.无广告困扰，想看就看；

 2.基本还原官网功能，方便省心;

 3.支持收藏，方便巩固温习。

 作者联系：https://t.me/nicked

 Tips: 

 1.点击片名左下角时间可预览视频;

 2.点击片名左下角 🤔 收藏视频;

 3.点击收藏按钮右侧的按钮可分享视频;

 3.点击图片中央或下方标题播放完整视频;

 4.请合理安排娱乐与工作时间, 劳逸结合, 强身健体，做中华好儿女。

*/

version = 1.72

const filters = {
  "Time": {
    "全部视频": "a",
    "今日新增": "t",
    "本周新增": "w",
    "本月新增": "m"
  },
  "View": {
    "最新添加": "mr",
    "最多观看": "mv",
    "最多评论": "md",
    "最多喜欢": "tf"
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

const content = ["影片", "合集", "分类", "收藏夹"]

const filterView = {
  type: "view",
  props: {
    id: "filterView",
    radius: 7,
    bgcolor: $color("white"),
    borderWidth: 1,
    borderColor: $color("#5c98f9")
  },
  views: [{
    type: "list",
    props: {
      id: "filtersT",
      //separatorHidden: true,
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
        $device.taptic(0);
        cacheFilters.Time = filters.Time[data.filterLabel.text];
        $("filterView").remove();
        filterExist = false;
        $("videos").contentOffset = $point(0, 0);
        $cache.set("cacheFilters", cacheFilters);
        page = -1;
        $("videos").data = [];
        if (mode == "Cat") {
          getVideoData();
        } else if (mode == "Search") {
          getVideoData();
        } else {
          $("search").text = "";
          mode = "Videos";
          getVideoData();
        }
      },

    },
    layout: function(make, view) {
      make.top.inset(0)
      make.left.inset(0)
      make.width.equalTo(100)
      make.height.equalTo(145)
    }
  }, {
    type: "list",
    props: {
      id: "filtersV",
      //separatorHidden: true,
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
        $device.taptic(0);
        $("filterView").remove();
        filterExist = false;
        cacheFilters.View = filters.View[data.filterLabel.text];
        $cache.set("cacheFilters", cacheFilters);
        if (contentMode == "Collections") {
          page = -1
          $("CCList").contentOffset = $point(0, 0);
          getCollectionData()
          return
        }
        $("videos").contentOffset = $point(0, 0);
        page = -1;
        $("videos").data = [];
        if (mode == "Cat") {
          getVideoData();
        } else if (mode == "Search") {
          getVideoData();
        } else {
          $("search").text = "";
          mode = "Videos";
          getVideoData();
        }
      },

    },
    layout: function(make, view) {
      make.top.inset(0)
      make.left.equalTo($("filtersT").right)
      make.right.inset(0)
      make.height.equalTo(145)
    }
  }],
  layout: function(make, view) {
    make.top.inset(45)
    make.left.inset(15)
    make.width.equalTo(200)
    make.height.equalTo(0)
  }
}

const contentView = {
  type: "view",
  props: {
    id: "contentView",
    radius: 7,
    bgcolor: $color("white"),
    borderWidth: 1,
    borderColor: $color("#5c98f9")
  },
  views: [{
    type: "list",
    props: {
      id: "contentList",
      //separatorHidden: true,
      rowHeight: 30,
      bgcolor: $color("white"),
      scrollEnabled: false,
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
    },
    events: {
      didSelect(sender, indexPath, data) {
        $device.taptic(0);
        $("contentView").remove();
        contentExist = false;
        $("search").text = "";
        var c = data.contentLabel.text;
        if (c == "影片") {
          cacheContent = "影片";
          $cache.set("cacheContent", cacheContent);
          contentMode = "Videos";
          if (CCExist == true) {
            CCExist = false;
            $("CCView").remove()
            VFExist = true;
            $("Avgle").add(VFView);
          }
          mode = "Videos";
          $("videos").contentOffset = $point(0, 0);
          $("videos").data = [];
          page = -1;
          getVideoData();
        } else if (c == "合集") {
          cacheContent = "合集";
          $cache.set("cacheContent", cacheContent);
          cacheFilters.View = "bw";
          $cache.set("cacheFiltes", cacheFilters)
          contentMode = "Collections";
          if (VFExist == true) {
            VFExist = false;
            $("VFView").remove()
            CCExist = true;
            $("Avgle").add(CCView)
          }
          $("CCList").contentOffset = $point(0, 0);
          page = -1;
          $("CCList").data = []
          getCollectionData()
        } else if (c == "分类") {
          cacheContent = "分类";
          $cache.set("cacheContent", cacheContent);
          contentMode = "Categories"
          if (VFExist == true) {
            VFExist = false;
            $("VFView").remove()
            CCExist = true;
            $("Avgle").add(CCView)
          }
          $("CCList").contentOffset = $point(0, 0);
          getCategoryData()
        } else if (c == "收藏夹") {
          if ($("player")) {
            $("player").pause();
            $("player").stopLoading();
            $("player").remove();
          }
          cacheContent = "收藏夹";
          $cache.set("cacheContent", cacheContent);
          contentMode = "Favorites"
          if (CCExist == true) {
            CCExist = false;
            $("CCView").remove()
            VFExist = true;
            $("Avgle").add(VFView);
          }
          $("search").text = "";
          $device.taptic(0);
          sender.super.remove();
          contentExist = false;
          if (LocalFavList.length == 0) {
            cacheContent = "影片"
            $cache.set("cacheContent", cacheContent)
            $ui.alert("Get Some Favorites!")
            contentMode = "Videos";
            return
          }
          $("videos").contentOffset = $point(0, 0);
          $("search").placeholder = "共计 " + formatNum(LocalFavList.length) + " 个收藏"
          $("searchResult").text = "";
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
                title: i.time,
                info: i.image
              },
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
                alpha: 1,
                info: i
              },
              share: {
                info: i.vid
              }
            });
          });

        }
      }
    },
    layout: function(make, view) {
      make.top.inset(0)
      make.left.inset(0)
      make.width.equalTo(100)
      make.height.equalTo(200)
    }
  }],
  layout: function(make, view) {
    make.top.inset(45)
    make.right.inset(15)
    make.width.equalTo(100)
    make.height.equalTo(0)
  }
}

const template = [{ // Video and Favorite                                                         
  type: "view",
  props: {
    bgcolor: $color("white"),
    radius: 7
  },
  views: [{
    type: "image",
    props: {
      id: "interface",
      radius: 5
    },
    layout: function(make, view) {
      var imgScale = 16 / 9;
      make.top.left.right.inset(10)
      make.height.equalTo(view.width).dividedBy(imgScale)
      //make.bottom.inset(55)
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
    type: "button",
    props: {
      id: "time",
      titleColor: $color("black"),
      font: $font(13),
      bgcolor: $color("clear")
    },
    layout: function(make, view) {
      make.bottom.inset(4)
      make.left.inset(10)
    },
    events: {
      tapped(sender) {
        var preview = /https.*\//g.exec(sender.info) != false ? /https.*\//g.exec(sender.info)[0] + "preview.mp4" : false
        var cell = sender.super.super.super;
        var view = $("videos").runtimeValue();
        var indexPath = view.invoke("indexPathForCell", cell).rawValue();
        play(preview, indexPath, sender.info, "preview")
        $delay(0.5, function() {
          $("player").play()
        })
        $ui.toast("", 0.1)
      }
    }
  }, {
    type: "label",
    props: {
      id: "like",
      textColor: $color("black"),
      font: $font(12),
    },
    layout: function(make, view) {
      make.bottom.inset(10)
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
      //title: "🤔",
      font: $font(13),
    },
    layout: function(make, view) {
      make.top.equalTo($("like").top).offset(-3)
      make.left.equalTo($("time").right).offset(0)
      make.width.equalTo(30)
      make.height.equalTo(20)
    },
    events: {
      tapped(sender) {
        var info = sender.info;
        var cell = sender.super.super.super;
        var view = $("videos").runtimeValue();
        var index = view.invoke("indexPathForCell", cell).rawValue();
        var idx = index.row;
        favButtonTapped(sender, info, idx)
        if (contentMode == "Favorites") {
          $("search").placeholder = "共计 " + formatNum(LocalFavList.length) + " 个收藏";
          $("searchResult").text = "";
        }
      }
    }

  }, {
    type: "button",
    props: {
      id: "share",
      bgcolor: $color("clear"),
      font: $font(12),
      icon: $icon("022", $color("#777777"), $size(16, 16)),
      alpha: 1,
      //inset:$insets(0,0,0,0)
    },
    layout: function(make, view) {
      make.top.equalTo($("favorite").top).offset(2)
      make.right.equalTo($("like").left).offset(0)
      make.width.equalTo(30)
      make.height.equalTo(17)
    },
    events: {
      tapped(sender) {
        $share.sheet("https://avgle.com/video/" + sender.info)
      }
    }

  }],
  layout: $layout.fill
}]

const templateC = [{ // Catagory and Collection
  type: "view",
  props: {
    bgcolor: $color("white"),
    radius: 7
  },
  views: [{
    type: "image",
    props: {
      id: "interface",
      radius: 5,
      bgcolor: $color("white")
    },
    layout: $layout.fill
  }, {
    type: "label",
    props: {
      id: "bottomLayer",
      textColor: $color("white"),
      bgcolor: $color("black"),
      alpha: 0.5,
    },
    layout: function(make, view) {
      make.left.right.bottom.inset(0)
      make.height.equalTo(30)
    }
  }, {
    type: "label",
    props: {
      id: "CCName",
      textColor: $color("white"),
      font: $font(16),
      alpha: 1,
    },
    layout: function(make, view) {
      make.bottom.inset(5)
      make.left.inset(10)
    }
  }, {
    type: "text",
    props: {
      id: "totalVideos",
      editable: "false",
      textColor: $color("white"),
      bgcolor: $color("#5c98f9"),
      font: $font("bold", 13),
      align: $align.center,
      scrollEnabled: false,
      lines: 1,
      insets: $insets(2, 2, 2, 2),
      radius: 10
    },
    layout: function(make, view) {
      make.bottom.inset(5)
      make.right.inset(10)
    }
  }, {
    type: "text",
    props: {
      id: "totalViews",
      editable: "false",
      textColor: $color("white"),
      bgcolor: $color("#5c98f9"),
      font: $font("bold", 13),
      align: $align.center,
      scrollEnabled: false,
      lines: 1,
      insets: $insets(2, 0, 2, 15),
      radius: 3,
    },
    layout: function(make, view) {
      make.top.inset(5)
      make.left.inset(10)
    }
  }, {
    type: "button",
    props: {
      id: "playButton",
      bgcolor: $color("clear"),
      icon: $icon("049", $color("white"), $size(15, 15)),
      alpha: 1,
    },
    layout: function(make, view) {
      make.top.inset(4)
      make.left.equalTo($("totalViews").right).offset(-18)
    },
    events: {
      tapped(sender) {
        $share.sheet(sender.info)
      }
    }
  }],
  layout: $layout.fill
}]

const info = {
  type: "view",
  props: {
    id: "preinfo",
    bgcolor: $color("#dddddd")
  },
  views: [{
    type: "text",
    props: {
      text: "Created by Nicked.\n\nSource from Avgle.\n\nhttps://t.me/nicked",
      bgcolor: $color("#dddddd"),
      textColor: $color("#aaaaaa"),
      font: $font(10),
      align: $align.center
    },

    layout: function(make, view) {
      make.top.inset(50)
      make.height.equalTo(100)
      make.width.equalTo($device.info.screen.width)
    }
  }, {
    type: "image",
    props: {
      src: "https://i.loli.net/2017/11/06/59ffebf2eb071.jpeg",
      radius: 25,
      bgcolor: $color("#dddddd"),
      alpha: 0.8,
      align: $align.center,
    },
    layout: function(make, view) {
      make.size.equalTo($size(50, 50))
      make.top.inset(130)
      make.left.inset(130)
    }

  }, {
    type: "image",
    props: {
      src: "https://i.loli.net/2017/12/22/5a3cd0ff0b781.jpeg",
      radius: 25,
      bgcolor: $color("#dddddd"),
      alpha: 0.8,
      align: $align.center,
    },
    layout: function(make, view) {
      make.size.equalTo($size(50, 50))
      make.top.inset(130)
      make.right.inset(130)
    }

  }, {
    type: "text",
    props: {
      id: "loading",
      text: "Loading...",
      bgcolor: $color("#dddddd"),
      textColor: $color("#888888"),
      font: $font(20),
      align: $align.center
    },

    layout: function(make, view) {
      make.top.inset(200)
      make.height.equalTo(100)
      make.width.equalTo($device.info.screen.width)
    }
  }],
  layout: function(make, view) {
    make.top.equalTo($("search").bottom)
    make.left.right.bottom.inset(0)
  }
}


const statusView = {
  type: "view",
  props: {
    bgcolor: $color("#dddddd"),
    id: "statusView",
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
        if (filterExist) {
          $("filterView").remove();
          filterExist = false;
        }

        if (contentExist) {
          $("contentView").remove();
          contentExist = false;
        }

      },
      changed(sender) {
        if (filterExist) {
          $("filterView").remove();
          filterExist = false;
        }
        if (contentExist) {
          $("contentView").remove();
          contentExist = false;
        }
      },
      returned(sender) {
        sender.blur();
        if (sender.text) {
          mode = "Search";
          var code = codeCorrectify(sender.text);
          if (code !== "none") {
            keyword = code;
            $("search").text = keyword
          } else {
            keyword = sender.text;
          }
          if (CCExist) {
            $("CCView").remove();
            CCExist = false;
            $("Avgle").add(VFView);
            VFExist = true;
            $("search").text = keyword
          }
          contentMode = "Videos";
          cacheContent = "影片";
          $cache.set("cacheContent", cacheContent);
          $("videos").contentOffset = $point(0, 0);
          $("videos").data = [];
          page = -1;
          cacheFilters.Time = "a";
          cacheFilters.View = "bw"
          $cache.set("cacheFilters", cacheFilters)
          getVideoData()
        } else {
          if (CCExist) {
            $("CCView").remove();
            CCExist = false;
            $("Avgle").add(VFView);
            VFExist = true;
          }
          contentMode = "Videos";
          cacheContent = "影片";
          $cache.set("cacheContent", cacheContent);
          mode = "Videos";
          $("videos").contentOffset = $point(0, 0);
          $("videos").data = [];
          page = -1;
          getVideoData();
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
        if (contentExist) {
          $("contentView").remove();
          contentExist = false
        }
        if (filterExist) {
          $("filterView").remove()
          filterExist = false;
          return
        }
        if (contentMode !== "Videos") {
          if (CCExist) {
            $("CCView").remove();
            CCExist = false
            $("Avgle").add(VFView);
            VFExist = true;
          }
          contentMode = "Videos";
          cacheContent = "影片";
          $cache.set("cacheContent", cacheContent);
          mode = "Videos"
          page = -1;
          $("videos").data = [];
          $ui.toast("载入中...", 10);
          getVideoData();
          $("videos").contentOffset = $point(0, 0);
          $ui.toast("", 0.1)
          return
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
        $("filtersT").data = [{ title: "     时间线", rows: data }]
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
        $("filtersV").data = [{ title: "   影片类型", rows: data }]
        filterExist = true;
        $("filterView").updateLayout(function(make) {
          make.height.equalTo(145)
        });
      }
    }

  }, {
    type: "button",
    props: {
      id: "contentButton",
      bgcolor: $color("#dddddd"),
      icon: $icon("067", $color("#ffffff"), $size(25, 25))
    },
    layout: function(make, view) {
      make.top.inset(12)
      make.right.inset(14)
    },
    events: {
      tapped(sender) {
        $device.taptic(0)
        if (filterExist) {
          $("filterView").remove();
          filterExist = false;
        }
        if (contentExist) {
          $("contentView").remove();
          contentExist = false
          return
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
        $("contentList").data = data;
        contentExist = true
        //$ui.action(data)
        $("contentView").updateLayout(function(make) {
          make.height.equalTo(120)
        });
      }
    }

  }, {
    type: "label",
    props: {
      id: "searchResult",
      font: $font(14),
      textColor: $color("#cccccc"),
      text: ""
    },
    layout: function(make, view) {
      make.right.equalTo($("search").right).offset(-5)
      make.top.equalTo(17)
    }

  }],
  layout: function(make, view) {
    make.left.right.top.inset(0);
    make.height.equalTo(45)
  }

}

var scale = $device.info.screen.scale
var VFHeight = (($device.info.screen.width-30)*16/9 + 120)/scale
var CCHeight = ($device.info.screen.width-50)*16/9/scale
const VFView = { // Video and Favorite
  type: "view",
  props: {
    id: "VFView",
    bgcolor: $color("#dddddd"),
  },
  views: [statusView, info, {
    type: "matrix",
    props: {
      id: "videos",
      itemHeight: VFHeight,
      columns: 1,
      spacing: 15,
      square: false,
      bgcolor: $color("clear"),
      template: template,
    },
    layout: function(make, view) {
      make.left.right.bottom.inset(0)
      make.top.equalTo($("statusView").bottom).offset(0)
    },
    events: {
      didSelect(sender, indexPath, data) {
        if (filterExist) {
          $("filterView").remove();
          filterExist = false;
        }
        if (contentExist) {
          $("contentView").remove();
          contentExist = false;
        }
        var url = "https://avgle.com/video/" + data.share.info;
        play(url, indexPath, data.interface.src, "video");
        $delay(2, function() {
          $("player").play();
        })
      },
      didReachBottom(sender) {
        sender.endFetchingMore();
        if (contentMode == "Favorites") {
          return
        }
        if (mode == "Search") {
          getVideoData();
        } else {
          getVideoData();
        }
      },
      pulled(sender) {
        if (filterExist) {
          $("filterView").remove()
          filterExist = false;
        }
        if (contentExist) {
          $("contentView").remove();
          contentExist = false;
        }
        page = -1;
        $("videos").data = [];
        if (contentMode == "Favorites" && mode == "Videos") {
          $("search").placeholder = "共计 " + formatNum(LocalData.favorite.length) + " 个收藏";
          $("searchResult").text = "";
          var temp = LocalFavList;
          tempList = [];
          tempData = { "favorite": [] };
          temp.map(function(i) {
            getFavoriteData(i)
          });
          $ui.toast("更新成功！", 1)
        } else {
          getVideoData();
          $ui.toast("更新成功！", 1);
        }
        $("videos").endRefreshing();
      },
      willBeginDragging(sender) {
        startY = sender.contentOffset.y;

      },
      didEndDragging(sender) {
        endY = sender.contentOffset.y;
        if (Math.abs(endY - startY) > 180) {
          if (filterExist) {
            $("filterView").remove();
            filterExist = false;
          }
          if (contentExist) {
            $("contentView").remove();
            contentExist = false;
          }
          if ($("player")) {
            $("player").pause();
            $("player").stopLoading();
            $("player").remove();
            $ui.loading(false);
          }
        }
      }

    }
  }, ],
  layout: $layout.fill
}

const CCView = { // category and collection
  type: "view",
  props: {
    id: "CCView",
    bgcolor: $color("#dddddd"),
  },
  views: [statusView, info, {
    type: "matrix",
    props: {
      id: "CCList",
      itemHeight: CCHeight,
      columns: 1,
      spacing: 15,
      square: false,
      bgcolor: $color("clear"),
      template: templateC,
    },
    layout: function(make, view) {
      make.left.right.bottom.inset(0)
      make.top.equalTo($("statusView").bottom).offset(0)
    },
    events: {
      didSelect(sender, indexPath, data) {
        if (filterExist) {
          $("filterView").remove();
          filterExist = false;
        }
        if (contentExist) {
          $("contentView").remove();
          contentExist = false;
        }
        $("CCView").remove()
        CCExist = false
        $("Avgle").add(VFView);
        //$ui.render(VFView)
        VFExist = true;
        page = -1;
        $("videos").data = [];
        $("videos").contentOffset = $point(0, 0);
        cacheFilters.Time = "a";
        cacheFilters.View = "bw";
        $cache.set("cacheFilters", cacheFilters);
        if (contentMode == "Categories") {
          contentMode = "Videos";
          mode = "Cat";
          CHID = data.info;
          var name = /(.*)・(.*)/g.exec(data.CCName.text);
          if (!name) {
            catName = data.CCName.text
          } else {
            catName = name[1]
          }
          getVideoData();
        } else if (contentMode == "Collections") {
          contentMode = "Videos";
          mode = "Search";
          keyword = data.info;
          $("search").text = data.info;
          getVideoData();
        }

      },
      didReachBottom(sender) {
        sender.endFetchingMore();
        if (contentMode == "Collections") {
          getCollectionData();
        }
      },
      pulled(sender) {
        if (filterExist) {
          $("filterView").remove();
          filterExist = false;
        }
        if (contentExist) {
          $("contentView").remove();
          contentExist = false;
        }
        $("search").text = "";
        if (contentMode == "Categories") {
          $("CCList").data = [];
          page = -1;
          getCategoryData();
        } else if (contentMode == "Collections") {
          $("CCList").data = [];
          page = -1;
          getCollectionData();
        }
        $ui.toast("更新成功！", 0.1);

        $("CCList").endRefreshing();

      },
      willBeginDragging(sender) {
        startY = sender.contentOffset.y;

      },
      didEndDragging(sender) {
        endY = sender.contentOffset.y;
        if (Math.abs(endY - startY) > 180) {
          if (filterExist) {
            $("filterView").remove();
            filterExist = false;
          }
          if (contentExist) {
            $("contentView").remove();
            contentExist = false;
          }
          if ($("player")) {
            $("player").pause();
            $("player").stopLoading();
            $("player").remove();
            $ui.loading(false);

          }
        }
      }

    }
  }, ],
  layout: $layout.fill
}

function getVideoData() {
  if ($("player")) {
    $("player").pause();
    $("player").stopLoading();
    $("player").remove();
  }
  $ui.loading(true)
  $("loading").text = "Loading..."
  page++;
  if (mode == "Cat") {
    url = "https://api.avgle.com/v1/videos/" + page + "?limit=10&c=" + CHID + "&t=" + cacheFilters.Time + "&o=" + cacheFilters.View;
  } else {
    if (mode == "Search") {
      url = "https://api.avgle.com/v1/search/" + encodeURI(keyword) + "/" + page + "?limit=10&t=" + cacheFilters.Time + "&o=" + cacheFilters.View
    } else {
      url = "https://api.avgle.com/v1/videos/" + page + "?limit=10&t=" + cacheFilters.Time + "&o=" + cacheFilters.View;
    }
  }
  $http.request({
    url: url,
    timeout: 5,
    handler: function(resp) {
      //$ui.action(resp.error)
      //$ui.action(resp.error.indexOf("请求超时"))
      var success = resp.data.success;
      if (!success || !resp.response) {
        $ui.alert("❌ 网络连接出错！");
        //$ui.toast("",0.1)
        return
      }
      var video_num = resp.data.response.total_videos
      if (video_num == 0) {
        $ui.alert("❌ 没有搜索结果！");
        $ui.loading(false);
        $("loading").text = ""
        return
      }
      if (!resp.data.response.has_more && page > 0) {
        $ui.toast("🙈 已经到底了", 1);
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
            title: formatTime(i.addtime),
            info: i.preview_url
          },
          duration: {
            text: formatDuration(i.duration)
          },
          like: {
            text: "❤️ " + formatNum(i.likes) + " 🖤 " + formatNum(i.dislikes) + " ▶️ " + formatNum(i.viewnumber),
            alpha: 0.7,
          },
          hd: {
            hidden: i.hd == true ? false : true
          },
          favorite: {
            title: LocalFavList.indexOf(i.vid) > -1 ? "😍" : "🤔",
            alpha: LocalFavList.indexOf(i.vid) > -1 ? 1 : 0.6,
            info: {
              title: i.title,
              image: i.preview_url,
              time: formatTime(i.addtime),
              duration: formatDuration(i.duration),
              like: "❤️ " + i.likes + " 🖤 " + i.dislikes + " ▶️ " + i.viewnumber,
              hd: i.hd == true ? false : true,
              vid: i.vid,
            }
          },
          share: {
            info: i.vid
          }
        })
      })
      //$ui.toast("", 0.1);
      $ui.loading(false);
      $("loading").text = ""
      if (mode == "Search") {
        $("searchResult").text = filterName[cacheFilters.Time] + "找到 " + formatNum(video_num) + " 个视频";
        $("search").placeholder = "";
      } else {
        if (mode == "Cat") {
          $("search").placeholder = catName + " | " + filterName[cacheFilters.Time] + " " + formatNum(video_num) + " 个视频 ";
        } else {
          $("search").placeholder = filterName[cacheFilters.Time] + " " + formatNum(video_num) + " 个视频 ";
        }
        $("searchResult").text = "";
      }

    }
  })
}

function getFavoriteData(vid) {
  if ($("player")) {
    $("player").pause();
    $("player").stopLoading();
    $("player").remove();
  }
  url = "https://api.avgle.com/v1/video/" + vid;
  $("searchResult").text = "";
  $http.request({
    url: url,
    handler: function(resp) {
      var success = resp.data.success;
      if (!resp.response) {
        $ui.alert("❌ 网络连接出错！");
        //$ui.toast("",0.1)
        return
      }
      if (!success) {
        $ui.alert(url + "❌ 该影片连接出错！\n请稍候再试。")
        return
      }

      var i = resp.data.response.video;
      var info = {
        title: i.title,
        image: i.preview_url,
        time: formatTime(i.addtime),
        duration: formatDuration(i.duration),
        like: "❤️ " + i.likes + " 🖤 " + i.dislikes + " ▶️ " + i.viewnumber,
        hd: i.hd == true ? false : true,
        vid: i.vid,
      };
      $("videos").data = $("videos").data.concat({
        interface: {
          src: i.preview_url
        },
        title: {
          text: i.title
        },
        time: {
          title: formatTime(i.addtime),
          info: i.preview_url
        },
        duration: {
          text: formatDuration(i.duration)
        },
        like: {
          text: "❤️ " + i.likes + " 🖤 " + i.dislikes + " ▶️ " + i.viewnumber,
          alpha: 0.7,
        },
        hd: {
          hidden: i.hd == true ? false : true
        },
        favorite: {
          title: "😍",
          alpha: 1,
          info: info
        },
        share: {
          info: i.vid
        }
      });
      if (contentMode == "Favorites") {
        tempList.push(i.vid);
        tempData.favorite.push(info)
        if (tempList.length == LocalFavList.length) {
          LocalFavList = tempList;
          LocalData = tempData;
          writeCache();
        }
      };

    }
  })
}

function getCollectionData() {
  if ($("player")) {
    $("player").pause();
    $("player").stopLoading();
    $("player").remove();
  }
  $ui.loading(true)
  $("loading").text = "Loading..."
  $("searchResult").text = "";
  page++;
  $http.request({
    url: "https://api.avgle.com/v1/collections/" + page + "?limit=10",
    timeout: 5,
    handler: function(resp) {
      var success = resp.data.success;
      if (!success || !resp.response) {
        $ui.alert("❌ 网络连接出错！");
        return
      }
      if (!resp.data.response.has_more && page > 0) {
        $ui.toast("🙈 已经到底了", 1);
        $ui.loading(false);
        return
      }
      var collections = resp.data.response.collections;
      collections.map(function(i) {
        $("CCList").data = $("CCList").data.concat({
          interface: {
            src: i.cover_url
          },
          CCName: {
            text: i.title
          },
          totalVideos: {
            text: i.video_count.toString()
          },
          totalViews: {
            text: formatNum(i.total_views),
            hidden: false,
          },
          playButton: {
            hidden: false,
            info: i.collection_url
          },
          info: i.keyword

        })
      })
      $("search").text = ""
      $("search").placeholder = "共计 " + formatNum(resp.data.response.total_collections) + " 个合集"
      $ui.loading(false)
      $("loading").text = ""
    }
  })

}

function getCategoryData() { // category and collection
  if ($("player")) {
    $("player").pause();
    $("player").stopLoading();
    $("player").remove();
  }
  $ui.loading(true)
  $("loading").text = "Loading..."
  $("searchResult").text = "";
  url = "https://api.avgle.com/v1/categories"
  $http.request({
    url: url,
    timeout: 5,
    handler: function(resp) {
      var success = resp.data.success;
      if (!success || !resp.response) {
        $ui.alert("❌ 网络连接出错！");
        return
      }
      var categories = resp.data.response.categories

      $("CCList").data = []
      categories.map(function(i) {
        $("CCList").data = $("CCList").data.concat({
          interface: {
            src: i.cover_url
          },
          CCName: {
            text: i.name
          },
          totalVideos: {
            text: formatNum(i.total_videos)
          },
          totalViews: {

            hidden: true,
          },
          playButton: {
            hidden: true
          },
          info: i.CHID
        })
      })
      $("search").text = ""
      $("search").placeholder = "搜索"
      $ui.loading(false)
      $("loading").text = ""
    }
  })
}

function favButtonTapped(sender, info, idx) {
  if (sender.title == "🤔") {
    if ($("player")) {
      sender.title = "😍"
    } else {
      var data = $("videos").data;
      data[idx].favorite.title = "😍";
      data[idx].favorite.alpha = 1;
      $("videos").data = data;
    }
    LocalData.favorite.unshift(info);
    LocalFavList.unshift(info.vid)
    writeCache();
    $ui.toast("😍 已收藏！", 1)
  } else if (sender.title == "😍") {
    if ($("player")) {
      sender.title = "🤔"
    } else {
      var data = $("videos").data;
      data[idx].favorite.title = "🤔";
      data[idx].favorite.alpha = 1;
      $("videos").data = data;
    }
    var idxx = LocalFavList.indexOf(info.vid);
    LocalFavList.splice(idxx, 1);
    LocalData.favorite.splice(idxx, 1);
    writeCache()
    $ui.toast("🤔 已取消！", 1)
  }
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
    return Math.floor(timeDiff / 60) + " 分钟前"
  } else if (timeDiff / 3600 < 24) {
    return Math.floor(timeDiff / 3600) + " 小时前"
  } else {
    return Math.floor(timeDiff / 3600 / 24) + " 天前"
  }

}

function formatNum(num) {
  var num = (num || 0).toString(),
    result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  return result;
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
    return "none"
  } else {
    var reg = /[sS][nN][iI][sS][\s\-]?\d{3}|[aA][bB][pP][\s\-]?\d{3}|[iI][pP][zZ][\s\-]?\d{3}|[sS][wW][\s\-]?\d{3}|[jJ][uU][xX][\s\-]?\d{3}|[mM][iI][aA][dD][\s\-]?\d{3}|[mM][iI][dD][eE][\s\-]?\d{3}|[mM][iI][dD][dD][\s\-]?\d{3}|[pP][gG][dD][\s\-]?\d{3}|[sS][tT][aA][rR][\s\-]?\d{3}|[eE][bB][oO][dD][\s\-]?\d{3}|[iI][pP][tT][dD][\s\-]?\d{3}|[cC][hH][nN][\s\-]?\d{3}/g;
    var match = str.match(reg);
    if (match) {
      var detect = /([a-zA-Z]{3,5})[\s\-]?(\d{3})/g.exec(match[0])
      return detect[1] + "-" + detect[2]
    } else {
      return "none"
    }
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

function play(url, indexPath, poster, videoMode) {
  $ui.loading(true);
  if (videoMode == "video") {
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
          $("player").pause()
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
          layout: function(make, view) {
            var scale = 16 / 9;
            make.top.left.right.inset(0)
            make.height.equalTo(view.width).dividedBy(scale);
          }
        });
      }
    })
  } else if (videoMode == "preview") {
    $ui.toast("正在加载预览视频…", 20);
    if ($("player")) {
      $("player").pause()
      $("player").stopLoading();
      $("player").remove()
    };
    $("videos").cell(indexPath).add({
      type: "video",
      props: {
        id: "player",
        src: url,
        poster: poster,
      },
      layout: function(make, view) {
        var scale = 16 / 9;
        make.top.left.right.inset(0)
        make.height.equalTo(view.width).dividedBy(scale);
      }
    });
  }

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
      text: "本脚本运行内容包含成人视频、图片，可能会引起你的不适，请谨慎运行。\n未满十八岁，禁止运行。\n\n脚本运行需代理，请将 https://avgle.com 加入代理。",
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

function initial() {
  if ($file.read(LocalDataPath)) {
    LocalData = JSON.parse($file.read(LocalDataPath).string);
    LocalFavList = LocalData.favorite.map(i => i.vid);

  } else {
    LocalData = { "favorite": [] };
    LocalFavList = [];
  };
  cacheFilters = $cache.get("cacheFilters") || { "Time": "a", "View": "bw" };
  cacheContent = "影片";
  contentExist = false;
  filterExist = false;
  contentMode = "Videos";
  //$("Avgle").add(VFView)
  VFExist = true; // videos and favorites
  CCExist = false; // categories and collections 
  page = -1;
  
}

function scriptVersionUpdate() {
  $http.get({
    url: "https://raw.githubusercontent.com/nicktimebreak/xteko/master/Avgle/updateInfo",
    handler: function(resp) {
      var afterVersion = resp.data.version;
      var msg = resp.data.msg;
      if (afterVersion > version) {
        $ui.alert({
          title: "检测到新的版本！V" + afterVersion,
          message: "更新后请至扩展列表启动新版本。\n" + msg,
          actions: [{
            title: "更新",
            handler: function() {
              var url = "jsbox://install?url=https://raw.githubusercontent.com/nicktimebreak/xteko/master/Avgle/Avgle.js&name=Avgle" + afterVersion + "&icon=icon_135.png";
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
  if ($cache.get("ADULT")) {
    $("checkAdult").remove()
  }
  initial();
  keyword = clipboardDetect()
  if (keyword == "none") {
    mode = "Videos";
  } else {
    mode = "Search";
    $("search").text = keyword;
  }
  getVideoData();
}

$ui.render({
  props: {
    title: "Avgle",
    bgcolor: $color("#dddddd"),
    id: "Avgle"
  },
  views: [VFView, checkAdultView],
  layout: $layout.fill
})

LocalDataPath = "drive://Avgle.json";
scriptVersionUpdate()
main()