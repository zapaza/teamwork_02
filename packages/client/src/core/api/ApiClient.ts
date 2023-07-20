import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { IApiClient } from './types'

export default class ApiClient implements IApiClient {
  private client: AxiosInstance

  constructor(baseUrl: string, timeout = 5000) {
    this.client = this.createInstance(baseUrl, timeout)
  }

  public async get<TRequest, TResponse>(
    url: string,
    object?: TRequest,
    config?: AxiosRequestConfig<TResponse>
  ) {
    if (config) {
      config.params = object
    } else {
      config = { params: object }
    }
    return await this.client.get<TResponse>(url, config)
  }

  public async post<TRequest, TResponse>(
    url: string,
    object: TRequest,
    config?: AxiosRequestConfig
  ) {
    return await this.client.post<TResponse>(url, object, config)
  }

  public async put<TRequest, TResponse>(
    url: string,
    object: TRequest,
    config?: AxiosRequestConfig
  ) {
    return await this.client.put<TResponse>(url, object, config)
  }

  public async delete<TResponse>(url: string, config?: AxiosRequestConfig) {
    return await this.client.delete<TResponse>(url, config)
  }

  private createInstance(baseUrl: string, timeout: number) {
    const client = axios.create({
      baseURL: baseUrl,
      timeout: timeout,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    client.interceptors.request.use(
      response => response,
      error => {
        console.log(`Request error ${error}`)
        return Promise.reject(error)
      }
    )
    client.interceptors.response.use(
      response => response,
      error => {
        console.log(`Response error ${error}`)
        return Promise.reject(error)
      }
    )

    return client
  }
}
