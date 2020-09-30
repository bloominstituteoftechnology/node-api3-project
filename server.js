const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const server = express();

//custom middleware

function logger(req, res, next) {
  console.log(`[${Date()}] ${req.method} to ${req.url}`);
  req.body = "name";
  next();
}

server.use("/posts", postRouter);
server.use("/users", userRouter);
server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
