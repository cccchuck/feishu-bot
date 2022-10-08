import Request from './request'
import defaultTemplate from '../templates/NFT Listener'

interface ITemplate {
  tags: string[]
  template: string
}

interface ITemplates {
  id: string
  content: ITemplate
}

class Bot {
  private request: Request
  private templates!: ITemplates[]

  constructor(hookUrl: string) {
    this.request = new Request(hookUrl)
    this._initTemplates()
  }

  private _initTemplates() {
    this.registeTemplate('NFT', defaultTemplate)
  }

  private _genTemplate(id: string, args: string[]) {
    const template = this.templates.find((item) => item.id === id)

    if (!template) throw new Error('Template not found')

    const tags = template.content.tags

    if (tags.length !== args.length)
      throw new Error('Template arguments not match')

    tags.forEach((tag, index) => {
      if (typeof tag !== typeof args[index])
        throw new Error('Template arguments not match')
      template.content.template = template.content.template.replace(
        tag,
        args[index]
      )
    })

    return JSON.parse(template.content.template)
  }

  private _genPrepareTemplace(id: string, template: unknown) {
    const _templace = JSON.stringify(template)
    const tags = _templace.match(/\{[A-Z].*?\}/g) || []

    const prepareTemplate: ITemplates = {
      id,
      content: {
        tags,
        template: _templace,
      },
    }

    return prepareTemplate
  }

  public registeTemplate(
    id: string,
    template: unknown,
    forceReplace?: boolean
  ) {
    let idx: number

    idx =
      this.templates !== undefined
        ? this.templates.findIndex((item) => item.id === id)
        : -1

    if (idx !== -1 && !forceReplace) {
      throw new Error(`The template id of ${id} has already used`)
    }

    const prepareTemplate = this._genPrepareTemplace(id, template)

    if (idx !== -1) {
      this.templates[idx] = prepareTemplate
    } else {
      !this.templates
        ? (this.templates = [prepareTemplate])
        : this.templates.push(prepareTemplate)
    }

    return this.templates
  }

  public async sendText(text: string) {
    const resp = await this.request.post('', {
      msg_type: 'text',
      content: { text },
    })

    return typeof resp === 'string' ? false : true
  }

  public async sendRichText(id: string, args: string[]) {
    const template = this._genTemplate(id, args)
    const resp = await this.request.post('', template)

    return typeof resp === 'string' ? false : true
  }
}

export default Bot
