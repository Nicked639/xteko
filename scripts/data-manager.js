CloudDataPath = "drive://MyPin.json"
if ($file.read(CloudDataPath)) {
   LocalData = JSON.parse($file.read(CloudDataPath).string);
    //LocalList = LocalData.fav.map(i=>i)
  } else {
    LocalData = { "fav": [] };
    //LocalList = [];
  };

var helper = require("./helper");

function init(mode="clip") {
  var text = $clipboard.text;
  if (text == undefined || text.length == 0) {
    return;
  }

  var items = getTextItems(mode);
  var index = items.indexOf(text);

  if (index != -1) {
    helper.arrayRemove(items, index);
  }

  items.unshift(text);
  setTextItems(items,mode);
}

function getTextItems(mode="clip") {
  if (mode == "clip")
    return $cache.get("clipboard-items") || [];
  else return LocalData.fav
}

function setTextItems(items,mode="clip") {
  if (mode == "clip")
    $cache.set("clipboard-items", items);
  else {
    LocalData.fav = items
    writeCloud()
  }
}

function clearTextItems(mode="clip") {
  if(mode == "clip")
    $cache.remove("clipboard-items");
  else {
    LocalData.fav = []
    writeCloud()
  }
}

function defaultActionItems() {
  return JSON.parse($file.read("assets/actions.json").string);
}

function getActionItems() {
  return $cache.get("action-items") || [{"pattern":"delete:","icon":"icon_027.png","noenc":false,"name":"删除"},{"pattern":"dic:","icon":"icon_024.png","noenc":false,"name":"词典"},{"pattern":"editPhoto:","icon":"icon_025.png","noenc":false,"name":"编辑图形"},{"pattern":"searchImage:","icon":"icon_014.png","noenc":false,"name":"搜图"},{"pattern":"taobao://s.taobao.com/?q=%@","icon":"icon_072.png","noenc":false,"name":"淘宝"},{"pattern":"pushbullet:","icon":"icon_190.png","noenc":false,"name":"Pushbullet"},{"pattern":"keyboard:","icon":"icon_010.png","noenc":false,"name":"工具"},{"pattern":"url_convert:","icon":"icon_020.png","noenc":false,"name":"链接"},{"pattern":"pin://gifsender?src=auto","icon":"icon_016.png","noenc":false,"name":"抓图"},{"name":"Mtime Movie","pattern":"jsbox://run?name=Mtime%20Movie","icon":"icon_036.png"},{"name":"SM.MS","pattern":"jsbox://run?name=SM.MS","icon":"icon_134.png"}]
}

function setActionItems(items) {
  $cache.set("action-items", items);
}

function getSearchEngine() {
  return $cache.get("search-engine") || "x-web-search://?";
}

function setSearchEngine(engine) {
  $cache.set("search-engine", engine);
}

function writeCloud() {
  $file.write({
    data: $data({ string: JSON.stringify(LocalData) }),
    path: CloudDataPath
  });
}

function initData(mode="clip"){
  $("clipboard-list").data = []
  if(mode=="clip")
    var textItems = getTextItems();
  else{
    var textItems = LocalData.fav.map(i=>i)
  }
  let temp = []
  textItems.map(function(i){
      let flag = i.indexOf("\n") >= 0
      temp = temp.concat({
        label:{
          text: i,
          textColor: flag? $color("#325793"):$color("black")
        }
      })
    })
    $("clipboard-list").data = temp
}

function copied2Clip(text) {
  $clipboard.set({ "type": "public.plain-text", "value": text });
  if (($app.env == $env.today)) {
    $("input").text = $clipboard.text;
    var items = getTextItems();
    if (items.indexOf(text) === -1 && text.length > 0) {
      items.unshift(text);
      $("clipboard-list").insert({ "index": 0, "value": text });
      setTextItems(items);
      var builder = require("./builder");
      builder.reloadTextItems();
    } else return;
  } else return;
}

  module.exports = {
    init: init,
    getTextItems: getTextItems,
    setTextItems: setTextItems,
    clearTextItems: clearTextItems,
    defaultActionItems: defaultActionItems,
    getActionItems: getActionItems,
    setActionItems: setActionItems,
    getSearchEngine: getSearchEngine,
    setSearchEngine: setSearchEngine,
    initData: initData,
    writeCloud: writeCloud,
    copied2Clip:copied2Clip,
  }
