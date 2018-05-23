var airtable = require('scripts/airtable');
var apiUrl = "https://api.douban.com/v2/movie/subject/"

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
          "Original Title": data.original_title,
          "Year": data.year,
          "Director": data.directors.map(i=>i.name).join(),
          "Cast": data.casts.map(i=>i.name).join(),
          "Genre": data.genres.join(),
          "Country": data.countries.join(),
          "Douban Link": data.alt,
          "Aka": data.aka.join(),
          "Summary": data.summary,
          "Douban Rating":data.rating.average,
          "Subtype": data.subtype,
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