const express = require("express")
const deny = require('./middleware/deny')
const logger = require("./middleware/logger")
const welcomeRouter = require("./welcome/welcome-router")
const router = require("./users/userRouter")

const server = express()
const port = 4000
server.use(express.json())
server.use(logger('long'))

server.use(welcomeRouter)
server.use(router)

server.use((err, req, res,next) => {
    console.log(err)
    res.status(500).json({
        message: 'Something wernt wrong, please try again later',
    })
})

server.listen(port, () => {
    console.log(`Serverrunning at http://localhost:${port}`)
})