const express = require("express");

// local router imports
const UserRouter = require("./users/userRouter.js");
const PostRouter = require("./posts/postRouter.js");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/users", UserRouter);
server.use("/api/posts", PostRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

  next();
}

module.exports = server;
