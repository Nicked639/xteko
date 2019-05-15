var wid = $device.info.screen.width;
var low_case = [["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"], ["a", "s", "d", "f", "g", "h", "j", "k", "l"], ["z", "x", "c", "v", "b", "n", "m"]]
var up_case = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L"], ["Z", "X", "C", "V", "B", "N", "M"]]
var num_board = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], ["-", "/", ":", ";", "()", "\"", "$", "&", "@"], [".", ",", "?", "!", "\'", "*", "_"]]
var DEFAULT = 0
var NUM = 0
var btn_h = 52
var spacing = 4.5
var radius = 5
var bgcolor = $color("#DCDCDC")
var shadowcolor = $color("#808080")
var randomcolor = ["#DE8D76", "#76CDBD", "#B5CD54"]
//var shadowcolor = $color(randomcolor[Math.floor(Math.random() * (11))])

var temp_26 = {
  props: {},
  views: [{
    type: "view",
    props: {
      id: "s_color",
      radius: radius,
      bgcolor: shadowcolor
    },
    layout: $layout.fill
  }, {
    type: "view",
    props: {
      id: "label_bg",
      radius: radius,
      bgcolor: $color("white")
    },
    layout: function (make, view) {
      make.top.left.right.inset(0)
      make.bottom.inset(1.5)
    }
  },
  {
    type: "label",
    props: {
      id: "label",
      bgcolor: $color("clear"),
      textColor: $color("#000000"),
      align: $align.center,
      font: $font(20)
    },
    layout: $layout.fill
  }]
}

var temp_shift = {
  props: {},
  views: [{
    type: "view",
    props: {
      id: "s_color",
      radius: radius,
      bgcolor: shadowcolor
    },
    layout: $layout.fill
  }, {
    type: "view",
    props: {
      radius: radius,
      bgcolor: $color("white")
    },
    layout: function (make, view) {
      make.top.left.right.inset(0)
      make.bottom.inset(1.5)
    }
  }, {
    type: "view",
    props: {
      bgcolor: $color("clear"),
      clipsToBounds: true
    },
    layout: function (make, view) {
      make.size.equalTo($size(20, 20))
      make.center.equalTo(view.super)
    },
    views: [{
      type: "button",
      props: {
        id: "img",
        bgcolor: $color("clear")
      },
      layout: function (make, view) {
        make.size.equalTo($size(20, 60))
        make.top.left.inset(0)
      }
    }]
  }, {
    type: "view",
    props: {
      bgcolor: $color("clear")
    },
    layout: $layout.fill
  }]
}

var temp_delete = {
  props: {},
  views: [{
    type: "view",
    props: {
      id: "s_color",
      radius: radius,
      bgcolor: shadowcolor
    },
    layout: $layout.fill
  }, {
    type: "view",
    props: {
      radius: radius,
      bgcolor: $color("white")
    },
    layout: function (make, view) {
      make.top.left.right.inset(0)
      make.bottom.inset(1.5)
    }
  }, {
    type: "view",
    props: {
      bgcolor: $color("clear"),
      clipsToBounds: true
    },
    layout: function (make, view) {
      make.size.equalTo($size(23, 23))
      make.center.equalTo(view.super)
    },
    views: [{
      type: "button",
      props: {
        id: "img",
        bgcolor: $color("clear")
      },
      layout: function (make, view) {
        make.size.equalTo($size(23, 23))
        make.top.left.inset(0)
      }
    }]
  }, {
    type: "view",
    props: {
      bgcolor: $color("clear")
    },
    layout: $layout.fill
  }]
}

$cache.set("case", "2")

