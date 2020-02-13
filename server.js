const express = require("express");

const postsRouter = require("./posts/postRouter.js");
const usersRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use("/api/posts", logger, postsRouter);
server.use("/api/users", logger, usersRouter);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl} `);
  next();
}
