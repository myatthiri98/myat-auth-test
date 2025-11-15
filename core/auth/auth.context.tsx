import { createContext, useContext } from 'react'
import {
  User,
  LoginCredentials,
  SignupCredentials,
} from '@/core/auth/auth.types'

export type AuthContextType = {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (credentials: SignupCredentials) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')

  return context
}
