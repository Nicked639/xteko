/**erots

Dougets by Neurogram modified by Nickilism

 - Medium widget only
 - Tap image to open movie of Douban app
 - Tap title to open movie web page
 

*/

const monthNames = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月'
];

const dayNames = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六'
];

const date = new Date();
const currentMonth = date.getMonth();
const currentDay = date.getDate();
const currentDayOfWeek = date.getDay();

const chineseWeekday = dayNames[currentDayOfWeek];

const chineseMonth = monthNames[currentMonth];
console.log(currentDay)

let resp = await $http.get({
    url: `https://frodo.douban.com/api/v2/calendar/today?apikey=0ac44ae016490db2204ce0a042db2916&date=${timefmt(new Date(), "yyyy-MM-dd")}&alt=json&_sig=tuOyn%2B2uZDBFGAFBLklc2GkuQk4%3D&_ts=1610703479`,
    header: {
          "Host": "frodo.douban.com",
        "Referer": "https://servicewechat.com/wx2f9b06c1de1ccfca/82/page-frame.html",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.2(0x18000223) NetType/WIFI Language/zh_CN"
    }
})

let movie_data = resp.data
console.log(resp.data)

$widget.setTimeline({
    render: ctx => {
        //$widget.family = 1
        const family = ctx.family;
        const width = $widget.displaySize.width
        const height = $widget.displaySize.height

        let poster_view = {
            type: "image",
            props: {
                uri: movie_data.comment.poster,
                resizable: true,
                scaledToFill: true,
                link: movie_data.subject.uri.replace("douban.com","v2")
            }
        }

        let medium_widget = {
            type: "zstack",
            props: {
                alignment: $widget.alignment.center
            },
            views: [
                poster_view,
                {
                    type: "color",
                    props: {
                        color: $color("gray"),
                        opacity: 0.2
                    }
                },
                {
                    type: "hstack",
                    props: {
                      alignment: $widget.horizontalAlignment.left,
                      spacing: 15
                    },
                    views: [
                    
                  
                {
                    type: "vstack",
                    props: {
                      alignment: $widget.horizontalAlignment.center,
                      spacing: 0,
                      frame: {
                                width: 70,
                                height: height
                                
                      },
                     offset: $point(10, -3)
                    },
                    views: [
                      spacerMaker(height * 48 / 155, 50),
                      {
                        type: "text",
                        props: {
                          text: ""+currentDay,
                          color:$color("white"),
                          font:$font("Helvetica-Light",53),
                          offset: $point(0, 2)
                        }
                      },
                      {
                        type: "text",
                        props: {
                          text: chineseMonth+"｜"+chineseWeekday,
                          color:$color("white"),
                          font:$font(9)
                        }
                      },
                      {
                        type: "text",
                        props: {
                          text: `${movie_data.subject.actors[0].name}`+" ",
                          color:$color("white"),
                          font:$font(9),
                          offset: $point(0, -2)
                        }
                      },
                    ]
                  },
                {
                    type: "vstack",
                    props: {
                        alignment: $widget.horizontalAlignment.leading,
                        spacing: 5,
                        frame: {
                            width: width - 100,
                            height: height
                        },
                        offset: $point(5, 0.5)
                    },
                    views: [
                        spacerMaker(height * 70 / 155, width - 90),
                        {
                            type: "hstack",
                            props: {
                                alignment: $widget.verticalAlignment.center,
                                spacing: 0
                            },
                            views: [
                                {
                                    type: "text",
                                    props: {
                                        text: `《${movie_data.subject.title}》`,
                                        link: movie_data.subject.url,
                                        font: $font("bold", 14.5),
                                        color: $color("white"),
                                        minimumScaleFactor: 0.5,
                                        lineLimit: 1
                                    }
                                },
                                {
                                    type: "zstack",
                                    props: {
                                        alignment: $widget.alignment.left,
                                        frame: {
                                            width: 60,
                                            height: 15,

                                        },
                                                                                    offset: $point(-7, 0)
                                    },
                                    views: [
                                        {
                                            type: "color",
                                            props: {
                                                color: $color("#FEAC2D"),
                                                cornerRadius: 7.5
                                            }
                                        },
                                        {
                                            type: "text",
                                            props: {
                                                text: `豆瓣评分 ${movie_data.subject.rating == null ? "无" : movie_data.subject.rating.value}`,
                                                font: $font("bold", 9),
                                                color: $color("black"),
                                                minimumScaleFactor: 1,
                                                lineLimit: 1
                                            }
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            type: "text",
                            props: {
                                text: `❝ ${movie_data.comment.content}`,
                                font: $font("bold", 12),
                                color: $color("white"),
                                minimumScaleFactor: 0.5,
                                lineLimit: 2,
                                offset: $point(0, -2)
                            }
                        }
                    ]
                }
               ]
              }
            ]
        }
        return family == 1 ? medium_widget : ""
    }
})

function spacerMaker(height, width) {
    return {
        type: "spacer",
        props: {
            frame: {
                width: width,
                height: height
            }
        }
    }
}

function timefmt(time, fmt) {
    var o = {
        "M+": time.getMonth() + 1,                 //月份 
        "d+": time.getDate(),                    //日 
        "h+": time.getHours(),                   //小时 
        "m+": time.getMinutes(),                 //分 
        "s+": time.getSeconds(),                 //秒 
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
        "S": time.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

