import { AuthState } from '../../types/auth'
import ApiClient from './apiClient'

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
export type UpdateProfileResp = UpdateProfileReq
export type UpdatePasswordReq = Record<
  typeof UpdatePasswordType[number],
  string
>
export type UpdatePasswordResp = UpdateProfileReq

const uri = 'https://ya-praktikum.tech/api/v2'
const client = new ApiClient(uri)

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
