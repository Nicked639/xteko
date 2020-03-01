/**
 *
 * 如为 US Apple Music 订阅者
 * 可以修改下 COUNTRY 参数为："us"
 * 默认(中国区)："cn"
 *
 * 修改后请下拉刷新以清除缓存，否则不会即时生效
 * emoji 仅反映设置状态，与是否生效无关
 * 
 **/
const COUNTRY = "cn"
const QUERY = ($app.env == $env.today) ? "?version=compress&country=" + COUNTRY : "?country=" + COUNTRY
const TEMPLATE = [{
  type: "view",
  props: {
    id: "cell"
  },
  layout: $layout.fill,
  views: [{
      type: "image",
      props: {
        id: "artwork",
        radius: 5
      },
      layout: function(make) {
        make.size.equalTo($size(60, 60))
        make.centerY.equalTo()
        make.left.inset(10)
      }
    },
    {
      type: "label",
      props: {
        id: "song",
        font: $font("bold", 16),
        textColor: $color("darkGray")
      },
      layout: function(make, view) {
        var pre = view.prev
        var sup = view.super
        make.left.equalTo(pre.right).offset(10)
        make.bottom.equalTo(sup.centerY).offset(-10)
        make.right.inset(10)
      }
    },
    {
      type: "label",
      props: {
        id: "album",
        font: $font(13),
        textColor: $color("gray")
      },
      layout: function(make, view) {
        var pre = view.prev
        var sup = view.super
        make.left.equalTo(pre.left)
        make.centerY.equalTo(sup.centerY)
        make.right.inset(10)
      }
    },
    {
      type: "label",
      props: {
        id: "singer",
        font: $font(13),
        textColor: $color("lightGray")
      },
      layout: function(make, view) {
        var pre = view.prev
        var sup = view.super
        make.left.equalTo(pre.left),
          make.top.equalTo(sup.centerY).offset(10)
        make.right.inset(10)
      }
    },
    {
      type: "label",
      props: {
        id: "order",
        alpha: 0.05,
        align: $align.right,
        shadowColor: $color("darkGray"),
        shadowOffset: $size(1, 1),
        //font: $font("Georgia-Italic", 65),
        font: $font("Didot-Italic", 55),
        textColor: $color("lightGray")
      },
      layout: function(make) {
        make.centerY.equalTo()
        make.right.inset(10)
      }
    },
    {
      type: "label",
      props: {
        id: "order",
        text: "#",
        alpha: 0.06,
        align: $align.right,
        font: $font("Georgia-BoldItalic", 30),
        textColor: $color("lightGray")
      },
      layout: function(make, view) {
        var pre = view.prev
        make.centerY.equalTo(pre)
        make.right.equalTo(pre.left)
      }
    }
  ]
}]

String.prototype.minusDate = function() {
  return this.replace(/^(\d{1,2}\/)(\d{1,2})(\/.+)$/, function(date, $1, $2, $3) {
    return $1 + (parseInt($2) - 1).toString() + $3
  })
}

main()

/* Function */
function main() {
  const TODAY = new Date
  const HOUR = TODAY.getHours()
  const NAME = HOUR < 8 ? TODAY.toLocaleDateString().minusDate() : TODAY.toLocaleDateString()
  const VERSION = ($app.env == $env.today) ? ":compress" : ""
  const CACHE = $cache.get(NAME + VERSION)
  
  if (CACHE) render(CACHE)
  else fetch(NAME + VERSION, VERSION, render)
}

function fetch(cacheName, version, func = null) {
  $ui.loading(true)
  $http.get({
    url: "https://api.ryannn.com/music" + QUERY,
    handler: function(resp) {
      $ui.loading(false)
      $cache.clear()
      $cache.set(cacheName, resp.data)
      if (version == "") {
        var data = JSON.parse(JSON.stringify(resp.data))
        for (var k in data) {
          delete data[k].playlist
        }
        $cache.set(cacheName + ":compress", data)
      }
      if (func) func(resp.data)
    }
  })
}

