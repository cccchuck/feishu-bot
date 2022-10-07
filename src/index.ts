import Bot from './bot'

const bot = new Bot(
  'https://open.feishu.cn/open-apis/bot/v2/hook/a80fb039-3787-4e74-a6ac-3dca825b0fb2'
)

async function main() {
  await bot.sendPost({
    title: '交易监控提醒',
    text: 'G-Drake 交易提醒',
    aText: '浏览器查看',
    aHref: 'https://baidu.com',
  })

  await bot.sendCard({
    hash: '0xb9af9bcb08655077a204243fd29491714643030155212ad3f48527ee38cbfa67',
    from: '0xdd8efab95bb34411b01ff9d1b95eb9ac1a4c1065',
    to: '0x55623909fe2adf1f4ae4453f079dc19936505430',
    tokenID: '15',
  })
}

main()
