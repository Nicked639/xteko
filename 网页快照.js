let link = "";
if ($context.safari) {
  let location = $context.safari.items.location.href;
  link = "https://2tool.top/kuaizhao.php?k=" + encodeURI(location);
}
var url = link ? link : $clipboard.link;
if (!url) {
  $ui.error("请输入有效网址");
  return;
}
var idArray = [];
var items = [];
$http.get({
  url: url,
  handler: function(resp) {
    console.log(resp.data);
    let reg = /doLoadKz\('(.*?)',"(.*?)",\d\);/g;
    let result = resp.data.match(reg);
    console.log(result);
    result.map(getId);
    console.log(idArray);

    let id = [
      {
        id: idArray[0] + "&num=1",
        name: "百度"
      },
      {
        id: idArray[1] + "&num=2",
        name: "搜狗"
      },
      {
        id: idArray[2] + "&num=3",
        name: "360"
      },
      {
        id: idArray[3] + "&num=4",
        name: "Bing"
      },
      {
        id: idArray[4] + "&num=5",
        name: "Google"
      }
    ];

    id.map(doLoadKz);
    $delay(1.5, () => {
      $ui.clearToast();
      $ui.menu({
        items: items.map(function(item) {
          return item.name;
        }),
        handler: function(title, idx) {
          $app.openURL(items[idx].link);
        }
      });
    });
  }
});

function getId(preId) {
  let idReg = /doLoadKz\('(.*?)',/g;
  let id = idReg.exec(preId)[1];
  idArray.push(id);
}

async function doLoadKz(obj) {
  var preUrl = "https://2tool.top";
  var id = obj.id;
  var name = obj.name;
  var url = preUrl + "/kz.php?s=" + id;
  let resp = await $http.get(url);
  let result = $detector.link(resp.data);
  //  console.log(resp.data)
  //  console.log(result)
  if (result.length > 0) {
    items.push({
      name: name,
      link: result[0]
    });
  }
  //  console.log(items)
  //  $app.openURL(encodeURI(result))
}
