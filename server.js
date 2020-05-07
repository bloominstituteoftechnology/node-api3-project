const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();
server.use(express.json());
server.use(logger);
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${new Date().toDateString()} | ${req.method} | ${req.url}`);
  next();
}

module.exports = server;
