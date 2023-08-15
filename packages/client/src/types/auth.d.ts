export interface AuthState {
  id: number | null
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
  isLoggedIn: boolean
  isDataLoaded: boolean
}

export interface LoginData {
  login: string
  password: string
}

export type SignupData = Omit<
  AuthState,
  'id' | 'display_name' | 'avatar' | 'isLoggedIn' | 'isDataLoaded'
> & { password: string }
