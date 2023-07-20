import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IApiClient {
  get: HttpGetMethod
  post: HttpMethod
  put: HttpMethod
  delete: HttpDeleteMethod
}

export type HttpMethod = <TRequest = unknown, TResponse = unknown>(
  url: string,
  object: TRequest,
  config?: AxiosRequestConfig<TResponse>
) => Promise<AxiosResponse<TResponse>>

export type HttpGetMethod = <TRequest = unknown, TResponse = unknown>(
  url: string,
  object?: TRequest,
  config?: AxiosRequestConfig<TResponse>
) => Promise<AxiosResponse<TResponse>>

export type HttpDeleteMethod = <TResponse = unknown>(
  url: string,
  config?: AxiosRequestConfig<TResponse>
) => Promise<AxiosResponse<TResponse>>
