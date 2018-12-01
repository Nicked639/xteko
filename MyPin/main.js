mode = "clip"//默认本地存储
var dataManager = require("scripts/data-manager");
dataManager.init(mode);

var path = $app.env == $env.today ? "scripts/widget" : "scripts/app";
var module = require(path);
module.init(mode);
