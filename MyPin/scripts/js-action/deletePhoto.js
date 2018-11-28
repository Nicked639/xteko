const COUNT = 12

var option = $objc("PHFetchOptions").invoke("new")
var descriptor = $objc("NSSortDescriptor").invoke("sortDescriptorWithKey:ascending:", "creationDate", 0)
option.invoke("setFetchLimit", COUNT)
option.invoke("setSortDescriptors", [descriptor])

var fetchResult = $objc("PHAsset").invoke("fetchAssetsWithOptions:", option)

function render() {
  $widget.height = 181
  $ui.render({
    views: [{
      type: "matrix",
      props: {
        id: "photos",
        square: true,
        columns: 4,
        spacing: 1,
        template: [{
            type: "image",
            props: {
              id: "img"
            },
            layout: $layout.fill,
            views: [{
              type: "label",
              props: {
                id: "type",
                font: $font(8),
                smoothRadius: 3,
                align: $align.center,
                textColor: $color("white"),
                bgcolor: $color("black"),
                alpha: 0.5
              },
              layout: function(make) {
                make.height.equalTo(15)
                make.width.equalTo(25)
//                make.left.inset(2)
                make.centerX.equalTo()
                make.bottom.inset(4)
              }
            }]
          },
          {
            type: "canvas",
            props: {
              id: "selected",
              hidden: true
            },
            layout: $layout.fill,
            events: {
              draw: function(view, ctx) {
                var width = view.frame.width
                var height = view.frame.height
                /* Blur view */
                ctx.fillColor = $color("white")
                ctx.setAlpha(0.3)
                ctx.fillRect($rect(0, 0, height, width))
                /* Stroke */
                ctx.setAlpha(1)
                ctx.strokeColor = $color("clear") // #DF565D
                ctx.fillColor = $rgb(19,111,223)// #DF565D
                ctx.setLineWidth(5)
                ctx.strokeRect($rect(0, 0, height, width))
                /* Full Circle */
                ctx.addArc(width - 15, height - 15, 10, 0, Math.PI * 2, true)
                ctx.fillPath()
                /* Edges of Circle */
                ctx.setLineWidth(1)
                ctx.strokeColor = $color("white")
                ctx.addArc(width - 15, height - 15, 10, 0, Math.PI * 2, true)
                ctx.strokePath()
                /* Checkmark */
                ctx.setLineWidth(1.5)
                ctx.moveToPoint(width - 20.5, height - 14.4)
                ctx.addLineToPoint(width - 17.2, height - 11.3)
                ctx.addLineToPoint(width - 10, height - 18.5)
                ctx.strokePath()
              }
            }
          }
        ]
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath) {
          var data = sender.data
          data[indexPath.row].selected.hidden = !data[indexPath.row].selected.hidden
          sender.data = data
        },
        longPressed: function(sender) {
          var point = sender.location.runtimeValue().invoke("CGPointValue")
          var indexPath = sender.sender.runtimeValue().invoke("indexPathForItemAtPoint", point)
          
          if (!indexPath) return
          
          $device.taptic(0)
          var data = sender.sender.object(indexPath.rawValue())
          if (data.selected.hidden == true)
            getOriginalPhoto(data.asset)
          else
            deleteAssets()
        }
      }
    },{
            type: "button",
            props: {
              id: "closebtn",
              bgcolor: $color("clear"),
              icon: $icon("225", $color("tint"), $size(18, 18))
            },
            layout: function(make, view) {
              make.top.inset(4);
              make.left.inset(6);
            },
            events: {
              tapped(sender) {
                $device.taptic(0);
                $widget.height = 180;
                $("photos").remove();
                var dataManager = require("../data-manager");
                dataManager.init();
                var path = $app.env == $env.today ? "../widget" : "../app";
                var module = require(path);
                module.init();
                $("input").text = $clipboard.text
              }
            }
          },]
  })
}


String.prototype.suffix = function() {
  return this.split(".")[1]
}

function renderData() {
  var thumbs = [], data = [], start = 0
  var count = fetchResult.invoke("count")
  for (var i = 0; i < count; i++) {
    let asset = fetchResult.invoke("objectAtIndex", i)
    var handler = $block("void, UIImage *, NSDictionary *", function(result, info) {
      if (info.invoke("valueForKey", "PHImageResultIsDegradedKey")) {
        thumbs.push({
          img: {
            data: result.rawValue().jpg(0.0)
          },
          type: {
            text: asset.invoke("filename").rawValue().suffix()
          },
        })
        if (thumbs.length == count) {
          $("photos").data = thumbs
        }
      } else {
        var index = info.invoke("valueForKey", "PHImageResultRequestIDKey")
        var x = start === 0 ? 0 : index - start
        data[x] = {
          img: {
            data: result.rawValue().jpg(0.0)
          },
          type: {
            text: asset.invoke("filename").rawValue().suffix()
          },
          selected: {
            hidden: true
          },
          asset: asset
        }
        if (data.length == count) {
          $("photos").data = data
        }
      }
    })
    var PHImageManager = $objc("PHImageManager").invoke("defaultManager")
    var idx = PHImageManager.invoke("requestImageForAsset:targetSize:contentMode:options:resultHandler:", asset, $size(200, 200), 0, null, handler)
    if (i === 0) start = idx
  }
}
function run(){
  render()
  renderData()
}
function deleteAssets() {
  var data = $("photos").data
  var assets = []
  var idx = []
  for (var i = 0; i < data.length; i++) {
    if (data[i].selected.hidden === false) {
      assets.push(data[i].asset)
      idx.push(i)
    }
  }

  if (idx.length === 0) return
  executeDelete(assets)
//  if ($app.env == $env.today) {
//    $ui.alert({
//      title: $l10n("alert_title_warning"),
//      message: $l10n("alert_message_dismiss"),
//      actions: [{
//          title: $l10n("alert_button_cancel"),
//          style: "Cancel",
//          handler: function() {}
//        },
//        {
//          title: $l10n("alert_button_continue"),
//          handler: function() {
//            executeDelete(assets)
//            $app.close()
//          }
//        }
//      ]
//    })
//  } else {
//    executeDelete(assets, true)
//  }
}

function getOriginalPhoto(asset) {
  var handler = $block("void, NSData *", function(result) {
    $quicklook.open({
      type: "png",
      data: result.rawValue()
    })
  })
  var PHImageManager = $objc("PHImageManager").invoke("defaultManager")
  PHImageManager.invoke("requestImageDataForAsset:options:resultHandler:", asset, null, handler)
}

function executeDelete(assets, isHandler = false) {
  var handler
  if (isHandler) {
    handler = $block("void, BOOL, NSError *", function(success, error) {
      if (success) {
        $app.close(0.5)
      }
    })
  } else {
    handler = null
  }
  var deleteBlock = $block("void", function() {
    $objc("PHAssetChangeRequest").invoke("deleteAssets", assets)
  })
  var PHPhotoLibrary = $objc("PHPhotoLibrary").invoke("sharedPhotoLibrary")
  PHPhotoLibrary.invoke("performChanges:completionHandler:", deleteBlock, handler)
}


module.exports={
  run:run
}
