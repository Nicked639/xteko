
//var airtable = require('scripts/airtable');
function run(){
  $widget.height = 400
if (!$cache.get("apiKey")) {
  $input.text({
    type: $kbType.default,
    placeholder: "Input Api Key",
    handler: function(text) {
      $cache.set("apiKey", text) 
      $ui.alert($l10n("START"))
    }
  })
  return
}else{
  var keyword = $clipboard.text 
  $ui.alert({
    title: "在豆瓣中搜索",
    message: keyword,
    actions: [
      {
              title: "输入",
              handler: async function() {
               let k = await $input.text()
               $clipboard.text = k
               doubanUI(k)
              }
            },
      {
        title: "确定",
        disabled: false, // Optional
        handler: function() {
          let k = keyword
          doubanUI(k)
        }
      },
      
    ]
  })
  
}
}
function doubanUI(keyword){
  $widget.height = 350
$ui.render({
    props: {
        title: keyword,
        
    },
    views: [{
        type: "web",
        props: {
            url: "https://m.douban.com/search/?query=" + $text.URLEncode(keyword),
            id:"douban",
//            toolbar: 1
        },
        layout: $layout.fill,
        events: {
            didFinish: function (sender, navigation) {
                var webUrl = $("douban").url.match(/\/subject\/\d+/)
//                alert(webUrl)
//                alert($("douban").url)
                $("love").hidden = webUrl ? false : true
            }
        }
    }, {
        type: "button",
        props: {
            icon: $icon("061", $color("red"), $size(20, 20)),
            bgcolor: $color("clear"),
            hidden: true,
            id:"love"
        },
        layout: function (make, view) {
            make.right.inset(53)
            make.top.inset(14)
        },
        events: {
            tapped: function (sender) {
              $device.taptic(2)
                var doubanUrl = $("douban").url
                  $ui.toast($l10n("LOAD"),10)
                    
                    if(!/\/(\d{5,8})\//g.test(doubanUrl)) wrong();
                    else postData(doubanUrl);
                
                
            }
        }
    },
    createScrollButtonView()
    ]
});

}
function postData(url){
  var id = /\/(\d{5,8})\//g.exec(url)[1]
  console.info(id)
  if(/.*movie.*/.test(url)){            //获取 type
    data = airtable.postMovieData(url,id)
  } else{
//    $ui.menu({
//      items: ["有页码和装订","简略"],
//      handler: function(title, idx) {
//        if(idx==0) data = airtable.postBookData2(id)
//        else data = airtable.postBookData3(id)
//      }
//    });
    data = postBookData(url,id)
    
  }
  
}

function wrong(){
  $ui.toast("",.1)  
  $ui.error($l10n("WRONG"))
  return
}

function createScrollButtonView(){
  let views =  [{
      type: "button",
      props: {
        src:"assets/arrowUp.png",
        font: $font(34),
        bgcolor: $color("clear"),
        id: "scrollUp"
      },
      layout: function(make,view){
        make.right.inset(9)
        make.height.equalTo(30)
        make.width.equalTo(30)
        make.bottom.inset(170)
      },
      events: {
        tapped: function(sender){
          if(scrollFlag >0){
            scrollFlag--;
            $cache.set("scrollFlag",scrollFlag)
                       let distance = scrollFlag*30
                       $("douban").scrollView.contentOffset = $point(0, distance);
          }else{
            $ui.error("已经到头",0.3)
          }
           
        },
      }
    },{
      type: "button",
      props: {
//        icon: $icon("24", $color("darkText"), $size(18, 18)),
        font: $font(34),
        src:"assets/arrowDown.png",
        bgcolor: $color("clear"),
        id: "scrollDown"
      },
      layout: function(make,view){
        make.right.inset(9)
        make.height.equalTo(30) 
        make.width.equalTo(30)
        make.bottom.inset(105)
      },
      events: {
        tapped: function(sender){
           
           scrollFlag++;
            $cache.set("scrollFlag",scrollFlag)
           let distance = scrollFlag*30
           $("douban").scrollView.contentOffset = $point(0, distance);
           
        },
      }
    }]
    return {
      type:"view",
      props:{
        bgcolor:$color("clear")
      },
      layout: function(make,view){
        make.top.bottom.inset(30)
        make.width.equalTo(30)
        make.right.inset(0)
      },
      views:views
    }
}

var dbapikey = "?apikey=0df993c66c0c636e29ecbb5344252a4a"

function getAirtable(){
    $http.get({ 
        url: 'https://api.airtable.com/v0/appJJmTgbDFTEnJxz/Books?maxRecords=3&view=Grid%20view',
        header: {"Authorization": "Bearer "+$cache.get("apiKey")},
        handler: function(resp){
            var data = resp.data
            $console.log(data)
        }
    })
}

function postAirtable(datas,type){
    $ui.loading = true
    $http.post({
        url: 'https://api.airtable.com/v0/appJJmTgbDFTEnJxz/' + type + 's',
        header: {
            "Authorization": "Bearer "+$cache.get("apiKey"),
        },
        body: datas,
        timeout:3,
        handler: function(resp){
            $ui.loading = false
            var data = resp.data
            $console.log(data)
            if(data.id){
              $ui.toast($l10n("SUCCEED"));
//              $app.close()
            }
            else $ui.alert($l10n("ERROR"));
        }
    })
}

function postMovieData(url, id){
    let apiUrl = "https://api.douban.com/v2/movie/subject/"
    $http.get({
        url: apiUrl + id + dbapikey,
        handler: function(resp) {
            if (!resp.response) $ui.error($l10n("DBERROR"))
            let data = resp.data
            console.log(data)
            let content = {
            "fields": {
                "Title": data.title,
                "Original Title": data.original_title,
                "Year": data.year,
                "Director": data.directors.map(i=>i.name).join(", "),
                "Cast": data.casts.map(i=>i.name).join(", "),
                "Genre": data.genres.join(", "),
                "Country": data.countries.join(", "),
                "Douban Link": data.alt,
                "Aka": data.aka.join(", "),
                "Summary": data.summary,
                "Douban Rating":data.rating.average,
                "Subtype": data.subtype,
                "Cover": [{
                "url": data.images.large
                }]
            }
            }
            $console.log(content)
//            alert(content)
            postAirtable(content,"Movie")
        }
        })
}

function postBookData(url, id){
    let apiUrl = "https://api.douban.com/v2/book/"
    $http.get({
        url: apiUrl + id + dbapikey,
        handler: function(resp) {
          if (!resp.response) $ui.error($l10n("DBERROR"))
          let data = resp.data
          console.log(data)
          let content = {
            "fields": {
              "Title": data.title,
              "Author": data.author.join(", "),
              "Translator": data.translator.join(", "),
              "Publish Time": data.pubdate,
              "Pages": data.pages,
              "Price": data.price,
              "Douban Rating": data.rating.average,
              //        "My Score": "",
              "Read": false,
              "Douban Link": data.alt,
              "Sub Title": data.subtitle,
              "Publisher": data.publisher,
              "Author Intro": data.author_intro,
              "Summary": data.summary,
              "Cover": [{
                "url": data.images.large
              }]
            }
          }
//          $console.log(content)
          postAirtable(content,"Book")
        }
      })
}


async function postBookData2(id){
  let url = "https://m.douban.com/book/subject/"+id
  //let url = "https://m.douban.com/book/subject/3266609"
  //let url = "https://m.douban.com/book/subject/2567698/"
  let resp = await $http.get(url)
  console.log(resp.data)
  let regTitle = /<h1 class="title">(.*)<\/h1>/g
  let title = regTitle.exec(resp.data)[1]
  let regCover = /img src="(.*)" alt=.*?class="cover">/g
  let cover = regCover.exec(resp.data)[1]
  console.log(cover)
  let regRate = /<strong>(\d?.?\d?)<\/strong>/g
  let rate = regRate.exec(resp.data)[1]
  
  console.log(rate)
  let regInfo = /<p class="meta">([\s\S]*?)<\/p>/g
  let info = regInfo.exec(resp.data)[1]
  console.log(info)
  let regTrans = /\n\n([\s\S]*?)\n\n/g
  let trans = regTrans.exec(info)[1].replace(/\ +/g,"")
  let regInfo2 = /(.*?)\/(.*?)\/(.*?)\/(.*?)\/(.*?)\n/g
  let info2 = regInfo2.exec(info)
  let publisher = info2[1].replace(/\ +/g,"")
  let page = info2[2].replace(/\ +/g,"")
  let price = info2[4].replace(/\ +/g,"")
  let time = info2[5].replace(/\ +/g,"")
  console.log(info)
  if(info.indexOf("a href")>-1){
    let regAuthor = /a href="\/book\/author\/(\d{5,8})" title="([\s\S]*)?" class="author"/g
    let a = regAuthor.exec(info)
    
    var author = a[2]
    var authorID = a[1]
  }else{
    var regAuthor = /([\s\S]*)?\//g
    var author = regAuthor.exec(info)
  }
  if(typeof(author)=="object") {
    author = trans
    trans = ""
  }
  console.log(author)
  let regSummary = /<section class="subject-intro">[\s\S]*?<p data-clamp="3">([\s\S]*?)<\/p>/g
  let summary = regSummary.exec(resp.data)[1]
  //if(summary.indexOf("&quot;")>-1) summary.replace("&quot;","\"")
  console.log(summary)
  if(authorID){
    let urlAuthor = "https://m.douban.com/book/author/"+authorID
    let resp2 = await $http.get(urlAuthor)
    let regIntro = /<section class="author-intro">[\s\S]*?<p data-clamp="3">([\s\S]*?)<\/p>/g
    var authorIntro = ""
    var s = regIntro.exec(resp2.data)
    if(s) authorIntro = s[1]
  }
  console.log(authorIntro)
  let content = {
              "fields": {
                "Title": title,
                "Author": author,
                "Translator": trans,
                "Publish Time": time,
                "Pages": page,
                "Price": price,
                "Douban Rating": rate,
                //        "My Score": "",
                "Read": false,
                "Douban Link": "https://book.douban.com/subject/"+id,
               // "Sub Title": data.subtitle,
                "Publisher": publisher,
                "Author Intro": authorIntro,
                "Summary": summary,
                "Cover": [{
                  "url": cover
                }]
              }
            }
            $console.log(content)
            postAirtable(content,"Book")
}

async function postBookData3(id){
  let url = "https://m.douban.com/book/subject/"+id
  //let url = "https://m.douban.com/book/subject/3266609"
  //let url = "https://m.douban.com/book/subject/2567698/"
  let resp = await $http.get(url)
  let regTitle = /<h1 class="title">(.*)<\/h1>/g
  let title = regTitle.exec(resp.data)[1]
  let regCover = /img src="(.*)" alt=.*?class="cover">/g
  let cover = regCover.exec(resp.data)[1]
  let regRate = /<strong>(.*)<\/strong>[\s\S]*?<span>[\s\S]*?评价<\/span>/g
  let rate = regRate.exec(resp.data)[1]
  let regInfo = /<p class="meta">([\s\S]*?)<\/p>/g
  let info = regInfo.exec(resp.data)[1]
  let regTrans = /\n\n([\s\S]*?)\n\n/g
  let trans = regTrans.exec(info)[1].replace(/\ +/g,"")
  console.log(info)
  if(info.indexOf("a href")>-1){
    let regAuthor = /a href="\/book\/author\/(\d{5,8})" title="([\s\S]*)?" class="author"/g
    let a = regAuthor.exec(info)
    
    var author = a[2]
    var authorID = a[1]
  }else{
    var regAuthor = /([\s\S]*)?\//g
    var author = regAuthor.exec(info)
  }
  if(typeof(author)=="object") {
    author = trans
    trans = ""
  }
  console.log(author)
  let regSummary = /<section class="subject-intro">[\s\S]*?<p data-clamp="3">([\s\S]*?)<\/p>/g
  let summary = regSummary.exec(resp.data)[1]
  //if(summary.indexOf("&quot;")>-1) summary.replace("&quot;","\"")
  console.log(summary)
  if(authorID){
    let urlAuthor = "https://m.douban.com/book/author/"+authorID
    let resp2 = await $http.get(urlAuthor)
    let regIntro = /<section class="author-intro">[\s\S]*?<p data-clamp="3">([\s\S]*?)<\/p>/g
    var authorIntro = ""
    var s = regIntro.exec(resp2.data)
    if(s) authorIntro = s[1]
  }
  console.log(authorIntro)
  let content = {
              "fields": {
                "Title": title,
                "Author": author,
                "Translator": trans,
                "Publish Time": "",
                "Pages": "",
                "Price": "",
                "Douban Rating": rate,
                //        "My Score": "",
                "Read": false,
                "Douban Link": "https://book.douban.com/subject/"+id,
               // "Sub Title": data.subtitle,
                "Publisher": "",
                "Author Intro": authorIntro,
                "Summary": summary,
                "Cover": [{
                  "url": cover
                }]
              }
            }
            $console.log(content)
            postAirtable(content,"Book")
}

module.exports={
  run:run
}
//module.exports = {
//  post: postAirtable,
//  get: getAirtable,
//  postMovieData:postMovieData,
//  postBookData:postBookData,
//  postBookData2:postBookData2,
//  postBookData3:postBookData3
//}

