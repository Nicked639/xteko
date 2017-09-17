/*
 Pushbullet
    支持从剪切板发送和接收 Push
    by Nicked
    */

// 请将 Api key 填写到下方""中
var apiKey = ""
var LIMIT = 20
// 从 safari 启动 send url
if ($context.safari) {
  url = $context.safari.items.location.href
  $http.request({
    method: "POST",
    url: "https://api.pushbullet.com/v2/pushes",
    header: {
      "Access-Token": apiKey
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
      "Access-Token": apiKey,
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
              "Access-Token": apiKey,
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
            "Access-Token": apiKey
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
              "Access-Token": apiKey
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
                  "Access-Token": apiKey
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