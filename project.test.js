const request = require('supertest')
const server = require('./api/server')
const db = require('./data/db-config')

const { users: initialUsers } = require('./data/seeds/02-users')
const { posts: initialPosts } = require('./data/seeds/03-posts')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  describe('1 [GET] /api/users', () => {
    it('can get the correct number of users', async () => {
      let res = await request(server).get('/api/users')
      expect(res.body).toHaveLength(initialUsers.length)
    }, 500)
    it('can get all the correct users', async () => {
      let res = await request(server).get('/api/users')
      expect(res.body).toMatchObject(initialUsers)
    }, 500)
  })
})
