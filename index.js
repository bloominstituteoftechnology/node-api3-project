// code away!
const express = require("express");
const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

const port = 5000;

server.listen(port, () => {
  console.log(`running on port : ${port}`);
});
