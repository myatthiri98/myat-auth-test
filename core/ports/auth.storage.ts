import { User } from '@/core/auth/auth.types'

export interface AuthStorage {
  getUser(): Promise<User | null>

  saveUser(user: User): Promise<void>

  removeUser(): Promise<void>

  getAllUsers(): Promise<(User & { password: string })[]>

  saveUserWithPassword(user: User, password: string): Promise<void>
}
