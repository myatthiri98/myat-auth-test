import { expect, vi } from 'vitest'
import { Dependencies } from '@/core/_context_/dependencies'
import {
  User,
  LoginCredentials,
  SignupCredentials,
} from '@/core/auth/auth.types'
import { loginUser } from '@/core/auth/usecases/login.usecase'
import { logoutUser } from '@/core/auth/usecases/logout.usecase'
import { signupUser } from '@/core/auth/usecases/signup.usecase'
import { AuthStorage } from '@/core/ports/auth.storage'

type MockAuthStorage = {
  getUser: ReturnType<typeof vi.fn>
  saveUser: ReturnType<typeof vi.fn>
  removeUser: ReturnType<typeof vi.fn>
  getAllUsers: ReturnType<typeof vi.fn>
  saveUserWithPassword: ReturnType<typeof vi.fn>
}

export const authentificationFixture = () => {
  const mockAuthStorage: MockAuthStorage = {
    getUser: vi.fn(),
    saveUser: vi.fn(),
    removeUser: vi.fn(),
    getAllUsers: vi.fn(),
    saveUserWithPassword: vi.fn(),
  }

  const dependencies: Dependencies = {
    authStorage: mockAuthStorage as unknown as AuthStorage,
  }

  let storedUsers: (User & { password: string })[] = []
  let currentUser: User | null = null

  const reset = () => {
    storedUsers = []
    currentUser = null
    vi.clearAllMocks()
    mockAuthStorage.getAllUsers.mockResolvedValue(storedUsers)
    mockAuthStorage.getUser.mockResolvedValue(currentUser)
    mockAuthStorage.saveUser.mockImplementation(async (user: User) => {
      currentUser = user
    })
    mockAuthStorage.removeUser.mockImplementation(async () => {
      currentUser = null
    })
    mockAuthStorage.saveUserWithPassword.mockImplementation(
      async (user: User, password: string) => {
        storedUsers.push({ ...user, password })
      },
    )
  }

  reset()

  return {
    reset,
    given: {
      authUserIs: (user: User) => {
        currentUser = user
        mockAuthStorage.getUser.mockResolvedValue(user)
      },
      userExists: (user: User & { password: string }) => {
        storedUsers.push(user)
        mockAuthStorage.getAllUsers.mockResolvedValue([...storedUsers])
      },
      usersExist: (users: (User & { password: string })[]) => {
        storedUsers = [...users]
        mockAuthStorage.getAllUsers.mockResolvedValue([...storedUsers])
      },
      noUsersExist: () => {
        storedUsers = []
        mockAuthStorage.getAllUsers.mockResolvedValue([])
      },
    },
    when: {
      login: async (credentials: LoginCredentials) => {
        try {
          return await loginUser(credentials, dependencies)
        } catch (error) {
          throw error
        }
      },
      signup: async (credentials: SignupCredentials) => {
        try {
          return await signupUser(credentials, dependencies)
        } catch (error) {
          throw error
        }
      },
      logOut: async () => {
        await logoutUser(dependencies)
      },
    },
    then: {
      userShouldBeLoggedIn: (expectedUser: User) => {
        expect(mockAuthStorage.saveUser).toHaveBeenCalledWith(expectedUser)
      },
      userShouldNotBeAuthenticated: () => {
        expect(mockAuthStorage.removeUser).toHaveBeenCalled()
      },
      userShouldBeSaved: (expectedUser: User) => {
        expect(mockAuthStorage.saveUserWithPassword).toHaveBeenCalledWith(
          expectedUser,
          expect.any(String),
        )
      },
      shouldThrowError: (errorMessage: string) => {
        return errorMessage
      },
    },
  }
}
