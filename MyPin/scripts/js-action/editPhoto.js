function run(){
  $ui.menu({
  items:["编辑","Annotate+","Pico"],
  handler:function(title,idx){
    if(idx == 0){
     run()
    }else if(idx == 1){
      $app.openURL("Annotate://?do=LAST-PHOTO")
    }else if(idx == 2){
      $app.openURL("pico://last-photo")
    }
  },
})

}
module.exports = {
  run : run
}
