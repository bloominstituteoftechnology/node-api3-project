const { logger, lockout, handleErrors } = require('./middleware/server-mw')
const express = require('express')
const UserRouter = require('./routes/users/userRouter')
// const PostsRouter = require('./routes/posts/postRouter')
const helmet = require('helmet')
// const morgan = require('morgan')
const server = express()


server.use(express.json())
server.use('/api/users', UserRouter)
// server.use('/api/posts', PostsRouter)
server.use(helmet())
// server.use(morgan('dev'))
server.use(logger)

// default request
server.get('/', (req, res, next) => {
  res.send(`<h2>Welcome to </h2><h1>CoolCompany's API</h1><br /><p>Server Status: Active</p>`)
})

server.use(handleErrors)
// server.use(lockout)

module.exports = server