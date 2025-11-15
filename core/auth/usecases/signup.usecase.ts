import { Dependencies } from '@/core/_context_/dependencies'
import { User, SignupCredentials } from '@/core/auth/auth.types'

let idCounter = 0

export const signupUser = async (
  credentials: SignupCredentials,
  dependencies: Dependencies,
): Promise<User> => {
  const { authStorage } = dependencies

  const storedUsers = await authStorage.getAllUsers()
  const existingUser = storedUsers.find(
    (u) => u.email.toLowerCase() === credentials.email.toLowerCase(),
  )

  if (existingUser) throw new Error('User with this email already exists')

  const newUser: User = {
    id: `${Date.now()}-${++idCounter}`,
    name: credentials.name,
    email: credentials.email,
  }

  await authStorage.saveUserWithPassword(newUser, credentials.password)

  return newUser
}
