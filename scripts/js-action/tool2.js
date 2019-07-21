const Constants = {
  margins: {
    regular: 10
  },
  radius: 4,
  colors: {
    lightGray: $color("#eeeeee")
  }
};

function showViews(title, views) {
  $ui.push({
    props: {
      title: title
    },
    views: views
  });
}

function showNumberBases(title) {
  function handleNumberChanged(sender, radix) {
    var decimal = parseInt(sender.text, radix);
    var bases = [
      { radix: 10, view: $("input-dec") },
      { radix: 16, view: $("input-hex") },
      { radix: 8, view: $("input-oct") },
      { radix: 2, view: $("input-bin") }
    ];
    bases.forEach(function(item) {
      item.view.text = isNaN(decimal)
        ? ""
        : decimal.toString(item.radix).toUpperCase();
    });
  }

  showViews(title, [
    {
      type: "button",
      props: {
        id: "label-dec",
        title: "Dec",
        align: $align.center
      },
      layout: function(make) {
        make.size.equalTo($size(64, 32));
        make.top.right.inset(Constants.margins.regular);
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = $("input-dec").text;
          $ui.toast("已复制", 0.3);
        }
      }
    },
    {
      type: "input",
      props: {
        id: "input-dec",
        type: $kbType.number
      },
      layout: function(make) {
        make.left.top.equalTo(Constants.margins.regular);
        make.height.equalTo(32);
        make.right
          .equalTo($("label-dec").left)
          .inset(Constants.margins.regular);
      },
      events: {
        changed: function(sender) {
          handleNumberChanged(sender, 10);
        }
      }
    },
    {
      type: "button",
      props: {
        id: "label-hex",
        title: "Hex",
        align: $align.center
      },
      layout: function(make) {
        var topView = $("label-dec");
        make.left.right.equalTo(topView);
        make.size.equalTo(topView);
        make.top.equalTo(topView.bottom).offset(Constants.margins.regular);
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = $("input-hex").text;
          $ui.toast("已复制", 0.3);
        }
      }
    },
    {
      type: "input",
      props: {
        id: "input-hex",
        type: $kbType.ascii
      },
      layout: function(make) {
        var alignView = $("label-hex");
        make.left.equalTo(Constants.margins.regular);
        make.top.height.equalTo(alignView);
        make.right.equalTo(alignView.left).inset(Constants.margins.regular);
      },
      events: {
        changed: function(sender) {
          handleNumberChanged(sender, 16);
        }
      }
    },
    {
      type: "button",
      props: {
        id: "label-oct",
        title: "Oct",
        align: $align.center
      },
      layout: function(make) {
        var topView = $("label-hex");
        make.left.right.equalTo(topView);
        make.size.equalTo(topView);
        make.top.equalTo(topView.bottom).offset(Constants.margins.regular);
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = $("input-oct").text;
          $ui.toast("已复制", 0.3);
        }
      }
    },
    {
      type: "input",
      props: {
        id: "input-oct",
        type: $kbType.number
      },
      layout: function(make) {
        var alignView = $("label-oct");
        make.left.equalTo(Constants.margins.regular);
        make.top.height.equalTo(alignView);
        make.right.equalTo(alignView.left).inset(Constants.margins.regular);
      },
      events: {
        changed: function(sender) {
          handleNumberChanged(sender, 8);
        }
      }
    },
    {
      type: "button",
      props: {
        id: "label-bin",
        title: "Bin",
        align: $align.center
      },
      layout: function(make) {
        var topView = $("label-oct");
        make.left.right.equalTo(topView);
        make.size.equalTo(topView);
        make.top.equalTo(topView.bottom).offset(Constants.margins.regular);
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = $("input-bin").text;
          $ui.toast("已复制", 0.3);
        }
      }
    },
    {
      type: "input",
      props: {
        id: "input-bin",
        type: $kbType.number
      },
      layout: function(make) {
        var alignView = $("label-bin");
        make.left.equalTo(Constants.margins.regular);
        make.top.height.equalTo(alignView);
        make.right.equalTo(alignView.left).inset(Constants.margins.regular);
      },
      events: {
        changed: function(sender) {
          handleNumberChanged(sender, 2);
        }
      }
    }
  ]);
}

