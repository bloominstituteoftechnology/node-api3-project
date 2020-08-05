const express = require("express");
const logger = require("./middleware/logger");

const server = express();
server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

module.exports = server;
