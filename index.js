// code away!
const express = require('express')
const server = express()
const logger = require('./middleware/logger')
const welcomeRouter = require('./routers/welcome')
const userRouter = require('./users/userRouter')


server.use(logger())

server.use(express.json())

server.use('/', welcomeRouter)
server.use('/users', userRouter)


server.listen(4000, ()=>{
    console.log('\n*** Server listening on http://localhost:4000')
})