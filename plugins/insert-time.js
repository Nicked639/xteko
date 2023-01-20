const helper = require("scripts/helper");

let m = await $picker.date({
  props: {
    mode: 2
  }
});

let Week = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

var dateString =
    m.getFullYear() + "-" +
    ("0" + (m.getMonth()+1)).slice(-2) + "-" +
    ("0" + m.getDate()).slice(-2) + " " +
    Week[m.getDay()-1] + " " +
    ("0" + m.getHours()).slice(-2) + ":" +
    ("0" + m.getMinutes()).slice(-2) //+ ":" +
    //("0" + m.getUTCSeconds()).slice(-2);

helper.setText(dateString)
//helper.setText(m.toLocaleTimeString([], {
//  hour: "2-digit",
//  minute: "2-digit"
//}));