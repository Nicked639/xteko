// 请将 Api key 填写到下方""中
var apiKey = ""

var file = $context.data
if (file) {
  $ui.toast("SETTING...")
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
            }
          })

        }

      })
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