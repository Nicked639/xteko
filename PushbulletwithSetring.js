/*
 Pushbullet
    支持从剪切板发送和接收 Push
    Send:
         TodayWidget:
                     Note
         ActionExtension:
                     File, Link
    Get:
         TodayWidget or in App
    
  by Nicked 
     https://t.me/nicked
    */

// 请将 Access Token 填写到下方""中，或直接运行根据提示输入。

var accesstoken = ""
if ($file.exists("pushbullet.json")) {
  var file = $file.read("pushbullet.json"),
    json = JSON.parse(file.string),
    accesstoken = json.accesstoken
} else {
  if ($widget.running) {
    var message = {
      title: "缺少参数",
      message: "请进入 Main App 并运行此扩展以键入 API 参数。",
      actions: [{
          title: "前往 Main App",
          handler: function() {
            $app.openURL("pin://jslab")
          }
        },
        {
          title: "取消",
          handler: function() {
            $app.close()
          }
        }
      ]
    }
    $ui.alert(message)
  } else {
    // 弹出界面输入 access token
    $ui.render({
      props: {
        title: "Pushbullet"
      },
      views: [{
          type: "text",
          props: {
            id: "message",
            text: "\n\n\n与 Pushbullet 通信需要 Access Token(apikey)。Access Token 可以在账户的设置界面找到。Pushbullet 登录需要代理，登录后可直连。\n\n请注意，获得该密钥即获得账户的所有权限，请尽量保密。",
            //align: $align.center,
            font: $font(16),
            editable: 0
          },
          layout: function(make) {
          make.left.top.right.inset(5)
            make.height.equalTo(200)
          }
        },
        {
          type: "input",
          props: {
            id: "accesstoken",
            placeholder: "在此处粘贴 Access Token",
            align: $align.center,
            font: $font(15)
          },
          layout: function(make) {
            var preView = $("message")
            make.top.equalTo(preView.bottom).inset(100)
            make.left.right.inset(10)
            make.height.equalTo(30)
          }
        },
        {
          type: "button",
          props: {
            id: "submit",
            title: "提交",
            font: $font(15)
          },
          layout: function(make) {
            var preView = $("accesstoken")
            make.top.equalTo(preView.bottom).inset(10)
            make.left.right.inset(10)
            make.height.equalTo(30)
          },
          events: {
            tapped: function() {
              handleButtonSubmit()
            }
          }
        },
        {
          type: "button",
          props: {
            id: "register",
            title: "前往 pushbullet.com 创建 Access Token",
            font: $font(15)
          },
          layout: function(make) {
            var preView = $("submit")
            make.top.equalTo(preView.bottom).inset(10)
            make.left.right.inset(10)
            make.height.equalTo(30)
          },
          events: {
            tapped: function() {
              $app.openURL("https://www.pushbullet.com/#settings/account")
            }
          }
        },
        {
          type: "button",
          props: {
            id: "setting",
            title: "查看 Access Token 设置界面",
            font: $font(15)
          },
          layout: function(make) {
            var preView = $("register")
            make.top.equalTo(preView.bottom).inset(10)
            make.left.right.inset(10)
            make.height.equalTo(30)
          },
          events: {
            tapped: function() {
              $ui.preview({
                url: "http://telegra.ph/PushbulletAccessToken-09-17"
              })
            }
          }
        }
      ]
    })
  }
}

