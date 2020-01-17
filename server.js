const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
// const userRouter = require("/users/userRouter.js");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("tiny"));

// server.use("/api/posts", logger, postsRouter);
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// TODO logger()
function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl}`);

  next();
}
// logger logs to the console the following information about each request: request method, request url, and a timestamp
// this middleware runs on every request made to the API

module.exports = server;
