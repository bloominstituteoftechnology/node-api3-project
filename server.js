/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
const express = require('express');
const morgan = require('morgan');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());

server.use(morgan('dev'));
server.use(logger);

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware !</h2>
  <p>The browser server is running fine</p>`);
});

function logger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

module.exports = server;
