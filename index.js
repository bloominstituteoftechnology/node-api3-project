//code away!
const express = require('express')

const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")

const logger = require('./middleware/loggers')
const validateUserId = require('./middleware/validateUserId')
const validateUser = require('./middleware/validateUser')
const validatePost = require('./middleware/validatePost')

server.use(express.json())

server.use(logger())
server.use(validateUserId())
server.use(validateUser())
server.use(validatePost())

server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Internal error" })
})

const port = 4000
const host = 'http://localhost:'

server.listen(port, () => {
    console.log(`Server running at ${host}${port}`)
})