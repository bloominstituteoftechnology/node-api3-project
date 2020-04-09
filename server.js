const express = require('express');
const helmet = require('helmet');
const server = express();

const userRouter = require("./users/userRouter");

// MW
server.use(helmet());
server.use(express.json());
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use("/api/users", logger, userRouter);

//custom middleware

function logger(req, res, next) {
  console.log(`[${Date.now()}] ${req.method} Request to ${req.originalUrl}`);

  next();
}

module.exports = server;