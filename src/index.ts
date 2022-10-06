import Bot from './bot'
;(async function () {
  const bot = new Bot(
    'https://open.feishu.cn/open-apis/bot/v2/hook/935f3e40-9063-42c7-b4b6-0378a8ac3341'
  )

  for (let i = 0; i < 10; i++) {
    const resp = await bot.sendText(i + '')
    if (typeof resp === 'string') {
      console.log('Error: ', resp)
    } else {
      console.log('Data: ', resp)
    }
  }
})()
