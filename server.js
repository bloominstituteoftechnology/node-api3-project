const express = require("express");
const logger = require("./middleware/logger");
const server = express();
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const port = 8000;
server.use(logger());
server.use(express.json());
server.get("/", (req, res) => {
  res.send(`<h2>Welcome to Hobbiton!</h2>`);
});

//custom middleware
server.use("/users", userRouter);
server.use("/posts", postRouter);
// function logger(req, res, next) {}

module.exports = server;