function render(data) {
  var d = generateSongs(data)

  $ui.render({
    props: {
      title: "Top Playlists " + (COUNTRY == "cn" ? "🇨🇳" : "🇺🇸")
    },
    views: [{
      type: "view",
      props: {
        id: "main"
      },
      layout: $layout.fill,
      views: [{
          // From
          type: "stepper",
          props: {
            id: "from_stepper",
            step: 5,
            min: 1,
            value: 1,
            max: d.lens[0],
            tintColor: $color("tint")
          },
          layout: function(make) {
            make.height.equalTo(30)
            make.top.equalTo(75 + 45)
            make.left.inset(15)
          },
          events: {
            changed: function(sender) {
              $("to_stepper").min = sender.value
              $("from_label").text = "From: " + sender.value.toString()
            }
          }
        },
        {
          // From Index
          type: "label",
          props: {
            id: "from_label",
            text: "From: 1",
            textColor: $color("darkGray")
          },
          layout: function(make) {
            var pre = $("from_stepper")
            make.height.equalTo(30)
            make.bottom.equalTo(pre.top).offset(-5)
            make.centerX.equalTo(pre.centerX)
          }
        },
        {
          // Edit
          type: "button",
          props: {
            id: "edit_button",
            icon: $icon("030", $color("tint")),
            bgcolor: $color("clear")
          },
          layout: function(make) {
            var ppre = $("from_stepper")
            make.top.equalTo(ppre.top)
            make.left.equalTo(ppre.right).offset(10)
            make.width.equalTo(30)
            make.centerY.equalTo(ppre)
          },
          events: {
            tapped: function(sender) {
              editMode()
            }
          }
        },
        {
          // To
          type: "stepper",
          props: {
            id: "to_stepper",
            step: 5,
            min: 1,
            value: d.lens[0],
            max: d.lens[0],
            tintColor: $color("tint")
          },
          layout: function(make) {
            var pre = $("edit_button")
            make.height.equalTo(30)
            make.top.equalTo(pre.top)
            make.left.equalTo(pre.right).offset(10)
          },
          events: {
            changed: function(sender) {
              $("from_stepper").max = sender.value
              $("to_label").text = "To: " + sender.value.toString()
            }
          }
        },
        {
          // To Index
          type: "label",
          props: {
            id: "to_label",
            text: "To: " + d.lens[0],
            textColor: $color("darkGray")
          },
          layout: function(make) {
            var pre = $("to_stepper")
            make.height.equalTo(30)
            make.bottom.equalTo(pre.top).offset(-5)
            make.centerX.equalTo(pre.centerX)
          }
        },
        {
          // Playlists
          type: "tab",
          props: {
            id: "tab",
            items: d.keys,
            tintColor: $color("tint")
          },
          layout: function(make) {
            var left = $("from_stepper")
            var right = $("to_stepper")
            make.left.equalTo(left)
            make.right.equalTo(right)
            make.height.equalTo(30)
            make.top.inset(45)
          },
          events: {
            changed: function(sender) {
              var idx = sender.index
              $("from_stepper").min = 1
              $("from_stepper").max = d.lens[idx]
              $("from_label").text = "From: " + $("from_stepper").value

              $("to_stepper").max = d.lens[idx]
              $("to_stepper").value = d.lens[idx]
              $("to_label").text = "To: " + d.lens[idx]
              $("update").text = "Updated: " + d.times[idx]

              // Run from main app
              if ($app.env != $env.today) {
                generateListData(data[d.keys[idx]].playlist)
                $("list").scrollTo({
                  indexPath: $indexPath(0, 0)
                })
              }
            }
          }
        },
        {
          // Playlist Title
          type: "label",
          props: {
            text: "Top Playlists",
            textColor: $color("darkGray")
          },
          layout: function(make) {
            var pre = $("tab")
            make.height.equalTo(30)
            make.bottom.equalTo(pre.top).offset(-5)
            make.centerX.equalTo(pre.centerX)
          }
        },
        {
          // Shuffle Mode
          type: "switch",
          props: {
            id: "shuffle",
            on: false,
            onColor: $color("tint")
          },
          layout: function(make) {
            make.height.equalTo(30)
            make.top.inset(45)
            make.right.inset(25)
          }
        },
        {
          // Shuffle Label
          type: "label",
          props: {
            text: "Shuffle",
            textColor: $color("darkGray")
          },
          layout: function(make) {
            var pre = $("shuffle")
            make.height.equalTo(30)
            make.bottom.equalTo(pre.top).offset(-5)
            make.centerX.equalTo(pre.centerX)
          }
        },
        {
          // Play
          type: "button",
          props: {
            id: "play",
            icon: $icon("049", $color("tint")),
            bgcolor: $color("clear")
          },
          layout: function(make) {
            var ppre = $("shuffle")
            make.height.equalTo(30)
            make.width.equalTo(50)
            make.top.equalTo(ppre.bottom).offset(45)
            make.right.inset(20)
          },
          events: {
            tapped: function(sender) {
              playQueue($("from_stepper").value - 1, $("to_stepper").value, d.songs[$("tab").index], d.keys[$("tab").index], $("shuffle").on)
            }
          }
        },
        {
          // Play Label
          type: "label",
          props: {
            text: "Play",
            textColor: $color("darkGray")
          },
          layout: function(make) {
            var pre = $("play")
            make.height.equalTo(30)
            make.bottom.equalTo(pre.top).offset(-5)
            make.centerX.equalTo(pre.centerX)
          }
        },
        {
          type: "view",
          layout: function(make, view) {
            var ppre = view.prev.prev
            make.top.equalTo(ppre.bottom).offset(15)
            make.left.bottom.right.inset(0)
          },
          views: [{
            type: "list",
            layout: $layout.fill,
            props: {
              selectable: false,
              separatorHidden: true,
              rowHeight: 80,
              template: TEMPLATE,
              footer: {
                type: "label",
                props: {
                  id: "update",
                  height: 30,
                  align: $align.center,
                  font: $font(15),
                  textColor: $color("lightGray"),
                  text: "Updated: " + d.times[0]
                }
              },
              actions: [{
                title: "Search",
                handler: function(sender, indexPath) {
                  var data = sender.object(indexPath)
                  var song = data.song.text
                  var singer = data.singer.text
                  actionSearch(song, singer)
                }
              }]
            },
            events: {
              pulled: function(sender) {
                $delay(1, function() {
                  $addin.run($addin.current.name)
                })
                $("list").endRefreshing()
                $cache.clear()
              },
              longPressed: function(sender) {
                var point = sender.location.runtimeValue().invoke("CGPointValue")
                var indexPath = sender.sender.runtimeValue().invoke("indexPathForRowAtPoint", point)
                if (indexPath) {
                  $device.taptic(0)
                  var data = $("list").object(indexPath.rawValue())
                  playSong(data)
                }
              }
            }
          }]
        }
      ]
    }]
  })

  // Run from main app
  if ($app.env == $env.app) {
    $("main").bgcolor = $color("#FAFAFA")
    generateListData(data[d.keys[0]].playlist)
  } else if ($app.env == $env.siri) {
    var playlist = JSON.parse($clipboard.text).playlist
    var idx = d.keys.indexOf(playlist)
    
    playQueue(0, d.lens[idx], d.songs[idx], d.keys[idx])
    $intents.finish("Playing...")
  }
}

