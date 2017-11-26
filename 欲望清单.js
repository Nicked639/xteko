const searchView = {
  type: 'view',
  props: {
    id: "searchView",
    bgcolor: $color("clear")
  },
  views: [{
    type: "input",
    props: {
      placeholder: "输入番号演员",
      id: "input",
      font: $font(13),
      clearsOnBeginEditing: false,
      bgcolor: $color("#f3f3f3"),
      radius: 8,
      stickyHeader: false
    },
    events:{
      returned: function(sender){
        if(sender.text){
           sender.blur()
           $("initialView").data = [];
           mode = "search";
           keyword = sender.text;
           page = 0;
           getInitial(mode, keyword);
           $("initialView").contentOffset = $point(0,0);
           
        }else{
          $("initialView").data = [];
          sender.blur()
          mode = "home"
          page = 0
          getInitial(mode)
          $("initialView").contentOffset = $point(0,0);
        }
      }
    },
    layout: function(make, view) {
      make.left.right.top.inset(5)
      make.height.equalTo(30)
    }
  }, {
    type: "matrix",
    props: {
      id: "initialView",
      itemHeight: 180,
      columns: 3,
      spacing: 1,
      square: false,
      bgcolor: $color("clear"),
      template: [{
        type: "image",
        props: {
          id: "initialCover",
        },
        layout: $layout.fill
      }, {
        type: "label",
        props: {
          id: "info",
          bgcolor: $rgba(0, 0, 0, 0.4),
          textColor: $color("white"),
          align: $align.center,
          font: $font(10),
          autoFontSize: true
        },
        layout: function(make) {
          make.left.right.inset(0)
          make.bottom.inset(0)
          make.height.equalTo(20)
        },
      }],
    },
    layout: function(make, view) {
      make.left.right.bottom.inset(5)
      make.top.equalTo($("input").bottom).offset(5)
    },
    events: {
      didReachBottom(sender) {
        $ui.loading = true
        sender.endFetchingMore();
        getInitial(mode,keyword);

      },
      didSelect(sender, indexPath, data) {
       // $ui.action(data.link)
      //  $ui.push(detailView)
                  $("initialView").contentOffset = $point(0,0);
      }
    }

  }],
  layout: function(make, view) {
    make.left.right.bottom.inset(0)
    make.top.equalTo($("menu").bottom)
  }

}

const detailView = {
  type: "view",
  props: {
    bgcolor: $color("red")
  },
  layout: function(make, view) {
    make.left.right.bottom.inset(0)
    make.top.equalTo($("menu").bottom)
  }

}

$ui.render({
  props: {
    title: "欲望清单"
  },
  views: [{
      type: "menu",
      props: {
        id: "menu",
        items: ["搜索", "收藏", "归档"]
      },
      layout: function(make) {
        make.top.left.right.inset(0)
        make.height.equalTo(35)
      },
      events: {
        changed(sender) {
          switch (sender.index) {
            case 0:
              $("searchView").hidden = false
              break;
            case 1:
              $("searchView").hidden = true
              break;
            case 2:
              $("searchView").hidden = true

          }
        }
      }
    },
    searchView,
  ]
})

function getInitial(mode, keyword) {
  page++
  if (mode == "home") {
    url = "https://avmo.club/cn/star/pmv/page/"
  } else if (mode == "search") {
    url = encodeURI("https://avmo.club/cn/search/" + keyword + "/page/")
  }
  $http.request({
    url: url + page,
    handler: function(resp) {
      if (resp.data.indexOf("404 Not Found") > -1) {
        $ui.toast("🙈 到底了", 0.1)
        return
      }
      $ui.loading = false
      var reg = /<a class="movie-box"[\s\S]*?<\/span>/g;
      var match = resp.data.match(reg)
      //$ui.action(match)
      var data = []
      match.map(function(i) {
        var link = /href="([\s\S]*?)(")/.exec(i)[1];
        var image = /<img src="([\s\S]*?)(")/.exec(i)[1];
        var title = /title="(.*?)(">)/.exec(i)[1];
        var code = /<br><date>(.*?)<\/date>/.exec(i)[1];
        var date = /\/\s<date>(.*?)<\/date><\/span>/.exec(i)[1];
        $("initialView").data = $("initialView").data.concat({
          title: title,
          link: link,
          initialCover: {
            src: image
          },
          info: {
            text: code + " | " + date
          }
        });

      })
    }
  })
}
page = 0
mode = "home"
getInitial(mode)