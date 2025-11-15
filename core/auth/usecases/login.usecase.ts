import { Dependencies } from '@/core/_context_/dependencies'
import { User, LoginCredentials } from '@/core/auth/auth.types'

export const loginUser = async (
  credentials: LoginCredentials,
  dependencies: Dependencies,
): Promise<User> => {
  const { authStorage } = dependencies

  const storedUsers = await authStorage.getAllUsers()
  const user = storedUsers.find(
    (u) => u.email === credentials.email && u.password === credentials.password,
  )

  if (!user) throw new Error('Invalid email or password')

  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}
