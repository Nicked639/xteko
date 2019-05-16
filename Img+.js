/*
 Version 1.0
 Powered by coo11
 Contact with me via Telegram https://t.me/coo11
- 快速查看一张图片的基本信息比如大小、 尺寸、类型，复制图片的 MD5
- 加入 SM.MS Imugr Upload.cc Elimage Catbox Baidu 6家图床 请勿滥用或者上传非法照片
- 图片大小调整(PNG, JPG) GIF倒放(原作者 wr1241) 水平、垂直翻转(GIF, PNG, JPG)
- TinyPNG图片压缩(PNG, JPG)(原作者 JunM) 清除图片Exif信息
- 提示：轻触上方白色顶栏退出
*/

const ver = $device.info.version >= "11",
  sW = $device.info.screen.width,
  sH = sW * 0.618,
  pic = $context.dataItems,
  list = [
    ["调整大小", "水平翻转", "垂直翻转", "GIF 倒放"],
    ["Upload.cc", "SM.MS", "Imgur", "Catbox", "Elimage", "Baidu", "删除已上传"],
    ["TinyPNG", "Kill EXIF"]
  ],
  upload = [
    ["链接", "分享", "更多", "删除已上传", "链接 & Delete Key/Hash"],
    ["以下全部", "URL", "HTML", "BBCode", "Markdown", "Delete Key/Hash"]
  ];

let imgurApi = $cache.get("imgur") || "",
  tinyApi = $cache.get("tinypng") || "",
  engines = [
    {
      url: "https://upload.cc/image_upload",
      method: "POST",
      deleteUrl: "https://upload.cc/delete",
      name: "uploaded_file[]",
      dheader: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    },
    {
      url: "https://sm.ms/api/upload",
      method: "GET",
      deleteUrl: "https://sm.ms/api/delete/",
      name: "smfile"
    },
    {
      url: "https://api.imgur.com/3/image",
      name: "image",
      method: "DELETE",
      deleteUrl: "https://api.imgur.com/3/image/",
      header: {
        Authorization: `Client-ID ${imgurApi}`
      }
    },
    {
      url: "https://catbox.moe/user/api.php",
      name: "fileToUpload",
      form: {
        reqtype: "fileupload"
      }
    },
    {
      url: "https://img.vim-cn.com/",
      name: "image"
    },
    {
      url:
        "https://graph.baidu.com/upload?tn=pc&from=pc&image_source=PC_UPLOAD_IMAGE_FILE&range=%7b%22page_from%22:%20%22shituIndex%22%7d&extUiData%5bisLogoShow%5d=1&uptime=" +
        Date.parse(new Date()),
      name: "image",
      form: {
        pos: "upload",
        uptype: "upload_pc",
        home: "tm"
      }
    }
  ];

function uploadMenu(i, url, del) {
  let uploadMenu = upload;
  if ([0, 1, 2].indexOf(i) == -1) {
    uploadMenu[0].splice(3, 2);
    uploadMenu[1].splice(5, 1);
  }
  $ui.menu({
    items: uploadMenu[0],
    handler: (t, idx) => {
      switch (idx) {
        case 0:
          $clipboard.text = url;
          $ui.toast("链接已复制", 0.6);
          break;
        case 1:
          $share.sheet(url);
          break;
        case 2:
          uploadMenu1(uploadMenu[1], url, del);
          break;
        case 3:
          uploadDelete(i, del);
          break;
        case 4:
          $share.sheet("链接: " + url + "\n" + "删除: " + del);
          break;
      }
    }
  });
}

function uploadMenu1(menu, url, del) {
  $ui.menu({
    items: menu,
    handler: (t, i) => {
      let html = '<img src="' + url + '" alt="Image" title="Image">',
        bbcode = "[img]" + url + "[/img]",
        md = "![Image](" + url + ")",
        all = url + "\n" + html + "\n" + bbcode + "\n" + md;
      switch (i) {
        case 0:
          all = del !== undefined ? all.concat("\n" + del) : all;
          $share.sheet(all);
          break;
        case 1:
          $clipboard.text = url;
          break;
        case 2:
          $clipboard.text = html;
          break;
        case 3:
          $clipboard.text = bbcode;
          break;
        case 4:
          $clipboard.text = md;
          break;
        case 5:
          $clipboard.text = del;
          break;
      }
      if (i != 0) $ui.toast(menu[i] + "已复制", 0.6);
    }
  });
}

