import axios, { Axios } from 'axios'

class Request {
  private instance: Axios

  constructor(hookURL: string) {
    this.instance = new Axios({
      baseURL: hookURL,
    })
  }
}
