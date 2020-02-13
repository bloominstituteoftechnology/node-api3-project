const express = require("express");
const server = express();

server.use(logger);
server.use(express.json());
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl} at ${Date.now()}`);
  next();
}

module.exports = server;
