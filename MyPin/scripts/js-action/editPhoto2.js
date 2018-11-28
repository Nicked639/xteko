function run(){
  $ui.menu({
  items:["拼图","Annotate+","Picsew"],
  handler:function(title,idx){
    if(idx == 0){
     run()
    }else if(idx == 1){
      $app.openURL("Annotate://")
    }else if(idx == 2){
      $app.openURL("picsew://x-callback-url/scroll?in=recent&out=save&clean_status=yes&delete_source=yes&x-success=photos-redirect://")
    }
  }
})

}
module.exports = {
  run : run
}
