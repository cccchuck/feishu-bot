import Request from '../utils/request'

interface IPostTemplate {
  title: string
  text: string
  aText: string
  aHref: string
}

interface ICardTemplace {
  hash: string
  from: string
  to: string
  tokenID: string
}

const POST_TEMPLATE = {
  title: '',
  content: [
    [
      {
        tag: 'text',
        text: '',
      },
      {
        tag: 'a',
        text: '',
        href: '',
      },
    ],
  ],
}

const CARD_TEMPLATE = {
  config: {
    wide_screen_mode: true,
  },
  elements: [
    {
      tag: 'div',
      text: {
        content:
          '**Hash:**\n{Hash}\n**From:**\n{From}\n**To:**\n{To}\n**TokenID:**\n{TokenID}\n',
        tag: 'lark_md',
      },
    },
    {
      tag: 'hr',
    },
    {
      actions: [
        {
          tag: 'button',
          text: {
            content: '浏览器查看',
            tag: 'plain_text',
          },
          type: 'primary',
          url: '',
        },
      ],
      tag: 'action',
    },
  ],
  header: {
    template: 'blue',
    title: {
      content: '⏰ 交易监控提醒',
      tag: 'plain_text',
    },
  },
}

class Bot {
  private request: Request

  constructor(hookUrl: string) {
    this.request = new Request(hookUrl)
  }

  private _genPostTemplate(args: IPostTemplate) {
    const _post_template = { ...POST_TEMPLATE }
    _post_template.title = args.title
    _post_template.content[0][0].text = args.text
    _post_template.content[0][1].text = args.aText
    _post_template.content[0][1].href = args.aHref
    return _post_template
  }

  private _genCardTemplate(args: ICardTemplace) {
    const _card_template = { ...CARD_TEMPLATE }

    let url = `https://etherscan.io/tx/${args.hash}`
    let content = _card_template.elements[0].text
      ? _card_template.elements[0].text.content
      : ''
    content = content?.replace('{Hash}', args.hash)
    content = content?.replace('{From}', args.from)
    content = content?.replace('{To}', args.to)
    content = content?.replace('{TokenID}', args.tokenID)

    _card_template.elements[0].text
      ? (_card_template.elements[0].text.content = content)
      : null
    _card_template.elements[2].actions
      ? (_card_template.elements[2].actions[0].url = url)
      : null

    return _card_template
  }

  async sendText(text: string) {
    const resp = await this.request.post('', {
      msg_type: 'text',
      content: { text },
    })

    return typeof resp === 'string' ? false : true
  }

  async sendPost(args: IPostTemplate) {
    const postTemplate = this._genPostTemplate(args)
    const resp = await this.request.post('', {
      msg_type: 'post',
      content: { post: { zh_cn: postTemplate } },
    })

    return typeof resp === 'string' ? false : true
  }

  async sendCard(args: ICardTemplace) {
    const cardTemplate = this._genCardTemplate(args)
    const resp = await this.request.post('', {
      msg_type: 'interactive',
      card: cardTemplate,
    })

    return typeof resp === 'string' ? false : true
  }
}

export default Bot
