const express = require('express');
const userRouter = require('./users/userRouter');
const {logger} = require('./utils/logger');

const server = express();

server.use('/api/users', userRouter);

server.use(logger);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function validateUser(body) {
  return function(req, res, next) {
    const body = req.body;
    const name = req.headers.name;

    if (!body) {
      res.status(400).json({errMessage: 'missing user data'});
    }
    if (!body.name) {
      res.status(400).jsons({errMessage: 'The given name does not match'});
    }
  };
}

function validateUserId(id) {
  return function(req, res, next) {
    const realId = req.headers.id;
    if (realId === id) {
      next();
    } else {
      res.status(401).json({errMessage: 'Invalid user'});
    }
  };
  next();
}

function validatePost() {
  return function(req, res, next) {
    const body = req.body;
    if (!body) {
      res.status(400).json({errorMessage: 'Missing post data'});
    }
    if (!body.text) {
      res.status(400).json({errorMessage: 'Missing required text field'});
    }
  };
}

module.exports = server;
