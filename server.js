const express = require('express');

const server = express();

const postRouter = require('./posts/postRouter.js');

const userRouter = require('./users/userRouter.js');

server.use(logger);

server.use(express.json());

server.use('/post', postRouter);

server.use('/users', userRouter)

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);
  next();
}

module.exports = server;
