import { beforeEach, describe, expect, it } from 'vitest'
import { SignupCredentials } from '@/core/auth/auth.types'
import { authentificationFixture } from '@/core/auth/authentification.fixture'

describe('Feature: Sign up', () => {
  let fixture: ReturnType<typeof authentificationFixture>

  beforeEach(() => {
    fixture = authentificationFixture()
  })

  it('should sign up successfully with new credentials', async () => {
    fixture.given.noUsersExist()

    const credentials: SignupCredentials = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    }

    const result = await fixture.when.signup(credentials)

    expect(result).toMatchObject({
      name: 'John Doe',
      email: 'john@example.com',
    })
    expect(result.id).toBeDefined()
    expect(result).not.toHaveProperty('password')
    fixture.then.userShouldBeSaved(result)
  })

  it('should throw error when email already exists', async () => {
    const existingUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    }

    fixture.given.userExists(existingUser)

    const credentials: SignupCredentials = {
      name: 'Jane Smith',
      email: 'john@example.com',
      password: 'password456',
    }

    await expect(fixture.when.signup(credentials)).rejects.toThrow(
      'User with this email already exists',
    )
  })

  it.each([
    {
      description: 'different name but same email',
      existingUser: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
      newCredentials: {
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'password456',
      } as SignupCredentials,
    },
    {
      description: 'case-insensitive email match',
      existingUser: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
      newCredentials: {
        name: 'Jane Smith',
        email: 'JOHN@EXAMPLE.COM',
        password: 'password456',
      } as SignupCredentials,
    },
  ])(
    'should throw error when signup with $description',
    async ({ existingUser, newCredentials }) => {
      fixture.given.userExists(existingUser)

      await expect(fixture.when.signup(newCredentials)).rejects.toThrow(
        'User with this email already exists',
      )
    },
  )

  it('should generate unique ID for each new user', async () => {
    fixture.given.noUsersExist()

    const credentials1: SignupCredentials = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    }

    const credentials2: SignupCredentials = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456',
    }

    const result1 = await fixture.when.signup(credentials1)
    const result2 = await fixture.when.signup(credentials2)

    expect(result1.id).toBeDefined()
    expect(result2.id).toBeDefined()
    expect(result1.id).not.toBe(result2.id)
  })

  it('should save user with password in storage', async () => {
    fixture.given.noUsersExist()

    const credentials: SignupCredentials = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    }

    const result = await fixture.when.signup(credentials)

    fixture.then.userShouldBeSaved(result)
  })

  it('should allow multiple users with different emails', async () => {
    fixture.given.noUsersExist()

    const credentials1: SignupCredentials = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    }

    const credentials2: SignupCredentials = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456',
    }

    const result1 = await fixture.when.signup(credentials1)
    const result2 = await fixture.when.signup(credentials2)

    expect(result1.email).toBe('john@example.com')
    expect(result2.email).toBe('jane@example.com')
    expect(result1.id).not.toBe(result2.id)
  })
})
