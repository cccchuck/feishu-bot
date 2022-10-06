import Request from '../utils/request'

class Bot {
  private request: Request

  constructor(hookUrl: string) {
    this.request = new Request(hookUrl)
  }

  async sendText(text: string) {
    return await this.request.post('', {
      msg_type: 'text',
      content: { text },
    })
  }
}

export default Bot
