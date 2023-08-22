import { AuthState, LoginData, SignupData } from '@/types/auth';
import { API_ENDPOINT, ApiClient } from '@/core/api/api-client';

const client = new ApiClient(API_ENDPOINT);

export const apiAuth = {
	login: async (data: LoginData): Promise<AuthState> => {
		const response = await client.post<LoginData, AuthState>('/auth/signin', data);
		return response?.data;
	},
	checkAuth: async (): Promise<AuthState> => {
		const response = await client.get<LoginData, AuthState>('/auth/user');
		return response?.data;
	},
	logout: async (): Promise<void> => {
		await client.post('/auth/logout', {});
	},
	signup: async (data: SignupData): Promise<AuthState> => {
		const response = await client.post<SignupData, AuthState>('/auth/signup', data);
		return response?.data;
	},
};
