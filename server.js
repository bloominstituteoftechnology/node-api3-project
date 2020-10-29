const express = require('express');

const postRouter = require('./posts/postRouter')

const userRouter = require('./users/userRouter')

const server = express();

server.use(express.json())

server.use('/posts', postRouter)
server.use('/users', userRouter)

//custom middleware

const logger = (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}`
    )
    next()
  }
  
  server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


  
module.exports = server;
