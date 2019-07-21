const engines = [
  {
      name: "Yandex",
      pattern: "https://www.yandex.com/images/touch/search?text=&img_url="
    },
    {
    name: "Google",
    pattern: "https://images.google.com/searchbyimage?image_url="
  },
//  {
//    name: "搜狗搜索",
//    pattern: "http://pic.sogou.com/ris?flag=1&nr=true&query="
//  }
]

function lastImage(){
  $photo.fetch({
    count:1,
    handler:function(image){
      if(image){
        searchImage(image[0].jpg(1.0))
      } else {
        $ui.loading(false)
      }
    }
  })
}

function pickImage() {
  $photo.pick({
    handler: function(resp) {
      var image = resp.image
      if (image) {
        searchImage(image.jpg(1.0))
      } else {
        $ui.loading(false)
      }
    }
  })
}

function searchImage(data) {
  $ui.loading(true)
  $ui.toast("图片上传中",10)
  $http.upload({
    url: "https://sm.ms/api/upload",
    files: [{"data": data, "name": "smfile"}],
    handler: function(resp) {
      $ui.clearToast()
      if(!resp.data.data){
              alert(resp.data.msg)
              return
            }
      var url = resp.data.data.url
      if (url) {
        $clipboard.text = url      
        showEngines(url)
//        $app.openURL("https://images.google.com/searchbyimage?image_url="+$text.URLEncode(url))
        $app.close()
      }
    }
  })
}

function showEngines(url) {
  $ui.menu({
    items: engines.map(function(item) { return item.name }),
    handler: function(title, idx) {
      var pattern = engines[idx].pattern
      if(idx==0)  $app.openURL(pattern + $text.URLEncode(url)+"&rpt=imageview&redircnt=")
      else  $app.openURL(pattern + $text.URLEncode(url))
      $app.close()
    }
  })
}
function run(){
  var inputData = $context.data
var inputLink = $context.link
var clipData = $clipboard.image
var clipLink = $clipboard.link

if (inputData) {
  searchImage(inputData)
} else if (inputLink) {
  showEngines(inputLink)
} else if (clipData || clipLink) {
  $ui.menu({
    items: ["剪贴板", "最后一张","选择图片"],
    handler: function(title, idx) {
      switch(idx){
        case 0: 
          if(clipLink){
//                    $app.openURL("https://images.google.com/searchbyimage?image_url="+$text.URLEncode(clipLink))
            showEngines(clipLink)
          } else{
            searchImage(clipData)
          }         
          break
        case 1:
          lastImage()
          break
        case 2:
          pickImage()
          break
      }
    }
  })
} else {
  $ui.menu({
    items:["最后一张","选择图片"],
    handler:function(title, idx){
      idx == 0 ? lastImage() : pickImage()
    }
  })
}

}
module.exports = {
  run:run
}
