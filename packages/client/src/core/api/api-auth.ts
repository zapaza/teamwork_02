import { AuthState, LoginData } from '../../types/auth'
import ApiClient, { API_ENDPOINT } from './api-client'

const client = new ApiClient(API_ENDPOINT)

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
