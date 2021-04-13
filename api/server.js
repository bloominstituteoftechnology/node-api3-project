const express = require('express');
const usersRouter = require("./users/users-router")

const server = express();

server.use(express.json())
server.use(logger("long"))
server.use(usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
