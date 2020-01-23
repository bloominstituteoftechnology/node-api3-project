const express = require('express');

const server = express();

const postsRouter = require('./posts/postRouter')

server.use(express.json());
server.use('/api/users', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to
  ${req.url} ${req.get('Origin')}`)

  next()
}


server.use(logger);

module.exports = server;
