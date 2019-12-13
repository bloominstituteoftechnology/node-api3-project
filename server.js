const express = require('express')
// const express = require('helmet')
const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.body} - ${req.params} - ${req.route} - ${req.ip}`)

  next()
}

module.exports = logger

// server.use(helmet())
server.use(express.json())
server.use(logger)

module.exports = server

