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
  describe('2 [GET] /api/users/:id', () => {
    it('can get the correct user', async () => {
      let res = await request(server).get('/api/users/1')
      expect(res.body).toMatchObject(initialUsers[0])
      expect(res.body).toHaveProperty('id')
      res = await request(server).get('/api/users/2')
      expect(res.body).toMatchObject(initialUsers[1])
      expect(res.body).toHaveProperty('id')
    }, 500)
    it('responds with a 404 if id does not exist', async () => {
      let res = await request(server).get('/api/users/111')
      expect(res.status).toBe(404)
    })
    it('responds with the correct error message if id does not exist', async () => {
      let res = await request(server).get('/api/users/111')
      expect(res.body.message).toMatch(/not found/i)
    })
  })
  describe('3 [POST] /api/users', () => {
    it('creates a new user in the database', async () => {
      await request(server).post('/api/users').send({ name: 'foo' })
      let users = await db('users')
      expect(users).toHaveLength(initialUsers.length + 1)
      await request(server).post('/api/users').send({ name: 'bar' })
      users = await db('users')
      expect(users).toHaveLength(initialUsers.length + 2)
    })
    it('responds with the newly created user', async () => {
      let res = await request(server).post('/api/users').send({ name: 'foo' })
      expect(res.body).toMatchObject({ id: 10, name: 'foo' })
      res = await request(server).post('/api/users').send({ name: 'bar' })
      expect(res.body).toMatchObject({ id: 11, name: 'bar' })
    })
    it('responds with a 400 if empty payload', async () => {
      let res = await request(server).post('/api/users')
      expect(res.status).toBe(400)
    })
    it('responds with a 400 if missing name', async () => {
      let res = await request(server).post('/api/users').send({ random: 'thing' })
      expect(res.status).toBe(400)
    })
    it('responds with the correct error message if empty payload', async () => {
      let res = await request(server).post('/api/users')
      expect(res.body.message).toMatch(/missing user data/i)
    })
    it('responds with the correct error message if missing name', async () => {
      let res = await request(server).post('/api/users').send({ random: 'thing' })
      expect(res.body.message).toMatch(/missing required name/i)
    })
  })
})
