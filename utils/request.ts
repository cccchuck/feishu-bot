import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class Request {
  private instance: AxiosInstance

  constructor(hookURL: string) {
    this.instance = axios.create({
      baseURL: hookURL,
      timeout: 3000,
      headers: { 'Content-Type': 'application/json' },
    })

    this.initAxiosInstance()
  }

  initAxiosInstance() {
    this.instance.interceptors.request.use((config) => {
      config.data = JSON.stringify(config.data)
      return config
    })

    this.instance.interceptors.response.use(
      (resp) => {
        if (resp.data.StatusCode !== null) return resp.data
        return Promise.reject('Request Body Format Error')
      },
      () => {
        return Promise.reject('Request Timeout or Server Error')
      }
    )
  }

  async get(
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any> | string> {
    try {
      return await this.instance.get(url, config)
    } catch (error) {
      return error as string
    }
  }

  async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any> | string> {
    try {
      return await this.instance.post(url, data, config)
    } catch (error) {
      return error as string
    }
  }
}

export default Request
