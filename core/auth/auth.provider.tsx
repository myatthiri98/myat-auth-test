import React, { useState, useEffect, ReactNode } from 'react'
import { Dependencies } from '@/core/_context_/dependencies'
import { AuthContext, AuthContextType } from '@/core/auth/auth.context'
import {
  User,
  LoginCredentials,
  SignupCredentials,
} from '@/core/auth/auth.types'
import { loginUser } from '@/core/auth/usecases/login.usecase'
import { logoutUser } from '@/core/auth/usecases/logout.usecase'
import { signupUser } from '@/core/auth/usecases/signup.usecase'
import { showErrorToast } from '@/ui/utils/toast'

type AuthProviderProps = {
  children: ReactNode
  dependencies: Dependencies
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  dependencies,
}) => {
  const { authStorage } = dependencies
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPersistedUser = async () => {
      try {
        const persistedUser = await authStorage.getUser()
        if (persistedUser) setUser(persistedUser)
      } catch {
      } finally {
        setIsLoading(false)
      }
    }
    loadPersistedUser()
  }, [authStorage])

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      const loggedInUser = await loginUser(credentials, dependencies)
      setUser(loggedInUser)
      await authStorage.saveUser(loggedInUser)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      showErrorToast(errorMessage, 'Login Failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (credentials: SignupCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      const newUser = await signupUser(credentials, dependencies)
      setUser(newUser)
      await authStorage.saveUser(newUser)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed'
      setError(errorMessage)
      showErrorToast(errorMessage, 'Signup Failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await logoutUser(dependencies)
      setUser(null)
      await authStorage.removeUser()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed'
      setError(errorMessage)
      showErrorToast(errorMessage, 'Logout Failed')
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