if (accesstoken) {

  var LIMIT = 20
  // 从 safari 启动 send url
  if ($context.safari) {
    url = $context.safari.items.location.href
    $http.request({
      method: "POST",
      url: "https://api.pushbullet.com/v2/pushes",
      header: {
        "Access-Token": accesstoken
      },
      body: {
        type: "note",
        body: url
      },
      handler: function(resp) {
        toast(resp)
      }
    })

  } else if ($context.data) {
    var file = $context.data
    $ui.toast("SETTING URL...")
    $ui.loading(true)
    file_name = file.fileName
    $http.request({
      method: "POST",
      url: "https://api.pushbullet.com/v2/upload-request",
      header: {
        "Access-Token": accesstoken,
      },
      body: {
        file_name: file_name
      },
      handler: function(resp) {
        var upload_url = resp.data.upload_url
        var file_url = resp.data.file_url
        if (file_url.indexOf("pushbulletusercontent.com/") != -1) {
          $ui.toast("file_url SUCCEED!")
        } else {
          $ui.toast("file_url FAILED!")
          $app.close()
        }
        $ui.toast("UPLOADING...")
        $http.request({
          method: "POST",
          url: upload_url,
          form: {
            file: file
          },
          handler: function(resp) {
            $http.request({
              method: "POST",
              url: "https://api.pushbullet.com/v2/pushes",
              header: {
                "Access-Token": accesstoken,
              },
              body: {
                type: "file",
                file_url: file_url,
                file_name: file_name,
              },
              handler: function(resp) {
                toast(resp)
                $ui.loading(false)
                $context.close()
              }
            })

          }

        })
      }
    })
  } else {

    $ui.menu({
      items: ["Get Push", "Send Push", "Delete"],
      handler: function(title, idx) {
        if (idx == 0) {
          $ui.loading(true)
          $http.request({
            method: "GET",
            url: "https://api.pushbullet.com/v2/pushes?active=true&limit=" + LIMIT,
            header: {
              "Access-Token": accesstoken
            },
            handler: function(resp) {
              if (resp.response.statusCode == 429) {
                toastdown("Too Many Requests")
              }
              if (resp.response.statusCode > 500) {
                toastdown("Server Error")
              }
              var push = resp.data.pushes
              if (push.length == 0) {
                $ui.alert("NO PUSHES!")
                $app.close()
              } else {
                $ui.loading(false)
                $ui.menu({
                  items: push.map(function(item) {
                    if (item.type == "note") {
                      return item.body
                    } else if (item.type == "link") {
                      mkd = "[" + item.body + "]" + "(" + item.url + ")"
                      if (item.title) {
                        return "🔗:" + item.title
                      } else {
                        return "🔗:" + mkd
                      }

                    } else {
                      var filename = item.file_url
                      return "📝:" + filename.substr(filename.lastIndexOf('/') + 1)

                    }
                  }),
                  handler: function(title, idx) {
                    if (push[idx].type == "link") {

                      $clipboard.text = "[" + push[idx].body + "]" + "(" + push[idx].url + ")"
                      var title = "Link and Note Copied"

                      selectResult(title, $clipboard.text, push[idx].url)

                    } else if (push[idx].type == "note") {
                      $clipboard.text = push[idx].body
                      var link = $detector.link(push[idx].body)
                      if (link.length == 1) {
                        var title = "Note Copied"
                        var message = "Find 🔗: " + link
                        selectResult(title, message, link)

                      } else if (link.length > 1) {
                        $ui.toast("Links Dectected")
                        $ui.menu({
                          items: link,
                          handler: function(title, idx) {
                            $clipboard.text = link[idx]
                            var title = "Copied"
                            selectResult(title, link[idx], link[idx])
                          }
                        })
                      } else {
                        $ui.toast("Copied")
                      }

                    } else {
                      var title = "Pushbullet File"
                      var message = "Preview Or Copy URL"
                      var url = push[idx].file_url

                      selectResult(title, message, url, quicklook = 1)

                    }
                  }

                })

              }

            }

          })

        } else if (idx == 1) {

          if ($clipboard.text == "") {
            $ui.alert("Clipboard is empty")
          } else {
            $ui.loading(true)
            $http.request({
              method: "POST",
              url: "https://api.pushbullet.com/v2/pushes",
              header: {
                "Access-Token": accesstoken
              },
              body: {
                type: "note",
                body: $clipboard.text
              },
              handler: function(resp) {
                $ui.loading(false)
                toast(resp)
              }
            })

          }
        } else if (idx == 2) {
          $ui.alert({
            title: "Delete Conform",
            message: "Are you sure to delete ALL pushes?",
            actions: [{
              title: "Cancel",
              style: "Cancel",
              handler: function() { $app.close() }
            }, {
              title: "Delete",
              handler: function() {
                $ui.loading(true)
                $http.request({
                  method: "DELETE",
                  url: "https://api.pushbullet.com/v2/pushes",
                  header: {
                    "Access-Token": accesstoken
                  },
                  handler: function(resp) {
                    toast(resp)
                    $ui.loading(false)

                  }
                })

              }
            }]
          })

        }
      }
    })

  }

}

function toast(resp) {
  if (resp.response.statusCode == 200) {
    $ui.toast("SUCCEED")
  } else {
    $ui.toast("FAILED")
  }

}

function toastdown(title) {
  $ui.alert({
    title: title,
    message: "Try Again Later",
    actions: [{
      title: "OK",
      handler: function() {
        $app.close()
      }
    }]
  })
}

function selectResult(title, message, url, quicklook = 0) {
  $ui.alert({
    title: title,
    message: message,
    actions: [{
        title: "Preview",
        handler: function() {
          if (quicklook == 0) {
            $safari.open({
              url: url
            })
          } else {
            $ui.loading(true)
            $http.download({
              url: url,
              handler: function(resp) {
                $ui.loading(false)
                $quicklook.open({ data: resp.data })
              }
            })

          }

        }
      },
      {
        title: "Copy URL",

        handler: function() {
          $clipboard.text = url
        }
      },
      {
        title: "Cancel",
        handler: function() {
          $app.close()
        }
      }
    ]
  })
}

function handleButtonSubmit() {
  var accesstoken = $("accesstoken").text
  if (accesstoken == '') {
    $ui.toast("请输入 Access Token.")
  } else {
    $ui.loading(true)
    $http.request({
      method: "GET",
      url: "https://api.pushbullet.com/v2/pushes?active=true",
      header: {
        "Access-Token": accesstoken
      },
      handler: function(resp) {

        $ui.loading(false)
        if (resp.response.statusCode == 200) {
          $ui.toast("验证成功")
          $("message").text = "\n\n\n\nAPI Access Token 验证成功\n\n已为您保存相关参数, 现可正常使用 Widget 功能."
          $file.write({
            data: $data({
              string: '{"accesstoken": "' + accesstoken + '"}'
            }),
            path: "pushbullet.json"
          })
          $("accesstoken").blur()
        } else {
          $("accesstoken").text = ""
          $ui.toast("Access Token 有误, 请重新尝试.")
          $("accesstoken").focus()
        }
      }
    })
  }
}