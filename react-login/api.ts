import { LoremIpsum } from 'lorem-ipsum'
import { DateTime } from 'luxon'

export interface User {
  id: number
  username: string
}

export interface Comment {
  author: string
  text: string
}

export interface Post {
  id: number
  title: string
  text: string
  likes: number
  comments: Comment[]
  createdAt: DateTime
}

const users: (User & { password: string })[] = [
  { id: 1, username: 'alice', password: 'pass' },
  { id: 2, username: 'bob', password: 'pass' },
]

const posts: Post[] = [
  {
    id: 1,
    title: 'First post',
    text: new LoremIpsum().generateParagraphs(2),
    likes: 14,
    comments: [
      { author: 'Anonymous 1', text: new LoremIpsum().generateParagraphs(4) },
      { author: 'Anonymous 2', text: new LoremIpsum().generateParagraphs(5) },
      { author: 'Anonymous 3', text: new LoremIpsum().generateParagraphs(1) },
    ],
    createdAt: DateTime.fromISO('2020-01-31'),
  },
  {
    id: 2,
    title: 'Second post',
    text: new LoremIpsum().generateParagraphs(3),
    likes: 3,
    comments: [],
    createdAt: DateTime.fromISO('2020-03-23'),
  },
  {
    id: 3,
    title: 'Third post',
    text: new LoremIpsum().generateParagraphs(1),
    likes: 23,
    comments: [
      { author: 'Anonymous 4', text: new LoremIpsum().generateParagraphs(4) },
      { author: 'Anonymous 5', text: new LoremIpsum().generateParagraphs(5) },
      { author: 'Anonymous 6', text: new LoremIpsum().generateParagraphs(1) },
      { author: 'Anonymous 7', text: new LoremIpsum().generateParagraphs(8) },
    ],
    createdAt: DateTime.fromISO('2021-01-10'),
  },
  {
    id: 4,
    title: 'Forth post',
    text: new LoremIpsum().generateParagraphs(7),
    likes: 0,
    comments: [{ author: 'Anonymous 8', text: new LoremIpsum().generateParagraphs(3) }],
    createdAt: DateTime.fromISO('2012-02-10'),
  },
]

const accessTokens: { [token: string]: User | undefined } = {}

export async function login(username: string, password: string): Promise<string | undefined> {
  await delay(1000)
  const user = users.find(u => u.username === username && u.password === password)
  if (user) {
    const accessToken = generateToken(16)
    accessTokens[accessToken] = { id: user.id, username: user.username }
    return accessToken
  } else {
    return undefined
  }
}

export async function listPosts(accessToken: string): Promise<Post[]> {
  await delay(1000)
  const user = accessTokens[accessToken]
  if (user) {
    return posts.map(post => ({ ...post }))
  } else {
    throw new Error('invalid access token')
  }
}

export async function retrievePost(accessToken: string, postId: number): Promise<Post> {
  await delay(1000)
  const user = accessTokens[accessToken]
  if (user) {
    const post = posts.find(p => p.id === postId)
    if (post) {
      return { ...post }
    } else {
      throw new Error('unknown post id')
    }
  } else {
    throw new Error('invalid access token')
  }
}

function delay(millis: number): Promise<void> {
  if (process.env.NODE_ENV !== 'test') {
    return new Promise(resolve => setInterval(() => resolve(), millis))
  } else {
    return Promise.resolve()
  }
}

function generateToken(length: number) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  return new Array(length)
    .fill(0)
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('')
}
