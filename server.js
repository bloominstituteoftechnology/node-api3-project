const express = require('express');

const server = express();

const userRouter = require('./users/userRouter')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(express.json());
server.use('/api/user', userRouter)

//custom middleware

function logger(req, res, next) {}

module.exports = server;
