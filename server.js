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


module.exports = server;
