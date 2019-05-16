// Localization
$app.strings = {
  "en": {
    "menu_home": "Home",
    "menu_downloads": "Downloads",
    "menu_setting": "Setting",
    "region_z0": "East China",
    "region_z1": "North China",
    "region_z2": "South China",
    "region_na0": "North America",
    "region_as0": "Singapore",
    "no_more_data": "No more data",
    "no_downloads": ":(\nNo Downloads",
    "region": "Region",
    "bucket": "Bucket",
    "domain": "Domain",
    "website": "Website",
    "tutorial": "How To Use",
    "type": "Type: ",
    "size": "Size: ",
    "setting_keys": "Keys",
    "setting_settings": "Settings",
    "setting_about": "About",
    "setting_footer": "Created by RYAN.\nVersion ",
    "action_manage": "Manage",
    "action_share": "Share",
    "action_preview": "Preview File",
    "action_download": "Download File",
    "action_copy": "Copy Public Link",
    "action_refresh": "Refresh",
    "action_rename": "Rename",
    "action_delete": "Delete",
    "alert_title_error": "Error",
    "alert_title_default": "Valid SK and AK",
    "alert_message_default": "Bucket and Domain are set as default.\n\nIt is recommended for you to check the default settings and rechoose them on your own.",
    "alert_message_action": "These actions will affect the online resources.",
    "alert_message_delete": "Sure to delete?",
    "alert_button_cancel": "Cancel",
    "alert_button_delete": "Delete",
    "alert_button_close": "Close",
    "alert_button_copy": "Copy Public Link and Close",
    "error_key": "Invalid Key",
    "toast_copied": "Clipboard Set",
    "toast_reloaded": "Reloaded",
    "toast_renamed": "Renamed",
    "toast_refreshed": "Refreshed",
    "toast_deleted": "Deleted",
    "toast_downloaded": "Downloaded",
    "toast_uploaded": "Uploaded"
  },
  "zh-Hans": {
    "menu_home": "首页",
    "menu_downloads": "下载",
    "menu_setting": "设置",
    "region_z0": "华东",
    "region_z1": "华北",
    "region_z2": "华南",
    "region_na0": "北美",
    "region_as0": "新加坡",
    "no_more_data": "没有更多了",
    "no_downloads": ":(\n没有已下载",
    "region": "存储区域",
    "bucket": "存储空间",
    "domain": "空间域名",
    "website": "主页",
    "tutorial": "如何使用",
    "type": "类型: ",
    "size": "大小: ",
    "setting_keys": "密钥",
    "setting_settings": "设置",
    "setting_about": "关于",
    "setting_footer": "创建人 RYAN\n版本号 ",
    "action_manage": "管理",
    "action_share": "分享",
    "action_preview": "预览文件",
    "action_download": "下载文件",
    "action_copy": "复制外链",
    "action_refresh": "刷新缓存",
    "action_rename": "重命名",
    "action_delete": "删除",
    "alert_title_error": "错误",
    "alert_title_default": "有效的 SK 和 AK",
    "alert_message_default": "存储空间和空间域名已设为默认选项。\n\n建议检查默认选项并自行重新选择。",
    "alert_message_action": "这些动作都将直接影响在线资源。",
    "alert_message_delete": "确定删除?",
    "alert_button_cancel": "取消",
    "alert_button_delete": "删除",
    "alert_button_close": "关闭",
    "alert_button_copy": "复制外链并关闭",
    "error_key": "无效的 Key",
    "toast_copied": "已复制",
    "toast_reloaded": "已刷新",
    "toast_renamed": "已重命名",
    "toast_refreshed": "已刷新缓存",
    "toast_deleted": "已删除",
    "toast_downloaded": "已下载",
    "toast_uploaded": "已上传"
  }
}

const CryptoJS = require("crypto-js")
const DEFAULT_SETTING = [
  ["", ""],
  ["https://up-z2.qiniup.com", "", ""]
]
const TEMPLATE_SETTING = [{
  type: "label",
  props: {
    id: "name",
    textColor: $color("darkGray")
  },
  layout: function(make) {
    make.left.inset(15)
    make.top.bottom.right.inset(0)
  }
}]
const REGION = [{
  title: $l10n("region_z0"),
  url: "https://up.qiniup.com"
},
{
  title: $l10n("region_z1"),
  url: "https://up-z1.qiniup.com"
},
{
  title: $l10n("region_z2"),
  url: "https://up-z2.qiniup.com"
},
{
  title: $l10n("region_na0"),
  url: "https://up-na0.qiniup.com"
},
{
  title: $l10n("region_as0"),
  url: "https://up-as0.qiniu.com"
}]
const MIME = {
  ".zip": "application/zip",
  ".html": "text/html",
  ".css": "text/css",
  ".py": "text/x-python-script",
  ".js": "application/javascript",
  ".json": "text/json"
}

