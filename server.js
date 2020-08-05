const express = require('express');

const server = express();

server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString}] a ${req.method} to ${req.url}`);
  next();
}

module.exports = server;
