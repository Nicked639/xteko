var options = [
//  {
//    "name": "加引号",
//    "handler": addQuotationMarks
//  },
  {
    "name": "加分割线",
    "handler": addDividingline
  },
  {
    "name": "加箭头",
    "handler": addArrows
  }
]

function addQuotationMarks() {
  handleResult("“" + $clipboard.text + "”\n\n")
}

function addDividingline() {
  handleResult($clipboard.text + "\n--------------------------------\n")
}

function addArrows() {
  var lines = $clipboard.text.split("\n")
  var result = ""
  lines.forEach(function(item) {
    result = result + "> " + item + "\n"
  })
  handleResult(result + "\n")
}

function handleResult(text) {
  if ($app.env == $env.keyboard) {
    $keyboard.insert(text)
  } else {
    $clipboard.text = text
    $ui.toast("已复制")
  }
}

function run(){
  $ui.menu({
    items: options.map(i=>i.name),
    handler: function(title, idx) {
      options[idx].handler()
            $ui.toast("已复制",0.5)
            $("input").text = $clipboard.text
    },
    finished: function(cancelled) {

    }
  })
//$ui.render({
//  views: [
//    {
//      type: "list",
//      props: {
//        data: options.map(function(item) { return item.name })
//      },
//      layout: $layout.fill,
//      events: {
//        didSelect: function(sender, indexPath) {
//          options[indexPath.row].handler()
//        }
//      }
//    }
//  ]
//})
}
module.exports={
  run:run
}
