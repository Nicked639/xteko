function run(){
  $ui.menu({
  items:["拼图","Annotate+","Picsew"],
  handler:function(title,idx){
    if(idx == 0){
     run()
    }else if(idx == 1){
      $app.openURL("Annotate://")
    }else if(idx == 2){

      $app.openURL(encodeURI("shortcuts://run-shortcut?name=Picsew"))
      
    }
  }
})

}
module.exports = {
  run : run
}