// Read Setting
var file = $file.read("Setting.conf")
var SETTING_FILE = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_SETTING)) : JSON.parse(file.string)
// Read Downloads
var file = $file.list("downloads")
var DOWNLOADS_FILE = (typeof file == "undefined" || file.length === 0) ? [] : file.sort()

// URL
var URL_UP = SETTING_FILE[1][0]
var URL_SELF = (SETTING_FILE[1][2].indexOf("bkt.clouddn.com") === -1 ? "https://" : "http://") + SETTING_FILE[1][2] + "/"

// Caculate TabBar Height for iPhone X
const ROOT_VC = $objc("UIApplication").invoke("sharedApplication.keyWindow.rootViewController")
const TABBAR_MIAN = ROOT_VC.invoke("selectedIndex") == 0 ? true : false
const TABBAR_HEIGHT = calTabBarHeight(TABBAR_MIAN)

// Language
const LANGUAGE = $app.info.locale

String.prototype.urlsafe = function() {
  return this.replace(/\+/g, "-").replace(/\//g, "_")
}

String.prototype.isKey = function() {
  return /^[0-9a-zA-Z_-]{35,}$/.test(this)
}

String.prototype.extension = function() {
  return this.match(/\.\w+$/)[0]
}

Number.prototype.bytes = function() {
  if (parseInt(this / 1000000)) {
    return Math.ceil(this / 1000000) + " MB"
  } else {
    return Math.ceil(this / 1000) + " KB"
  }
}

/* Function */
function calTabBarHeight(isRunningMain) {
  var model = $device.info.model
  if (model == "iPhone10,3" || model == "iPhone10,6") {
    return isRunningMain ? 70 : 50
  }

  return 50
}

function generateMainViewObjects() {
  home = {
    type: "list",
    props: {
      id: "home",
      hidden: false,
      rowHeight: 65,
      template: [{
          type: "label",
          props: {
            id: "fname",
            autoFontSize: true,
            font: $font("bold", 18),
            textColor: $color("darkGray")
          },
          layout: function(make) {
            make.left.top.right.inset(10)
          }
        },
        {
          type: "label",
          props: {
            id: "type",
            font: $font(13),
            textColor: $color("lightGray")
          },
          layout: function(make, view) {
            var pre = view.prev
            make.top.equalTo(pre.bottom).offset(5)
            make.left.inset(10)
          }
        },
        {
          type: "label",
          props: {
            id: "size",
            font: $font(13),
            textColor: $color("lightGray")
          },
          layout: function(make, view) {
            var pre = view.prev
            make.top.equalTo(pre)
            make.right.inset(20)
          }
        }
      ],
      footer: {
        type: "view",
        props: {
          height: 40
        },
        layout: $layout.fill,
        views: [{
            type: "label",
            props: {
              id: "footer",
              hidden: true,
              text: "- " + $l10n("no_more_data") + " -",
              font: $font(12),
              textColor: $color("#AAAAAA"),
              align: $align.center
            },
            layout: $layout.fill
          },
          {
            type: "spinner",
            layout: $layout.center
          }
        ]
      },
      actions: [{
        title: $l10n("action_manage"),
        handler: function(sender, indexPath) {
          showManage(sender, indexPath)
        }
      }]
    },
    layout: $layout.fill,
    events: {
      didSelect: function(sender, indexPath) {
        showMenu(sender, indexPath)
      },
      pulled: function(sender) {
        actionFetch("reload")
      },
      didReachBottom: function(sender) {
        actionLoadMore(sender)
      }
    }
  }

  // Downloads View Object
  downloads = {
    type: "list",
    props: {
      id: "downloads",
      hidden: true,
      rowHeight: 65,
      template: [{
          type: "label",
          props: {
            id: "fname",
            autoFontSize: true,
            font: $font("bold", 18),
            textColor: $color("darkGray")
          },
          layout: function(make) {
            make.left.top.right.inset(10)
          }
        },
        {
          type: "label",
          props: {
            id: "type",
            font: $font(13),
            textColor: $color("lightGray")
          },
          layout: function(make, view) {
            var pre = view.prev
            make.top.equalTo(pre.bottom).offset(5)
            make.left.inset(10)
          }
        },
        {
          type: "label",
          props: {
            id: "size",
            font: $font(13),
            textColor: $color("lightGray")
          },
          layout: function(make, view) {
            var pre = view.prev
            make.top.equalTo(pre)
            make.right.inset(20)
          }
        }
      ],
      actions: [{
        title: "Delete",
        handler: function(sender, indexPath) {
          var file = DOWNLOADS_FILE[indexPath.row]
          $file.delete("downloads/" + file)
          DOWNLOADS_FILE = $file.list("downloads").sort()
          if (DOWNLOADS_FILE.length === 0) {
            $("no-downloads").hidden = false
          }
        }
      },
      {
        title: $l10n("action_share"),
        handler: function(sender, indexPath) {
          var file = sender.object(indexPath).fname.text
          $share.sheet([file, $file.read("downloads/" + file)])
        }
      }],
      data: DOWNLOADS_FILE.map(function(d) {
        var file = $file.read("downloads/" + d)
        return {
          fname: {
            text: d
          },
          type: {
            text: $l10n("type") + file.info.mimeType
          },
          size: {
            text: $l10n("size") + file.info.size.bytes()
          }
        }
      })
    },
    layout: $layout.fill,
    events: {
      didSelect: function(sender, indexPath) {
        $quicklook.open({
          data: $file.read("downloads/" + sender.object(indexPath).fname.text)
        })
      }
    },
    views: [{
      type: "label",
      props: {
        id: "no-downloads",
        lines: 0,
        align: $align.center,
        hidden: DOWNLOADS_FILE.length === 0 ? false : true,
        font: $font("bold", 18),
        textColor: $color("gray"),
        text: $l10n("no_downloads")
      },
      layout: $layout.center
    }]
  }

  // Setting View Object
  setting = {
    type: "list",
    props: {
      id: "setting",
      hidden: true,
      showsVerticalIndicator: false,
      data: [{
        title: $l10n("setting_keys"),
        rows: [{
          type: "views",
          layout: $layout.fill,
          views: [{
              type: "label",
              props: {
                text: "SK",
                textColor: $color("darkGray")
              },
              layout: function(make) {
                make.centerY.equalTo()
                make.width.equalTo(100)
                make.left.inset(15)
              }
            },
            {
              type: "input",
              props: {
                id: "SK",
                secure: true,
                text: SETTING_FILE[0][0],
                textColor: $color("darkGray")
              },
              layout: function(make, view) {
                var pre = view.prev
                make.centerY.equalTo()
                make.left.equalTo(pre.right)
                make.top.bottom.inset(5)
                make.right.inset(15)
              },
              events: {
                returned: function(sender) {
                  sender.blur()
                },
                didEndEditing: function(sender) {
                  var text = sender.text
                  if (!text.isKey()) {
                    $ui.error($l10n("error_key"))
                    return
                  }
                  saveSetting(0, 0, text)
                  if (SETTING_FILE[0][0] && SETTING_FILE[0][1]) {
                    getDefaultSetting()
                  }
                }
              }
            }
          ]
        },
        {
          type: "views",
          layout: $layout.fill,
          views: [{
              type: "label",
              props: {
                text: "AK",
                textColor: $color("darkGray")
              },
              layout: function(make) {
                make.centerY.equalTo()
                make.width.equalTo(100)
                make.left.inset(15)
              }
            },
            {
              type: "input",
              props: {
                id: "AK",
                secure: true,
                text: SETTING_FILE[0][1],
                textColor: $color("darkGray")
              },
              layout: function(make, view) {
                var pre = view.prev
                make.centerY.equalTo()
                make.left.equalTo(pre.right)
                make.top.bottom.inset(5)
                make.right.inset(15)
              },
              events: {
                returned: function(sender) {
                  sender.blur()
                },
                didEndEditing: function(sender) {
                  var text = sender.text
                  if (!text.isKey()) {
                    $ui.error($l10n("error_key"))
                    return
                  }
                  saveSetting(0, 1, text)
                  if (SETTING_FILE[0][0] && SETTING_FILE[0][1]) {
                    getDefaultSetting()
                  }
                }
              }
            }
          ]
        }]
      },
      {
        title: $l10n("setting_settings"),
        rows: [{
          setup: {
            text: $l10n("region")
          }
        },
        {
          setup: {
            text: $l10n("bucket")
          }
        },
        {
          setup: {
            text: $l10n("domain")
          }
        }]
      },
      {
        title: $l10n("setting_about"),
        rows: [{
          setup: {
            text: $l10n("website")
          }
        },
        {
          setup: {
            text: $l10n("tutorial")
          }
        }]
      }],
      template: {
        props: {
          accessoryType: 1
        },
        views: [{
            type: "label",
            props: {
              id: "setup",
              textColor: $color("darkGray")
            },
            layout: function(make, view) {
              make.centerY.equalTo(view.super)
              make.left.inset(15)
            }
          }
        ]
      },
      footer: {
        type: "view",
        props: {
          height: 50
        },
        views: [{
          type: "label",
          props: {
            text: $l10n("setting_footer") + $addin.current.version,
            lines: 0,
            font: $font(12),
            textColor: $color("#AAAAAA"),
            align: $align.center
          },
          layout: function(make) {
            make.left.top.right.inset(0)
          }
        }]
      }
    },
    layout: $layout.fill,
    events: {
      didSelect: function(view, indexPath) {
        activeSettingMenu(indexPath)
      }
    }
  }
}

function mainView() {
  $ui.render({
    views: [{
        type: "matrix",
        props: {
          id: "menu",
          itemHeight: 50,
          columns: 3,
          spacing: 0,
          scrollEnabled: false,
          selectable: false,
          //bgcolor: $rgb(247, 247, 247),
          template: [{
              // Button Image
              type: "image",
              props: {
                id: "menu_image",
                bgcolor: $color("clear")
              },
              layout: function(make, view) {
                make.centerX.equalTo(view.super)
                make.width.height.equalTo(25)
                make.top.inset(7)
              },
            },
            {
              type: "label",
              props: {
                id: "menu_label",
                font: $font(10),
                textColor: $color("lightGray")
              },
              layout: function(make, view) {
                var preView = view.prev
                make.centerX.equalTo(preView)
                make.top.equalTo(preView.bottom).offset(2)
              }
            }
          ],
          data: [{
              menu_image: {
                icon: $icon("019", $color("clear"), $size(72, 72)),
                tintColor: $color("tint")
              },
              menu_label: {
                text: $l10n("menu_home"),
                textColor: $color("tint")
              }
            },
            {
              menu_image: {
                icon: $icon("062", $color("clear"), $size(72, 72)),
                tintColor: $color("lightGray")
              },
              menu_label: {
                text: $l10n("menu_downloads")
              }
            },
            {
              menu_image: {
                icon: $icon("002", $color("clear"), $size(72, 72)),
                tintColor: $color("lightGray")
              },
              menu_label: {
                text: $l10n("menu_setting")
              }
            }
          ]
        },
        layout: function(make, view) {
          make.height.equalTo(TABBAR_HEIGHT)
          make.left.bottom.right.inset(0)
        },
        events: {
          didSelect: function(sender, indexPath) {
            activeMenu(indexPath.row)
          }
        }
      },
      {
        type: "canvas",
        layout: function(make, view) {
          var preView = view.prev
          make.top.equalTo(preView.top)
          make.height.equalTo(1)
          make.left.right.inset(0)
        },
        events: {
          draw: function(view, ctx) {
            var width = view.frame.width
            var scale = $device.info.screen.scale
            ctx.strokeColor = $color("gray")
            ctx.setLineWidth(1 / scale)
            ctx.moveToPoint(0, 0)
            ctx.addLineToPoint(width, 0)
            ctx.strokePath()
          }
        }
      },
      {
        type: "view",
        props: {
          id: "content"
        },
        layout: function(make) {
          var preView = $("menu")
          make.bottom.equalTo(preView.top)
          make.left.top.right.inset(0)
        },
        views: [home, downloads, setting]
      }
    ]
  })
}

function activeMenu(index) {
  const trans = ["home", "downloads", "setting"]
  var dstViewId = trans[index]
  var views = $("content").views
  for (var i in views) {
    if (views[i].hidden === false) {
      var viewId = trans[i]
      break
    }
  }
  if (dstViewId == viewId && $(viewId).data.length > 0) {
    $(viewId).scrollTo({
      indexPath: $indexPath(0, 0)
    })
  } else {
    for (var i = 0; i < 3; i++) {
      $("menu").cell($indexPath(0, i)).views[0].views[0].tintColor = index == i ? $color("tint") : $color("lightGray")
      $("menu").cell($indexPath(0, i)).views[0].views[1].textColor = index == i ? $color("tint") : $color("lightGray")
    }
    $(viewId).hidden = true
    $(dstViewId).hidden = false
  }
}

function activeSettingMenu(indexPath) {
  var section = indexPath.section
  var row = indexPath.row
  var data
  if (section == 0) {
    if (row == 0) {
      $("SK").secure = $("SK").secure ? false : true
    } else if (row == 1) {
      $("AK").secure = $("AK").secure ? false : true
    }
  } else if (section == 1) {
    if (row == 0) {
      region()
    } else if (row == 1) {
      actionBucket()
    } else if (row == 2) {
      actionDomain()
    }
  } else if (section == 2) {
    if (row == 0) {
      $safari.open({
        url: "https://www.ryannn.com"
      })
    } else if (row == 1) {
      if (LANGUAGE == "en") actionTutorial()
      else actionTutorialZH()
    }
  }
}

function saveSetting(section, row, value) {
  // Update Value
  SETTING_FILE[section][row] = value
  $file.write({
    data: $data({ string: JSON.stringify(SETTING_FILE) }),
    path: "Setting.conf"
  })
}

function showMenu(list, indexPath) {
  var file = list.object(indexPath).fname.text
  $ui.action({
    message: file,
    actions: [{
        title: $l10n("action_preview"),
        handler: function() {
          $safari.open({
            url: encodeURI(URL_SELF + file)
          })
        }
      },
      {
        title: $l10n("action_download"),
        handler: function() {
          actionDownload(file)
        }
      },
      {
        title: $l10n("action_copy"),
        handler: function() {
          $ui.toast($l10n("toast_copied"))
          $clipboard.text = encodeURI(URL_SELF + file)
        }
      }
    ]
  })
}

function showManage(list, indexPath) {
  var file = list.object(indexPath).fname.text
  $ui.action({
    title: file,
    message: $l10n("alert_message_action"),
    actions: [{
        title: $l10n("action_refresh"),
        handler: function() {
          actionRefresh(URL_SELF + file)
        }
      },
      {
        title: $l10n("action_rename"),
        handler: function() {
          $input.text({
            type: $kbType.default,
            text: file,
            handler: function(text) {
              if (text !== "" && file !== text) {
                actionRename(file, text)
              }
            }
          })
        }
      },
      {
        title: $l10n("action_delete"),
        style: "Destructive",
        handler: function() {
          $ui.alert({
            title: file,
            message: $l10n("alert_message_delete"),
            actions: [{
                title: $l10n("alert_button_cancel"),
                style: "Cancel"
              },
              {
                title: $l10n("alert_button_delete"),
                style: "Destructive",
                handler: function() {
                  actionDelete(file)
                  list.delete(indexPath)
                }
              }
            ]
          })
        }
      }
    ]
  })
}

function actionBucket() {
  var path = "/buckets"
  var token = authManageQiniu(path)
  var url = "http://rs.qiniu.com" + path
  var host = "rs.qbox.me"
  getQiniu(token, url, host, "bucket")
}

function actionDomain() {
  var path = "/v6/domain/list?tbl=" + SETTING_FILE[1][1]
  var token = authManageQiniu(path)
  var url = "http://rs.qiniu.com" + path
  var host = "api.qiniu.com"
  getQiniu(token, url, host, "domain")
}

function actionFetch(action = null) {
  var path = "/list?bucket=" + SETTING_FILE[1][1] + "&limit=30"
  var token = authManageQiniu(path)
  var url = "http://rs.qiniu.com" + path
  var host = "rsf.qbox.me"
  getQiniu(token, url, host, "list", true)
  $("footer").hidden = true
  if (action == "reload") {
    $("home").endRefreshing()
    $ui.toast($l10n("toast_reloaded"))
  } else if (action == "rename") {
    $ui.toast($l10n("toast_renamed"))
  }
}

function actionLoadMore(list) {
  $device.taptic(0)
  var marker = list.info
  if (typeof(marker) == "undefined") {
    $ui.loading(false)
    $("footer").hidden = false
    $ui.error($l10n("no_more_data"))
    return true
  }

  $("spinner").start()
  var path = "/list?bucket=" + SETTING_FILE[1][1] + "&marker=" + list.info + "&limit=30"
  var token = authManageQiniu(path)
  var url = "http://rs.qiniu.com" + path
  var host = "rsf.qbox.me"
  getQiniu(token, url, host, "list")
}

function actionRefresh(rawURL, action = $l10n("toast_refreshed")) {
  var host = "http://fusion.qiniuapi.com"
  var path = "/v2/tune/refresh"
  var body = {
    "urls": [rawURL]
  }

  var token = authManageQiniu(path)
  var url = host + path
  postQiniu(token, url, action, body)
}

function actionRename(beforeKey, afterKey) {
  var path = "/move/"
  var beforeEntry = $text.base64Encode(SETTING_FILE[1][1] + ":" + beforeKey)
  var afterEntry = $text.base64Encode(SETTING_FILE[1][1] + ":" + afterKey)
  var url = "http://rs.qiniu.com" + path + beforeEntry + "/" + afterEntry

  var token = authManageQiniu(path + beforeEntry + "/" + afterEntry)
  postQiniu(token, url, function(){actionFetch("rename")})
}

function actionDelete(fname) {
  var path = "/delete/"
  var key = fname
  var entry = $text.base64Encode(SETTING_FILE[1][1] + ":" + key)
  var url = "http://rs.qiniu.com" + path + entry

  var token = authManageQiniu(path + entry)
  postQiniu(token, url, $l10n("toast_deleted"))
}

function actionDownload(fname) {
  $ui.loading("Downloading")
  $http.download({
    url: encodeURI(URL_SELF + fname),
    handler: function(resp) {
      $ui.loading(false)
      var file = resp.data
      if (!$file.exists("downloads")) {
        $file.mkdir("downloads")
      }
      $file.write({
        data: file,
        path: "downloads/" + file.fileName
      })

      DOWNLOADS_FILE = $file.list("downloads").sort()
      $("downloads").data = DOWNLOADS_FILE.map(function(d) {
        var file = $file.read("downloads/" + d)
        return {
          fname: {
            text: d
          },
          type: {
            text: "Type: " + file.info.mimeType
          },
          size: {
            text: "Size: " + file.info.size.bytes()
          }
        }
      })
      $("no-downloads").hidden = true
      $ui.toast($l10n("toast_downloaded"))
    }
  })
}

function actionTutorial() {
  var text = "Tips\n- You should frist fill in the blanks of SK and AK.\n- Then Bucket and Domain will be set as default (The frist one), you may need to rechoose them on your own.\n- Carefully choose the Region which matches your bucket.\n- Upload file from Action Extension will replace the exist file without warning, do it at your own risk."

  // Views
  var hintView = $objc("BaseHintView").invoke("alloc.initWithText", text)
  var textView = hintView.invoke("subviews.objectAtIndex", 1).invoke("subviews.objectAtIndex", 1)

  // Attribute for text
  var string = $objc("NSMutableAttributedString").invoke("alloc.initWithString", text)
  string.invoke("addAttribute:value:range:", "NSFont", $font("bold", 26), $range(0, 4))
  string.invoke("setAlignment:range:", $align.center, $range(0, 4))

  string.invoke("addAttribute:value:range:", "NSFont", textView.invoke("font"), $range(4, string.invoke("length") - 4))
  string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("SK"), 2))
  string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("AK"), 2))
  string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("Bucket"), 6))
  string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("Domain"), 6))
  string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("Region"), 6))
  string.invoke("addAttribute:value:range:", "NSColor", $color("#DF565D"), $range(text.indexOf("- Upload"), text.length - text.indexOf("- Upload")))

  // Paragraph Style
  var para = $objc("NSMutableParagraphStyle").invoke("alloc.init")
  para.invoke("setParagraphSpacingBefore", 15)
  para.invoke("setAlignment", $align.justified)

  string.invoke("addAttribute:value:range:", "NSParagraphStyle", para, $range(4, string.invoke("length") - 4))

  // Setup
  textView.invoke("setAttributedText", string)

  // Show View
  hintView.invoke("show")
}

