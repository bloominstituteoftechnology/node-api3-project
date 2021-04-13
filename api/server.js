const express = require('express');
const server = express();
const logger = require("./middleware/logger")

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
server.use(logger("long"))
// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



server.use((err, req, res, next) => {
  console.log(err)

  res.status(500).json({message: "Something went wrong..."})

})

module.exports = server;
