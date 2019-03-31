//改自钟大的Safari Extensions,建议关闭设置→Safari浏览器→阻止弹出式窗口以保证正常使用。
//Modified by coo11

if ($app.env != $env.safari) {
  $ui.error("请在 Safari Extension 下运行", 0.6);
  return;
}
var idArray = [];
var cacheItems = [];
var items = $context.safari.items;
$ui.menu({
  items: [
    "Copy Source",
    "Web Cache",
    "vConsole",
    "Eruda",
    "Clear Images",
    "List Images",
    "U.NU",
    "Google Translate",
    "Baidu Translate",
    "Page Edit",
    "Page Source",
    "Selected HTML",
    "Selected CSS",
    "Topography"
  ],
  handler: async function(title, idx) {
    if (idx == 0) {
      //      $safari.inject(fireBugLite);
      let url = $context.safari.items.location.href;
      let resp = await $http.get(url);
      $clipboard.text = resp.data;
      $ui.toast("网页源码已复制");
      //alert(resp.data)
      let textastic =
        "textastic://x-callback-url/new?name=" +
        encodeURI($context.safari.items.title) +
        ".html&text=";
      $app.openURL(textastic);
    } else if (idx == 1) {
        $ui.toast("链接提取中...")
        let link = $context.safari.items.location.href;
      
      let url = "https://2tool.top/kuaizhao.php?k=" + encodeURI(link);
      $http.get({
        url: url,
        handler: function(resp) {
          console.log(resp.data);
          let reg = /doLoadKz\('(.*?)',"(.*?)",\d\);/g;
          let result = resp.data.match(reg);
          console.log(result);
          result.map(getId);
          console.log(idArray);

          let id = [
            {
              id: idArray[0] + "&num=1",
              name: "百度"
            },
            {
              id: idArray[1] + "&num=2",
              name: "搜狗"
            },
            {
              id: idArray[2] + "&num=3",
              name: "360"
            },
            {
              id: idArray[3] + "&num=4",
              name: "Bing"
            },
            {
              id: idArray[4] + "&num=5",
              name: "Google"
            }
          ];

          id.map(doLoadKz);
          $delay(1.5, () => {
            $ui.clearToast();
            $ui.menu({
              items: cacheItems.map(function(item) {
                return item.name;
              }),
              handler: function(title, idx) {
                $app.openURL(cacheItems[idx].link);
              }
            });
          });
        }
      });
    } else if (idx == 2){
      $safari.inject(vConsole);
    } else if (idx == 3) {
      $safari.inject(eruda);
    } else if (idx == 4) {
      $safari.inject(clearImages);
    } else if (idx == 5) {
      $safari.inject(listAllImages);
    } else if (idx == 6) {
      $safari.inject(unu);
    } else if (idx == 7) {
      $safari.inject(googleTrans);
    } else if (idx == 8) {
      $safari.inject(baiduTrans);
    } else if (idx == 9) {
      $safari.inject(pageEdit);
    } else if (idx == 10) {
      $quicklook.open({ text: items.source });
    } else if (idx == 11) {
      $quicklook.open({ text: items.selection.html });
    } else if (idx == 12) {
      $quicklook.open({ text: JSON.stringify(items.selection.style, 2, null) });
    } else if (idx == 13) {
      $safari.inject(topography);
    }
  }
});

const fireBugLite =
  "(function(F, i, r, e, B, u, g) {if (F.getElementById(B)) return;g = F[i + 'NS'] &&F.documentElement.namespaceURI;g = g ? F[i + 'NS'](g, 'script') : F[i]('script');g[r]('id', B);g[r]('src', u);(F[e]('head')[0] || F[e]('body')[0]).appendChild(g);})(document, 'createElement', 'setAttribute', 'getElementsByTagName', 'FirebugLite', 'https://getfirebug.com/firebug-lite.js#startOpened')";

const vConsole =
  "var script = document.createElement('script');script.type = 'text/javascript';script.src = 'https://xteko.blob.core.windows.net/neo/vconsole-loader.js';document.body.appendChild(script)";

const eruda =
  "var script = document.createElement('script');script.type = 'text/javascript';script.src = 'https://xteko.blob.core.windows.net/neo/eruda-loader.js';document.body.appendChild(script);";

const clearImages =
  "var images = document.getElementsByTagName('img');while(images.length > 0) {images[0].parentNode.removeChild(images[0]);}";

const listAllImages =
  "outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images[i].src)==-1){outText+='<tr><td><img src='+document.images[i].src+'></td><td>'+document.images[i].height+'</td><td>'+document.images[i].width+'</td><td>'+document.images[i].src+'</td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write ('<table border=1 cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>'+outText+'</table>');imgWindow.document.close()}else{alert('No images!')}";

const pageEdit =
  "document.body.contentEditable=true; document.designMode=on;void 0";

const topography =
  "(function(){function crawl(e, r){if (e.nodeType!=1)return;var ch = e.firstChild;while (ch!=null){crawl(ch, r+1);ch= ch.nextSibling;}var c ='#'+r.toString()+r.toString()+r.toString(); if(r>9) c='#FCC';e.style.color='white';e.style.background='none';e.style.backgroundColor=c;e.style.borderColor=c;}crawl(document.getElementsByTagName('body')[0], 0);})()";

const googleTrans =
  "(function(){var t=((window.getSelection&&window.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var e=(document.charset||document.characterSet);if(t!=''){window.open('http://translate.google.cn/translate_t?hl=zh-CN#auto|zh-CN|'+t);}else{window.open('http://translate.google.cn/translate?u='+escape(location.href)+'&hl=zh-CN&ie='+e+'&sl=auto&tl=zh-CN');};})()";

const baiduTrans =
  "(function(){window.open('http://fanyi.baidu.com/transpage?query='+escape(document.location.href)+'&from=auto&to=zh&source=url&render=1')})()";

const unu =
  "(function(){var d=document,w=window,enc=encodeURIComponent,e=w.getSelection,k=d.getSelection,x=d.selection,s=(e?e():(k)?k():(x?x.createRange().text:0)),s2=((s.toString()=='')?s:enc(s)),f='https://u.nu/index.php',l=d.location,p='?url='+enc(l.href)+'&title='+enc(d.title)+'&keyword='+s2,u=f+p;try{throw('ozhismygod');}catch(z){a=function(){if(!w.open(u))l.href=u;};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else a();}void(0);})();";

function getId(preId) {
  let idReg = /doLoadKz\('(.*?)',/g;
  let id = idReg.exec(preId)[1];
  idArray.push(id);
}

async function doLoadKz(obj) {
  var preUrl = "https://2tool.top";
  var id = obj.id;
  var name = obj.name;
  var url = preUrl + "/kz.php?s=" + id;
  let resp = await $http.get(url);
  let result = $detector.link(resp.data);
  //  console.log(resp.data)
  //  console.log(result)
  if (result.length > 0) {
    cacheItems.push({
      name: name,
      link: result[0]
    });
  }
  //  console.log(items)
  //  $app.openURL(encodeURI(result))
}
