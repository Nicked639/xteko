mode = $cache.get("mode")||"clip"//默认本地存储
var dataManager = require("scripts/data-manager");
dataManager.init(mode);

var path = $app.env == $env.app ? "scripts/app" : "scripts/widget";

var module = require(path);
module.init(mode);
