const express = require('express');
const userRouter = require('./users/userRouter')

const server = express();

server.use(express.json())

server.use(logger())
server.use("/api/users", userRouter) 


//custom middleware

function logger() {
  return function (req, res, next) {
    console.log( ` A ${req.method} has been made to ${req.url}`)
    next()
  }
}

module.exports = server;