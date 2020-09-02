const express = require('express');

const server = express();

const userRouter = require('./users/userRouter'); 

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/posts', userRouter); 

//custom middleware

function logger(req, res, next) {
  console.log(`A ${req.method} request was made to ${req.url} at ${req.timestamp} on ${req.date}`);
  next(); 
}

module.exports = server;
