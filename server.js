const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`You made a ${req.method} request to the ${req.url} endpoint at ${new Date()}`)
  next()
}

module.exports = server;