function uploadDelete(i, del) {
  $http.request({
    method: engines[i].method,
    url: i == 0 ? engines[0].deleteUrl : engines[i].deleteUrl + del,
    header: i == 2 ? engines[i].header : engines[i].dheader,
    body: i == 0 ? { key: del } : {},
    handler: resp => {
      console.log(resp);
      switch (i) {
        case 0:
          if (resp.data.total_success == 1) $ui.toast("图片删除成功", 0.6);
          else if (resp.data.total_success == 0) alert("删除失败");
          break;
        case 1:
          if (/(File already deleted)|(File delete success)/i.test(resp.data))
            $ui.toast("图片删除成功", 0.6);
          else if (/Hash id not found/i.test(resp.data))
            $ui.alert({
              title: "删除失败",
              message: "Hash id not found."
            });
          break;
        case 2:
          if (resp.data.success) $ui.toast("图片删除成功", 0.6);
          else if (!resp.data.success)
            $ui.alert({
              title: "删除失败",
              message: resp.data.data.error
            });
          break;
      }
    }
  });
}

function uploadImg(img, i) {
  let type = img.info.mimeType.replace("image/", "");
  $http.upload({
    url: engines[i].url,
    header: engines[i].header,
    files: [{ data: img, name: engines[i].name, filename: "img." + type }],
    form: engines[i].form,
    handler: function(resp) {
      let data = resp.data;
      console.log(resp);
      let url, del;
      switch (i) {
        case 0:
          if (data.total_success == 1) {
            let path = data.success_image[0].url,
              _del = data.success_image[0].delete;
            url = "https://upload.cc/" + path;
            del = `[{"path":"${path}","key":"${_del}"}]`;
          } else {
            alert("上传失败");
            return;
          }
          break;
        case 1:
          if (data.code == "success") {
            url = data.data.url;
            del = data.data.hash;
          } else if (data.code == "error") {
            $ui.alert({
              title: "上传失败",
              message: data.msg
            });
            return;
          }
          break;
        case 2:
          if (data.success) {
            url = data.data.link;
            del = data.data.deletehash;
          } else {
            $ui.alert({
              title: "上传失败",
              message: data.data.error
            });
            return;
          }
          break;
        case 3:
          if (resp.response.statusCode == 200) url = data;
          else {
            alert("上传失败");
            return;
          }
          break;
        case 4:
          if (/^https:\/\/img\.vim-cn\.com\//i.test(data))
            url = data.replace("\n", "");
          else {
            $ui.alert({
              title: "上传失败",
              message: data
            });
            return;
          }
          break;
        case 5:
          type = type == "png" ? "png" : "jpg";
          if (data.msg == "Success")
            url =
              "https://graph.baidu.com/resource/" + data.data.sign + "." + type;
          else {
            $ui.alert({
              title: "上传失败",
              message: data.msg
            });
            return;
          }
          break;
      }
      uploadMenu(i, url, del);
    }
  });
}

function initList(_i) {
  let items = [];
  list[_i].map((t, i) => {
    items = items.concat({
      list: { text: t }
    });
  });
  return items;
}

if (pic) render(pic[0]);
else {
  $ui.menu({
    items: ["从相册选", "最后一张"],
    handler: (t, i) => {
      i == 0 ? pick() : last();
    }
  });
}

async function pick() {
  let resp = await $photo.pick({ format: "data" });
  render(resp.data);
}

async function last() {
  let resp = await $photo.fetch({ count: 1, format: "data" });
  render(resp[0]);
}

function format(bytes) {
  let formatter = $objc("NSByteCountFormatter");
  let string = formatter.$stringFromByteCount_countStyle(bytes, 0);
  return string.rawValue();
}

function reverse(img, i) {
  let size = img.size,
    frame = $rect(0, 0, size.width, size.height),
    view = {
      type: "view",
      props: {
        id: "temp",
        frame: frame
      },
      views: [
        {
          type: "canvas",
          layout: $layout.fill,
          props: { frame: frame },
          events: {
            draw: (view, ctx) => {
              ctx.scaleCTM(-i, i);
              i == 1
                ? ctx.translateCTM(-size.width, 0)
                : ctx.translateCTM(0, -size.height);
              ctx.drawImage(frame, img);
            }
          }
        }
      ]
    },
    canvas = $ui.create(view);
  let reversed = canvas.snapshot,
    scale = $device.info.screen.scale;
  reversed = reversed.resized($size(size.width / scale, size.height / scale));
  return reversed;
}

function gifReverse(data, _i) {
  let decoder = $objc("YYImageDecoder").invoke(
      "decoderWithData:scale",
      data,
      1
    ),
    encoder = $objc("YYImageEncoder").invoke("alloc.initWithType", 7),
    frameCount = decoder.invoke("frameCount"),
    _frame,
    rFrame;
  for (let i = 0; i < frameCount; i++) {
    let duration = decoder.invoke("frameDurationAtIndex", i);
    let frame = decoder.invoke("frameAtIndex:decodeForDisplay", i, 0);
    _frame = frame.invoke("image").rawValue();
    rFrame = reverse(_frame, _i);
    $("temp").remove();
    encoder.invoke("addImage:duration", rFrame.runtimeValue(), duration);
  }
  return encoder.invoke("encode").rawValue();
}

function gifPlayback(data) {
  let decoder = $objc("YYImageDecoder").invoke(
      "decoderWithData:scale",
      data,
      1
    ),
    encoder = $objc("YYImageEncoder").invoke("alloc.initWithType", 7),
    frameCount = decoder.invoke("frameCount");
  for (let i = frameCount - 1; i >= 0; i--) {
    let duration = decoder.invoke("frameDurationAtIndex", i);
    let frame = decoder.invoke("frameAtIndex:decodeForDisplay", i, 0);
    encoder.invoke("addImage:duration", frame.invoke("image"), duration);
  }
  return encoder.invoke("encode").rawValue();
}

function resizedImage(img, type) {
  let outputImage;
  if (type == "gif") outputImage = img;
  else if (type == "png") outputImage = img.png;
  else outputImage = img.jpg(1.0);
  $ui.menu({
    items: ["预览", "分享", "保存"],
    handler: (t, i) => {
      if (i == 0) $quicklook.open({ data: outputImage });
      else if (i == 1) $share.sheet(outputImage);
      else {
        $photo.save({ data: outputImage });
        $ui.toast("已保存至相册", 0.6);
      }
    }
  });
}

function setApikey(api) {
  $input.text({
    type: $kbType.ascii,
    placeholder: "请输入 API Key",
    text: $cache.get(api) || "",
    handler: text => {
      $cache.set(api, text);
      $ui.toast("已保存", 0.6);
    }
  });
}

function tinyPNG(data) {
  if (tinyApi == "") {
    setApikey("tinypng");
    tinyApi = $cache.get("tinypng") || "";
  } else {
    $ui.toast("正在上传图片至 TinyPNG……");
    $http.request({
      method: "POST",
      url: "https://api.tinify.com/shrink",
      header: {
        Authorization:
          "Basic " + $text.base64Encode("api:" + $cache.get("tinypng"))
      },
      body: data,
      handler: resp => {
        let response = resp.response;
        if (response.statusCode === 201) {
          $ui.toast("正在压缩……");
          let compressedImageUrl = response.headers["Location"];
          $ui.toast("正在下载压缩后的图片……");
          $http.download({
            url: compressedImageUrl,
            handler: resp => {
              if (resp.data) {
                $ui.alert({
                  title: "图片压缩完成",
                  message:
                    "本月配额使用统计: " +
                    response.headers["compression-count"] +
                    " / 500",
                  actions: [
                    {
                      title: "分享",
                      style: "cancel",
                      handler: () => {
                        $share.sheet(resp.data);
                      }
                    },
                    {
                      title: "保存",
                      handler: function() {
                        $photo.save({
                          data: resp.data,
                          handler: result => {
                            if (result == true) $ui.toast("已保存至相册");
                            else
                              $ui.alert({
                                title: "错误",
                                message: result
                              });
                          }
                        });
                      }
                    }
                  ]
                });
              }
            }
          });
        } else if (response.statusCode == 401)
          $ui.alert({
            title: "验证失败",
            message: "请确认 API KEY 填写正确"
          });
        else
          $ui.alert({
            title: "上传失败",
            message: response.statusCode
          });
      }
    });
  }
}

function imgResize(img, type) {
  let size = img.image.size;
  return {
    type: "blur",
    props: {
      style: 5,
      alpha: 0,
      hidden: 1,
      radius: 10,
      id: "resize",
      borderWidth: 0.4,
      borderColor: $rgba(100, 100, 100, 0.25)
    },
    layout: (make, view) => {
      make.size.equalTo($size(sW * 0.75, sH * 0.75));
      make.centerX.equalTo(view.super);
      ver
        ? make.top.equalTo(view.super.safeAreaTop).offset(44 + sH * 0.5)
        : make.top.inset(64 + sH * 0.5);
    },
    views: [
      {
        type: "input",
        props: {
          id: "width",
          text: String(size.width),
          borderWidth: 0.4,
          borderColor: $rgba(100, 100, 100, 0.25),
          type: $kbType.decimal,
          placeholder: "宽"
        },
        layout: resizeLayout(-1, -1),
        events: {
          tapped(sender) {
            sender.focus();
          },
          changed: sender => {
            $("height").text =
              $("type").title == "比例"
                ? (sender.text * size.height) / size.width
                : sender.text;
            if (sender.text == "") $("height").text == "";
          }
        }
      },
      {
        type: "input",
        props: {
          id: "height",
          text: String(size.height),
          borderWidth: 0.4,

          borderColor: $rgba(100, 100, 100, 0.25),
          type: $kbType.decimal,
          placeholder: "高"
        },
        layout: resizeLayout(-1, 1),
        events: {
          tapped(sender) {
            sender.focus();
          },
          changed: sender => {
            $("width").text =
              $("type").title == "比例"
                ? (sender.text * size.width) / size.height
                : sender.text;
            if (sender.text == "") $("width").text == "";
          }
        }
      },
      {
        type: "button",
        props: {
          id: "type",
          title: "比例",
          titleColor: $color("tint"),
          borderWidth: 0.4,
          bgcolor: $rgba(255, 255, 255, 0.25),
          borderColor: $rgba(100, 100, 100, 0.25)
        },
        layout: resizeLayout(1, -1),
        events: {
          tapped(sender) {
            $device.taptic(0);
            if (sender.title == "比例") {
              sender.title = "像素";
              if ($("width").text != "")
                $("width").text = $("width").text / size.width;
              if ($("height").text != "")
                $("height").text = $("height").text / size.height;
            } else {
              sender.title = "比例";
              if ($("width").text != "")
                $("width").text = $("width").text * size.width;
              if ($("height").text != "")
                $("height").text = $("height").text * size.height;
            }
          }
        }
      },
      {
        type: "button",
        props: {
          title: "完成",
          titleColor: $color("tint"),
          borderWidth: 0.4,
          bgcolor: $rgba(255, 255, 255, 0.25),
          borderColor: $rgba(100, 100, 100, 0.25)
        },
        layout: resizeLayout(1, 1),
        events: {
          tapped(sender) {
            $("width").blur();
            $("height").blur();
            let resized =
              $("type").title == "比例"
                ? img.image.resized($size($("width").text, $("height").text))
                : img.image.resized(
                    $size(
                      $("width").text * size.width,
                      $("height").text * size.height
                    )
                  );
            resizedImage(resized, type);
            $("menubg").remove();
            menuAnimate(sender.super.super);
          }
        }
      }
    ]
  };
}

function resizeLayout(a, b) {
  return (make, view) => {
    make.width.equalTo(sW * 0.25 * 0.75);
    make.height.equalTo(30);
    make.centerY.equalTo(view.super).offset(sH * 0.14 * a);
    make.centerX.equalTo(view.super).offset(sW * 0.14 * b);
  };
}

function menuAnimate(view) {
  if (view.hidden == false)
    $ui.animate({
      duration: 0.5,
      damping: 1,
      velocity: 1,
      animation: () => {
        view.alpha = 0;
      },
      completion: () => {
        view.remove();
      }
    });
  else {
    view.hidden = 0;
    $ui.animate({
      duration: 0.5,
      damping: 0,
      velocity: 1,
      animation: () => {
        view.alpha = 1;
      }
    });
  }
}

function render(img) {
  let type = img.info.mimeType.replace("image/", ""),
    size = format(img.info.size),
    MD5 = $text.MD5(img),
    W = img.image.size.width,
    H = img.image.size.height,
    U = H / W >= 0.618,
    pW = (W * sH) / H, //以屏宽的 0.618 为基准缩放
    pH = (H * sW) / W, //以屏宽为基准缩放
    rW = W >= sW,
    rH = H >= sH;
  $ui.render({
    props: { navBarHidden: 1, statusBarStyle: 0 },
    views: [
      {
        type: "scroll",
        props: {
          bounces: 0,
          scrollEnabled: rW || rH,
          showsVerticalIndicator: 0,
          showsHorizontalIndicator: 0,
          contentSize: $size(rH ? pW : W, rW ? pH : H)
        },
        layout: (make, view) => {
          make.left.right.inset(0);
          make.height.equalTo(sH);
          ver
            ? make.top.equalTo(view.super.safeAreaTop).offset(44)
            : make.top.inset(64);
        },
        events: {
          ready: sender => {
            sender.clipsToBounds = 0;
          },
          tapped: sender => {
            $quicklook.open({ data: img });
          }
        },
        views: [
          {
            type: "image",
            props: { data: img },
            layout: (make, view) => {
              if (!rW && !rH) {
                make.center.equalTo(view.super);
              } else if (U) {
                make.centerX.equalTo(view.super);
                make.width.equalTo(rW ? sW : W);
                make.height.equalTo(rW ? pH : H);
              } else {
                make.centerY.equalTo(view.super);
                make.height.equalTo(rH ? sH : H);
                make.width.equalTo(rH ? pW : W);
              }
            }
          }
        ]
      },
      {
        type: "list",
        props: {
          bounces: 0,
          stickyHeader: 1,
          borderWidth: 0.4,
          borderColor: $rgba(100, 100, 100, 0.25),
          data: [
            { title: "调整", rows: initList(0) },
            { title: "图床", rows: initList(1) },
            { title: "其他", rows: initList(2) }
          ],
          template: [
            {
              type: "label",
              props: { id: "list", textColor: $color("#333") },
              layout: (make, view) => {
                make.centerY.equalTo(view.super);
                make.top.right.bottom.inset(0);
                make.left.inset(15);
              }
            }
          ]
        },
        layout: (make, view) => {
          make.left.right.inset(0);
          make.top.equalTo(view.prev.bottom);
          ver
            ? make.bottom.equalTo(view.super.safeAreaBottom).offset(-81)
            : make.bottom.inset(81);
        },
        events: {
          didSelect: (sender, indexPath) => {
            let sec = indexPath.section,
              row = indexPath.row;
            switch (sec) {
              case 0:
                switch (row) {
                  case 0:
                    if (type == "gif") {
                      $ui.error("暂时不支持 GIF", 0.6);
                      return;
                    }
                    $ui.window.add({
                      type: "view",
                      props: { id: "menubg" },
                      layout: $layout.fill,
                      events: {
                        tapped(sender) {
                          menuAnimate($("resize"));
                          sender.remove();
                        }
                      }
                    });
                    $ui.window.add(imgResize(img, type));
                    menuAnimate($("resize"));
                    break;
                  case 1:
                    resizedImage(
                      type == "gif"
                        ? gifReverse(img, 1)
                        : reverse(img.image, 1),
                      type
                    );
                    break;
                  case 2:
                    resizedImage(
                      type == "gif"
                        ? gifReverse(img, -1)
                        : reverse(img.image, -1),
                      type
                    );
                    break;
                  case 3:
                    type == "gif"
                      ? resizedImage(gifPlayback(img), type)
                      : $ui.error("该图片格式不是 GIF", 0.6);
                    break;
                }
                break;
              case 1:
                switch (row) {
                  case 0:
                    uploadImg(img, row);
                    break;
                  case 1:
                    uploadImg(img, row);
                    break;
                  case 2:
                    console.log(imgurApi);
                    if (imgurApi == "") {
                      setApikey("imgur");
                      imgurApi = $cache.get("imgur") || "";
                    } else uploadImg(img, row);
                    break;
                  case 3:
                    uploadImg(img, row);
                    break;
                  case 4:
                    uploadImg(img, row);
                    break;
                  case 5:
                    uploadImg(img, row);
                    break;
                  case 6:
                    $ui.menu({
                      items: ["Upload.cc", "SM.MS", "Imgur"],
                      handler: (t, i) => {
                        $input.text({
                          type: $kbType.ascii,
                          placeholder: "输入 Delete Hash/Key",
                          handler: text => {
                            uploadDelete(i, text);
                          }
                        });
                      }
                    });
                    break;
                }
                break;
              case 2:
                switch (row) {
                  case 0:
                    tinyPNG(img);
                    break;
                  case 1:
                    $ui.menu({
                      items: ["PNG", "JPEG"],
                      handler: (t, i) => {
                        i == 0
                          ? $share.sheet(img.png)
                          : $share.sheet(img.jpg(1.0));
                      }
                    });
                    break;
                }
                break;
            }
          },
          didLongPress: function(sender, indexPath) {
            if (indexPath.section == 1) {
              if (indexPath.row == 2) setApikey("imgur");
            } else if (indexPath.section == 2) {
              if (indexPath.row == 0) setApikey("tinypng");
            }
          }
        }
      },
      {
        type: "blur",
        props: {
          style: 5,
          borderWidth: 0.4,
          borderColor: $rgba(100, 100, 100, 0.25)
        },
        layout: (make, view) => {
          make.top.left.right.inset(0);
          ver
            ? make.bottom.equalTo(view.super.safeAreaTop).offset(44)
            : make.height.equalTo(64);
        },
        views: [
          {
            type: "label",
            props: {
              text: "Image Editor",
              font: $font("Lato-Medium", 20),
              textColor: $color("tint")
            },
            layout: (make, view) => {
              make.centerX.equalTo(view.super);
              ver
                ? make.centerY.equalTo(view.super.safeArea)
                : make.centerY.equalTo(view.super).offset(10);
            }
          }
        ],
        events: {
          tapped(sender) {
            $app.close();
          }
        }
      },
      {
        type: "blur",
        props: {
          style: 5
        },
        layout: (make, view) => {
          make.left.right.bottom.inset(0);
          ver
            ? make.top.equalTo(view.super.safeAreaBottom).offset(-81)
            : make.height.equalTo(81);
        },
        views: [
          {
            type: "label",
            props: {
              text:
                "尺寸:  " +
                W +
                " * " +
                H +
                "   大小:  " +
                size +
                "   类型:  " +
                type.toUpperCase(),
              font: $font(12),
              textColor: $color("#333")
            },
            layout: (make, view) => {
              make.centerX.equalTo(view.super);
              make.centerY.equalTo(view.super).offset(-13.5);
            }
          },
          {
            type: "label",
            props: {
              text: "MD5: ",
              font: $font(12),
              textColor: $color("#333")
            },
            layout: (make, view) => {
              make.left.equalTo(view.prev);
              make.centerY.equalTo(view.super).offset(13.5);
            }
          },
          {
            type: "button",
            props: {
              radius: 10,
              font: $font(11),
              borderWidth: 0.8,
              title: " " + MD5 + " ",
              titleColor: $color("#333"),
              bgcolor: $rgba(200, 200, 200, 0.25),
              borderColor: $rgba(100, 100, 100, 0.25)
            },
            layout: (make, view) => {
              make.left.equalTo(view.prev.right).offset(2);
              make.centerY.equalTo(view.prev);
              make.height.equalTo(20);
            },
            events: {
              tapped(sender) {
                $clipboard.text = MD5;
                $ui.toast("MD5 已复制到剪贴板", 0.6);
              }
            }
          }
        ]
      }
    ]
  });
}
