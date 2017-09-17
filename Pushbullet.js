/*
 Pushbullet
    支持从剪切板发送和接收 push
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

} else {

  $ui.menu({
    items: ["Get Push", "Send Push", "Delete"],
    handler: function(title, idx) {
      if (idx == 0) {
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
                      return mkd
                    }

                  } else {
                    var filename = item.file_url
                    return "📝:"+filename.substr(filename.lastIndexOf('/')+1)
                   
                  }
                }),
                handler: function(title, idx) {
                  if (push[idx].type == "link") {

                    $clipboard.text = "[" + push[idx].body + "]" + "(" + push[idx].url + ")"

                    $ui.alert({
                      title: "Link and Note Copied",
                      message: "[" + push[idx].body + "]" + "(" + push[idx].url + ")",
                      actions: [{
                          title: "Preview",
                          handler: function() {
                            $safari.open({
                              url: push[idx].url
                            })
                          }
                        },
                        {
                          title: "Copy URL",

                          handler: function() {
                            $clipboard.texr = push[idx].url
                          }
                        },
                        {
                          title: "Cancle",
                          handler: function() {
                            $app.close()
                          }
                        }
                      ]
                    })

                  } else if (push[idx].type == "note") {
                    $clipboard.text = push[idx].body
                    var link = $detector.link(push[idx].body)
                    if (link.length > 0) {
                      $ui.alert({
                        title: "Note Copied",
                        message: "Find 🔗: " + link,
                        actions: [{
                            title: "Preview",
                            handler: function() {
                              $safari.open({
                                url: link
                              })
                            }
                          },
                          {
                            title: "Copy URL",
                            handler: function() { $clipboard.text = link }
                          },
                          {
                            title: "Cancle",
                            handler: function() {
                              $app.close()
                            }
                          }
                        ]
                      })

                    }

                  } else {
                    $ui.alert({
                      title: "Pushbullet File",
                      message: "Preview Or Copy URL",
                      actions: [{
                          title: "Preview",
                          handler: function() {
                            $http.download({
                              url: push[idx].file_url,
                              handler: function(resp) {
                                $quicklook.open({ data: resp.data })
                              }
                            })

                          }
                        },
                        {
                          title: "Copy URL",
                          handler: function() { $clipboard.text = push[idx].file_url }
                        }
                      ]
                    })

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
            handler: function() {}
          }, {
            title: "Delete",
            handler: function() {
              $http.request({
                method: "DELETE",
                url: "https://api.pushbullet.com/v2/pushes",
                header: {
                  "Access-Token": apiKey
                },
                handler: function(resp) {
                  toast(resp)

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