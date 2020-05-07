const express = require('express');

const server = express();
server.use(express.json())
server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware


function logger(req, res, next) {
  const today = new Date().toTimeString()
  console.log(`${today} ${req.method} to ${req.url}`)
  next()
}



module.exports = server;
