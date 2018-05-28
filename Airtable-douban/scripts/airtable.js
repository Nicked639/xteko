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
//            $console.log(data)
            if(data.id)$ui.toast($l10n("SUCCEED"));
            else $ui.alert($l10n("ERROR"));
        }
    })
}

function postMovieData(url, id){
    let apiUrl = "https://api.douban.com/v2/movie/subject/"
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
            postAirtable(content,"Movie")
        }
        })
}

function postBookData(url, id){
    let apiUrl = "https://api.douban.com/v2/book/"
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
          $console.log(content)
          postAirtable(content,"Book")
        }
      })
}

module.exports = {
  post: postAirtable,
  get: getAirtable,
  postMovieData:postMovieData,
  postBookData:postBookData
}