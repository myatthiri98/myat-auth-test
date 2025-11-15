/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@/core/auth/auth.types'
import { AuthStorage } from '@/core/ports/auth.storage'

const USER_STORAGE_KEY = '@auth_user'
const USERS_STORAGE_KEY = '@auth_users'

export class AsyncStorageAuthGateway implements AuthStorage {
  async getUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(USER_STORAGE_KEY)
      if (!userJson) return null
      return JSON.parse(userJson)
    } catch (error) {
      console.error('Error getting user from storage:', error)
      return null
    }
  }

  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Error saving user to storage:', error)
      throw error
    }
  }

  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY)
    } catch (error) {
      console.error('Error removing user from storage:', error)
      throw error
    }
  }

  async getAllUsers(): Promise<(User & { password: string })[]> {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY)
      if (!usersJson) return []
      return JSON.parse(usersJson)
    } catch (error) {
      console.error('Error getting all users from storage:', error)
      return []
    }
  }

  async saveUserWithPassword(user: User, password: string): Promise<void> {
    try {
      const users = await this.getAllUsers()
      const newUser = { ...user, password }
      users.push(newUser)
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    } catch (error) {
      console.error('Error saving user with password:', error)
      throw error
    }
  }
}
