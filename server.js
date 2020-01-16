const express = require('express');

const server = express();
const postRouter= require('./posts/postRouter')
const userRouter= require('./users/userRouter')

server.use(express.json());
server.use(logger)
server.use(greeter)
server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const {method, URL, timestamp}= req
  console.log(`Method: ${method}, URL: ${URL}, Timestamp: ${timestamp}`)
  next()
}

module.exports = server;
