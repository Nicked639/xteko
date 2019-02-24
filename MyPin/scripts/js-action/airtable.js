var test = "https://m.douban.com/book/subject/26628811/";
function run(){
api = "";
$ui.toast("载入中..", 10);
let links = $detector.link($clipboard.text);
if (links.length > 0) {
  if (!/\/(\d{5,8})\?/g.test(links[0])) wrong();
  else postData(links[0]);
} else {
  $ui.toast("", 0.1);
  $ui.error("请复制链接");
}

function postData(url) {
  let id = /\/(\d{5,8})\?/g.exec(url)[1];
  if (/.*movie.*/.test(url)) {
    //获取 type
    data = postMovieData(url, id);
  } else {
    data = postBookData(url, id);
  }
}
}
function wrong() {
  $ui.toast("", 0.1);
  $ui.error("未检测到 ID");
  return;
}

function getAirtable() {
  $http.get({
    url:
      "https://api.airtable.com/v0/appJJmTgbDFTEnJxz/Books?maxRecords=3&view=Grid%20view",
    header: { "Authorization": "Bearer " + api },
    handler: function(resp) {
      var data = resp.data;
      $console.log(data);
    }
  });
}

function postAirtable(datas, type) {
  $ui.loading = true;
  $http.post({
    url: "https://api.airtable.com/v0/appJJmTgbDFTEnJxz/" + type + "s",
    header: {
      "Authorization": "Bearer " + api
    },
    body: datas,
    timeout: 3,
    handler: function(resp) {
      $ui.loading = false;
      var data = resp.data;
      $console.log(data);
      if (data.id) $ui.toast("成功！");
      else $ui.alert($l10n("ERROR"));
    }
  });
}

function postMovieData(url, id) {
  let apiUrl = "https://api.douban.com/v2/movie/subject/";
  $http.get({
    url: apiUrl + id,
    handler: function(resp) {
      if (!resp.response) $ui.error($l10n("DBERROR"));
      let data = resp.data;
      let content = {
        "fields": {
          "Title": data.title,
          "Original Title": data.original_title,
          "Year": data.year,
          "Director": data.directors.map(i => i.name).join(", "),
          "Cast": data.casts.map(i => i.name).join(", "),
          "Genre": data.genres.join(", "),
          "Country": data.countries.join(", "),
          "Douban Link": data.alt,
          "Aka": data.aka.join(", "),
          "Summary": data.summary,
          "Douban Rating": data.rating.average,
          "Subtype": data.subtype,
          "Cover": [
            {
              "url": data.images.large
            }
          ]
        }
      };
      $console.log(content);
      //            alert(content)
      postAirtable(content, "Movie");
    }
  });
}

function postBookData(url, id) {
  let apiUrl = "https://api.douban.com/v2/book/";
  $http.get({
    url: apiUrl + id,
    handler: function(resp) {
      if (!resp.response) $ui.error($l10n("DBERROR"));
      let data = resp.data;
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
          "Cover": [
            {
              "url": data.images.large
            }
          ]
        }
      };
      //          $console.log(content)
      postAirtable(content, "Book");
    }
  });
}
module.exports = {
  run: run
}
