const express = require("express");
const postsRouter = require("./posts/posts-router");
const usersRouter = require("./users/users-router");

const server = express();

server.use(express.json());

// remember express by default cannot parse JSON in request bodies
server.use("/api/posts", postsRouter);
server.use("/api/users/", usersRouter);
// global middlewares and routes need to be connected here

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
