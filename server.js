const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  switch (options.format) {
    case "short":
      console.log(`${req.method} ${req.url}`);
      break;
    case "long":
    default:
      console.log(
        `${new Date().toISOString()} ${req.ip} ${req.method} ${req.url} `
      );
      break;
  }

  next();
}

module.exports = server;