function actionSearch(song, singer) {
  $clipboard.text = song + " " + singer
  $ui.toast(song + " - " + singer)
  $ui.alert({
    title: "Clipborad Set",
    message: "Open Music App and paste to search.",
    actions: [{
        title: "Cancel",
        style: "Cancel",
        handler: function() {}
      },
      {
        title: "Open",
        handler: function() {
          $app.openURL("music://")
        }
      }
    ]
  })
}

function generateSongs(data) {
  var keys = []
  var songs = []
  var lens = []
  var times = []
  for (var k in data) {
    keys.push(k)
    songs.push(data[k].results)
    lens.push(data[k].results.length)
    times.push(data[k].updateTime)
  }
  
  return {
    keys: keys,
    songs: songs,
    lens: lens,
    times: times
  }
}

function generateListData(list) {
  var data = []
  var idx = 1
  for (var i of list) {
    var d = {
      cell: {
        bgcolor: i.success ? $color("white") : $color("#FFF0F5")
      },
      artwork: {
        src: i.artwork
      },
      song: {
        text: i.song
      },
      album: {
        text: i.album || "Unknown"
      },
      singer: {
        text: i.singer
      },
      order: {
        text: idx.toString()
      },
      id: i.id
    }
    data.push(d)
    idx++
  }
  $("list").data = data
}

function playQueue(start, end, songs, playlist, shuffle = false) {
  $ui.loading("Preparing")
  var sysPlayer = $objc("MPMusicPlayerController").invoke("systemMusicPlayer")

  var queue = []
  for (var i = start; i < end; i++) {
    queue.push(songs[i].toString())
  }
//  console.log(queue)
  var text = "Playing " + playlist + " #" + $("from_stepper").value + " To #" + $("to_stepper").value + " ..."
  play(sysPlayer, queue, text, shuffle)
}

function playSong(data) {
  var id = data.id
  if (id) {
    $ui.alert({
      title: data.song.text,
      message: data.singer.text + "\n\nSure to play?",
      actions: [{
          title: "Cancel",
          style: "Cancel",
          handler: function() {}
        },
        {
          title: "Play",
          handler: function() {
            $ui.loading("Preparing")
            var sysPlayer = $objc("MPMusicPlayerController").invoke("systemMusicPlayer")
            var text = "Playing " + data.song.text + " ..."
            play(sysPlayer, [data.id.toString()], text)
          }
        }
      ]
    })
  }
}

