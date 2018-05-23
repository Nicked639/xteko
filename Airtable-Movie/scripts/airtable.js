function getAirtable(){
    $http.get({ 
        url: 'https://api.airtable.com/v0/appJJmTgbDFTEnJxz/Movies?maxRecords=3&view=Grid%20view',
        header: {"Authorization": "Bearer "+ $cache.get("apiKey")},
        handler: function(resp){
            var data = resp.data
            $console.log(data)
        }
    })
}

function postAirtable(datas){
    $ui.loading = true
    $http.post({
        url: 'https://api.airtable.com/v0/appJJmTgbDFTEnJxz/Movies',
        header: {
            "Authorization": "Bearer " + $cache.get("apiKey"),
        },
        body: datas,
        timeout:3,
        handler: function(resp){
            $ui.loading = false
            var data = resp.data
            $console.log(data)
            if(data.id)$ui.toast($l10n("SUCCEED"));
            else $ui.alert($l10n("ERROR"));
        }
    })
}

module.exports = {
  post: postAirtable,
  get: getAirtable
}