const express = require('express');
const postrouter = require('./posts/postRouter');
const userrouter = require('./users/userRouter')
const server = express();
server.use(express.json());


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware


function logger(req, res, next) {console.log(`${req.method} ${req.originalUrl} at ${new Date().toISOString()}`);
  next();}

module.exports = server;
