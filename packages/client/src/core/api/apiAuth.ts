import { AuthState, LoginData } from '../../types/auth'
import ApiClient from './apiClient'

// TODO: вынести в env, либо на сервер
const url = `https://ya-praktikum.tech/api/v2`
const client = new ApiClient(url)

const apiAuth = {
  login: async (data: LoginData): Promise<AuthState> => {
    const response = await client.post<LoginData, AuthState>(
      '/auth/signin',
      data
    )
    return response?.data
  },
  checkAuth: async (): Promise<AuthState> => {
    const response = await client.get<LoginData, AuthState>('/auth/user')
    return response?.data
  },
  logout: async (): Promise<void> => {
    await client.post('/auth/logout', {})
  },
}

export default apiAuth