function showBase64Encoder(title) {
  function handleTextChanged(sender) {
    var topView = $("text-base64-top");
    var bottomView = $("text-base64-bottom");
    if (sender === topView) {
      bottomView.text = $text.base64Encode(topView.text);
    } else {
      topView.text = $text.base64Decode(bottomView.text);
    }
  }

  showViews(title, [
    {
      type: "text",
      props: {
        id: "text-base64-top",
        bgcolor: Constants.colors.lightGray,
        radius: Constants.radius
      },
      layout: function(make, view) {
        make.left.top.right.inset(Constants.margins.regular);
        make.height.equalTo(120);
      },
      events: {
        changed: handleTextChanged
      }
    },
    {
      type: "button",
      props: {
        title: "Copy"
      },
      layout: function(make) {
        make.bottom.right
          .equalTo($("text-base64-top"))
          .inset(Constants.margins.regular);
        make.size.equalTo($size(56, 28));
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = $("text-base64-top").text;
          $ui.toast("已复制", 0.3);
        }
      }
    },
    {
      type: "text",
      props: {
        id: "text-base64-bottom",
        bgcolor: Constants.colors.lightGray,
        radius: Constants.radius
      },
      layout: function(make, view) {
        var topView = $("text-base64-top");
        make.left.right.inset(Constants.margins.regular);
        make.top.equalTo(topView.bottom).offset(Constants.margins.regular);
        make.height.equalTo(topView);
      },
      events: {
        changed: handleTextChanged
      }
    },
    {
      type: "button",
      props: {
        title: "Copy"
      },
      layout: function(make) {
        make.bottom.right
          .equalTo($("text-base64-bottom"))
          .inset(Constants.margins.regular);
        make.size.equalTo($size(56, 28));
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = $("text-base64-bottom").text;
          $ui.toast("已复制", 0.3);
        }
      }
    }
  ]);
}

function showURLEncoder(title) {
  function handleTextChanged(sender) {
    var topView = $("text-url-top");
    var bottomView = $("text-url-bottom");
    if (sender === topView) {
      bottomView.text = $text.URLEncode(topView.text);
    } else {
      topView.text = $text.URLDecode(bottomView.text);
    }
  }

  showViews(title, [
    {
      type: "text",
      props: {
        id: "text-url-top",
        bgcolor: Constants.colors.lightGray,
        radius: Constants.radius
      },
      layout: function(make, view) {
        make.left.top.right.inset(Constants.margins.regular);
        make.height.equalTo(120);
      },
      events: {
        changed: handleTextChanged
      }
    },
    {
      type: "button",
      props: {
        title: "Copy"
      },
      layout: function(make) {
        make.bottom.right
          .equalTo($("text-url-top"))
          .inset(Constants.margins.regular);
        make.size.equalTo($size(56, 28));
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = $("text-url-top").text;
          $ui.toast("已复制", 0.3);
        }
      }
    },
    {
      type: "text",
      props: {
        id: "text-url-bottom",
        bgcolor: Constants.colors.lightGray,
        radius: Constants.radius
      },
      layout: function(make, view) {
        var topView = $("text-url-top");
        make.left.right.inset(Constants.margins.regular);
        make.top.equalTo(topView.bottom).offset(Constants.margins.regular);
        make.height.equalTo(topView);
      },
      events: {
        changed: handleTextChanged
      }
    },
    {
      type: "button",
      props: {
        title: "Copy"
      },
      layout: function(make) {
        make.bottom.right
          .equalTo($("text-url-bottom"))
          .inset(Constants.margins.regular);
        make.size.equalTo($size(56, 28));
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = $("text-url-bottom").text;
          $ui.toast("已复制", 0.3);
        }
      }
    }
  ]);
}

function showUpperCaseLowerCase(title) {
  function handleTextChanged(sender) {
    var topView = $("text-case-top");
    var bottomView = $("text-case-bottom");
    if (sender === topView) {
      bottomView.text = topView.text.toUpperCase();
    } else {
      topView.text = bottomView.text.toLowerCase();
    }
  }

  showViews(title, [
    {
      type: "text",
      props: {
        id: "text-case-top",
        bgcolor: Constants.colors.lightGray,
        radius: Constants.radius
      },
      layout: function(make, view) {
        make.left.top.right.inset(Constants.margins.regular);
        make.height.equalTo(120);
      },
      events: {
        changed: handleTextChanged
      }
    },
    {
      type: "button",
      props: {
        title: "Copy"
      },
      layout: function(make) {
        make.bottom.right
          .equalTo($("text-case-top"))
          .inset(Constants.margins.regular);
        make.size.equalTo($size(56, 28));
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = $("text-case-top").text;
          $ui.toast("已复制", 0.3);
        }
      }
    },
    {
      type: "text",
      props: {
        id: "text-case-bottom",
        bgcolor: Constants.colors.lightGray,
        radius: Constants.radius
      },
      layout: function(make, view) {
        var topView = $("text-case-top");
        make.left.right.inset(Constants.margins.regular);
        make.top.equalTo(topView.bottom).offset(Constants.margins.regular);
        make.height.equalTo(topView);
      },
      events: {
        changed: handleTextChanged
      }
    },
    {
      type: "button",
      props: {
        title: "Copy"
      },
      layout: function(make) {
        make.bottom.right
          .equalTo($("text-case-bottom"))
          .inset(Constants.margins.regular);
        make.size.equalTo($size(56, 28));
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = $("text-case-bottom").text;
          $ui.toast("已复制", 0.3);
        }
      }
    }
  ]);
}

