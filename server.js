const express = require('express')

const postRouter = require('./posts/postRouter')
const Users= require('./users/userRouter')
const server = express();

// server.use(logger)
server.use(express.json())
// server.use('/api/users')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, res, next) {
  req.requestTime=Date.now();
  console.log(`${req.method} to ${req.originalUrl} made at ${req.requestTime}`);
  next();
}




module.exports = server;
