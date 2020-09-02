/* Common JS Imports */
const express = require('express');
const helmet = require('helmet');

const usersRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

const server = express();

/* Middleware */
server.use(express.json()); 

/* Third-Party Middleware */
server.use(helmet());

/* Custom Middleware */
server.use(logger());
server.use(validateUserId())

//Routers
server.use('/users', usersRouter);
server.use('/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  return function (req, res, next) {
    console.log(`a ${req.method} request was made to ${req.url} at ${new Date().getTime()}`);
    next();
  }
}

function validateUserId(id) {
  return function (req, res, next) {
    if (req.header.id === id) {
      req.user = req.body;
      next();
    } else {
      res.status(400).json({ message: 'invalid user id' });
    }
  };
}

function validateUser() {
  return function (req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: 'missing user data' });
    } else if (!req.body.name) {
      res
        .status(400)
        .json({ message: 'missing required name field' });
    }

    next();
  };
}

function validatePost() {
  return function (req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: 'missing post data' });
    } else if (!req.body.text) {
      res
        .status(400)
        .json({ message: 'missing required text field' });
    }

    next();
  };
}

module.exports = server;
