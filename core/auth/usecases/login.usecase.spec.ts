import { beforeEach, describe, expect, it } from 'vitest'
import { LoginCredentials } from '@/core/auth/auth.types'
import { authentificationFixture } from '@/core/auth/authentification.fixture'

describe('Feature: Log in', () => {
  let fixture: ReturnType<typeof authentificationFixture>

  beforeEach(() => {
    fixture = authentificationFixture()
  })

  it('should log in successfully with valid credentials', async () => {
    const user = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    }

    fixture.given.userExists(user)

    const credentials: LoginCredentials = {
      email: 'john@example.com',
      password: 'password123',
    }

    const result = await fixture.when.login(credentials)

    expect(result).toEqual({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    })
    expect(result).not.toHaveProperty('password')
  })

  it('should throw error when login with invalid email', async () => {
    const existingUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    }

    fixture.given.userExists(existingUser)

    const credentials: LoginCredentials = {
      email: 'wrong@example.com',
      password: 'password123',
    }

    await expect(fixture.when.login(credentials)).rejects.toThrow(
      'Invalid email or password',
    )
  })

  it('should throw error when login with invalid password', async () => {
    const existingUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    }

    fixture.given.userExists(existingUser)

    const credentials: LoginCredentials = {
      email: 'john@example.com',
      password: 'wrongpassword',
    }

    await expect(fixture.when.login(credentials)).rejects.toThrow(
      'Invalid email or password',
    )
  })

  it('should throw error when login with non-existent user', async () => {
    fixture.given.noUsersExist()

    const credentials: LoginCredentials = {
      email: 'nonexistent@example.com',
      password: 'password123',
    }

    await expect(fixture.when.login(credentials)).rejects.toThrow(
      'Invalid email or password',
    )
  })

  it('should not return password in user object', async () => {
    const user = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    }

    fixture.given.userExists(user)

    const credentials: LoginCredentials = {
      email: 'john@example.com',
      password: 'password123',
    }

    const result = await fixture.when.login(credentials)

    expect(result).not.toHaveProperty('password')
    expect((result as { password?: string }).password).toBeUndefined()
  })

  it('should handle multiple users and find correct one', async () => {
    const users = [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
      {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password456',
      },
    ]

    fixture.given.usersExist(users)

    const credentials: LoginCredentials = {
      email: 'jane@example.com',
      password: 'password456',
    }

    const result = await fixture.when.login(credentials)

    expect(result).toEqual({
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
    })
  })
})
