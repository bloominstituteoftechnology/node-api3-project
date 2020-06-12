// code away!
const express = require('express')
const server = require('./server')
const port = process.env.port || 4000
const logger = require('./middleware/logger')
//const welcomeRouter = require('./welcome/welcome-router')
//const usersRouter = require('./users/users-router')
//const error = require('./middleware/error')

//const port = 4000

//server.use(logger('long'))
// server.use(welcomeRouter)

// no insomnia function
//server.use(noInsomnia())

//server.use(morgan('combined'))

// server.use(userRouter)

// server.use(error())
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