function actionTutorialZH() {
  var text = "提示\n- 先完成填写 SK 与 AK\n- 而后存储空间和空间域名将会设置为默认选项(第一个)，建议检查默认选项并自行重新选择\n- 根据所选空间仔细选择与存储空间相匹配的存储区域\n- 通过分享扩展上传文件将无条件覆盖同名文件，请自行承担风险谨慎操作"

  // Views
  var hintView = $objc("BaseHintView").invoke("alloc.initWithText", text)
  var textView = hintView.invoke("subviews.objectAtIndex", 1).invoke("subviews.objectAtIndex", 1)

  // Attribute for text
  var string = $objc("NSMutableAttributedString").invoke("alloc.initWithString", text)
  string.invoke("addAttribute:value:range:", "NSFont", $font("bold", 26), $range(0, 2))
  string.invoke("setAlignment:range:", $align.center, $range(0, 2))

  string.invoke("addAttribute:value:range:", "NSFont", textView.invoke("font"), $range(2, string.invoke("length") - 2))
  string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("SK"), 2))
  string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("AK"), 2))
  string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("存储空间"), 4))
  string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("空间域名"), 4))
  string.invoke("addAttribute:value:range:", "NSColor", $color("tint"), $range(text.indexOf("存储区域"), 4))
  string.invoke("addAttribute:value:range:", "NSColor", $color("#DF565D"), $range(text.indexOf("- 通过"), text.length - text.indexOf("- 通过")))

  // Paragraph Style
  var para = $objc("NSMutableParagraphStyle").invoke("alloc.init")
  para.invoke("setParagraphSpacingBefore", 15)
  para.invoke("setAlignment", $align.left)
  string.invoke("addAttribute:value:range:", "NSParagraphStyle", para, $range(2, string.invoke("length") - 2))

  // Setup
  textView.invoke("setAttributedText", string)
  
  // Show View
  hintView.invoke("show")
}

