import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IApiClient } from '@/types/api-client';

export const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2';
export const RESOURCES_URL = API_ENDPOINT + '/resources';

export default class ApiClient implements IApiClient {
	private instance: AxiosInstance;

	constructor(baseUrl = API_ENDPOINT, timeout = 5000) {
		this.instance = this.createInstance(baseUrl, timeout);
	}

	public async get<TRequest, TResponse>(
		url: string,
		object?: TRequest,
		config?: AxiosRequestConfig<TResponse>,
	) {
		if (config) {
			config.params = object;
		} else {
			config = { params: object };
		}
		return await this.instance.get<TResponse>(url, config);
	}

	public async post<TRequest, TResponse>(
		url: string,
		object: TRequest,
		config?: AxiosRequestConfig,
	) {
		return await this.instance.post<TResponse>(url, object, config);
	}

	public async put<TRequest, TResponse>(
		url: string,
		object: TRequest,
		config?: AxiosRequestConfig,
	) {
		return await this.instance.put<TResponse>(url, object, config);
	}

	public async delete<TRequest, TResponse>(
		url: string,
		object: TRequest,
		config?: AxiosRequestConfig,
	) {
		if (config) {
			config.data = object;
		} else {
			config = { data: object };
		}
		return await this.instance.delete<TResponse>(url, config);
	}

	private createInstance(baseUrl: string, timeout: number) {
		const instance = axios.create({
			baseURL: baseUrl,
			timeout: timeout,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});
		instance.interceptors.request.use(
			response => response,
			error => {
				console.error(`Request error: ${error}`);
				return Promise.reject(error);
			},
		);
		instance.interceptors.response.use(
			response => response,
			error => {
				console.error(`Response error: ${error}`);
				return Promise.reject(error);
			},
		);

		return instance;
	}
}
