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