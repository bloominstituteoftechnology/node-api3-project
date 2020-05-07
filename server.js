const express = require("express");

const server = express();
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use(express.json());
server.use("/api/posts", logger, postRouter);
server.use("/api/users", logger, userRouter);

//custom middleware

function logger(req, res, next) {
  const date = new Date().toISOString();
  console.log(`at ${date} with  ${req.method} to ${req.url}`);
  next();
} // working

module.exports = server;
