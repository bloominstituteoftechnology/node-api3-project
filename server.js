const express = require('express');
const server = express();
const userRouter = require('./users/userRouter')

server.use('/api/users', userRouter,/*add middleware here*/)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



//custom middleware

function logger(req, res, next) {}

module.exports = server;
