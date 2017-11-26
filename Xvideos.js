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
        searchKeyword = data.title.text;
        $("preview").remove();
        $("input").blur();
        $device.taptic(0);
        page = -1;
        $("input").text = searchKeyword;
        getSearchVideoList()
      }
    }
  }]
}

const searchVideoListView = {
  type: "list",
  props: {
    id: "videoList",
    rowHeight: rowHeight(),
    separatorHidden: true,
    selectable: false,
    header: {
      type: "view",
      props: {
        height: 50
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
            }
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
              page = -1;
              searchKeyword = sender.text;
              getSearchVideoList()
            } else {
              page = -1;
              searchKeyword = null;
              getSearchVideoList()
            };
            $("preview").remove()
          }
        }
      }, {
        type: "label",
        props: {
          id: "inputBg",
          text: "Enter search keywords",
          textColor: $color("#aaaaaa"),
        },
        layout: function(make) {
          make.top.bottom.inset(5)
          make.left.inset(15)
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
        radius: 6
      },
      layout: function(make) {
        make.top.inset(12.5)
        make.left.right.inset(25)
        make.height.equalTo(($device.info.screen.width - 50) / scale)
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
          data[0].rows[sender.info[1].row].videoInfo.bgcolor = $color("red");
          $("videoList").data = data
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
      getSearchVideoList();
    },
    didSelect(sender, indexPath, data) {
      if ($("player")) {
        $("player").stopLoading();
        $("player").remove();
      };
      play(data.url, indexPath)
    },
    willBeginDragging(sender) {
      startY = sender.contentOffset.y;
      if ($("preview")) {
        $("preview").remove()
      }
    },
    didEndDragging(sender) {
      endY = sender.contentOffset.y;
      if (Math.abs(endY - startY) > 120 && $("player")) {
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
    id: "videoList",
    rowHeight: rowHeight(),
    separatorHidden: true,
    selectable: false,
    template: [{
      type: "image",
      props: {
        id: "videoCover",
        borderWidth: 1,
        radius: 6
      },
      layout: function(make) {
        make.top.inset(12.5)
        make.left.right.inset(25)
        make.height.equalTo(($device.info.screen.width - 50) / scale)
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
          videoFavoriteUpdate("del", sender.info)
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
      if ($("player")) {
        $("player").stopLoading();
        $("player").remove();
      };
      play(data.url, indexPath)
    },
    willBeginDragging(sender) {
      startY = sender.contentOffset.y
    },
    didEndDragging(sender) {
      endY = sender.contentOffset.y;
      if (Math.abs(endY - startY) > 120 && $("player")) {
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
        make.left.inset(5)
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
      if (starCountryData.length > 0) {
        $device.taptic(0);
        sender.data = sender.data.concat(starCountryData.splice(0, 30))
      }

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
      page = -1;
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
        selectable: false,
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
          page = -1;
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
        selectable: false,
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
            radius: 6
          },
          layout: function(make) {
            make.top.inset(12.5)
            make.left.right.inset(25)
            make.height.equalTo(($device.info.screen.width - 50) / scale)
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
              download(sender.sender.info[0].url)
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
          getStarVideoList();
        },
        didSelect(sender, indexPath, data) {
          if ($("player")) {
            $("player").stopLoading();
            $("player").remove()
          };
          play(data.url, indexPath)
        },
        willBeginDragging(sender) {
          startY = sender.contentOffset.y
        },
        didEndDragging(sender) {
          endY = sender.contentOffset.y;
          if (Math.abs(endY - startY) > 120 && $("player")) {
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
      items: ["收藏", "搜索", "明星", "频道"]
    },
    layout: function(make) {
      make.top.left.right.inset(0)
      make.height.equalTo(35)
    },
    events: {
      changed(sender) {
        $("content").views.map(i => i.remove());
        page = -1;
        switch (sender.index) {
          case 1:
            $("content").add(searchVideoListView);
            getSearchVideoList();
            break;
          case 3:
            $("content").add(channelListView);
            getChannelList();
            break;
          case 2:
            $("content").add(starCountryListView);
            getStarCountryList();
            break;
          case 0:
            $("content").add(localVideoListView);
            getLocalVideoList()
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
  page++;
  if (searchKeyword) {
    var url = encodeURI(`${domain}/?k=${searchKeyword}&p=${page}`)
  } else {
    var url = page == 0 ? domain : domain + "/new/" + page
  };
  $http.get({
    url: url,
    handler: function(resp) {
      var count = searchKeyword ? /<span\sclass="sub">.*?<\/span>/g.exec(resp.data)[0].replace(/\D*/g, "") : null;
      var match = resp.data.match(/<div\sid="video[\s\S]*?<\/script>/g);
      if ((page > 0 && $("videoList").data[0].rows.length == count) || !match) {
        $("footer").text = "Done!"
        $("videoList").endFetchingMore();
        return
      };
      var items = match.map(function(i, idx) {
        var videoid = /videoid="(.*?)"/.exec(i)[1];
        var time = /<span\sclass="duration">([\s\S]*?)<\/span>/.exec(i)[1];
        var views = /\d*?.\sViews/.exec(i)[0];
        var url = /<a\shref="(.*?)">/.exec(i)[1];
        var image = /data-src="(.*?)"/.exec(i)[1].replace("thumbs169", "thumbs169lll").replace("THUMBNUM", "20");
        var title = /title="(.*?)"/.exec(i)[1];
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
            info: [{ "id": videoid, "title": title, "url": url, "cover": image, "tag": tag, "views": views, "time": time }, { "section": page, "row": idx }],
            title: "  " + time + " - " + views + "  ",
            bgcolor: LocalVideos.indexOf(videoid) > -1 ? $color("red") : $color("#7d7d7d")
          },
          videoTag: {
            text: tag,
            hidden: tag ? false : true
          }
        })
      });
      var rows = page > 0 ? $("videoList").data[0].rows.concat(items) : items;
      $("videoList").endFetchingMore();
      if ($("menu").index == 1) {
        $("videoList").data = [{
          title: searchKeyword ? `${searchKeyword}   (${rows.length}/${count})` : "Recent Update",
          rows: rows
        }];
        $("footer").text = "Page" + (page + 1) + " Done!"
      }
    }
  })
}

function getStarVideoList() {
  $("footer").text = "Loading...";
  $ui.loading(true);
  page++;
  $http.get({
    url: encodeURI(domain + starUrl + "/videos/pornstar/" + page),
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
        var title = /title="(.*?)"/.exec(i)[1];
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
            info: [{ "id": videoid, "title": title, "url": url, "cover": image, "tag": tag, "views": views, "time": time }, { "section": page, "row": idx }],
            title: "  " + time + " - " + views + "  ",
            bgcolor: LocalVideos.indexOf(videoid) > -1 ? $color("red") : $color("#7d7d7d")
          },
          videoTag: {
            text: tag,
            hidden: tag ? false : true
          }
        })
      });
      var data = [{
        title: `Page${page+1}`,
        rows: items
      }];
      $("videoList").endFetchingMore();
      if ($("menu").index == 2) {
        $("videoList").data = $("videoList").data.concat(data);
        $("footer").text = "Page" + (page + 1) + " Done!"
      }
    }
  })
}

function getChannelVideoList() {
  $("footer").text = "Loading...";
  $ui.loading(true);
  page++;
  $http.get({
    url: encodeURI(domain + channelUrl + "/videos/best/" + page),
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
        var title = /title="(.*?)"/.exec(i)[1];
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
            info: [{ "id": videoid, "title": title, "url": url, "cover": image, "tag": tag, "views": views, "time": time }, { "section": page, "row": idx }],
            title: "  " + time + " - " + views + "  ",
            bgcolor: LocalVideos.indexOf(videoid) > -1 ? $color("red") : $color("#7d7d7d")
          },
          videoTag: {
            text: tag,
            hidden: tag ? false : true
          }
        })
      });
      var data = [{
        title: `Page${page+1}`,
        rows: items
      }];
      $("videoList").endFetchingMore();
      if ($("menu").index == 3) {
        $("videoList").data = $("videoList").data.concat(data);
        $("footer").text = "Page" + (page + 1) + " Done!"
      }
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
      starCountryData = data;
      $("starCountryList").data = $("starCountryList").data.concat(starCountryData.splice(0, 30));
      $ui.loading(false)
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
  page++;
  $ui.loading(true);
  $http.get({
    url: domain + "/channels/" + page,
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
      $ui.loading(false)
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
      var listView = mode ? $("localVideoList") : $("videoList");
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
    }
  })
}

