function picPick() {
  if ($context.image) {
    pic = $context.imageItems[0];
takenDate=dateConvert(nowTime())
//alert($props(pic))
    editView();

  } else {
    $ui.menu({
      items: ["相册选取","最后一张"],
      handler: (title, idx) => {
        if(idx==0){
          $photo.pick({
                handler: function (resp) {
                  pic = resp.image;
                  //console.log($props(resp.metadata));
                  let tiff = resp.metadata["{TIFF}"];
                  takenDate = tiff.DateTime
                    ? dateConvert(tiff.DateTime.split(" ")[0])
                    : dateConvert(nowTime());
          
                  editView();
                }
              });
        }else if(idx==1){
          $photo.fetch({
                    count: 1,
                    handler: function(images) {
                      pic = images[0];
                      console.log($props(images[0]))
takenDate=dateConvert(nowTime())
                      editView();
                    }
                  });
        }
      }
    });
    
        
  }
}

function editView() {
  picSDM();
  photoView();
  photoSize();
}

function picSDM() {
  var image = pic.jpg(1);
  var img = $text.base64Encode(image);
  picData = "data:image/png;base64," + img;
//alert(picData)
}

function photoView() {
  $ui.render({
    props: {
      title: "Timestamp",
      id: "mainView"
    },
    views: [
      {
        type: "image",
        props: {
          id: "pic",
          src: picData
        },
        views: [
          {
            type: "label",
            props: {
              id: "dateRB",
              text: takenDate,
              font: $font("LCDDot TR", defaultSize),
              textColor: $rgba(243, 156, 15, 0.9),
              bgcolor: $color("clear"),
              hidden: false
            },
            layout: function (make, view) {
              make.bottom.inset(50);
              make.right.inset(50);
              shadow(view);
            }
          },
          {
            type: "label",
            props: {
              id: "dateLB",
              text: takenDate,
              font: $font("LCDDot TR", defaultSize),
              textColor: $rgba(243, 156, 15, 0.9),
              bgcolor: $color("clear"),
              hidden: true
            },
            layout: function (make, view) {
              make.bottom.inset(50);
              make.left.inset(50);
              shadow(view);
            }
          }
        ],
        layout: function (make, view) {
          make.centerX.equalTo(view.super);
          make.centerY.equalTo(view.super).offset(-100);
        }
      },
      {
        type: "button",
        props: {
          id: "bigger",
          bgcolor: $color("tint"),
          radius: 17,
          icon: $icon("160", $color("white"), $size(15, 15))
        },
        layout: function (make, view) {
          make.right.inset(10);
          make.bottom.inset(150);
          make.width.equalTo(35);
          make.height.equalTo(35);
        },
        events: {
          tapped(sender) {
            defaultSize += 3;
            $("dateRB").font = $font("LCDDot TR", defaultSize);
            $("dateLB").font = $font("LCDDot TR", defaultSize);
          }
        }
      },
      {
        type: "button",
        props: {
          id: "smaller",
          bgcolor: $color("tint"),
          radius: 17,
          icon: $icon("161", $color("white"), $size(15, 15))
        },
        layout: function (make, view) {
          make.right.inset(10);
          make.bottom.inset(100);
          make.width.equalTo(35);
          make.height.equalTo(35);
        },
        events: {
          tapped(sender) {
            defaultSize -= 3;
            $("dateRB").font = $font("LCDDot TR", defaultSize);
            $("dateLB").font = $font("LCDDot TR", defaultSize);
          }
        }
      },
      {
        type: "button",
        props: {
          id: "lighter",
          bgcolor: $color("tint"),
          radius: 17,
          icon: $icon("093", $color("white"), $size(15, 15))
        },
        layout: function (make, view) {
          make.left.inset(10);
          make.bottom.inset(150);
          make.width.equalTo(35);
          make.height.equalTo(35);
        },
        events: {
          tapped(sender) {
            num++;
            if ($("dateRB").hidden == false) {
              $("pic").add({
                type: "label",
                props: {
                  id: "dateRB" + num,
                  text: takenDate,
                  font: $font("LCDDot TR", defaultSize),
                  textColor: $rgba(243, 156, 15, 0.9),
                  bgcolor: $color("clear"),
                  hidden: false
                },
                layout: function (make, view) {
                  make.bottom.inset(50);
                  make.right.inset(50);
                  shadow(view);
                }
              });
            } else {
              $("pic").add({
                type: "label",
                props: {
                  id: "dateLB" + num,
                  text: takenDate,
                  font: $font("LCDDot TR", defaultSize),
                  textColor: $rgba(243, 156, 15, 0.9),
                  bgcolor: $color("clear"),
                  hidden: false
                },
                layout: function (make, view) {
                  make.bottom.inset(50);
                  make.left.inset(50);
                  shadow(view);
                }
              });
            }
          }
        }
      },
      {
        type: "button",
        props: {
          id: "darker",
          bgcolor: $color("tint"),
          radius: 17,
          icon: $icon("092", $color("white"), $size(15, 15))
        },
        layout: function (make, view) {
          make.left.inset(10);
          make.bottom.inset(100);
          make.width.equalTo(35);
          make.height.equalTo(35);
        },
        events: {
          tapped(sender) {
            let id = "dateRB";
            if (num > 0) {
              if ($("dateRB").hidden == false) id = "dateRB" + num;
              else id = "dateLB" + num;
              $(id).remove();
              num--;
            }
          }
        }
      },
      {
        type: "button",
        props: {
          id: "save",
          title: "保存",
          font: $font(14)
        },
        layout: function (make, view) {
          make.bottom.inset(20);
          make.centerX.equalTo(view.super);
          make.height.equalTo(30);
          make.width.equalTo(60);
        },
        events: {
          tapped(sender) {
            //            $ui.toast("保存中...", 10);
            var screenShot = $("pic").snapshotWithScale(1);

            //            console.log($props(screenShot))
            compressImage(screenShot, comSize, comQua);
          }
        }
      },
      {
        type: "button",
        props: {
          id: "save",
          title: "日期",
          font: $font(14)
        },
        layout: function (make, view) {
          make.bottom.inset(20);
          make.left.inset(60);
          make.height.equalTo(30);
          make.width.equalTo(60);
        },
        events: {
          tapped(sender) {
            $pick.date({
              props: {
                mode: 1
              },
              handler: function (date) {
                takenDate = dateConvert(nowTime(date));
                $("dateLB").text = takenDate;
                $("dateRB").text = takenDate;
              }
            });
          }
        }
      },
      {
        type: "button",
        props: {
          id: "position",
          title: "位置",
          font: $font(14)
        },
        layout: function (make, view) {
          make.bottom.inset(20);
          make.right.inset(60);
          make.height.equalTo(30);
          make.width.equalTo(60);
        },
        events: {
          tapped(sender) {
            directionChange();
            num = 0;
          }
        }
      }
    ],
    layout: $layout.fill
  });
}

