export interface AuthState {
    id: number | null
    firstName: string
    secondName: string
    displayName: string
    login: string
    email: string
    phone: string
    avatar: string
    isLoggedIn: boolean
  }
    
export interface LoginData {
    login: string
    password: string
  }
