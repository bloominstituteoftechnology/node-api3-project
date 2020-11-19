const express = require('express');

const userRouter = require('./users/userRouter')

const server = express();

server.use(express.json()); // the req now has a body object
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.url, new Date);
  next()
}

server.use('/user', userRouter)

module.exports = server;
