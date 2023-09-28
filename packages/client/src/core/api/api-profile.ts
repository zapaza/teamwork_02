import { AuthState } from '@/types/auth';
import { ApiClient } from '@/core/api/api-client';

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

const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2';
const client = new ApiClient(API_ENDPOINT);

export const ApiProfile = {
	async updatePassword(data: UpdatePasswordReq) {
		const response = await client.put<UpdatePasswordReq, UpdatePasswordResp>(
			'/user/password',
			data,
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