function authManageQiniu(path, body = "") {
  var signingStr = path + "\n" + body
  var sign = CryptoJS.HmacSHA1(signingStr, SETTING_FILE[0][0])
  var signEncoded = sign.toString(CryptoJS.enc.Base64).urlsafe()
  var token = SETTING_FILE[0][1] + ":" + signEncoded

  return token
}

function authUploadQiniu(fname) {
  var para = {
    "scope": SETTING_FILE[1][1] + ":" + fname,
    "deadline": Math.round(new Date().getTime() / 1000) + 1 * 3600
  }
  var policy = JSON.stringify(para)
  var policyEncoded = $text.base64Encode(policy).urlsafe()
  var sign = CryptoJS.HmacSHA1(policyEncoded, SETTING_FILE[0][0])
  var signEncoded = sign.toString(CryptoJS.enc.Base64).urlsafe()
  var token = SETTING_FILE[0][1] + ":" + signEncoded + ":" + policyEncoded

  return token
}

function getQiniu(token, url, host, action, refresh = false) {
  $ui.loading(true)
  $("home").endRefreshing()
  $http.get({
    url: url,
    header: {
      "Host": host,
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "QBox " + token
    },
    handler: function(resp) {
      $ui.loading(false)
      $("spinner").stop()
      var code = resp.response.statusCode
      if (200 === code) {
        var data = resp.data
        if (action == "list") {
          list(data, refresh)
          $("home").endFetchingMore()
        } else if (action == "bucket") {
          bucket(data)
        } else if (action == "domain") {
          domain(data)
        }
      } else {
        showError(code, resp.data.error)
      }
    }
  })
}

