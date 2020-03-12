const express = require('express');

const server = express();

const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')

server.use(express.json())

server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

//custom middleware

function logger(req, res, next) {
  console.log("\x1b[36m", `${req.method}`, "\x1b[32m", `to ${req.originalUrl}`)
  next()
}

module.exports = server;
