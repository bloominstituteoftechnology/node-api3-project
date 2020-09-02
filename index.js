const express = require('express')
const server = express()
const userRouter = require('./users/userRouter')

server.use(express.json())
server.use(logger())

function logger() {
    return (req, res, next) => {
        console.log(`A ${req.method} request was made to ${req.url} at ${new Date().toISOString()}`)
        next()
    }
}

server.use('/api/', userRouter)


server.listen(5001, () => {
    console.log('Server running on 5001')
})

module.exports = server
