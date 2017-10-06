/*
 Pushbullet
    支持从剪切板发送和接收 Push
    Send:
         TodayWidget:
                Clipboard
         Action Extension:
                File 📝
         Safari:
                Link 🔗
    Get:
         TodayWidget or in App:
                Note, Link 🔗, File 📝
    Delete:
         One or All
    
  by Nicked 
     https://t.me/nicked
*/

// 请将 Access Token 填写到下方""中
accesstoken = "";
// 请求超时设置
timeout = 3
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
    timeout: timeout,
    handler: function(resp) {
      toast(resp)
    }
  })
  // 从 Action Extension 运行上传文件
} else if ($context.data) {
  var file = $context.data
  $ui.toast("Setting URL...")
  $ui.loading("Loading...")
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
    timeout: timeout,
    handler: function(resp) {
      toast(resp)
      var upload_url = resp.data.upload_url
      var file_url = resp.data.file_url
      if (file_url.indexOf("pushbulletusercontent.com/") != -1) {
        $ui.toast("file_url SUCCEEDED 💡")
      } else {
        $ui.toast("file_url FAILED ❌")
        $app.close()
      }
      $ui.toast("File Uploading...")
      $ui.loading("Loading...")
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
            timeout: timeout,
            handler: function(resp) {
              toast(resp)
              $context.close()
            }
          })

        }

      })
    }
  })
} else {
  $ui.menu({
    items: ["Get 🔽", "Send 🔼", "Delete 🗑"],
    handler: function(title, idx) {
      if (idx == 0) {
        $ui.loading("Loading...")
        $http.request({
          method: "GET",
          url: "https://api.pushbullet.com/v2/pushes?active=true",
          header: {
            "Access-Token": accesstoken
          },
          timeout: timeout,
          handler: function(resp) {
            toast(resp)
            var push = resp.data.pushes
            if (push.length == 0) {
              $ui.alert("NO PUSHES ❌")
              $app.close()
            } else {
              $ui.menu({
                items: push.map(function(item) {
                  if (item.type == "note") {
                    if (item.body.indexOf("\n") >= 0) {
                      return item.body.trim().split("\n")[0] + "...(👀 Multi-Lines)"
                    } else {
                      return item.body
                    }
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
                    var title = "Link and Note Copied 📌"

                    selectResult(title, $clipboard.text, push[idx].url)

                  } else if (push[idx].type == "note") {
                    $clipboard.text = push[idx].body
                    var link = $detector.link(push[idx].body)
                    if (link.length == 1) {
                      var title = "Note Copied 📌"
                      var message = "Find 🔗: " + link
                      selectResult(title, message, link)

                    } else if (link.length > 1) {
                      $ui.toast("Note Copied 📌 Multi-Links Dectected 🔗")
                      $ui.menu({
                        items: link,
                        handler: function(title, idx) {
                          $clipboard.text = link[idx]
                          selectResult2("Link Copied 📌", link[idx])

                        }
                      })
                    } else {
                      $ui.toast("Copied 📌")
                    }

                  } else {
                    var title = "Pushbullet File 📝"

                    var url = push[idx].file_url
                    $clipboard.text = url
                    $ui.toast("File URL Copied 📌")

                    selectResult2(title, url)

                  }
                }

              })

            }

          }

        })

      } else if (idx == 1) {

        if ($clipboard.text == "") {
          $ui.alert("Clipboard is EMPTY ❌")
        } else {
          $ui.loading("Loading...")
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
            timeout: timeout,
            handler: function(resp) {

              toast(resp)
            }
          })

        }
      } else if (idx == 2) {
        $ui.alert({
          title: "Delete Confirm 🗑",
          message: "One Or All?",
          actions: [{
              title: "ONE",
              handler: function() {
                $ui.loading("Loading...")
                $http.request({
                  method: "GET",
                  url: "https://api.pushbullet.com/v2/pushes?active=true",
                  header: {
                    "Access-Token": accesstoken
                  },
                  timeout: timeout,
                  handler: function(resp) {
                    toast(resp)
                    var push = resp.data.pushes
                    if (push.length == 0) {
                      $ui.alert("NO PUSHES ❌")
                      $app.close()
                    } else {
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
                          var iden = push[idx].iden

                          $http.request({
                            method: "DELETE",
                            url: "https://api.pushbullet.com/v2/pushes/" + iden,
                            header: {
                              "Access-Token": accesstoken
                            },
                            timeout: timeout,
                            handler: function(resp) {
                              toast(resp)
                            }

                          })
                        }

                      })

                    }

                  }

                })
              }
            }, {
              title: "ALL",
              handler: function() {
                $ui.loading("Loading...")
                $http.request({
                  method: "DELETE",
                  url: "https://api.pushbullet.com/v2/pushes",
                  header: {
                    "Access-Token": accesstoken
                  },
                  timeout: timeout,
                  handler: function(resp) {
                    toast(resp)

                  }
                })

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
    }
  })

}

function toast(resp) {
  if (resp.response) {
    $ui.toast("Request Succeeded💡")
    $ui.loading(false)
  } else {
    $ui.toast("Request Timeout, Try Again Later ❌")
    $ui.loading(false)
    $app.close()
  }

}

function selectResult(title, message, url) {
  $ui.alert({
    title: title,
    message: message,
    actions: [{
        title: "Preview",
        handler: function() {
          $safari.open({
            url: url
          })

          /* $http.download({
            url: url,
            handler: function(resp) {
            $quicklook.open({ data: resp.data })
            }
          })*/
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

function selectResult2(title,url) {
  $ui.alert({
    title: title,
    message: url,
    actions: [{
      title: "Preview",
      handler: function() {
        $safari.open({
          url: url,

        })
      }
    }, {
      title: "Cancel",
      handler: function() {
        $app.close()
      }
    }]
  })
}