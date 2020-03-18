const express = require('express');
const helmet = require('helmet');

const userRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

const server = express();

server.use(express.json())
server.use(helmet());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request ${req.url} URL ${Date.now()} Timestamp`)
  next();
}

module.exports = server;
