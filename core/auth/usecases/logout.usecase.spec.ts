import { beforeEach, describe, it } from 'vitest'
import { authentificationFixture } from '@/core/auth/authentification.fixture'

describe('Feature: Log out', () => {
  let fixture: ReturnType<typeof authentificationFixture>

  beforeEach(() => {
    fixture = authentificationFixture()
  })

  it('should log out successfully', async () => {
    fixture.given.authUserIs({
      id: 'fake-joe-id',
      email: 'joe@gmail.com',
      name: 'Joe',
    })

    await fixture.when.logOut()

    fixture.then.userShouldNotBeAuthenticated()
  })

  it('should remove user from storage when logging out', async () => {
    const user = {
      id: 'user-1',
      email: 'john@example.com',
      name: 'John Doe',
    }

    fixture.given.authUserIs(user)

    await fixture.when.logOut()

    fixture.then.userShouldNotBeAuthenticated()
  })

  it.each([
    {
      description: 'user with simple email',
      user: {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
      },
    },
    {
      description: 'user with complex email',
      user: {
        id: 'user-2',
        email: 'user.name+tag@example.co.uk',
        name: 'Complex User',
      },
    },
    {
      description: 'user with long name',
      user: {
        id: 'user-3',
        email: 'long@example.com',
        name: 'Very Long User Name That Has Many Words',
      },
    },
  ])('should log out successfully for $description', async ({ user }) => {
    fixture.given.authUserIs(user)

    await fixture.when.logOut()

    fixture.then.userShouldNotBeAuthenticated()
  })

  it('should handle logout when no user is authenticated', async () => {
    await fixture.when.logOut()

    fixture.then.userShouldNotBeAuthenticated()
  })

  it('should call removeUser on storage', async () => {
    const user = {
      id: 'user-1',
      email: 'john@example.com',
      name: 'John Doe',
    }

    fixture.given.authUserIs(user)

    await fixture.when.logOut()

    fixture.then.userShouldNotBeAuthenticated()
  })
})
