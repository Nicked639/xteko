var airtable = require('scripts/airtable');

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
      else postData(links[0]);
    }else{
      $ui.toast("",.1)
      $ui.alert($l10n("START"))
    }
  }else {
    $ui.toast($l10n("LOAD"),10)
    let item = $safari.items
    if(!/\/(\d{5,8})\//g.test(item.baseURI)) wrong();
    else postData(item.baseURI);
  }
}

function postData(url){
  let id = /\/(\d{5,8})\//g.exec(url)[1]
  if(/.*movie.*/.test(url)){            //获取 type
    data = airtable.postMovieData(url,id)
  } else{
    data = airtable.postBookData(url,id)
  }
}

function wrong(){
  $ui.toast("",.1)  
  $ui.alert($l10n("WRONG"))
  return
}

