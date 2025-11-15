export type User = {
  id: string
  name: string
  email: string
}

export type AuthState = {
  user: User | null
  isLoading: boolean
  error: string | null
}

export type LoginCredentials = {
  email: string
  password: string
}

export type SignupCredentials = {
  name: string
  email: string
  password: string
}
