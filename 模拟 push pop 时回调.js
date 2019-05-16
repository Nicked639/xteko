$ui.render({
  props: {
    title: "",
    id:"view1"
  },
  views: [{
      type: "view",
      layout: $layout.fill
    },
    {
      type: "button",
      props: {
        id: "btn1",
        title: ">",
        bgcolor: $color("#2e5266"),
        titleColor: $color("white")
      },
      layout: function(t) {
        t.bottom.inset(30)
        t.right.inset(20)
        t.width.equalTo(65);
      },
      events: {
        tapped: function(t) {
          $ui.push({

            views: [{

                type: "text",
                props: {
                  text: "Hello, World!\n\nThis is a demo for Text View in Pin extension!\n\nCurrently we don't support attributed string in iOS.\n\nYou can try html! Looks pretty cool."
                },
                layout: $layout.fill

              },
              {
                type: "web",
                props: {
                  id: "web",
                  html: ""
                },
                frame: $rect(0, 0, 0, 0),
                events: {
                  didStart: function(sender, navigation) {
//                    $("view1").super.super.super.super.views[1].anything
//                    $ui.alert("pushed")
//                    $("btn1").super.super.super.super.views[1].anything
                    $ui.alert("poped")

                  }
                }
              },

            ]
          })
        }
      }

    },

  ]
})