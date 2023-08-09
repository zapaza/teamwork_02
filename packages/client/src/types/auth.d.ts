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
