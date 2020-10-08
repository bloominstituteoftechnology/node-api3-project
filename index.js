const express = require("express");

const server = express();

// import routers
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

// log all the requests to the server
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
}

server.use(express.json());
server.use(logger);
server.use("/users", userRouter);
server.use("/posts", postRouter);

server.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

server.listen(5000, () => {
  console.log("server running on port 5000");
});
