import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IApiClient {
  get: HttpMethod
  post: HttpMethod
  put: HttpMethod
  delete: HttpMethod
}

export type HttpMethod = <TRequest = unknown, TResponse = unknown>(
  url: string,
  object?: TRequest,
  config?: AxiosRequestConfig<TResponse>
) => Promise<AxiosResponse<TResponse>>
