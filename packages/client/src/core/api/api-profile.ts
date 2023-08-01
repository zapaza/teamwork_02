import { AuthState } from '../../types/auth'
import ApiClient, { API_ENDPOINT } from './api-client'

const UpdateProfileType = [
  'first_name',
  'second_name',
  'display_name',
  'login',
  'email',
  'phone',
] as const
const UpdatePasswordType = ['oldPassword', 'newPassword'] as const

export type UpdateProfileReq = Record<typeof UpdateProfileType[number], string>
export type UpdatePasswordReq = Record<
  typeof UpdatePasswordType[number],
  string
>
export type UpdatePasswordResp = UpdateProfileReq

const client = new ApiClient(API_ENDPOINT)

const ApiProfile = {
  async updatePassword(data: UpdatePasswordReq) {
    const response = await client.put<UpdatePasswordReq, UpdatePasswordResp>(
      '/user/password',
      data
    )
    return response?.data
  },
  async updateProfile(data: UpdateProfileReq) {
    const response = await client.put<UpdateProfileReq, AuthState>(
      '/user/profile',
      data
    )
    return response?.data
  },
  async updateAvatar(data: FormData) {
    const response = await client.put<FormData, AuthState>(
      'user/profile/avatar',
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    return response?.data
  },
}

export default ApiProfile
