const express = require('express');

const server = express();
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
}

server.use(logger);
server.use('./api/user', userRouter);
server.use('./api/post', postRouter);

module.exports = server;
