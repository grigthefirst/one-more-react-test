import * as api from './api'

it('login', async () => {
  await expect(api.login('alice', 'pass')).resolves.not.toBeUndefined()
  await expect(api.login('bob', 'pass')).resolves.not.toBeUndefined()

  await expect(api.login('alice', 'wrong')).resolves.toBeUndefined()
  await expect(api.login('bob', 'wrong')).resolves.toBeUndefined()

  await expect(api.login('wrong', 'wrong')).resolves.toBeUndefined()
})

it('list posts', async () => {
  const token = await api.login('alice', 'pass').then(ensure('Login failed'))
  await expect(api.listPosts(token)).resolves.not.toBeUndefined()
  await expect(api.listPosts('invalid-token')).rejects.toThrowError('invalid access token')
})

it('retrieve post', async () => {
  const token = await api.login('alice', 'pass').then(ensure('Login failed'))
  await expect(api.retrievePost(token, 1)).resolves.not.toBeUndefined()
  await expect(api.retrievePost(token, 0)).rejects.toThrowError('unknown post id')
  await expect(api.retrievePost('invalid-token', 1)).rejects.toThrowError('invalid access token')
})

const ensure = (message: string) => <T>(value: T | undefined): T => {
  if (value !== undefined) {
    return value
  } else {
    throw new Error(message)
  }
}