function postQiniu(token, url, action, body = null) {
  $http.post({
    url: url,
    header: {
      "Content-Type": "application/json",
      "Authorization": "QBox " + token
    },
    body: body,
    handler: function(resp) {
      var code = resp.response.statusCode
      if (200 === code) {
        if (typeof action === "function") {
          action()
        } else {
          $ui.toast(action)
        }
      } else {
        showError(code, resp.data.error)
      }
    }
  })
}

function uploadQiniu(token, file, fname) {
  $http.upload({
    url: URL_UP,
    form: {
      "key": fname,
      "token": token
    },
    files: [{
      "data": file,
      "name": "file",
      "filename": fname,
      "content-type": MIME[fname.extension()] ? MIME[fname.extension()] : file.mimeType
    }],
    handler: function(resp) {
      var code = resp.response.statusCode
      if (200 === code) {
        actionRefresh(URL_SELF + resp.data.key, function() {
          alertUploaded(fname)
        })
      } else {
        showError(code, resp.data.error)
      }
    }
  })
}

function alertUploaded(fname) {
  $ui.toast($l10n("toast_uploaded"))
  $ui.alert({
    title: fname,
    actions: [{
      title: $l10n("alert_button_close"),
      style: "Cancel",
      handler: function() {
        $context.close()
        $app.close()
      }
    },
    {
      title: $l10n("alert_button_copy"),
      handler: function() {
        $clipboard.text = encodeURI(URL_SELF + fname)
        $ui.toast($l10n("toast_copied"))
        $delay(2, function() {
          $context.close()
          $app.close()
        })
      }
    }]
  })
}

