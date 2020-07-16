const express = require('express');
const helmet = require('helmet');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);
server.use('api/user', userRouter);
server.get(helmet());
server.use(logger);
server.use(validateUserId);

server.get('/', (req, res) => {
  const userInsert = (req.user) ? `${req.user}` : '';

  res.send(`<h2>Welcome ${userInsert}</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request`);
  next();
}

function validateUserId(req, res, next) {
  req.user = req.user || 'sk';
  next()
}

module.exports = server;
