var helper = require("./helper");

function init() {

  var text = $clipboard.text;

  if (text == undefined || text.length == 0) {
    return;
  }

  var items = getTextItems();
  var index = items.indexOf(text);

  if (index != -1) {
    helper.arrayRemove(items, index);
  }

  items.unshift(text);
  setTextItems(items);
}

function getTextItems() {
  return $cache.get("clipboard-items") || [];
}

function setTextItems(items) {
  $cache.set("clipboard-items", items);
}

function clearTextItems() {
  $cache.remove("clipboard-items");
}

function defaultActionItems() {
  return JSON.parse($file.read("assets/actions.json").string);
}

function getActionItems() {
  return $cache.get("action-items") || [{"pattern":"delete:","icon":"icon_027.png","noenc":false,"name":"删除"},{"pattern":"pin://gifsender?src=auto","icon":"icon_016.png","noenc":false,"name":"抓图"},{"pattern":"editPhoto:","icon":"icon_025.png","noenc":false,"name":"编辑图形"},{"pattern":"searchImage:","icon":"icon_014.png","noenc":false,"name":"搜图"},{"pattern":"taobao://s.taobao.com/?q=%@","icon":"icon_072.png","noenc":false,"name":"淘宝"},{"pattern":"pushbullet:","icon":"icon_190.png","noenc":false,"name":"Pushbullet"},{"pattern":"keyboard:","icon":"icon_052.png","noenc":false,"name":"工具"},{"name":"Mtime Movie","pattern":"jsbox://run?name=Mtime%20Movie","icon":"icon_036.png"},{"name":"SM.MS","pattern":"jsbox://run?name=SM.MS","icon":"icon_134.png"}]
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

function copied2Clip(text) {
  $clipboard.set({ "type": "public.plain-text", "value": text });
  if (($app.env == $env.today)) {
      $("input").text = $clipboard.text;
      var items = getTextItems();
      if (items.indexOf(text) === -1 && text.length > 0) {
        items.unshift(text);
           $("clipboard-list").data = [];
           items.map(function(i) {
             let flag = i.indexOf("\n") >= 0;
             $("clipboard-list").data = $("clipboard-list").data.concat({
               label: {
                 text: i,
                 textColor: flag ? $color("#325793") : $color("black")
               }
             });
           });
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
    copied2Clip: copied2Clip
  }
