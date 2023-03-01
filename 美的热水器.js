$ui.render({
  props: {
    title: "",
    
  },
  views: [
    {
      type: "matrix",
      props: {
        id: "info",
        columns: 2,
        itemHeight: 90,
        spacing: 10,
        bgcolor:$app.env==$env.app? $color("black"):$color("clear"),
        template: {
          props: {
            bgcolor:$device.isDarkMode?$rgba(100, 100, 100, 0.3): $rgba(233, 233, 233, 0.4),
            radius:8
          },
          views: [
            {
              type: "image",
              props: {
                image: $file.read("hot.PNG").image
                //src:"hot.PNG"
              },
              layout: function(make, view) {
                make.top.inset(10);
                make.centerX.equalTo(view.super).offset(-30)
                make.size.equalTo($size(35, 17))
              }
            },{
              type: "label",
              props: {
                id: "name",
                bgcolor: $color("clear"),
                textColor: color(),
                align: $align.center,
                font: $font(13)
              },
              layout: function (make, view) {
                make.top.inset(10);
                make.centerX.equalTo(view.super).offset(20)
              }
            },
            {
              type: "progress",
              props: {
                value: 0,
                trackColor: $color("#aaaaaa")
              },
              layout: function (make, view) {
                make.centerY.equalTo(view.super).offset(-10);
                make.centerX.equalTo(view.super);
                make.width.equalTo(130);
              }
            },
            {
              type: "label",
              props: {
                id: "temp",
                bgcolor: $color("clear"),
                textColor: color(),
                align: $align.center,
                font: $font(12)
              },
              layout: function (make, view) {
                make.centerY.equalTo(view.super).offset(10);
                make.centerX.equalTo(view.super);
              }
            },
            {
              type: "label",
              props: {
                id: "time",
                bgcolor: $color("clear"),
                textColor: color(),
                align: $align.center,
                font: $font(10)
              },
              layout: function (make, view) {
                make.centerY.equalTo(view.super).offset(30);
                make.centerX.equalTo(view.super);
              }
            }
          ]
        }
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
        $app.openURL("shortcuts://run-shortcut?name="+encodeURI("美的美居"))
        }
      }
    },
    {
      type: "label",
      props: {
        id: "temp",
        bgcolor: $color("#474b51"),
        textColor: $color("#abb2bf"),
        align: $align.center,
        font: $font(32),
        //text: curTime(),
        hidden: true
      },
      layout: function (make, view) {
        make.centerY.equalTo(view.super);
        make.width.equalTo(100);
      }
    }
  ]
});

await getTemp();

async function getTemp() {
  $http.post({
    url: "https://cn-apia.coolkit.cn/v2/homepage",
    header: {
      authorization: "Bearer ",
      "package-name": "com.coolkit",
      "content-length": 230,
      "user-agent": "momoko/1 CFNetwork/1406.0.2 Darwin/22.4.0",
      "x-ck-nonce": "2nsfvwvc"
    },
    body: {
      clientInfo: {
        os: "iOS",
        model: "iPhone 13_iPhone14,5",
        romVersion: "16.4",
        appVersion: "4.29.0"
      },
      getFamily: {},
      getThing: { num: 30, extTypes: ["iOSDeviceCtrlWidget"] },
      lang: "cn"
    },
    handler: resp => {
      var data = resp.data;
      if (data.error) {
        $ui.error("温度获取出错", 5);
        return;
      }
      var temp = [];
      $("info").data = [];
      var hotArray = data.data.thingInfo.thingList;
      for (let h in hotArray) {
        temp = temp.concat({
          name:{
            text:hotArray[h].itemData.name.slice(-2) +
            " " +
            hotArray[h].itemData.params.volume +
            " L",
          },
          progress:{
            value :hotArray[h].itemData.params.cur_temperature/hotArray[h].itemData.params.temperature,
            progressColor:hotArray[h].itemData.params.cur_temperature/hotArray[h].itemData.params.temperature>0.83?$color("tint"):hotArray[h].itemData.params.cur_temperature/hotArray[h].itemData.params.temperature>0.5?$color("red"):("purple")
          },
          temp:{
            text:hotArray[h].itemData.params.cur_temperature+" ℃ / "+hotArray[h].itemData.params.temperature+" ℃",
          },
          time: {
            text:remTime(
            hotArray[h].itemData.params.end_time_hour,
            hotArray[h].itemData.params.end_time_minute
          )
          }
        });
        console.log(temp);
      }
      $("info").data = temp;
      //curTime();
    }
  });
}

function curTime() {
  const now = new Date();
  const hours = ("0" + now.getHours()).slice(-2);
  const minutes = ("0" + now.getMinutes()).slice(-2);
  const formattedTime = `${hours}:${minutes}`;
  console.log(formattedTime);
  return $ui.toast(formattedTime + " 更新",1);
}

function color() {
  if ($device.isDarkMode) return $color("#dddddd");
  else return $color("#333333");
}

function remTime(h, m) {
  if (h == 0 && m == 0) return "保温中";
  else {
    var mm = ("0" + m).slice(-2);
    var rt = ""
    if (h==0)
      rt = "加热中: " + m + "分钟"
    else
      rt = "加热中: " + h + "小时" + mm + "分钟";
    return rt;
  }
}
