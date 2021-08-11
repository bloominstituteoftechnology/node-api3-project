const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const usersRouter = require('./users/users-router.js')
const mw = require('./middleware/middleware.js')
const {logger} = mw

const server = express()

server.use(express.json())
server.use(morgan('dev'))
server.use(helmet())
server.use('/api/users', logger, usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

module.exports = server
