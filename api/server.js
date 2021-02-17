const express = require('express');
const userRouter  = require("./users/users-router")
const {logger} = require("./middleware/middleware")
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(logger)
server.use(express.json())
server.use(userRouter)

server.use((err, req, res, next) => {
  console.log(err) 
  res.status(500).json({
      message: "Something went wrong, please try again later"
  })
})

module.exports = server;
