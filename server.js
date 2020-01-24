const express = require('express');

const server = express();

// import middleware
const helmet = require('helmet');
const morgan = require('morgan');

// routers
const userRouter = require('./users/userRouter');

// global middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);

// bind routers
server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const date = new Date();
  console.log(`Method: ${req.method}, url: ${req.url}, Date: ${date}`)
  next();
}

module.exports = server;
