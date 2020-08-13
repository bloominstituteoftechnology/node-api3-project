const express = require("express");
const logger = require("./middleware/logger");
const server = express();
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const port = 8080;
server.use(logger());
server.use(express.json());
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use("/users", userRouter);
server.use("/posts", postRouter);
// function logger(req, res, next) {}

module.exports = server;
