/*

用途：识别剪贴板文本中所有链接，并将其转换为短链接

bypassDomain：
定义忽略转换的完整域名

By Fndroid
*/


async function main() {
  let content = $clipboard.text

  let bypassDomain = ['t.me']

  let urls = $detector.link(content).filter(url => {
    return !bypassDomain.some(s => url.includes(`://${s}`))
  })
  
  let pms = urls.map(url => {
    return shorten(url)
  })
  console.log("pms:"+pms)
  let shorts = await Promise.all(pms)
  console.log("shorts:"+shorts)
  let result = urls.reduce((acc, cur, curIdx) => {
    return acc.replace(cur, shorts[curIdx])
  }, content)
  
  $ui.alert({
    title: `转换了${urls.length}个链接`,
    message: result,
    actions: [{
      title: 'Copy',
      handler: () => {
        $clipboard.text = result
      }
    }, {
      title: 'Cancel'
    }]
  })
}

await main()

async function shorten(url) {
  let short = url
  try {
    short = await $http.shorten(url)
  } catch(e) {

  }
  return short
}
