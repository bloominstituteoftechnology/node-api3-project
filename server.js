const express = require('express');

const userRouter = require('./users/userRouter');

const server = express();
server.use(logger);

server.use('/api/user', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl} at ${Date.now()}`);
  next();
}

module.exports = server;