function getDefaultSetting() {
  var path = "/buckets"
  var token = authManageQiniu(path)
  var url = "http://rs.qiniu.com" + path
  var host = "rs.qbox.me"
  $ui.loading(true)
  $http.get({
    url: url,
    header: {
      "Host": host,
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "QBox " + token
    },
    handler: function(resp) {
      $ui.loading(false)
      var code = resp.response.statusCode
      if (200 === code) {
        var data = resp.data
        saveSetting(1, 1, data[0])
  
        var path = "/v6/domain/list?tbl=" + SETTING_FILE[1][1]
        var token = authManageQiniu(path)
        var url = "http://rs.qiniu.com" + path
        var host = "api.qiniu.com"
        $ui.loading(true)
        $http.get({
          url: url,
          header: {
            "Host": host,
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "QBox " + token
          },
          handler: function(resp) {
            $ui.loading(false)
            var code = resp.response.statusCode
            if (200 === code) {
              var data = resp.data
              saveSetting(1, 2, data[0])
              $ui.alert({
                title: $l10n("alert_title_default"),
                message: $l10n("alert_message_default"),
              })
            } else {
              showError(code, resp.data.error)
            }
          }
        })
      } else {
        showError(code, resp.data.error)
      }
    }
  })
}

function list(rawData, refreshed = false) {
  var list = $("home")
  var idx = list.data.length
  if (refreshed === true) {
    var data = []
    for (var d of rawData.items) {
      data.push({
        fname: {
          text: d.key
        },
        type: {
          text: $l10n("type") + d.mimeType
        },
        size: {
          text: $l10n("size") + d.fsize.bytes()
        }
      })
    }
    list.data = data
  } else if (refreshed === false) {
    for (var d of rawData.items) {
      list.insert({
        indexPath: $indexPath(0, idx),
        value: {
          fname: {
            text: d.key
          },
          type: {
            text: $l10n("type") + d.mimeType
          },
          size: {
            text: $l10n("size") + d.fsize.bytes()
          }
        }
      })
      idx++
    }
  }
  list.info = rawData.marker
}