function compressImage(image, comSize, comQua) {
  //        alert($props(image[0]))
  if (comSize && comQua) {
    let width = (image.size.width * comSize) / 100;
    let height = (image.size.height * comSize) / 100;
    let resized = image.resized($size(width, height));
    let jpg = resized.jpg(comQua / 100);

    $photo.save({
      data: jpg,
      handler: function (success) {
        if (success) $ui.toast("压缩成功");
        return;
      }
    });
  }
else{
  $input.text({
    type: $kbType.number,
    placeholder: "输入压缩到比例 0～100",
    handler: function (num1) {
      let width = (image.size.width * num1) / 100;
      let height = (image.size.height * num1) / 100;
      let resized = image.resized($size(width, height));
      $input.text({
        type: $kbType.number,
        placeholder: "输入压缩后质量 0～100",
        handler: function (num2) {
          let jpg = resized.jpg(num2 / 100);

          $photo.save({
            data: jpg,
            handler: function (success) {
              if (success) $ui.toast("压缩成功");
            }
          });
        }
      });
    }
  });}
}

function photoSize() {
  var picHeight = pic.size.height;
  var picWidth = pic.size.width;
  var long = picHeight > picWidth ? picHeight : picWidth;
  defaultSize = long * 0.05;
  picRadius = 375 / picWidth;
  $("pic").scale(picRadius);

  $("dateLB").font = $font("LCDDot TR", defaultSize);
  $("dateRB").font = $font("LCDDot TR", defaultSize);
  //  alert(picRadius)
}

function directionChange() {
  if ($("dateRB").hidden == false) {
    $("dateRB").hidden = true;
    $("dateLB").hidden = false;
    for (let i = 1; i < num + 1; i++) {
      let id = "dateRB" + i;
      $(id).remove();
    }
  } else {
    $("dateLB").hidden = true;
    $("dateRB").hidden = false;
    for (let i = 1; i < num + 1; i++) {
      let id = "dateLB" + i;
      $(id).remove();
    }
  }
}

function addSpace(num) {
  if(num.length>=2)
  return num[0] + " " + num[1];
else return "0 "+num[0]
}

function nowTime(t) {
  if (!t) t = new Date();
  let y = t.getFullYear();
  let m = t.getMonth() + 1 + "";
  m = m.length == 1 ? "0" + m : m;
  let d = t.getDate();
  return y + ":" + m + ":" + d;
}

function dateConvert(dateTime) {
  console.log(dateTime)
let year = dateTime.split(":")[0].substring(2, 4);
  let mo = dateTime.split(":")[1];
  let day = dateTime.split(":")[2];
 let result = "' " + addSpace(year) + "  " + addSpace(mo) + "  " + addSpace(day);
console.log(addSpace(day))
  return result
}

function shadow(view) {
  var layer = view.runtimeValue().invoke("layer");
  layer.invoke("setCornerRadius", 10);
  layer.invoke("setShadowOffset", $size(0, 10));
  layer.invoke(
    "setShadowColor",
    $rgb(243, 153, 15).runtimeValue().invoke("CGColor")
  );
  layer.invoke("setShadowOpacity", 1);
  layer.invoke("setShadowRadius", 15);
}
var picRadius = "";
var pic = "";
var picData = "";
var takenDate = "";
var defaultSize = 100;
var num = 0;
var comSize = 50; //默认压缩比例
var comQua = 50; //默认压缩质量
picPick();
