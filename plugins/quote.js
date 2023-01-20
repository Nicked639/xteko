let helper = require("scripts/helper");
let text = helper.getText();

let options = [
  {
    "name": $l10n("ADD_ \" \""),
    "handler": addQuotationMarks
  },
  {
    "name": $l10n("ADD_ >"),
    "handler": addArrows
  },
  {
    "name": $l10n("ADD_「」"),
    "handler": addDividingline
  }
];

let {index} = await $ui.menu(options.map(option => option.name));
options[index].handler();

function addArrows() {
  var result = "";
  let lines = text.split("\n");
  lines.forEach(item => {
    result = result + "> " + item + "\n";
  });
  helper.setText(result + "\n");
}

function addQuotationMarks() {
  helper.setText("“" + text + "”\n");
}

function addDividingline() {
  helper.setText("「" + text + "」\n");
}