const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');//logger
const server = express();
const userRouter = require('./users/users-router.js');
const mw = require("./middleware/middleware.js")

// remember express by default cannot parse JSON in request bodies

server.use(helmet())
server.use(morgan('dev'))
server.use(express.json());
// global middlewares and the user's router need to be connected here
server.use(userRouter)



server.use((err, req, res, next) => {
  console.log(err) 
  res.status(500).json({
      message: "Something went wrong, please try again later"
  })
})
module.exports = server;
