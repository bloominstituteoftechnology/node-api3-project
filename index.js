// code away!
const express = require('express');
const userRouter = require('./users/userRouter')

const server = express();
const port = 4000

server.use(express.json())

function logger() {
  return (req,res,next) => {
    const time = new Date().toISOString()
    console.log(`This is my logger middleware!!!
    IP Address:${req.ip}
    Method: ${req.method}
    URL: ${req.url}
    Time: [${time}]`)
    next()
  }
}

server.use(logger())


server.use(userRouter)


server.listen(port, () => {
    console.log(`server running on ${port}`)
})