function play(player, queue, message, shuffle = false) {
  console.log(queue)
  
  var handler = $block("void, NSError *", function(error) {
    $ui.loading(false)
    player.$play();
    $ui.toast(message)
    $delay(1, function() {
      if (shuffle) {
        player.$setShuffleMode(1);
      }
    })
  })
 
  // Stop if playback state is not 0
      let state = player.$playbackState();
      if (state > 0) player.$stop();
      // Turn off shuffle mode
      player.$setShuffleMode(1);
      player.$setQueueWithStoreIDs(queue);
      player.$prepareToPlayWithCompletionHandler(handler);
     
}

function editMode() {
  if (typeof $("from_input") != "undefined") {
    exitEditMode()
    return
  }
  $app.keyboardToolbarEnabled = true

  $("tab").enabled = false
  $("shuffle").enabled = false
  $("play").enabled = false
  $("from_stepper").enabled = false
  $("to_stepper").enabled = false

  $("main").add({
    type: "input",
    props: {
      id: "from_input",
      alpha: 0,
      text: $("from_stepper").value.toString(),
      align: $align.center,
      type: $kbType.number,
      leftViewMode: false,
      clearButtonMode: false,
      textColor: $color("darkGray")
    },
    layout: function(make) {
      var pre = $("from_label")
      make.centerX.equalTo(pre)
      make.top.equalTo(pre)
      make.bottom.equalTo(pre)
      make.width.equalTo(80)
    },
    events: {
      didEndEditing: function(sender) {
        $delay(0.1, function() {
          if (!$("to_input").editing) {
            exitEditMode()
          }
        })
      }
    }
  })
  $("main").add({
    type: "input",
    props: {
      id: "to_input",
      alpha: 0,
      text: $("to_stepper").value.toString(),
      align: $align.center,
      type: $kbType.number,
      leftViewMode: false,
      clearButtonMode: false,
      textColor: $color("darkGray")
    },
    layout: function(make) {
      var pre = $("to_label")
      make.centerX.equalTo(pre)
      make.top.equalTo(pre)
      make.bottom.equalTo(pre)
      make.width.equalTo(80)
    },
    events: {
      didEndEditing: function(sender) {
        $delay(0.1, function() {
          if (!$("from_input").editing) {
            exitEditMode()
          }
        })
      }
    }
  })
  $("main").add({
    type: "view",
    props: {
      id: "mask",
      alpha: 0,
      bgcolor: $color("#FAFAFA")
    },
    layout: function(make) {
      var pre = $("list")
      make.edges.equalTo(pre)
    },
    events: {
      tapped: function(sender) {
        $("from_input").blur()
        $("to_input").blur()
      }
    }
  })

  $ui.animate({
    duration: 0.4,
    animation: function() {
      $("from_input").alpha = 1
      $("from_label").alpha = 0
      $("to_input").alpha = 1
      $("to_label").alpha = 0
      $("mask").alpha = 0.5
    },
    completion: function() {
      $("from_input").focus()
    }
  })
}

function exitEditMode() {
  $app.keyboardToolbarEnabled = false

  var from = parseInt($("from_input").text)
  var to = parseInt($("to_input").text)
  if (from <= to) {
    var max = $("to_stepper").max
    if (from < max) {
      $("from_stepper").value = from
      $("from_label").text = "From: " + from

      $("to_stepper").min = from
    } else {
      $("from_stepper").value = max
      $("from_label").text = "From: " + max

      $("to_stepper").min = max
    }
    if (to > max) {
      $("to_stepper").value = max
      $("to_label").text = "To: " + max

      $("from_stepper").max = max
    } else {
      $("to_stepper").value = to
      $("to_label").text = "To: " + to

      $("from_stepper").max = to
    }
  }

  $("tab").enabled = true
  $("shuffle").enabled = true
  $("play").enabled = true
  $("from_stepper").enabled = true
  $("to_stepper").enabled = true
  $ui.animate({
    duration: 0.4,
    animation: function() {
      $("from_input").alpha = 0
      $("from_label").alpha = 1
      $("to_input").alpha = 0
      $("to_label").alpha = 1
      $("mask").alpha = 0
    },
    completion: function() {
      $("from_input").remove()
      $("to_input").remove()
      $("mask").remove()
    }
  })
}

function shadow(view) {
  var layer = view.runtimeValue().invoke("layer")
  layer.invoke("setCornerRadius", 10)
  layer.invoke("setShadowOffset", $size(3, 3))
  layer.invoke("setShadowColor", $color("gray").runtimeValue().invoke("CGColor"))
  layer.invoke("setShadowOpacity", 0.3)
  layer.invoke("setShadowRadius", 5)
}
