var airtable = require('scripts/airtable');
var apiUrl = "https://api.douban.com/v2/book/"

if (!$cache.get("apiKey")) {
  $input.text({
    type: $kbType.default,
    placeholder: "Input Api Key",
    handler: function(text) {
      $cache.set("apiKey", text)
      $ui.toast($l10n("LOAD"),10)
      main()
    }
  })
} else {
  if ($app.env !== $env.safari) $ui.alert($l10n("START"));
  else {
    $ui.toast($l10n("LOAD"),10)
    main()
  }
}

function main() {
  let item = $safari.items
  let id = /\/(\d{5,8})\//g.exec(item.baseURI)[1]
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