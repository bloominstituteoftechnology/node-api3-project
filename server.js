const express = require('express');
const helmet = require('helmet');

// Posts & User Router
const postsRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

// Middleware - Global
server.use(express.json()); // built-in Middleware
// server.use(logger); This would make logger GLOBAL
server.use(helmet());

// routes - endpoints
server.use('/api/users', logger, userRouter);
server.use('/api/posts', postsRouter);

server.get('/', greeter, (req, res) => {
  res.send(`<h2>Get to Coding With ${req.cohort}!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} Request to ${req.originalUrl}`
  );
  next();
}

function greeter(req, res, next) {
  req.cohort = 'Web 28';
  next();
}

module.exports = server;