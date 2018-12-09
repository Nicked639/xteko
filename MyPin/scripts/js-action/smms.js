function run() {
  $widget.height = 300;
  $ui.render({
    props: {
      title: "SM.MS",
      navBarHidden: 1,
      id: "sm"
    },
    views: [
      {
        type: "matrix",
        props: {
          id: "Gallery",
          columns: 4,
          spacing: 3,
          square: true,
          template: [
            {
              type: "image",
              props: {
                id: "image"
              },
              layout: $layout.fill
            }
          ]
        },
        layout: function(make, view) {
          make.top.left.right.inset(0);
          make.bottom.inset(52);
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            details(
              data.image.src,
              indexPath,
              data.name,
              data.deleteURL,
              data.UploadDate,
              data.Height,
              data.Width
            );
          }
        }
      },
      {
        type: "button",
        props: {
          id: "Upload",
          type: 1,
          title: "上传",
          titleColor: $color("white"),
          font: $font("bold", 18),
          bgcolor: $color("tint"),
          radius: 12
        },
        layout: function(make, view) {
          make.bottom.inset(15);
          make.left.inset(50);
          make.width.equalTo(120);
        },
        events: {
          tapped: function(sender) {
            selectPhoto();
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
          make.right.inset(50);
          make.width.equalTo(120);
        },
        events: {
          tapped(sender) {
            $device.taptic(0);
            $widget.height = 181;
            $("sm").remove();
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
  LocalDataPath = "drive://SM.json";
  if ($file.read(LocalDataPath)) {
    LocalData = JSON.parse($file.read(LocalDataPath).string);
  } else {
    LocalData = { "images": [] };
  }
  load();
  if ($app.env == $env.app) selectPhoto();
  else {
    let image = $context.imageItems[0];
    upload(image.jpg(1.0));
  }
}
function load() {
  let items = [];
  let files = LocalData.images;
  for (let i = 0; i < files.length; i++) {
    let data = files[i].split(",");
    let name = data[0]
      .split("/")
      .pop()
      .replace(".jpg", "");
    items.push({
      image: {
        src: data[0]
      },
      name: name,
      deleteURL: data[1],
      UploadDate: data[2],
      Height: data[3],
      Width: data[4]
    });
  }
  $("Gallery").data = items;
  $("Gallery").data = $("Gallery").data.reverse();
}

function details(url, indexpath, name, deleteURL, UploadDate, Height, Width) {
  $ui.push({
    title: "SM.MS",
    props: {
      navBarHidden: 1,
      statusBarHidden: 0
    },
    views: [
      {
        type: "image",
        props: {
          id: "Image",
          src: url
        },
        layout: function(make, view) {
          make.top.left.right.inset(0);
          make.height.equalTo(100);
        },
        events: {
          tapped(sender) {
            $quicklook.open({
              image: $("Image").image
            });
          }
        }
      },
      {
        type: "list",
        props: {
          id: "list1",
          data: [
            {
              title: "url",
              rows: [
                {
                  TitleLabel: {
                    text: url,
                    align: $align.center,
                    font: $font(17)
                  }
                }
              ]
            },
            {
              title: "html",
              rows: [
                {
                  TitleLabel: {
                    text:
                      '<img src="' +
                      url +
                      ' "alt="' +
                      name +
                      '" title="' +
                      name +
                      '">',
                    align: $align.left,
                    font: $font(17)
                  }
                }
              ]
            },
            {
              title: "bbcode",
              rows: [
                {
                  TitleLabel: {
                    text: "[img]" + url + "[/img]",
                    align: $align.left,
                    font: $font(17)
                  }
                }
              ]
            },
            {
              title: "markdown",
              rows: [
                {
                  TitleLabel: {
                    text: "![" + name + "](" + url + ")",
                    align: $align.left,
                    font: $font(17)
                  }
                }
              ]
            },
            {
              rows: [
                {
                  TitleLabel: {
                    text: "分享图片",
                    textColor: $color("blue")
                  }
                },
                {
                  TitleLabel: {
                    text: "详细信息"
                  }
                },
                {
                  TitleLabel: {
                    text: "生成短链"
                  }
                }
              ]
            },
            {
              rows: [
                {
                  TitleLabel: {
                    text: "删除图片",
                    textColor: $color("red")
                  }
                }
              ]
            }
          ],
          template: [
            {
              type: "label",
              props: {
                id: "TitleLabel",
                align: $align.center
              },
              layout: function(make, view) {
                make.top.right.bottom.inset(0);
                make.left.inset(10);
              }
            }
          ]
        },
        layout: function(make, view) {
          make.top.equalTo($("Image").bottom);
          make.left.right.inset(0);
          make.bottom.inset(0);
        },
        events: {
          didSelect: function(sender, indexPath, title) {
            if (indexPath.section == 5) {
              var ListItems =
                deleteURL == ""
                  ? ["删除本地图片"]
                  : ["仅删除本地图片", "删除本地和云端"];
              $ui.menu({
                items: ListItems,
                handler: function(title, idx) {
                  if (idx == 0) {
                    $("Gallery").delete(indexpath);
                    $ui.toast("已在本地删除此图片");
                    $ui.pop();
                  } else {
                    $ui.loading(true);
                    $http.get({
                      url: deleteURL,
                      handler: function(resp) {
                        $ui.loading(false);
                        $("Gallery").delete(indexpath);
                        $ui.toast("已在云端和本地删除此图片");
                        $ui.pop();
                      }
                    });
                  }
                  let ind = LocalData.images.indexOf(name);
                  LocalData.images.splice(ind, 1);
                  writeCache();
                }
              });
            } else if (indexPath.section == 4) {
              if (indexPath.row == 0) {
                $ui.loading(true);
                $http.download({
                  url: url,
                  handler: function(resp) {
                    $ui.loading(false);
                    $share.universal(resp.data);
                  }
                });
              } else if (indexPath.row == 1) {
                $ui.alert({
                  title: name,
                  message:
                    "上传日期:" +
                    UploadDate +
                    "\n宽:" +
                    Height +
                    "\n高:" +
                    Width
                });
              } else {
                getShortUrl(url);
              }
            } else {
              $clipboard.text = title.TitleLabel.text;
              $ui.toast("已复制:" + title.TitleLabel.text);
            }
          }
        }
      }
    ]
  });
}

function upload(pic) {
  if (typeof pic == "undefined") {
  } else {
    $ui.loading(true);
    $ui.toast("上传中...", 10);
    $http.upload({
      url: "https://sm.ms/api/upload",
      files: [{ "data": pic, "name": "smfile" }],
      handler: function(resp) {
        $ui.loading(false);
        var status = resp.data.code;
        if (status !== "success") {
          $ui.alert("上传失败 ❌");
          return;
        }
        var data = resp.data.data;
        var date = data.path.match(/\d+\/\d+\/\d+/);
        let stringData =
          data.url +
          "," +
          data.delete +
          "," +
          date +
          "," +
          data.height +
          "," +
          data.width;
        LocalData.images.push(stringData);
        writeCache();
        $clipboard.text = data.url;
        $ui.toast("图片链接已复制到剪贴板");

        $ui.alert({
          title: "是否生成短链",
          message: "调用微博接口",
          actions: [
            {
              title: "确定",
              disabled: false, // Optional
              handler: function() {
                getShortUrl(data.url);
              }
            },
            {
              title: "取消",
              handler: function() {}
            }
          ]
        });

        load();
      }
    });
  }
}
function add() {
  $ui.push({
    props: {
      title: "添加图片"
    },
    views: [
      {
        type: "input",
        props: {
          id: "input1",
          align: $align.left,
          placeholder: "输入图片名称"
        },
        layout: function(make, view) {
          make.top.left.right.inset(10);
          make.size.equalTo($size(100, 40));
        }
      },
      {
        type: "input",
        props: {
          id: "input2",
          align: $align.left,
          placeholder: "输入图片链接"
        },
        layout: function(make, view) {
          make.left.right.inset(10);
          make.top.equalTo($("input1").bottom).offset(10);
          make.size.equalTo($size(100, 40));
        }
      },
      {
        type: "button",
        props: {
          title: "添加"
        },
        layout: function(make, view) {
          make.left.right.inset(10);
          make.top.equalTo($("input2").bottom).offset(10);
        },
        events: {
          tapped: function(sender) {
            if ($("input1").text == "") {
              $ui.toast("图片名称不能为空");
            } else if ($("input2").text == "") {
              $ui.toast("图片链接不能为空");
            } else if ($("input2").text.indexOf("http") == -1) {
              $ui.toast("请填写正确的图片链接");
            } else {
              let stringData = $("input2").text + ",";
              LocalData.images.push(stringData);
              writeCache();
              $ui.toast('已添加图片"' + $("input1").text + '"');
              load();
              $ui.pop();
            }
          }
        }
      }
    ]
  });
}

function compressImage(image) {
  //        alert($props(image[0]))
  $input.text({
    type: $kbType.number,
    placeholder: "输入压缩到比例 0～100",
    handler: function(num1) {
      let width = (image.size.width * num1) / 100;
      let height = (image.size.height * num1) / 100;
      let resized = image.resized($size(width, height));
      $input.text({
        type: $kbType.number,
        placeholder: "输入压缩后质量 0～100",
        handler: function(num2) {
          let jpg = resized.jpg(num1 / 100);
          upload(jpg);
        }
      });
    }
  });
}

function selectPhoto() {
  $ui.menu({
    items: ["拍摄照片", "相册选取", "最后一张", "手动添加"],
    handler: function(title, idx) {
      switch (idx) {
        case 0:
          $photo.take({
            handler: function(resp) {
              $ui.alert({
                title: "是否压缩",
                message: "",
                actions: [
                  {
                    title: "OK",
                    disabled: false, // Optional
                    handler: function() {
                      compressImage(resp.image);
                    }
                  },
                  {
                    title: "Cancel",
                    handler: function() {
                      upload(resp.image.jpg(1.0));
                    }
                  }
                ]
              });
            }
          });
          break;
        case 1:
          $photo.pick({
            handler: function(resp) {
              $ui.alert({
                title: "是否压缩",
                message: "",
                actions: [
                  {
                    title: "OK",
                    disabled: false, // Optional
                    handler: function() {
                      compressImage(resp.image);
                    }
                  },
                  {
                    title: "Cancel",
                    handler: function() {
                      upload(resp.image.jpg(1.0));
                    }
                  }
                ]
              });
            }
          });
          break;
        case 2:
          $photo.fetch({
            count: 1,
            handler: function(images) {
              $ui.alert({
                title: "是否压缩",
                message: "",
                actions: [
                  {
                    title: "OK",
                    disabled: false, // Optional
                    handler: function() {
                      compressImage(images[0]);
                    }
                  },
                  {
                    title: "Cancel",
                    handler: function() {
                      upload(images[0].jpg(1.0));
                    }
                  }
                ]
              });
            }
          });
          break;
        case 3:
          add();
          break;
        default:
          break;
      }
    }
  });
}
function getShortUrl(url) {
  let geturl =
    "https://api.weibo.com/2/short_url/shorten.json?source=1681459862&url_long=" +
    url;
  $http.get({
    url: geturl,
    handler: function(resp) {
      let shorturl = resp.data.urls[0].url_short;
      $clipboard.text = shorturl;
      $ui.toast("已复制 " + shorturl);
    }
  });
}

function writeCache() {
  $file.write({
    data: $data({ string: JSON.stringify(LocalData) }),
    path: LocalDataPath
  });
}
module.exports = {
  run: run
};