function showHashes(title) {
  function handleTextChanged(sender) {
    var text = sender.text;
    $("button-md5").title = text.length == 0 ? "MD5" : $text.MD5(text);
    $("button-sha1").title = text.length == 0 ? "SHA1" : $text.SHA1(text);
    $("button-sha256").title = text.length == 0 ? "SHA256" : $text.SHA256(text);
  }

  function handleButtonTapped(sender) {
    $clipboard.text = sender.title;
    $ui.toast("已复制", 0.3);
  }

  showViews(title, [
    {
      type: "input",
      props: {
        id: "inputH",
        "text": $clipboard.text
      },
      layout: function(make) {
        make.left.top.right.inset(Constants.margins.regular);
        make.height.equalTo(32);
      },
      events: {
        didBeginEditing:handleTextChanged,
        changed: handleTextChanged
      }
    },
    {
      type: "button",
      props: {
        id: "button-md5",
        title: "MD5",
      },
      layout: function(make) {
        var topView = $("inputH");
        make.left.right.equalTo(topView);
        make.height.equalTo(topView);
        make.top.equalTo(topView.bottom).offset(Constants.margins.regular);
      },
      events: {
        tapped: handleButtonTapped
      }
    },
    {
      type: "button",
      props: {
        id: "button-sha1",
        title: "SHA1",
      },
      layout: function(make) {
        var topView = $("button-md5");
        make.left.right.equalTo(topView);
        make.height.equalTo(topView);
        make.top.equalTo(topView.bottom).offset(Constants.margins.regular);
      },
      events: {
        
        tapped: handleButtonTapped
      }
    },
    {
      type: "button",
      props: {
        id: "button-sha256",
        title: "SHA256"
      },
      layout: function(make) {
        var topView = $("button-sha1");
        make.left.right.equalTo(topView);
        make.height.equalTo(topView);
        make.top.equalTo(topView.bottom).offset(Constants.margins.regular);
      },
      events: {
        tapped: handleButtonTapped
      }
    }
  ]);
}

var handlers = {
  "Number Bases": showNumberBases,
  "Base64 Encoder & Decoder": showBase64Encoder,
  "URL Encoder & Decoder": showURLEncoder,
  "Upper Case & Lower Case": showUpperCaseLowerCase,
  "MD5/SHA1/SHA256 Hashes": showHashes
};
function run() {
  $widget.height = 320;
  $ui.render({
    props: {
      title: "Toolbox",
      navBarHidden: 1,
      id: "tool"
    },
    views: [
      {
        type: "list",
        props: {
          data: Object.keys(handlers)
        },
        layout: $layout.fill,
        events: {
          didSelect: function(sender, idx, title) {
            handlers[title](title);
          }
        }
      },
      {
              type: "button",
              props: {
                id: "closebtn",
                title: "关闭",
                titleColor: $color("white"),
                font: $font("bold", 18),
                bgcolor: $color("red"),
                radius: 12
              },
              layout: function(make, view) {
                make.bottom.inset(15);
                make.centerX.equalTo()
                make.width.equalTo(120);
              },
              events: {
                tapped(sender) {
                  $device.taptic(0);
                  $widget.height = 181;
                  $("tool").remove();
                  var dataManager = require("../data-manager");
                  dataManager.init(mode);
                  var path = $app.env == $env.app ? "scripts/app" : "scripts/widget";
                  var module = require(path);
                  module.init(mode);
                  $("input").text = $clipboard.text;
                }
              }
            }
    ]
  });
}
module.exports = {
  run: run
};
