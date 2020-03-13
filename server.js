const express = require("express");
const server = express();
const userRouter = require("./users/userRouter");
server.use(logger);
server.use(express.json());
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;
  console.log(`logger: ${method} to ${endpoint}`);
  next();
}

module.exports = server;
