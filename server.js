const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const server = express();

// server.get("/", (req, res) => {
//   res.send(`<h2>Starting the project. Woot.</h2>`);
// });
server.use(express.json(), helmet(), morgan("dev"), logger);
server.use("/user", userRouter);
server.use("/post", postRouter);

//custom middleware

//provides request type, response statis, and the seconds it took
module.exports = server;

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} Request to ${req.url}`
  );
  next();
}
