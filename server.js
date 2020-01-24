const express = require('express');
const server = express();


const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

// const helmet = require('helmet');
// const morgan = require('morgan');

server.use(express.json());
// server.use(helmet());
// server.use(morgan('dev'));
server.use(logger);
server.use(addName);

server.use('/users', userRouter);
server.use('/posts', postRouter);


server.get('/', (req, res, next) => {
  const nameInsert = (req.name) ? `${req.name}` : "";
  res.send(`<h2>Let's write some middleware ${nameInsert}!</h2>`);
});



//custom middleware

function addName(req, res, next) {
  req.name = req.name || 'Toni';
  next();
}

function logger(req, res, next) {
  req.time = Date.now();
  console.log(`${req.method} to ${req.originalUrl} made at ${req.requestTime}`);
  next();
}

module.exports = server;
