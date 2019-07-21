function arrayMove(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    var k = newIndex - array.length + 1;
    while (k--) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

function arrayRemove(array, index) {
  array.splice(index, 1);
}

function searchText(text) {
  var engine = require("./data-manager").getSearchEngine();
  var pattern = engine + encodeURIComponent(text);
  runAction({ "pattern": pattern });
}

function runMoveAction2(action){
  var pattern = action.pattern;
    var hasPlaceholder = pattern.indexOf("%@") != -1;
    var clipText = $clipboard.text || "";
    var replacement = action.noenc ? clipText : encodeURIComponent(clipText);
  
    pattern = pattern.replace("%@", replacement);
  
    if (_hasPrefix(pattern, "keyboard:")) {
      var shit = require("./js-action/shit");
      shit.run();
      return;
    }
}

function runMoveAction(action) {
  $device.taptic(1)
  var pattern = action.pattern;
  var hasPlaceholder = pattern.indexOf("%@") != -1;
  var clipText = $clipboard.text || "";
  var replacement = action.noenc ? clipText : encodeURIComponent(clipText);

  pattern = pattern.replace("%@", replacement);

  if (_hasPrefix(pattern, "keyboard:")) {
    var quote = require("./js-action/quote");
    quote.run();
    return;
  }

  if (_hasPrefix(pattern, "taobao:")) {
    var weibo = require("./js-action/weibo");
    weibo.run();
//$app.openURL("jsbox://run?name=%E5%BE%AE%E5%8D%9A%E7%83%AD%E7%82%B9")
    return;
  }
  
  if (_hasPrefix(pattern, "searchImage:")) {
      var com = require("./js-action/compressImage");
      com.run();
      return;
    }
}

function runLongAction(action) {
  var pattern = action.pattern;
  var hasPlaceholder = pattern.indexOf("%@") != -1;
  var clipText = $clipboard.text || "";
  var replacement = action.noenc ? clipText : encodeURIComponent(clipText);

  pattern = pattern.replace("%@", replacement);
  if (_hasPrefix(pattern, "delete:")) {
    var deletePhoto = require("./js-action/deletePhoto");
    deletePhoto.run();
    return;
  }

  if (_hasPrefix(pattern, "searchImage:")) {
    var smms = require("./js-action/smms");
    smms.run();
    return;
  }

  if (_hasPrefix(pattern, "editPhoto:")) {
    var editPhoto = require("./js-action/editPhoto2");
    
    editPhoto.run();
    return;
  }

  if (_hasPrefix(pattern, "pin:")) {
    $app.openURL("jsbox://run?name=JavBus");
    return;
  }

  if (_hasPrefix(pattern, "keyboard:")) {
    var tool = require("./js-action/tool");
    tool.run();
    return;
  }

  if (_hasPrefix(pattern, "pushbullet:")) {
//    var airtable = require("./js-action/airtable");
//    airtable.run();
//    return;
  }

  if (_hasPrefix(pattern, "taobao:")) {
    var picker = require("./js-action/exchange-rate");
    picker.show();
    return;
  }

  if (_hasPrefix(pattern, "dic:")) {
    var dic = require("./js-action/dictionary");
    let text = $clipboard.text ? $clipboard.text : "";
    dic.dic(text);
//    $("input").blur();
  }
  if (_hasPrefix(pattern, "url_convert:")) {
    $app.openURL("douban:///search?q="+encodeURI($clipboard.text))
//    $app.openURL("appleprintcenter:///");
    return;
  }
}

function runAction(action) {
  var pattern = action.pattern;
  var hasPlaceholder = pattern.indexOf("%@") != -1;
  var clipText = $clipboard.text || "";
  var replacement = action.noenc ? clipText : encodeURIComponent(clipText);

  pattern = pattern.replace("%@", replacement);

  if (_hasPrefix(pattern, "open-url:")) {
    $app.openURL($clipboard.link);
    exit()
    return;
  }

  if (_hasPrefix(pattern, "url_convert:")) {
    if ($app.env == $env.today) {
      var stext = $("input").text;
      if (stext == "") {
        $("input").focus();
      } else if (stext) {
        urlConvert(stext);
      } else return;
    } else if ($clipboard.text != undefined) {
      urlConvert($clipboard.text);
    } else return;
  }

  if (_hasPrefix(pattern, "delete:")) {
    $photo.delete({
      count: 1,
      handler: function(success) {}
    });
    return;
    //      jsActions.editPhoto()
  }
  if (_hasPrefix(pattern, "editPhoto:")) {
    var editPhoto = require("./js-action/editPhoto");
    editPhoto.run();
    return;
  }

  if (_hasPrefix(pattern, "searchImage:")) {
    var searchImage = require("./js-action/searchImage");
    searchImage.run();
    return;
  }

  if (_hasPrefix(pattern, "pushbullet:")) {
    var pushbullet = require("./js-action/pushbullet");
    pushbullet.run();
    return;
  }

  if (_hasPrefix(pattern, "keyboard:")) {
    var keyboard = require("./js-action/keyboard");
    keyboard.run();
    return;
  }

  if (_hasPrefix(pattern, "dic:")) {
    var translator = require("./js-action/translator");
    let text = $clipboard.text ? $clipboard.text : "";
    translator.gtrans(text);
    $("input").blur();
  }

  if (_hasPrefix(pattern, "share-sheet://")) {
    var text = $clipboard.text;
    var image = $clipboard.image;
    if (text) {
      $share.sheet(text);
    } else if (image) {
      $share.sheet(image);
    }
    return;
  }

  if (_hasPrefix(pattern, "compose://")) {
    var identifier = pattern.substring("compose://?id=".length);
    var extension = $objc("NSExtension").invoke(
      "extensionWithIdentifier:error:",
      identifier,
      null
    );
    var composer = $objc("SLComposeViewController").invoke(
      "composeViewControllerForExtension",
      extension
    );

    var text = $clipboard.text;
    if (text) {
      composer.invoke("setInitialText", text);
    }

    var image = $clipboard.image;
    if (image) {
      composer.invoke("addImage", image);
    }

    var link = $clipboard.link;
    if (link) {
      var url = $objc("NSURL").invoke("URLWithString", link);
      composer.invoke("addURL", url);
    }

    var fromVC = $ui.vc.runtimeValue();
    fromVC.invoke(
      "presentViewController:animated:completion:",
      composer,
      true,
      null
    );

    return;
  }

  if (hasPlaceholder && _hasPrefix(pattern, "tel:")) {
    $app.openURL("tel:" + $clipboard.phoneNumber || "");
    return;
  }

  if (hasPlaceholder && _hasPrefix(pattern, "sms:")) {
    $app.openURL("sms:" + $clipboard.phoneNumber || "");
    return;
  }

  if (hasPlaceholder && _hasPrefix(pattern, "facetime:")) {
    $app.openURL("facetime:" + $clipboard.phoneNumber || "");
    return;
  }

  if (hasPlaceholder && _hasPrefix(pattern, "mailto:")) {
    $app.openURL("mailto:" + $clipboard.email || "");
    return;
  }

  $app.openURL(pattern);
}

function blinkView(view) {
  $ui.animate({
    duration: 0.3,
    animation: function() {
      view.bgcolor = $rgba(200, 200, 200, 0.25);
    },
    completion: function() {
      $ui.animate({
        duration: 0.3,
        animation: function() {
          view.bgcolor = $color("white");
        }
      });
    }
  });
}

function makeIcon(iconName, color) {
  var length = 180;
  var canvas = $ui.create({ type: "view" });
  canvas.bgcolor = color;
  canvas.frame = $rect(0, 0, length, length);

  canvas.add({
    type: "view",
    props: {
      bgcolor: $color("white"),
      radius: 72,
      frame: $rect(18, 18, 144, 144)
    }
  });

  canvas.add({
    type: "image",
    props: {
      icon: $icon(iconName, color, 72),
      bgcolor: $color("clear"),
      frame: $rect(54, 54, 72, 72)
    }
  });

  return canvas.snapshot;
}

function _hasPrefix(string, prefix) {
  return string.lastIndexOf(prefix, 0) === 0;
}

function urlConvert(content) {
  if ($detector.link(content) != "") {
    var url = $detector.link(content)[0];
    if (/t.cn\/\w{7}$/i.test(url) === true) {
      lengthen(url);
    } else if (/u.nu\/\w{4}$/i.test(url) === true) {
      lengthen(url);
    } else {
      $ui.menu({
        items: ["t.cn", "u.nu"],
        handler: function(title, idx) {
          idx == 0 ? tcn(url) : unu(url);
        }
      });
    }
  } else $ui.toast("网址输入有误");
}

function lengthen(link) {
  $http.lengthen({
    url: link,
    handler: function(url) {
      var dataManager = require("./data-manager");
      dataManager.copied2Clip(url);
      $ui.toast("短链接已还原并复制");
    }
  });
}

function tcn(url) {
  $ui.toast("生成中..", 10);
  $http.get({
    url:
      "http://api.weibo.com/2/short_url/shorten.json?source=2849184197&url_long=" +
      $text.URLEncode(url),
    handler: function(resp) {
      var data = resp.data;
      if (data.urls[0].result == true) {
        var dataManager = require("./data-manager");
        dataManager.copied2Clip(data.urls[0].url_short);
        $ui.toast("短链接已复制");
        var module = require("../scripts/widget");

        module.init();
      } else $ui.toast("短链接生成失败");
    }
  });
}

function unu(url) {
  $ui.toast("生成中..", 10);
  $http.get({
    url:
      "https://u.nu/api.php?action=shorturl&format=simple&url=" +
      $text.URLEncode(url),
    handler: function(resp) {
      var data = resp.data;
      if (/^https:\/\/u\.nu\//.test(data) === true) {
        var dataManager = require("./data-manager");
        dataManager.copied2Clip(data);
        $ui.toast("短链接已复制");
        var module = require("../scripts/widget");

        module.init();
      } else $ui.toast("短链接生成失败");
    }
  });
}

function exit(){
  var dataManager = require("../data-manager");
      dataManager.init(mode);
      var path = $app.env == $env.app ? "scripts/app" : "scripts/widget";
      var module = require(path);
      module.init(mode);
      $("input").text = $clipboard.text;
}
module.exports = {
  arrayMove: arrayMove,
  arrayRemove: arrayRemove,
  searchText: searchText,
  runAction: runAction,
  runLongAction: runLongAction,
  runMoveAction: runMoveAction,
  runMoveAction2: runMoveAction2,
  blinkView: blinkView,
  makeIcon: makeIcon,
  exit:exit
};