$ui.render({
  props: {
    title: "",
    bgcolor: bgcolor,
  },
  views: [{
    type: "matrix",
    props: {
      id: "row_0",
      scrollEnabled: false,
      columns: 10,
      itemHeight: btn_h - 6,
      spacing: spacing,
      bgcolor: bgcolor,
      template: temp_26,
      data: low_case[0].map(function (item) {
        return {
          s_color: {
            bgcolor: $color(randomcolor[Math.floor(Math.random() * (randomcolor.length))])
          },
          label: {
            text: "" + item
          }
        }
      })
    },
    layout: function (make, view) {
      make.size.equalTo($size(wid, btn_h))
      make.centerY.equalTo(view.super).offset(-40)
      make.centerX.equalTo(view.super)
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        $keyboard.insert(data.label.text)
        if ($cache.get("case") === 0) {
          lowcase()
          DEFAULT = 0
          $("img").updateLayout(function (make) {
            make.top.inset(-20 * (DEFAULT % 3))
          })
        }
      }
    }
  }, {
    type: "matrix",
    props: {
      id: "row_1",
      scrollEnabled: false,
      columns: 10,
      itemHeight: btn_h - 6,
      spacing: spacing,
      bgcolor: bgcolor,
      template: temp_26,
      data: low_case[1].map(function (item) {
        return {
          s_color: {
            bgcolor: $color(randomcolor[Math.floor(Math.random() * (randomcolor.length))])
          },
          label: {
            text: "" + item
          }
        }
      })
    },
    layout: function (make, view) {
      make.size.equalTo($size(wid, btn_h))
      make.left.equalTo(view.super).inset(20.7)
      make.top.equalTo(view.prev.bottom).offset(5)
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        $keyboard.insert(data.label.text)
        if ($cache.get("case") === 0) {
          lowcase()
          DEFAULT = 0
          $("img").updateLayout(function (make) {
            make.top.inset(-20 * (DEFAULT % 3))
          })
        }
      }
    }
  }, {
    type: "matrix",
    props: {
      id: "row_2",
      scrollEnabled: false,
      columns: 10,
      itemHeight: btn_h - 6,
      spacing: spacing,
      bgcolor: bgcolor,
      template: temp_26,
      data: low_case[2].map(function (item) {
        return {
          s_color: {
            bgcolor: $color(randomcolor[Math.floor(Math.random() * (randomcolor.length))])
          },
          label: {
            text: "" + item
          }
        }
      })
    },
    layout: function (make, view) {
      make.size.equalTo($size(wid, btn_h))
      make.left.equalTo(view.super).inset(62)
      make.top.equalTo(view.prev.bottom).offset(5)
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        $keyboard.insert(data.label.text)
        if ($cache.get("case") === 0) {
          lowcase()
          DEFAULT = 0
          $("img").updateLayout(function (make) {
            make.top.inset(-20 * (DEFAULT % 3))
          })
          $cache.set("case", 2)
        }
      }
    }
  }, {
    type: "matrix",
    props: {
      id: "shift",
      scrollEnabled: false,
      columns: 1,
      spacing: spacing,
      itemHeight: btn_h - 6,
      bgcolor: bgcolor,
      template: temp_shift,
      data: [{
        s_color: {
          bgcolor: $color(randomcolor[Math.floor(Math.random() * (randomcolor.length))])
        },
        img: {
          src: "assets/shift.png"
        }
      }]
    },
    layout: function (make, view) {
      make.size.equalTo($size(51, btn_h))
      make.left.inset(5)
      make.top.equalTo(view.prev.top)
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        //缓存大小写状态
        $cache.set("case", DEFAULT % 3)
        //字母大小写转换
        if (NUM % 2 != 1) {
          if (DEFAULT % 3 === 2) {
            lowcase()
          } else {
            upcase()
          }
          DEFAULT++
          //图标切换
          $("img").updateLayout(function (make) {
            make.top.inset(-20 * (DEFAULT % 3))
          })
        }
      }
    }
  }, {
    type: "matrix",
    props: {
      id: "del",
      scrollEnabled: false,
      columns: 1,
      itemHeight: btn_h - 6,
      spacing: 4,
      bgcolor: bgcolor,
      template: temp_delete,
      data: [{
        s_color: {
          bgcolor: $color(randomcolor[Math.floor(Math.random() * (randomcolor.length))])
        },
        img: {
          src: "assets/del.png"
        }
      }]
    },
    layout: function (make, view) {
      make.size.equalTo($size(51, btn_h))
      make.right.inset(5)
      make.top.equalTo(view.prev.top)
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        $keyboard.delete()
      }
    }
  }, {
    type: "matrix",
    props: {
      id: "punc",
      scrollEnabled: false,
      columns: 1,
      itemHeight: btn_h - 6,
      spacing: 4,
      bgcolor: bgcolor,
      template: temp_26,
      data: [redata("123")]
    },
    layout: function (make, view) {
      make.size.equalTo($size(51, btn_h))
      make.left.inset(5)
      make.top.equalTo(view.prev.bottom)
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        if (NUM % 2 === 0) {
          numboard()
          $("punc").data = [redata("abc")]
          $("img").updateLayout(function (make) {
            make.top.inset(0)
          })
        } else {
          lowcase()
          $("punc").data = [redata("123")]
        }
        NUM++
      }
    }
  }, {
    type: "matrix",
    props: {
      id: "earth",
      scrollEnabled: false,
      columns: 1,
      itemHeight: btn_h - 6,
      spacing: 4,
      bgcolor: bgcolor,
      template: temp_delete,
      data: [{
        s_color: {
          bgcolor: $color(randomcolor[Math.floor(Math.random() * (randomcolor.length))])
        },
        img: {
          src: "assets/earth.png"
        }
      }]
    },
    layout: function (make, view) {
      make.size.equalTo($size(51, btn_h))
      make.left.equalTo(view.prev.right)
      make.top.equalTo(view.prev.top)
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        $keyboard.next()
      }
    }
  }, {
    type: "matrix",
    props: {
      id: "space",
      scrollEnabled: false,
      columns: 1,
      itemHeight: btn_h - 6,
      spacing: 4,
      bgcolor: bgcolor,
      template: temp_26,
      data: [redata("Space")]
    },
    layout: function (make, view) {
      make.size.equalTo($size(wid - 51 * 4, btn_h))
      make.left.equalTo(view.prev.right)
      make.top.equalTo(view.prev.top)
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        $keyboard.insert(" ")
      }
    }
  }, {
    type: "matrix",
    props: {
      id: "enter",
      scrollEnabled: false,
      columns: 1,
      itemHeight: btn_h - 6,
      spacing: 4,
      bgcolor: bgcolor,
      template: temp_26,
      data: [{
        s_color: {
          bgcolor: $color("darkGray")
        },
        label_bg: {
          bgcolor: $color("#3478F2")
        },
        label: {
          text: "Enter",
          font: $font(17),
          textColor: $color("white")
        }
      }]
    },
    layout: function (make, view) {
      make.size.equalTo($size(92, btn_h))
      make.left.equalTo(view.prev.right)
      make.top.equalTo(view.prev.top)
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        $keyboard.send()
      }
    }
  }],
  layout: function (make, view) {
    make.size.equalTo($size(wid, 267))
    make.center.equalTo(view.super)
  }
});

function trans(ca, idx) {
  let ccc = (ca === 0 ? low_case : (ca === 1 ? up_case : num_board))
  let data = ccc[idx].map(function (item) {
    return {
      label: {
        text: "" + item
      }
    }
  })
  return data
}

function redata(txt) {
  return {
    s_color: {
      bgcolor: $color(randomcolor[Math.floor(Math.random() * (randomcolor.length))])
    },
    label: {
      text: txt,
      font: $font(15)
    }
  }

}

function lowcase() {
  $("row_0").data = trans(0, 0)
  $("row_1").data = trans(0, 1)
  $("row_2").data = trans(0, 2)
}

function upcase() {
  $("row_0").data = trans(1, 0)
  $("row_1").data = trans(1, 1)
  $("row_2").data = trans(1, 2)
}

function numboard() {
  $("row_0").data = trans(2, 0)
  $("row_1").data = trans(2, 1)
  $("row_2").data = trans(2, 2)
}