import { AuthState } from '@/types/auth';
import ApiClient, { API_ENDPOINT } from './api-client';

export type UpdateProfileReq = {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
};
export type UpdatePasswordReq = {
	oldPassword: string;
	newPassword: string;
};
export type UpdatePasswordResp = UpdateProfileReq;

const client = new ApiClient(API_ENDPOINT);

const ApiProfile = {
	async updatePassword(data: UpdatePasswordReq) {
		const response = await client.put<UpdatePasswordReq, UpdatePasswordResp>(
			'/user/password',
			data
		);
		return response?.data;
	},
	async updateProfile(data: UpdateProfileReq) {
		const response = await client.put<UpdateProfileReq, AuthState>('/user/profile', data);
		return response?.data;
	},
	async updateAvatar(data: FormData) {
		const response = await client.put<FormData, AuthState>('user/profile/avatar', data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return response?.data;
	},
};

export default ApiProfile;
