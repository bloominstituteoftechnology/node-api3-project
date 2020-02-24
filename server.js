const express = require("express");
const UserRouter = require("./users/userRouter");
const PostRouter = require("./posts/postRouter");
const server = express();


server.use(express.json());
server.use(logger);
server.use("/api/users", UserRouter);
server.use("/api/posts", PostRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Logger Middleware
function logger(req, res, next) {
  console.log(
    `[${new Date.toString()}] ${req.method} to ${req.url} from ${req.get("Origin")}`
  );
  next();
}

module.exports = server;
