const express = require('express');

const server = express();

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


server.use(express.json())
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)
server.use(logger)
//custom middleware

function logger(req, res, next) {
  console.log(req.url, req.method)


}

module.exports = server;