function download(url) {
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
                $ui.toast("✅ 下载完成", 0.5);
                $share.sheet(resp.data)
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

function videoInfoButtonTapped(data) {
  if (LocalVideos.indexOf(data.id) > -1) {
    $ui.toast("⚠️ 此视频已在收藏列表中", 0.5)
  } else {
    videoFavoriteUpdate("add", data)
  }
}

function videoFavoriteUpdate(mode, data) {
  switch (mode) {
    case "add":
      LocalData.video.push(data);
      LocalVideos.push(data.id);
      $ui.toast("✅ 已收藏", 0.5);
      break;
    case "del":
      var idx = LocalVideos.indexOf(data.id);
      LocalData.video.splice(idx, 1);
      LocalVideos.splice(idx, 1);
      getLocalVideoList();
      $ui.toast("❎ 已删除", 0.5);
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

function getLocalVideoList() {
  var rows = LocalData.video.map(function(i) {
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
        info: i,
        title: "  " + i.time + " — " + i.views + "  "
      },
      videoTag: {
        text: i.tag,
        hidden: i.tag ? false : true
      }
    }
  });
  $("videoList").data = [{
    title: `${rows.length}  ${rows.length>1?"Favorites":"Favorite"}`,
    rows: rows
  }]
}

function main() {
  domain = "https://www.xvideos.com";
  searchKeyword = null;
  page = -1;
  $("content").add(localVideoListView);
  if ($file.read(LocalDataPath)) {
    LocalData = JSON.parse($file.read(LocalDataPath).string);
    LocalVideos = LocalData.video.map(i => i.id)
  } else {
    LocalData = { "video": [] };
    LocalVideos = []
  };
  getLocalVideoList()
}

LocalDataPath = "drive://xvideos.json"

main()