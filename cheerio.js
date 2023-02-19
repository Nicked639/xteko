const cheerio = require("cheerio");
const html =
`
<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="orange">Orange</li>
  <li class="pear">Pear</li>
</ul>
`;

var ht = await $http.get("https://m.xsnvshen.com/album/?p=1")

ht=ht.data

const $t = cheerio.load(ht, {
  xml: {
    normalizeWhitespace: true,
  }
});

//console.log($(".apple", "#fruits").text());
////=> Apple
//
//console.log($("ul .pear").attr("class"));
////=> pear
//
//console.log($("li[class=orange]").html());
////=> Orange

//console.log($.root().html());
//=> html
//console.log(ht)

//$("*") — selects all elements
//$("#first") — selects the element with id="first"
//$(".intro") — selects all elements with class="intro"
//$("div") — selects all <div> elements
//$("h2, div, p") — selects all <h2>, <div>, <p> elements
//$("li:first") — selects the first <li> element
//$("li:last") — selects the last <li> element
//$("li:even") — selects all even <li> elements
//$("li:odd") — selects all odd <li> elements
//$(":empty") — selects all elements that are empty
//$(":focus") — selects the element that currently has focus
//
let temp = [];
let menu = $t('.min-h-imgall_300').each(function(i, element) {
      let src = $t(element).find('img').attr('src');
      let href = $t(element).find('a').attr('href');
      let title = $t(element).find('a').attr('title');
      let num = $t(element).find('.num').text();
      console.log(title+" "+num+"张"+" "+src+" "+href);
      temp = temp.concat({
                            title: title,
                            detail: href,
                            interface: {
                              //            src: i[3]
                              source: {
                                url: src,
                                
                              }
                            },
                            
                          });
      
   });
   console.log(temp)