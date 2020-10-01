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
  res.send(
    `
    <h2>End Points</h2>
    <p>GET /users</p><span>Gets a list of users</span>
    <p>GET /posts</p><span>Gets a list of posts</span>
    <p>GET /users/:id/posts</p><span>Gets a list of posts for that user</span>
    <p>POST /users</p><span>Creates a user Requires a name to be in the body</span>
    `
  );
});

module.exports = server;