function region() {
  $ui.push({
    props: {
      title: $l10n("region")
    },
    views: [{
      type: "list",
      props: {
        id: "list_region",
        rowHeight: 50,
        scrollEnabled: false,
        template: TEMPLATE_SETTING,
        data: REGION.map(function(d) {
          return {
            name: {
              text: d.title
            }
          }
        })
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath) {
          var cell = sender.cell(indexPath).runtimeValue()
          var selected = cell.invoke("accessoryType")
          if (selected === 0) {
            // Save Setting
            saveSetting(1, 0, REGION[indexPath.row].url)
          }
          $ui.pop()
        }
      }
    }]
  })

  $delay(0.1, function() {
    var list = $("list_region")
    for (var i in REGION) {
      $console.info(SETTING_FILE[1][0])
        $console.info(REGION[i].url)
      if (SETTING_FILE[1][0] === REGION[i].url) {
        list.cell($indexPath(0, i)).runtimeValue().invoke("setAccessoryType", 3)
        break
      }
    }
  })
}

function bucket(data) {
  $ui.push({
    props: {
      title: $l10n("bucket")
    },
    views: [{
      type: "list",
      props: {
        id: "list_bucket",
        rowHeight: 50,
        scrollEnabled: false,
        template: TEMPLATE_SETTING,
        data: data.map(function(d) {
          return {
            name: {
              text: d
            }
          }
        })
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath) {
          var cell = sender.cell(indexPath).runtimeValue()
          var selected = cell.invoke("accessoryType")
          if (selected === 0) {
            // Save Setting
            saveSetting(1, 1, data[indexPath.row])
          }
          $ui.pop()
        }
      }
    }]
  })

  $delay(0.1, function() {
    var list = $("list_bucket")
    for (var i in data) {
      if (SETTING_FILE[1][1] === data[i]) {
        list.cell($indexPath(0, i)).runtimeValue().invoke("setAccessoryType", 3)
        break
      }
    }
  })
}

