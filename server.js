const express = require("express");
const usersRouter = require("./users/userRouter.js");
const postsRouter = require("./posts/postRouter.js");
const server = express();

server.use(express.json());

//custom middlewears
server.use(logger);

server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `${req.method} Request ${req.url} [${new Date().toISOString()}] `
  );
  next();
}

module.exports = server;
