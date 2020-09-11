const express = require('express');
const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter')
const helmet = require('helmet');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Project 3?  MVP?</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`Method: ${req.method} request`)
  console.log(`url: ${req.url}`)
  console.log(`${new Date().toISOString()}`)
  next();
}

module.exports = server;