function domain(data) {
  $ui.push({
    props: {
      title: $l10n("domain")
    },
    views: [{
      type: "list",
      props: {
        id: "list_domain",
        rowHeight: 50,
        scrollEnabled: false,
        template: TEMPLATE_SETTING,
        data: data.map(function(d) {
          return {
            name: {
              text: d
            }
          }
        })
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath) {
          var cell = sender.cell(indexPath).runtimeValue()
          var selected = cell.invoke("accessoryType")
          if (selected === 0) {
            // Save Setting
            saveSetting(1, 2, data[indexPath.row])
            URL_SELF = (SETTING_FILE[1][2].indexOf("bkt.clouddn.com") === -1 ? "https://" : "http://") + SETTING_FILE[1][2] + "/"
          }
          $ui.pop()
        }
      }
    }]
  })

  $delay(0.1, function() {
    var list = $("list_domain")
    for (var i in data) {
      if (SETTING_FILE[1][2] === data[i]) {
        list.cell($indexPath(0, i)).runtimeValue().invoke("setAccessoryType", 3)
        break
      }
    }
  })
}

function showError(code, err) {
  $ui.alert({
    title: $l10n("alert_title_error"),
    message: code.toString() + ": " + err,
  })
}

/* Main */
if (!SETTING_FILE[0][0] || !SETTING_FILE[0][1]) {
  generateMainViewObjects()
  mainView()
  $delay(0.1, function() {
    activeMenu(2)
  })
} else {
  if (!$context.data) {
    generateMainViewObjects()
    mainView()
    actionFetch()
  } else {
    var data = $context.data
    var fileName = data.fileName
    //.replace(/\s/g, "-")
    $input.text({
      text: fileName,
      handler: function(text) {
        var token = authUploadQiniu(text)
        uploadQiniu(token, data, text)
      }
    })
  }
}
