var airtable = require('scripts/airtable');
var apiUrl = "https://api.douban.com/v2/book/"

if (!$cache.get("apiKey")) {
  $input.text({
    type: $kbType.default,
    placeholder: "Input Api Key",
    handler: function(text) {
      $cache.set("apiKey", text) 
      $ui.alert($l10n("START"))
    }
  })
} else {
  if ($app.env !== $env.safari) {
    $ui.toast($l10n("LOAD"),10)
    let links = $detector.link($clipboard.text)
    if(links.length){
      if(!/\/(\d{5,8})\//g.test(links[0])) wrong();
      else getBook(links[0]);
    }else{
      $ui.toast("",.1)
      $ui.alert($l10n("START"))
    }
  }else {
    $ui.toast($l10n("LOAD"),10)
    let item = $safari.items
    if(!/\/(\d{5,8})\//g.test(item.baseURI)) wrong();
    else getBook(item.baseURI);
  }
}

function getBook(url){
    let id = /\/(\d{5,8})\//g.exec(url)[1]
    $http.get({
    url: apiUrl + id,
    handler: function(resp) {
      if (!resp.response) $ui.alert($l10n("DBERROR"))
      let data = resp.data
      let content = {
        "fields": {
          "Title": data.title,
          "Author": data.author.join(),
          "Translator": data.translator.join(),
          "Publish Time": data.pubdate,
          "Pages": data.pages,
          "Price": data.price,
          "Public Score": data.rating.average,
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
      $console.log(content)
      airtable.post(content)
    }
  })
}

function wrong(){
  $ui.toast("",.1)  
  $ui.alert($l10n("WRONG"))
  return
}

