const express = require('express');
const cors = require('cors');

const server = express();

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(express.json());
server.use(logger);
server.use(cors());

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`Logger: ${req.method} to ${req.url} @ ${Date(Date.now()).toString()}`)
  next()
}

module.exports = server;